export interface OverviewData {
  projectName: string;
  clientName: string;
  clientEmail: string;
  projectDescription: string;
  businessDescription: string;
  projectProblem: string;
  targetAudience: string;
}

export interface TechnicalData {
  platform: string;
  features: string[];
  traffic: string;
  importantFeatures: string;
  primaryGoal: string;
  visitorAction: string;
  neededPages: string;
}

export interface DesignData {
  style: string;
  hasGuidelines: boolean | null;
  competitors: string;
  likedWebsites: string;
}

export interface ScopeData {
  budget: string;
  timeline: string;
  contentProvider: string;
  notes: string;
}

export interface QuestionnaireData {
  overview: OverviewData;
  technical: TechnicalData;
  design: DesignData;
  scope: ScopeData;
}

export type FormStepKey = 'overview' | 'technical' | 'design' | 'scope';

export interface ValidationErrors {
  [key: string]: string;
}

export interface Submission {
  id: string;
  created_at: string;
  project_name: string;
  client_name: string;
  client_email: string;
  project_description: string;
  business_description: string | null;
  project_problem: string | null;
  target_audience: string | null;
  primary_goal: string | null;
  visitor_action: string | null;
  needed_pages: string | null;
  important_features: string | null;
  liked_websites: string | null;
  platform: string;
  features: string[];
  traffic: string;
  style: string;
  has_guidelines: boolean | null;
  competitors: string;
  budget: string;
  timeline: string;
  content_provider: string;
  notes: string;
  generated_brief: string | null;
  generated_prompt: string | null;
  status: string;
}
