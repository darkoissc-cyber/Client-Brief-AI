import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* ──────────────────────────── Navbar ──────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#fafaf8]/80 backdrop-blur-xl border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-neutral-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CB</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-neutral-900">
              Client Brief AI
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Preview
            </a>
            <a
              href="#"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* CTA */}
          <Link
            href="/questionnaire"
            className="bg-neutral-900 text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Start Project Request
          </Link>
        </div>
      </header>

      {/* ──────────────────────────── Hero ──────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden isolate">
        {/* Ambient Warm Gradient Orbs */}
        <div className="absolute top-[-10%] left-[10%] -z-10 w-[550px] h-[550px] rounded-full bg-orange-300/30 blur-[80px] pointer-events-none animate-orb-1" />
        <div className="absolute top-[15%] right-[5%] -z-10 w-[650px] h-[650px] rounded-full bg-purple-300/30 blur-[90px] pointer-events-none animate-orb-2" />
        <div className="absolute bottom-[-15%] left-[20%] -z-10 w-[600px] h-[600px] rounded-full bg-sky-300/25 blur-[90px] pointer-events-none animate-orb-3" />

        <div className="max-w-[900px] mx-auto text-center relative animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/60 rounded-full px-3.5 py-1 text-[12px] font-medium text-neutral-600 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
            Trusted by Freelancers & Agencies
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[96px] font-semibold leading-[1.05] tracking-tight text-neutral-900">
            Turn Client Requests Into
            <br />
            Structured Project Briefs
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mx-auto">
            Collect requirements, organize projects, and eliminate endless
            back-and-forth communication.
          </p>

          <div className="mt-10">
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:gap-3 active:scale-[0.98]"
            >
              Start Project Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Visual Mockup ──────────────────────── */}
      <section id="preview" className="pb-28 md:pb-40 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Client Questionnaire */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/50 shadow-premium transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-float-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Client Questionnaire
                </span>
              </div>
              <div className="space-y-3.5">
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1">
                    Project Name
                  </div>
                  <div className="bg-neutral-50 rounded-lg px-3.5 py-2.5 text-[13px] text-neutral-700 border border-neutral-100">
                    Acme E-commerce
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1">
                    Platform
                  </div>
                  <div className="bg-neutral-50 rounded-lg px-3.5 py-2.5 text-[13px] text-neutral-700 border border-neutral-100">
                    Next.js / React
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1">
                    Budget
                  </div>
                  <div className="bg-neutral-50 rounded-lg px-3.5 py-2.5 text-[13px] text-neutral-700 border border-neutral-100">
                    $15,000 – $30,000
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1">
                    Features
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Authentication",
                      "Payments",
                      "CMS",
                    ].map((f) => (
                      <span
                        key={f}
                        className="text-[11px] bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Project Brief Output */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/50 shadow-premium transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-float-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Project Brief
                </span>
              </div>
              <div className="space-y-3 font-mono text-[12px] leading-relaxed text-neutral-600">
                <div className="text-neutral-900 font-semibold font-sans text-[13px]">
                  # Acme E-commerce
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-neutral-400">Client:</span> Acme Corp
                </div>
                <div>
                  <span className="text-neutral-400">Platform:</span> Next.js
                </div>
                <div>
                  <span className="text-neutral-400">Budget:</span> $15k – $30k
                </div>
                <div>
                  <span className="text-neutral-400">Timeline:</span> 1-3 months
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-neutral-400">Features:</span>
                  <div className="mt-1 space-y-0.5 text-neutral-500">
                    <div>• User Authentication</div>
                    <div>• Stripe Payments</div>
                    <div>• Content Management</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: AI Prompt Output */}
            <div className="bg-neutral-900 rounded-2xl p-6 shadow-[0_12px_38px_rgba(0,0,0,0.12)] border border-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-float-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  AI Prompt Output
                </span>
              </div>
              <div className="font-mono text-[12px] leading-relaxed text-neutral-400 space-y-2.5">
                <p className="text-neutral-300">
                  Build an e-commerce storefront using Next.js 15 with the
                  following specifications:
                </p>
                <p>
                  <span className="text-neutral-500">Framework:</span>{" "}
                  <span className="text-emerald-400">Next.js + TypeScript</span>
                </p>
                <p>
                  <span className="text-neutral-500">Auth:</span>{" "}
                  <span className="text-emerald-400">Supabase Auth</span>
                </p>
                <p>
                  <span className="text-neutral-500">Payments:</span>{" "}
                  <span className="text-emerald-400">Stripe Checkout</span>
                </p>
                <p>
                  <span className="text-neutral-500">Styling:</span>{" "}
                  <span className="text-emerald-400">Tailwind CSS</span>
                </p>
                <p className="text-neutral-500 border-t border-neutral-800 pt-2.5 mt-3">
                  Ensure mobile-first, dark-mode support, and SEO meta tags on
                  every route...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Features ──────────────────────── */}
      <section id="features" className="py-28 md:py-40 px-6 bg-[#fafaf8] border-y border-neutral-200/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              Everything you need to scope projects
            </h2>
            <p className="mt-4 text-neutral-500 text-lg max-w-lg mx-auto">
              Three simple steps from client request to development-ready
              specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-neutral-200/50 shadow-premium shadow-premium-hover rounded-2xl p-8 md:p-10 group">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Smart Requirement Collection
              </h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                Guide clients through a structured multi-step questionnaire.
                Every answer is validated in real-time so nothing gets missed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-neutral-200/50 shadow-premium shadow-premium-hover rounded-2xl p-8 md:p-10 group">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Automatic Project Briefs
              </h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                Client answers are instantly compiled into clean, structured
                Markdown briefs ready for contracts, handoffs, or proposals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-neutral-200/50 shadow-premium shadow-premium-hover rounded-2xl p-8 md:p-10 group">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                AI-Ready Development Prompts
              </h3>
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                Generate precise development prompts from project data. Feed
                them directly into AI coding assistants for faster execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────── Final CTA ────────────────────── */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
            Ready to streamline your workflow?
          </h2>
          <p className="mt-4 text-neutral-500 text-lg">
            Stop chasing clients for project details. Start collecting
            structured requirements today.
          </p>
          <div className="mt-10">
            <Link
              href="/questionnaire"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:gap-3 active:scale-[0.98]"
            >
              Start Project Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────── Footer ────────────────────── */}
      <footer className="border-t border-neutral-200/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-neutral-400">
            &copy; {new Date().getFullYear()} Client Brief AI
          </span>
          <div className="flex gap-6 text-[13px] text-neutral-400">
            <a
              href="#"
              className="hover:text-neutral-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-neutral-600 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
