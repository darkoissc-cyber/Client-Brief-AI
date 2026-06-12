import React, { useMemo } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Edit2, User, Globe, Paintbrush, DollarSign } from 'lucide-react';

// ─── Helper sub-components ───

const SectionHeader = ({
  icon: Icon,
  label,
  onEdit,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  onEdit: () => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2 text-[12px] font-semibold text-neutral-400 uppercase tracking-wider">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
    <button
      type="button"
      onClick={onEdit}
      className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-all outline-none cursor-pointer"
    >
      <Edit2 className="h-3.5 w-3.5" />
    </button>
  </div>
);

const Field = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="text-start">
    <div className="text-[11px] text-neutral-400 mb-0.5">{label}</div>
    <div className="text-[14px] text-neutral-800 font-medium">{value}</div>
  </div>
);

// ─── Label helpers ───

const getPlatformLabel = (p: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { nextjs: 'Next.js / React App', wordpress: 'WordPress', shopify: 'Shopify', custom: 'Custom Platform' },
    ar: { nextjs: 'تطبيق Next.js / React', wordpress: 'WordPress', shopify: 'Shopify', custom: 'برمجة خاصة / منصة أخرى' },
  };
  return dict[lang]?.[p] || p || '—';
};

const getTrafficLabel = (t: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { 'under-10k': 'Under 10,000 / month', '10k-100k': '10,000 – 100,000 / month', '100k-1m': '100,000 – 1,000,000 / month', 'over-1m': 'Over 1,000,000 / month', unsure: 'Not sure yet' },
    ar: { 'under-10k': 'أقل من 10,000 / شهرياً', '10k-100k': '10,000 – 100,000 / شهرياً', '100k-1m': '100,000 – 1,000,000 / شهرياً', 'over-1m': 'أكثر من 1,000,000 / شهرياً', unsure: 'غير متأكد حالياً' },
  };
  return dict[lang]?.[t] || t || '—';
};

const getStyleLabel = (s: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { minimalist: 'Clean & Minimalist', colorful: 'Vibrant & Playful', corporate: 'Sleek & Professional', bold: 'Modern & Bold' },
    ar: { minimalist: 'بسيط ونظيف (Minimalist)', colorful: 'نابض بالحياة ومبهج', corporate: 'أنيق ورسمي (مهني)', bold: 'حديث وجريء (Modern & Bold)' },
  };
  return dict[lang]?.[s] || s || '—';
};

const getBudgetLabel = (b: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { 'under-5k': 'Under $5k', '5k-15k': '$5k–$15k', '15k-30k': '$15k–$30k', 'over-30k': '$30k+' },
    ar: { 'under-5k': 'أقل من $5k', '5k-15k': '$5k – $15k', '15k-30k': '$15k – $30k', 'over-30k': '$30k+' },
  };
  return dict[lang]?.[b] || b || '—';
};

const getTimelineLabel = (t: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { '1-month': 'Within 1 month', '1-3-months': '1–3 months', '3-6-months': '3–6 months', flexible: 'Flexible' },
    ar: { '1-month': 'خلال شهر واحد', '1-3-months': '1–3 أشهر', '3-6-months': '3–6 أشهر', flexible: 'مرن' },
  };
  return dict[lang]?.[t] || t || '—';
};

const getContentLabel = (c: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { client: 'Client Provided', developer: 'Developer Authored', collab: 'Collaborative' },
    ar: { client: 'العميل يوفر المحتوى', developer: 'المطور يكتب المحتوى', collab: 'تعاون مشترك' },
  };
  return dict[lang]?.[c] || c || '—';
};

const getFeatureLabel = (f: string, lang: 'en' | 'ar') => {
  const dict: Record<string, Record<string, string>> = {
    en: { auth: 'Authentication', payments: 'Payments & Checkout', cms: 'CMS / Content Management', integrations: 'Third-party APIs', search: 'Advanced Search', analytics: 'Analytics Dashboard', multilingual: 'Multi-language', realtime: 'Real-time Features' },
    ar: { auth: 'توثيق المستخدمين', payments: 'المدفوعات الإلكترونية', cms: 'إدارة المحتوى', integrations: 'الربط مع خدمات خارجية', search: 'البحث المتقدم والفلاتر', analytics: 'لوحة الإحصائيات', multilingual: 'دعم لغات متعددة', realtime: 'التحديث بالوقت الفعلي' },
  };
  return dict[lang]?.[f] || f;
};

// ─── Component ───

export const StepReview: React.FC = () => {
  const { formData, goToStep } = useQuestionnaire();
  const { language } = useLanguage();
  const t = translations[language];
  const review = t.questionnaire.review;

  const isAr = language === 'ar';

  return (
    <div className="space-y-6 text-start">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          {review.title}
        </h2>
        <p className="text-[15px] text-neutral-500 mt-1">
          {review.desc}
        </p>
      </div>

      {/* Warning message */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-800">
        {review.warning}
      </div>

      {/* Overview */}
      <div className="review-section rounded-xl p-5">
        <SectionHeader icon={User} label={isAr ? "1. نظرة عامة ووصف العمل" : "1. Project Overview & Business"} onEdit={() => goToStep(1)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={isAr ? "اسم المشروع" : "Project Name"} value={formData.overview.projectName} />
          <Field
            label={isAr ? "معلومات التواصل والعميل" : "Client Contact"}
            value={`${formData.overview.clientName} (${formData.overview.clientEmail})`}
          />
          <div className="md:col-span-2">
            <Field
              label={isAr ? "وصف طبيعة عملك بالتفصيل" : "Business Description"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.businessDescription}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "ما هي المشكلة التي يحلها المشروع؟" : "What problem does this project solve?"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.projectProblem}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "من هي الفئة المستهدفة؟" : "Who is the target audience?"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.targetAudience}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "أهداف المشروع ووصفه العام" : "Project Description"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.overview.projectDescription}
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/* Technical */}
      <div className="review-section rounded-xl p-5">
        <SectionHeader icon={Globe} label={isAr ? "2. الأهداف، الصفحات والميزات" : "2. Goals, Pages & Features"} onEdit={() => goToStep(2)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field
              label={isAr ? "الهدف الأساسي للموقع" : "Primary Goal"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.primaryGoal}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "إجراء الحث على اتخاذ قرار (CTA) الرئيسي للزوار" : "Primary Action visitors should take"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.visitorAction}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "قائمة الصفحات المطلوبة" : "Requested Pages"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.neededPages}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "الميزات المخصصة الأكثر أهمية" : "Custom Features List"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed whitespace-pre-line font-normal">
                  {formData.technical.importantFeatures}
                </p>
              }
            />
          </div>
          <Field label={isAr ? "المنصة المفضلة" : "Platform Preference"} value={getPlatformLabel(formData.technical.platform, language)} />
          <Field label={isAr ? "حجم الزوار المتوقع شهرياً" : "Expected Traffic"} value={getTrafficLabel(formData.technical.traffic, language)} />
          <div className="md:col-span-2 text-start">
            <div className="text-[11px] text-neutral-400 mb-1.5">{isAr ? "الميزات الأساسية المختارة" : "Core Checklist Features"}</div>
            <div className="flex flex-wrap gap-1.5">
              {formData.technical.features.length > 0 ? (
                formData.technical.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] font-medium px-2.5 py-1 bg-white text-neutral-700 border border-[var(--step-pending-border)] shadow-[var(--step-pending-shadow)] rounded-md"
                  >
                    {getFeatureLabel(f, language)}
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-neutral-400 italic">{isAr ? "لم يتم اختيار أي ميزة" : "None selected"}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Design */}
      <div className="review-section rounded-xl p-5">
        <SectionHeader icon={Paintbrush} label={isAr ? "3. التصميم والهوية الملهمة" : "3. Design & Inspiration"} onEdit={() => goToStep(3)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={isAr ? "النمط البصري" : "Style"} value={getStyleLabel(formData.design.style, language)} />
          <Field
            label={isAr ? "الهوية البصرية والخطوط الإرشادية" : "Brand Guidelines"}
            value={formData.design.hasGuidelines 
              ? (isAr ? 'نعم - الهوية متوفرة وجاهزة' : 'Yes – guidelines exist') 
              : (isAr ? 'لا - نحتاج لتصميم الهوية من الصفر' : 'No – guidelines need to be created')}
          />
          <div className="md:col-span-2">
            <Field
              label={isAr ? "المنافسون أو مواقع الإلهام" : "Competitors or Inspiration"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {formData.design.competitors}
                </p>
              }
            />
          </div>
          <div className="md:col-span-2">
            <Field
              label={isAr ? "مراجع التصميم المفضلة" : "Liked Websites & Design Elements"}
              value={
                <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {formData.design.likedWebsites}
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="review-section rounded-xl p-5">
        <SectionHeader icon={DollarSign} label={isAr ? "4. الميزانية والجدول الزمني" : "4. Budget & Scope"} onEdit={() => goToStep(4)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label={isAr ? "الميزانية" : "Budget"} value={getBudgetLabel(formData.scope.budget, language)} />
          <Field label={isAr ? "الجدول الزمني للإطلاق" : "Timeline"} value={getTimelineLabel(formData.scope.timeline, language)} />
          <Field label={isAr ? "الطرف المسؤول عن المحتوى" : "Content Provider"} value={getContentLabel(formData.scope.contentProvider, language)} />
          {formData.scope.notes && (
            <div className="md:col-span-3">
              <Field
                label={isAr ? "ملاحظات إضافية" : "Additional Notes"}
                value={
                  <p className="text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {formData.scope.notes}
                  </p>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepReview;

