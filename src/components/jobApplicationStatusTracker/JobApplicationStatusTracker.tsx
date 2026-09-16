"use client";

import { ListChecks, BarChart3, MessageSquare, CheckCircle, TrendingUp, ArrowRight, Sparkles, X, Check, Clock, Shield, Zap, Target, Brain, Database, Globe, LayoutDashboard, Bell, Search } from "lucide-react";
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

const featureCardBase =
  "flex flex-col rounded-[0.6rem] border border-[#94959a]/60 bg-[#fffdfc] p-6 text-left shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#ff4c00]/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]";

export default function JobApplicationStatusTrackerPage() {
  const ctaLabel = "Start Tracking";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-[#111827] min-h-screen font-['Space_Grotesk',sans-serif]">
      <main className="mt-0">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#f7e6df] py-16 md:py-24">
          <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">

            {/* LEFT */}
            <div className="max-w-xl space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                <ListChecks size={14} />
                Job Application Status Tracker &amp; Follow-Up Dashboard
              </div>

              <h1 className="text-[34px] font-bold leading-[1.14] tracking-[-0.02em] text-black sm:text-[48px] lg:leading-[1.05]">
                Track every job application in one smart dashboard — and never miss a follow-up again.
              </h1>

              <p className="max-w-[500px] font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a]">
                Our job application status tracker helps you track your job application status, manage recruiter interactions, and stay fully organized using a powerful application status dashboard.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Eliminate job search chaos",
                  "Never forget recruiter follow-ups",
                  "Stay ahead of interview deadlines",
                  "Take full control of your job search",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 rounded-[0.5rem] bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-[#ff4c00]" />
                    </div>
                    <span className="font-['Satoshi',sans-serif] text-[13px] font-bold text-[#111]">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
                  className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  {ctaLabel}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT – APPLICATION TRACKER PREVIEW */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] overflow-hidden rounded-[0.75rem] border border-[#94959a]/40 bg-[#fffdfc] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between border-b border-[#94959a]/30 bg-white px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-[#ff4c00] flex items-center justify-center shadow-[0_3px_0_#000]">
                      <LayoutDashboard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black uppercase tracking-wide">
                        Application Status Dashboard
                      </p>
                      <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">12 active applications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[8px] bg-[#f7e6df] flex items-center justify-center">
                      <Bell className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Search Bar */}
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-[0.5rem] bg-[#f7e6df]/60 border border-[#94959a]/20">
                    <Search className="h-4 w-4 text-[#a7a7a7]" />
                    <span className="font-['Satoshi',sans-serif] text-sm text-[#a7a7a7]">Search applications...</span>
                  </div>

                  {/* Application Cards */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-[0.5rem] border border-[#94959a]/30 bg-white transition-colors duration-200 hover:border-[#ff4c00]/40">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#635bff] to-[#96f7d6] flex items-center justify-center text-white font-bold text-xs">
                            ST
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#111]">Frontend Developer</p>
                            <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Stripe • Remote</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold border border-[#ff4c00]/20">Interviewing</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#94959a]/20">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-[#a7a7a7]" />
                          <span className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Applied 3 days ago</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-[0.5rem] border border-[#94959a]/30 bg-white transition-colors duration-200 hover:border-[#ff4c00]/40">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#96bf48] to-[#5e8e3e] flex items-center justify-center text-white font-bold text-xs">
                            SP
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#111]">Software Engineer Intern</p>
                            <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Shopify • Canada</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-bold border border-blue-200">Applied</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#94959a]/20">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-[#a7a7a7]" />
                          <span className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Applied 1 week ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-[0.5rem] border border-[#94959a]/30 bg-white transition-colors duration-200 hover:border-[#ff4c00]/40">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#ff5a5f] to-[#fc642d] flex items-center justify-center text-white font-bold text-xs">
                            AB
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#111]">UI Engineer</p>
                            <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Airbnb • United States</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold border border-yellow-200">Follow-up</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#94959a]/20">
                        <div className="flex items-center gap-2">
                          <Bell className="h-3 w-3 text-yellow-600" />
                          <span className="font-['Satoshi',sans-serif] text-xs text-yellow-700 font-medium">Follow-up due tomorrow</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Job Application Tracking Becomes Frustrating */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                <Zap size={14} />
                Common Challenges
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Why Job Application Tracking <span className="text-[#f55d1d]">Becomes Frustrating</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Applying to multiple jobs without a system quickly becomes overwhelming.
              </p>
            </div>

            <div className="mx-auto max-w-[1000px] space-y-8">
              {/* Pain Points */}
              <div>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Applied to 50 jobs and forgot which recruiter replied?",
                    "Can't remember which company scheduled your interview?",
                    "Lost track of follow-up emails?",
                    "Tired of messy spreadsheets?",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-full border border-[#94959a]/40 bg-white px-4 py-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <X className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <span className="font-['Satoshi',sans-serif] text-[13px] font-bold text-[#3a3a3a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-center font-['Satoshi',sans-serif] text-[15px] font-bold text-black">
                  Manual tracking often leads to:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Forgotten follow-ups",
                    "Missed interview opportunities",
                    "Disorganized notes",
                    "Spreadsheet fatigue",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 rounded-[0.5rem] bg-[#fbf0eb] border border-[#94959a]/20">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <X className="h-3 w-3 text-red-500" />
                      </div>
                      <span className="font-['Satoshi',sans-serif] text-[14px] font-bold text-[#3a3a3a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution spotlight */}
              <div className="relative overflow-hidden rounded-[0.85rem] bg-[#ff4c00] px-8 py-10 sm:px-12 sm:py-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex flex-col items-start gap-4 sm:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                    <Brain className="h-6 w-6 text-[#ff4c00]" />
                  </div>
                  <div>
                    <p className="mb-2 text-lg font-bold text-white">
                      Many job seekers struggle to track application progress effectively.
                    </p>
                    <p className="font-['Satoshi',sans-serif] text-white/90">
                      Our intelligent job application tracker eliminates this stress instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                <Target size={14} />
                Benefits
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Benefits <span className="text-[#f55d1d]">at a Glance</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Track Every Application Without Confusion",
                  desc: "One centralized system replaces spreadsheets.",
                  icon: LayoutDashboard,
                },
                {
                  title: "Never Miss Critical Follow-Ups",
                  desc: "Automated reminders keep you proactive.",
                  icon: Bell,
                },
                {
                  title: "Take Control of Your Job Search",
                  desc: "Complete visibility across all opportunities.",
                  icon: Target,
                },
                {
                  title: "Reduce Job Search Stress",
                  desc: "Know exactly where every application stands.",
                  icon: Shield,
                },
                {
                  title: "Save Hours of Manual Tracking",
                  desc: "Automation handles updates & reminders.",
                  icon: Zap,
                },
                {
                  title: "Stay Fully Organized",
                  desc: "Built for smarter job search organization.",
                  icon: CheckCircle,
                },
              ].map((benefit, index) => (
                <div key={index} className={featureCardBase}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                    <benefit.icon className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-black">
                    {benefit.title}
                  </h3>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-6 text-[#3a3a3a]">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                <Clock size={14} />
                Quick Setup
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                How Our <span className="text-[#f55d1d]">Job Application Status Tracker Works</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Setting up your dashboard takes less than 2 minutes.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Add Your Job Details",
                    desc: "Enter company name, role, application date, and source to create a structured tracker record.",
                  },
                  {
                    step: "2",
                    title: "Update Your Application Stage",
                    desc: "Track statuses like Applied, Interview Scheduled, Offer Received, or Rejected with one-click updates.",
                  },
                  {
                    step: "3",
                    title: "Automate Your Follow-Ups",
                    desc: "Never forget recruiter communication with smart follow-up reminders and interaction tracking.",
                  },
                  {
                    step: "4",
                    title: "Track Progress Visually",
                    desc: "Get clear application stage visibility, prioritized opportunity tracking, and instant progress insights.",
                  },
                  {
                    step: "5",
                    title: "Analyze Outcomes & Optimize",
                    desc: "Make smarter decisions using application metrics, interview conversion tracking, and performance insights.",
                  },
                ].map((item) => (
                  <div key={item.step} className="relative flex items-start gap-6">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] text-lg font-bold text-white shadow-[0_4px_0_#000]">
                      {item.step}
                    </div>
                    <div className="flex-1 rounded-[0.6rem] border border-[#94959a]/40 bg-[#fffdfc] p-6 transition-all duration-300 hover:border-[#ff4c00]/40 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
                      <h3 className="mb-2 text-lg font-bold text-black">
                        {item.title}
                      </h3>
                      <p className="font-['Satoshi',sans-serif] text-[14px] leading-relaxed text-[#3a3a3a]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Status Updates & Other Features */}
        <section className="bg-[#fbf0eb] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className={featureCardBase}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                  <Zap className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-black">
                  Real-Time Status Updates
                </h3>
                <ul className="space-y-3">
                  {["Real-time status updates", "Live dashboard refresh", "Instant tracking visibility"].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={featureCardBase}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                  <Database className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-black">
                  Centralized Job Search Management
                </h3>
                <ul className="space-y-3">
                  {["No scattered records", "No lost notes", "No tracking confusion"].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={featureCardBase}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                  <Globe className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-black">
                  Integrated Job Listing Tracking
                </h3>
                <p className="font-['Satoshi',sans-serif] text-[14px] leading-6 text-[#3a3a3a]">
                  Track applications across multiple platforms using integrated job listing tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Job Application Tracker Delivers Better Results */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                <TrendingUp size={14} />
                Results
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Why This <span className="text-[#f55d1d]">Job Application Tracker Delivers Better Results</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Spreadsheets track data. We deliver clarity &amp; control.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {[
                "Understand your entire job search instantly",
                "Prevent missed follow-ups",
                "Eliminate tracking errors",
                "Reduce mental overload",
                "Prioritize high-impact applications",
                "Stay organized throughout your job search",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 p-5 rounded-[0.5rem] border border-[#94959a]/40 bg-[#fffdfc] hover:border-[#ff4c00]/40 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <span className="font-['Satoshi',sans-serif] text-sm font-bold text-[#3a3a3a]">{item}</span>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[0.85rem] bg-[#ff4c00] p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
              <div className="relative flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                  <BarChart3 className="h-5 w-5 text-[#ff4c00]" />
                </div>
                <h3 className="text-lg font-bold text-white">Users typically experience:</h3>
              </div>
              <div className="relative grid gap-4 sm:grid-cols-2">
                {[
                  "Faster job search organization",
                  "Reduced follow-up mistakes",
                  "Improved recruiter response probability",
                  "Better interview preparation timing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-[0.5rem] bg-white/10 border border-white/20">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="font-['Satoshi',sans-serif] text-sm font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                <Sparkles size={14} />
                Features
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Features Designed for <span className="text-[#f55d1d]">Job Search Control</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Centralized Application Status Dashboard",
                  desc: "Monitor every opportunity from one interface.",
                },
                {
                  title: "Real-Time Application Tracking",
                  desc: "Know exactly where each application stands.",
                },
                {
                  title: "Automated Follow-Up Reminders",
                  desc: "Eliminate missed recruiter interactions.",
                },
                {
                  title: "Smart Priority Tagging System",
                  desc: "Organize using priority tagging, custom status labels, and intelligent workflow categorization.",
                },
                {
                  title: "Interview Tracking & Scheduling",
                  desc: "Never miss critical deadlines.",
                },
                {
                  title: "Structured Recruiter Notes",
                  desc: "Maintain clean communication records.",
                },
                {
                  title: "Application Analytics & Insights",
                  desc: "Measure performance using application metrics, progress tracking, and outcome evaluation.",
                },
                {
                  title: "Cloud-Based Access",
                  desc: "Desktop + Mobile. Anywhere, anytime.",
                },
                {
                  title: "One-Click Status Updates",
                  desc: "Fast, friction-free updates.",
                },

              ].map((feature, index) => (
                <div key={index} className={featureCardBase}>
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-6 text-[#3a3a3a]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Job Seekers Choose */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                <CheckCircle size={14} />
                Why Choose Us
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Why Job Seekers Choose Our <span className="text-[#f55d1d]">Application Status Dashboard</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Job seekers want clarity, efficiency, and control.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Stay fully organized",
                "Prevent missed follow-ups",
                "Reduce job search stress",
                "Save hours of tracking work",
                "Gain full visibility",
                "Improve recruiter response probability",
                "Easily manage job applications",
                "Designed for complete job search organization",
                "Beginner-friendly interface",
                "Secure & confidential data handling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-[#94959a]/40 bg-white px-5 py-3 transition-all duration-200 hover:border-[#ff4c00]/50 hover:bg-[#fbf0eb]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  <span className="font-['Satoshi',sans-serif] text-sm font-bold text-[#3a3a3a]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                <BarChart3 size={14} />
                Comparison
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Job Application Status Tracker vs <span className="text-[#f55d1d]">Spreadsheets</span>
              </h2>
            </div>

            <div className="overflow-hidden rounded-[0.85rem] border border-[#94959a]/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f7e6df] border-b border-[#94959a]/30">
                      <th className="px-6 py-4 text-left text-sm font-bold text-black">Traditional Spreadsheet Tracking</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#f55d1d]">Our Application Status Dashboard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Manual updates required", "One-click status updates"],
                      ["No reminders", "Automated follow-up alerts"],
                      ["Limited visualization", "Interactive dashboard view"],
                      ["Easy to forget follow-ups", "Smart reminder notifications"],
                      ["No analytics", "Application performance insights"],
                      ["Disorganized notes", "Structured recruiter tracking"],
                    ].map(([traditional, ours], index) => (
                      <tr
                        key={index}
                        className={`border-b border-[#94959a]/20 ${index % 2 === 0 ? "bg-white" : "bg-[#fffaf7]"}`}
                      >
                        <td className="px-6 py-4 font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <X className="h-3 w-3 text-gray-400" />
                            </div>
                            <span>{traditional}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-[#ff4c00]" />
                            </div>
                            <span className="font-bold text-black">{ours}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#f7e6df] border-t border-[#94959a]/30 px-6 py-4">
                <p className="font-['Satoshi',sans-serif] text-sm font-bold text-black text-center">
                  Modern job search requires smarter systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                <Globe size={14} />
                For Everyone
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Who Can Use This <span className="text-[#f55d1d]">Job Application Tracker?</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Designed for job seekers at every stage of their career
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers managing applications",
                "Executives applying confidentially",
                "International applicants",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-[#94959a]/40 bg-white px-5 py-3 transition-all duration-200 hover:border-[#ff4c00]/50 hover:bg-[#fbf0eb]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  <span className="font-['Satoshi',sans-serif] text-sm font-bold text-[#3a3a3a]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="relative overflow-hidden rounded-[0.9rem] bg-[#f7e6df] px-8 py-16 text-center md:px-16 md:py-20">
              <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl"></div>
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl"></div>

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm mb-6">
                  <Sparkles size={16} />
                  Get Started Today
                </span>

                <h2 className="mx-auto mb-4 max-w-2xl text-[28px] font-bold leading-tight tracking-[-0.02em] text-black sm:text-[40px]">
                  Ready to Track Your Applications?
                </h2>

                <p className="mx-auto mb-10 max-w-lg font-['Satoshi',sans-serif] text-[15px] leading-7 text-[#3a3a3a]">
                  Stop relying on spreadsheets. Take full control of your job search.
                </p>

                <div className="flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
                    className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-8 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
                  >
                    {ctaLabel}
                    <ArrowRight size={16} />
                  </button>

                  <p className="font-['Satoshi',sans-serif] text-sm text-[#6b6b6b]">
                    Instant setup • No credit card required • Free to start
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">
                <MessageSquare size={14} />
                Support
              </span>
              <h2>
                FAQs
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is a job application status tracker?",
                  a: "A job application status tracker helps you monitor, organize, and manage job applications efficiently.",
                },
                {
                  q: "How does an application status dashboard work?",
                  a: "An application status dashboard provides visual tracking and updates across all applications.",
                },
                {
                  q: "Can I automate follow-up reminders?",
                  a: "Yes. Our job application follow-up tracker includes smart reminders.",
                },
                {
                  q: "Is this better than Excel or Google Sheets?",
                  a: "Yes. Automation, reminders, analytics, and visualization offer major advantages.",
                },
                {
                  q: "Can I track unlimited applications?",
                  a: "Absolutely.",
                },
                {
                  q: "Is this suitable for freshers?",
                  a: "Yes. Beginner-friendly and intuitive.",
                },
                {
                  q: "Can I access it on mobile?",
                  a: "Yes. Cloud-based cross-device access.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy and security are core priorities.",
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
                    <div className="ff-faq-icon">
                      <span>
                        {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                      </span>
                    </div>
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
