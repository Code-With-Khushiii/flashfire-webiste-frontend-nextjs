"use client";

import { CheckCircle, FileText, Sparkles, Briefcase, Target, TrendingUp, Award, BarChart3, Users, XCircle, ArrowRight } from "lucide-react";
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

export default function AIResumeBuilderPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-[#111827] min-h-screen">


      <main className="mt-0">

        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
  <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-[#fff7f3]" />

  <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 md:px-6 lg:px-8 lg:grid-cols-12 lg:items-center">

      {/* LEFT */}
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Resume Builder
        </div>

        <h1 className="text-[34px] font-extrabold leading-[1.14] text-black sm:text-[52px] lg:leading-[1.05]">
          AI Resume Builder for <span className="text-[#ff4c00]">Job Seekers</span>
        </h1>

        <div className="max-w-xl space-y-4">
          <p className="text-[17px] font-semibold leading-8 text-gray-800">
            Stop wasting hours writing resumes that never get responses.
          </p>
          <p className="text-[16px] font-medium leading-8 text-gray-600">
            With our AI resume builder, you can create a recruiter-ready, ATS-optimized resume in minutes — even if you have zero writing experience.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-resume-builder", "It's Free to Start")}
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-7 text-[14px] font-bold text-white shadow-[0_3px_0_black] transition hover:opacity-90"
          >
            It's Free to Start
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
          {[
            "Get noticed by recruiters faster",
            "Improve your ATS match score instantly",
            "Turn your experience into powerful achievements",
          ].map((text) => (
            <div key={text} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10">
                <CheckCircle className="h-3.5 w-3.5 text-[#ff4c00]" />
              </div>
              <span className="text-[13px] font-semibold leading-snug text-gray-700">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Dashboard mockup card */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[440px]">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c00] shadow-sm">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">AI Resume Optimization</p>
                  <p className="text-xs text-gray-500">Real-time analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-green-700">Live</span>
              </div>
          </div>

          <div className="px-6 py-6">
            <div className="mb-5 rounded-2xl border border-[#ffd6c2] bg-[#fff7f3] p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#ff4c00]"></div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-800">Resume Summary</p>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                Frontend Developer with experience in React, JavaScript, and modern UI development.
              </p>
            </div>

            <div className="space-y-3">
              {[
                ["ATS Compatibility", "Optimized", "95%"],
                ["Keyword Match", "Strong", "88%"],
                ["Role Relevance", "High", "92%"],
              ].map(([label, value, score]) => (
                <div key={label} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff4c00]/10">
                      <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400">{score}</span>
                    <span className="rounded-full bg-[#ff4c00]/10 px-3 py-1 text-sm font-bold text-[#ff4c00]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Overall Score</span>
                <span className="text-lg font-bold text-[#ff4c00]">91%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-4 -right-4 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-xs font-bold text-gray-700">ATS Ready</span>
          </div>
        </div>

        <div className="absolute -bottom-4 -left-4 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff4c00]/10">
              <Sparkles className="h-4 w-4 text-[#ff4c00]" />
            </div>
            <span className="text-xs font-bold text-gray-700">AI Enhanced</span>
          </div>
        </div>
      </div>
      </div>

  </div>
</section>


        {/* Real-Time Resume Score Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-14 max-w-[640px]">
              <h2 className="text-[32px] font-extrabold leading-[1.1] text-black sm:text-[42px]">
                Real-Time Resume Score & <span className="text-[#ff4c00]">Improvements</span>
              </h2>
              <p className="mt-5 text-[17px] font-medium leading-8 text-gray-600">
                Our system continuously evaluates your resume.
              </p>
            </div>

            <div className="grid gap-5">
              <article className="rounded-3xl border border-[#ff4c00]/20 bg-[#fff7f3] p-8 sm:flex sm:items-start sm:gap-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4c00] text-white">
                  <BarChart3 size={22} strokeWidth={2.5} />
                </span>
                <div className="mt-6 sm:mt-0">
                  <h3 className="text-xl font-bold text-black">Resume strength scoring</h3>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-gray-600">
                    Get instant feedback on your resume&apos;s overall quality and competitiveness.
                  </p>
                </div>
              </article>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Keyword effectiveness analysis",
                    desc: "See how well your resume matches job descriptions and ATS requirements.",
                    icon: <Target size={20} strokeWidth={2.5} />,
                  },
                  {
                    title: "Optimization suggestions",
                    desc: "Receive actionable recommendations to improve your resume's performance.",
                    icon: <TrendingUp size={20} strokeWidth={2.5} />,
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff4c00]">
                      {item.icon}
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-black">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-7 text-gray-600">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
            <p className="mt-8 text-center font-medium text-gray-600">
              Helping you compete with top candidates.
            </p>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Outcomes You Can <span className="text-[#ff4c00]">Expect</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                This isn&apos;t just another resume maker online.
              </p>
              <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-7 text-gray-500">
                Job seekers use our professional resume builder to achieve real results:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Create resumes 80% faster",
                "Improve ATS match instantly",
                "Increase recruiter visibility",
                "Reduce resume rejection risk",
                "Apply with confidence",
                "Optimize for ATS & recruiters",
              ].map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#ff4c00]/40 hover:bg-[#fff7f3]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10 text-[#ff4c00]">
                    <CheckCircle size={18} strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] font-bold text-black">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-14 max-w-[720px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Key Benefits of Our <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: "1",
                  title: "Get More Interview Calls",
                  desc: "Optimized resumes rank higher in recruiter searches.",
                },
                {
                  num: "2",
                  title: "Eliminate Resume Guesswork",
                  desc: "AI-driven keyword & content optimization.",
                },
                {
                  num: "3",
                  title: "Write Like a Professional — Instantly",
                  desc: "No writing expertise required.",
                },
                {
                  num: "4",
                  title: "Pass Applicant Tracking Systems",
                  desc: "Built-in ATS optimization (applicant tracking system).",
                },
                {
                  num: "5",
                  title: "Stand Out From Generic Applicants",
                  desc: "Create a tailored resume/resume tailoring for every job.",
                },
                {
                  num: "6",
                  title: "Save Hours of Resume Editing",
                  desc: "Smart automation handles formatting & structure.",
                },
                {
                  num: "7",
                  title: "Boost Resume Confidence",
                  desc: "Know that your resume is competitive before applying.",
                },
                {
                  num: "8",
                  title: "Match Jobs Faster with AI",
                  desc: "Instantly align your resume with job descriptions for better results.",
                },
                {
                  num: "9",
                  title: "Increase Job Offer Chances",
                  desc: "Stronger resumes lead to better interview and hiring outcomes.",
                },
              ].map((benefit) => (
                <div
                  key={benefit.num}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c00]/10 text-sm font-extrabold text-[#ff4c00]">
                    {benefit.num.padStart(2, "0")}
                  </span>
                  <h3 className="mb-2.5 mt-5 text-lg font-bold text-black">{benefit.title}</h3>
                  <p className="text-[14px] leading-6 text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#fff7f3] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Features Designed for <span className="text-[#ff4c00]">Modern Job Seekers</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Our AI resume builder combines intelligence with simplicity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "ATS-friendly formatting",
                "AI-generated bullet points",
                "Smart keyword optimization",
                "Modern resume templates",
                "Resume tailoring engine",
                "Built-in cover letter generator",
                "Cloud storage & editing",
                "Resume creation in under 10 minutes",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#ff4c00]/40 hover:shadow-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10">
                    <CheckCircle className="h-3.5 w-3.5 text-[#ff4c00]" />
                  </span>
                  <span className="text-[14px] font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Social Proof & <span className="text-[#ff4c00]">Trust Signals</span>
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-gray-600">
                Thousands of job seekers already use our resume builder online.
              </p>
            </div>

            <div className="mb-6 grid gap-5 sm:grid-cols-3">
              {[
                {
                  title: "Trusted by growing numbers of candidates",
                  icon: <Users size={22} strokeWidth={2.5} />,
                },
                {
                  title: "Used across multiple industries",
                  icon: <Briefcase size={22} strokeWidth={2.5} />,
                },
                {
                  title: "Designed for modern hiring systems",
                  icon: <Award size={22} strokeWidth={2.5} />,
                },

              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
                >
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff4c00]">
                    {item.icon}
                  </span>
                  <p className="font-bold text-black">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-3xl border border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ["500+", "Job seekers trust us"],
                ["90%", "Users finish resumes under 10 minutes"],
                ["Proven", "ATS optimization engine"],
              ].map(([stat, label]) => (
                <div key={label} className="bg-[#fff7f3] px-6 py-10 text-center">
                  <div className="mb-2 text-4xl font-extrabold text-[#ff4c00]">{stat}</div>
                  <div className="text-sm font-medium text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-12 text-center">
              <h2 className="text-[26px] font-extrabold leading-tight text-black sm:text-[32px]">
                AI Resume Builder vs <span className="text-[#ff4c00]">Traditional Resume Makers</span>
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 sm:grid">
                <span className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Feature</span>
                <span className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Traditional Resume Tools</span>
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">Our AI Resume Builder</span>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  {
                    feature: "Content Creation",
                    traditional: "Manual writing required",
                    ai: "AI-generated content",
                  },
                  {
                    feature: "Bullet Points",
                    traditional: "Generic bullet points",
                    ai: "Achievement-driven statements",
                  },
                  {
                    feature: "Templates",
                    traditional: "Static templates",
                    ai: "Dynamic keyword optimization",
                  },
                  {
                    feature: "Formatting",
                    traditional: "Basic formatting",
                    ai: "ATS-friendly resume structure",
                  },
                  {
                    feature: "Editing",
                    traditional: "Time-consuming editing",
                    ai: "Automated improvements",
                  },
                  {
                    feature: "Job Targeting",
                    traditional: "One resume for all jobs",
                    ai: "Tailored resumes for each job",
                  },
                ].map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[1fr_1.4fr_1.4fr] sm:items-center sm:gap-4"
                  >
                    <span className="text-[14px] font-extrabold text-black">{row.feature}</span>
                    <span className="flex items-center gap-2 text-[14px] text-gray-500">
                      <XCircle size={15} className="shrink-0 text-gray-300" />
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
            <p className="mt-6 text-center text-lg font-semibold text-gray-700">
              Modern hiring requires smarter tools.
            </p>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto mb-12 max-w-[640px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Who Is This <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span> For?
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-gray-600">
                Our resume builder for job seekers works for:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Freelancers & remote job seekers",
                "Executives & senior professionals",
                "International applicants",
                "Job seekers returning after a career break",
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
            <p className="mt-8 text-center font-medium text-gray-600">
              No writing skills required.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20 sm:py-28 md:px-6">
  <div className="mx-auto max-w-[1100px]">
    <div className="relative overflow-hidden rounded-[40px] bg-[#fff1ea] px-8 py-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:px-16 md:py-20">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />

      <h2 className="relative text-[28px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
        Build Your Resume Smarter with <span className="text-[#ff4c00]">AI</span>
      </h2>

      <p className="relative mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-gray-600">
        Stop struggling with formatting, rewriting, and keyword guessing.
      </p>

      <p className="relative mt-2 text-[15px] leading-7 text-gray-600">
        With our AI resume builder, you can:
      </p>

      <div className="relative mx-auto mt-9 grid max-w-[560px] gap-3 text-left sm:grid-cols-2">
        {[
          "Create ATS-optimized resumes",
          "Generate powerful achievements",
          "Improve recruiter visibility",
          "Apply faster & smarter",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-xl border border-[#ffd6c2] bg-white px-4 py-3 shadow-sm"
          >
            <CheckCircle className="h-5 w-5 shrink-0 text-[#ff4c00]" />
            <span className="text-[14px] font-medium text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => updateCtaUrl("/ai-resume-builder", "Create Your Resume Now")}
        className="relative mt-9 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-8 text-[14px] font-bold text-white shadow-[0_4px_0_black] transition-all duration-200 hover:-translate-y-0.5"
      >
        Create Your Resume Now
        <ArrowRight size={16} />
      </button>

      <p className="relative mt-5 text-sm text-gray-500">
        Free to start • No credit card required
      </p>
    </div>
  </div>
</section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Resume Builder
                <span className="block">Questions Answered</span>
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is an AI resume builder?",
                  a: "An AI resume builder uses artificial intelligence to automatically write, optimize, and format resumes.",
                },
                {
                  q: "How does an ATS-friendly resume builder work?",
                  a: "An ATS friendly resume builder structures resumes to pass applicant tracking systems using optimized formatting and keywords.",
                },
                {
                  q: "Is an AI resume generator better than manual writing?",
                  a: "Yes. An AI resume generator improves clarity, keyword relevance, and recruiter appeal.",
                },
                {
                  q: "Can I customize my AI-generated resume?",
                  a: "Absolutely. You can edit templates, layout, content, and sections.",
                },
                {
                  q: "Is this resume builder suitable for freshers?",
                  a: "Yes. Perfect for candidates with limited experience, freshers, and those who have just graduated, who are new to the job market.",
                },
                {
                  q: "Does this resume maker online support all industries?",
                  a: "Yes. Our resume maker online works across all sectors.",
                },
                {
                  q: "How long does it take to create a resume?",
                  a: "Most users finish within 10 minutes.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. We use secure cloud infrastructure and privacy protection.",
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
