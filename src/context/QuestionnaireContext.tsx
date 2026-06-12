'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { QuestionnaireData, ValidationErrors } from '@/lib/types';
import { overviewSchema, technicalSchema, designSchema, scopeSchema } from '@/lib/schemas';

interface QuestionnaireContextType {
  currentStep: number;
  formData: QuestionnaireData;
  errors: ValidationErrors;
  submitError: string | null;
  submitWarning: string | null;
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

const LEGACY_LOCAL_STORAGE_KEY = 'client_brief_ai_questionnaire';

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuestionnaireData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY);
    } catch {
      // Ignore storage access failures in hardened/private browser contexts.
    }
  }, []);

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
    if (step < currentStep) {
      setCurrentStep(step);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return false;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitWarning(null);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setSubmitWarning(
          payload?.error
            ? `Brief generated locally. Saving failed: ${payload.error}`
            : 'Brief generated locally, but saving to the database failed.'
        );
      }

      return true;
    } catch (error: unknown) {
      const e = error as Error | null;
      setSubmitWarning(
        e?.message
          ? `Brief generated locally. Saving failed: ${e.message}`
          : 'Brief generated locally, but saving to the database failed.'
      );
      return true;
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
        submitWarning,
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
