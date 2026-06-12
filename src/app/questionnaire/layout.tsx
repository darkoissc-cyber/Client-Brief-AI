import React from 'react';
import { QuestionnaireProvider } from '@/context/QuestionnaireContext';

export const metadata = {
  title: 'Project Questionnaire — Client Brief AI',
  description:
    'Provide your project requirements to automatically generate a structured development brief.',
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuestionnaireProvider>
      <div className="min-h-screen bg-[#e8e5df] text-[var(--form-text)] overflow-x-hidden relative flex flex-col">
        <main className="flex-grow flex items-start justify-center py-10 px-4 md:py-16">
          {children}
        </main>
      </div>
    </QuestionnaireProvider>
  );
}
