import { NextRequest, NextResponse } from 'next/server';
import { generateAIPrompt, generateMarkdownBrief } from '@/lib/brief';
import { questionnaireSchema } from '@/lib/schemas';
import { getSupabaseServerClient } from '@/lib/supabase';
import { QuestionnaireData } from '@/lib/types';

export const runtime = 'nodejs';

const MAX_BODY_CHARS = 25_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';

  return request.headers.get('x-real-ip') || 'unknown';
};

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
};

const jsonError = (status: number, message: string) =>
  NextResponse.json({ error: message }, { status });

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return jsonError(403, 'Submission requests must come from this site.');
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonError(429, 'Too many submissions. Please try again later.');
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_CHARS) {
      return jsonError(413, 'Submission is too large.');
    }

    payload = JSON.parse(rawBody);
  } catch {
    return jsonError(400, 'Invalid submission payload.');
  }

  const result = questionnaireSchema.safeParse(payload);
  if (!result.success) {
    return jsonError(400, 'Please review the form and try again.');
  }

  const formData: QuestionnaireData = {
    ...result.data,
    scope: {
      ...result.data.scope,
      notes: result.data.scope.notes || '',
    },
  };

  try {
    const briefMarkdown = generateMarkdownBrief(formData);
    const aiPromptText = generateAIPrompt(formData);
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from('submissions').insert({
      project_name: formData.overview.projectName,
      client_name: formData.overview.clientName,
      client_email: formData.overview.clientEmail,
      project_description: formData.overview.projectDescription,
      business_description: formData.overview.businessDescription,
      project_problem: formData.overview.projectProblem,
      target_audience: formData.overview.targetAudience,
      primary_goal: formData.technical.primaryGoal,
      visitor_action: formData.technical.visitorAction,
      needed_pages: formData.technical.neededPages,
      important_features: formData.technical.importantFeatures,
      liked_websites: formData.design.likedWebsites,
      platform: formData.technical.platform,
      features: formData.technical.features,
      traffic: formData.technical.traffic,
      style: formData.design.style,
      has_guidelines: formData.design.hasGuidelines,
      competitors: formData.design.competitors || null,
      budget: formData.scope.budget,
      timeline: formData.scope.timeline,
      content_provider: formData.scope.contentProvider,
      notes: formData.scope.notes || null,
      generated_brief: briefMarkdown,
      generated_prompt: aiPromptText,
      status: 'new',
    });

    if (error) {
      console.error('Submission insert failed', { code: error.code });
      return jsonError(500, 'Submission failed. Please try again.');
    }

    return NextResponse.json({ ok: true });
  } catch {
    return jsonError(500, 'Submission failed. Please try again.');
  }
}
