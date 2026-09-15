"use client";

import { MailCheck, Clock, Sparkles, FileText, Mail, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { getLocalePrefix } from "@/src/utils/locale";

const featureCardBase =
  "flex flex-col rounded-[0.6rem] border border-[#94959a]/60 bg-[#fffdfc] p-6 text-left shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#ff4c00]/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]";

export default function AIFollowUpEmailsPage() {
  const ctaLabel = "Generate Email";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const updateCtaUrl = (basePath: string, label: string) => {
    if (typeof window === "undefined") return;
    const slug = label.trim().replace(/\s+/g, "-");
    const normalizedBase = `${getLocalePrefix(window.location.pathname)}${basePath}`;
    const newUrl = `${normalizedBase}/${slug}`;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
  };

  return (
    <div className="bg-white text-[#111827] min-h-screen font-['Space_Grotesk',sans-serif]">
      <main className="mt-0">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#f7e6df] py-16 md:py-24">
          <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">

            {/* LEFT */}
            <div className="max-w-xl space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                <Sparkles size={14} />
                AI Follow-Up Email Generator
              </div>

              <h1 className="text-[34px] font-bold leading-[1.14] tracking-[-0.02em] text-black sm:text-[48px] lg:leading-[1.05]">
                AI Follow-Up Email Generator for Job{" "}
                <span className="text-[#f55d1d]">Applications &amp; Interviews</span>
              </h1>

              <p className="max-w-[500px] font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a]">
                Don&apos;t let a recruiter&apos;s silence cost you opportunities. Instantly create
                powerful follow-up emails after job applications and interviews in under 60 seconds.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: MailCheck, text: "Write like a top candidate" },
                  { icon: Clock, text: "Eliminate tone & wording mistakes" },
                  { icon: Sparkles, text: "Improve recruiter response probability" },
                  { icon: FileText, text: "Save hours of writing effort" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-[0.5rem] bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-[#ff4c00]/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span className="font-['Satoshi',sans-serif] text-[13px] font-bold text-[#111]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-follow-up-email-generator", ctaLabel)}
                  className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  {ctaLabel}
                  <ArrowRight size={16} />
                </button>
                <span className="font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">Free to use</span>
              </div>
            </div>

            {/* RIGHT - Preview Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] overflow-hidden rounded-[0.75rem] border border-[#94959a]/40 bg-[#fffdfc] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 border-b border-[#94959a]/30 bg-white px-6 py-5">
                  <div className="w-3 h-3 rounded-full bg-[#ff4c00]/30"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ff4c00]/20"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ff4c00]/10"></div>
                  <span className="ml-auto font-['Satoshi',sans-serif] text-xs text-[#78716d] font-medium">Preview</span>
                </div>

                <div className="p-6">
                  <div className="rounded-[0.5rem] border border-[#94959a]/30 bg-white p-5 space-y-3 text-sm text-[#3a3a3a]">
                    <div className="flex items-center gap-2 font-['Satoshi',sans-serif] text-xs text-[#78716d] mb-2">
                      <Mail className="h-3 w-3" />
                      <span>To: recruiter@company.com</span>
                    </div>
                    <p className="font-bold text-black text-sm">Subject: Quick follow‑up on my application</p>
                    <div className="space-y-2 font-['Satoshi',sans-serif] text-[#3a3a3a] leading-relaxed text-sm">
                      <p>Hi [Recruiter Name],</p>
                      <p>
                        I&apos;m writing to follow up on my application for the{" "}
                        <span className="font-bold text-[#ff4c00]">Frontend Engineer</span> role.
                      </p>
                      <p>I remain very excited about the opportunity...</p>
                    </div>
                    <div className="pt-3 border-t border-[#94959a]/20 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-[#ff4c00]" />
                      </div>
                      <span className="font-['Satoshi',sans-serif] text-xs text-[#78716d]">Generated by Flashfire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY FOLLOW-UPS ARE HARD */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                Common Challenges
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Why Job Seekers Struggle with Follow-Up Emails
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Writing follow-ups often feels uncomfortable and uncertain.
              </p>
            </div>

            <div className="mx-auto max-w-[1000px] space-y-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Questions Block */}
                <div className="lg:col-span-2 rounded-[0.85rem] border border-[#94959a]/40 bg-[#fffdfc] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-[10px] bg-[#ff4c00]/10 flex items-center justify-center">
                      <span className="text-xl">❓</span>
                    </div>
                    <h3 className="text-lg font-bold text-black">Common Questions</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "What should I say?",
                      "Will I sound desperate?",
                      "Is my tone professional enough?",
                      "What subject line works best?",
                      "When is the right follow-up timing?",
                      "Will I get a response?",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-[0.5rem] bg-white border border-[#94959a]/20">
                        <div className="h-2 w-2 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
                        <span className="font-['Satoshi',sans-serif] text-[14px] font-bold text-[#3a3a3a]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Card */}
                <div className="rounded-[0.85rem] border border-[#94959a]/40 bg-[#fbf0eb] p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-[10px] bg-white flex items-center justify-center mb-5">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-base font-bold text-black mb-4">Poorly written emails often lead to:</h3>
                  <ul className="space-y-3">
                    {["No responses", "Weak impressions", "Missed opportunities", "Damaged credibility"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-['Satoshi',sans-serif] text-[14px] font-medium text-[#3a3a3a]">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution Banner */}
              <div className="relative overflow-hidden rounded-[0.85rem] bg-[#ff4c00] px-8 py-10 sm:px-12 sm:py-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Silence doesn&apos;t always mean rejection</h3>
                    <p className="font-['Satoshi',sans-serif] text-white/90 leading-relaxed">
                      Often, a simple professional follow-up can revive your job application status and get you noticed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateCtaUrl(
                        "/ai-follow-up-email-generator",
                        "Create Your Follow-Up Email Instantly"
                      )
                    }
                    className="inline-flex h-[54px] w-full md:w-auto md:shrink-0 touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-center text-[15px] font-bold text-[#ff4c00] shadow-[0_6px_0_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-0.5"
                  >
                    <span className="whitespace-normal">Create Your Follow-Up Email</span>
                    <ArrowRight size={16} className="shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                Benefits
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Benefits at a Glance
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Write Perfect Emails Instantly",
                  desc: "No more second-guessing your words.",
                  icon: Sparkles,
                },
                {
                  title: "Increase Recruiter Response Rates",
                  desc: "Clear, confident messaging that stands out.",
                  icon: MailCheck,
                },
                {
                  title: "Send Error-Free Emails Every Time",
                  desc: "Eliminate grammar & tone mistakes automatically.",
                  icon: CheckCircle2,
                },
                {
                  title: "Optimize Subject Lines Automatically",
                  desc: "Smart subject line examples included.",
                  icon: FileText,
                },
                {
                  title: "Eliminate Follow-Up Anxiety",
                  desc: "AI handles tone, clarity & structure.",
                  icon: Users,
                },
                {
                  title: "Save Time After Every Application",
                  desc: "Emails generated in under 60 seconds.",
                  icon: Clock,
                },
              ].map((item) => (
                <div key={item.title} className={featureCardBase}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                    <item.icon className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-black">{item.title}</h3>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-6 text-[#3a3a3a]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-center mt-10">
              <div className="rounded-[0.6rem] border border-[#94959a]/40 bg-white p-6 inline-flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                <p className="font-['Satoshi',sans-serif] text-[14px] text-[#3a3a3a]">
                  Protect your professional image with every email — always maintain a polite and concise message.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] mb-4">
              Social Proof
            </span>
            <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px] mb-12">
              Thousands of candidates already use our{" "}
              <span className="text-[#f55d1d]">AI follow-up email generator</span>
            </h2>

            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { icon: Users, text: "Used by job seekers across industries" },
                { icon: FileText, text: "Designed for real hiring workflows" },
                { icon: Mail, text: "Built for professional recruiter communication" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 rounded-[0.6rem] border border-[#94959a]/40 bg-[#fffdfc] p-6"
                >
                  <div className="w-14 h-14 rounded-[10px] bg-[#ff4c00]/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-[#ff4c00]" />
                  </div>
                  <span className="font-['Satoshi',sans-serif] text-sm font-bold text-[#3a3a3a] text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <div className="mx-auto mb-16 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                Process
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                How Our AI Follow-Up Email Generator Works
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Creating a powerful job application follow-up email has never been easier.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Enter Basic Details",
                    desc: "Provide essential context:",
                    bullets: [
                      "Job title",
                      "Company name",
                      "Application date",
                      "Recruiter name (optional)",
                      "Interview stage (if applicable)",
                    ],
                    note: "This helps personalize your follow-up email after a job application.",
                  },
                  {
                    step: "2",
                    title: "AI Analyzes Email Context",
                    desc: "Our engine evaluates:",
                    bullets: [
                      "Hiring stage",
                      "Company communication tone",
                      "Desired messaging style",
                      "Follow-up timing relevance",
                      "Missing recruiter details",
                    ],
                    note: "Ensuring precision in every message.",
                  },
                  {
                    step: "3",
                    title: "Smart Email Generation",
                    desc: "The AI instantly creates:",
                    bullets: [
                      "Polished follow-up emails after job applications",
                      "Multiple recruiter follow-up email variations",
                      "High-impact interview follow-up email drafts",
                    ],
                    note: "All use proven follow-up email template logic.",
                  },
                  {
                    step: "4",
                    title: "Personalization & Customization",
                    desc: "Refine your message easily:",
                    bullets: [
                      "Adjust tone (formal/confident/polite)",
                      "Modify length",
                      "Add achievements",
                      "Insert a stronger call to action",
                      "Attach supporting materials",
                    ],
                  },
                  {
                    step: "5",
                    title: "Copy, Send, or Automate",
                    desc: "Finalize and send:",
                    bullets: [
                      "One-click copy",
                      "Email-ready formatting",
                      "Supports automated follow-up emails",
                    ],
                    note: "Generate your email in 60 seconds.",
                  },
                ].map((item) => (
                  <div key={item.step} className="relative flex items-start gap-6">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] text-lg font-bold text-white shadow-[0_4px_0_#000]">
                      {item.step}
                    </div>

                    <div className="flex-1 rounded-[0.6rem] border border-[#94959a]/40 bg-[#fffdfc] p-6 md:p-8 transition-all duration-300 hover:border-[#ff4c00]/40 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
                      <h3 className="mb-2 text-lg font-bold text-black">{item.title}</h3>
                      <p className="font-['Satoshi',sans-serif] text-[14px] text-[#3a3a3a] mb-4">{item.desc}</p>
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                          {item.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-center gap-2 bg-white rounded-[0.4rem] px-3 py-2.5 border border-[#94959a]/20">
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              <span className="font-['Satoshi',sans-serif] text-sm text-[#3a3a3a]">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="inline-flex items-center gap-2 font-['Satoshi',sans-serif] text-sm font-bold text-[#ff4c00] bg-[#ff4c00]/10 px-4 py-2 rounded-[0.4rem]">
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

        {/* BUILT-IN INTELLIGENCE */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                Features
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Built-In Email Intelligence
              </h2>
              <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-7 text-[#3a3a3a]">
                Every email is backed by smart logic designed for recruiter communication.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Smart Template Selection",
                  desc: "Automatic follow-up email template selection based on stage and context.",
                },
                {
                  title: "Optimized Subject Lines",
                  desc: "Subject line examples designed for opens and replies.",
                },
                {
                  title: "Job-Stage Specific Messaging",
                  desc: "Messaging tailored for post-application, recruiter, and interview follow-ups.",
                },
                {
                  title: "Recruiter Communication Optimization",
                  desc: "Lines crafted to respect time, show interest, and stay concise.",
                },
                {
                  title: "Interview Follow-Up Focus",
                  desc: "Precision interview follow-up email generation for stronger impressions.",
                },

                {
                  title: "ATS-Friendly Email Formatting",
                  desc: "Follow-up emails structured for clarity, readability, and professional impact.",
                },
              ].map((item, idx) => (
                <div key={item.title} className={featureCardBase}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#ff4c00]/10">
                    <span className="text-[#ff4c00] font-bold text-lg">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-black">{item.title}</h3>
                  <p className="font-['Satoshi',sans-serif] text-[14px] leading-6 text-[#3a3a3a]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                Capabilities
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Key Features Designed for Maximum Response
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "AI-Powered Follow-Up Email Templates", desc: "Professionally structured emails generated instantly." },
                { title: "Smart Subject Line Optimization", desc: "High-engagement wording that gets opened." },
                { title: "Job-Stage Specific Emails", desc: "Generate emails for applications, recruiters, hiring managers, and interviews." },
                { title: "Automated Follow-Up Scheduling", desc: "Supports intelligent automated follow-up emails." },
                { title: "Tone & Professionalism Control", desc: "Always maintain a professional, confident follow-up voice." },
                { title: "Grammar & Clarity Checks", desc: "Error-free emails without manual proofreading." },
                { title: "Multiple Variations", desc: "Test different versions to see what works best." },
                { title: "Under 60 Seconds", desc: "Generate complete emails in less than a minute." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[0.6rem] border border-[#94959a]/40 bg-white p-5 transition-all duration-200 hover:border-[#ff4c00]/50 hover:-translate-y-[2px] hover:shadow-[0_6px_14px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-9 h-9 rounded-[8px] bg-[#ff4c00]/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-[15px] font-bold mb-2 text-black leading-tight">{item.title}</h3>
                  <p className="font-['Satoshi',sans-serif] text-[13px] leading-5 text-[#3a3a3a]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">
                Comparison
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                AI Follow-Up Email Generator vs Writing Manually
              </h2>
            </div>

            <div className="overflow-hidden rounded-[0.85rem] border border-[#94959a]/40 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-[#f7e6df]">
                    <th className="px-6 py-5 font-bold text-black text-left">Feature</th>
                    <th className="px-6 py-5 font-bold text-[#f55d1d] text-left">AI Follow-Up Email Generator</th>
                    <th className="px-6 py-5 font-bold text-gray-500 text-left">Manual Writing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Time Required", ai: "Under 1 minute", manual: "15–30 minutes" },
                    { feature: "Personalization", ai: "AI-optimized", manual: "Depends on skill" },
                    { feature: "Subject Line", ai: "Optimized automatically", manual: "Trial & error" },
                    { feature: "Tone", ai: "Professionally balanced", manual: "May sound unsure" },
                    { feature: "Job-Specific Customization", ai: "Dynamic", manual: "Generic" },
                    { feature: "Automation", ai: "Supports automated follow-up emails", manual: "Not available" },
                    { feature: "Error-Free", ai: "Built-in checks", manual: "Manual proofreading" },
                  ].map((row, idx) => (
                    <tr key={row.feature} className={`border-t border-[#94959a]/20 ${idx % 2 === 0 ? "bg-white" : "bg-[#fffaf7]"}`}>
                      <td className="px-6 py-4 font-['Satoshi',sans-serif] font-bold text-[#3a3a3a]">{row.feature}</td>
                      <td className="px-6 py-4 font-['Satoshi',sans-serif] text-[#3a3a3a]">
                        <span className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-[#ff4c00]" />
                          </div>
                          {row.ai}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-['Satoshi',sans-serif] text-gray-500">{row.manual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            <p className="mt-6 text-center font-['Satoshi',sans-serif] text-base text-[#3a3a3a]">
              Modern job search requires smarter communication tools.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS */}
        <section className="bg-[#fbf0eb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm">
                Audience
              </span>
              <h2 className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px]">
                Who Can Use This AI Follow-Up Email Generator?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Freelancers & remote job seekers",
                "Professionals applying to multiple roles",
                "Candidates checking job application status",
                "Anyone sending a recruiter follow-up email",
                "Interview candidates crafting an interview follow-up email",
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

        {/* FINAL CTA */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid lg:grid-cols-2 gap-10 items-center rounded-[0.9rem] border border-[#94959a]/40 bg-[#f7e6df] p-8 md:p-14 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl"></div>

              {/* LEFT CONTENT */}
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f55d1d] shadow-sm mb-5">
                  Get Started
                </span>
                <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-[34px] mb-5">
                  Write Smarter Follow-Up Emails with AI
                </h2>

                <p className="font-['Satoshi',sans-serif] text-[15px] leading-7 text-[#3a3a3a] mb-3">
                  Don&apos;t let your application get buried. Don&apos;t let recruiters forget your profile.
                </p>

                <p className="font-['Satoshi',sans-serif] text-[14px] text-[#6b6b6b] mb-8">
                  With our AI follow-up email generator, you can create professional emails instantly.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    updateCtaUrl(
                      "/ai-follow-up-email-generator",
                      "Generate Email"
                    )
                  }
                  className="inline-flex h-[54px] touch-manipulation items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-8 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
                >
                  {ctaLabel}
                </button>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {["Instant generation", "No writing skills required", "Secure & private"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 font-['Satoshi',sans-serif] text-xs font-bold text-[#3a3a3a] bg-white px-3 py-1.5 rounded-full shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#ff4c00]" /> {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT FEATURE PANEL */}
              <div className="relative rounded-[0.75rem] border border-[#94959a]/30 bg-white p-6 md:p-8">
                <div className="space-y-4">
                  {[
                    "Create professional emails instantly",
                    "Improve response probability",
                    "Save hours of writing",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-[0.5rem] bg-[#fffdfc] border border-[#94959a]/20">
                      <div className="w-11 h-11 rounded-[10px] bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <p className="font-bold text-black text-base">{text}</p>
                    </div>
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "When should I send a follow-up email?",
                  a: "For applications: 5–7 business days after applying. For interviews: within 24–48 hours. Flashfire suggests optimal timing based on the stage and your application date.",
                },
                {
                  q: "Will follow-ups make me look desperate?",
                  a: "Not if done right. Flashfire crafts professional, confident emails that show genuine interest without being pushy. Timing and tone matter.",
                },
                {
                  q: "Can I customize the generated emails?",
                  a: "Absolutely. Use Flashfire&apos;s templates as a starting point, then personalize with specific details about your conversation or the role.",
                },
                {
                  q: "What if I don't hear back after following up?",
                  a: "One follow-up is usually enough. If there&apos;s no response after 7–10 days, it&apos;s likely the role has moved forward. Flashfire helps you move on strategically.",
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
