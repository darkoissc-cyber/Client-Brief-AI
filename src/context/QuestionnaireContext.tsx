'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuestionnaireData, ValidationErrors } from '@/lib/types';
import { overviewSchema, technicalSchema, designSchema, scopeSchema } from '@/lib/schemas';
import { supabase } from '@/lib/supabase';
import { generateMarkdownBrief, generateAIPrompt } from '@/lib/brief';

interface QuestionnaireContextType {
  currentStep: number;
  formData: QuestionnaireData;
  errors: ValidationErrors;
  submitError: string | null;
  updateField: <S extends keyof QuestionnaireData, F extends keyof QuestionnaireData[S]>(
    stepKey: S,
    field: F,
    value: QuestionnaireData[S][F]
  ) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (step: number) => void;
  validateStep: (step: number) => boolean;
  isStepValid: (step: number) => boolean;
  isSubmitting: boolean;
  submitQuestionnaire: () => Promise<boolean>;
}

const initialData: QuestionnaireData = {
  overview: {
    projectName: '',
    clientName: '',
    clientEmail: '',
    projectDescription: '',
    businessDescription: '',
    projectProblem: '',
    targetAudience: '',
  },
  technical: {
    platform: '',
    features: [],
    traffic: '',
    importantFeatures: '',
    primaryGoal: '',
    visitorAction: '',
    neededPages: '',
  },
  design: {
    style: '',
    hasGuidelines: null,
    competitors: '',
    likedWebsites: '',
  },
  scope: {
    budget: '',
    timeline: '',
    contentProvider: '',
    notes: '',
  },
};

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'client_brief_ai_questionnaire';

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuestionnaireData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    let parsed = initialData;
    if (saved) {
      try {
        const local = JSON.parse(saved);
        parsed = {
          overview: { ...initialData.overview, ...local.overview },
          technical: { ...initialData.technical, ...local.technical },
          design: { ...initialData.design, ...local.design },
          scope: { ...initialData.scope, ...local.scope },
        };
      } catch (e) {
        console.error('Failed to load questionnaire data from local storage', e);
      }
    }
    setTimeout(() => {
      setFormData(parsed);
      setIsInitialized(true);
    }, 0);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      } catch (e) {
        console.error('Failed to save questionnaire data to local storage', e);
      }
    }
  }, [formData, isInitialized]);

  const updateField = <S extends keyof QuestionnaireData, F extends keyof QuestionnaireData[S]>(
    stepKey: S,
    field: F,
    value: QuestionnaireData[S][F]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value,
      },
    }));

    // Clear error for this field if it exists
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    let result;
    setErrors({});

    if (step === 1) {
      result = overviewSchema.safeParse(formData.overview);
    } else if (step === 2) {
      result = technicalSchema.safeParse(formData.technical);
    } else if (step === 3) {
      result = designSchema.safeParse(formData.design);
    } else if (step === 4) {
      result = scopeSchema.safeParse(formData.scope);
    } else {
      return true;
    }

    if (!result.success) {
      const fieldErrors: ValidationErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    return true;
  };

  // Check validity silently (without setting UI errors)
  const isStepValid = (step: number): boolean => {
    if (step === 1) return overviewSchema.safeParse(formData.overview).success;
    if (step === 2) return technicalSchema.safeParse(formData.technical).success;
    if (step === 3) return designSchema.safeParse(formData.design).success;
    if (step === 4) return scopeSchema.safeParse(formData.scope).success;
    return true;
  };

  const nextStep = (): boolean => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return false;
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    // Only allow clicking to steps that have already been validated or are previous steps
    if (step < currentStep) {
      setCurrentStep(step);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // To move forward to 'step', all steps up to step-1 must be valid
    let canProceed = true;
    for (let i = currentStep; i < step; i++) {
      if (!validateStep(i)) {
        canProceed = false;
        break;
      }
      setCurrentStep(i + 1);
    }

    if (canProceed) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitQuestionnaire = async (): Promise<boolean> => {
    // Validate all steps first
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return false;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const briefMarkdown = generateMarkdownBrief(formData);
      const aiPromptText = generateAIPrompt(formData);

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
        const msg = [error.message, error.hint, error.code].filter(Boolean).join(' — ');
        console.error('Supabase insert error:', error);
        throw new Error(msg || JSON.stringify(error));
      }
      
      // Clear local storage upon successful submit
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return true;
    } catch (error: unknown) {
      const e = error as Error | null;
      const message = e?.message || 'Submission failed. Please try again.';
      console.error('Submission failed:', message, error);
      setSubmitError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        submitError,
        updateField,
        nextStep,
        prevStep,
        goToStep,
        validateStep,
        isStepValid,
        isSubmitting,
        submitQuestionnaire,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
