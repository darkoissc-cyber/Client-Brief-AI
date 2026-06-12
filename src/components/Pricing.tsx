"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

/* ─── Tier Data ─────────────────────────────────────────────────── */

const getTiers = (lang: 'en' | 'ar') => [
  {
    name: lang === 'ar' ? "الباقة المجانية" : "Starter",
    price: "$0",
    period: lang === 'ar' ? "للأبد" : "forever",
    tagline: lang === 'ar' ? "تجربة خالية من المخاطر" : "Try it risk-free",
    description: lang === 'ar'
      ? "مثالية للبدء. أرسل موجزك المهني الأول اليوم دون أي تكلفة."
      : "Perfect for getting started. Send your first professional brief today at no cost.",
    bullets: lang === 'ar'
      ? [
          "5 مواجز مشاريع شهرياً",
          "تصدير بصيغتي PDF و Markdown",
          "توليد موجهات الذكاء الاصطناعي",
          "الدعم عبر المجتمع",
        ]
      : [
          "5 project briefs per month",
          "PDF & Markdown export",
          "AI development prompt",
          "Community support",
        ],
    cta: lang === 'ar' ? "ابدأ مجاناً" : "Get Started Free",
    ctaHref: "/questionnaire",
    featured: false,
  },
  {
    name: lang === 'ar' ? "الباقة الاحترافية" : "Pro",
    price: "$12",
    priceWas: "$19",
    period: lang === 'ar' ? "شهرياً" : "per month",
    tagline: lang === 'ar' ? "الأكثر شعبية" : "Most Popular",
    description: lang === 'ar'
      ? "المجموعة الكاملة للمستقلين الذين يرغبون في كسب المزيد من العملاء بشكل أسرع — دون إضاعة الوقت."
      : "The complete toolkit for freelancers who want to close more clients, faster — with zero back-and-forth.",
    bullets: lang === 'ar'
      ? [
          "مواجز مشاريع غير محدودة",
          "إضافة شعارك وهويتك على كل الملفات",
          "دعم فني ذو أولوية خلال 4 ساعات",
          "مشاركة الفريق — حتى 5 مقاعد",
          "بوابة للعميل بروابط قابلة للمشاركة",
          "قوالب موجهات ذكاء اصطناعي متقدمة",
        ]
      : [
          "Unlimited project briefs",
          "Custom branding on all outputs",
          "Priority support within 4 hours",
          "Team sharing — up to 5 seats",
          "Client portal with shareable links",
          "Advanced AI prompt templates",
        ],
    cta: lang === 'ar' ? "ابدأ تجربتك المجانية — 14 يوماً مجاناً" : "Start Free — 14 Days on Us",
    ctaHref: "/questionnaire",
    featured: true,
  },
  {
    name: lang === 'ar' ? "باقة الشركات" : "Agency",
    price: "$39",
    period: lang === 'ar' ? "شهرياً" : "per month",
    tagline: lang === 'ar' ? "توسيع نطاق فريقك" : "Scale your team",
    description: lang === 'ar'
      ? "خصص كل شيء بشعارك الخاص وأدر عملاء غير محدودين تحت مظلة هويتك التجارية."
      : "White-label everything and manage unlimited clients under your own brand.",
    bullets: lang === 'ar'
      ? [
          "كل ما تشتمل عليه الباقة الاحترافية",
          "مقاعد غير محدودة لأعضاء الفريق",
          "تخصيص كامل للمخرجات (White-label)",
          "لوحة تحكم ذكية للتقارير والإحصائيات",
        ]
      : [
          "Everything in Pro",
          "Unlimited team seats",
          "White-label output",
          "Analytics dashboard",
        ],
    cta: lang === 'ar' ? "تحدث مع المبيعات" : "Talk to Sales",
    ctaHref: "mailto:hello@clientbrief.ai",
    featured: false,
  },
];

/* ─── Side Card ─────────────────────────────────────────────────── */

function SideCard({ tier, lang }: { tier: any; lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="pricing-side-card group relative bg-white rounded-2xl p-7 flex flex-col h-full border border-[#e5e2dc] transition-colors duration-150 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:border-neutral-400/50 text-start">
      {/* Header */}
      <div className="mb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 mb-1">
          {tier.name}
        </div>
        <div className="text-[12px] text-neutral-400 font-medium mb-5">
          {tier.tagline}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[44px] font-semibold tracking-tight leading-none text-neutral-900">
            {tier.price}
          </span>
          <span className={`text-[13px] text-neutral-400 ${isAr ? "mr-1.5" : "ml-1.5"}`}>
            / {tier.period}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e5e2dc] mb-6" />

      {/* Description */}
      <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">
        {tier.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-3 mb-8 flex-1">
        {(tier.bullets as string[]).map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5">
            <Check className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
            <span className="text-[13px] text-neutral-700">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={tier.ctaHref}
        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-[13px] font-medium border border-neutral-300 text-neutral-800 bg-transparent hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-250 group-hover:gap-3 cursor-pointer"
      >
        {tier.cta}
        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
      </Link>
    </div>
  );
}

/* ─── Featured Card ─────────────────────────────────────────────── */

function FeaturedCard({ tier, lang }: { tier: any; lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="pricing-featured-card group relative rounded-2xl flex flex-col overflow-hidden md:-mt-7 md:-mb-7 bg-[#0f0f0f] transition-colors duration-150 text-start"
      style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.08)" }}
    >
      {/* Badge */}
      <div className="relative flex justify-center pt-6 pb-0">
        <span className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] text-neutral-300 text-[11px] font-medium tracking-[0.06em] uppercase px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          {tier.tagline}
        </span>
      </div>

      {/* Content */}
      <div className="relative p-8 pt-6 flex flex-col flex-1">

        {/* Header */}
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500 mb-4">
            {tier.name}
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[52px] font-semibold tracking-tight leading-none text-white">
              {tier.price}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] text-neutral-500 line-through">
                {tier.priceWas}
              </span>
              <span className="text-[13px] text-neutral-400">
                / {tier.period}
              </span>
            </div>
          </div>

          {/* Save badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 text-neutral-300 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {isAr ? "وفر 37% — عرض لفترة محدودة" : "Save 37% — Limited Offer"}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Description */}
        <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
          {tier.description}
        </p>

        {/* Bullets */}
        <ul className="space-y-3 mb-8 flex-1">
          {(tier.bullets as string[]).map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[13px] text-neutral-200">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={tier.ctaHref}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-[14px] font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 group-hover:gap-3 cursor-pointer"
        >
          {tier.cta}
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>

        <p className="text-center text-[11px] text-neutral-600 mt-3">
          {isAr ? "لا يلزم وجود بطاقة ائتمان" : "No credit card required"}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function Pricing() {
  const { language } = useLanguage();
  const tiers = getTiers(language);

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#eae8e4]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {language === 'ar' ? "أسعار بسيطة وشفافة" : "Simple, transparent pricing"}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg max-w-lg mx-auto">
              {language === 'ar' ? "ابدأ مجاناً. قم بالترقية عندما تحتاج إلى المزيد. لا توجد رسوم خفية أبداً." : "Start free. Upgrade when you need more. No hidden fees, ever."}
            </p>
          </ScrollReveal>
        </div>

        {/* Cards — Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:items-stretch">
          <ScrollReveal delay={0} className="flex flex-col">
            <SideCard tier={tiers[0]} lang={language} />
          </ScrollReveal>

          <ScrollReveal delay={1} className="flex flex-col">
            <FeaturedCard tier={tiers[1]} lang={language} />
          </ScrollReveal>

          <ScrollReveal delay={2} className="flex flex-col">
            <SideCard tier={tiers[2]} lang={language} />
          </ScrollReveal>
        </div>

        {/* Footnote */}
        <p className="text-center text-[12px] text-neutral-500 mt-12">
          {language === 'ar'
            ? "تشمل جميع الباقات المدفوعة فترة تجريبية مجانية لمدة 14 يوماً. يمكنك الإلغاء في أي وقت دون طرح أي أسئلة."
            : "All paid plans include a 14-day free trial. Cancel anytime, no questions asked."}
        </p>

      </div>
    </section>
  );
}

