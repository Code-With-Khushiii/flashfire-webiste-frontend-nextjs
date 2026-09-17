"use client";

import { Brain, ClipboardList, TrendingUp, Target, Users, CheckCircle2, ArrowRight, FileText, BarChart3, Award, Clock, Shield } from "lucide-react";
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

export default function AICareerAssessmentPage() {
  const ctaLabel = "Start Assessment";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <main className="mt-0">

        {/* Hero Section - Layered Gradient Design */}
        <section className="relative bg-white py-14 sm:py-20 md:py-24 overflow-hidden">
          {/* Decorative gradient blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 -right-16 w-80 h-80 bg-[#ff6b33]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] text-white text-sm font-semibold shadow-md shadow-[#ff4c00]/20">
                  <Brain className="w-4 h-4" />
                  AI-Powered Career Intelligence
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-6">
                  AI Career Assessment Test{" "}
                  <span className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] bg-clip-text text-transparent">for Skill Gap & Career Path</span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-slate-600 mb-4 leading-relaxed">
                  Stop second-guessing your career decisions. Discover your ideal career path,
                  strengths, and missing skills in under 10 minutes.
                </p>

                <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed">
                  Our career assessment test, powered by advanced AI career assessment,
                  analyzes your skills, experience, personality, and market demand to
                  deliver a personalized career roadmap instantly.
                </p>

                {/* Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-left">
                  {[
                    "Get accurate career recommendations",
                    "Identify your professional strengths",
                    "Detect critical skill gaps",
                    "Make smarter career decisions",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[#fff7f2] border border-[#ff4c00]/10 rounded-lg px-3.5 py-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff4c00] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() =>
                    updateCtaUrl("/ai-career-assessment-skill-gap-analysis", "Start Assessment")
                  }
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-[#ff4c00]/30 hover:shadow-xl hover:shadow-[#ff4c00]/40 transition-shadow"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Trust Line */}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Instant Results
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> No Complex Setup
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Secure & Confidential
                  </span>
                </div>
              </div>

              {/* Right Visual - Stats Card Grid */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-4 shadow-sm">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">10 min</div>
                    <div className="text-sm text-slate-600">Quick Assessment</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all mt-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-4 shadow-sm">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">AI</div>
                    <div className="text-sm text-slate-600">Powered Analysis</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-4 shadow-sm">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">PDF</div>
                    <div className="text-sm text-slate-600">Detailed Report</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all mt-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-4 shadow-sm">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                    <div className="text-sm text-slate-600">Personalized</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile stat strip */}
            <div className="lg:hidden mt-10 -mx-4 px-4 flex gap-3 overflow-x-auto hide-scrollbar">
              {[
                { icon: Target, value: "10 min", label: "Quick Assessment" },
                { icon: BarChart3, value: "AI", label: "Powered Analysis" },
                { icon: FileText, value: "PDF", label: "Detailed Report" },
                { icon: Award, value: "100%", label: "Personalized" },
              ].map((stat, i) => (
                <div key={i} className="flex-shrink-0 w-36 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mb-3">
                    <stat.icon className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 mb-0.5">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section - Clean Professional */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Trusted by Growing Numbers of Professionals
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Join thousands using our intelligent:{" "}
                <span className="text-[#ff4c00]">AI career assessment</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
              <div className="bg-white p-6 text-center flex flex-col items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fff7f2] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <p className="text-slate-700 font-medium text-sm">
                  Used by professionals across industries
                </p>
              </div>

              <div className="bg-white p-6 text-center flex flex-col items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fff7f2] flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <p className="text-slate-700 font-medium text-sm">
                  Designed using real hiring data
                </p>
              </div>

              <div className="bg-white p-6 text-center flex flex-col items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fff7f2] flex items-center justify-center">
                  <Target className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <p className="text-slate-700 font-medium text-sm">
                  Built for modern career decision-making
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Career Decisions Feel Overwhelming - Bento Grid */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Why Career Decisions Often Feel Overwhelming
              </h2>
              <p className="text-base text-slate-600">
                Choosing the right career path isn't easy. Many professionals struggle with:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                "Feeling stuck in the wrong role",
                "Uncertainty about skill development",
                "Fear of choosing the wrong career",
                "Confusion about market demand",
                "Wasting time on ineffective certifications",
                "Struggling to align your passion with a practical career",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border-l-4 border-l-[#ff4c00] border-y border-r border-slate-200">
                  <span className="text-[#ff4c00] font-bold text-sm flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-slate-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white border border-[#ff4c00]/20 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm">

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                  Feeling Stuck in Your Career Path?
                </h2>

                {/* Problem Points */}
                <div className="space-y-4">

                  {/* Item */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-bold flex-shrink-0">
                      ?
                    </div>
                    <p className="text-base">
                      <span className="font-semibold text-slate-800">
                        Tired of guessing your next move?
                      </span>
                    </p>
                  </div>

                  {/* Item */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-bold flex-shrink-0">
                      ?
                    </div>
                    <p className="text-base">
                      <span className="font-semibold text-slate-800">
                        Unsure if your skills match the job market?
                      </span>
                    </p>
                  </div>

                  {/* Item */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-bold flex-shrink-0">
                      ?
                    </div>
                    <p className="text-base">
                      <span className="font-semibold text-slate-800">
                        Afraid of investing in the wrong career path?
                      </span>
                    </p>
                  </div>

                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100"></div>

                {/* Solution Highlight */}
                <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] rounded-xl p-4 text-center">
                  <p className="text-base sm:text-lg font-semibold text-white">
                    Our intelligent career quiz eliminates this uncertainty.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Vertical Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Career Assessment Test Works</span>
              </h2>
              <p className="text-base text-slate-600">
                Finding career clarity should feel simple — and now it is.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
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
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Timeline connector */}
                  {index !== 4 && (
                    <div className="absolute left-6 top-16 w-0.5 h-[calc(100%-2.5rem)] bg-gradient-to-b from-[#ff4c00]/30 to-transparent hidden sm:block"></div>
                  )}

                  <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] text-white flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white">
                        {item.step}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                        <p className="text-sm sm:text-base text-slate-600 mb-4">{item.desc}</p>

                        {item.bullets && (
                          <div className="grid sm:grid-cols-2 gap-2 mb-4">
                            {item.bullets.map((bullet, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
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
                            onClick={() => updateCtaUrl("/ai-career-assessment-skill-gap-analysis", item.cta)}
                            className="mt-3 text-sm font-semibold text-[#ff4c00] hover:text-[#e64400] flex items-center gap-1"
                          >
                            {item.cta}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After - Comparison Cards */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Before vs After Using AI Career Assessment
            </h2>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33]">
                      <th className="text-left p-5 font-bold text-white w-1/2">Before</th>
                      <th className="text-left p-5 font-bold text-white w-1/2">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
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
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-b-0">
                        <td className="p-5 text-slate-500">{item.before}</td>
                        <td className="p-5 font-semibold text-slate-900">{item.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= MOBILE LIST ================= */}
            <div className="md:hidden space-y-4">
              {[
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
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">Before</span>
                    <p className="text-sm text-slate-500 text-right">{item.before}</p>
                  </div>
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-xs font-semibold text-white bg-[#ff4c00] px-2 py-1 rounded">After</span>
                    <p className="text-sm font-semibold text-slate-900 text-right">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Delivers Better Results - Feature Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Why This AI Career Assessment Delivers Better Results
              </h2>
              <p className="text-base text-slate-600">
                Traditional tests give opinions. We deliver actionable intelligence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Powered by real-time job market data",
                "Combines aptitude + skill-gap analysis",
                "Not just personality-based",
                "Designed for real hiring environments",
                "Understand true career compatibility",
                "Know exactly what to improve",
                "Make confident career decisions",
                "Get personalized career paths tailored to your profile",
                "Receive actionable next steps, not just insights",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#ff4c00]/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#ff4c00] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium pt-0.5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits - Bento Grid */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Key Benefits at a Glance
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Eliminate Career Confusion",
                  desc: "Clarity backed by AI insights.",
                },
                {
                  title: "Identify Strengths & Weaknesses",
                  desc: "Deep strengths and weaknesses analysis.",
                },
                {
                  title: "Detect Skill Gaps Instantly",
                  desc: "Precision-driven skill gap analysis tool.",
                },
                {
                  title: "Avoid Wasted Learning Effort",
                  desc: "Know what actually matters.",
                },
                {
                  title: "Improve Job Market Alignment",
                  desc: "Market-driven career mapping.",
                },
                {
                  title: "Make Smarter Career Decisions",
                  desc: "",
                },
              ].map((item, i) => (
                <div key={i} className="relative bg-white rounded-xl border border-slate-200 p-5 pl-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#ff4c00] to-[#ff6b33]"></div>
                  <span className="text-xs font-bold text-[#ff4c00] tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-bold mt-1 mb-2 text-slate-900">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features - Tag Cloud Style */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Key Features of Our AI Career Assessment Tool
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 max-w-4xl mx-auto">
              {[
                "AI-Powered Career Aptitude Test",
                "Advanced Skill Gap Analysis Tool",
                "Personalized Career Path Assessment",
                "Real-Time Skills Assessment for Jobs",
                "Built-In Job Compatibility Test",
                "Learning & Certification Recommendations",
                "Downloadable Career Report",
                "Beginner-Friendly Interface",
                "Results in Under 10 Minutes",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl md:rounded-full px-4 py-2.5 hover:border-[#ff4c00]/40 hover:bg-[#fff7f2] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] flex-shrink-0"></span>
                  <p className="text-sm font-medium text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table - Modern Design */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              AI Career Assessment vs Traditional Career Tests
            </h2>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#ff4c00] to-[#ff6b33]">
                      <th className="text-left p-5 font-bold text-white">Feature</th>
                      <th className="text-left p-5 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          AI Career Assessment
                        </div>
                      </th>
                      <th className="text-left p-5 font-bold text-white/70">
                        Traditional Career Tests
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      { feature: "Personalization", ai: "Dynamic AI-based", traditional: "Generic results" },
                      { feature: "Skill Gap Analysis", ai: "Included", traditional: "Limited" },
                      { feature: "Market Alignment", ai: "Real-time insights", traditional: "Static database" },
                      { feature: "Career Suggestions", ai: "Multiple role matches", traditional: "Limited" },
                      { feature: "Action Plan", ai: "Customized roadmap", traditional: "Basic output" },
                      { feature: "Speed", ai: "Instant results", traditional: "Longer evaluation" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-b-0">
                        <td className="p-5 font-semibold text-slate-700">{row.feature}</td>

                        <td className="p-5 text-[#ff4c00] font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                            {row.ai}
                          </div>
                        </td>

                        <td className="p-5 text-slate-500">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= MOBILE TABLE ================= */}
            <div className="md:hidden space-y-4">
              {[
                { feature: "Personalization", ai: "Dynamic AI-based", traditional: "Generic results" },
                { feature: "Skill Gap Analysis", ai: "Included", traditional: "Limited" },
                { feature: "Market Alignment", ai: "Real-time insights", traditional: "Static database" },
                { feature: "Career Suggestions", ai: "Multiple role matches", traditional: "Limited" },
                { feature: "Action Plan", ai: "Customized roadmap", traditional: "Basic output" },
                { feature: "Speed", ai: "Instant results", traditional: "Longer evaluation" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  {/* Feature */}
                  <p className="font-semibold text-slate-900 mb-3">
                    {row.feature}
                  </p>

                  {/* AI */}
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <span className="text-xs font-semibold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded">
                      AI
                    </span>
                    <p className="text-sm text-[#ff4c00] font-medium text-right">
                      {row.ai}
                    </p>
                  </div>

                  {/* Traditional */}
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      Traditional
                    </span>
                    <p className="text-sm text-slate-600 text-right">
                      {row.traditional}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-center text-sm sm:text-base text-slate-600 mt-6">
              Modern decision-making requires smarter systems.
            </p>

          </div>
        </section>

        {/* Who Can Use This - Profile Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">
              Who Can Use This Career Assessment Test?
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Students choosing a specialization",
                "Professionals preparing for promotions",
                "International job seekers",
                "Professionals returning after a career break",
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-[#ff4c00]/40 hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-white" />
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

        {/* Final CTA - Bold Gradient Panel */}
        <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gradient-to-br from-[#ff4c00] to-[#e64400] rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-xl">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>

              <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Discover Your Ideal Career Path with AI
              </h2>

              <p className="relative text-base sm:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
                Stop guessing your future. Identify your strengths. Fix your skill gaps.
                Move forward with confidence.
              </p>

              {/* Benefit Pills */}
              <div className="relative flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
                {[
                  "Gain instant career clarity",
                  "Detect missing skills",
                  "Build smarter career strategies",
                  "Make confident decisions",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() =>
                  updateCtaUrl("/ai-career-assessment-skill-gap-analysis", "Start Assessment")
                }
                className="relative inline-flex items-center justify-center gap-2 bg-white text-[#ff4c00] px-10 py-4 rounded-xl text-base font-semibold shadow-lg hover:bg-[#fff3ec] transition-colors"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="relative mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Instant results
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> No complex setup
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure & confidential
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Clean Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Frequently Asked Questions
              </h2>
              <p>Everything you need to know about our AI career assessment</p>
            </div>

            <div className="ff-faq-list">
              {[
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
              ].map((item, i) => (
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
