"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Send,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function DashboardAnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeDesignedForIndex, setActiveDesignedForIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const dashboardAnalyticsFAQs = [
    {
      question: "What is job search analytics?",
      answer:
        "Job search analytics turns your application activity into measurable insights, showing you response rates, interview conversions, and which strategies are actually working.",
    },
    {
      question: "How does FlashFire track my job applications?",
      answer:
        "FlashFire automatically logs every application, interview, and recruiter interaction in one dashboard so you always have an up-to-date view of your job search.",
    },
    {
      question: "How can analytics improve my interview rate?",
      answer:
        "By showing which resumes, roles, and companies generate the most responses, analytics helps you focus your effort on what's actually converting into interviews.",
    },
    {
      question: "What metrics does FlashFire track?",
      answer:
        "FlashFire tracks jobs applied, response rates, interview rates, and performance across companies, roles, and resume versions.",
    },
    {
      question: "Can I measure response and interview rates?",
      answer:
        "Yes. FlashFire calculates your response and interview rates automatically as you log applications, so you can see your progress in real time.",
    },
    {
      question: "How does FlashFire compare with spreadsheets?",
      answer:
        "Unlike spreadsheets, FlashFire updates automatically, analyzes your results, and surfaces trends you'd otherwise have to calculate by hand.",
    },
    {
      question: "Can I track multiple resume versions?",
      answer:
        "Yes. You can track outcomes by resume version to see which one performs best for different roles and companies.",
    },
    {
      question: "Does FlashFire help identify the best-performing job applications?",
      answer:
        "FlashFire highlights which applications, companies, and job titles produce the strongest response and interview rates.",
    },
    {
      question: "Is job search analytics useful for fresh graduates?",
      answer:
        "Yes. Fresh graduates can use analytics to measure early application progress and quickly identify what improves their interview chances.",
    },
    {
      question: "Can international candidates track visa-friendly employers?",
      answer:
        "Yes. International candidates can monitor visa-friendly employers and compare outcomes to focus their search where it counts.",
    },
    {
      question: "How does FlashFire help improve my job search strategy?",
      answer:
        "FlashFire turns your application data into clear signals, helping you adjust targeting, resumes, and outreach based on what's actually working.",
    },
    {
      question: "Is my application data secure?",
      answer:
        "Yes. Your application and job search data is kept private and secure within your FlashFire account.",
    },
  ];

  const featureCards = [
    {
      title: "Track Application Activity",
      desc:
        "See how many jobs you've applied for, how many received responses, and where every application stands.",
    },
    {
      title: "Measure Interview Success",
      desc:
        "Understand which applications lead to interviews and identify the strategies that deliver better results.",
    },
    {
      title: "Discover Your Best Opportunities",
      desc: "Identify which companies, job titles, and industries respond best to your profile.",
    },
  ];

  const benefitCards = [
    {
      title: "Track Applications",
      desc: "Keep every application, interview, and recruiter response organized in one dashboard.",
    },
    {
      title: "Identify Trends",
      desc: "Discover patterns across industries, companies, resume versions, and job titles.",
    },
    {
      title: "Improve Your Strategy",
      desc: "Learn which approaches generate interviews so you can focus on what works.",
    },
    {
      title: "Increase Interview Opportunities",
      desc: "Use insights from previous applications to continuously improve your job search.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Track Every Application",
      desc: "Monitor applications, interviews, recruiter conversations, and follow-ups in one place.",
    },
    {
      number: "02",
      title: "Analyze Your Results",
      desc: "See interview rates, response rates, and application performance across different companies and roles.",
    },
    {
      number: "03",
      title: "Identify What's Working",
      desc: "Discover which resumes, job titles, and industries generate the most interviews.",
    },
    {
      number: "04",
      title: "Optimize Your Strategy",
      desc: "Adjust your job search based on real performance data to improve future results.",
    },
  ];

  const audienceCards = [
    {
      title: "High-Volume Job Seekers",
      desc: "Track large numbers of applications without losing visibility.",
    },
    {
      title: "International Candidates",
      desc: "Monitor visa-friendly employers and application outcomes.",
    },
    {
      title: "Career Growth Professionals",
      desc: "Understand which opportunities generate the strongest response.",
    },
    {
      title: "Fresh Graduates",
      desc: "Measure application progress and improve interview performance.",
    },
    {
      title: "Career Switchers",
      desc: "Compare results across industries and job titles.",
    },
    {
      title: "Data-Driven Job Seekers",
      desc: "Use measurable insights to make smarter application decisions.",
    },
  ];

  const comparisonRows = [
    { spreadsheet: "Manual updates", flashfire: "Automatic tracking" },
    { spreadsheet: "Basic records", flashfire: "Performance insights" },
    { spreadsheet: "No interview analysis", flashfire: "Interview conversion tracking" },
    { spreadsheet: "Difficult to identify trends", flashfire: "Smart analytics" },
    { spreadsheet: "Separate notes", flashfire: "Everything in one dashboard" },
    { spreadsheet: "No optimization", flashfire: "Continuous improvement" },
  ];

  const problemRows = [
    { without: "Guess what works", withFlashfire: "Measure everything" },
    { without: "No performance insights", withFlashfire: "Clear application analytics" },
    { without: "Random improvements", withFlashfire: "Data-backed decisions" },
    { without: "Missed opportunities", withFlashfire: "Better optimization" },
    { without: "Manual tracking", withFlashfire: "Centralized dashboard" },
  ];

  const resultMetrics = ["Jobs Tracked", "Interview Rate", "Response Rate", "Strategy Improvements"];

  const designedFor = [
    {
      number: "01",
      title: "High-Volume Applicants",
      desc: "See which application sources, companies, and role types produce the strongest response rates.",
    },
    {
      number: "02",
      title: "International Candidates",
      desc: "Track visa-friendly companies, regions, and interview success patterns in one place.",
    },
    {
      number: "03",
      title: "Optimization-Focused Professionals",
      desc: "Use analytics to refine targeting, resume versions, and follow-up strategy.",
    },
    {
      number: "04",
      title: "Data-Driven Job Seekers",
      desc: "Replace guessing with clear signals about what converts and what does not.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleDesignedForToggle = (index: number) => {
    setActiveDesignedForIndex(activeDesignedForIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Dashboard_Analytics_Page"
          : "Dashboard_Analytics_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Dashboard_Analytics_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "dashboard_analytics_cta", "cta", {
          button_location: "dashboard_analytics_hero_section",
          section: "dashboard_analytics_hero",
        });
        trackSignupIntent("dashboard_analytics_cta", {
          signup_source: "dashboard_analytics_hero_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      const currentPath =
        pathname || (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        stripLocalePrefix(normalizedPath) === "/get-me-interview";
      const isOnDashboardAnalyticsPage =
        stripLocalePrefix(normalizedPath) === "/features/dashboard-analytics";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnDashboardAnalyticsPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            localizeHref("/get-me-interview", normalizedPath)
          );
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
        window.history.pushState({}, "", "/get-me-interview");
      }

      router.push("/get-me-interview");
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error);
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire Job Search Analytics Dashboard",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/dashboard-analytics",
    description: "Use FlashFire's job search analytics dashboard to track job applications, response rates, and interview conversions. Optimize your job search with data.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "62" },
  };

  const faqSchemaDashboard = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dashboardAnalyticsFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "Dashboard & Analytics", item: "https://www.flashfirejobs.com/features/dashboard-analytics" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaDashboard) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen overflow-x-hidden bg-white text-[#111827]">

        {/* ================= HERO: split layout with dashboard mockup ================= */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-[#fff7f3]" />
          <div className="relative mx-auto grid max-w-[1240px] gap-14 px-4 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
            <div className="max-w-[560px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                Job Search Analytics
              </span>
              <h1 className="mt-6 text-[34px] font-extrabold leading-[1.14] text-black sm:text-[52px]">
                Track Your Job Search Performance in{" "}
                <span className="text-[#ff4c00]">One Dashboard</span>
              </h1>
              <p className="mt-6 text-[17px] font-medium leading-8 text-gray-600">
                FlashFire gives you a complete view of your job search by tracking applications,
                interviews, response rates, and recruiter activity so you can make smarter decisions
                and improve your interview chances.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-7 text-[14px] font-bold text-white shadow-[0_3px_0_black] transition hover:opacity-90"
                >
                  Track My Job Search
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleHowItWorks}
                  className="inline-flex h-[52px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-[14px] font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Dashboard mockup card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
                <div className="border-b bg-gray-50 px-6 py-5">
                  <h3 className="text-base font-semibold text-black">Your Job Search — At a Glance</h3>
                  <p className="mt-1 text-sm text-gray-500">Updated automatically as you apply.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b px-6 py-6">
                  {[
                    { label: "Applications", value: "128", icon: <Send size={16} /> },
                    { label: "Interviews", value: "14", icon: <Users size={16} /> },
                    { label: "Response Rate", value: "34%", icon: <TrendingUpIcon /> },
                    { label: "Interview Rate", value: "11%", icon: <Target size={16} /> },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-[#fff7f3] p-4">
                      <div className="flex items-center gap-2 text-[#ff4c00]">
                        {stat.icon}
                        <span className="text-[11px] font-bold uppercase tracking-wide">{stat.label}</span>
                      </div>
                      <p className="mt-2 text-2xl font-extrabold text-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-2 px-6 py-6">
                  {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#ff4c00] to-[#ff7a33]" style={{ height: `${h}px` }} />
                  ))}
                </div>
                <div className="border-t bg-[#fffaf6] px-6 py-4 text-sm text-gray-600">
                  <BarChart3 className="mr-2 inline text-[#ff4c00]" size={16} />
                  Response rate up 9% this month
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES: bento grid ================= */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-14 max-w-[640px]">
              <h2 className="text-[32px] font-extrabold leading-[1.1] text-black sm:text-[42px]">
                Everything You Need to Measure Your Job Search
              </h2>
              <p className="mt-5 text-[17px] font-medium leading-8 text-gray-600">
                Monitor every application, interview, recruiter interaction, and response so you
                always know what&apos;s working and where to improve.
              </p>
            </div>

            <div className="grid gap-5">
              <article className="rounded-3xl border border-[#ff4c00]/20 bg-[#fff7f3] p-8 sm:flex sm:items-start sm:gap-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4c00] text-white">
                  <CheckCircle size={22} strokeWidth={2.5} />
                </span>
                <div className="mt-6 sm:mt-0">
                  <h3 className="text-xl font-bold text-black">{featureCards[0].title}</h3>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-gray-600">{featureCards[0].desc}</p>
                </div>
              </article>
              <div className="grid gap-5 sm:grid-cols-2">
                {featureCards.slice(1).map((item) => (
                  <article key={item.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff4c00]">
                      <CheckCircle size={20} strokeWidth={2.5} />
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-black">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-7 text-gray-600">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS: numbered list rows ================= */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
            <div>
              <h2 className="text-[32px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
                Turn Job Search Data Into Better Decisions
              </h2>
              <p className="mt-6 text-[16px] font-medium leading-8 text-gray-600">
                Stop guessing what works. Use real job search insights to refine your strategy and
                increase your chances of getting interviews.
              </p>
            </div>

            <div className="space-y-4">
              {benefitCards.map((item, index) => (
                <div key={item.title} className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff4c00]/10 text-sm font-extrabold text-[#ff4c00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-black">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-6 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= AUDIENCE: pill chip grid ================= */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.1] text-black sm:text-[34px]">
                Who Benefits From Job Search Analytics?
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Whether you&apos;re applying to ten jobs or hundreds, FlashFire helps you
                understand your progress and improve your job search with real insights.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audienceCards.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5 transition hover:border-[#ff4c00]/40 hover:bg-[#fff7f3]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff4c00]/10 text-[#ff4c00]">
                    <CheckCircle size={15} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[14px] font-bold leading-6 text-black">{item.title}</p>
                    <p className="mt-1 text-[13px] leading-6 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS: horizontal stepper ================= */}
        <section id="how-it-works" className="bg-[#fff7f3] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.12] text-black sm:text-[36px]">
                Improve Your Job Search in 4 Simple Steps
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Track your progress, understand your results, and continuously improve every
                stage of your job search.
              </p>
            </div>

            <div className="relative grid gap-10 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-[#ff4c00]/25 md:block" />
              {steps.map((step) => (
                <div key={step.title} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-[13px] font-extrabold text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-[15px] font-extrabold leading-tight text-black">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMPARISON: side-by-side checklists ================= */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-12 text-center">
              <h2 className="text-[26px] font-extrabold leading-tight text-black sm:text-[32px]">
                Why Job Search Analytics Beats Tracking Applications in Spreadsheets
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Spreadsheets help you record applications. FlashFire helps you understand what&apos;s
                actually working.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-7">
                <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-gray-400">Spreadsheet</h3>
                <ul className="space-y-4">
                  {comparisonRows.map((row) => (
                    <li key={row.spreadsheet} className="flex items-center gap-3 text-[14px] font-medium text-gray-500">
                      <XCircle size={16} className="shrink-0 text-gray-300" />
                      {row.spreadsheet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-[#ff4c00]/25 bg-[#fff7f3] p-7">
                <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-[#ff4c00]">FlashFire</h3>
                <ul className="space-y-4">
                  {comparisonRows.map((row) => (
                    <li key={row.flashfire} className="flex items-center gap-3 text-[14px] font-extrabold text-black">
                      <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
                      {row.flashfire}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM: side-by-side checklists ================= */}
        <section className="bg-[#fffaf6] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-12 text-center">
              <h2 className="text-[26px] font-extrabold leading-tight text-black sm:text-[32px]">
                Why Most Job Seekers Don&apos;t Know What&apos;s Working
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Many job seekers send dozens of applications without understanding why some
                receive interviews while others don&apos;t.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-7">
                <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-gray-400">Without FlashFire</h3>
                <ul className="space-y-4">
                  {problemRows.map((row) => (
                    <li key={row.without} className="flex items-center gap-3 text-[14px] font-medium text-gray-500">
                      <XCircle size={16} className="shrink-0 text-gray-300" />
                      {row.without}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-[#ff4c00]/25 bg-[#fff7f3] p-7">
                <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wide text-[#ff4c00]">With FlashFire</h3>
                <ul className="space-y-4">
                  {problemRows.map((row) => (
                    <li key={row.withFlashfire} className="flex items-center gap-3 text-[14px] font-extrabold text-black">
                      <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
                      {row.withFlashfire}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RESULT METRICS: stat strip ================= */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-14 text-center">
              <h2 className="text-[32px] font-extrabold leading-[1.1] text-black sm:text-[42px]">
                See Your Job Search Progress Clearly
              </h2>
              <p className="mx-auto mt-5 max-w-[720px] text-[17px] font-medium leading-8 text-gray-600">
                Track meaningful metrics that help you improve your job search instead of simply
                counting applications.
              </p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 overflow-hidden rounded-3xl border border-gray-200 lg:grid-cols-4 lg:divide-y-0">
              {resultMetrics.map((label) => (
                <div key={label} className="flex flex-col items-center justify-center gap-3 bg-white px-4 py-10 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff4c00]/10 text-[#ff4c00]">
                    <CheckCircle size={19} strokeWidth={3} />
                  </span>
                  <p className="text-[15px] font-extrabold leading-6 text-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DESIGNED FOR: accordion with connecting spine ================= */}
        <section className="bg-[#fff7f3] px-4 py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[380px_1fr] lg:items-start">
            <div>
              <h2 className="max-w-[390px] text-[30px] font-extrabold leading-[1.3] text-black sm:text-[34px]">
                Designed for Job Seekers Who Want Measurable Progress
              </h2>
              <p className="mt-6 max-w-[390px] text-[14px] leading-7 text-gray-600">
                FlashFire&apos;s job search analytics dashboard is built for candidates who want
                visibility into their job application tracking and real improvement in interview
                outcomes.
              </p>
              <p className="mt-5 max-w-[390px] text-[14px] leading-7 text-gray-600">
                Instead of guessing, you see clear signals - what converts, what doesn&apos;t, and
                where to focus next.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="pointer-events-none absolute left-4 top-2 bottom-2 w-px bg-[#ff4c00]/25" />
              {designedFor.map((item, index) => {
                const isOpen = activeDesignedForIndex === index;
                return (
                  <div key={item.number} className="flex items-start gap-4">
                    <span
                      className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold ${
                        isOpen ? "bg-[#ff4c00] text-white" : "bg-white text-[#ff4c00] ring-1 ring-[#ff4c00]/30"
                      }`}
                    >
                      {item.number}
                    </span>
                    <article
                      className={`min-w-0 flex-1 overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen ? "border-[#ff4c00]/30 bg-white shadow-md" : "border-gray-200 bg-white hover:border-[#ff4c00]/30"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => handleDesignedForToggle(index)}
                        className="flex min-h-[48px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-black"
                      >
                        <span className="text-[14px] font-extrabold leading-tight">{item.title}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[18px] leading-none text-gray-500">
                          {isOpen ? "-" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="px-5 pb-5 text-[13px] leading-6 text-gray-600">{item.desc}</p>
                      )}
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1100px]">
            <div className="relative overflow-hidden rounded-[40px] bg-[#fff1ea] px-8 py-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:px-16 md:py-20">
              <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#ff4c00]/10 blur-3xl" />
              <h2 className="relative text-[28px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
                Ready to Improve Your <span className="text-[#ff4c00]">Job Search?</span>
              </h2>
              <p className="relative mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-gray-600">
                Track your applications, measure your progress, and use real insights to make every
                job application more effective.
              </p>
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="relative mt-9 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-8 text-[14px] font-bold text-white shadow-[0_4px_0_black] transition-all duration-200 hover:-translate-y-0.5"
              >
                Track My Job Search
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Job Search Analytics</h2>
            <p>
              We get it, job search analytics can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {dashboardAnalyticsFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
