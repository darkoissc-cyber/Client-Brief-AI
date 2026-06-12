import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { OpenAI } from "openai";

const useGroq = !!process.env.GROQ_API_KEY;
const openai = new OpenAI({
  apiKey: useGroq ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY,
  baseURL: useGroq ? "https://api.groq.com/openai/v1" : undefined
});
const AI_MODEL = useGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

export async function POST(req: NextRequest) {
  try {
    const { projectDescription, freelancerPersona } = await req.json();

    if (!projectDescription) {
      return NextResponse.json({ error: "Initial description is required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const persona = freelancerPersona || "Developer";

    // 1. Get or create a default freelancer user to avoid foreign key violations
    let { data: freelancer, error: userError } = await supabase
      .from("users")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (userError || !freelancer) {
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          email: "freelancer@smartbrief.ai",
          name: "Smart Freelancer",
          persona: "DEVELOPER",
        })
        .select("id")
        .single();

      if (createError || !newUser) {
        console.error("Bootstrap freelancer error:", createError);
        return NextResponse.json({ error: "Failed to initialize freelancer model", details: createError }, { status: 500 });
      }
      freelancer = newUser;
    }

    // 2. Create Project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        user_id: freelancer.id,
        project_name: "Brief for: " + projectDescription.slice(0, 40) + "...",
        client_name: "Valued Client",
        client_email: "client@example.com",
        status: "active",
        freelancer_persona: (persona.toUpperCase() === "DESIGNER" ? "DESIGNER" :
          persona.toUpperCase() === "MARKETER" ? "MARKETER" :
            persona.toUpperCase() === "AGENCY" ? "AGENCY" : "DEVELOPER") as any,
      })
      .select("id")
      .single();

    if (projectError || !project) {
      console.error("Create project error:", projectError);
      return NextResponse.json({ error: "Failed to create onboarding project" }, { status: 500 });
    }

    // 3. Create Chat Session
    const { data: chatSession, error: sessionError } = await supabase
      .from("chat_sessions")
      .insert({
        project_id: project.id,
        status: "CHATTING",
      })
      .select("id")
      .single();

    if (sessionError || !chatSession) {
      console.error("Create chat session error:", sessionError);
      return NextResponse.json({ error: "Failed to create chat session" }, { status: 500 });
    }

    // 4. Generate the opening tailored message from AI Project Manager
    const isArabic = projectDescription.split("").some((char: string) => {
      const code = char.charCodeAt(0);
      return code >= 0x0600 && code <= 0x06ff;
    });
    const replyLanguage = isArabic ? "Arabic" : "English";

    const systemPrompt = `You are an elite, polite Project Manager onboarding a client for a new web project.

CRITICAL LANGUAGE RULE — READ THIS FIRST:
- The client's language is: ${replyLanguage}.
- You MUST reply ENTIRELY in ${replyLanguage}. 
- Do NOT mix languages. Do NOT include any ${replyLanguage === "Arabic" ? "English" : "Arabic"} words, sentences, or phrases anywhere in your response.
- Even technical terms like "SaaS", "e-commerce", "dashboard" should be ${replyLanguage === "Arabic" ? "written in Arabic transliteration or explained in Arabic" : "kept in English"}.

Your goal: greet the client warmly, briefly acknowledge their project idea, and ask the first question:
${isArabic
        ? '"ما هو اسم موقعك الإلكتروني والغرض الأساسي منه؟ (مثال: متجر إلكتروني، معرض أعمال، منصة SaaS، منصة حجز)"'
        : '"What is the name and main purpose of your website? (e.g. e-commerce store, portfolio, SaaS dashboard, booking platform)"'
      }

Keep the greeting friendly, concise, and professional.`;

    let welcomeMessage = "";

    if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
      console.warn("API Keys are not defined. Running in Developer Mock Mode.");
      welcomeMessage = isArabic
        ? `مرحباً بك! ما هو اسم موقعك الإلكتروني والغرض الأساسي منه؟ (مثال: متجر إلكتروني، معرض أعمال، لوحة تحكم SaaS، منصة حجز)`
        : `Hello! What is the name and main purpose of your website? (e.g. e-commerce store, portfolio, SaaS dashboard, booking platform)`;
    } else {
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
            temperature: 0.3,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `I want to build: "${projectDescription}"` }
            ]
          });
          break; // success
        } catch (e: any) {
          console.warn(`Model ${model} failed, trying fallback:`, e.message || e);
          if (process.env.OPENAI_API_KEY) break;
        }
      }

      if (response) {
        welcomeMessage = response.choices[0]?.message?.content ||
          (isArabic
            ? "ما هو اسم موقعك الإلكتروني والغرض الأساسي منه؟ (مثال: متجر إلكتروني، معرض أعمال، لوحة تحكم SaaS، منصة حجز)"
            : "What is the name and main purpose of your website? (e.g. e-commerce store, portfolio, SaaS dashboard, booking platform)");
        welcomeMessage = welcomeMessage.replace(/[^\p{Script=Arabic}\p{Script=Latin}\p{Number}\p{Punctuation}\s]/gu, '');
      } else {
        console.warn("All LLM models rate limited or failed. Falling back to simulation mode.");
        welcomeMessage = isArabic
          ? `مرحباً بك! ما هو اسم موقعك الإلكتروني والغرض الأساسي منه؟ (مثال: متجر إلكتروني، معرض أعمال، لوحة تحكم SaaS، منصة حجز)`
          : `Hello! What is the name and main purpose of your website? (e.g. e-commerce store, portfolio, SaaS dashboard, booking platform)`;
      }
    }

    // Save initial assistant message to history
    await supabase.from("chat_messages").insert({
      session_id: chatSession.id,
      role: "assistant",
      content: welcomeMessage,
    });

    return NextResponse.json({
      sessionId: chatSession.id,
      welcomeMessage,
    });
  } catch (err: any) {
    console.error("API session error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error", stack: err.stack }, { status: 500 });
  }
}
