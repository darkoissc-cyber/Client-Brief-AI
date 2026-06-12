export const translations = {
  en: {
    common: {
      appName: 'Client Brief AI',
      startCTA: 'Start Project Request',
      back: 'Back',
      continue: 'Continue',
      generate: 'Generate Brief',
      generating: 'Generating...',
      copied: 'Copied!',
      copy: 'Copy',
      downloadMd: 'Download .md',
      downloadTxt: 'Download .txt',
      returnHome: 'Return Home',
      startNew: 'Start New Brief',
      chars: 'chars',
    },
    nav: {
      howItWorks: 'How It Works',
      features: 'Features',
      pricing: 'Pricing',
      faq: 'FAQ',
    },
    hero: {
      stats: '3,200+ briefs generated',
      title1: 'Turn Client Requests Into',
      title2: 'Structured Project Briefs',
      subtitle: 'Collect requirements, organize projects, and eliminate endless back-and-forth communication.',
      quote: '"Cut my client onboarding time in half."',
      author: '— Sarah K., UI/UX Freelancer',
      secondaryCTA: 'See a sample brief',
    },
    howItWorks: {
      title: 'See How It Works',
      subtitle: 'From a simple client request to a complete project brief and AI-ready development prompt — in seconds.',
      badge: 'Takes less than 2 minutes',
      step: 'STEP',
      steps: [
        {
          step: 1,
          title: 'Client sends a request',
          description: 'Your client describes what they need in plain language — no jargon, no forms. Just a natural project request. They don\'t need an account or any setup.',
        },
        {
          step: 2,
          title: 'We generate a structured brief',
          description: 'Client Brief AI instantly transforms the raw request into a clean, organized project brief with budget estimates, timelines, and a categorized feature list.',
        },
        {
          step: 3,
          title: 'Get an AI-ready development prompt',
          description: 'A production-ready development prompt is auto-generated from the brief. Paste it into any AI coding assistant to start building immediately.',
        },
      ],
      visuals: {
        james: 'James M.',
        clientNow: 'Client • just now',
        jamesQuote: 'I need an e-commerce website for selling perfumes online. The site should support payments, customer accounts, mobile responsiveness, and an admin dashboard.',
        tags: ['E-commerce', 'Payments', 'Auth', 'Dashboard', 'Mobile'],
        generatedBrief: 'Generated Brief',
        ready: '✓ Ready',
        perfumeStore: 'Perfume E-commerce Store',
        projType: 'Project Type',
        timeline: 'Timeline',
        timelineVal: '1–2 Months',
        budget: 'Budget',
        budgetVal: '$5,000–$15,000',
        requirements: 'Requirements',
        reqList: [
          'Customer Authentication',
          'Payment Processing',
          'Admin Dashboard',
          'Mobile Responsive Design',
        ],
        aiPromptFile: 'ai-prompt.txt',
        sysInst: '[SYSTEM_INSTRUCTION]',
        sysInstText: 'Act as a software architect. Scaffold a premium application based on specifications:',
        projParams: '[PROJECT_PARAMETERS]',
        coreFeat: '[CORE_FEATURES]',
        mvpReady: 'Ready to Build',
        outcomeRequest: 'Client Request',
        outcomeBrief: 'Project Brief',
        outcomePrompt: 'AI Development Prompt',
      },
    },
    whoItsFor: {
      title: 'Who is it for?',
      subtitle: 'Built specifically for modern creators and builders.',
      cards: [
        {
          title: 'Freelancers',
          desc: 'Stop wasting hours in meetings trying to extract requirements. Send clients a link and get a structured scope automatically.',
        },
        {
          title: 'Agencies',
          desc: 'Standardize your client onboarding. Turn sales conversations and raw emails into technical briefs that your developers can start building from day one.',
        },
        {
          title: 'Product Managers',
          desc: 'Bridge the gap between business ideas and technical design. Convert rough user requests into structured requirements in seconds.',
        },
      ],
    },
    features: {
      title: 'Features built for builders',
      subtitle: 'Everything you need to move from conversation to codebase.',
      items: [
        {
          title: 'Client-facing Questionnaire',
          desc: 'A beautiful, jargon-free form that guides clients through defining their project overview, technical needs, design style, and scope.',
        },
        {
          title: 'Smart Brief Generation',
          desc: 'Automatically structures raw answers into a neat Markdown document containing goals, pages checklist, competitor analysis, and clear timelines.',
        },
        {
          title: 'AI Prompt Optimization',
          desc: 'Generates a highly optimized development prompt based on client input, ready to copy directly into Cursor, Claude, or Copilot for faster code scaffolding.',
        },
        {
          title: 'Zero Setup Required',
          desc: 'No complex software to configure. Share the link, let clients fill it out, and download the results. Keep your workflow lightweight and fast.',
        },
      ],
    },
    testimonials: {
      title: 'Loved by creators',
      subtitle: 'See how designers and developers use Client Brief AI to speed up onboarding.',
      items: [
        {
          quote: 'Client Brief AI completely changed how I start projects. Clients fill it out in minutes, and I get a perfect technical specification to feed straight into Cursor.',
          author: 'Alex Rivera',
          role: 'Freelance Full-stack Developer',
        },
        {
          quote: 'We now send this questionnaire to every inbound lead. It filters out unserious clients and ensures our design team has clear guidelines before sketching anything.',
          author: 'Elena Rostova',
          role: 'Creative Director at PixelDraft',
        },
        {
          quote: 'Having the budget, pages list, and core features clearly mapped out saves us days of negotiation. The generated AI prompt is incredibly precise.',
          author: 'Marcus Chen',
          role: 'SaaS Product Consultant',
        },
      ],
    },
    pricing: {
      title: 'Simple, transparent pricing',
      subtitle: 'Choose the plan that fits your freelance business or team size.',
      plans: [
        {
          name: 'Starter',
          price: '0',
          period: 'forever',
          desc: 'Perfect for freelancers getting started.',
          features: [
            '3 project briefs / month',
            'Standard AI prompt generation',
            'Export to Markdown',
            'Local storage save only',
          ],
          cta: 'Start Free',
        },
        {
          name: 'Professional',
          price: '29',
          period: 'month',
          desc: 'Best for busy independent builders.',
          features: [
            'Unlimited project briefs',
            'Advanced AI prompt templates',
            'Export to PDF & Markdown',
            'Cloud database syncing',
            'Custom shareable links',
            '14-day free trial',
          ],
          cta: 'Start Pro Trial',
        },
        {
          name: 'Agency',
          price: '79',
          period: 'month',
          desc: 'Designed for teams and agencies.',
          features: [
            'Everything in Pro',
            'Custom branding on client forms',
            'Team collaboration workspace',
            'Zapier & Slack integrations',
            'Priority support & API access',
          ],
          cta: 'Contact Sales',
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      subtitle: 'Everything you need to know before getting started.',
      viewAll: 'View all questions →',
      items: [
        {
          q: 'Who fills out the questionnaire?',
          a: 'Your client does. You share a unique link and they complete the questionnaire at their own pace — no account required. You receive the structured brief instantly once they submit.',
        },
        {
          q: 'What format is the output?',
          a: 'You receive a structured Markdown brief that can be copied, shared as a link, or exported as a PDF. The AI development prompt is plain text, ready to paste into any AI coding assistant like Cursor, Copilot, or Claude.',
        },
        {
          q: 'Can I edit the brief after it\'s generated?',
          a: 'Yes. Every generated brief is fully editable. You can add, remove, or modify any section before sharing or exporting. Changes are saved automatically.',
        },
        {
          q: 'Does it integrate with other tools?',
          a: 'Client Brief AI currently works as a powerful standalone tool. Zapier and Notion integrations are on the roadmap for Q3 2025. In the meantime, you can copy and paste outputs into any tool.',
        },
        {
          q: 'Is there a free trial for paid plans?',
          a: 'Yes — all paid plans come with a 14-day free trial, no credit card required. You\'ll have full access to all features during the trial. Cancel anytime.',
        },
        {
          q: 'How long does it take to complete?',
          a: 'Most clients complete the questionnaire in under 2 minutes. The project brief and AI prompt are generated instantly once they submit — no waiting required.',
        },
      ],
    },
    ctaSection: {
      title: 'Ready to streamline your workflow?',
      subtitle: 'Stop chasing clients for project details. Start collecting structured requirements today.',
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
    },
    questionnaire: {
      navTitle: 'Project Questionnaire',
      successHeader: 'Project Brief Generated',
      successSub: 'Your brief and AI development prompt are ready to use.',
      briefSecTitle: '01 · Project Brief',
      promptSecTitle: '02 · AI Development Prompt',
      promptCopyTip: 'Paste this prompt directly into Cursor, Claude, or GitHub Copilot',
      steps: {
        overview: 'Overview',
        technical: 'Technical',
        design: 'Design',
        scope: 'Budget',
        review: 'Review',
      },
      overview: {
        title: 'Project Overview',
        desc: 'Provide basic details and describe your business and project scope.',
        fields: {
          projName: 'Project Name',
          projNamePlaceholder: 'e.g., Acme E-commerce Website',
          projNameHelper: 'The public-facing name or working title of your project.',
          clientName: 'Your Name / Company',
          clientNamePlaceholder: 'e.g., John Doe / Acme Corp',
          clientNameHelper: 'How you or your organization should be identified in the project files.',
          email: 'Email Address',
          emailPlaceholder: 'e.g., john@acme.com',
          emailHelper: 'The primary contact email for project queries and updates.',
          bizDesc: 'Describe your business in detail *',
          bizDescPlaceholder: 'Tell us about your company, industry, products/services, and what makes you unique...',
          bizDescHelper: 'Detail what your company does, your products/services, and target market (minimum 150 characters).',
          problem: 'What problem does this project solve? *',
          problemPlaceholder: 'Explain the pain point or challenge this project is addressing...',
          problemHelper: 'Describe the specific operational issues or client pain points this project resolves.',
          audience: 'Who is the target audience? *',
          audiencePlaceholder: 'e.g., Tech-savvy professionals aged 25-40, small business owners...',
          audienceHelper: 'Define the demographics, roles, and behaviors of your ideal visitors or users.',
          goals: 'Project Goals & Description *',
          goalsPlaceholder: 'Provide a general description of the project itself...',
          goalsHelper: 'A comprehensive summary of the project scope, context, and desired outcomes (minimum 100 characters).',
        },
      },
      technical: {
        title: 'Technical Requirements',
        desc: 'Define the platform, features, and hosting scale for the project.',
        fields: {
          platform: 'Platform Preference *',
          platformOptions: {
            nextjs: 'Next.js / React App',
            wordpress: 'WordPress',
            shopify: 'Shopify',
            custom: 'Custom Stack',
          },
          platformHelper: 'Select the primary framework or CMS that fits your team or existing systems.',
          features: 'Core Features Checklist *',
          featuresHelper: 'Select all essential capabilities the application must support in Phase 1.',
          featuresOptions: {
            auth: 'User Authentication & Profiles',
            payments: 'E-commerce & Payments',
            cms: 'Content Management System',
            integrations: 'Third-party API Integrations',
            search: 'Advanced Search & Filters',
            analytics: 'Analytics & Reporting',
            multilingual: 'Multi-language Support',
            realtime: 'Real-time Features',
          },
          traffic: 'Expected Monthly Traffic *',
          trafficOptions: {
            'under-10k': 'Under 10,000 / month',
            '10k-100k': '10,000 - 100,000 / month',
            '100k-1m': '100,000 - 1,000,000 / month',
            'over-1m': 'Over 1,000,000 / month',
            unsure: 'Not sure yet',
          },
          trafficHelper: 'Helps configure infrastructure, CDN, scaling thresholds, and database sizing.',
          customFeatures: 'Most Important Custom Features *',
          customFeaturesPlaceholder: 'e.g., Real-time chat with support agents, automated invoice generation, etc.',
          customFeaturesHelper: 'Describe in detail the 2-3 most complex custom workflows or features required.',
          primaryGoal: 'Primary Site Goal *',
          primaryGoalPlaceholder: 'e.g., Generate qualified leads, sell physical products, educate visitors, etc.',
          primaryGoalHelper: 'What is the single most important action or outcome for this website?',
          ctaAction: 'Primary Call-To-Action (CTA) *',
          ctaActionPlaceholder: 'e.g., Click the "Book a Demo" button, complete purchase at checkout...',
          ctaActionHelper: 'What specific action do you want the user to take?',
          pages: 'List of Needed Pages *',
          pagesPlaceholder: 'e.g., Home page, pricing page, product detail page, checkout, dashboard...',
          pagesHelper: 'List all specific views or routes that must be designed and built.',
        },
      },
      design: {
        title: 'Design & Branding',
        desc: 'Share references, visual preferences, and brand assets.',
        fields: {
          style: 'Visual Style Preference *',
          styleOptions: {
            minimalist: 'Clean & Minimalist',
            colorful: 'Vibrant & Playful',
            corporate: 'Sleek & Professional',
            bold: 'Modern & Bold',
          },
          styleHelper: 'Choose the visual aesthetic that represents your brand identity.',
          guidelines: 'Do you have existing brand guidelines? *',
          guidelinesOptions: {
            yes: 'Yes, I will provide colors, logos, and fonts',
            no: 'No, we need guidelines created from scratch',
          },
          guidelinesHelper: 'Indicates if the design assets are already available or need creative development.',
          competitors: 'Competitors or Inspiration Sites *',
          competitorsPlaceholder: 'e.g., competitor1.com, inspiration2.co (describe what you like about them)...',
          competitorsHelper: 'List competitors and mention what you like or dislike about their digital presence.',
          likedWebsites: 'Design References (Websites You Love) *',
          likedWebsitesPlaceholder: 'e.g., stripe.com (layout), apple.com (typography), linear.app (interactions)...',
          likedWebsitesHelper: 'Share links to 2-3 websites outside your industry that you love visually or functionally.',
        },
      },
      scope: {
        title: 'Budget & Timeline',
        desc: 'Specify your budget range, target delivery date, and additional inputs.',
        fields: {
          budget: 'Project Budget Range *',
          budgetOptions: {
            'under-5k': 'Under $5,000',
            '5k-15k': '$5,000 - $15,000',
            '15k-30k': '$15,000 - $30,000',
            'over-30k': '$30,000+',
          },
          budgetHelper: 'Helps us scope features and prioritize modules for the initial launch.',
          timeline: 'Target Launch Timeline *',
          timelineOptions: {
            '1-month': 'Within 1 month',
            '1-3-months': '1-3 months',
            '3-6-months': '3-6 months',
            flexible: 'Flexible',
          },
          timelineHelper: 'Determines project phasing, sprint speeds, and resource scheduling.',
          content: 'Who is providing website copy/content? *',
          contentOptions: {
            client: 'Client-provided (We will write it all)',
            developer: 'Developer-created (Copywriter needed)',
            collab: 'Collaborative (Mix of both)',
          },
          contentHelper: 'Defines responsibilities for writing copy, gathering imagery, and data entry.',
          notes: 'Additional Notes or Requirements',
          notesPlaceholder: 'Any other specific requirements, integrations, or constraints we should know about...',
          notesHelper: 'Provide any extra context that wasn\'t covered in the previous steps.',
        },
      },
      review: {
        title: 'Review Your Request',
        desc: 'Double-check your information before generating the structured project brief.',
        warning: 'Please review all sections carefully. You can click "Back" or any step number above to make changes.',
      },
    },
  },
  ar: {
    common: {
      appName: 'موجز العميل الذكي',
      startCTA: 'ابدأ طلب المشروع',
      back: 'السابق',
      continue: 'التالي',
      generate: 'توليد الموجز',
      generating: 'جاري التوليد...',
      copied: 'تم النسخ!',
      copy: 'نسخ',
      downloadMd: 'تحميل ملف .md',
      downloadTxt: 'تحميل ملف .txt',
      returnHome: 'العودة للرئيسية',
      startNew: 'بدء موجز جديد',
      chars: 'أحرف',
    },
    nav: {
      howItWorks: 'طريقة العمل',
      features: 'المميزات',
      pricing: 'الأسعار',
      faq: 'الأسئلة الشائعة',
    },
    hero: {
      stats: 'تم إنشاء أكثر من 3,200 موجز',
      title1: 'حوّل طلبات عملائك إلى',
      title2: 'مواجز مشاريع منظمة',
      subtitle: 'اجمع متطلبات مشروعك، ونظّم مهامك، وتجنّب المراسلات الطويلة وغير المجدية مع العملاء.',
      quote: '“وفّر نصف الوقت المستغرق في تهيئة وتدريب عملائي الجدد.”',
      author: '— سارة ك.، مصممة واجهات مستقلة',
      secondaryCTA: 'شاهد نموذجاً للموجز',
    },
    howItWorks: {
      title: 'شاهد طريقة العمل',
      subtitle: 'من طلب بسيط للعميل إلى موجز مشروع متكامل وموجه للذكاء الاصطناعي — في ثوانٍ معدودة.',
      badge: 'يستغرق أقل من دقيقتين',
      step: 'الخطوة',
      steps: [
        {
          step: 1,
          title: 'يرسل العميل طلبه',
          description: 'يصف عميلك ما يحتاجه بلغة مبسطة وعادية — بدون مصطلحات معقدة أو نماذج صعبة. لا يحتاجون لإنشاء حساب أو أي إعدادات مسبقة.',
        },
        {
          step: 2,
          title: 'ننشئ موجزاً مهيكلاً للمشروع',
          description: 'يقوم نظامنا بتحويل الطلب الخام فوراً إلى موجز مشروع نظيف ومنظم يحتوي على تقديرات الميزانية، والجدول الزمني، وقائمة الميزات المصنفة.',
        },
        {
          step: 3,
          title: 'احصل على موجه برمجي جاهز للذكاء الاصطناعي',
          description: 'يتم إنشاء موجه برمجة جاهز للإنتاج من واقع الموجز. انسخه والصقه في أي مساعد برمجة يعمل بالذكاء الاصطناعي (مثل Cursor أو Copilot) لتبدأ البرمجة فوراً.',
        },
      ],
      visuals: {
        james: 'أحمد م.',
        clientNow: 'عميل • الآن',
        jamesQuote: 'أحتاج إلى موقع تجارة إلكترونية لبيع العطور عبر الإنترنت. يجب أن يدعم الموقع الدفع الإلكتروني، وحسابات العملاء، والتوافق مع الجوال، ولوحة تحكم للإدارة.',
        tags: ['تجارة إلكترونية', 'دفع إلكتروني', 'توثيق', 'لوحة تحكم', 'جوال'],
        generatedBrief: 'الموجز المنشأ',
        ready: '✓ جاهز',
        perfumeStore: 'متجر عطور إلكتروني',
        projType: 'نوع المشروع',
        timeline: 'الجدول الزمني',
        timelineVal: '1–2 شهر',
        budget: 'الميزانية',
        budgetVal: '$5,000 – $15,000',
        requirements: 'المتطلبات',
        reqList: [
          'توثيق حسابات العملاء',
          'معالجة المدفوعات الإلكترونية',
          'لوحة تحكم للمدير',
          'تصميم متوافق مع الجوال',
        ],
        aiPromptFile: 'ai-prompt.txt',
        sysInst: '[SYSTEM_INSTRUCTION]',
        sysInstText: 'تصرف كمهندس برمجيات. قم بإنشاء هيكل تطبيق ممتاز بناءً على المواصفات التالية:',
        projParams: '[PROJECT_PARAMETERS]',
        coreFeat: '[CORE_FEATURES]',
        mvpReady: 'جاهز للبناء',
        outcomeRequest: 'طلب العميل',
        outcomeBrief: 'موجز المشروع',
        outcomePrompt: 'موجه الذكاء الاصطناعي',
      },
    },
    whoItsFor: {
      title: 'لمن هذا البرنامج؟',
      subtitle: 'صُمم خصيصاً للمطورين والمنشئين المعاصرين.',
      cards: [
        {
          title: 'المستقلين',
          desc: 'توقف عن إضاعة الساعات في الاجتماعات لمحاولة استخلاص المتطلبات. أرسل رابطاً لعملائك واحصل على نطاق العمل مهيكلاً بشكل تلقائي.',
        },
        {
          title: 'الوكالات والشركات',
          desc: 'وحّد آلية استقبال عملائك الجدد. حوّل نقاشات المبيعات ورسائل البريد الخام إلى مواجز تقنية يستطيع مطوروك البدء في بنائها من اليوم الأول.',
        },
        {
          title: 'مدراء المنتجات',
          desc: 'جسّر الفجوة بين الأفكار التجارية والتصميم التقني. حوّل طلبات المستخدمين التقريبية إلى متطلبات منظمة في ثوانٍ معدودة.',
        },
      ],
    },
    features: {
      title: 'ميزات صُممت للمطورين',
      subtitle: 'كل ما تحتاجه للانتقال من المحادثة إلى الكود البرمجي مباشرة.',
      items: [
        {
          title: 'استبيان موجه للعملاء',
          desc: 'استمارة جميلة خالية من التعقيدات التقنية ترشد عملائك لتحديد نظرة عامة عن المشروع، والاحتياجات التقنية، والنمط البصري، ونطاق العمل.',
        },
        {
          title: 'توليد ذكي للموجز',
          desc: 'ينظّم الإجابات الخام تلقائياً في ملف Markdown منسق ومقروء يحتوي على الأهداف، وقائمة الصفحات، وتحليل المنافسين، ومواعيد التسليم الواضحة.',
        },
        {
          title: 'تحسين موجه الذكاء الاصطناعي',
          desc: 'يولّد موجه برمجي محسّن للغاية بناءً على مدخلات العميل، جاهز للنسخ مباشرة في مساعدك الذكي لتسريع بناء الهيكل العام للمشروع.',
        },
        {
          title: 'بدون إعدادات مسبقة',
          desc: 'لا توجد برامج معقدة لتثبيتها. شارك الرابط، ودع العملاء يملأون البيانات، وحمّل المخرجات. حافظ على بساطة وسرعة سير عملك.',
        },
      ],
    },
    testimonials: {
      title: 'ينال ثقة المبدعين والمنشئين',
      subtitle: 'شاهد كيف يستخدم المصممون والمطورون برنامجنا لتسريع استقبال عملائهم والبدء بمشاريعهم.',
      items: [
        {
          quote: 'لقد غيّر هذا البرنامج طريقة بدئي للمشاريع تماماً. يملأ العملاء البيانات في دقائق، وأحصل على مواصفات تقنية ممتازة لإدخالها مباشرة في Cursor.',
          author: 'أليكس ريفيرا',
          role: 'مطور مستقل للمواقع والتطبيقات',
        },
        {
          quote: 'نرسل هذا الاستبيان الآن لكل عميل محتمل. إنه يساعدنا في فرز الجادين وضمان فهم فريق التصميم للخطوط العريضة قبل رسم أي نموذج.',
          author: 'إيلينا روستوفا',
          role: 'المدير الإبداعي في PixelDraft',
        },
        {
          quote: 'تحديد الميزانية، قائمة الصفحات، والميزات الأساسية بوضوح يختصر علينا أياماً من المفاوضات. موجه الذكاء الاصطناعي الناتج دقيق للغاية.',
          author: 'ماركوس تشن',
          role: 'مستشار منتجات البرمجيات الخدمية SaaS',
        },
      ],
    },
    pricing: {
      title: 'أسعار بسيطة وواضحة',
      subtitle: 'اختر الباقة التي تناسب عملك المستقل أو حجم فريقك.',
      plans: [
        {
          name: 'الباقة المجانية',
          price: '0',
          period: 'للأبد',
          desc: 'مثالية للمستقلين في بداية طريقهم.',
          features: [
            'إنشاء 3 مواجز مشاريع شهرياً',
            'توليد موجهات الذكاء الاصطناعي القياسية',
            'تصدير بصيغة Markdown',
            'حفظ البيانات محلياً فقط',
          ],
          cta: 'ابدأ مجاناً',
        },
        {
          name: 'الباقة الاحترافية',
          price: '29',
          period: 'شهرياً',
          desc: 'الأفضل للمطورين المستقلين النشطين.',
          features: [
            'عدد لا محدود من مواجز المشاريع',
            'قوالب موجهات ذكاء اصطناعي متقدمة',
            'تصدير بصيغتي PDF و Markdown',
            'مزامنة وحفظ البيانات سحابياً',
            'روابط مخصصة وقابلة للمشاركة',
            'فترة تجريبية مجانية لمدة 14 يوماً',
          ],
          cta: 'ابدأ التجربة الاحترافية',
        },
        {
          name: 'باقة الشركات',
          price: '79',
          period: 'شهرياً',
          desc: 'مصممة للفرق والوكالات الرقمية.',
          features: [
            'تشمل كافة ميزات الباقة الاحترافية',
            'إضافة الهوية والشعار المخصص للنماذج',
            'مساحة عمل مشتركة لتعاون الفريق',
            'الربط مع خدمات Zapier و Slack',
            'دعم فني ذو أولوية ووصول كامل للـ API',
          ],
          cta: 'تواصل مع المبيعات',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'كل ما تحتاج معرفته قبل البدء.',
      viewAll: 'عرض جميع الأسئلة ←',
      items: [
        {
          q: 'من الذي يقوم بملء الاستبيان؟',
          a: 'عميلك هو من يقوم بملئه. تشارك معه رابطاً فريداً ويقوم بإكمال الاستبيان بالسرعة التي تناسبه — دون الحاجة لإنشاء حساب. ستتلقى الموجز المنظم فور إرساله.',
        },
        {
          q: 'ما هي صيغة المخرجات؟',
          a: 'ستتلقى موجزاً منظماً بصيغة Markdown يمكن نسخه، أو مشاركته كرابط، أو تصديره كملف PDF. وموجه الذكاء الاصطناعي يكون بصيغة نص عادي جاهز للصقه في أي مساعد برمجيات ذكي.',
        },
        {
          q: 'هل يمكنني تعديل الموجز بعد إنشائه؟',
          a: 'نعم. كل موجز يتم إنشاؤه يكون قابلاً للتعديل بالكامل. يمكنك إضافة أو حذف أو تعديل أي قسم قبل المشاركة أو التصدير. يتم حفظ التغييرات تلقائياً.',
        },
        {
          q: 'هل يتكامل مع أدوات أخرى؟',
          a: 'يعمل البرنامج حالياً كأداة قوية مستقلة. تكاملات Zapier و Notion مدرجة في خطة عملنا للربع الثالث من عام 2025. في هذه الأثناء، يمكنك نسخ المخرجات ولصقها في أي أداة.',
        },
        {
          q: 'هل هناك تجربة مجانية للباقات المدفوعة؟',
          a: 'نعم — تأتي جميع الباقات المدفوعة بفترة تجريبية مجانية لمدة 14 يوماً، دون الحاجة لبطاقة ائتمان. سيكون لديك وصول كامل لجميع الميزات خلال الفترة ويمكنك الإلغاء في أي وقت.',
        },
        {
          q: 'كم من الوقت يستغرق إكمال الاستبيان؟',
          a: 'يستغرق معظم العملاء أقل من دقيقتين لإكمال الاستبيان. يتم إنشاء موجز المشروع وموجه الذكاء الاصطناعي فوراً بمجرد إرساله.',
        },
      ],
    },
    ctaSection: {
      title: 'جاهز لتنظيم وتبسيط سير عملك؟',
      subtitle: 'توقف عن مطاردة العملاء للحصول على التفاصيل. ابدأ في جمع متطلبات منظمة ومهيكلة اليوم.',
    },
    footer: {
      privacy: 'الخصوصية',
      terms: 'الشروط',
    },
    questionnaire: {
      navTitle: 'استبيان المشروع',
      successHeader: 'تم إنشاء موجز المشروع بنجاح',
      successSub: 'أصبح موجز المشروع والموجه البرمجي للذكاء الاصطناعي جاهزين للاستخدام.',
      briefSecTitle: '01 · موجز المشروع',
      promptSecTitle: '02 · موجه برمجة الذكاء الاصطناعي',
      promptCopyTip: 'الصق هذا الموجه مباشرة في Cursor أو Claude أو GitHub Copilot لتبدأ البناء.',
      steps: {
        overview: 'نظرة عامة',
        technical: 'المتطلبات التقنية',
        design: 'النمط البصري',
        scope: 'الميزانية',
        review: 'المراجعة',
      },
      overview: {
        title: 'نظرة عامة على المشروع',
        desc: 'يرجى تقديم التفاصيل الأساسية ووصف عملك ونطاق المشروع.',
        fields: {
          projName: 'اسم المشروع',
          projNamePlaceholder: 'مثال: موقع Acme للتجارة الإلكترونية',
          projNameHelper: 'الاسم العام للمشروع أو عنوان العمل الحالي.',
          clientName: 'اسمك / اسم الشركة',
          clientNamePlaceholder: 'مثال: أحمد محمد / شركة Acme',
          clientNameHelper: 'الاسم المستخدم لتعريفك أو تعريف منشأتك في ملفات المشروع.',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'مثال: john@acme.com',
          emailHelper: 'البريد الإلكتروني الرئيسي للتواصل ومتابعة تحديثات المشروع.',
          bizDesc: 'صِف طبيعة عملك بالتفصيل *',
          bizDescPlaceholder: 'تحدث عن شركتك، مجال عملك، المنتجات أو الخدمات التي تقدمها، وما يجعلك مميزاً...',
          bizDescHelper: 'تفاصيل ما تفعله شركتك، والمنتجات أو الخدمات، والسوق المستهدف (150 حرفاً على الأقل).',
          problem: 'ما هي المشكلة التي يحلها المشروع؟ *',
          problemPlaceholder: 'اشرح التحدي أو المشكلة التي يعالجها هذا المشروع...',
          problemHelper: 'صف المشاكل التشغيلية المحددة أو نقاط الألم لدى عملائك التي يعالجها هذا المشروع.',
          audience: 'من هي الفئة المستهدفة؟ *',
          audiencePlaceholder: 'مثال: المهنيون المهتمون بالتكنولوجيا من سن 25 إلى 40 عاماً، أصحاب الأعمال الصغيرة...',
          audienceHelper: 'حدد التركيبة السكانية وأدوار وسلوكيات زوارك أو مستخدميك المثاليين.',
          goals: 'أهداف المشروع ووصفه *',
          goalsPlaceholder: 'قدم وصفاً عاماً للمشروع نفسه وأهم أهدافه...',
          goalsHelper: 'ملخص شامل لنطاق المشروع وسياقه والنتائج المرجوة (100 حرف على الأقل).',
        },
      },
      technical: {
        title: 'المتطلبات التقنية',
        desc: 'حدد المنصة، والميزات الرئيسية، وحجم الزوار المتوقع للمشروع.',
        fields: {
          platform: 'المنصة المفضلة *',
          platformOptions: {
            nextjs: 'تطبيق Next.js / React',
            wordpress: 'Wordpress',
            shopify: 'Shopify',
            custom: 'برمجة خاصة / منصة أخرى',
          },
          platformHelper: 'اختر بيئة التطوير أو نظام إدارة المحتوى (CMS) الأنسب لمتطلباتك.',
          features: 'قائمة الميزات الأساسية *',
          featuresHelper: 'اختر جميع القدرات الهامة التي يجب أن يدعمها التطبيق في المرحلة الأولى.',
          featuresOptions: {
            auth: 'توثيق المستخدمين والملفات الشخصية',
            payments: 'التجارة الإلكترونية والمدفوعات',
            cms: 'نظام إدارة المحتوى (CMS)',
            integrations: 'الربط مع خدمات خارجية (API)',
            search: 'البحث المتقدم والفلاتر',
            analytics: 'التقارير والإحصائيات',
            multilingual: 'دعم لغات متعددة (بما فيها العربية)',
            realtime: 'ميزات تفاعلية بالوقت الفعلي',
          },
          traffic: 'حجم الزوار المتوقع شهرياً *',
          trafficOptions: {
            'under-10k': 'أقل من 10,000 / شهرياً',
            '10k-100k': '10,000 - 100,000 / شهرياً',
            '100k-1m': '100,000 - 1,000,000 / شهرياً',
            'over-1m': 'أكثر من 1,000,000 / شهرياً',
            unsure: 'غير متأكد حالياً',
          },
          trafficHelper: 'تساعد في تهيئة البنية التحتية، خوادم الاستضافة، وقواعد البيانات.',
          customFeatures: 'الميزات المخصصة الأكثر أهمية *',
          customFeaturesPlaceholder: 'مثال: دردشة مباشرة مع الدعم الفني، توليد فواتير تلقائية، إلخ.',
          customFeaturesHelper: 'صف بالتفصيل الميزتين أو الثلاث ميزات المخصصة والأكثر تعقيداً المطلوبة.',
          primaryGoal: 'الهدف الأساسي للموقع *',
          primaryGoalPlaceholder: 'مثال: جمع بيانات العملاء المهتمين، بيع المنتجات، تثقيف الزوار، إلخ.',
          primaryGoalHelper: 'ما هو الإجراء أو الهدف الفردي الأكثر أهمية لهذا الموقع؟',
          ctaAction: 'إجراء الحث على اتخاذ قرار (CTA) الرئيسي *',
          ctaActionPlaceholder: 'مثال: الضغط على زر "طلب عرض تجريبي"، إكمال الشراء عند الدفع...',
          ctaActionHelper: 'ما هو الإجراء المحدد الذي تريد من الزائر اتخاذه؟',
          pages: 'قائمة الصفحات المطلوبة *',
          pagesPlaceholder: 'مثال: الصفحة الرئيسية، صفحة الأسعار، صفحة تفاصيل المنتج، الدفع، لوحة التحكم...',
          pagesHelper: 'اكتب قائمة بجميع الصفحات أو المسارات التي يجب تصميمها وبناؤها.',
        },
      },
      design: {
        title: 'التصميم والهوية البصرية',
        desc: 'شارك المواقع الملهمة وتفضيلاتك البصرية وأصول الهوية المتاحة.',
        fields: {
          style: 'النمط البصري المفضل *',
          styleOptions: {
            minimalist: 'نظيف وبسيط (Minimalist)',
            colorful: 'نابض بالحياة ومبهج',
            corporate: 'أنيق ورسمي (مهني)',
            bold: 'حديث وجريء (Modern & Bold)',
          },
          styleHelper: 'اختر الجمالية البصرية العامة التي تعبر عن هوية علامتك التجارية.',
          guidelines: 'هل لديك هوية بصرية أو خطوط إرشادية جاهزة؟ *',
          guidelinesOptions: {
            yes: 'نعم، سأوفر الألوان والشعارات والخطوط',
            no: 'لا، نريد إنشاء الهوية البصرية من الصفر',
          },
          guidelinesHelper: 'يوضح ما إذا كانت أصول التصميم متوفرة بالفعل أو تحتاج إلى تطوير إبداعي.',
          competitors: 'المنافسون أو مواقع ملهمة لك *',
          competitorsPlaceholder: 'مثال: competitor1.com، موقع inspiration2.co (مع كتابة ما يعجبك فيها)...',
          competitorsHelper: 'اذكر بعض المنافسين واكتب ما يعجبك أو لا يعجبك في تواجدهم الرقمي.',
          likedWebsites: 'مراجع التصميم (مواقع تعجبك جماليتها) *',
          likedWebsitesPlaceholder: 'مثال: stripe.com (التنسيق)، apple.com (الخطوط)، linear.app (التفاعل)...',
          likedWebsitesHelper: 'شارك روابط لـ 2-3 مواقع تحبها بصرياً أو وظيفياً خارج مجال عملك المباشر.',
        },
      },
      scope: {
        title: 'الميزانية والجدول الزمني',
        desc: 'حدد النطاق المالي للمشروع، وموعد الإطلاق المستهدف، وأي ملاحظات إضافية.',
        fields: {
          budget: 'الميزانية التقريبية للمشروع *',
          budgetOptions: {
            'under-5k': 'أقل من $5,000',
            '5k-15k': '$5,000 - $15,000',
            '15k-30k': '$15,000 - $30,000',
            'over-30k': '$30,000+',
          },
          budgetHelper: 'تساعد في تحديد نطاق الميزات وتحديد أولويات التطوير للإطلاق الأول.',
          timeline: 'الجدول الزمني المستهدف للإطلاق *',
          timelineOptions: {
            '1-month': 'خلال شهر واحد',
            '1-3-months': '1 - 3 أشهر',
            '3-6-months': '3 - 6 أشهر',
            flexible: 'مرن',
          },
          timelineHelper: 'تحدد مراحل العمل وسرعة التطوير وجدولة الموارد البشرية.',
          content: 'من سيقوم بتوفير محتوى ونصوص الموقع؟ *',
          contentOptions: {
            client: 'العميل (سنقوم بكتابة وتجهيز كل المحتوى)',
            developer: 'المطور (نحتاج لكاتب محتوى محترف)',
            collab: 'تعاون مشترك (مزيج من الاثنين)',
          },
          contentHelper: 'تحدد المسؤوليات المتعلقة بكتابة النصوص وجمع الصور وإدخال البيانات.',
          notes: 'ملاحظات أو متطلبات إضافية',
          notesPlaceholder: 'أي متطلبات خاصة أخرى، ربط مع خوادم معينة، أو قيود تقنية يجب مراعاتها...',
          notesHelper: 'اكتب أي تفاصيل أخرى لم تغطها الخطوات السابقة.',
        },
      },
      review: {
        title: 'مراجعة طلبك',
        desc: 'يرجى مراجعة وتأكيد كافة المعلومات المدخلة قبل توليد موجز المشروع المنظم.',
        warning: 'يرجى مراجعة كافة الأقسام بدقة. يمكنك النقر على "السابق" أو أي خطوة أعلاه لإجراء التعديل.',
      },
    },
  },
};

export const translateValidationError = (errorMsg: string, lang: 'en' | 'ar'): string => {
  if (lang === 'en') return errorMsg;

  const msg = errorMsg.toLowerCase();
  
  if (msg.includes("must be at least 2 characters") || msg.includes("must be 2 characters")) {
    return 'يجب أن يكون الاسم حرفين على الأقل.';
  }
  if (msg.includes("valid email address")) {
    return 'الرجاء إدخال عنوان بريد إلكتروني صحيح.';
  }
  if (msg.includes("describe the project in at least 100")) {
    return 'الرجاء كتابة وصف للمشروع لا يقل عن 100 حرف.';
  }
  if (msg.includes("describe your business in at least 150")) {
    return 'الرجاء كتابة وصف لعملك لا يقل عن 150 حرفاً.';
  }
  if (msg.includes("problem this project solves (min 10")) {
    return 'الرجاء شرح المشكلة التي يحلها المشروع (10 أحرف كحد أدنى).';
  }
  if (msg.includes("target audience (min 10")) {
    return 'الرجاء وصف الفئة المستهدفة للمشروع (10 أحرف كحد أدنى).';
  }
  if (msg.includes("select a platform preference")) {
    return 'الرجاء اختيار منصة العمل المفضلة.';
  }
  if (msg.includes("select at least one core feature")) {
    return 'الرجاء اختيار ميزة واحدة رئيسية على الأقل من القائمة.';
  }
  if (msg.includes("select expected traffic")) {
    return 'الرجاء تحديد حجم الزوار المتوقع للموقع.';
  }
  if (msg.includes("list the most important features (min 10")) {
    return 'الرجاء كتابة الميزات المخصصة المطلوبة بالتفصيل (10 أحرف كحد أدنى).';
  }
  if (msg.includes("primary goal of the website/app (min 10")) {
    return 'الرجاء كتابة الهدف الأساسي للمشروع (10 أحرف كحد أدنى).';
  }
  if (msg.includes("visitor action (min 10")) {
    return 'الرجاء تحديد الإجراء المطلوب من الزائر (10 أحرف كحد أدنى).';
  }
  if (msg.includes("list the pages you need (min 10")) {
    return 'الرجاء كتابة قائمة بالصفحات المطلوبة (10 أحرف كحد أدنى).';
  }
  if (msg.includes("select a visual style preference")) {
    return 'الرجاء اختيار النمط البصري المفضل للتصميم.';
  }
  if (msg.includes("specify if you have existing brand guidelines") || msg.includes("brand guidelines")) {
    return 'الرجاء تحديد ما إذا كان لديك دليل هوية تجارية.';
  }
  if (msg.includes("competitor or reference site") || msg.includes("list at least one competitor")) {
    return 'الرجاء كتابة منافس واحد على الأقل أو موقع ملهم.';
  }
  if (msg.includes("liked websites & design references (min 10") || msg.includes("share 2-3 websites you like")) {
    return 'الرجاء إدخال مراجع أو مواقع تعجبك جماليتها (10 أحرف كحد أدنى).';
  }
  if (msg.includes("select a budget range")) {
    return 'الرجاء اختيار نطاق الميزانية التقديرية.';
  }
  if (msg.includes("select a target timeline")) {
    return 'الرجاء تحديد الجدول الزمني المستهدف للمشروع.';
  }
  if (msg.includes("specify who will provide the content")) {
    return 'الرجاء تحديد الطرف المسؤول عن توفير المحتوى.';
  }

  // General fallbacks
  if (msg.includes("at least")) {
    return 'الرجاء إدخال إجابة أطول وتفصيلية.';
  }

  return errorMsg;
};
