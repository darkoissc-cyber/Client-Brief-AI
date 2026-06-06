'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionnaireProgress } from '@/components/questionnaire/QuestionnaireProgress';
import { StepOverview } from '@/components/questionnaire/StepOverview';
import { StepTechnical } from '@/components/questionnaire/StepTechnical';
import { StepDesign } from '@/components/questionnaire/StepDesign';
import { StepScope } from '@/components/questionnaire/StepScope';
import { StepReview } from '@/components/questionnaire/StepReview';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Download,
} from 'lucide-react';
import { generateMarkdownBrief, generateAIPrompt } from '@/lib/brief';

export default function QuestionnairePage() {
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    isSubmitting,
    submitQuestionnaire,
    submitError,
  } = useQuestionnaire();

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitQuestionnaire();
    if (success) {
      setSubmitted(true);
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOverview />;
      case 2:
        return <StepTechnical />;
      case 3:
        return <StepDesign />;
      case 4:
        return <StepScope />;
      case 5:
        return <StepReview />;
      default:
        return <StepOverview />;
    }
  };

  const briefMarkdown = generateMarkdownBrief(formData);
  const aiPromptText = generateAIPrompt(formData);

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(briefMarkdown);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownloadBrief = () => {
    const element = document.createElement('a');
    const file = new Blob([briefMarkdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.overview.projectName
      .toLowerCase()
      .replace(/\s+/g, '_')}_brief.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPrompt = () => {
    const element = document.createElement('a');
    const file = new Blob([aiPromptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.overview.projectName
      .toLowerCase()
      .replace(/\s+/g, '_')}_dev_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // ─── Success State ───
  if (submitted) {
    return (
      <div className="w-full max-w-2xl">
        <Card className="p-8 md:p-10 text-center space-y-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-success-pop">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
              Project Brief Generated
            </h1>
            <p className="text-[15px] text-neutral-500 max-w-md mx-auto">
              Your structured project brief and AI development prompt are ready.
            </p>
          </div>

          {/* Brief Preview */}
          <div className="space-y-1 text-left">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1">1. Project Brief</span>
            <div className="border border-neutral-200 bg-neutral-50 rounded-xl overflow-hidden">
              <div className="bg-white border-b border-neutral-100 px-4 py-2.5 flex items-center justify-between">
                <span className="text-[12px] text-neutral-400 font-medium">
                  project_brief.md
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyBrief}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-lg px-2.5 py-1 transition-all hover:bg-neutral-50"
                  >
                    {copiedBrief ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedBrief ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadBrief}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-lg px-2.5 py-1 transition-all hover:bg-neutral-50"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="p-5 max-h-[240px] overflow-y-auto text-[12px] text-neutral-600 font-mono whitespace-pre-wrap leading-relaxed select-text">
                {briefMarkdown}
              </pre>
            </div>
          </div>

          {/* Development Prompt Preview */}
          <div className="space-y-1 text-left">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1">2. AI Development Prompt</span>
            <div className="border border-neutral-200 bg-neutral-50 rounded-xl overflow-hidden">
              <div className="bg-white border-b border-neutral-100 px-4 py-2.5 flex items-center justify-between">
                <span className="text-[12px] text-neutral-400 font-medium">
                  development_prompt.txt
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-lg px-2.5 py-1 transition-all hover:bg-neutral-50"
                  >
                    {copiedPrompt ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadPrompt}
                    className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 border border-neutral-200 rounded-lg px-2.5 py-1 transition-all hover:bg-neutral-50"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="p-5 max-h-[240px] overflow-y-auto text-[12px] text-neutral-600 font-mono whitespace-pre-wrap leading-relaxed select-text bg-neutral-900! text-neutral-100!">
                {aiPromptText}
              </pre>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium transition-all"
            >
              Return Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium transition-all"
            >
              Start New Brief
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // ─── Form State ───
  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <Link
          href="/"
          className="inline-flex items-center text-[13px] text-neutral-400 hover:text-neutral-700 gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-neutral-400" />
          <span className="text-[13px] font-medium text-neutral-500">
            Project Questionnaire
          </span>
        </div>
      </div>

      {/* Stepper */}
      <QuestionnaireProgress />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 md:p-8">
          <CardContent className="p-0">{renderActiveStep()}</CardContent>
        </Card>

        {submitError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={
              currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < 5 ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Generate Brief
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
