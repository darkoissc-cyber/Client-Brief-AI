import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { projectId, notionToken, parentPageId } = await req.json();

    if (!projectId || !notionToken || !parentPageId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const brief = project.brief_data || {};

    // Call Notion API to create a page under parentPageId
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { page_id: parentPageId },
        properties: {
          title: {
            title: [{ text: { content: `Client Brief: ${brief.projectName || "New Project"}` } }],
          },
        },
        children: [
          {
            object: "block",
            type: "heading_1",
            heading_1: { rich_text: [{ text: { content: "Project Overview" } }] },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                { text: { content: brief.corePurpose || "No purpose provided." } },
              ],
            },
          },
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "Required Features" } }] },
          },
          ...((brief.requiredFeatures || []) as string[]).map((feature) => ({
            object: "block",
            type: "to_do",
            to_do: {
              rich_text: [{ text: { content: feature } }],
              checked: false,
            },
          })),
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "Design & Style Goals" } }] },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [{ text: { content: brief.designStyle || "No style defined." } }],
            },
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Notion page creation failed");
    }

    return NextResponse.json({ success: true, url: data.url });
  } catch (err: any) {
    console.error("Notion export failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
