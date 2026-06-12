import { z } from 'zod';

const platformOptions = ['nextjs', 'wordpress', 'shopify', 'custom'] as const;
const featureOptions = [
  'auth',
  'payments',
  'cms',
  'integrations',
  'search',
  'analytics',
  'multilingual',
  'realtime',
] as const;
const trafficOptions = ['under-10k', '10k-100k', '100k-1m', 'over-1m', 'unsure'] as const;
const styleOptions = ['minimalist', 'colorful', 'corporate', 'bold'] as const;
const budgetOptions = ['under-5k', '5k-15k', '15k-30k', 'over-30k'] as const;
const timelineOptions = ['1-month', '1-3-months', '3-6-months', 'flexible'] as const;
const contentProviderOptions = ['client', 'developer', 'collab'] as const;

const trimmedString = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, `Must be ${max} characters or fewer`);

const optionalTrimmedString = (max: number) =>
  z.string().trim().max(max, `Must be ${max} characters or fewer`).optional();

const oneOf = <T extends readonly string[]>(values: T, message: string) =>
  z.string().refine((value) => values.includes(value), { message });

export const overviewSchema = z.object({
  projectName: trimmedString(2, 120, "Project name must be at least 2 characters"),
  clientName: trimmedString(2, 120, "Client name must be at least 2 characters"),
  clientEmail: z.string().trim().email("Please enter a valid email address").max(254, "Email must be 254 characters or fewer"),
  projectDescription: trimmedString(100, 4000, "Please describe the project in at least 100 characters"),
  businessDescription: trimmedString(150, 4000, "Please describe your business in at least 150 characters"),
  projectProblem: trimmedString(10, 2000, "Please explain what problem this project solves (min 10 characters)"),
  targetAudience: trimmedString(10, 2000, "Please describe your target audience (min 10 characters)"),
}).strict();

export const technicalSchema = z.object({
  platform: oneOf(platformOptions, "Please select a platform preference"),
  features: z.array(oneOf(featureOptions, "Please select a valid feature")).min(1, "Please select at least one core feature").max(featureOptions.length, "Please select fewer features"),
  traffic: oneOf(trafficOptions, "Please select expected traffic"),
  importantFeatures: trimmedString(10, 3000, "Please list the most important features (min 10 characters)"),
  primaryGoal: trimmedString(10, 2000, "Please describe the primary goal of the website/app (min 10 characters)"),
  visitorAction: trimmedString(10, 1000, "Please describe what action visitors should take (min 10 characters)"),
  neededPages: trimmedString(10, 3000, "Please list the pages you need (min 10 characters)"),
}).strict();

export const designSchema = z.object({
  style: oneOf(styleOptions, "Please select a visual style preference"),
  hasGuidelines: z.boolean({ message: "Please specify if you have existing brand guidelines" }),
  competitors: trimmedString(2, 3000, "Please list at least one competitor or reference site"),
  likedWebsites: trimmedString(10, 3000, "Please share 2-3 websites you like (min 10 characters)"),
}).strict();

export const scopeSchema = z.object({
  budget: oneOf(budgetOptions, "Please select a budget range"),
  timeline: oneOf(timelineOptions, "Please select a target timeline or launch date"),
  contentProvider: oneOf(contentProviderOptions, "Please specify who will provide the content"),
  notes: optionalTrimmedString(3000),
}).strict();

export const questionnaireSchema = z.object({
  overview: overviewSchema,
  technical: technicalSchema,
  design: designSchema,
  scope: scopeSchema,
}).strict();

export type OverviewFormValues = z.infer<typeof overviewSchema>;
export type TechnicalFormValues = z.infer<typeof technicalSchema>;
export type DesignFormValues = z.infer<typeof designSchema>;
export type ScopeFormValues = z.infer<typeof scopeSchema>;
