import { z } from 'zod';

export const overviewSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  projectDescription: z.string().min(100, "Please describe the project in at least 100 characters"),
  businessDescription: z.string().min(150, "Please describe your business in at least 150 characters"),
  projectProblem: z.string().min(10, "Please explain what problem this project solves (min 10 characters)"),
  targetAudience: z.string().min(10, "Please describe your target audience (min 10 characters)"),
});

export const technicalSchema = z.object({
  platform: z.string().min(1, "Please select a platform preference"),
  features: z.array(z.string()).min(1, "Please select at least one core feature"),
  traffic: z.string().min(1, "Please select expected traffic"),
  importantFeatures: z.string().min(10, "Please list the most important features (min 10 characters)"),
  primaryGoal: z.string().min(10, "Please describe the primary goal of the website/app (min 10 characters)"),
  visitorAction: z.string().min(10, "Please describe what action visitors should take (min 10 characters)"),
  neededPages: z.string().min(10, "Please list the pages you need (min 10 characters)"),
});

export const designSchema = z.object({
  style: z.string().min(1, "Please select a visual style preference"),
  hasGuidelines: z.boolean({ message: "Please specify if you have existing brand guidelines" }),
  competitors: z.string().min(2, "Please list at least one competitor or reference site"),
  likedWebsites: z.string().min(10, "Please share 2-3 websites you like (min 10 characters)"),
});

export const scopeSchema = z.object({
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a target timeline or launch date"),
  contentProvider: z.string().min(1, "Please specify who will provide the content"),
  notes: z.string().optional(),
});

export type OverviewFormValues = z.infer<typeof overviewSchema>;
export type TechnicalFormValues = z.infer<typeof technicalSchema>;
export type DesignFormValues = z.infer<typeof designSchema>;
export type ScopeFormValues = z.infer<typeof scopeSchema>;
