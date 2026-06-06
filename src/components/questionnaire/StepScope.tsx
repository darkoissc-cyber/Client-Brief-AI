import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Textarea } from '@/components/ui/textarea';

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-30k', label: '$15k – $30k' },
  { value: 'over-30k', label: '$30k+' },
];

const timelineOptions = [
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-6-months', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible' },
];

const contentProviders = [
  {
    value: 'client',
    label: 'Client Provided',
    desc: 'We will provide copy, photos, and structure.',
  },
  {
    value: 'developer',
    label: 'Developer Authored',
    desc: 'We need help writing copy and sourcing media.',
  },
  {
    value: 'collab',
    label: 'Collaborative',
    desc: 'A mix of client inputs and developer refining.',
  },
];

export const StepScope: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const data = formData.scope;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Budget & Scope
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          Project constraints, timeline, and content roles.
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Estimated Budget *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Select the estimated capital allocated for this project.
          </span>
        </div>
        {errors.budget && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.budget}
          </span>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {budgetRanges.map((opt) => {
            const selected = data.budget === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('scope', 'budget', opt.value)}
                className={`px-3 py-3.5 rounded-xl border text-center transition-all duration-200 outline-none text-[13px] font-medium ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-500'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Target Timeline *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Indicate your target release schedule or launch date.
          </span>
        </div>
        {errors.timeline && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.timeline}
          </span>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {timelineOptions.map((opt) => {
            const selected = data.timeline === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('scope', 'timeline', opt.value)}
                className={`px-3 py-3.5 rounded-xl border text-center transition-all duration-200 outline-none text-[13px] font-medium ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-500'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Provider */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            Who provides the content? *
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            Define who will supply copy, media assets, and structural text.
          </span>
        </div>
        {errors.contentProvider && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {errors.contentProvider}
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {contentProviders.map((opt) => {
            const selected = data.contentProvider === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  updateField('scope', 'contentProvider', opt.value)
                }
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 outline-none ${
                  selected
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <span
                  className={`text-[13px] font-semibold ${
                    selected ? 'text-neutral-900' : 'text-neutral-700'
                  }`}
                >
                  {opt.label}
                </span>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <Textarea
        label="Additional Notes"
        placeholder="Anything else you want to share? Special requests, hosting preferences, etc."
        value={data.notes}
        onChange={(e) => updateField('scope', 'notes', e.target.value)}
        error={errors.notes}
        rows={4}
        helperText="List any specific hosting preferences, third-party integrations, or special design notes."
        showCounter={true}
      />
    </div>
  );
};
export default StepScope;
