import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // 1. Fetch project brief metadata
    const { data: project, error: projErr } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (projErr || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 2. Fetch project deliverables
    const { data: deliverables, error: delivErr } = await supabase
      .from("deliverables")
      .select("*")
      .eq("project_id", projectId);

    if (delivErr) {
      console.error("Error fetching deliverables:", delivErr);
    }

    return NextResponse.json({
      brief: project.brief_data,
      persona: project.freelancer_persona,
      projectName: project.project_name,
      clientName: project.client_name,
      clientEmail: project.client_email,
      deliverables: deliverables || [],
    });
  } catch (err: any) {
    console.error("API deliverables fetch error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data: project, error: projErr } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projErr || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("*")
    .eq("project_id", projectId);

  return NextResponse.json({
    brief: project.brief_data,
    persona: project.freelancer_persona,
    projectName: project.project_name,
    clientName: project.client_name,
    clientEmail: project.client_email,
    deliverables: deliverables || [],
  });
}
