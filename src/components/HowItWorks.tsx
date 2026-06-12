"use client";

import { Check, ChevronRight, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

/* ─── Step Visual Sub-components ─────────────────────────────────── */

function ClientRequestVisual({ t }: { t: any }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 depth-card w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-[12px] font-semibold text-neutral-600">
          JM
        </div>
        <div>
          <div className="text-[13px] font-medium text-neutral-900">{t.howItWorks.visuals.james}</div>
          <div className="text-[11px] text-neutral-400">{t.howItWorks.visuals.clientNow}</div>
        </div>
      </div>
      <div className="bg-[#fafaf8] border border-neutral-200/50 rounded-xl p-4 text-[13px] text-neutral-600 leading-relaxed italic text-start">
        &ldquo;{t.howItWorks.visuals.jamesQuote}&rdquo;
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(t.howItWorks.visuals.tags as string[]).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectBriefVisual({ t }: { t: any }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-6 depth-card w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-blue-400" />
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
          {t.howItWorks.visuals.generatedBrief}
        </span>
        <span className="ms-auto text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 font-medium">
          {t.howItWorks.visuals.ready}
        </span>
      </div>
      <div className="space-y-3 text-[13px] text-start">
        <div className="font-semibold text-neutral-900 text-[15px] pb-3 border-b border-neutral-100">
          {t.howItWorks.visuals.perfumeStore}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-3 border-b border-neutral-100">
          <div>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
              {t.howItWorks.visuals.projType}
            </span>
            <span className="font-medium text-neutral-800">{(t.howItWorks.visuals.tags as string[])[0]}</span>
          </div>
          <div>
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
              {t.howItWorks.visuals.timeline}
            </span>
            <span className="font-medium text-neutral-800">{t.howItWorks.visuals.timelineVal}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
              {t.howItWorks.visuals.budget}
            </span>
            <span className="font-medium text-neutral-800">{t.howItWorks.visuals.budgetVal}</span>
          </div>
        </div>
        <div>
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-2">
            {t.howItWorks.visuals.requirements}
          </span>
          <ul className="space-y-1.5">
            {(t.howItWorks.visuals.reqList as string[]).map((req) => (
              <li key={req} className="flex items-center gap-2 text-neutral-600">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AIPromptVisual({ t, language }: { t: any; language: string }) {
  return (
    <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-[0_12px_38px_rgba(0,0,0,0.18)] w-full min-w-0 lg:min-w-[320px]">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        </div>
        <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
          {t.howItWorks.visuals.aiPromptFile}
        </span>
      </div>
      <div className="space-y-3 font-mono text-[11px] leading-relaxed text-neutral-300 text-start" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div>
          <span className="text-purple-400">{t.howItWorks.visuals.sysInst}</span>
          <p className="text-neutral-400 mt-0.5">
            {t.howItWorks.visuals.sysInstText}
          </p>
        </div>
        <div className="border-t border-neutral-900/60 pt-2">
          <span className="text-blue-400">{t.howItWorks.visuals.projParams}</span>
          <div className="mt-0.5 space-y-0.5">
            <div>
              <span className="text-neutral-500">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>{" "}
              <span>&quot;{t.howItWorks.visuals.perfumeStore}&quot;</span>
            </div>
            <div>
              <span className="text-neutral-500">{language === 'ar' ? 'النطاق:' : 'Scope:'}</span>{" "}
              <span>&quot;{language === 'ar' ? 'متوسط التعقيد' : 'Medium Complexity'}&quot;</span>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-900/60 pt-2">
          <span className="text-blue-400">{t.howItWorks.visuals.coreFeat}</span>
          <ul className={`mt-0.5 space-y-0.5 list-none ${language === 'ar' ? 'pr-0' : 'pl-0'}`}>
            {(t.howItWorks.visuals.reqList as string[]).map((req, index) => {
              const labels = language === 'ar' ? ['التوثيق:', 'المدفوعات:', 'المدير:', 'التوافق:'] : ['- Auth:', '- Payments:', '- Admin:', '- Responsive:'];
              return (
                <li key={index}>
                  <span className="text-neutral-500">{labels[index]}</span>{" "}
                  <span className="text-neutral-300">{req}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

import ScrollReveal from "@/components/ScrollReveal";

export default function HowItWorks() {
  const { language } = useLanguage();
  const t = translations[language];

  const visualComponents = [ClientRequestVisual, ProjectBriefVisual, AIPromptVisual];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#edecea]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
              {t.howItWorks.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {t.howItWorks.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* "Takes less than 2 minutes" label */}
        <div className="flex justify-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/60 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-neutral-500">
            <Clock className="w-3.5 h-3.5" />
            {t.howItWorks.badge}
          </div>
        </div>

        {/* Steps — Full-width alternating layout */}
        <div className="space-y-20 md:space-y-28">
          {(t.howItWorks.steps as any[]).map((s, i) => {
            const isEven = i % 2 === 1;
            const VisualComp = visualComponents[i];
            return (
              <div
                key={s.step}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
              >
                {/* Text column */}
                <ScrollReveal delay={0} className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-[#c5c0b8] text-5xl font-bold me-2 leading-none">
                      0{s.step}
                    </span>
                    {t.howItWorks.step} {s.step}
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight text-neutral-900 mb-4 leading-tight text-start">
                    {s.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-[15px] text-start">{s.description}</p>

                  {/* Connector arrow (desktop) */}
                  {i < visualComponents.length - 1 && (
                    <div className="hidden lg:flex items-center gap-2 mt-8 text-neutral-400">
                      <div className="h-px w-12 bg-neutral-200" />
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </div>
                  )}
                </ScrollReveal>

                {/* Visual column */}
                <ScrollReveal delay={1} className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <VisualComp t={t} language={language} />
                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* Outcome indicator */}
        <ScrollReveal delay={2} className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2.5 text-[11px] font-medium text-neutral-400 bg-white border border-neutral-200/50 rounded-full px-4 py-2 w-max max-w-full mx-auto shadow-sm">
            <span>{t.howItWorks.visuals.outcomeRequest}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 rtl:rotate-180" />
            <span>{t.howItWorks.visuals.outcomeBrief}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 rtl:rotate-180" />
            <span>{t.howItWorks.visuals.outcomePrompt}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 rtl:rotate-180" />
            <span className="flex items-center gap-1.5 font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[10.5px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t.howItWorks.visuals.mvpReady}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

