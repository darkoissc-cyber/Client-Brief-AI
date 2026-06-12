import React, { useMemo } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations, translateValidationError } from '@/lib/translations';
import { Textarea } from '@/components/ui/textarea';
import { choiceBtnClass } from '@/lib/formStyles';
import {
  Code,
  Globe,
  ShoppingBag,
  Laptop,
  Shield,
  CreditCard,
  PenTool,
  Database,
  Search,
  Activity,
  Languages,
  Zap,
} from 'lucide-react';

const getPlatforms = (lang: 'en' | 'ar') => [
  {
    id: 'nextjs',
    name: lang === 'ar' ? 'تطبيق Next.js / React' : 'Next.js / React',
    desc: lang === 'ar' ? 'موقع ويب حديث مع أداء عالٍ ورندرة على السيرفر (SSR)' : 'Modern web app with SSR & performance',
    icon: Code,
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    desc: lang === 'ar' ? 'موقع تقليدي لإدارة المحتوى والمدونات' : 'Traditional content & blogging',
    icon: Globe,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    desc: lang === 'ar' ? 'متجر تجارة إلكترونية متكامل ومخصص' : 'Dedicated e-commerce store',
    icon: ShoppingBag,
  },
  {
    id: 'custom',
    name: lang === 'ar' ? 'برمجة خاصة' : 'Custom Platform',
    desc: lang === 'ar' ? 'قاعدة بيانات مخصصة وبنية API مستقلة' : 'Custom backend / API stack',
    icon: Laptop,
  },
];

const getFeaturesList = (lang: 'en' | 'ar') => [
  { id: 'auth', label: lang === 'ar' ? 'توثيق المستخدمين والملفات الشخصية' : 'User Authentication', icon: Shield },
  { id: 'payments', label: lang === 'ar' ? 'المدفوعات وبوابة الشراء' : 'Payments & Checkout', icon: CreditCard },
  { id: 'cms', label: lang === 'ar' ? 'نظام إدارة المحتوى (CMS)' : 'Content Management', icon: PenTool },
  { id: 'integrations', label: lang === 'ar' ? 'الربط مع خدمات خارجية (APIs)' : 'Third-party APIs', icon: Database },
  { id: 'search', label: lang === 'ar' ? 'البحث المتقدم والفلاتر' : 'Advanced Search', icon: Search },
  { id: 'analytics', label: lang === 'ar' ? 'لوحة تقارير وإحصائيات' : 'Analytics Dashboard', icon: Activity },
  { id: 'multilingual', label: lang === 'ar' ? 'دعم لغات متعددة' : 'Multi-language', icon: Languages },
  { id: 'realtime', label: lang === 'ar' ? 'ميزات بالوقت الفعلي والتفاعلي' : 'Real-time Features', icon: Zap },
];

const getTrafficOptions = (lang: 'en' | 'ar') => [
  { label: lang === 'ar' ? 'أقل من 10,000 / شهرياً' : 'Under 10,000 / month', value: 'under-10k' },
  { label: lang === 'ar' ? 'من 10,000 إلى 100,000 / شهرياً' : '10k – 100k / month', value: '10k-100k' },
  { label: lang === 'ar' ? 'من 100,000 إلى 1 مليون / شهرياً' : '100k – 1M / month', value: '100k-1m' },
  { label: lang === 'ar' ? 'أكثر من 1 مليون / شهرياً' : 'Over 1M / month', value: 'over-1m' },
  { label: lang === 'ar' ? 'غير متأكد حالياً' : 'Not sure yet', value: 'unsure' },
];

export const StepTechnical: React.FC = () => {
  const { formData, errors, updateField } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];
  const tech = t.questionnaire.technical;
  const data = formData.technical;

  const platforms = useMemo(() => getPlatforms(language), [language]);
  const featuresList = useMemo(() => getFeaturesList(language), [language]);
  const trafficOptions = useMemo(() => getTrafficOptions(language), [language]);

  const handleFeatureToggle = (featureId: string) => {
    const isSelected = data.features.includes(featureId);
    const nextFeatures = isSelected
      ? data.features.filter((id) => id !== featureId)
      : [...data.features, featureId];
    updateField('technical', 'features', nextFeatures);
  };

  return (
    <div className="space-y-8 text-start">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          {tech.title}
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          {tech.desc}
        </p>
      </div>

      {/* Goal & Action */}
      <Textarea
        label={tech.fields.primaryGoal}
        placeholder={tech.fields.primaryGoalPlaceholder}
        value={data.primaryGoal}
        onChange={(e) =>
          updateField('technical', 'primaryGoal', e.target.value)
        }
        error={errors.primaryGoal && translateValidationError(errors.primaryGoal, language)}
        rows={3}
        required
        helperText={tech.fields.primaryGoalHelper}
        showCounter={true}
      />

      <Textarea
        label={tech.fields.ctaAction}
        placeholder={tech.fields.ctaActionPlaceholder}
        value={data.visitorAction}
        onChange={(e) =>
          updateField('technical', 'visitorAction', e.target.value)
        }
        error={errors.visitorAction && translateValidationError(errors.visitorAction, language)}
        rows={3}
        required
        helperText={tech.fields.ctaActionHelper}
        showCounter={true}
      />

      {/* Pages & Features */}
      <Textarea
        label={tech.fields.pages}
        placeholder={tech.fields.pagesPlaceholder}
        value={data.neededPages}
        onChange={(e) =>
          updateField('technical', 'neededPages', e.target.value)
        }
        error={errors.neededPages && translateValidationError(errors.neededPages, language)}
        rows={4}
        required
        helperText={tech.fields.pagesHelper}
        showCounter={true}
      />

      <Textarea
        label={tech.fields.customFeatures}
        placeholder={tech.fields.customFeaturesPlaceholder}
        value={data.importantFeatures}
        onChange={(e) =>
          updateField('technical', 'importantFeatures', e.target.value)
        }
        error={errors.importantFeatures && translateValidationError(errors.importantFeatures, language)}
        rows={4}
        required
        helperText={tech.fields.customFeaturesHelper}
        showCounter={true}
      />

      {/* Platform */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-semibold text-neutral-700 block">
            {tech.fields.platform}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {tech.fields.platformHelper}
          </span>
        </div>
        {errors.platform && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.platform, language)}
          </span>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platforms.map((p) => {
            const Icon = p.icon;
            const selected = data.platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => updateField('technical', 'platform', p.id)}
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
                    {p.name}
                  </div>
                  <div className="text-[12px] text-neutral-400 mt-0.5">
                    {p.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Checklist */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            {tech.fields.features}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {tech.fields.featuresHelper}
          </span>
          {errors.features && (
            <span className="text-[13px] text-red-500 block mt-1 font-medium">
              {translateValidationError(errors.features, language)}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {featuresList.map((feat) => {
            const Icon = feat.icon;
            const selected = data.features.includes(feat.id);
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => handleFeatureToggle(feat.id)}
                className={choiceBtnClass(selected, 'flex items-center gap-3 px-4 py-3 text-start cursor-pointer')}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    selected ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                />
                <span
                  className={`text-[13px] font-medium flex-1 ${
                    selected ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  {feat.label}
                </span>
                <div
                  className={`h-4 w-4 rounded flex items-center justify-center transition-[border-color,background-color,box-shadow] duration-200 ${
                    selected
                      ? 'form-control-mark form-control-mark--selected'
                      : 'form-control-mark'
                  }`}
                >
                  {selected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-2.5 w-2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Traffic */}
      <div className="space-y-3">
        <div>
          <label className="text-[13px] font-medium text-neutral-700 block">
            {tech.fields.traffic}
          </label>
          <span className="text-[12px] text-neutral-400 block -mt-0.5">
            {tech.fields.trafficHelper}
          </span>
        </div>
        {errors.traffic && (
          <span className="text-[13px] text-red-500 block -mt-1 font-medium">
            {translateValidationError(errors.traffic, language)}
          </span>
        )}
        <div className="space-y-2">
          {trafficOptions.map((opt) => {
            const selected = data.traffic === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  updateField('technical', 'traffic', opt.value)
                }
                className={choiceBtnClass(selected, 'w-full px-4 py-3 text-start text-[13px] font-medium cursor-pointer')}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{opt.label}</span>
                  <div
                    className={`h-4 w-4 rounded-full flex items-center justify-center transition-[border-color,box-shadow] duration-200 ${
                      selected
                        ? 'form-control-ring form-control-ring--selected'
                        : 'form-control-ring'
                    }`}
                  >
                    {selected && (
                      <div className="h-2 w-2 rounded-full bg-neutral-900" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepTechnical;

