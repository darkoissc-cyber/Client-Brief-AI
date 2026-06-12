import React, { useMemo } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Check } from 'lucide-react';

export const QuestionnaireProgress: React.FC = () => {
  const { currentStep, goToStep, isStepValid, formData } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];

  const STEPS = useMemo(() => [
    { number: 1, label: t.questionnaire.steps.overview },
    { number: 2, label: t.questionnaire.steps.technical },
    { number: 3, label: t.questionnaire.steps.design },
    { number: 4, label: t.questionnaire.steps.scope },
    { number: 5, label: t.questionnaire.steps.review },
  ], [t]);

  const canAdvanceToNext = useMemo(
    () => isStepValid(currentStep),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep, formData, isStepValid]
  );

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Track + circles */}
      <div className="relative flex items-center justify-between w-full">

        {/* Background track */}
        <div
          className="absolute start-0 end-0 top-[18px] md:top-5 h-[2px] bg-neutral-200 -z-10"
          aria-hidden="true"
        />

        {/* Progress fill */}
        <div
          className="absolute start-0 top-[18px] md:top-5 h-[2px] bg-neutral-900 -z-10 rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
          aria-hidden="true"
        />

        {STEPS.map((step) => {
          const isActive    = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isClickable =
            step.number <= currentStep ||
            (step.number === currentStep + 1 && canAdvanceToNext);

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && goToStep(step.number)}
              aria-label={`Go to step ${step.number}: ${step.label}`}
              aria-current={isActive ? 'step' : undefined}
              className="flex flex-col items-center gap-2.5 focus:outline-none disabled:pointer-events-none cursor-pointer"
            >
              {/* Circle */}
              <div
                className={[
                  'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-350 select-none',
                  isCompleted
                    ? 'bg-neutral-900 border-2 border-neutral-900 text-white scale-100'
                    : isActive
                    ? 'bg-neutral-900 border-2 border-neutral-900 text-white scale-110 shadow-[0_0_0_4px_rgba(10,10,10,0.1),0_4px_14px_rgba(0,0,0,0.18)]'
                    : 'bg-white border-2 border-neutral-300 text-neutral-500',
                ].join(' ')}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[2.5]" strokeWidth={2.5} />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={[
                  'text-[10px] md:text-[11px] font-medium whitespace-nowrap transition-colors duration-200 leading-none',
                  isActive
                    ? 'text-neutral-900 font-semibold'
                    : isCompleted
                    ? 'text-neutral-600'
                    : 'text-neutral-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Spacer so content below clears the labels */}
      <div className="h-4" />
    </div>
  );
};

export default QuestionnaireProgress;

