"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

/* ─── Mock UI Sub-components ─────────────────────────────────────── */

function SmartCollectionVisual({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 depth-card w-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
          {isAr ? "الخطوة 2 من 5 — نطاق المشروع" : "Step 2 of 5 — Project Scope"}
        </span>
      </div>
      <div className="space-y-4 text-start">
        <div>
          <label className="text-[12px] font-medium text-neutral-700 block mb-1.5">
            {isAr ? "ما هو نوع هذا المشروع؟" : "What type of project is this?"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(isAr
              ? ["تجارة إلكترونية", "معرض أعمال", "تطبيق SaaS", "صفحة هبوط"]
              : ["E-commerce", "Portfolio", "SaaS App", "Landing Page"]
            ).map((t, i) => (
              <div
                key={t}
                className={`border rounded-xl px-3 py-2.5 text-[13px] cursor-pointer transition-all ${i === 0
                    ? "border-neutral-900 bg-neutral-50 font-medium text-neutral-900"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                  }`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[12px] font-medium text-neutral-700 block mb-1.5">
            {isAr ? "الميزانية التقريبية للمشروع" : "Estimated budget range"}
          </label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-[13px] text-neutral-700">
            $5,000 – $15,000
          </div>
        </div>
        <div>
          <label className="text-[12px] font-medium text-neutral-700 block mb-1.5">
            {isAr ? "الميزات الرئيسية المطلوبة" : "Key features needed"}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(isAr ? ["المدفوعات", "التوثيق", "لوحة تحكم"] : ["Payments", "Auth", "Dashboard"]).map((f) => (
              <span key={f} className="text-[11px] bg-neutral-900 text-white px-2.5 py-1 rounded-md">
                {f}
              </span>
            ))}
            <span className="text-[11px] bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-md">
              {isAr ? "+ إضافة المزيد" : "+ Add more"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i <= 1 ? "w-5 bg-neutral-900" : "w-3 bg-neutral-200"
                }`}
            />
          ))}
        </div>
        <div className="bg-neutral-900 text-white text-[12px] font-medium px-4 py-1.5 rounded-full">
          {isAr ? "متابعة ←" : "Continue →"}
        </div>
      </div>
    </div>
  );
}

function AutoBriefsVisual({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 depth-card w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-blue-400" />
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
          {isAr ? "الموجز المنشأ" : "Generated Brief"}
        </span>
        <span className="ms-auto text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 font-medium">
          {isAr ? "✓ جاهز" : "✓ Ready"}
        </span>
      </div>
      <div className="space-y-3 text-[13px] text-start">
        <div className="font-semibold text-neutral-900 text-[16px] pb-3 border-b border-neutral-100">
          # {isAr ? "متجر عطور إلكتروني" : "Perfume E-commerce Store"}
        </div>
        <div className="space-y-1.5 pb-3 border-b border-neutral-100">
          <div className="flex gap-3">
            <span className="text-neutral-400 w-24 shrink-0">{isAr ? "نوع المشروع:" : "Project Type:"}</span>
            <span className="text-neutral-700">{isAr ? "تجارة إلكترونية" : "E-commerce"}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-400 w-24 shrink-0">{isAr ? "الميزانية:" : "Budget:"}</span>
            <span className="text-neutral-700">$5,000–$15,000</span>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-400 w-24 shrink-0">{isAr ? "الجدول الزمني:" : "Timeline:"}</span>
            <span className="text-neutral-700">{isAr ? "1–2 شهر" : "1–2 months"}</span>
          </div>
        </div>
        <div>
          <div className="text-neutral-400 mb-2">{isAr ? "المتطلبات:" : "Requirements:"}</div>
          <ul className={`space-y-1.5 ${isAr ? "pr-1" : "pl-1"}`}>
            {(isAr
              ? ["توثيق حسابات العملاء", "معالجة المدفوعات", "لوحة تحكم للمدير", "متوافق مع الجوال"]
              : ["Customer Authentication", "Payment Processing", "Admin Dashboard", "Mobile Responsive"]
            ).map((f) => (
              <li key={f} className="flex items-center gap-2 text-neutral-600">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <div className="flex-1 border border-neutral-200 rounded-xl text-center py-2 text-[12px] text-neutral-600 cursor-pointer hover:bg-neutral-50 transition-colors">
          {isAr ? "نسخ" : "Copy"}
        </div>
        <div className="flex-1 border border-neutral-200 rounded-xl text-center py-2 text-[12px] text-neutral-600 cursor-pointer hover:bg-neutral-50 transition-colors">
          {isAr ? "تحميل" : "Download"}
        </div>
        <div className="flex-1 bg-neutral-900 rounded-xl text-center py-2 text-[12px] text-white cursor-pointer hover:bg-neutral-800 transition-colors">
          {isAr ? "مشاركة" : "Share"}
        </div>
      </div>
    </div>
  );
}

function AIPromptsVisual({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-neutral-800 p-6 shadow-[0_12px_38px_rgba(0,0,0,0.18)] w-full">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        </div>
        <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
          ai-prompt.txt
        </span>
      </div>
      <div className="space-y-3 font-mono text-[11px] leading-relaxed text-neutral-300 text-start" dir={isAr ? 'rtl' : 'ltr'}>
        <div>
          <span className="text-purple-400">[SYSTEM_INSTRUCTION]</span>
          <p className="text-neutral-400 mt-0.5">
            {isAr
              ? "تصرف كمهندس برمجيات. قم بإنشاء هيكل تطبيق ممتاز بناءً على المواصفات التالية:"
              : "Act as a software architect. Scaffold a premium application:"}
          </p>
        </div>
        <div className="border-t border-neutral-900/60 pt-2">
          <span className="text-blue-400">[PROJECT_PARAMETERS]</span>
          <div className="mt-0.5 space-y-0.5">
            <div>
              <span className="text-neutral-500">{isAr ? "الاسم:" : "Name:"}</span> &quot;{isAr ? "متجر عطور" : "Perfume E-commerce"}&quot;
            </div>
            <div>
              <span className="text-neutral-500">{isAr ? "الميزانية:" : "Budget:"}</span> &quot;$5,000–$15,000&quot;
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-900/60 pt-2">
          <span className="text-blue-400">[CORE_FEATURES]</span>
          <ul className={`mt-0.5 space-y-0.5 ${isAr ? "pr-0" : "pl-0"}`}>
            <li>
              <span className="text-neutral-500">{isAr ? "- التوثيق:" : "- Auth:"}</span> {isAr ? "حسابات العملاء" : "Customer accounts"}
            </li>
            <li>
              <span className="text-neutral-500">{isAr ? "- الدفع:" : "- Pay:"}</span> {isAr ? "الدفع الآمن" : "Secure checkout"}
            </li>
            <li>
              <span className="text-neutral-500">{isAr ? "- المدير:" : "- Admin:"}</span> {isAr ? "لوحة الطلبات" : "Order dashboard"}
            </li>
            <li>
              <span className="text-neutral-500">{isAr ? "- الواجهة:" : "- UI:"}</span> {isAr ? "تصميم متجاوب ومتكيف" : "Adaptive responsive layout"}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 border-t border-neutral-800 pt-3">
        <div className="bg-neutral-800 hover:bg-neutral-700 text-white text-[12px] font-medium text-center py-2 rounded-lg cursor-pointer transition-colors">
          {isAr ? "نسخ الموجه" : "Copy Prompt"}
        </div>
      </div>
    </div>
  );
}

/* ─── Features Data ───────────────────────────────────────────────── */

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
};

const getFeatures = (lang: 'en' | 'ar'): Feature[] => [
  {
    id: "collection",
    label: lang === 'ar' ? "الاستبيان الذكي" : "Smart Collection",
    title: lang === 'ar' ? "جمع متطلبات ذكي ومنظم" : "Smart Requirement Collection",
    description: lang === 'ar'
      ? "وجّه عملائك من خلال استبيان منظم متعدد الخطوات. يتم التحقق من كل إجابة في الوقت الفعلي للتأكد من عدم تفويت أي شيء — لا مزيد من المواجز غير المكتملة."
      : "Guide clients through a structured multi-step questionnaire. Every answer is validated in real-time so nothing gets missed — no more incomplete briefs.",
    bullets: lang === 'ar'
      ? ["تدفق خطوات متعددة وموجهة", "تحقق من صحة الحقول في الوقت الفعلي", "يدعم أي نوع من المشاريع", "لا حاجة لإنشاء حساب للعميل"]
      : [
          "Multi-step guided flow",
          "Real-time field validation",
          "Supports any project type",
          "No client account needed",
        ],
  },
  {
    id: "briefs",
    label: lang === 'ar' ? "مواجز تلقائية" : "Auto Briefs",
    title: lang === 'ar' ? "مواجز مشاريع تلقائية" : "Automatic Project Briefs",
    description: lang === 'ar'
      ? "يتم تجميع إجابات العملاء على الفور في مواجز Markdown منظمة وجاهزة للعقود أو الاقتراحات. قم بتصديرها أو مشاركتها بنقرة واحدة."
      : "Client answers are instantly compiled into clean, structured Markdown briefs ready for contracts, handoffs, or proposals. Export or share with one click.",
    bullets: lang === 'ar'
      ? ["مخرجات بصيغة Markdown منظمة", "تقديرات الميزانية والجدول الزمني", "قابل للتصدير كملف PDF", "روابط مخصصة وقابلة للمشاركة"]
      : [
          "Structured Markdown output",
          "Budget & timeline estimates",
          "Exportable as PDF",
          "Shareable via link",
        ],
  },
  {
    id: "prompts",
    label: lang === 'ar' ? "موجهات الذكاء الاصطناعي" : "AI Prompts",
    title: lang === 'ar' ? "موجهات جاهزة للذكاء الاصطناعي" : "AI-Ready Development Prompts",
    description: lang === 'ar'
      ? "أنتج موجهات برمجية دقيقة من بيانات المشروع. ضعها مباشرة في أي مساعد كود ذكي لتنفيذ أسرع وأكثر دقة."
      : "Generate precise development prompts from project data. Feed them directly into any AI coding assistant for faster, more accurate execution.",
    bullets: lang === 'ar'
      ? ["متوافق مع أي أداة ذكاء اصطناعي", "تتضمن مواصفات كاملة للميزات", "نسخ بضغطة زر واحدة", "يُحَدَّث تلقائياً عند تغيير الموجز"]
      : [
          "Compatible with any AI tool",
          "Includes full feature specs",
          "One-click copy",
          "Updated when brief changes",
        ],
  },
];

import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturesShowcase() {
  const { language } = useLanguage();
  const features = getFeatures(language as 'en' | 'ar');

  const [activeTab, setActiveTab] = useState<string>("collection");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const tabs = ['collection', 'briefs', 'prompts'];
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, activeTab]);

  const featureIndex = features.findIndex((f) => f.id === activeTab);
  const feature = features[featureIndex !== -1 ? featureIndex : 0];

  return (
    <section 
      id="features" 
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#eae8e4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {language === 'ar' ? "كل ما تحتاجه لتحديد نطاق المشاريع" : "Everything you need to scope projects"}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg max-w-lg mx-auto">
              {language === 'ar' ? "ثلاث ميزات قوية تعمل معاً من طلب العميل حتى الوصول لملفات البناء الجاهزة." : "Three powerful features that work together from client request to buildable spec."}
            </p>
          </ScrollReveal>
        </div>

        {/* Tab buttons */}
        <ScrollReveal delay={2} className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                activeTab === f.id
                  ? "bg-black text-white rounded-[12px] px-[20px] py-[8px] border border-black"
                  : "bg-transparent text-neutral-600 rounded-[12px] px-[20px] py-[8px] hover:bg-neutral-100 border border-neutral-300 hover:border-neutral-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <ScrollReveal delay={0} className="transition-all duration-300 text-start">
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-neutral-400" />
              {language === 'ar' ? `الميزة ${featureIndex + 1} من ${features.length}` : `Feature ${featureIndex + 1} of ${features.length}`}
            </div>
            <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight text-neutral-900 mb-4 leading-tight">
              {feature.title}
            </h3>
            <p className="text-neutral-500 leading-relaxed text-[15px] mb-7">
              {feature.description}
            </p>
            <ul className="space-y-3">
              {feature.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[14px] text-neutral-700">
                  <span className="w-5 h-5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-teal-600" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Mock UI side */}
          <ScrollReveal delay={1} className="transition-all duration-300">
            <div key={activeTab} style={{ animation: 'fadeIn 0.2s ease' }}>
              {activeTab === 'collection' && <SmartCollectionVisual lang={language} />}
              {activeTab === 'briefs' && <AutoBriefsVisual lang={language} />}
              {activeTab === 'prompts' && <AIPromptsVisual lang={language} />}
            </div>
          </ScrollReveal>
        </div>

        {/* Tab dots indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeTab === f.id ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300"
                }`}
              aria-label={`Go to feature ${f.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

