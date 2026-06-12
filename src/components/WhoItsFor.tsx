import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import ScrollReveal from "@/components/ScrollReveal";

const getPersonas = (lang: 'en' | 'ar') => [
  {
    icon: "💼",
    role: lang === 'ar' ? "المستقلين" : "Freelancer",
    tagline: lang === 'ar' ? "تدير كل شيء بمفردك." : "You handle it all solo.",
    description: lang === 'ar'
      ? "توقف عن قضاء ساعات في مطاردة تفاصيل العميل عبر البريد الإلكتروني. اجمع متطلبات منظمة برابط واحد قابل للمشاركة — قبل أن يبدأ المشروع."
      : "Stop spending hours chasing client details over email. Collect structured requirements with a single shareable link — before the project even starts.",
    benefits: lang === 'ar'
      ? ["توفير 2-3 ساعات لكل مشروع", "جولات مراجعة وتعديل أقل", "انطباع أول احترافي ومميز"]
      : [
          "Save 2–3 hours per project",
          "Fewer revision rounds",
          "Professional first impression",
        ],
    accentBg: "bg-[#f0ede8]",
    accentBorder: "border-transparent",
    accentText: "text-neutral-700",
  },
  {
    icon: "🏢",
    role: lang === 'ar' ? "الوكالات والشركات" : "Agency",
    tagline: lang === 'ar' ? "تدير عدة مشاريع في وقت واحد." : "You manage multiple projects at once.",
    description: lang === 'ar'
      ? "وحد آلية استقبال عملائك الجدد عبر كل مشروع ومع كل عضو في الفريق. احصل على توافق كامل من اليوم الأول دون اجتماعات بدء طويلة."
      : "Standardize client onboarding across every project and every team member. Get full alignment from day one without long kickoff calls.",
    benefits: lang === 'ar'
      ? ["عملية تهيئة متسقة وعادلة", "مواصفات جاهزة ومفهومة للفريق", "تتوسع لتناسب جميع العملاء"]
      : [
          "Consistent onboarding process",
          "Team-ready specifications",
          "Scales across all clients",
        ],
    accentBg: "bg-[#e8f0fe]",
    accentBorder: "border-transparent",
    accentText: "text-neutral-700",
  },
  {
    icon: "⌨️",
    role: lang === 'ar' ? "المطورين" : "Developer",
    tagline: lang === 'ar' ? "تحتاج إلى وضوح تام قبل كتابة الكود." : "You need clarity before writing code.",
    description: lang === 'ar'
      ? "احصل على موجهات جاهزة للذكاء الاصطناعي تندمج مباشرة مع سير عملك. تخمين أقل، تقليل لتشتت النطاق، ومزيد من الوقت الفعلي للبناء."
      : "Get AI-ready development prompts that map directly into your workflow. Less guessing, less scope creep, and more time actually building.",
    benefits: lang === 'ar'
      ? ["موجهات جاهزة للذكاء الاصطناعي", "مواصفات ميزات واضحة وقابلة للبناء", "يقلل من تمدد نطاق المشروع بشكل كبير"]
      : [
          "AI-ready prompts from day one",
          "Clear, buildable feature specs",
          "Dramatically reduces scope creep",
        ],
    accentBg: "bg-[#e8f5e9]",
    accentBorder: "border-transparent",
    accentText: "text-neutral-700",
  },
];

export default function WhoItsFor() {
  const { language } = useLanguage();
  const t = translations[language];
  const personas = getPersonas(language);

  return (
    <section 
      id="who-its-for" 
      className="py-24 md:py-32 px-6 border-t border-[#e5e2dc] bg-[#eae8e4]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <ScrollReveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              {language === 'ar' ? 'مصمم للأشخاص الذين يتقاضون أجورهم حسب المشروع' : 'Built for people who bill by the project'}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mt-4 text-neutral-500 text-lg max-w-lg mx-auto">
              {language === 'ar' ? 'سواء كنت تعمل بمفردك أو تدير فريقاً، فإن برنامجنا يتناسب تماماً مع طريقة عملك الحالية.' : 'Whether you work solo or run a team, Client Brief AI fits the way you already work.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, idx) => (
            <ScrollReveal
              key={persona.role}
              delay={idx === 0 ? 0 : idx === 1 ? 1 : 2}
              className="bg-white border border-neutral-200/60 rounded-2xl py-[28px] px-[24px] depth-card group text-start"
            >
              {/* Icon badge */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl text-2xl mb-5 ${persona.accentBg} border ${persona.accentBorder}`}
              >
                {persona.icon}
              </div>

              {/* Role + tagline */}
              <h3 className="text-[18px] font-semibold text-neutral-900 mb-1">
                {persona.role}
              </h3>
              <p className={`text-[12px] font-medium uppercase tracking-wider mb-4 ${persona.accentText}`}>
                {persona.tagline}
              </p>

              {/* Description */}
              <p className="text-[14px] text-neutral-500 leading-relaxed mb-6">
                {persona.description}
              </p>

              {/* Benefits list */}
              <ul className="space-y-2.5">
                {persona.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-neutral-700">
                    <Check className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

