"use client";

import {
  Brain,
  ClipboardList,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  FileText,
  BarChart3,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { getLocalePrefix } from "@/src/utils/locale";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const normalizedBase = `${getLocalePrefix(window.location.pathname)}${basePath}`;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

const heroStats = [
  { icon: Target, value: "10 min", label: "Quick Assessment" },
  { icon: BarChart3, value: "AI", label: "Powered Analysis" },
  { icon: FileText, value: "PDF", label: "Detailed Report" },
  { icon: Award, value: "100%", label: "Personalized" },
];

const painPoints = [
  "Feeling stuck in the wrong role",
  "Uncertainty about skill development",
  "Fear of choosing the wrong career",
  "Confusion about market demand",
  "Wasting time on ineffective certifications",
  "Struggling to align your passion with a practical career",
];

const timelineSteps = [
  {
    step: "1",
    icon: ClipboardList,
    title: "Complete Your Profile",
    desc: "Tell us about yourself.",
    bullets: [
      "Education background",
      "Current skills",
      "Work experience (if any)",
      "Career interests & goals",
    ],
    note: "This builds the foundation for your career aptitude test.",
    cta: "Start Your Career Test Now",
  },
  {
    step: "2",
    icon: Brain,
    title: "AI Career & Skills Analysis",
    desc: "Our engine performs a comprehensive:",
    bullets: [
      "skills assessment test",
      "Great skills assessment for jobs",
      "Strength & capability evaluation",
      "Personality & preference mapping",
      "Market-aligned role matching",
    ],
  },
  {
    step: "3",
    icon: Target,
    title: "Career Aptitude & Interest Mapping",
    desc: "Unlike generic tools, our system conducts:",
    bullets: [
      "Intelligent career aptitude test",
      "Deep career interest assessment",
      "personality career test",
      "Identifies suitable industries",
      "Suggests ideal career paths",
      "Aligns skills with hiring demand",
    ],
  },
  {
    step: "4",
    icon: FileText,
    title: "Skill Gap Analysis Report",
    desc: "Our skill gap analysis tool reveals:",
    bullets: [
      "Which skills are holding you back",
      "Missing competencies",
      "Growth opportunities",
      "Highlights critical gaps",
      "Recommends certifications & training",
      "Suggests practical improvement paths",
    ],
    cta: "Get Your Skill Gap Report",
  },
  {
    step: "5",
    icon: TrendingUp,
    title: "Personalized Career Action Plan",
    desc: "Receive a structured roadmap.",
    bullets: [
      "Career growth strategy",
      "Resume improvement guidance",
      "Recommended job roles",
      "Learning & development plan",
    ],
    note: "Built for smarter career planning assessment.",
  },
];

const beforeAfter = [
  {
    before: "Confused about career direction",
    after: "Clear roadmap + skill improvement plan",
  },
  {
    before: "Guessing which skills to learn",
    after: "Precise skill-gap insights",
  },
  {
    before: "Uncertain career decisions",
    after: "Data-backed career clarity",
  },
];

const betterReasons = [
  "Powered by real-time job market data",
  "Combines aptitude + skill-gap analysis",
  "Not just personality-based",
  "Designed for real hiring environments",
  "Understand true career compatibility",
  "Know exactly what to improve",
  "Make confident career decisions",
  "Get personalized career paths tailored to your profile",
  "Receive actionable next steps, not just insights",
];

const keyBenefits = [
  { title: "Eliminate Career Confusion", desc: "Clarity backed by AI insights." },
  { title: "Identify Strengths & Weaknesses", desc: "Deep strengths and weaknesses analysis." },
  { title: "Detect Skill Gaps Instantly", desc: "Precision-driven skill gap analysis tool." },
  { title: "Avoid Wasted Learning Effort", desc: "Know what actually matters." },
  { title: "Improve Job Market Alignment", desc: "Market-driven career mapping." },
  { title: "Make Smarter Career Decisions", desc: "" },
];

const keyFeatures = [
  "AI-Powered Career Aptitude Test",
  "Advanced Skill Gap Analysis Tool",
  "Personalized Career Path Assessment",
  "Real-Time Skills Assessment for Jobs",
  "Built-In Job Compatibility Test",
  "Learning & Certification Recommendations",
  "Downloadable Career Report",
  "Beginner-Friendly Interface",
  "Results in Under 10 Minutes",
];

const comparisonRows = [
  { feature: "Personalization", ai: "Dynamic AI-based", traditional: "Generic results" },
  { feature: "Skill Gap Analysis", ai: "Included", traditional: "Limited" },
  { feature: "Market Alignment", ai: "Real-time insights", traditional: "Static database" },
  { feature: "Career Suggestions", ai: "Multiple role matches", traditional: "Limited" },
  { feature: "Action Plan", ai: "Customized roadmap", traditional: "Basic output" },
  { feature: "Speed", ai: "Instant results", traditional: "Longer evaluation" },
];

const whoCanUse = [
  "Fresh graduates",
  "Entry-level professionals",
  "Mid-career professionals",
  "Career switchers",
  "Students choosing a specialization",
  "Professionals preparing for promotions",
  "International job seekers",
  "Professionals returning after a career break",
];

const finalCtaPills = [
  "Gain instant career clarity",
  "Detect missing skills",
  "Build smarter career strategies",
  "Make confident decisions",
];

const faqs = [
  {
    q: "What is an AI career assessment test?",
    a: "An AI career assessment uses intelligent algorithms to evaluate your skills, strengths, and career compatibility.",
  },
  {
    q: "How does a skill gap analysis tool work?",
    a: "A skill gap analysis tool compares your profile with job requirements to identify missing competencies.",
  },
  {
    q: "Is this career aptitude test accurate?",
    a: "Yes. Our career aptitude test uses advanced AI models.",
  },
  {
    q: "How long does the assessment take?",
    a: "Most users finish the career assessment test in under 10 minutes.",
  },
  {
    q: "Will I receive a career report?",
    a: "Yes. Get a structured, downloadable career analysis report.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Privacy & security are core priorities.",
  },
];

export default function AICareerAssessmentPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const startAssessment = () =>
    updateCtaUrl("/ai-career-assessment-skill-gap-analysis", "Start Assessment");

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <main className="mt-0">

        {/* ============ HERO — centered, stat bar below ============ */}
        <section className="relative bg-[#fff7f2] py-16 sm:py-20 overflow-hidden">
          <div className="absolute -top-24 -left-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-16 w-80 h-80 bg-[#ff6b33]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] text-white text-sm font-semibold shadow-md shadow-[#ff4c00]/20">
              <Brain className="w-4 h-4" />
              AI-Powered Career Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-6">
              AI Career Assessment Test{" "}
              <span className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] bg-clip-text text-transparent">
                for Skill Gap &amp; Career Path
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-4 leading-relaxed">
              Stop second-guessing your career decisions. Discover your ideal career path,
              strengths, and missing skills in under 10 minutes.
            </p>

            <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Our career assessment test, powered by advanced AI career assessment,
              analyzes your skills, experience, personality, and market demand to
              deliver a personalized career roadmap instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 mb-9">
              {[
                "Get accurate career recommendations",
                "Identify your professional strengths",
                "Detect critical skill gaps",
                "Make smarter career decisions",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white border border-[#ff4c00]/10 rounded-full px-3.5 py-2 text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ff4c00] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={startAssessment}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-[#ff4c00]/30 hover:shadow-xl hover:shadow-[#ff4c00]/40 transition-shadow"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Instant Results
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> No Complex Setup
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Secure &amp; Confidential
              </span>
            </div>
          </div>

          {/* Full-width stat bar */}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-2xl border border-slate-200 shadow-sm divide-x divide-y sm:divide-y-0 divide-slate-100 overflow-hidden">
              {heroStats.map((stat, i) => (
                <div key={i} className="p-5 text-center">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-3">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRUSTED STRIP — minimal inline row ============ */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Trusted by Growing Numbers of Professionals
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
              Join thousands using our intelligent:{" "}
              <span className="text-[#ff4c00]">AI career assessment</span>
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#ff4c00]" /> Used by professionals across industries
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#ff4c00]" /> Designed using real hiring data
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#ff4c00]" /> Built for modern career decision-making
              </span>
            </div>
          </div>
        </section>

        {/* ============ WHY OVERWHELMING — checklist + quote card ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900 leading-tight">
                  Why Career Decisions Often Feel Overwhelming
                </h2>
                <p className="text-base text-slate-600 mb-6">
                  Choosing the right career path isn&apos;t easy. Many professionals struggle with:
                </p>
                <div className="space-y-3">
                  {painPoints.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#fff7f2] border border-[#ff4c00]/10 rounded-xl px-4 py-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00] text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#ff4c00]/20 rounded-3xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900">
                  Feeling Stuck in Your Career Path?
                </h3>
                <div className="space-y-4">
                  {[
                    "Tired of guessing your next move?",
                    "Unsure if your skills match the job market?",
                    "Afraid of investing in the wrong career path?",
                  ].map((q, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-bold flex-shrink-0">
                        ?
                      </div>
                      <p className="text-base font-semibold text-slate-800">{q}</p>
                    </div>
                  ))}
                </div>
                <div className="my-6 border-t border-slate-100" />
                <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] rounded-xl p-4 text-center">
                  <p className="text-base font-semibold text-white">
                    Our intelligent career quiz eliminates this uncertainty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS — numbered rows, no center rail ============ */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Career Assessment Test Works</span>
              </h2>
              <p className="text-base text-slate-600">
                Finding career clarity should feel simple — and now it is.
              </p>
            </div>

            <div className="space-y-4">
              {timelineSteps.map((item) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row gap-5"
                  >
                    <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 flex-shrink-0 sm:w-20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center shadow-sm">
                        <StepIcon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ff4c00]">
                        Step {item.step}
                      </span>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-4">{item.desc}</p>

                      {item.bullets && (
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {item.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] flex-shrink-0" />
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.note && (
                        <p className="text-sm font-semibold text-[#ff4c00] bg-[#fff7f2] inline-block px-3 py-1 rounded-lg">
                          {item.note}
                        </p>
                      )}

                      {item.cta && (
                        <button
                          type="button"
                          onClick={() =>
                            updateCtaUrl("/ai-career-assessment-skill-gap-analysis", item.cta as string)
                          }
                          className="mt-3 text-sm font-semibold text-[#ff4c00] hover:text-[#e64400] flex items-center gap-1"
                        >
                          {item.cta}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ BEFORE / AFTER — two columns + center arrows ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Before vs After Using AI Career Assessment
            </h2>

            <div className="space-y-4">
              {beforeAfter.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-4"
                >
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Before
                    </span>
                    <p className="mt-1 text-sm sm:text-base text-slate-500">{item.before}</p>
                  </div>

                  <div className="flex items-center justify-center flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[#ff4c00] flex items-center justify-center rotate-90 sm:rotate-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 rounded-xl border border-[#ff4c00]/30 bg-[#fff7f2] p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ff4c00]">
                      After
                    </span>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-slate-900">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHY BETTER — numbered checklist ============ */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Why This AI Career Assessment Delivers Better Results
              </h2>
              <p className="text-base text-slate-600">
                Traditional tests give opinions. We deliver actionable intelligence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {betterReasons.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-3.5"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ KEY BENEFITS — bordered list cards ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Key Benefits at a Glance
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyBenefits.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border-t-4 border-t-[#ff4c00] border-x border-b border-slate-200 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#ff4c00] tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ KEY FEATURES — two-column list ============ */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Key Features of Our AI Career Assessment Tool
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div>
                  {keyFeatures.slice(0, 5).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-5 py-4 border-b last:border-b-0 border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff4c00] flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-700">{feature}</p>
                    </div>
                  ))}
                </div>
                <div>
                  {keyFeatures.slice(5).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-5 py-4 border-b last:border-b-0 border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff4c00] flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ COMPARISON — plan-style cards ============ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              AI Career Assessment vs Traditional Career Tests
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
                  Traditional Career Tests
                </p>
                <ul className="space-y-4">
                  {comparisonRows.map((row, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-500">{row.feature}</span>
                      <span className="font-medium text-slate-600 text-right">{row.traditional}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative rounded-2xl border-2 border-[#ff4c00] bg-white p-6 sm:p-7 shadow-md">
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Recommended
                </span>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff4c00] mb-5">
                  <CheckCircle2 className="w-4 h-4" />
                  AI Career Assessment
                </p>
                <ul className="space-y-4">
                  {comparisonRows.map((row, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-[#ff4c00]/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-700">{row.feature}</span>
                      <span className="font-semibold text-[#ff4c00] text-right">{row.ai}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-sm sm:text-base text-slate-600 mt-8">
              Modern decision-making requires smarter systems.
            </p>
          </div>
        </section>

        {/* ============ WHO CAN USE — chip cloud ============ */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-slate-900">
              Who Can Use This Career Assessment Test?
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {whoCanUse.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pl-2 pr-4 py-2 hover:border-[#ff4c00]/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center flex-shrink-0">
                    <Users className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm sm:text-base text-slate-600 mt-8">
              Ideal for anyone seeking structured:{" "}
              <span className="font-semibold text-[#ff4c00]">career evaluation test</span>
            </p>
          </div>
        </section>

        {/* ============ FINAL CTA — split panel, on-theme ============ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[28px] overflow-hidden grid md:grid-cols-2 shadow-xl border border-slate-200">
              <div className="bg-gradient-to-br from-[#ff4c00] to-[#e64400] p-8 sm:p-10 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  Discover Your Ideal Career Path with AI
                </h2>
                <p className="text-sm sm:text-base text-white/85 mb-8 leading-relaxed">
                  Stop guessing your future. Identify your strengths. Fix your skill gaps.
                  Move forward with confidence.
                </p>
                <button
                  type="button"
                  onClick={startAssessment}
                  className="self-start inline-flex items-center justify-center gap-2 bg-white text-[#ff4c00] px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:bg-[#fff3ec] transition-colors"
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#fff7f2] p-8 sm:p-10 flex flex-col justify-center gap-6">
                <div className="space-y-3">
                  {finalCtaPills.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white border border-[#ff4c00]/15 rounded-xl px-4 py-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-5 text-xs text-slate-500 pt-2 border-t border-[#ff4c00]/15">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Instant results
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> No complex setup
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Secure &amp; confidential
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Clean Accordion (same as site-wide FAQ style) */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Frequently Asked Questions
              </h2>
              <p>Everything you need to know about our AI career assessment</p>
            </div>

            <div className="ff-faq-list">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""
                    }`}
                >
                  <button
                    className="ff-faq-question"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className="ff-faq-question-text">
                      {item.q}
                    </span>
                    <span className="ff-faq-icon">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="ff-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
