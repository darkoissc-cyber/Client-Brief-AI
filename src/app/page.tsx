"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import WhoItsFor from "@/components/WhoItsFor";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#eae8e4]">
      {/* ──────────────────────────── Header ──────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[rgba(255,255,255,0.85)] backdrop-blur-[12px] border-b border-[rgba(0,0,0,0.06)]"
          : "bg-[#eae8e4]/80 border-b border-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-neutral-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CB</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-neutral-900">
              {t.common.appName}
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#features"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#pricing"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {t.nav.pricing}
            </a>
            <a
              href="#faq"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* CTA & Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              type="button"
              className="text-[12px] font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-full border border-neutral-300/60 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 cursor-pointer shadow-sm"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              href="/questionnaire"
              className="bg-black text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors duration-150"
            >
              {t.common.startCTA}
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────────── Hero ──────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden isolate bg-[#eae8e4]">
        {/* Soft Ambient Gradient Orbs (Static & High Performance) */}
        <div className="absolute top-[-12%] left-[15%] -z-10 w-[500px] h-[500px] rounded-full bg-amber-200/20 blur-[90px] pointer-events-none" />
        <div className="absolute top-[12%] right-[10%] -z-10 w-[600px] h-[600px] rounded-full bg-indigo-200/25 blur-[100px] pointer-events-none" />

        <div className="max-w-[900px] mx-auto text-center relative animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/60 rounded-full px-3.5 py-1 text-[12px] font-medium text-neutral-600 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.hero.stats}
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[84px] font-semibold leading-[1.1] tracking-tight text-neutral-900">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 mb-8 flex flex-col items-center justify-center">
            <p className="text-[14px] italic text-[#555] leading-relaxed">
              {t.hero.quote}
            </p>
            <p className="text-[13px] text-[#777] mt-1">
              {t.hero.author}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/questionnaire"
              className="inline-flex items-center justify-center gap-2 bg-black text-[#fff] text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-colors duration-150"
            >
              {t.common.startCTA}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-black border-[1.5px] border-black text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors duration-150"
            >
              {t.hero.secondaryCTA}
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── How It Works ──────────────────────── */}
      <HowItWorks />

      {/* ──────────────────────── Who It's For ──────────────────────── */}
      <WhoItsFor />

      {/* ──────────────────────── Features ──────────────────────── */}
      <FeaturesShowcase />

      {/* ──────────────────────── Testimonials ──────────────────────── */}
      <Testimonials />

      {/* ──────────────────────── Pricing ──────────────────────── */}
      <Pricing />

      {/* ──────────────────────── FAQ ──────────────────────── */}
      <FAQ />

      {/* ────────────────────── Final CTA ────────────────────── */}
      <section
        className="py-28 md:py-36 px-6 border-t border-[#e5e2dc] bg-[#edecea]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {t.ctaSection.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg">
              {t.ctaSection.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/questionnaire"
                className="inline-flex items-center justify-center gap-2 bg-black text-[#fff] text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-colors duration-150"
              >
                {t.common.startCTA}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-black border-[1.5px] border-black text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors duration-150"
              >
                {t.hero.secondaryCTA}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ────────────────────── Footer ────────────────────── */}
      <footer className="border-t border-[#e5e2dc] py-8 px-6 bg-[#eae8e4]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-neutral-400">
            &copy; {new Date().getFullYear()} {t.common.appName}
          </span>
          <div className="flex gap-6 text-[13px] text-neutral-500">
            <a
              href="#"
              className="hover:text-neutral-600 transition-colors"
            >
              {t.footer.privacy}
            </a>
            <a
              href="#"
              className="hover:text-neutral-600 transition-colors"
            >
              {t.footer.terms}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

