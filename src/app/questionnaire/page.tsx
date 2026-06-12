"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useChatSession } from "@/hooks/useChatSession";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Sparkles,
  Download,
  Check,
  Copy,
  ExternalLink,
  Kanban,
  FileText,
  User,
  Cpu,
  Palette,
  Megaphone,
  Loader2,
  CheckCircle2,
} from "lucide-react";

// Local translations for the chat onboarding flow
const tChat = {
  en: {
    title: "AI Project Discovery Manager",
    desc: "Describe your project in one sentence, and our AI Project Manager will interview you to map the scope.",
    startBtn: "Launch AI Onboarding",
    inputPlaceholder: "e.g., I want to build a perfume e-commerce store with payments...",
    inputPersona: "Target Freelancer Role:",
    chatPlaceholder: "Type your response here...",
    send: "Send",
    generating: "Compiling requirements and writing technical specifications...",
    successTitle: "Interactive Spec Ecosystem Generated",
    successDesc: "Onboarding complete! We have generated custom briefs and files for your developer, designer, and marketer.",
    backHome: "Back to Home",
    startNew: "New Brief",
    questionProgress: (curr: number, max: number) => `Onboarding Discovery • Question ${curr} of ${max}`,
    personaLabels: {
      DEVELOPER: "Developer (Technical Spec)",
      DESIGNER: "Designer (Visual Style)",
      MARKETER: "Marketer (Scope of Work)",
      AGENCY: "Agency (Milestones & Budget)",
    },
    exportOptions: "One-Click Exports",
    notionExport: "Export to Notion",
    trelloExport: "Export to Trello",
    pdfExport: "Download White-Label PDF",
    tabs: {
      dev: "Developer Spec",
      design: "Design Direction",
      marketing: "Marketing SOW",
    },
    copyCode: "Copy Prompt",
    copied: "Copied!",
  },
  ar: {
    title: "مدير اكتشاف المشاريع الذكي",
    desc: "صف مشروعك في جملة واحدة، وسيقوم مدير المشروع بالذكاء الاصطناعي بمقابلتك لتحديد المتطلبات بدقة.",
    startBtn: "ابدأ المقابلة الذكية",
    inputPlaceholder: "مثال: أريد بناء متجر عطور إلكتروني مع الدفع الإلكتروني...",
    inputPersona: "تخصص المستقل المستهدف:",
    chatPlaceholder: "اكتب إجابتك هنا...",
    send: "إرسال",
    generating: "جاري تجميع المتطلبات وكتابة المواصفات التقنية...",
    successTitle: "تم توليد متطلبات المشروع المتكاملة",
    successDesc: "اكتملت المقابلة! قمنا بتوليد مواجز ومستندات مخصصة للمطور والمصمم والمسوق.",
    backHome: "العودة للرئيسية",
    startNew: "موجز جديد",
    questionProgress: (curr: number, max: number) => `اكتشاف المتطلبات • سؤال ${curr} من ${max}`,
    personaLabels: {
      DEVELOPER: "مطور (مواصفات تقنية)",
      DESIGNER: "مصمم (هوية بصرية)",
      MARKETER: "مسوق (نطاق العمل)",
      AGENCY: "وكالة (مراحل وميزانية)",
    },
    exportOptions: "التصدير بنقرة واحدة",
    notionExport: "تصدير إلى Notion",
    trelloExport: "تصدير إلى Trello",
    pdfExport: "تحميل ملف PDF المعتمد",
    tabs: {
      dev: "مواصفات المطور",
      design: "توجه التصميم",
      marketing: "نطاق عمل المسوق",
    },
    copyCode: "نسخ الموجه",
    copied: "تم النسخ!",
  },
};

function MarkdownRenderer({ content, language }: { content: string; language: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    // Handle code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${idx}`} className="bg-[#0f172a] text-[#e2e8f0] font-mono text-[11px] md:text-[12px] p-5 rounded-2xl my-4 overflow-x-auto border border-neutral-800 shadow-inner select-text">
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`empty-${idx}`} className="h-3" />);
      return;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${idx}`} className="text-xl md:text-2xl font-extrabold text-neutral-900 mt-8 mb-4 border-b border-neutral-100 pb-3 tracking-tight">
          {trimmed.replace("# ", "")}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${idx}`} className="text-lg md:text-xl font-bold text-neutral-800 mt-6 mb-3 tracking-tight">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${idx}`} className="text-md md:text-lg font-bold text-neutral-800 mt-5 mb-2 tracking-tight">
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    // Lists
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      const text = trimmed.replace(/^[-*•]\s+/, "");
      // Bold inline parsing
      const parts = text.split(/\*\*([^*]+)\*\*/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-semibold text-neutral-900">{part}</strong>;
        }
        return part;
      });
      elements.push(
        <ul key={`ul-${idx}`} className="list-disc pl-5 rtl:pl-0 rtl:pr-5 my-1.5 text-neutral-700">
          <li className="pl-1 rtl:pr-1 text-[13px] leading-relaxed">{formattedParts}</li>
        </ul>
      );
    }
    // Table parser (simple)
    else if (trimmed.startsWith("|")) {
      if (trimmed.includes("---") || trimmed.includes("- -")) return;
      const cells = trimmed.split("|").map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);

      elements.push(
        <div key={`table-row-${idx}`} className="grid grid-cols-3 gap-4 border-b border-neutral-100 py-3 text-[12px] bg-neutral-50/50 px-3 font-mono rounded-lg my-1">
          {cells.map((cell, cidx) => (
            <div key={`cell-${cidx}`} className="truncate text-neutral-700 font-medium">{cell}</div>
          ))}
        </div>
      );
    }
    // Regular paragraph
    else {
      const parts = trimmed.split(/\*\*([^*]+)\*\*/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-semibold text-neutral-900">{part}</strong>;
        }
        return part;
      });

      elements.push(
        <p key={`p-${idx}`} className="my-3 text-neutral-600 leading-relaxed text-[13.5px]">
          {formattedParts}
        </p>
      );
    }
  });

  return <div className="space-y-1 select-text selection:bg-neutral-900 selection:text-white">{elements}</div>;
}

export default function QuestionnairePage() {
  const { language } = useLanguage();
  const t = tChat[language];

  // React state machine variables
  const { state, initSession, sendMessage } = useChatSession(6);
  const [initInput, setInitInput] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("Developer");
  const [inputValue, setInputValue] = useState("");

  // Tabs and loading deliverables
  const [activeTab, setActiveTab] = useState<"dev" | "design" | "marketing">("dev");
  const [deliverablesData, setDeliverablesData] = useState<any>(null);
  const [isLoadingSpecs, setIsLoadingSpecs] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Modals state
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [notionToken, setNotionToken] = useState("");
  const [notionPageId, setNotionPageId] = useState("");
  const [isExportingNotion, setIsExportingNotion] = useState(false);
  const [notionLink, setNotionLink] = useState("");

  const [showTrelloModal, setShowTrelloModal] = useState(false);
  const [trelloKey, setTrelloKey] = useState("");
  const [trelloToken, setTrelloToken] = useState("");
  const [trelloListId, setTrelloListId] = useState("");
  const [isExportingTrello, setIsExportingTrello] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  // Load deliverables when session completes
  useEffect(() => {
    if (state.status === "completed" && state.briefResult?.projectId && !deliverablesData) {
      loadDeliverables(state.briefResult.projectId);
    }
  }, [state.status, state.briefResult]);

  const loadDeliverables = async (projectId: string) => {
    setIsLoadingSpecs(true);
    try {
      const res = await fetch("/api/projects/deliverables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (res.ok) {
        const data = await res.json();
        setDeliverablesData(data);
      }
    } catch (err) {
      console.error("Error loading deliverables:", err);
    } finally {
      setIsLoadingSpecs(false);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initInput.trim()) return;
    initSession(initInput, selectedPersona);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleCopyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadPDF = async () => {
    if (!state.briefResult?.projectId) return;
    try {
      const res = await fetch("/api/exports/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: state.briefResult.projectId }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${state.briefResult.projectName || "project"}_brief.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error("PDF download error:", err);
    }
  };

  const handleNotionExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notionToken || !notionPageId || !state.briefResult?.projectId) return;
    setIsExportingNotion(true);
    try {
      const res = await fetch("/api/exports/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: state.briefResult.projectId,
          notionToken,
          parentPageId: notionPageId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotionLink(data.url);
        alert(language === "ar" ? "تم التصدير لـ Notion بنجاح!" : "Exported to Notion successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingNotion(false);
    }
  };

  const handleTrelloExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trelloKey || !trelloToken || !trelloListId || !state.briefResult?.projectId) return;
    setIsExportingTrello(true);
    try {
      // Mock cards representing milestones
      const cards = [
        { title: "Design Sprint: Visual Identity & Wireframes", description: "Design Figma wireframes, select typography, and define the palette." },
        { title: "Database & Backend Scaffolding", description: "Implement PostgreSQL tables, indexes, and database security keys." },
        { title: "Feature Development (Phase 1)", description: "Scaffold authentication, e-commerce integrations, and content feeds." },
        { title: "Integrations & Final Audit", description: "Connect APIs, build white-label export routes, and perform QA test cycles." }
      ];

      const res = await fetch("/api/exports/trello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: trelloKey,
          token: trelloToken,
          listId: trelloListId,
          cards,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(language === "ar" ? "تم إنشاء لوحات المهام في Trello!" : "Milestone tasks successfully created on Trello!");
        setShowTrelloModal(false);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingTrello(false);
    }
  };

  // Helper parser: formats raw spec types into their respective tab
  const getDeliverableByType = (type: "SRS" | "STYLE_GUIDE" | "SOW") => {
    if (!deliverablesData?.deliverables) return "";
    const deliverable = deliverablesData.deliverables.find((d: any) => d.type === type);
    return deliverable ? deliverable.markdown_content : "";
  };

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <div className={`w-full mx-auto px-4 py-8 animate-fade-in-up transition-all duration-300 ${state.status === "completed" ? "max-w-[1400px]" : "max-w-4xl"
        }`}>

        {/* HEADER BAR */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <div className="flex items-center gap-1.5 text-neutral-500 font-semibold text-[13px]">
            <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
            <span>{t.title}</span>
          </div>
        </div>

        {/* ────────────────── PHASE 1: INITIAL INPUT ────────────────── */}
        {state.status === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white rounded-3xl p-10 border border-black/15 shadow-[0_0_35px_rgba(0,0,0,0.06)] text-center max-w-2xl mx-auto relative overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-b from-indigo-500/10 to-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-neutral-900/20">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 tracking-tight mb-4">
                {language === "ar" ? "ابدأ صياغة مشروعك بذكاء" : "Intelligent Brief Generator"}
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
                {t.desc}
              </p>

              <form onSubmit={handleStart} className="space-y-6 text-start">
                <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                  <label className="block text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    {t.inputPersona}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Developer", "Designer", "Marketer", "Agency"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedPersona(role)}
                        className={`px-4 py-3 rounded-xl border text-[13px] font-bold transition-all duration-300 cursor-pointer text-center ${selectedPersona === role
                          ? "border-transparent bg-neutral-900 text-white shadow-lg shadow-neutral-900/20"
                          : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                          }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                  <label className="block text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    {language === "ar" ? "فكرة المشروع في جملة" : "Project Idea in One Line"}
                  </label>
                  <input
                    type="text"
                    value={initInput}
                    onChange={(e) => setInitInput(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="w-full px-5 py-4 rounded-xl border-2 border-neutral-100 focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 text-[15px] bg-[#fdfdfc] transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:from-black hover:to-neutral-900 rounded-2xl font-bold text-[15px] transition-all shadow-xl shadow-neutral-900/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {t.startBtn}
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ────────────────── PHASE 2: CONVERSATIONAL CHAT ────────────────── */}
        {(state.status === "initializing" || state.status === "chatting") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col h-[520px] max-w-2xl mx-auto"
          >
            {/* Top session status info */}
            <div className="px-6 py-4 bg-[#fcfcfb] border-b border-neutral-100/80 flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                {language === "ar"
                  ? `${selectedPersona === "Developer" ? "مطوّر" : selectedPersona === "Designer" ? "مصمم" : selectedPersona === "Marketer" ? "مسوّق" : "وكالة"} • ${t.questionProgress(state.questionCount, state.maxQuestions)}`
                  : `${selectedPersona} Onboarding • ${t.questionProgress(state.questionCount, state.maxQuestions)}`
                }
              </span>
              <div className="flex gap-1.5 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-neutral-400 font-medium">{language === "ar" ? "الذكاء الاصطناعي نشط" : "AI Active"}</span>
              </div>
            </div>

            {/* Messages scroll grid */}
            <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#fdfdfc] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden">
              {state.status === "initializing" && (
                <div className="flex flex-col justify-center items-center h-full gap-10">

                  {/* Icon cluster */}
                  <div className="relative flex items-center justify-center">
                    {/* Soft ambient glow */}
                    <div className="absolute w-28 h-28 bg-indigo-400/10 blur-3xl rounded-full" />
                    {/* Outer spinning ring */}
                    <div className="absolute w-[72px] h-[72px] rounded-[1.4rem] border border-indigo-200/70 animate-[spin_8s_linear_infinite]" />
                    {/* Inner spinning arc */}
                    <div className="absolute w-[72px] h-[72px] rounded-[1.4rem] border-[1.5px] border-transparent border-t-indigo-400 animate-[spin_2.5s_ease-in-out_infinite]" />
                    {/* Icon box */}
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03),0_0_0_1px_rgba(99,102,241,0.15)] animate-[pulse_3s_ease-in-out_infinite] relative z-10">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Text + dots */}
                  <div className="space-y-3 text-center max-w-[260px] mx-auto">
                    <h3 className="text-[15px] font-bold text-neutral-800 tracking-tight leading-snug">
                      {language === "ar" ? "جاري تجهيز مدير المشاريع الذكي" : "Booting up AI Project Manager"}
                    </h3>
                    <p className="text-[13px] text-neutral-400 leading-relaxed">
                      {language === "ar" ? "يتم الآن تحليل الفكرة وإعداد الأسئلة..." : "Analyzing idea and preparing questionnaire..."}
                    </p>
                    {/* Staggered loading dots */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>

                </div>
              )}

              {state.status === "chatting" &&
                state.messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3.5 ${msg.role === "user" ? "max-w-[80%] flex-row-reverse" : "max-w-[90%] flex-row"}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.06)] ${msg.role === "user"
                        ? "bg-white border border-black/15 text-neutral-600 mt-1"
                        : "bg-white border border-black/15 text-purple-600 mt-1.5"
                        }`}>
                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                      </div>
                      {/* Bubble */}
                      <div
                        className={`text-[14.5px] leading-relaxed break-words whitespace-pre-wrap ${msg.role === "user"
                          ? "px-5 py-3.5 bg-neutral-900 text-white font-medium rounded-2xl rounded-tl-sm rtl:rounded-tr-sm rtl:rounded-tl-2xl shadow-[0_0_25px_rgba(0,0,0,0.1)] mt-1"
                          : "px-6 py-5 bg-white border border-black/15 text-neutral-700 rounded-3xl rounded-tr-sm rtl:rounded-tl-sm rtl:rounded-tr-3xl shadow-[0_0_30px_rgba(0,0,0,0.05)]"
                          }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

              {/* Typing Indicator */}
              {state.isWaitingForResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full justify-start"
                >
                  <div className="flex gap-3.5 max-w-[90%] flex-row">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.06)] bg-white border border-black/15 text-purple-600 mt-1.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="px-6 py-5 bg-white border border-black/15 text-neutral-700 rounded-3xl rounded-tr-sm rtl:rounded-tl-sm rtl:rounded-tr-3xl shadow-[0_0_30px_rgba(0,0,0,0.05)] flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-neutral-300 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-neutral-300 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
                      <span className="h-2 w-2 rounded-full bg-neutral-300 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* User input box */}
            {state.status === "chatting" && (
              <form onSubmit={handleSend} className="p-5 border-t border-black/15 bg-white">
                <div className="relative flex items-center bg-white border border-black/15 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.06)] focus-within:ring-4 focus-within:ring-neutral-100 focus-within:border-black/30 transition-all p-1.5">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={state.isWaitingForResponse ? (language === "ar" ? "جاري الكتابة..." : "AI is typing...") : t.chatPlaceholder}
                    className="flex-grow px-4 py-3 focus:outline-none text-[14px] bg-transparent text-neutral-800 placeholder-neutral-400 disabled:opacity-50"
                    required
                    disabled={state.isWaitingForResponse}
                  />
                  <button
                    type="submit"
                    disabled={state.isWaitingForResponse}
                    className="flex-shrink-0 h-10 w-10 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center rtl:ml-1 ltr:mr-1 shadow-md shadow-neutral-900/10"
                  >
                    <Send className="h-4 w-4 rtl:-scale-x-100" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* ────────────────── PHASE 3: COMPILATION & GENERATION LOADING ────────────────── */}
        {state.status === "analyzing" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
              {/* Header strip */}
              <div className="px-6 py-4 bg-[#fcfcfb] border-b border-neutral-100/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                  {language === "ar"
                    ? `${selectedPersona === "Developer" ? "مطوّر" : selectedPersona === "Designer" ? "مصمم" : selectedPersona === "Marketer" ? "مسوّق" : "وكالة"} • اكتشاف المتطلبات • تحليل النطاق`
                    : `${selectedPersona} Onboarding • Requirements Discovery • Analyzing Scope`
                  }
                </span>
                <div className="flex gap-1.5 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-[11px] text-neutral-400 font-medium">{language === "ar" ? "الذكاء الاصطناعي نشط" : "AI Active"}</span>
                </div>
              </div>

              {/* Center content */}
              <div className="flex flex-col items-center justify-center py-20 px-8 gap-10">

                {/* Icon cluster */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-32 h-32 bg-indigo-400/8 blur-3xl rounded-full" />
                  <div className="absolute w-[76px] h-[76px] rounded-[1.5rem] border border-indigo-200/60 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-[76px] h-[76px] rounded-[1.5rem] border-[1.5px] border-transparent border-t-indigo-400 animate-[spin_2.8s_ease-in-out_infinite]" />
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03),0_0_0_1px_rgba(99,102,241,0.15)] animate-[pulse_3s_ease-in-out_infinite] relative z-10">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Text + dots */}
                <div className="space-y-3 text-center max-w-sm">
                  <h3 className="text-[16px] font-bold text-neutral-800 tracking-tight">
                    {language === "ar" ? "تحليل النطاق وإعداد المواصفات" : "Analyzing Project Parameters"}
                  </h3>
                  <p className="text-[13.5px] text-neutral-400 leading-relaxed">
                    {t.generating}
                  </p>
                  {/* Staggered dots */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ────────────────── PHASE 4: FINAL DELIVERABLES SPEC ECOSYSTEM ────────────────── */}
        {state.status === "completed" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="space-y-6"
          >
            {/* Main Success Header Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
              className="bg-white rounded-3xl p-8 border border-black/15 shadow-[0_0_35px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
            >
              {/* Refined soft checkmark icon */}
              <div className="h-12 w-12 rounded-full border border-emerald-500/20 bg-emerald-50/50 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Check className="h-5 w-5 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">{t.successTitle}</h2>
              <p className="text-[14px] text-neutral-500 max-w-xl mx-auto mb-6">{t.successDesc}</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 bg-[#1a1a1a] hover:bg-black text-white rounded-xl text-[13px] font-bold transition-colors duration-150 shadow-sm cursor-pointer"
                >
                  {t.backHome}
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-xl text-[13px] font-bold text-neutral-600 transition-colors duration-150 shadow-sm cursor-pointer"
                >
                  {t.startNew}
                </button>
              </div>
            </motion.div>

            {/* Grid Layout: Left Sidebar (25% / col 1) and Right Code Preview Window (75% / col 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

              {/* Sidebar (Left 1 col, 25%) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Persona Switcher Card */}
                <div className="bg-white rounded-3xl p-6 border border-black/15 shadow-[0_0_35px_rgba(0,0,0,0.06)] space-y-3">
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    {language === "ar" ? "المستندات المولدة" : "Generated Speclists"}
                  </span>

                  <div className="flex flex-col gap-2 relative">
                    {(["dev", "design", "marketing"] as const).map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative w-full text-start px-4 py-3.5 rounded-xl text-[13px] font-bold transition-colors duration-150 flex items-center gap-2.5 cursor-pointer select-none overflow-hidden ${isActive
                            ? "text-white"
                            : "text-neutral-600 bg-[#f9f9f7] hover:bg-neutral-100 border border-neutral-200/50"
                            }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTabBg"
                              className="absolute inset-0 bg-[#222] rounded-xl"
                              style={{ zIndex: 0 }}
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-2.5 w-full">
                            {tab === "dev" && <Cpu className="h-4 w-4" />}
                            {tab === "design" && <Palette className="h-4 w-4" />}
                            {tab === "marketing" && <Megaphone className="h-4 w-4" />}
                            <span>
                              {tab === "dev" ? t.tabs.dev : tab === "design" ? t.tabs.design : t.tabs.marketing}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Export Card */}
                <div className="bg-white rounded-3xl p-6 border border-black/15 shadow-[0_0_35px_rgba(0,0,0,0.06)] space-y-4">
                  <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    {t.exportOptions}
                  </span>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => setShowNotionModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 rounded-xl text-[13px] font-bold transition-colors duration-150 cursor-pointer"
                    >
                      <FileText className="h-4 w-4 text-neutral-500 shrink-0" />
                      <span>{t.notionExport}</span>
                    </button>

                    <button
                      onClick={() => setShowTrelloModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 rounded-xl text-[13px] font-bold transition-colors duration-150 cursor-pointer"
                    >
                      <Kanban className="h-4 w-4 text-neutral-500 shrink-0" />
                      <span>{t.trelloExport}</span>
                    </button>

                    <button
                      onClick={downloadPDF}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 rounded-xl text-[13px] font-bold transition-colors duration-150 cursor-pointer"
                    >
                      <Download className="h-4 w-4 text-neutral-500 shrink-0" />
                      <span>{t.pdfExport}</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Spec Window (Right 3 cols, 75%) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="lg:col-span-3 bg-white rounded-3xl border border-black/15 shadow-[0_0_35px_rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* VS Code styled header */}
                <div className="px-6 py-4 bg-[#faf9f6] border-b border-neutral-100 flex items-center justify-between rounded-t-3xl">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono text-neutral-400 ml-4">
                      {activeTab === "dev" ? "developer_specification.md" : activeTab === "design" ? "design_guidelines.md" : "marketing_scope.md"}
                    </span>
                  </div>

                  {/* Copy Button with micro-interaction */}
                  <div className="relative group">
                    <button
                      onClick={() => {
                        const text = activeTab === "dev" ? getDeliverableByType("SRS") : activeTab === "design" ? getDeliverableByType("STYLE_GUIDE") : getDeliverableByType("SOW");
                        handleCopyPrompt(text);
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold border transition-colors duration-150 cursor-pointer select-none shadow-sm ${copiedPrompt
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 animate-success-pop"
                        : "bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900"
                        }`}
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[2.5] text-emerald-600" />
                          <span className="font-sans text-[11px] font-bold">{language === "ar" ? "تم النسخ!" : "Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span className="font-sans text-[11px] font-bold">{language === "ar" ? "نسخ الموجه" : "Copy Prompt"}</span>
                        </>
                      )}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-950 text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md z-10">
                      {language === "ar" ? "نسخ المحتوى إلى الحافظة" : "Copy markdown content"}
                    </div>
                  </div>
                </div>

                {/* Specification Content Canvas */}
                <div className="p-8 md:p-10 select-text bg-white">
                  {isLoadingSpecs ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="h-8 w-8 text-neutral-800 animate-spin" />
                      <span className="text-[13px] text-neutral-400 font-medium">
                        {language === "ar" ? "جاري جلب المستندات..." : "Loading specifications..."}
                      </span>
                    </div>
                  ) : (
                    <MarkdownRenderer
                      content={
                        activeTab === "dev"
                          ? getDeliverableByType("SRS")
                          : activeTab === "design"
                            ? getDeliverableByType("STYLE_GUIDE")
                            : getDeliverableByType("SOW")
                      }
                      language={language}
                    />
                  )}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

        {/* ────────────────── ERROR STATE ────────────────── */}
        {state.status === "error" && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="h-12 w-12 rounded-full bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 tracking-tight mb-2">
              {language === "ar" ? "حدث خطأ" : "An error occurred"}
            </h3>
            <p className="text-[13px] text-red-500 leading-relaxed px-6 mb-6">
              {state.error || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-[13px] font-medium transition-all cursor-pointer"
            >
              {language === "ar" ? "المحاولة مرة أخرى" : "Try Again"}
            </button>
          </div>
        )}

      </div>

      {/* ────────────────── NOTION EXPORT MODAL ────────────────── */}
      {showNotionModal && (
        <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 max-w-sm w-full space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">{t.notionExport}</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {language === "ar" ? "أدخل بيانات الربط الخاصة بك لتصدير المستند" : "Enter your credentials to export the document"}
              </p>
            </div>

            <form onSubmit={handleNotionExport} className="space-y-4 text-start">
              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-neutral-600">
                  {language === "ar" ? "رمز الربط (Integration Token)" : "Notion Integration Token"}
                </label>
                <input
                  dir="ltr"
                  type="password"
                  value={notionToken}
                  onChange={(e) => setNotionToken(e.target.value)}
                  placeholder="secret_..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-neutral-600">
                  {language === "ar" ? "معرف الصفحة (Page ID)" : "Parent Page ID"}
                </label>
                <input
                  dir="ltr"
                  type="text"
                  value={notionPageId}
                  onChange={(e) => setNotionPageId(e.target.value)}
                  placeholder="e.g., a8c63b..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  required
                />
              </div>

              {notionLink && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 bg-emerald-50 rounded-xl text-[13px] border border-emerald-100 flex items-center justify-between">
                  <span className="text-emerald-800 font-medium">{language === "ar" ? "تم إنشاء الصفحة بنجاح!" : "Page generated successfully!"}</span>
                  <a href={notionLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold">
                    {language === "ar" ? "عرض" : "View"} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNotionModal(false)}
                  className="flex-1 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-[13px] font-bold text-neutral-600 transition-all cursor-pointer"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isExportingNotion}
                  className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isExportingNotion && <Loader2 className="h-4 w-4 animate-spin" />}
                  {language === "ar" ? "تصدير الآن" : "Export Now"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ────────────────── TRELLO EXPORT MODAL ────────────────── */}
      {showTrelloModal && (
        <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 max-w-sm w-full space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-4">
                <Kanban className="h-7 w-7 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">{t.trelloExport}</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {language === "ar" ? "أدخل بيانات الربط الخاصة بك لإنشاء بطاقات المهام" : "Enter your credentials to create task cards"}
              </p>
            </div>

            <form onSubmit={handleTrelloExport} className="space-y-4 text-start">
              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-neutral-600">
                  {language === "ar" ? "مفتاح مطور Trello (API Key)" : "Trello Developer API Key"}
                </label>
                <input
                  dir="ltr"
                  type="text"
                  value={trelloKey}
                  onChange={(e) => setTrelloKey(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-neutral-600">
                  {language === "ar" ? "رمز العضو (Member Token)" : "Trello Member Token"}
                </label>
                <input
                  dir="ltr"
                  type="password"
                  value={trelloToken}
                  onChange={(e) => setTrelloToken(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-neutral-600">
                  {language === "ar" ? "معرف القائمة (List ID)" : "Target List ID"}
                </label>
                <input
                  dir="ltr"
                  type="text"
                  value={trelloListId}
                  onChange={(e) => setTrelloListId(e.target.value)}
                  placeholder="e.g., 60f25a..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTrelloModal(false)}
                  className="flex-1 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-[13px] font-bold text-neutral-600 transition-all cursor-pointer"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isExportingTrello}
                  className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isExportingTrello && <Loader2 className="h-4 w-4 animate-spin" />}
                  {language === "ar" ? "إنشاء البطاقات" : "Create Cards"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
