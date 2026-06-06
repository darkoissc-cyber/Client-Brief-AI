import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Check } from 'lucide-react';

export const QuestionnaireProgress: React.FC = () => {
  const { currentStep, goToStep, isStepValid } = useQuestionnaire();

  const steps = [
    { number: 1, label: 'Overview' },
    { number: 2, label: 'Technical' },
    { number: 3, label: 'Design' },
    { number: 4, label: 'Budget' },
    { number: 5, label: 'Review' },
  ];

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between w-full">
        {/* Track line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-neutral-200 -z-10 rounded-full">
          <div
            className="h-full bg-neutral-900 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isClickable =
            step.number <= currentStep ||
            (step.number === currentStep + 1 && isStepValid(currentStep));

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && goToStep(step.number)}
              className="flex flex-col items-center group relative focus:outline-none disabled:pointer-events-none"
            >
              <div
                className={`
                  w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-medium text-[13px]
                  transition-all duration-300
                  ${
                    isActive
                      ? 'border-neutral-900 bg-white text-neutral-900 shadow-sm'
                      : isCompleted
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-400 hover:border-neutral-300'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              <span
                className={`
                  absolute top-11 md:top-12 text-[10px] md:text-[11px] font-medium whitespace-nowrap mt-1
                  transition-all duration-300
                  ${
                    isActive
                      ? 'text-neutral-900 font-semibold'
                      : isCompleted
                      ? 'text-neutral-600'
                      : 'text-neutral-400'
                  }
                `}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-14 md:h-16" />
    </div>
  );
};
export default QuestionnaireProgress;
