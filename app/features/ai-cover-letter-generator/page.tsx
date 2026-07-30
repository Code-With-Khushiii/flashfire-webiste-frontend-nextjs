"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle,
  ClipboardList,
  FileText,
  Shield,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function CoverLetterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const coverLetterFAQs = [
    {
      question: "How does FlashFire personalize each cover letter?",
      answer:
        "FlashFire reviews your resume and the job description together, then writes a cover letter that highlights the experience and skills most relevant to that specific role.",
    },
    {
      question: "Can I edit the generated cover letter?",
      answer:
        "Yes. Every generated cover letter is fully editable, so you can adjust tone, wording, and formatting before you apply.",
    },
    {
      question: "Will my cover letter match the job description?",
      answer:
        "Yes. FlashFire aligns your cover letter with the language and requirements in the job description to improve keyword and role relevance.",
    },
    {
      question: "Is the cover letter ATS-friendly?",
      answer:
        "Yes. Every cover letter uses clean, ATS-friendly formatting so it can be parsed correctly by applicant tracking systems.",
    },
    {
      question: "Can I generate unlimited cover letters?",
      answer: "Yes. You can create a new, tailored cover letter for as many job applications as you need.",
    },
    {
      question: "Can I use my existing resume?",
      answer: "Yes. Upload your existing resume and FlashFire will use it as the foundation for your cover letter.",
    },
    {
      question: "How long does it take to create a cover letter?",
      answer:
        "Most cover letters are ready to review within minutes of uploading your resume and the job description.",
    },
    {
      question: "Can I create cover letters for different industries?",
      answer:
        "Yes. FlashFire tailors each cover letter to the role and industry you're applying to, not a single generic template.",
    },
    {
      question: "Does FlashFire save my cover letters?",
      answer: "Yes. Your cover letters are saved to your account so you can revisit, reuse, or edit them anytime.",
    },
    {
      question: "Can fresh graduates use this tool?",
      answer:
        "Yes. Fresh graduates can use FlashFire to build a strong, professional cover letter even without prior work experience.",
    },
  ];

  const benefitCards = [
    {
      title: "Personalized for Every Job",
      desc:
        "Generate unique cover letters based on your resume and the job description instead of using generic templates.",
      icon: Sparkles,
    },
    {
      title: "Optimized for Recruiters",
      desc:
        "Use clean formatting and relevant keywords that help your application pass ATS screening and remain easy for recruiters to read.",
      icon: Target,
    },
    {
      title: "Create Cover Letters Faster",
      desc:
        "Build professional cover letters in minutes, edit them anytime, and reuse your best content across applications.",
      icon: Zap,
    },
  ];

  const builderSteps = [
    {
      eyebrow: "UPLOAD RESUME",
      title: "Upload Your Resume",
      desc: "We'll identify your experience, skills, and achievements.",
      visual: "upload",
    },
    {
      eyebrow: "PASTE JOB DESCRIPTION",
      title: "Paste the Job Description",
      desc: "We compare your background with the role to identify the most relevant experience.",
      visual: "match",
    },
    {
      eyebrow: "GENERATE & PERSONALIZE",
      title: "Generate & Personalize",
      desc: "Receive a professionally written cover letter that you can edit before applying.",
      visual: "generate",
    },
  ];

  const whyFlashfireCards = [
    { title: "Write Faster", desc: "Generate personalized cover letters within minutes." },
    { title: "Tailor Every Application", desc: "Match every cover letter to the specific job." },
    { title: "Increase ATS Compatibility", desc: "Improve keyword relevance and application quality." },
    { title: "Edit Anytime", desc: "Customize every section before sending." },
  ];

  const audienceLabels = [
    "Fresh Graduates",
    "Career Switchers",
    "Experienced Professionals",
    "International Candidates",
    "High-Volume Job Seekers",
    "Anyone tired of writing cover letters from scratch",
  ];

  const comparisonRows = [
    { generic: "Same content for every job", flashfire: "Personalized for every application" },
    { generic: "Manual editing", flashfire: "Faster customization" },
    { generic: "Limited keyword relevance", flashfire: "Better job-specific matching" },
    { generic: "Difficult to maintain", flashfire: "Easy to reuse and update" },
    { generic: "Generic structure", flashfire: "Professional formatting" },
  ];

  const audience = [
    {
      title: "Job Seekers Applying to Multiple Roles",
      desc: "Create customized cover letters for every application without rewriting from scratch.",
    },
    {
      title: "Fresh Graduates & Early-Career Professionals",
      desc: "Build professional cover letters even if you're applying for your first job.",
    },
    {
      title: "Experienced Professionals",
      desc: "Save time by generating tailored cover letters for different companies and positions.",
    },
    {
      title: "Anyone Looking to Write Better Cover Letters",
      desc: "Create personalized, recruiter-ready cover letters in minutes.",
    },
    {
      title: "Candidates Looking to Improve ATS Compatibility",
      desc: "Include relevant job-specific keywords and improve the quality of every application.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Cover_Letter_Page"
          : "Cover_Letter_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Cover_Letter_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "cover_letter_cta", "cta", {
          button_location: "cover_letter_hero_section",
          section: "cover_letter_hero",
        });
        trackSignupIntent("cover_letter_cta", {
          signup_source: "cover_letter_hero_button",
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
      const isOnCoverLetterPage =
        stripLocalePrefix(normalizedPath) === "/features/cover-letter" ||
        stripLocalePrefix(normalizedPath) === "/features/ai-cover-letter-generator";

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

      if (isOnCoverLetterPage) {
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

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "AI Cover Letter Generator",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/cover-letter.png",
    description:
      "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    brand: {
      "@type": "Brand",
      name: "FlashFire",
    },
    offers: {
      "@type": "Offer",
      url: "https://flashfirejobs.com/features/ai-cover-letter-generator",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "68",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Cover Letter Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
    description: "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "68" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: coverLetterFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "AI Cover Letter Generator", item: "https://www.flashfirejobs.com/features/ai-cover-letter-generator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 pb-12 pt-14 sm:min-h-[470px] sm:pb-16 sm:pt-[88px]">
          <div className="mx-auto max-w-[1180px]">
            <HeroMiniCard className="left-[98px] top-[162px] hidden lg:flex" />
            <HeroWritingCard className="right-[64px] top-[255px] hidden lg:block" />

            <div className="mx-auto max-w-[720px] text-center">
              <span className="mb-5 inline-flex rounded-full bg-[#ff4c00] px-4 py-1.5 text-[9px] font-extrabold uppercase text-white">
                Personalized Cover Letters
              </span>
              <h1 className="text-[30px] font-extrabold leading-[1.14] tracking-normal text-[#111827] sm:text-[43px] sm:leading-[1.16]">
                Create Job-Specific Cover Letters
                <br className="hidden sm:block" />
                That Improve Interview Chances
              </h1>
              <p className="mx-auto mt-6 max-w-[590px] text-[15px] font-medium leading-7 text-[#596273]">
                Create personalized cover letters tailored to every job description. Highlight
                your most relevant skills, improve keyword matching, and send applications with
                confidence.
              </p>

              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mt-8 inline-flex h-[46px] min-w-[160px] items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-black bg-white px-7 text-[13px] font-extrabold text-black transition hover:bg-[#ffe8dd] sm:mt-9"
                style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
              >
                Create My Cover Letter
                <ArrowRight size={15} />
              </button>

              <div className="mx-auto mt-8 grid w-full max-w-[440px] grid-cols-2 gap-x-4 gap-y-3 text-left text-[10px] sm:text-[12px] font-semibold text-[#111827]">{[
                  "Personalized for every job",
                  "ATS-friendly formatting",
                  "Professional writing in minutes",
                  "Easy to edit and customize",
                ].map((item) => (
                  <span
                key={item}
                className="flex items-start gap-2 leading-5"
              >
                <Shield size={14} className="mt-[2px] shrink-0" />
                <span>{item}</span>
              </span>
                   ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[920px]">
            <div className="mb-12 text-center">
              <span className="mb-5 inline-flex rounded-full border border-[#ffd6c4] px-4 py-1 text-[11px] font-bold text-[#ff4c00]">
                How it works
              </span>
              <h2 className="text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Everything You Need to
                <br className="hidden sm:block" />
                Write Better Cover Letters
              </h2>
              <p className="mx-auto mt-6 max-w-[610px] text-[17px] font-medium leading-7 text-[#596273]">
                Create professional cover letters that match every job application without
                starting from scratch each time.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefitCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="min-h-[195px] border border-black bg-[#ff4c00] p-6 text-white shadow-[5px_5px_0_0_rgba(0,0,0,0.7)]"
                  >
                    <span className="mb-7 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff4c00]">
                      <Icon size={23} />
                    </span>
                    <h3 className="text-[19px] font-extrabold leading-tight">{item.title}</h3>
                    <p className="mt-4 text-[15px] font-medium leading-7 text-white/90">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <span className="mb-8 inline-flex rounded-full border border-[#ffd6c4] px-4 py-1 text-[11px] font-bold uppercase text-[#ff4c00]">
                The problem with modern job search
              </span>
              <h2 className="text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Most Cover Letters
                <br className="hidden sm:block" />
                Don&apos;t Get Responses
              </h2>
            </div>

            <div className="grid border border-black md:grid-cols-2">
              <div>
                <div className="flex h-[54px] items-center gap-3 border-b border-black bg-[#f0f0f0] px-5 text-[15px] font-extrabold text-[#111827]">
                  <Zap size={16} fill="#ff4c00" className="text-[#ff4c00]" />
                  Why Generic Cover Letters Fail?
                </div>
                {[
                  "Generic cover letters look identical.",
                  "Important skills are often missing.",
                  "Every application takes too long to customize.",
                  "Recruiters quickly recognize copied content.",
                  "Valuable opportunities get missed.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[54px] items-center border-b border-black px-4 py-3 text-[13px] font-medium leading-5 text-[#6b7280] last:border-b-0 sm:px-5 sm:text-[14px] md:last:border-b"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="border-t border-black md:border-l md:border-t-0">
                <div className="flex h-[54px] items-center gap-3 bg-[#ff4c00] px-5 text-[15px] font-extrabold text-white">
                  <Check size={16} strokeWidth={3} />
                  How FlashFire Changes the Game
                </div>
                {[
                  "Personalized for every application",
                  "Highlights your most relevant experience",
                  "Matches job descriptions naturally",
                  "Saves hours of manual editing",
                  "Helps create stronger first impressions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[54px] items-center gap-3 border-b border-[#ff9a78] bg-[#fff3ee] px-4 py-3 text-[13px] font-semibold leading-5 text-[#111827] last:border-b-0 sm:px-5 sm:text-[14px]"
                  >
                    <Check size={18} strokeWidth={3} className="text-[#ff4c00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-12 text-center">
              <h2 className="text-[31px] font-extrabold leading-[1.12] text-[#111827] sm:text-[40px] sm:leading-tight">
                Create a Personalized Cover Letter
                <br className="hidden sm:block" />
                in 3 Simple Steps
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-[#596273]">
                ATS-friendly, recruiter-ready, and focused on real improvements that get results.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {builderSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="grid min-h-[260px] items-center gap-7 border border-black bg-white p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.75)] sm:grid-cols-2 sm:gap-10 sm:p-8 sm:shadow-[5px_5px_0_0_rgba(0,0,0,0.75)] lg:p-10"
                >
                  <div className={index % 2 === 1 ? "sm:order-2" : ""}>
                    <p className="text-[11px] font-extrabold uppercase text-[#ff4c00]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-[#ff4c00] sm:mt-5 sm:text-[24px]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] font-semibold leading-7 text-black">
                      {step.desc}
                    </p>
                  </div>
                  <div className={index % 2 === 1 ? "sm:order-1" : ""}>
                    <CoverLetterVisual type={step.visual} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[920px]">
            <h2 className="mb-12 text-center text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
              Why Job Seekers Use FlashFire
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyFlashfireCards.map((item) => (
                <article
                  key={item.title}
                  className="min-h-[150px] rounded-[4px] border border-[#d8d8d8] bg-white p-6 shadow-[0_10px_24px_rgba(17,24,39,0.12)]"
                >
                  <h3 className="text-[15px] font-extrabold leading-tight text-[#111827]">{item.title}</h3>
                  <p className="mt-3 text-[13px] font-medium leading-6 text-[#596273]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-9 text-center">
              <h2 className="text-[30px] font-extrabold leading-[1.08] text-[#111827] sm:text-[36px]">
                Who Is This Cover Letter Builder For?
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-[13px] font-medium leading-6 text-[#7a8290]">
                Whether you&apos;re applying for your first job or your next leadership role,
                FlashFire helps you write stronger cover letters with less effort.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {audienceLabels.map((item) => (
                <article
                  key={item}
                  className="flex h-full min-h-[110px] min-w-0 flex-col justify-center overflow-hidden rounded-[4px] border border-[#d8d8d8] bg-white px-6 py-5 shadow-[0_8px_18px_rgba(17,24,39,0.12)]"
                >
                  <span className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                    <CheckCircle size={17} strokeWidth={3} />
                  </span>
                  <p className="text-[14px] font-extrabold leading-6 text-[#ff4c00]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-10 text-center text-[30px] font-extrabold leading-tight text-[#111827] sm:text-[32px]">
              FlashFire vs Generic Cover Letter Templates
            </h2>
            <div className="overflow-hidden border border-[#111827] bg-white shadow-[4px_4px_0_#111827]">
              <div className="grid grid-cols-2 border-b border-[#111827] bg-[#fff3ee]">
                <div className="border-r border-[#111827] p-4 text-center text-[14px] font-extrabold text-[#111827]">
                  Generic Templates
                </div>
                <div className="p-4 text-center text-[14px] font-extrabold text-[#ff4c00]">FlashFire</div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.generic}
                  className={`grid grid-cols-2 ${index !== comparisonRows.length - 1 ? "border-b border-[#111827]" : ""}`}
                >
                  <div className="flex items-center gap-2 border-r border-[#111827] p-4 text-[13px] font-medium text-[#596273]">
                    <XCircle size={16} className="shrink-0 text-[#c8ccd2]" />
                    {row.generic}
                  </div>
                  <div className="flex items-center gap-2 p-4 text-[13px] font-extrabold text-[#111827]">
                    <Check size={16} strokeWidth={3} className="shrink-0 text-[#ff4c00]" />
                    {row.flashfire}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff3ee] px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 md:grid-cols-[1fr_1.25fr] md:items-center">
            <div>
              <h2 className="text-[31px] font-extrabold leading-tight text-black sm:text-[40px]">
                Create Better Cover Letters
                <span className="text-[#ff4c00]"> in 3 Simple Steps</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-7 text-[#6b7280] sm:mt-6 sm:text-[17px] sm:leading-8">
                Create personalized, job-specific cover letters in minutes. Simply upload your
                resume, add the job description, and let FlashFire help you write a stronger
                application.
              </p>
            </div>

            <div className="space-y-4">
              {audience.map((item) => (
                <article
                  key={item.title}
                  className="flex min-h-[52px] items-start gap-3 rounded-md border border-[#d8d8d8] bg-white px-4 py-3 shadow-[0_3px_9px_rgba(0,0,0,0.05)] sm:gap-4 sm:px-5 sm:py-4"
                >
                  <span className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#fff0e8] text-[#ff4c00]">
                    <CheckCircle size={16} />
                  </span>
                  <div>
                    <p className="text-[14px] font-extrabold leading-5 text-black sm:text-[15px]">{item.title}</p>
                    <p className="mt-1 text-[13px] font-medium leading-5 text-[#6b7280]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[31px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
              Ready to Create
              <br className="hidden sm:block" />
              <span className="text-[#ff4c00]">Better Cover Letters?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[15px] font-medium leading-7 text-[#596273]">
              Build personalized cover letters for every application, save hours of manual
              writing, and apply with confidence.
            </p>
            <button
              {...getButtonProps()}
              onClick={handleGetMeInterview}
              className="mt-9 inline-flex h-[44px] min-w-[190px] items-center justify-center whitespace-nowrap rounded-md bg-[#ff4c00] px-7 text-[13px] font-extrabold text-white transition hover:bg-[#e94400]"
            >
              Create My Cover Letter
              <ArrowRight className="ml-1 inline" size={14} />
            </button>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Cover Letter Builder</h2>
            <p>
              We get it, cover letter writing can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {coverLetterFAQs.map((faq, index) => (
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

function HeroMiniCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-[38px] min-w-[178px] items-center gap-3 rounded-lg bg-white px-4 shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#111827] text-[#ff4c00]">
        <ClipboardList size={14} />
      </span>
      <span>
        <span className="block text-[8px] font-extrabold leading-tight text-[#111827]">
          Cover Letter Builder
        </span>
        <span className="block text-[7px] font-semibold leading-tight text-[#6b7280]">
          Personalized writing assistant
        </span>
      </span>
    </div>
  );
}

function HeroWritingCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-[244px] rounded-lg bg-white p-3 shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      <p className="mb-3 text-[8px] font-extrabold text-[#ff4c00]">Generating your cover letter</p>
      <div className="space-y-2">
        <div className="h-3 rounded bg-[#e1e4ea]" />
        <div className="h-3 rounded bg-[#e1e4ea]" />
        <div className="h-3 rounded bg-[#e1e4ea]" />
      </div>
    </div>
  );
}

function CoverLetterVisual({ type }: { type: string }) {
  if (type === "match") {
    return (
      <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
        <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-[#dfe3ea]" />
            <div className="h-3 w-5/6 rounded bg-[#dfe3ea]" />
            <div className="h-3 w-full rounded bg-[#dfe3ea]" />
            <div className="h-16 rounded-md bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "generate") {
    return (
      <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
        <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
          <div className="mb-4 h-4 w-28 rounded bg-[#dfe3ea] sm:w-36" />
          <div className="space-y-2">
            <div className="h-2 rounded bg-[#dfe3ea]" />
            <div className="h-2 w-11/12 rounded bg-[#dfe3ea]" />
            <div className="h-2 rounded bg-[#dfe3ea]" />
            <div className="h-14 rounded-md bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
      <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#ff4c00] sm:h-12 sm:w-12">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <div className="mb-3 h-3 w-28 rounded bg-[#dfe3ea]" />
            <div className="h-3 w-20 rounded bg-[#dfe3ea]" />
          </div>
        </div>
        <div className="mt-5 h-16 rounded-md bg-[#fff0e8]" />
      </div>
    </div>
  );
}
