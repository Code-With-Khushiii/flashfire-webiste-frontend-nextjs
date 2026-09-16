"use client";

import { ArrowRight, Check, GraduationCap, Briefcase, Repeat, BookOpen, TrendingUp, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { localizeHref } from "@/src/utils/locale";

export default function CareerAdvisor() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is an AI career advisor?",
      a: "An AI career advisor uses data and machine learning to analyze your background, skills, and goals to provide personalized career guidance, role recommendations, and career planning support.",
    },
    {
      q: "How does AI-powered career guidance help job seekers?",
      a: "AI-powered career guidance helps job seekers identify in-demand roles, close skill gaps, and create a structured career development plan instead of relying on generic advice.",
    },
    {
      q: "Is FlashFire a career guidance platform or a coaching service?",
      a: "FlashFire is a career guidance platform that combines AI career coaching with actionable insights like skill roadmaps, resume improvements, and job market demand analysis.",
    },
  ];

  const audiences = [
    {
      icon: GraduationCap,
      title: "Recent Graduates",
      description:
        "Explore career paths aligned with your education, interests, and real market demand — before applying blindly.",
    },
    {
      icon: Briefcase,
      title: "Mid-Career Professionals",
      description:
        "Plan role transitions, promotions, or leadership moves with structured, data-driven career guidance.",
    },
    {
      icon: Repeat,
      title: "Career Changers",
      description:
        "Evaluate new industries, required skills, and realistic transition timelines before making a switch.",
    },
    {
      icon: BookOpen,
      title: "Students Planning Ahead",
      description:
        "Align coursework, projects, and certifications with real-world job roles companies are hiring for.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Job Seekers",
      description:
        "Stay relevant by understanding which roles and skills are growing in the job market.",
    },
    {
      icon: RotateCcw,
      title: "Return-to-Work Candidates",
      description:
        "Re-enter the workforce after a break with a refreshed skill set and a clear view of in-demand roles.",
    },
  ];
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const pushCustomUrl = (path?: string) => {
    if (typeof window === "undefined" || !path) return;
    const normalized = localizeHref(path, window.location.pathname);
    window.history.pushState({}, "", normalized);
  };

  const handleGetCareerAdvice = () => {
    const utmSource =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
    const utmMedium =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || "Career_Advisor_Page"
        : "Career_Advisor_Page";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Career_Advisor_Get_Career_Advice_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign:
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "Website"
            : "Website",
      },
    });

    trackButtonClick("Get Career Advice", "career_advisor_cta", "cta", {
      button_location: "career_advisor_hero_section",
      section: "career_advisor_hero",
    });

    trackSignupIntent("career_advisor_cta", {
      signup_source: "career_advisor_hero_button",
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
    }

    pushCustomUrl("/career-advisor/Get-Career-Advice");
  };

  const dotGrid = {
    backgroundImage: "radial-gradient(circle, rgba(17,24,39,0.08) 1px, transparent 1px)",
    backgroundSize: "26px 26px",
  };
  const topGlow = {
    background:
      "radial-gradient(60% 100% at 50% 0%, rgba(255,76,0,0.06) 0%, rgba(255,76,0,0) 70%)",
  };

  return (
    <div className="bg-white font-['Space_Grotesk',sans-serif] text-[#111827]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/5 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={topGlow} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-2 md:pt-20 md:pb-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
              AI-Powered Career Guidance
            </span>

            <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              AI Career Advisor for Personalized Career Guidance &amp; Planning
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-[#384154] md:text-lg">
              FlashFire is an AI-powered career guidance platform that analyzes your profile to deliver role recommendations, skill gap insights, resume improvement suggestions, and a clear career development roadmap.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                {...getButtonProps()}
                onClick={handleGetCareerAdvice}
                className="group inline-flex items-center gap-2 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black">
                Get Career Advice
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>


            </div>
          </div>

          {/* Right Visual — roadmap */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-[32px] bg-[#fff0e9] rotate-3" />
            <div className="relative rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)] sm:p-8">
              <ol className="relative space-y-6">
                <span className="pointer-events-none absolute left-[19px] top-3 bottom-3 w-px bg-black/10" aria-hidden="true" />
                {[
                  "Role recommendations based on your profile",
                  "Skill gaps + learning roadmap",
                  "Resume & ATS improvement suggestions",
                  "Job market demand insights",
                  "Next 30-60-90 day action plan",
                ].map((item, idx) => (
                  <li key={idx} className="relative flex items-start gap-4">
                    <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-xs font-black text-[#ff4c00]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center pt-1 text-sm font-medium leading-6 text-[#4b5565]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black leading-tight tracking-tight text-[#172031] sm:text-4xl md:text-5xl">
            Career decisions made simple
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-base font-medium leading-7 text-[#4b5565] md:text-lg">
            No vague advice or generic suggestions. FlashFire's AI career advisor delivers data-backed career guidance and career planning insights tailored to your profile and job market demand.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Role clarity",
                desc: "Understand which roles fit your background today and which ones you should prepare for next.",
              },
              {
                title: "Skill direction",
                desc: "Know exactly which skills are missing and which ones actually matter in the market.",
              },
              {
                title: "Focused action plan",
                desc: "Get a step-by-step plan instead of generic career advice.",
              },
            ].map((item, i) => (
              <article
                key={i}
                className="group relative rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
              >
                <span className="absolute right-5 top-4 text-2xl font-black text-black/10 transition group-hover:text-[#ff4c00] sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-black leading-tight text-[#111827] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#4b5565]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
              A Career Development Platform Powered by AI
            </h2>

            <ul className="mt-8 space-y-4">
              {[
                "Personalized career path recommendations using AI",
                "Skill gap analysis with career planning roadmap",
                "Resume and ATS optimization for career growth",
                "Job market demand insights",
                "Next 30-60-90 day action plan",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-base font-medium leading-7 text-[#4b5565]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-[32px] bg-[#fff0e9] rotate-3" />
            <div className="relative flex justify-center rounded-2xl border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)] lg:p-10">
              <Image
                src="/images/career1.png"
                alt="From classroom to career"
                width={420}
                height={320}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-[#fffaf7] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">

          {/* LEFT IMAGE */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-[32px] bg-[#fff0e9] -rotate-3" />
            <div className="relative flex justify-center rounded-2xl border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)] lg:p-10">
              <Image
                src="/images/career2.png"
                alt="Entry level job recommendations"
                width={420}
                height={320}
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
              Who Is This For?
            </h2>

            <ul className="mt-8 space-y-4">
              {[
                "Recent graduates looking for career direction",
                "Mid-career professionals seeking new opportunities",
                "Career changers exploring new fields",
                "Students mapping coursework to real industry roles",
                "Job seekers aiming for the top 10% of job market",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[#ff4c00] shadow-sm transition group-hover:bg-[#ff4c00] group-hover:text-white">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-base font-medium leading-7 text-[#4b5565]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={topGlow} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* CENTERED INTRO */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
              Built for real career decisions
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
              Who Is This AI Career Guidance Platform For?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-[#4b5565] md:text-lg">
              FlashFire’s AI Career Advisor is designed for people who want clarity,
              direction, and momentum — not generic advice.
              <br /><br />
              Wherever you are in your journey, it adapts to help you move forward
              with confidence.
            </p>
          </div>

          {/* AUDIENCE GRID */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={index}
                  className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>

                  <h3 className="mt-4 text-lg font-black leading-tight text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-black/60">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-[#f9e8e0] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className={styles.header}>
            <h2>Frequently Asked Questions About AI Career Guidance</h2>
            <p>
              Ask us anything—here are the essentials to get you started.
            </p>
          </div>

          <div className={`${styles.faqContainer} w-full`}>
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""
                  }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span>{faq.q}</span>
                  <span className={styles.icon}>
                    {activeFaq === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaq === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffaf7] pt-16 pb-16 md:pt-20 md:pb-20">
        {/* Background Glow Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4c00]/12 blur-[120px]"></div>
          <div className="absolute inset-0 opacity-[0.35]" style={dotGrid}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">

          {/* Heading */}
          <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
            Ready to stop manually applying to{" "}
            <span className="relative inline-block text-[#ff4c00]">
              Get job calls?
              <span className="absolute left-0 bottom-0 -z-10 h-2 w-full rounded bg-[#ff4c00]/20"></span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="mx-auto mb-10 max-w-2xl text-base font-medium leading-7 text-[#4b5565] md:text-lg">
            Join thousands of job seekers who use FlashFire to create compelling
            cover letters that increase their interview chances.
          </p>

          {/* CTA Button */}
          <button
            {...getButtonProps()}
            onClick={handleGetCareerAdvice}
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-10 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
          >
            Get Career Advice
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* Trust Line */}
          <p className="mt-6 text-sm font-medium text-[#4b5565]">
            Trusted by 1000+ job seekers
          </p>
        </div>
      </section>


    </div>
  );
}
