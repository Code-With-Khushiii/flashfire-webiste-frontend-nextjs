"use client";
import {
  Sparkles, ArrowRight, CheckCircle, X, Check, BellRing
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

const featureCardBase =
  "flex flex-col rounded-[0.6rem] border border-[#94959a]/60 bg-[#fffdfc] p-6 text-left shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#ff4c00]/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]";

export default function AIJobAlertsPage() {
  const ctaLabel = "Get Started";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-[#111827] min-h-screen font-['Space_Grotesk',sans-serif]">
      <main className="mt-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#f7e6df] py-16 md:py-24">
          <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">

              {/* LEFT - Content */}
              <div className="max-w-xl space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                  <Sparkles size={14} />
                  AI Job Alerts & Smart Job Notification App
                </div>

                <h1 className="text-[34px] font-bold leading-[1.14] tracking-[-0.02em] text-black sm:text-[48px] lg:leading-[1.05]">
                  Stop refreshing job boards and{" "}
                  <span className="text-[#f55d1d]">missing opportunities</span>
                </h1>

                <p className="max-w-[500px] font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a]">
                  With our AI job alerts, you receive instant job alerts the moment relevant roles are posted — allowing you to apply before most candidates even see the listing.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Discover jobs faster",
                    "Apply earlier than competitors",
                    "Eliminate irrelevant alerts",
                    "Reduce job search stress",
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
                    onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
                    className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                  >
                    {ctaLabel}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* RIGHT - Dashboard mockup card */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-[440px] overflow-hidden rounded-[0.75rem] border border-[#94959a]/40 bg-[#fffdfc] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#94959a]/30 bg-white px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[10px] bg-[#ff4c00] flex items-center justify-center shadow-[0_3px_0_#000]">
                        <BellRing className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black uppercase tracking-wide">Live Job Alerts</p>
                        <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Real-time notifications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Live
                    </div>
                  </div>

                  <div className="p-6">
                  {/* Job Cards */}
                  <div className="space-y-3">
                    {[
                      { role: "Frontend Engineer — React", score: "94%", time: "2m ago", tags: ["Remote", "Senior"] },
                      { role: "Software Intern — Remote", score: "89%", time: "5m ago", tags: ["Entry"] },
                      { role: "Product Manager — AI Team", score: "96%", time: "12m ago", tags: ["Hybrid", "Lead"] },
                    ].map((job, idx) => (
                      <div
                        key={idx}
                        className="rounded-[0.5rem] border border-[#94959a]/30 bg-white p-4 transition-colors duration-200 hover:border-[#ff4c00]/40"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-bold text-[#111]">{job.role}</p>
                          <span className="text-xs font-bold text-white bg-[#ff4c00] px-2 py-1 rounded-full">NEW</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {job.tags.map((tag) => (
                            <span key={tag} className="font-['Satoshi',sans-serif] text-xs text-[#78716d] bg-[#f7e6df] px-2 py-0.5 rounded-md">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#ff4c00]">Match: {job.score}</span>
                          <span className="font-['Satoshi',sans-serif] text-xs text-[#a7a7a7]">{job.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-6 pt-6 border-t border-[#94959a]/30 grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-[0.5rem] bg-[#f7e6df]">
                      <p className="text-2xl font-black text-black">2.4k</p>
                      <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d] mt-1">Jobs Today</p>
                    </div>
                    <div className="p-3 rounded-[0.5rem] bg-[#f7e6df]">
                      <p className="text-2xl font-black text-[#ff4c00]">98%</p>
                      <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d] mt-1">Match Rate</p>
                    </div>
                    <div className="p-3 rounded-[0.5rem] bg-[#f7e6df]">
                      <p className="text-2xl font-black text-black">&lt;3s</p>
                      <p className="font-['Satoshi',sans-serif] text-xs text-[#78716d] mt-1">Alert Speed</p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">The Problem</span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Why Job Seekers Struggle with <span className="text-[#f55d1d]">Traditional Job Alerts</span>
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Most job alert systems are slow, generic, and overloaded with irrelevant listings.
              </p>
            </div>

            <div className="mx-auto max-w-[1000px] space-y-8">
              {/* Pain Points */}
              <div>
                <p className="mb-4 text-center font-['Satoshi',sans-serif] text-[15px] font-bold text-black">This leads to:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Delayed notifications",
                    "Spam job emails",
                    "Missed high-fit roles",
                    "Endless filtering",
                    "Application burnout",
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

              {/* Solution spotlight */}
              <div className="relative overflow-hidden rounded-[0.85rem] bg-[#ff4c00] px-8 py-10 sm:px-12 sm:py-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <p className="mb-3 text-xl font-bold text-white">
                      Tired of refreshing LinkedIn every hour?
                    </p>
                    <p className="mb-2 font-['Satoshi',sans-serif] text-white/90">
                      Frustrated to see &quot;500+ applicants&quot; have already applied?
                    </p>
                    <p className="font-['Satoshi',sans-serif] text-sm text-white/75">
                      By the time traditional alerts arrive, the opportunity may already be saturated.
                    </p>
                  </div>
                  <div className="rounded-[0.6rem] border border-white/20 bg-white/10 p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                        <CheckCircle className="w-5 h-5 text-[#ff4c00]" />
                      </div>
                      <p className="text-lg font-bold text-white">The Solution</p>
                    </div>
                    <p className="font-['Satoshi',sans-serif] text-[14px] leading-relaxed text-white/90">
                      Our AI job alerts platform solves this using real-time job updates and intelligent filtering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">Benefits</span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Benefits <span className="text-[#f55d1d]">at a Glance</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Apply Before the Crowd", desc: "Receive opportunities within seconds and be the first to apply." },
                { title: "Never Miss Relevant Jobs", desc: "Precision-based matching engine finds your perfect roles." },
                { title: "Eliminate Irrelevant Listings", desc: "AI-driven filtering logic removes spam and noise." },
                { title: "Reduce Weekly Job Search Time", desc: "Automation replaces manual browsing and scrolling." },
                { title: "Avoid Application Fatigue", desc: "Apply only to high-fit roles that match your skills." },
                { title: "Smarter Career Discovery", desc: "Powered by AI-powered career alerts and insights." },
              ].map((benefit, index) => (
                <div key={index} className={featureCardBase}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                    <CheckCircle className="w-5 h-5 text-[#ff4c00]" />
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

        {/* How It Works */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">

  <div className="mx-auto max-w-[900px]">

    {/* Heading */}
    <div className="mx-auto mb-16 max-w-[640px] text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
        How It Works
      </span>

      <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
        How Our <span className="text-[#f55d1d]">AI Job Alerts System Works</span>
      </h2>

      <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
        Setting up your alerts takes less than 2 minutes.
      </p>
    </div>

    <div className="relative">

      {/* vertical timeline */}
      <div className="hidden md:block absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

      <div className="space-y-6">

        {[
          { step: "1", title: "Create Your Career Profile", desc: "Enter your skills, experience, preferred roles, and location preferences." },
          { step: "2", title: "AI Analyzes Your Profile", desc: "Our engine uses intelligent AI job matching to understand your expertise, career direction, and role suitability." },
          { step: "3", title: "Smart Matching Algorithm Filters Jobs", desc: "Applies skills-based filtering, experience alignment, location relevance, and context-aware matching." },
          { step: "4", title: "Receive Instant Job Alerts", desc: "Jobs are delivered via app notifications, email alerts, and SMS alerts (optional) within seconds." },
          { step: "5", title: "Apply Immediately", desc: "Apply before listings get crowded, increase interview probability, and reduce missed opportunities." },
        ].map((item) => (

          <div
            key={item.step}
            className="relative flex items-start gap-6"
          >

            {/* Step circle */}
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] text-lg font-bold text-white shadow-[0_4px_0_#000]">
              {item.step}
            </div>

            {/* Card */}
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

        {/* Features Section */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">Features</span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Features of Our <span className="text-[#f55d1d]">AI-Powered Job Notification App</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Real-Time AI Job Alerts",
                "Smart Job Matching Algorithm",
                "Instant Job Alerts Within Seconds",
                "Personalized Job Recommendations",
                "Advanced Filtering Controls",
                "Multi-Channel Notification Support",
                "Save Jobs & Track Applications",
                "One-Click Apply Integration",
                "Dashboard to Manage Alerts",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-[0.6rem] border border-[#94959a]/40 bg-white p-5 transition-all duration-200 hover:border-[#ff4c00]/50 hover:-translate-y-[2px] hover:shadow-[0_6px_14px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] transition-colors">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[14px] font-bold text-black">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">Comparison</span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                AI Job Alerts vs <span className="text-[#f55d1d]">Traditional Job Alerts</span>
              </h2>
            </div>

            <div className="relative grid gap-6 sm:grid-cols-2">
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#94959a]/40 bg-white text-[11px] font-extrabold uppercase tracking-wide text-gray-400 shadow-md">
                  vs
                </span>
              </div>

              {/* Traditional */}
              <div className="rounded-[0.85rem] border border-[#94959a]/40 bg-[#fbf0eb] p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-[#94959a]/30 pb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white">
                    <X className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    Traditional Job Alerts
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Generic email blasts",
                    "Delayed notifications",
                    "Manual filtering required",
                    "Limited customization",
                    "High irrelevant listings",
                    "Static filters",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-500">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                        <X className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <span className="font-['Satoshi',sans-serif] text-[14px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Job Alerts — spotlight card */}
              <div className="relative overflow-hidden rounded-[0.85rem] bg-[#ff4c00] p-8 shadow-[0_10px_30px_rgba(255,76,0,0.25)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
                <div className="absolute top-0 right-0 rounded-bl-[0.6rem] bg-white px-4 py-2 text-xs font-bold text-[#ff4c00]">
                  RECOMMENDED
                </div>
                <div className="relative mb-6 flex items-center gap-3 border-b border-white/20 pb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                    <CheckCircle className="w-5 h-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    AI Job Alerts Platform
                  </h3>
                </div>
                <ul className="relative space-y-4">
                  {[
                    "Personalized job recommendations",
                    "Instant job alerts",
                    "AI-powered job matching",
                    "Smart preference learning",
                    "Precision-based targeting",
                    "Adaptive AI matching",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="font-['Satoshi',sans-serif] text-[14px] font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#ff4c00] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-2 divide-x divide-white/20 lg:grid-cols-4">
              {[
                { value: "50k+", label: "Active Users" },
                { value: "1M+", label: "Jobs Matched" },
                { value: "94%", label: "Success Rate" },
                { value: "<3s", label: "Avg. Alert Time" },
              ].map((stat, idx) => (
                <div key={idx} className="px-4 py-6 text-center">
                  <p className="mb-2 text-3xl font-black text-white md:text-4xl">{stat.value}</p>
                  <p className="font-['Satoshi',sans-serif] text-sm font-medium text-white/85">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Use - Tag Cloud Style */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">For Everyone</span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Who Can Use This <span className="text-[#f55d1d]">Job Notification App?</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers & contractors",
                "Executives & senior professionals",
                "International applicants",
                "Tech & non-tech professionals",
              ].map((item, idx) => (
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

        {/* FAQ Section - Modern Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">FAQ</span>
              <h2>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                { q: "What are AI job alerts?", a: "AI job alerts use intelligent algorithms to notify you about relevant job openings instantly." },
                { q: "How does a job notification app work?", a: "A job notification app analyzes your skills and preferences to deliver targeted alerts." },
                { q: "Are instant job alerts truly real-time?", a: "Yes. Our instant job alerts trigger immediately after job postings go live." },
                { q: "How accurate are AI job recommendations?", a: "Accuracy improves continuously using AI job matching." },
                { q: "Can I customize my alerts?", a: "Absolutely. Filter by location, salary, remote jobs, and more." },
                { q: "Is this AI job alerts app free to use?", a: "Yes. Flexible access options available." },
                { q: "How quickly will I receive notifications?", a: "Real-time alerts and daily job notifications are available." },
                { q: "Is my data secure?", a: "Yes. Privacy and security are core priorities." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""}`}
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

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
  <div className="mx-auto max-w-[1100px]">

    <div className="relative overflow-hidden rounded-[0.9rem] bg-[#f7e6df] px-8 py-16 text-center md:px-16 md:py-20">

      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl"></div>

      <div className="relative z-10">

        {/* Heading */}
        <h2 className="mx-auto mb-4 max-w-2xl text-[28px] font-bold leading-tight tracking-[-0.02em] text-black sm:text-[40px]">
          Ready to Get Instant Job Alerts?
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-10 max-w-lg font-['Satoshi',sans-serif] text-[15px] leading-7 text-[#3a3a3a]">
          Stop missing opportunities. Start applying before the crowd.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">

          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
            className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-8 text-[16px] font-bold text-white shadow-[0_6px_0_#e64400] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </button>

          {/* trust pills */}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {[
              "Instant setup",
              "No credit card required",
              "Free to start",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-[#94959a]/30 bg-white px-4 py-2 shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-[#ff4c00]" />
                <span className="font-['Satoshi',sans-serif] text-sm font-medium text-[#3a3a3a]">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}
