import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import PDFDocument from "pdfkit";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY,
  baseURL: process.env.OPENAI_API_KEY ? undefined : "https://api.groq.com/openai/v1",
});

const AI_MODEL = process.env.OPENAI_API_KEY ? "gpt-4o-mini" : "llama-3.3-70b-versatile";

// Recursively sanitize all strings to ASCII-only to prevent PDFKit Helvetica encoding crashes
function sanitizeForPDF(str: string): string {
  if (typeof str !== "string") return "";
  return str.replace(/[^\x20-\x7E\n\r\t]/g, "").trim();
}

function sanitizeObject(obj: any): any {
  if (typeof obj === "string") {
    return sanitizeForPDF(obj) || "Not specified";
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item)).filter(item => item !== "");
  }
  if (typeof obj === "object" && obj !== null) {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeObject(obj[key]);
    }
    return res;
  }
  return obj;
}

function renderMarkdownToPDF(doc: any, markdown: string, primaryColor: string) {
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (let line of lines) {
    const cleanLine = sanitizeForPDF(line);
    
    // Code block toggle
    if (cleanLine.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      doc.moveDown(0.2);
      continue;
    }

    if (inCodeBlock) {
      doc
        .font("Courier")
        .fontSize(8.5)
        .fillColor("#0f172a")
        .text(cleanLine, { indent: 15 });
      continue;
    }

    if (!cleanLine) {
      doc.moveDown(0.4);
      continue;
    }

    // Headers
    if (cleanLine.startsWith("# ")) {
      const text = cleanLine.replace("# ", "").trim();
      doc.moveDown(1.2);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(primaryColor)
        .text(text);
      doc.moveDown(0.4);
    } else if (cleanLine.startsWith("## ")) {
      const text = cleanLine.replace("## ", "").trim();
      doc.moveDown(1.0);
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#1e293b")
        .text(text);
      doc.moveDown(0.3);
    } else if (cleanLine.startsWith("### ")) {
      const text = cleanLine.replace("### ", "").trim();
      doc.moveDown(0.8);
      doc
        .font("Helvetica-Bold")
        .fontSize(10.5)
        .fillColor("#334155")
        .text(text);
      doc.moveDown(0.25);
    }
    // List items
    else if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ") || cleanLine.startsWith("• ")) {
      const text = cleanLine.replace(/^[-*•]\s+/, "").trim();
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#334155")
        .text("•  " + text, { indent: 15 });
    }
    // Regular paragraph
    else {
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#334155")
        .text(cleanLine, { align: "justify" });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { projectId, primaryColor = "#0f172a", agencyLogo } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: project, error: projError } = await supabase
      .from("projects")
      .select("*, users(*)")
      .eq("id", projectId)
      .single();

    if (projError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Fetch the deliverables for this project
    const { data: deliverables } = await supabase
      .from("deliverables")
      .select("*")
      .eq("project_id", projectId);

    let brief = project.brief_data || {};

    // 1. Translate Arabic brief content to English on the fly
    if (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY) {
      try {
        const translateResponse = await openai.chat.completions.create({
          model: AI_MODEL,
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: "You are a strict translator. Translate the values of the following JSON object entirely to professional English. Return ONLY valid JSON matching the exact same keys. All text values MUST be in English. Do not include any Arabic characters.",
            },
            {
              role: "user",
              content: JSON.stringify(brief),
            },
          ],
          response_format: { type: "json_object" }
        });
        
        const translatedText = translateResponse.choices[0]?.message?.content;
        if (translatedText) {
          brief = JSON.parse(translatedText);
        }
      } catch (e) {
        console.warn("PDF English translation failed:", e);
      }
    }

    // Clean/sanitize the brief structure
    const cleanBrief = sanitizeObject(brief);
    const projectName = sanitizeForPDF(project.project_name) || cleanBrief.projectName || "Project Scope Agreement";

    // 2. Initialize PDFKit document in memory
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // ─────────────────────────────────────────────────────────────────
      // COVER PAGE
      // ─────────────────────────────────────────────────────────────────
      // Side brand bar accent
      doc.fillColor(primaryColor).rect(0, 0, 15, 842).fill();

      // Custom logo if provided
      if (agencyLogo) {
        try {
          const logoBuffer = Buffer.from(agencyLogo.split(",")[1], "base64");
          doc.image(logoBuffer, 50, 45, { width: 60 });
        } catch (_) {}
      }

      // Title & Date metadata
      doc
        .fillColor("#0f172a")
        .fontSize(24)
        .font("Helvetica-Bold")
        .text("Project Specifications Suite", 50, 180);

      doc
        .fontSize(14)
        .font("Helvetica")
        .fillColor("#475569")
        .text(projectName, 50, 215, { width: 490 });

      doc.moveTo(50, 250).lineTo(540, 250).strokeColor("#cbd5e1").stroke();

      // Metadata Block
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("CLIENT DETAILS", 50, 280)
        .font("Helvetica")
        .fillColor("#475569")
        .text(`Client Name: ${sanitizeForPDF(project.client_name || "Valued Client")}`)
        .text(`Client Email: ${sanitizeForPDF(project.client_email || "client@example.com")}`)
        .text(`Generated On: ${new Date().toLocaleDateString()}`)
        .moveDown(1.5);

      // Core Purpose & Overview on Cover Page
      doc
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("PROJECT OVERVIEW")
        .font("Helvetica")
        .fillColor("#475569")
        .text(cleanBrief.corePurpose || "No core purpose defined.", { width: 490, align: "left" })
        .moveDown(1.5);

      // Target Audience
      doc
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("TARGET AUDIENCE")
        .font("Helvetica")
        .fillColor("#475569")
        .text(cleanBrief.targetAudience || "No target audience defined.", { width: 490, align: "left" })
        .moveDown(1.5);

      // Tech Stack
      doc
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("RECOMMENDED TECH STACK")
        .font("Helvetica")
        .fillColor("#475569")
        .text(cleanBrief.technicalStack || "No technical stack defined.", { width: 490, align: "left" });

      // Footer
      doc
        .fontSize(8)
        .fillColor("#94a3b8")
        .text("This document is generated automatically by Client Brief AI.", 50, 750, { align: "center", width: 490 });

      // ─────────────────────────────────────────────────────────────────
      // DELIVERABLES PAGES
      // ─────────────────────────────────────────────────────────────────
      if (deliverables && deliverables.length > 0) {
        // Sort deliverables so they appear in a standard logical order
        const orderMap: Record<string, number> = { SRS: 1, STYLE_GUIDE: 2, SOW: 3 };
        const sortedDeliverables = [...deliverables].sort((a, b) => {
          return (orderMap[a.type] || 99) - (orderMap[b.type] || 99);
        });

        sortedDeliverables.forEach((deliv) => {
          doc.addPage();
          // Side brand bar accent
          doc.fillColor(primaryColor).rect(0, 0, 15, 842).fill();

          const titleMap: Record<string, string> = {
            SRS: "Developer Specification (SRS)",
            STYLE_GUIDE: "Design Direction & Visual Identity",
            SOW: "Marketing Scope of Work (SOW)",
          };

          doc
            .fillColor(primaryColor)
            .fontSize(18)
            .font("Helvetica-Bold")
            .text(titleMap[deliv.type] || deliv.type, 50, 50);

          doc.moveTo(50, 75).lineTo(540, 75).strokeColor("#cbd5e1").stroke();
          doc.moveDown(1);

          renderMarkdownToPDF(doc, deliv.markdown_content, primaryColor);
        });
      } else {
        // Fallback features list page if no detailed deliverables generated yet
        doc.addPage();
        doc.fillColor(primaryColor).rect(0, 0, 15, 842).fill();

        doc
          .fillColor(primaryColor)
          .fontSize(18)
          .font("Helvetica-Bold")
          .text("Required Features & Deliverables", 50, 50);

        doc.moveTo(50, 75).lineTo(540, 75).strokeColor("#cbd5e1").stroke();
        doc.moveDown(1.5);

        let currentY = 100;
        const features = (cleanBrief.requiredFeatures || []) as string[];
        features.forEach((feat) => {
          if (currentY > 700) {
            doc.addPage();
            doc.fillColor(primaryColor).rect(0, 0, 15, 842).fill();
            currentY = 50;
          }

          doc.fillColor(primaryColor).text("•", 55, currentY);
          doc
            .fillColor("#334155")
            .fontSize(10)
            .font("Helvetica")
            .text(feat, 70, currentY, { width: 430, align: "left" });
          currentY += 20;
        });
      }

      // End document
      doc.end();
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(projectName.replace(/\s+/g, "_"))}_specifications.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("PDF generation failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

