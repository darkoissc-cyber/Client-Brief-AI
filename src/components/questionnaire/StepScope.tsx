import React, { useMemo } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations, translateValidationError } from '@/lib/translations';
import { Textarea } from '@/components/ui/textarea';
import { choiceBtnClass } from '@/lib/formStyles';

const getBudgetRanges = (lang: 'en' | 'ar') => [
  { value: 'under-5k', label: lang === 'ar' ? 'أقل من $5k' : 'Under $5k' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-30k', label: '$15k – $30k' },
  { value: 'over-30k', label: '$30k+' },
];

const getTimelineOptions = (lang: 'en' | 'ar') => [
  { value: '1-month', label: lang === 'ar' ? 'خلال شهر' : 'Within 1 month' },
  { value: '1-3-months', label: lang === 'ar' ? '1–3 أشهر' : '1–3 months' },
  { value: '3-6-months', label: lang === 'ar' ? '3–6 أشهر' : '3–6 months' },
  { value: 'flexible', label: lang === 'ar' ? 'مرن' : 'Flexible' },
];

const getContentProviders = (lang: 'en' | 'ar') => [
  {
    value: 'client',
    label: lang === 'ar' ? 'العميل يوفر المحتوى' : 'Client Provided',
    desc: lang === 'ar' ? 'سوف نقوم بتوفير النصوص، الصور، والهيكل التنظيمي.' : 'We will provide copy, photos, and structure.',
  },
  {
    value: 'developer',
    label: lang === 'ar' ? 'المطور يكتب المحتوى' : 'Developer Authored',
    desc: lang === 'ar' ? 'نحتاج لمساعدة في صياغة النصوص وتوفير أصول الميديا.' : 'We need help writing copy and sourcing media.',
  },
  {
    value: 'collab',
    label: lang === 'ar' ? 'تعاون مشترك' : 'Collaborative',
    desc: lang === 'ar' ? 'مزيج من مدخلات العميل وتهذيب وتنقيح المطور.' : 'A mix of client inputs and developer refining.',
  },
];

export const StepScope: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];
  const scope = t.questionnaire.scope;
  const data = formData.scope;

  const budgetRanges = useMemo(() => getBudgetRanges(language), [language]);
  const timelineOptions = useMemo(() => getTimelineOptions(language), [language]);
  const contentProviders = useMemo(() => getContentProviders(language), [language]);

  return (
    <div className="space-y-8 text-start">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          {scope.title}
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          {scope.desc}
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            {scope.fields.budget}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {scope.fields.budgetHelper}
          </span>
        </div>
        {errors.budget && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.budget, language)}
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
                className={choiceBtnClass(selected, 'px-3 py-3.5 text-center text-[13px] font-medium cursor-pointer')}
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
            {scope.fields.timeline}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {scope.fields.timelineHelper}
          </span>
        </div>
        {errors.timeline && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.timeline, language)}
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
                className={choiceBtnClass(selected, 'px-3 py-3.5 text-center text-[13px] font-medium cursor-pointer')}
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
            {scope.fields.content}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {scope.fields.contentHelper}
          </span>
        </div>
        {errors.contentProvider && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.contentProvider, language)}
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
                className={choiceBtnClass(selected, 'flex flex-col items-start p-4 text-start cursor-pointer')}
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
        label={scope.fields.notes}
        placeholder={scope.fields.notesPlaceholder}
        value={data.notes}
        onChange={(e) => updateField('scope', 'notes', e.target.value)}
        error={errors.notes && translateValidationError(errors.notes, language)}
        rows={4}
        helperText={scope.fields.notesHelper}
        showCounter={true}
      />
    </div>
  );
};
export default StepScope;

