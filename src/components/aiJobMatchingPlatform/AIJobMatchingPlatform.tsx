"use client";

import { Target, Sparkles, Users, CheckCircle, Award, UserCheck, TrendingUp, FileText, Brain, Zap, Shield, Clock, BarChart3, Search, Filter, AlertCircle, ArrowRight, X } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { getLocalePrefix } from "@/src/utils/locale";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const normalizedBase = `${getLocalePrefix(window.location.pathname)}${basePath}`;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobMatchingPlatformPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-[#111827] min-h-screen">


      <main className="mt-0">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-[#fff7f3]" />

          <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 md:px-6 lg:px-8 lg:grid-cols-12 lg:items-center">
              {/* LEFT CONTENT - 7 cols */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-Powered Job Matching Technology
                </div>

                <h1 className="text-[34px] font-extrabold leading-[1.14] text-black sm:text-[52px] lg:leading-[1.05]">
                  AI Job Matching Platform for{" "}
                  <span className="text-[#ff4c00]">Personalized Job Recommendations</span>
                </h1>

                <div className="max-w-2xl space-y-4">
                  <p className="text-[17px] font-semibold leading-8 text-gray-800">
                    Stop wasting hours scrolling through irrelevant job listings.
                  </p>
                  <p className="text-[16px] font-medium leading-8 text-gray-600">
                    Our AI job matching platform uses an advanced job matching algorithm powered by machine learning matching to instantly connect your resume with the most relevant opportunities.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  {[
                    "Get real-time personalized job recommendations",
                    "Eliminate mismatched applications",
                    "Discover better-fit roles faster",
                    "Improve interview success probability",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10">
                        <CheckCircle className="h-3.5 w-3.5 text-[#ff4c00]" />
                      </div>
                      <span className="text-[13px] font-semibold leading-snug text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-7 text-[14px] font-bold text-white shadow-[0_3px_0_black] transition hover:opacity-90"
                  >
                    Start Matching Jobs Now
                    <ArrowRight size={14} />
                  </button>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Shield className="h-4 w-4 text-[#ff4c00]" />
                    <span>Secure & Confidential</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PREVIEW - 5 cols */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-[440px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                        <span className="text-sm font-bold text-black uppercase tracking-wider">AI Matching Analysis</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs font-semibold text-green-700">Live</span>
                      </div>
                    </div>

                    <div className="space-y-5 p-6">
                      {/* Profile Section */}
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-[#ff4c00]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Your Profile</p>
                            <p className="text-sm font-bold text-black">Senior Frontend Developer</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Skills</span>
                            <span className="font-semibold text-black">React, JavaScript, UI</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Location</span>
                            <span className="font-semibold text-black">United States</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Salary Range</span>
                            <span className="font-semibold text-black">$70k – $90k</span>
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Compatibility Analysis</p>
                        {[
                          ["Skill Match", "High", "95%"],
                          ["Location Fit", "Yes", "100%"],
                          ["Salary Alignment", "Matched", "90%"],
                        ].map(([label, value, percent]) => (
                          <div key={label} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                            <span className="text-sm font-medium text-gray-700">{label}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-[#ff4c00]">{percent}</span>
                              <span className="px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold text-xs">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Priority Result */}
                      <div className="rounded-xl border border-[#ffd6c2] bg-[#fff7f3] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Top Recommendation</p>
                          <Award className="h-4 w-4 text-[#ff4c00]" />
                        </div>
                        <p className="text-lg font-bold text-black mb-1">Frontend Developer</p>
                        <p className="text-sm text-gray-600 mb-3">TechCorp Inc. • San Francisco, CA</p>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#ff4c00] text-white text-xs font-bold">
                            98% Match
                          </span>
                          <span className="text-xs text-gray-500">Recommended to apply</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </section>

        {/* Key Benefits at a Glance */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Reduce Job Search Time",
                  desc: "Stop manually filtering irrelevant jobs.",
                },
                {
                  title: "Receive Highly Relevant Matches",
                  desc: "Powered by intelligent candidate-job matching",
                },
                {
                  title: "Improve Resume-Job Alignment",
                  desc: "Automatic resume-job alignment optimization.",
                },
                {
                  title: "Eliminate Application Burnout",
                  desc: "Apply only to high-fit roles.",
                },
                {
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  title: "Discover Hidden Opportunities",
                  desc: "AI detects keyword searches miss.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff4c00]/10">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00]" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-black">{benefit.title}</h3>
                      <p className="text-[14px] leading-6 text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Our AI Job Matching Platform Works */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                Process
              </span>
              <h2 className="mt-5 text-[28px] font-extrabold leading-[1.1] text-black sm:text-[38px]">
                How Our <span className="text-[#ff4c00]">AI Job Matching Platform</span> Works
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-gray-600">
                Finding the right job should feel effortless — and now it does.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-gray-200 hidden md:block"></div>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Upload Your Resume or Build Your Profile",
                    desc: "Simply upload your resume or create your career profile.",
                    items: ["No lengthy forms", "No manual data entry stress", "Works seamlessly with your resume builder output"],
                  },
                  {
                    step: "02",
                    title: "AI Analyzes Your Skills & Experience",
                    desc: "Our AI job matching system evaluates:",
                    items: ["Technical skills", "Experience depth", "Career trajectory", "Role preferences"],
                    footer: "Delivering deeper resume-job alignment.",
                  },
                  {
                    step: "03",
                    title: "AI Scans Thousands of Job Descriptions",
                    desc: "The platform continuously processes listings using:",
                    items: ["Semantic matching", "Skills-based matching", "Context-aware recruitment"],
                    footer: "Far beyond static keyword filters.",
                  },
                  {
                    step: "04",
                    title: "AI Matches Resume to Job Description",
                    desc: "Our engine performs intelligently: AI match resume to a job description",
                    items: ["Semantic matching", "AI talent matching", "Machine learning matching"],
                    highlight: "This is why users consider it the: Best AI to match a resume to a job description",
                  },
                  {
                    step: "05",
                    title: "Get Instant Personalized Job Matches",
                    desc: "Receive real-time:",
                    items: ["AI job recommendations", "High-fit opportunities", "Smart role prioritization"],
                    footer: "Powered by predictive job recommendations.",
                  },
                ].map((section, index) => (
                  <div key={index} className="relative flex gap-6 md:gap-8">
                    {/* Step Number */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#ff4c00] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0 z-10">
                        {section.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-8">
                      <div className="md:hidden w-12 h-12 rounded-xl bg-[#ff4c00] text-white flex items-center justify-center font-bold mb-4">
                        {section.step}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{section.desc}</p>

                      <ul className="space-y-3 mb-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                            </span>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {section.footer && (
                        <p className="text-black font-semibold mt-4 pt-4 border-t border-gray-100">
                          {section.footer}
                        </p>
                      )}

                      {section.highlight && (
                        <div className="mt-4 rounded-xl border border-[#ff4c00]/15 bg-[#fff7f3] p-4">
                          <p className="text-gray-700">
                            <span className="font-semibold">Key Advantage:</span>{" "}
                            <span className="text-[#ff4c00] font-bold">{section.highlight}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Smart Opportunity Ranking */}
            <div className="mt-14 rounded-2xl border border-[#ff4c00]/20 bg-[#fff7f3] p-8">
              <h3 className="text-2xl font-bold text-black mb-3">
                Smart Opportunity Ranking
              </h3>
              <p className="text-lg text-gray-700">
                Each role receives a <span className="font-semibold text-[#ff4c00]">candidate suitability score</span>
              </p>
              <p className="text-base text-gray-600 mt-2">
                Helping you focus on jobs with the highest success probability.
              </p>
            </div>

            {/* Continuous Learning */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-4">
                Continuous Learning for Higher Accuracy
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Our AI job matching engine continuously improves.
              </p>
              <ul className="space-y-2">
                {["Learns preferences", "Refines matching patterns", "Increases relevance"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why This AI Job Matching Platform Delivers Better Results */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Why This AI Job Matching Platform <span className="text-[#ff4c00]">Delivers Better Results</span>
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-gray-600">
                Traditional job boards show listings.
              </p>
              <p className="mt-1 text-[15px] font-semibold leading-7 text-gray-700">
                We deliver intelligent alignment.
              </p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {[
                "Understand real job fit — not just keywords",
                "Prioritize roles based on compatibility",
                "Reduce irrelevant applications",
                "Improve decision confidence",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-[14px] font-semibold text-black">{item}</span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="border-b border-gray-100 bg-white px-8 py-5">
                <h3 className="text-lg font-bold text-black">Users typically experience:</h3>
              </div>
              <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  ["Faster", "Job discovery"],
                  ["Better", "Candidate-job matching accuracy"],
                  ["Stronger", "Interview alignment"],
                ].map(([stat, label]) => (
                  <div key={label} className="bg-[#fff7f3] px-6 py-8 text-center">
                    <div className="mb-1 text-2xl font-extrabold text-[#ff4c00]">{stat}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[720px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                Features
              </span>
              <h2 className="mt-5 text-[28px] font-extrabold leading-[1.1] text-black sm:text-[38px]">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Matching Platform</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Advanced AI Job Matching Engine",
                  desc: "Powered by intelligent AI job matching models that understand context beyond keywords.",
                },
                {
                  title: "Deep Semantic Resume Analysis",
                  desc: "Leverages semantic matching for contextual understanding of your experience.",
                  bullets: ["Detects skill relationships", "Identifies role compatibility", "Eliminates keyword dependency"],
                },
                {
                  title: "Skills & Experience-Based Matching",
                  desc: "Combines multiple evaluation factors:",
                  bullets: ["Skills-based matching", "Experience depth evaluation", "Career trajectory logic"],
                },
                {
                  title: "Candidate-Job Compatibility Score",
                  desc: "Each opportunity receives a detailed candidate suitability score based on multiple dimensions.",
                },
                {
                  title: "Intelligent Resume-Job Alignment",
                  desc: "Improves your resume-job alignment automatically through AI optimization suggestions.",
                },
                {
                  title: "Real-Time AI Job Recommendations",
                  desc: "Dynamic AI job recommendations that update as new positions match your profile.",
                },
                {
                  title: "Smart Filters & Personalization",
                  desc: "Refine matches by your specific criteria:",
                  bullets: ["Industry", "Location", "Salary", "Career goals"],
                },
                {
                  title: "Resume Optimization Insights",
                  desc: "Receive actionable feedback to improve matching strength instantly.",
                },
                {
                  title: "High-Match Opportunity Alerts",
                  desc: "Never miss relevant roles again with instant notifications for top matches.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c00]/10 text-[#ff4c00]">
                    <CheckCircle size={18} strokeWidth={2.5} />
                  </span>

                  <h3 className="text-lg font-bold text-black mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-[14px] leading-6 mb-4">
                    {feature.desc}
                  </p>

                  {feature.bullets && (
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-[#ff4c00]"></div>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Why Job Seekers Choose Section */}
        <section className="bg-[#fff7f3] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Why Job Seekers Choose Our <span className="text-[#ff4c00]">AI Job Matcher</span>
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-gray-600">
                Job seekers want outcomes — not endless searching.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Save hours of manual filtering",
                "Receive true personalized job recommendations",
                "Reduce irrelevant applications",
                "Improve interview chances",
                "Discover hidden opportunities",
                "Simple, beginner-friendly platform",
                "Secure & confidential resume handling",
                "Match jobs based on skills and experience",
                "Find relevant jobs faster with AI",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#ff4c00]/40 hover:shadow-sm"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-[14px] font-semibold text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-12 text-center">
              <h2 className="text-[26px] font-extrabold leading-tight text-black sm:text-[32px]">
                AI Job Matching vs <span className="text-[#ff4c00]">Traditional Job Boards</span>
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 sm:grid">
                <span className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Feature</span>
                <span className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Traditional Job Boards</span>
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">AI-Powered Job Matching Platform</span>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  {
                    feature: "Search Method",
                    traditional: "Manual keyword search",
                    ai: "Intelligent job matching algorithm",
                  },
                  {
                    feature: "Listings",
                    traditional: "Generic listings",
                    ai: "Personalized job recommendations",
                  },
                  {
                    feature: "Resume Alignment",
                    traditional: "No resume alignment",
                    ai: "AI match resume to a job description",
                  },
                  {
                    feature: "Filtering",
                    traditional: "Time-consuming filtering",
                    ai: "Smart suitability ranking",
                  },
                  {
                    feature: "Personalization",
                    traditional: "Same results for everyone",
                    ai: "Customized AI job recommendations",
                  },
                  {
                    feature: "Relevance",
                    traditional: "Limited relevance scoring",
                    ai: "Context-aware AI-powered job matching",
                  },
                ].map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[1fr_1.4fr_1.4fr] sm:items-center sm:gap-4"
                  >
                    <span className="text-[14px] font-extrabold text-black">{row.feature}</span>
                    <span className="flex items-center gap-2 text-[14px] text-gray-500">
                      <X size={15} className="shrink-0 text-gray-300" />
                      {row.traditional}
                    </span>
                    <span className="flex items-center gap-2 text-[14px] font-semibold text-[#ff4c00]">
                      <CheckCircle size={15} className="shrink-0 text-[#ff4c00]" />
                      {row.ai}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Who Can Use This <span className="text-[#ff4c00]">AI Job Matching Platform?</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Tech specialists",
                "Remote job seekers",
                "Executives & leaders",
                "International applicants",
              ].map((persona) => (
                <div
                  key={persona}
                  className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-[#ff4c00]/40 hover:bg-[#fff7f3] hover:shadow-md"
                >
                  <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4c00]/10 text-[#ff4c00]">
                    <CheckCircle size={18} strokeWidth={2.5} />
                  </span>
                  <p className="font-bold text-black">{persona}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="relative overflow-hidden rounded-[40px] bg-[#fff1ea] px-8 py-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:px-16 md:py-20">
              <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />

              <h2 className="relative text-[28px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
                Find the Right Job Faster with <span className="text-[#ff4c00]">AI-Powered Job Matching</span>
              </h2>

              <p className="relative mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-gray-600">
                Stop relying on outdated job search methods.
              </p>

              <p className="relative mt-2 text-[15px] leading-7 text-gray-600">
                With our AI job matching platform, you can:
              </p>

              {/* Benefits */}
              <div className="relative mx-auto mt-9 grid max-w-[640px] gap-3 text-left sm:grid-cols-2">
                {[
                  "Access smarter AI job recommendations",
                  "Improve resume-job alignment",
                  "Prioritize high-fit opportunities",
                  "Reduce job search time dramatically",
                  "Apply with confidence",
                  "Get personalized job matches based on your skills",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#ffd6c2] bg-white px-4 py-3 shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                    <span className="text-[14px] font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="relative mt-9 flex flex-col items-center gap-5">

                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-8 text-[14px] font-bold text-white shadow-[0_4px_0_black] transition-all duration-200 hover:-translate-y-0.5"
                >
                  Start Matching Jobs Now
                  <ArrowRight size={16} />
                </button>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                  {[
                    "Instant matches",
                    "No complicated setup",
                    "Secure & confidential",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full bg-white border border-[#ffd6c2] shadow-sm"
                    >
                      • {item}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Frequently Asked
                <span className="block">Questions</span>
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is AI job matching?",
                  a: "AI job matching uses machine learning to intelligently connect candidates with relevant job opportunities.",
                },
                {
                  q: "How does an AI job matching platform work?",
                  a: "An AI job matching platform analyzes resumes and job descriptions to generate personalized matches.",
                },
                {
                  q: "What is a job matching algorithm?",
                  a: "A job matching algorithm evaluates compatibility between candidate profiles and job requirements.",
                },
                {
                  q: "Can AI match my resume accurately?",
                  a: "Yes. Our engine uses semantic matching and machine learning matching.",
                },
                {
                  q: "Is AI job matching better than traditional job boards?",
                  a: "For relevance, efficiency, and alignment — absolutely.",
                },
                {
                  q: "How accurate are personalized job recommendations?",
                  a: "Accuracy improves continuously through machine learning matching.",
                },
                {
                  q: "Is my resume data secure?",
                  a: "Yes. Security and confidentiality are core priorities.",
                },
                {
                  q: "Who should use an AI-powered job matching platform?",
                  a: "Any job seeker who wants faster, smarter, high-relevance job discovery.",
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
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}} />
    </div>
  );
}
