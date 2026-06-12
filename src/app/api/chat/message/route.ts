import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { OpenAI } from "openai";

const useGroq = !!process.env.GROQ_API_KEY;
const openai = new OpenAI({
  apiKey: useGroq ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY,
  baseURL: useGroq ? "https://api.groq.com/openai/v1" : undefined
});
const AI_MODEL = useGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

const BRIEF_SCHEMA = {
  type: "object",
  properties: {
    projectName: { type: "string" },
    corePurpose: { type: "string" },
    targetAudience: { type: "string" },
    technicalStack: { type: "string" },
    requiredFeatures: { type: "array", items: { type: "string" } },
    designStyle: { type: "string" },
    budgetTimeline: { type: "string" },
  },
  required: [
    "projectName",
    "corePurpose",
    "targetAudience",
    "technicalStack",
    "requiredFeatures",
    "designStyle",
    "budgetTimeline",
  ],
};

// Helper: Generates specialized deliverables based on the project brief and persona
async function generateDeliverable(projectId: string, briefData: any, supabase: any) {
  try {
    const prompts = [
      {
        type: "SRS",
        text: `You are an expert Senior Software Architect and Database Engineer. Your task is to generate a production-ready, highly secure, and logically flawless technical architecture for the project. You must enforce strict architectural rules to prevent normalization flaws, data-type mismatches, and routing logic errors.

## Part 1: Strict Database Schema Rules (Anti-Error Guard)
1. **Data Type Matching for Foreign Keys (CRITICAL):**
   - Every Foreign Key (FK) MUST have the exact same data type as the Primary Key (PK) it references.
   - If users.id is UUID, then orders.user_id MUST be UUID (NOT integer or text).
   - If products.id is UUID, then order_items.product_id MUST be UUID.
2. **Supabase Auth Best Practices (If Supabase is used):**
   - Do NOT store raw or manually hashed passwords in custom tables. Use the native auth.users schema.
   - For custom user data, create a public.profiles table linked via id UUID REFERENCES auth.users(id) ON DELETE CASCADE.
3. **Audit Columns:**
   - Every table must have created_at and updated_at timestamps.
   - Implement an automatic trigger function to update updated_at on every row modification.
4. **Constraints and Validation:**
   - All financial/monetary fields (prices, amounts) must be defined as DECIMAL(12, 2) and include a CHECK constraint to prevent negative values (e.g., CHECK (price >= 0)).
   - Quantities must include a CHECK constraint ensuring they are greater than or equal to zero.
5. **Junction Table / Normalization Rule:**
   - Do NOT put product_id directly on the orders table. Use an order_items table linking order_id to product_id with quantity and price_at_purchase (decimal) fields.

## Part 2: Logical API Routing & Security Rules
1. **Authentication Route Access:**
   - Auth-initiation routes (e.g., /api/auth/login, /api/auth/register, /api/auth/forgot-password) MUST be defined as PUBLIC (Unauthenticated).
   - Do NOT mark login/register endpoints as "Protected", as unauthenticated guests must access them to authenticate.
2. **CORS and Rate Limiting Policies:**
   - Define explicit, tiered rate limits: Public Reads (Low risk), Authenticated Writes (Medium risk), Admin operations (High risk/strict limit).
   - Explicitly define CORS policies: Public API routes allow * (or specified origins), while Protected/Write API routes restrict origins strictly to the project domain.
   - Output endpoint table with columns: Method | Route | Auth Level | Detailed Validation Logic.

## Part 3: Third-Party & Webhook Integration Rules (If Applicable)
1. **Raw Body Requirement:** Specify that webhook endpoints MUST receive and parse the raw request body to verify the cryptographic signature (preventing webhook spoofing).
2. **State Machine Consistency:**
   - Map external event states (e.g., payment_intent.succeeded) directly to DB statuses using safe string lists or PostgreSQL ENUM types.
   - Constrain statuses using a CHECK constraint on the DB level.
   - Specify STRIPE_WEBHOOK_SECRET in env variables as server-only.

## Part 4: Mandatory Self-Verification Checklist (AI Pre-Output Validation)
1. [ ] Type Check: Are all referenced foreign keys matching the exact data types of their primary keys?
2. [ ] Auth Route Check: Are registration and login endpoints accessible without requiring a token?
3. [ ] Supabase Auth Check: Is password handling safely managed by the auth provider, not manually in public tables?
4. [ ] No Placeholders: Ensure no template placeholders, draft indicators, or unfinished logic blocks exist in the output.

## Output Format Requirements
Provide the architecture in clean Markdown format containing:
1. Corrected, production-ready SQL DDL Scripts.
2. API Routing Table (Method, Route, Auth Level, Detailed Validation Logic).
3. Integration Sequence Flow (e.g., Webhook security and DB update sequence).
4. Env Variables Table with columns: Variable | Used In | Safe to Expose?

INPUT SUMMARY:
${JSON.stringify(briefData, null, 2)}
`
      },
      {
        type: "STYLE_GUIDE",
        text: `You are a senior UI/UX designer and design systems architect. Your role is to generate professional, production-ready Design Briefs for web applications.

Apply these rules strictly:

## 1. TYPOGRAPHY — BILINGUAL / RTL PROJECTS
- If target audience is Arabic-speaking or layout needs RTL support:
  - Never assign a Latin-only font as the sole display font.
  - Define a dual-font system:
    - Arabic context (:lang(ar)): use an Arabic-supporting font (Tajawal, Cairo, or Almarai) for headings & body.
    - English context (:lang(en)): use Montserrat or Open Sans for headings, neutral sans-serif for body.
  - Include the CSS :lang() switching snippet and the Google Fonts @import line for both fonts.
  - Default direction must be dir="rtl" lang="ar" if primary audience is Arabic-speaking.

## 2. SYSTEMIC COLOR SYSTEM
- Do NOT output flat color values (like #3498db and #2ecc71 on hover). Define systemic color scales matching Tailwind CSS config schemas (e.g. Primary-50, Primary-500, Primary-900) for UI roles.
- Provide a color system markdown table with columns:
  | Token name | Hex | Usage context |
- Never use the same hex for two different role tokens without a clear note.
- Include WCAG Contrast Safety notes (e.g., verify that white text on the Primary-500 button meets WCAG AA contrast standards of 4.5:1).

## 3. COMPONENT STATES & BLUEPRINT LAYOUT
- For every component in the inventory (buttons, inputs, navigation, etc.), define its exact states: default, hover, active, disabled, loading/skeleton, empty, and error. For input errors: use border color + message below, never background color change.
- **Landing Page Layout Grid Blueprint:** Specify exactly what sections are required on the homepage (e.g., Hero Section, Trust Badges, Categorized Product Grid, CTA Banner, Footer) and their grid/flexbox layouts.

## GLOBAL RULES
- Never output placeholder text like [City], [Country], [Brand] or [Insert X].
- Reference the same project name, stack, and target audience. Keep consistent with the Developer SRS.

INPUT SUMMARY:
${JSON.stringify(briefData, null, 2)}
`
      },
      {
        type: "SOW",
        text: `You are a digital marketing strategist specializing in e-commerce and web platforms. Your task is to generate a realistic, marketing scope of work (SOW).

Apply these rules strictly:

## 1. NO PLACEHOLDER TEXT — EVER
- Never output placeholder values like [City], [Country], [Brand], [Platform], or [Insert X].
- If location/market is not specified, infer it logically from the project context. If target region is unknown, generate two variants: Gulf region (UAE + KSA) and Levant (Jordan + Lebanon + Syria + Palestine).

## 2. SEO KEYWORDS
- Generate 8-10 real, specific keywords (no generic templates).
- Include at minimum: 3 geo-targeted keywords (with city or country), 3 intent-based keywords, and 2 audience-specific keywords.
- Estimate difficulty on a 0.0–1.0 scale.
- If primary language is Arabic, write keywords in Arabic script.

## 3. INFLUENCER MARKETING
- If target audience is aged 18–40 and active on social media (fashion, beauty, food, lifestyle, fitness, e-commerce), include an Influencer Marketing section with:
  - Three tiers: Nano (1K–10K), Micro (10K–100K), Macro (100K+)
  - Partnership model per tier: gifting vs. paid
  - Content format recommendations relevant to the category
  - KPIs: reach, engagement rate, estimated CPA
  - Platform priority based on target demographics
  - UTM-based tracking instruction for each tier

## 4. DEEP COMPETITIVE MATRIX
- Output a structured "Competitive Analysis Matrix" table comparing real, verifiable competitors:
  | Competitor Name | Strengths | Weaknesses | Our Strategic Opportunity |

## 5. GRANULAR BUDGET & CHANNEL ALLOCATION
- Output percentage-based budget allocations per channel (e.g. 40% TikTok/Meta Paid Ads, 30% Influencer sponsorships, 20% SEO & Content, 10% Tools & Operations) and specify the currency explicitly (implied by the target market, no AED/Adjustable placeholding).
- Label all budget ranges as estimates requiring actual vendor quotes.

## 6. ACTIONABLE KPIs
- Define CAC (Customer Acquisition Cost), ROAS (Return on Ad Spend) targets, and Conversion Rate benchmarks.

## GLOBAL RULES
- Strictly write the entire document in the same language the user used to answer the questions.
- No placeholders. Keep fully consistent with the other documents.

INPUT SUMMARY:
${JSON.stringify(briefData, null, 2)}
`
      }
    ];

    const models = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "llama3-8b-8192",
      "mixtral-8x7b-32768"
    ];

    for (const prompt of prompts) {
      let response = null;
      if (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY) {
        for (const model of models) {
          try {
            const modelToUse = process.env.OPENAI_API_KEY ? "gpt-4o-mini" : model;
            response = await openai.chat.completions.create({
              model: modelToUse,
              temperature: 0.3,
              messages: [{ role: "user", content: prompt.text }],
            });
            break; // success
          } catch (e: any) {
            console.warn(`Model ${model} failed for deliverable ${prompt.type}, trying fallback:`, e.message || e);
            if (process.env.OPENAI_API_KEY) break;
          }
        }
      }

      let markdownContent = response?.choices[0]?.message?.content;

      if (!markdownContent) {
        console.warn(`All LLM models failed for deliverable ${prompt.type}. Generating mock fallback.`);
        if (prompt.type === "STYLE_GUIDE") {
          markdownContent = `# Brand Visual Style Guide\n\n## 1. Palette Distribution\n- Dominant (60%): HSL(220, 15%, 10%)\n- Secondary (30%): HSL(200, 10%, 95%)\n- Accent (10%): HSL(142, 70%, 45%)\n\n## 2. Typography\n- Headers: Outfit (600, 700)\n- Body text: Plus Jakarta Sans (400, 500)\n\n## 3. Spacing Grid\n- Spacing system uses 4px grid. Base margins are 16px and 24px.`;
        } else if (prompt.type === "SOW") {
          markdownContent = `# Marketing Scope Document — ${briefData.projectName || "Project"}\n\n## 1. Target Audience\n- High-intent digital buyers and modern tech consumers.\n\n## 2. Core Value Propositions\n- Direct checkout integration, high reliability, and speed.\n\n## 3. Competitive Analysis\n- Primary local competitors. Differentiation key is premium styling and instant loading.\n\n## 4. SEO Requirements\n- Target long-tail localized queries. Include search-optimized metadata.\n\n## 5. Launch Checklist\n- Week 1: Identity & wireframes. Week 2-4: Core implementation. Week 5: QA and deployment.`;
        } else {
          markdownContent = `# System Requirements Specification (SRS)\n\n## 1. Architecture Stack Overview\nThe system uses Next.js App Router, Tailwind CSS, and Supabase database.\n\n## 2. Key Functional Modules\n- **Auth:** Email login using Supabase GoTrue.\n- **Database:** Optimized schema for entities and relations.\n\n## 3. Recommended Database Schema\n\`\`\`sql\nCREATE TABLE profiles (\n  id UUID PRIMARY KEY REFERENCES auth.users,\n  updated_at TIMESTAMPTZ,\n  username TEXT UNIQUE\n);\n\`\`\``;
        }
      }

      await supabase.from("deliverables").insert({
        project_id: projectId,
        type: prompt.type,
        markdown_content: markdownContent,
      });

      // Sequential delay to avoid Groq rate limit spikes
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } catch (err) {
    console.error("Error generating deliverables:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();
    if (!sessionId || !message) {
      return NextResponse.json({ error: "Missing required inputs" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // 1. Fetch Session & History
    const { data: session, error: sessionErr } = await supabase
      .from("chat_sessions")
      .select("*, projects(*)")
      .eq("id", sessionId)
      .single();

    if (sessionErr || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status === "completed") {
      return NextResponse.json({
        isCompleted: true,
        brief: session.projects?.brief_data,
      });
    }

    const { data: messages, error: msgsErr } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (msgsErr) throw msgsErr;

    // 2. Save User Message
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role: "user",
      content: message,
    });

    const conversationHistory = [
      ...messages.map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const questionCount = messages.filter((m: any) => m.role === "assistant").length + 1;
    const persona = session.projects?.freelancer_persona || "DEVELOPER";

    // Detect conversation language from history
    const allText = conversationHistory.map((m: any) => m.content).join(" ");
    const isArabicConversation = allText.split("").some((char: string) => {
      const code = char.charCodeAt(0);
      return code >= 0x0600 && code <= 0x06ff;
    });
    const replyLanguage = isArabicConversation ? "Arabic" : "English";

    // 3. Compile System Instruction
    const systemPrompt = `You are an expert full-stack web project consultant specializing in generating comprehensive project documentation. Your job is to interview the user about their website idea and then produce three professional documents: an SRS (System Requirements Specification), a Design Brief, and a Marketing Scope of Work (SOW).

CRITICAL LANGUAGE RULE — THIS OVERRIDES EVERYTHING:
- The conversation language is: ${replyLanguage}.
- You MUST write your ENTIRE response in ${replyLanguage} ONLY.
- Do NOT mix languages. Do NOT write even a single word in ${replyLanguage === "Arabic" ? "English" : "Arabic"}.
- This is absolute. No exceptions. Even punctuation context should follow ${replyLanguage} conventions.

Ask the user exactly these 6 questions, one at a time. Wait for each answer before asking the next:
${isArabicConversation ? `1. "ما هو اسم موقعك الإلكتروني والغرض الأساسي منه؟ (مثال: متجر إلكتروني، معرض أعمال، لوحة تحكم، منصة حجز)"
2. "من هو جمهورك المستهدف؟ صف لغتهم، فئتهم العمرية، وموقعهم الجغرافي إن أمكن."
3. "ما هي الميزات الأساسية من 3 إلى 5 التي يجب أن تتوفر في موقعك؟"
4. "ما هي مجموعة التقنيات التي تفضلها، أم تريد أن أقترح عليك واحدة؟ (مثال: React، Next.js، Laravel)"
5. "هل لديك توجه بصري معين؟ (مثال: فاخر، بسيط، ملون، رسمي) — أم أصمم من الصفر؟"
6. "ما هو حجم المستخدمين المتوقع والجدول الزمني المستهدف للإطلاق؟"` : `1. "What is the name and main purpose of your website? (e.g. e-commerce store, portfolio, SaaS dashboard, booking platform)"
2. "Who is your target audience? Describe their language, age range, and location if possible."
3. "What are the 3–5 core features your website must have?"
4. "What tech stack do you prefer, or should I recommend one? (e.g. React + Node.js, Next.js, Laravel...)"
5. "Do you have a visual direction in mind? (e.g. luxury, minimal, colorful, corporate) — or should I design one from scratch?"
6. "What is your expected user scale and launch timeline?"`}

We are at question #${questionCount} of 6.
Do not generate specs or call 'compile_final_brief' until all 6 questions are answered.
As soon as you hit question 6 and the user answers it, call 'compile_final_brief' to finish.`;


    // 4. LLM Request or Mock fallback
    if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
      console.warn("API Keys are not defined. Running in Developer Mock Mode.");

      const isArabic = message.split("").some((char: string) => {
        const code = char.charCodeAt(0);
        return code >= 0x0600 && code <= 0x06ff;
      });

      if (questionCount >= 6) {
        // Compile mock brief
        const briefData = {
          projectName: session.projects?.project_name || "Smart Brief Project",
          corePurpose: isArabic ? "موقع ويب تجاري تم إنشاؤه تلقائياً لأغراض التجربة والعرض." : "A modern e-commerce project designed for showcasing interactive brief generation.",
          targetAudience: isArabic ? "العملاء والمستخدمين المهتمين بالشراء والتصفح السريع." : "Digital shoppers and modern tech consumers.",
          technicalStack: isArabic ? "React, Next.js, Supabase, Tailwind CSS, Stripe" : "React, Next.js, Supabase, Tailwind CSS, Stripe",
          requiredFeatures: isArabic
            ? ["توثيق حسابات المستخدمين", "بوابة الدفع الإلكتروني (Stripe)", "سلة تسوق ديناميكية", "لوحة تحكم إدارية"]
            : ["User Authentication", "Stripe Checkout Integration", "Dynamic Shopping Cart", "Admin Metrics Panel"],
          designStyle: isArabic ? "تصميم بسيط وأنيق (Minimalist)" : "Modern Minimalist Design",
          budgetTimeline: isArabic ? "الميزانية: $5,000 - $15,000 | الزمن: 1-2 أشهر" : "Budget: $5k-$15k | Timeline: 1-2 months"
        };

        // Update session
        await supabase
          .from("chat_sessions")
          .update({ status: "completed" })
          .eq("id", sessionId);

        await supabase
          .from("projects")
          .update({
            brief_data: briefData,
            status: "completed",
          })
          .eq("id", session.project_id);

        // Generate mock deliverables based on persona
        await generateDeliverable(session.project_id, briefData, supabase);

        return NextResponse.json({ isCompleted: true, brief: briefData, projectId: session.project_id });
      }

      // Generate mock replies
      const repliesAr = [
        "من هو جمهورك المستهدف؟ صف لغتهم، فئتهم العمرية، وموقعهم الجغرافي إن أمكن.",
        "ما هي الميزات الأساسية من 3 إلى 5 التي يجب أن تتوفر في موقعك الإلكتروني؟",
        "ما هي مجموعة التقنيات (Tech Stack) التي تفضلها، أم ترغب في أن أقترح عليك واحدة؟ (مثل React + Node.js، Next.js، Laravel...)",
        "هل لديك تصور بصري للموقع؟ (مثل: فاخر، بسيط، ملون، رسمي) - أم يجب أن أصممه من الصفر؟",
        "ما هو حجم المستخدمين المتوقع والجدول الزمني المستهدف لإطلاق المشروع؟",
        "شكراً لك. هل هناك أي ملاحظات إضافية قبل توليد موجز المشروع؟"
      ];
      const repliesEn = [
        "Who is your target audience? Describe their language, age range, and location if possible.",
        "What are the 3–5 core features your website must have?",
        "What tech stack do you prefer, or should I recommend one? (e.g. React + Node.js, Next.js, Laravel...)",
        "Do you have a visual direction in mind? (e.g. luxury, minimal, colorful, corporate) — or should I design one from scratch?",
        "What is your expected user scale and launch timeline?",
        "Thank you. Any final notes before we compile the brief?"
      ];

      const reply = isArabic
        ? (repliesAr[questionCount - 2] || "شكراً لك. هل هناك أي ملاحظات إضافية قبل توليد موجز المشروع؟")
        : (repliesEn[questionCount - 2] || "Thank you. Any final notes before we compile the brief?");

      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: reply,
      });

      return NextResponse.json({
        isCompleted: false,
        reply: reply,
        questionCount,
      });
    }

    const models = [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "llama3-8b-8192",
      "mixtral-8x7b-32768"
    ];

    let response = null;
    for (const model of models) {
      try {
        const modelToUse = process.env.OPENAI_API_KEY ? "gpt-4o-mini" : model;
        response = await openai.chat.completions.create({
          model: modelToUse,
          temperature: 0.1,
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "compile_final_brief",
                description: "Call this only when you have gathered all details (or reached 6 questions) to compile the final structured JSON brief.",
                parameters: BRIEF_SCHEMA,
              },
            },
          ],
          tool_choice: questionCount >= 6 ? { type: "function", function: { name: "compile_final_brief" } } : "auto",
        });
        break; // success
      } catch (e: any) {
        console.warn(`Model ${model} failed in message loop, trying fallback:`, e.message || e);
        if (process.env.OPENAI_API_KEY) break;
      }
    }

    if (!response) {
      console.warn("All LLM models failed in message loop. Generating mock fallback.");
      const isArabic = message.split("").some((char: string) => {
        const code = char.charCodeAt(0);
        return code >= 0x0600 && code <= 0x06ff;
      });

      if (questionCount >= 6) {
        // Compile mock brief
        const briefData = {
          projectName: session.projects?.project_name || "Smart Brief Project",
          corePurpose: isArabic ? "موقع ويب تجاري تم إنشاؤه تلقائياً لأغراض التجربة والعرض." : "A modern e-commerce project designed for showcasing interactive brief generation.",
          targetAudience: isArabic ? "العملاء والمستخدمين المهتمين بالشراء والتصفح السريع." : "Digital shoppers and modern tech consumers.",
          technicalStack: "React, Next.js, Supabase, Tailwind CSS, Stripe",
          requiredFeatures: isArabic
            ? ["توثيق حسابات المستخدمين", "بوابة الدفع الإلكتروني (Stripe)", "سلة تسوق ديناميكية", "لوحة تحكم إدارية"]
            : ["User Authentication", "Stripe Checkout Integration", "Dynamic Shopping Cart", "Admin Metrics Panel"],
          designStyle: isArabic ? "تصميم بسيط وأنيق (Minimalist)" : "Modern Minimalist Design",
          budgetTimeline: isArabic ? "الميزانية: $5,000 - $15,000 | الزمن: 1-2 أشهر" : "Budget: $5k-$15k | Timeline: 1-2 months"
        };

        // Update session
        await supabase
          .from("chat_sessions")
          .update({ status: "completed" })
          .eq("id", sessionId);

        await supabase
          .from("projects")
          .update({
            brief_data: briefData,
            status: "completed",
          })
          .eq("id", session.project_id);

        // Generate mock deliverables based on persona
        await generateDeliverable(session.project_id, briefData, supabase);

        return NextResponse.json({ isCompleted: true, brief: briefData, projectId: session.project_id });
      }

      // Generate next question from list
      const repliesAr = [
        "فهمت ذلك. ما هي الصفحات الرئيسية التي ترغب في إضافتها للموقع؟ (مثال: الرئيسية، تفاصيل المنتج، من نحن)",
        "ممتاز. ما هو الطابع البصري وتفضيل الألوان المقترح الذي تفضله؟ (بسيط، ملون، رسمي)",
        "جميل جداً. ما هي الميزانية التقريبية والجدول الزمني المستهدف لإطلاق هذا المشروع؟"
      ];
      const repliesEn = [
        "Understood. What are the key features and modules you need? (e.g., login, payment gateway, search)",
        "Got it. What visual design style and branding colors do you prefer?",
        "Excellent. What is your estimated budget range and target launch timeline for this project?"
      ];

      const reply = isArabic
        ? (repliesAr[questionCount - 1] || "شكراً لك. هل هناك أي ملاحظات إضافية قبل توليد موجز المشروع؟")
        : (repliesEn[questionCount - 1] || "Thank you. Any final notes before we compile the brief?");

      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: reply,
      });

      return NextResponse.json({
        isCompleted: false,
        reply: reply,
        questionCount,
      });
    }

    const choice = response.choices[0];
    const toolCall = choice.message.tool_calls?.[0] as any;

    if (toolCall && toolCall.function.name === "compile_final_brief") {
      const briefData = JSON.parse(toolCall.function.arguments);

      // Save final brief & update session status
      await supabase
        .from("chat_sessions")
        .update({ status: "completed" })
        .eq("id", sessionId);

      await supabase
        .from("projects")
        .update({
          brief_data: briefData,
          status: "completed",
        })
        .eq("id", session.project_id);

      // Trigger asynchronous deliverable generation matching the freelancer persona
      await generateDeliverable(session.project_id, briefData, supabase);

      return NextResponse.json({ isCompleted: true, brief: briefData, projectId: session.project_id });
    }

    // Save assistant reply (Sanitize to remove hallucinatory characters)
    let assistantReply = choice.message.content || "Could you tell me more about that?";
    assistantReply = assistantReply.replace(/[^\p{Script=Arabic}\p{Script=Latin}\p{Number}\p{Punctuation}\s]/gu, '');

    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role: "assistant",
      content: assistantReply,
    });

    return NextResponse.json({
      isCompleted: false,
      reply: assistantReply,
      questionCount,
    });
  } catch (err: any) {
    console.error("Chat message loop error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
