"use client";

import {
  Globe2,
  Laptop,
  Wifi,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Search,
  Clock,
  Mail,
  AlertCircle,
  FileText,
  Zap,
  Target,
  Sparkles,
  Shield,
  Users,
  Briefcase,
  Globe,
  Home,
  Building2,
  Plane,
  GraduationCap,
  RefreshCw,
  TrendingUp,
  Award,
  BarChart3,
  X,
  Plus,
} from "lucide-react";
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

const comparisonRows = [
  { feature: "Job Matching", ai: "AI-based remote job matching", traditional: "Manual search" },
  { feature: "Personalization", ai: "Resume-based recommendations", traditional: "Generic listings" },
  { feature: "Global Access", ai: "Verified global remote jobs", traditional: "Limited filtering" },
  { feature: "Application Speed", ai: "One-click apply", traditional: "Manual forms" },
  { feature: "Alerts", ai: "Smart real-time alerts", traditional: "Basic notifications" },
  { feature: "Optimization", ai: "AI improvement insights", traditional: "Not available" },
];

export default function AIRemoteJobSearchPage() {
  const ctaLabel = "Get Started";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* HERO - Enhanced Professional Layout */}
        <section className="relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ff4c00]/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#ff4c00]/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT - Content */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00] mb-6">
                  <Globe2 className="h-4 w-4" />
                  AI Remote Job Search Platform
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
                  Find remote roles
                  <span className="block text-[#ff4c00] mt-2">that match your time zone and skills</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Flashfire surfaces high‑quality remote opportunities across global markets,
                  filtered by your location, experience level, and salary expectations.
                </p>

                <div className="mt-8 grid sm:grid-cols-1 gap-4 max-w-xl">
                  {[
                    { icon: Globe2, title: "Global Markets", text: "Remote roles across US, Canada, and global markets" },
                    { icon: Laptop, title: "Tech & Business", text: "Tech, product, and business roles that support remote work" },
                    { icon: Wifi, title: "Time Zone Match", text: "Filtered by time zone and work‑overlap preferences" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <div>
                        <span className="block text-slate-900 font-semibold text-sm">{item.title}</span>
                        <span className="text-slate-500 text-xs">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white hover:bg-[#e04400] border-2 border-[#ff4c00] hover:border-[#e04400] w-full sm:w-auto"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-slate-500 font-medium">Free to get started</span>
                </div>
              </div>

              {/* RIGHT - Preview Card */}
              <div className="order-1 lg:order-2">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <pattern id="dots-hero-remote" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#ff4c00" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#dots-hero-remote)" />
                    </svg>
                  </div>

                  <div className="rounded-2xl border border-[#ff4c00]/20 bg-white p-5 sm:p-6 shadow-lg relative">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/30"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/20"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/10"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Remote job highlights</span>
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-100">
                          Live
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">Senior Frontend Engineer</p>
                          <p className="text-xs text-slate-500 mt-1">US‑based • Fully Remote • EST overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4c00]/10 text-xs font-semibold text-[#ff4c00] self-start sm:self-auto border border-[#ff4c00]/20">
                          <MapPin className="h-3 w-3" />
                          High Match
                        </span>
                      </div>

                      <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">Product Designer</p>
                          <p className="text-xs text-slate-500 mt-1">Canada • Remote Friendly • PST overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4c00]/10 text-xs font-semibold text-[#ff4c00] self-start sm:self-auto border border-[#ff4c00]/20">
                          <MapPin className="h-3 w-3" />
                          Time‑zone Fit
                        </span>
                      </div>

                      <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">DevOps Engineer</p>
                          <p className="text-xs text-slate-500 mt-1">Europe • Fully Remote • CET overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4c00]/10 text-xs font-semibold text-[#ff4c00] self-start sm:self-auto border border-[#ff4c00]/20">
                          <MapPin className="h-3 w-3" />
                          New
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                      These are examples of how Flashfire prioritizes remote roles that not only match
                      your skills, but also work with your schedule and region.
                    </p>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100 z-20 hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                        <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">2,500+</p>
                        <p className="text-xs text-slate-500">Active Jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY - Clean Professional Bar */}
        <section className="bg-white py-8 md:py-10 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 md:gap-8 text-center">
              <p className="text-sm font-bold text-[#ff4c00] uppercase tracking-wider">Trusted by remote professionals worldwide</p>
              <div className="hidden md:block h-px w-16 bg-[#ff4c00]/20"></div>
              <p className="text-base text-slate-600">
                Used across industries • Leading remote job boards • Modern remote work careers
              </p>
            </div>
          </div>
        </section>

        {/* WHY REMOTE JOB SEARCHING FEELS FRUSTRATING - Enhanced Bento Grid */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Problem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Why Remote Job Searching Feels <span className="text-[#ff4c00]">Frustrating</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Searching manually across multiple online job search platforms is exhausting.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Problems Grid - Takes 3 columns */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-[#ff4c00]" />
                  </span>
                  Common Frustrations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: "Irrelevant listings", desc: "Wasting time on mismatched roles", icon: Search },
                    { title: "Endless filtering", desc: "Hours spent on manual searches", icon: AlertCircle },
                    { title: "Location restrictions", desc: "Geographic barriers limit options", icon: Globe },
                    { title: "Time-zone mismatches", desc: "Scheduling conflicts with teams", icon: Clock },
                    { title: "Low recruiter response rates", desc: "Applications go unanswered", icon: Mail },
                    { title: "Application burnout", desc: "Repetitive forms drain energy", icon: AlertCircle },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#fff7f2] border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#ff4c00]/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <div>
                        <span className="block text-slate-800 font-semibold text-sm">{item.title}</span>
                        <span className="text-slate-500 text-xs">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain Points Card - Takes 2 columns */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] rounded-2xl p-6 md:p-8 text-white shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-3 mb-6">
                  <p className="font-bold text-lg">Tired of applying and getting ghosted?</p>
                  <p className="font-bold text-lg">Overwhelmed, juggling multiple remote job boards?</p>
                  <p className="font-bold text-lg">Unsure which roles truly fit your skills?</p>
                </div>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  Searching manually across multiple online job search platforms is exhausting.
                </p>
                <p className="font-bold text-white">
                  Our intelligent platform eliminates this friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Clean Timeline */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff7f2] border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Process
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Remote Job Finder Works</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Finding the right remote role should feel simple — and now it is.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line - hidden on mobile */}
              <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    step: "1",
                    title: "Create Your Profile",
                    desc: "Tell us about yourself.",
                    bullets: [
                      "Add skills, education & experience",
                      "Specify preferred time zones",
                      "Select remote work type:",
                      "• Full-time",
                      "• Freelance",
                      "• Contract",
                    ],
                    note: "Designed for professionals exploring remote work careers.",
                  },
                  {
                    step: "2",
                    title: "AI Resume & Skill Analysis",
                    desc: "Our AI engine evaluates your profile.",
                    bullets: [
                      "Identifies remote-ready roles",
                      "Extracts core competencies",
                      "Aligns experience with hiring demand",
                      "Detects virtual job opportunities",
                    ],
                  },
                  {
                    step: "3",
                    title: "Smart Remote Job Matching",
                    desc: "This is where automation changes everything.",
                    bullets: [
                      "Our AI remote job finder scans thousands of telecommute job listings from leading remote job boards.",
                      "Precision remote job matching",
                      "Personalized work from home jobs, AI recommendations",
                      "Intelligent filtering by:",
                      "• Country",
                      "• Salary",
                      "• Timezone",
                      "• Industry",
                      "Discover relevant global remote jobs instantly",
                    ],
                  },
                  {
                    step: "4",
                    title: "Optimized Job Applications",
                    desc: "Apply faster with built-in AI tools.",
                    bullets: [
                      "Send personalized cover letters in seconds",
                      "Optimize your resume specifically for global remote jobs",
                      "Use a one-click apply workflow",
                      "No repetitive forms",
                      "No manual re-entry",
                    ],
                  },
                  {
                    step: "5",
                    title: "Track & Optimize Your Applications",
                    desc: "Stay fully organized.",
                    bullets: [
                      "Remote job application tracker",
                      "Interview reminders",
                      "Smart remote job alerts",
                    ],
                  },
                ].map((item) => (
                  <div key={item.step} className="relative md:pl-20">
                    {/* Step Number */}
                    <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-2xl bg-[#ff4c00] text-white items-center justify-center text-xl font-bold shadow-lg border-4 border-white">
                      {item.step}
                    </div>
                    <div className="md:hidden w-12 h-12 rounded-xl bg-[#ff4c00] text-white flex items-center justify-center text-lg font-bold mb-4">
                      {item.step}
                    </div>

                    {/* Content Card */}
                    <div className="bg-[#fff7f2] rounded-2xl border border-slate-200 p-5 md:p-8 shadow-sm">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      {item.desc && <p className="text-base text-slate-600 mb-4">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {item.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 ${
                                bullet.startsWith("•")
                                  ? "pl-6 bg-transparent"
                                  : "bg-white border border-[#ff4c00]/10"
                              }`}
                            >
                              {!bullet.startsWith("•") && (
                                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              )}
                              <span className={`text-sm ${bullet.startsWith("•") ? "text-slate-500" : "text-slate-700"}`}>
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-[#ff4c00] bg-white px-4 py-2 rounded-lg border border-[#ff4c00]/10">
                          <Sparkles className="h-4 w-4" />
                          {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS - Feature Grid */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Why This <span className="text-[#ff4c00]">AI Remote Job Finder</span> Delivers Better Results
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Traditional job boards show listings. We deliver precision & efficiency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {[
                { title: "Eliminate irrelevant applications", icon: Target },
                { title: "Reduce wasted browsing time", icon: Zap },
                { title: "Improve resume-job alignment", icon: FileText },
                { title: "Discover better-fit opportunities", icon: Sparkles },
                { title: "Apply faster than competitors", icon: TrendingUp },
                { title: "Make data-driven job search decisions", icon: BarChart3 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-gradient-to-r from-white to-[#fffaf7] rounded-2xl border border-[#ff4c00]/15 p-6 md:p-8">
              <p className="font-bold text-slate-900 mb-4 text-lg">Users typically experience:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Faster job discovery",
                  "Better job relevance",
                  "Reduced application fatigue",
                  "Improved response probability",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-[#ff4c00]"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS - Professional Card Grid */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  num: "01",
                  title: "Save Hours of Manual Searching",
                  desc: "Automation replaces endless browsing.",
                },
                {
                  num: "02",
                  title: "Discover Verified Global Remote Jobs",
                  desc: "Curated listings worldwide.",
                },
                {
                  num: "03",
                  title: "Apply Faster Than Other Candidates",
                  desc: "Early-application advantage.",
                },
                {
                  num: "04",
                  title: "Eliminate Guesswork & Filtering Fatigue",
                  desc: "Precision AI matching.",
                },
                {
                  num: "05",
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  num: "06",
                  title: "Build Smarter Remote Work Careers",
                  desc: "Long-term career growth support.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 border border-[#ff4c00]/20 flex items-center justify-center mb-4">
                    <span className="text-[#ff4c00] font-bold text-sm">{item.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES - Compact Card Grid */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Features
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Key Features Designed for <span className="text-[#ff4c00]">Remote Job Efficiency</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: "AI-Powered Remote Job Matching", desc: "No manual keyword filtering." },
                { title: "Verified Global Remote Jobs Database", desc: "" },
                { title: "Real-Time Remote Job Alerts", desc: "" },
                { title: "Resume-Based Job Recommendations", desc: "" },
                { title: "Skill-Gap Analysis for Remote Roles", desc: "" },
                { title: "Time-Zone-Based Job Filtering", desc: "" },
                { title: "Built-In Resume & Cover Letter Builder", desc: "" },
                { title: "Application Tracking Dashboard", desc: "" },
                { title: "Fast Job Discovery Experience", desc: "" },
                { title: "Supports Part-Time and Full-Time Remote Jobs", desc: "" },
                { title: "Works Across Multiple Industries", desc: "" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - Modern Card Style */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                <span className="text-[#ff4c00]">AI Remote Job Finder</span> vs Traditional Job Boards
              </h2>
            </div>

            {/* Desktop / tablet table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-base min-w-[600px]">
                  <thead>
                    <tr className="bg-[#fff7f2]">
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-900 text-left">Feature</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-[#ff4c00] text-left">AI Remote Job Finder</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-500 text-left">Traditional Job Boards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr key={row.feature} className={idx % 2 === 0 ? "bg-white" : "bg-[#fffaf7]/50"}>
                        <td className="px-4 md:px-6 py-3 md:py-4 font-semibold text-slate-700">{row.feature}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-700">
                          <span className="inline-flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-[#ff4c00]" />
                            </div>
                            {row.ai}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-500">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile stacked cards */}
            <div className="md:hidden space-y-4">
              {comparisonRows.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="font-bold text-slate-900 mb-3">{row.feature}</p>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-md uppercase tracking-wide flex-shrink-0">
                      AI Finder
                    </span>
                    <p className="text-sm text-slate-700 font-medium text-right flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#ff4c00] flex-shrink-0" />
                      {row.ai}
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wide flex-shrink-0">
                      Traditional
                    </span>
                    <p className="text-sm text-slate-500 text-right">{row.traditional}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-base text-slate-600">
              Modern remote job search requires intelligent systems.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS - Tag Cloud Style */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                For Everyone
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">AI Remote Job Finder</span>?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:justify-center gap-3">
              {[
                { label: "Remote job for beginners", icon: GraduationCap },
                { label: "Freelancers", icon: Briefcase },
                { label: "Digital nomads", icon: Plane },
                { label: "Entry-level professionals", icon: Users },
                { label: "Mid-career professionals", icon: Award },
                { label: "Career switchers", icon: RefreshCw },
                { label: "International applicants", icon: Globe },
                { label: "Professionals seeking work-from-home jobs", icon: Home },
                { label: "Ideal for discovering virtual job opportunities", icon: Building2 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex sm:inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-full border border-slate-200 bg-white px-5 py-3 sm:py-2.5 md:px-6 md:py-3 text-center text-slate-700 font-semibold shadow-sm hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <item.icon className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Split Layout */}
        <section className="relative py-16 md:py-24 bg-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT CONTENT */}
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                  Get Started
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Find <span className="text-[#ff4c00]">Global Remote Jobs</span> Smarter with AI
                </h2>

                <p className="text-base md:text-lg text-slate-600 mb-6">
                  Stop manually juggling multiple remote job boards. Simplify your remote job search, get precision matching, discover verified global remote jobs, apply faster, and reduce job search stress.
                </p>

                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                  className="inline-flex items-center justify-center gap-2 bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#e04400] w-full sm:w-auto"
                >
                  {ctaLabel}
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> Instant setup
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> No complex learning curve
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Shield className="h-4 w-4 text-[#ff4c00]" /> Secure & private
                  </span>
                </div>
              </div>

              {/* RIGHT FEATURE PANEL */}
              <div className="bg-gradient-to-br from-[#fffaf7] to-white rounded-2xl border border-[#ff4c00]/15 p-6 md:p-8 shadow-lg">
                <div className="space-y-4">
                  {[
                    "Simplify your remote job search",
                    "Get precision job matching",
                    "Discover verified global remote jobs",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ff4c00]/20 to-[#ff4c00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-[#ff4c00]" />
                      </div>
                      <p className="font-bold text-slate-900 text-base md:text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                FAQ
              </span>
              <h2>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is an AI remote job finder?",
                  a: "An AI remote job finder uses intelligent algorithms to simplify and automate your remote job search.",
                },
                {
                  q: "How does remote job matching work?",
                  a: "Our engine analyzes your skills, resume, and preferences to deliver precision remote job matching.",
                },
                {
                  q: "Can I find global remote jobs?",
                  a: "Yes. Access thousands of verified global remote jobs worldwide.",
                },
                {
                  q: "Is this platform suitable for beginners?",
                  a: "Absolutely. No prior remote experience required.",
                },
                {
                  q: "How fast can I apply?",
                  a: "Apply instantly using our one-click workflow.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy & security are core priorities.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${
                    activeFaqIndex === i ? "is-active" : ""
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
                      {activeFaqIndex === i ? <X size={16} /> : <Plus size={16} />}
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
