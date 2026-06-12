import React, { useMemo } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations, translateValidationError } from '@/lib/translations';
import { Textarea } from '@/components/ui/textarea';
import { choiceBtnClass } from '@/lib/formStyles';
import { Layers, Palette, ShieldCheck, Sparkles } from 'lucide-react';

const getVisualStyles = (lang: 'en' | 'ar') => [
  {
    id: 'minimalist',
    name: lang === 'ar' ? 'بسيط ونظيف (Minimalist)' : 'Clean & Minimalist',
    desc: lang === 'ar' ? 'تركيز على الخطوط وتنسيق المساحات والفروقات البسيطة.' : 'Typography-focused, breathing space, subtle contrasts.',
    icon: Layers,
  },
  {
    id: 'colorful',
    name: lang === 'ar' ? 'نابض بالحياة ومبهج' : 'Vibrant & Playful',
    desc: lang === 'ar' ? 'ألوان جريئة وتدرجات وتأثيرات تفاعلية حية.' : 'Bold palettes, gradients, interactive animations.',
    icon: Palette,
  },
  {
    id: 'corporate',
    name: lang === 'ar' ? 'أنيق ورسمي (مهني)' : 'Sleek & Professional',
    desc: lang === 'ar' ? 'تخطيط نظيف، هيكلية موثوقة، جماليات أعمال كلاسيكية.' : 'Clean layout, trusted structure, business aesthetics.',
    icon: ShieldCheck,
  },
  {
    id: 'bold',
    name: lang === 'ar' ? 'حديث وجريء (Modern & Bold)' : 'Modern & Bold',
    desc: lang === 'ar' ? 'فروقات تباين عالية، ألوان داكنة، مظهر معاصر وجذاب.' : 'High contrast, dark tones, contemporary feel.',
    icon: Sparkles,
  },
];

export const StepDesign: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];
  const design = t.questionnaire.design;
  const data = formData.design;

  const visualStyles = useMemo(() => getVisualStyles(language), [language]);

  const guidelinesOptions = useMemo(() => [
    { label: language === 'ar' ? 'نعم، لدينا خطوط إرشادية جاهزة' : 'Yes, we have guidelines', value: true },
    { label: language === 'ar' ? 'لا، نحتاج لتصميمها من الصفر' : 'No, we need to create them', value: false },
  ], [language]);

  return (
    <div className="space-y-8 text-start">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          {design.title}
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          {design.desc}
        </p>
      </div>

      {/* Visual Style */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            {design.fields.style}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {design.fields.styleHelper}
          </span>
        </div>
        {errors.style && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.style, language)}
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visualStyles.map((style) => {
            const Icon = style.icon;
            const selected = data.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => updateField('design', 'style', style.id)}
                className={choiceBtnClass(selected, 'flex items-start gap-3.5 p-4 text-start cursor-pointer')}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selected
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-[13px] text-neutral-900">
                    {style.name}
                  </div>
                  <div className="text-[12px] text-neutral-400 mt-0.5">
                    {style.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Guidelines */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            {design.fields.guidelines}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {design.fields.guidelinesHelper}
          </span>
        </div>
        {errors.hasGuidelines && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.hasGuidelines, language)}
          </span>
        )}
        <div className="flex flex-col md:flex-row gap-3">
          {guidelinesOptions.map((opt) => {
            const selected = data.hasGuidelines === opt.value;
            return (
              <button
                key={opt.value.toString()}
                type="button"
                onClick={() =>
                  updateField('design', 'hasGuidelines', opt.value)
                }
                className={choiceBtnClass(selected, 'flex-1 px-4 py-3 text-center text-[13px] font-medium cursor-pointer')}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Competitors */}
      <Textarea
        label={design.fields.competitors}
        placeholder={design.fields.competitorsPlaceholder}
        value={data.competitors}
        onChange={(e) =>
          updateField('design', 'competitors', e.target.value)
        }
        error={errors.competitors && translateValidationError(errors.competitors, language)}
        rows={4}
        required
        helperText={design.fields.competitorsHelper}
        showCounter={true}
      />

      {/* Liked Websites */}
      <Textarea
        label={design.fields.likedWebsites}
        placeholder={design.fields.likedWebsitesPlaceholder}
        value={data.likedWebsites}
        onChange={(e) =>
          updateField('design', 'likedWebsites', e.target.value)
        }
        error={errors.likedWebsites && translateValidationError(errors.likedWebsites, language)}
        rows={4}
        required
        helperText={design.fields.likedWebsitesHelper}
        showCounter={true}
      />
    </div>
  );
};

export default StepDesign;

