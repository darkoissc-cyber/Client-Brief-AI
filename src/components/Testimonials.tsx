"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import ScrollReveal from "@/components/ScrollReveal";

const getTestimonials = (lang: 'en' | 'ar') => [
  {
    initials: lang === 'ar' ? "سك" : "SK",
    name: lang === 'ar' ? "سارة ك." : "Sarah K.",
    role: lang === 'ar' ? "مصممة واجهات مستقلة" : "UX Freelancer",
    quote: lang === 'ar'
      ? "كنت أقضي ساعتين في المراسلات غير المجدية فقط لأفهم ما يريده العميل فعلاً. الآن أرسل لهم الرابط وأحصل على كل ما أحتاجه في 10 دقائق. لقد أصبح جزءاً أساسياً من كل مشروع أبدأه."
      : "I used to spend two hours back-and-forth just to understand what a client actually wanted. Now I send them a link and have everything I need in 10 minutes. It's become part of every project I take on.",
    stars: 5,
  },
  {
    initials: lang === 'ar' ? "مت" : "MT",
    name: lang === 'ar' ? "ماجد ت." : "Marcus T.",
    role: lang === 'ar' ? "مدير وكالة رقمية" : "Agency Director",
    quote: lang === 'ar'
      ? "كانت عملية استقبال عملائنا الجدد فوضوية تماماً. وفر لنا البرنامج عملية متسقة يستخدمها كل مدير مشروع حالياً دون الحاجة لأي تدريب. يعلق العملاء الجدد باستمرار على مدى احترافية هذه الخطوة."
      : "Our client onboarding was completely chaotic. Client Brief AI gave us a consistent process that every PM now uses without any training. New clients consistently comment on how professional it feels.",
    stars: 5,
  },
  {
    initials: lang === 'ar' ? "بن" : "PN",
    name: lang === 'ar' ? "بريا ن." : "Priya N.",
    role: lang === 'ar' ? "مطورة برمجيات متكاملة" : "Full-Stack Developer",
    quote: lang === 'ar'
      ? "موجه الذكاء الاصطناعي الناتج هو الميزة الأقوى على الإطلاق. أقوم بلصقه في مساعد الكود الخاص بي وأحصل على هيكل برمجيات شغال في دقائق بدلاً من إضاعة ساعات في التخطيط. تشتت النطاق قل بشكل ملحوظ."
      : "The AI prompt output is the real killer feature. I paste it into my AI assistant and have a working scaffold in minutes instead of hours of planning. Scope creep has dropped significantly.",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const testimonials = getTestimonials(language);

  return (
    <section 
      id="testimonials" 
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#eae8e4]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {language === 'ar' ? "ينال ثقة المبدعين والمنشئين" : "Loved by freelancers & agencies"}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg max-w-lg mx-auto">
              {language === 'ar' ? "انضم إلى آلاف المحترفين الذين قاموا بتبسيط وتنظيم عملية استقبال عملائهم الجدد." : "Join thousands of people who have streamlined their client intake process."}
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <ScrollReveal
              key={t.name}
              delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}
              className="bg-white border border-neutral-200/80 rounded-2xl p-7 depth-card flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 text-start"
            >
              <StarRating count={t.stars} />

              <blockquote className="text-[15px] text-neutral-800 leading-[1.7] flex-1 mb-6">
                &quot;{t.quote}&quot;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <div className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-[11px] font-semibold text-neutral-700 shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-[12px] text-neutral-500">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

