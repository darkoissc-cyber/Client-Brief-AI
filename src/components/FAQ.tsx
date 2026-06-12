"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import ScrollReveal from "@/components/ScrollReveal";

export default function FAQ() {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.faq.items;

  return (
    <section 
      id="faq" 
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#eae8e4]"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {t.faq.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg">
              {t.faq.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal
                key={i}
                delay={2}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 depth-card ${isOpen ? "border-neutral-300 shadow-sm" : "border-neutral-200/60"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-neutral-900 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="px-6 pb-5 text-[14px] text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4 text-start">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <a
            href="/faq"
            className="text-[13px] text-neutral-600 no-underline hover:text-neutral-900 transition-colors"
          >
            {t.faq.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}

