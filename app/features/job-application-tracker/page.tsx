"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
  Sparkles,
  Target,
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

export default function JobTrackerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const jobTrackerFAQs = [
    {
      question: "Why should I use a job application tracker?",
      answer:
        "A job application tracker keeps every job application, recruiter conversation, and interview organized in one place, so you always know what to do next in your job search.",
    },
    {
      question: "How does FlashFire help organize my job search?",
      answer:
        "FlashFire centralizes saved jobs, application stages, recruiter contacts, and interview notes into one dashboard, replacing scattered spreadsheets and notes.",
    },
    {
      question: "Can I import jobs from LinkedIn and Indeed?",
      answer:
        "Yes. FlashFire's browser extension lets you save jobs from LinkedIn, Indeed, Wellfound, Google Jobs, and company career pages with one click.",
    },
    {
      question: "Can I track interviews and recruiter conversations?",
      answer:
        "Yes. You can store recruiter contacts, interview notes, and follow-up reminders alongside every application you track.",
    },
    {
      question: "Does FlashFire replace spreadsheets?",
      answer:
        "Yes. FlashFire is built specifically for job searching, offering features like status tracking, recruiter management, and analytics that spreadsheets can't provide.",
    },
    {
      question: "Can I customize application stages?",
      answer:
        "Yes. You can move applications through stages like Wishlist, Applied, Interview, Offer, or Rejected to match how you run your job search.",
    },
    {
      question: "Does FlashFire send reminders for follow-ups?",
      answer:
        "Yes. FlashFire lets you set follow-up reminders so you never miss a recruiter response or interview deadline.",
    },
    {
      question: "Can I store resumes and interview notes?",
      answer:
        "Yes. You can attach documents and notes to each application, keeping resumes, cover letters, and interview notes organized in one place.",
    },
    {
      question: "How does FlashFire help me stay organized?",
      answer:
        "By combining job saving, application tracking, recruiter management, and progress insights in a single dashboard, FlashFire keeps your entire job search organized in one place.",
    },
    {
      question: "Is FlashFire suitable for fresh graduates?",
      answer:
        "Yes. Fresh graduates can use FlashFire to organize campus placements and entry-level applications alongside recruiter and interview details.",
    },
    {
      question: "Can experienced professionals use FlashFire?",
      answer:
        "Yes. Busy professionals can track multiple applications, recruiter conversations, and interviews without relying on spreadsheets.",
    },
    {
      question: "Can I track remote job applications?",
      answer:
        "Yes. FlashFire helps you manage applications across multiple job boards, making it easy to track remote opportunities in one place.",
    },
    {
      question: "Is my job search data secure?",
      answer:
        "Yes. Your job search data is stored securely within your FlashFire account and is never shared without your permission.",
    },
  ];

  const comparisonRows = [
    { spreadsheet: "Manual updates", flashfire: "One-click job saving" },
    { spreadsheet: "Separate notes", flashfire: "Recruiters, notes, and documents together" },
    { spreadsheet: "Hard to filter", flashfire: "Smart search and filters" },
    { spreadsheet: "No analytics", flashfire: "Application insights and reports" },
    { spreadsheet: "Easy to forget follow-ups", flashfire: "Built-in reminders" },
    { spreadsheet: "Difficult to scale", flashfire: "Designed for active job searches" },
  ];

  const problemRows = [
    { without: "Multiple spreadsheets", with: "One centralized dashboard" },
    { without: "Lost recruiter emails", with: "Contact management" },
    { without: "Missed interview updates", with: "Organized interview tracking" },
    { without: "No performance visibility", with: "Job search analytics" },
    { without: "Forgotten follow-ups", with: "Notes and reminders" },
  ];

  const standOutCards = [
    {
      icon: Sparkles,
      title: "Save Jobs Instantly",
      copy:
        "Import jobs from LinkedIn, Indeed, Wellfound, and company career pages with one click using the FlashFire browser extension.",
    },
    {
      icon: Target,
      title: "Track Your Progress",
      copy:
        "Monitor applications, interviews, offers, and rejection rates to understand what's working and improve your job search.",
    },
    {
      icon: Zap,
      title: "Manage Recruiter Relationships",
      copy:
        "Store recruiter contacts, interview notes, referrals, and follow-up reminders alongside every application.",
    },
  ];

  const workflowCards = [
    {
      title: "Save jobs instantly",
      copy:
        "Save interesting job opportunities directly from LinkedIn, Indeed, Wellfound, and company career pages with one click.",
    },
    {
      title: "Organize by status",
      copy:
        "Move applications through custom stages like Wishlist, Applied, Interview, Offer, or Rejected to stay organized.",
    },
    {
      title: "Track Job Application Progress",
      copy:
        "Measure how your applications convert into interviews and offers so you can improve your job search strategy.",
    },
    {
      title: "Manage recruiters",
      copy:
        "Keep recruiter contacts, interview notes, follow-up reminders, and documents connected to every application.",
    },
  ];

  const audienceItems = [
    {
      title: "Active Job Seekers",
      description: "Applying to multiple opportunities every week.",
    },
    {
      title: "Busy Professionals",
      description: "Need to manage applications without spreadsheets.",
    },
    {
      title: "Career Switchers",
      description: "Track opportunities across different industries and roles.",
    },
    {
      title: "Fresh Graduates",
      description: "Organize campus placements and entry-level applications.",
    },
    {
      title: "Remote Job Seekers",
      description: "Manage applications across multiple job boards.",
    },
    {
      title: "Interviewing Candidates",
      description: "Keep recruiter conversations and interview schedules organized.",
    },
  ];

  const useSteps = [
    {
      eyebrow: "SAVE JOBS",
      title: "Save Job Opportunities",
      copy:
        "Save jobs from LinkedIn, Indeed, Wellfound, Google Jobs, and company career pages in one click.",
      visual: "source",
      reverse: false,
    },
    {
      eyebrow: "ORGANIZE APPLICATIONS",
      title: "Track Every Application",
      copy:
        "Categorize applications by stage, add notes, set reminders, and never lose track of where you've applied.",
      visual: "board",
      reverse: true,
    },
    {
      eyebrow: "JOB INSIGHTS",
      title: "Measure Your Results",
      copy:
        "Track interview rates, application performance, and offers to identify what helps you land more interviews.",
      visual: "chart",
      reverse: false,
    },
    {
      eyebrow: "TRACK CONTACTS",
      title: "Manage Recruiters & Interviews",
      copy:
        "Keep recruiter contacts, interview schedules, follow-ups, and documents organized for every opportunity.",
      visual: "contacts",
      reverse: true,
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
          ? localStorage.getItem("utm_medium") || "Job_Tracker_Page"
          : "Job_Tracker_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Tracker_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_tracker_cta", "cta", {
          button_location: "job_tracker_hero_section",
          section: "job_tracker_hero",
        });
        trackSignupIntent("job_tracker_cta", {
          signup_source: "job_tracker_hero_button",
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
      const isOnJobTrackerPage =
        stripLocalePrefix(normalizedPath) === "/features/job-tracker" ||
        stripLocalePrefix(normalizedPath) === "/features/job-application-tracker";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnJobTrackerPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          const targetPath = localizeHref("/get-me-interview", normalizedPath);
          window.history.pushState({}, "", targetPath);
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString());
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

  const scrollWorkflow = (direction: "left" | "right") => {
    const node = carouselRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Job Application Tracker",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    description:
      "Job application tracker that helps you monitor, manage, and follow up on every application in one place. Stay organized and never miss updates-try Flashfire free.",
    brand: {
      "@type": "Brand",
      name: "FlashFireJobs",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/job-application-tracker",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "55",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 py-12 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1420px] items-center gap-7 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-6">
            <div className="order-3 grid gap-2 sm:grid-cols-3 xl:order-1 xl:block xl:space-y-24">
              <HeroPill label="Job Application Tracker" />
              <HeroPill className="xl:ml-12" label="Centralized job tracking" />
              <HeroPill label="Actionable job insights" />
            </div>

            <div className="order-1 min-w-0 text-center xl:order-2">
              {/* <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mb-5 inline-flex items-center rounded-full bg-[#ff4c00] px-4 py-2 text-[11px] font-bold uppercase tracking-normal text-white transition hover:bg-[#e94400]"
              >
                # Cover Letter Builder
              </button> */}
              <h1 className="mx-auto max-w-[820px] text-[30px] font-extrabold leading-[1.12] tracking-normal text-[#111827] sm:text-[44px] lg:text-[47px]">
                Track Every Job Application
                <br className="hidden sm:block" />
                in One Organized Dashboard
              </h1>
              <p className="mx-auto mt-5 max-w-[720px] text-[15px] font-medium leading-7 text-[#596273] sm:text-[17px] sm:leading-8">
                FlashFire helps you organize every stage of your job search, from saving job
                <br className="hidden sm:block" />
                opportunities and tracking applications to managing recruiter conversations
                <br className="hidden sm:block" />
                and interview progress, all in one centralized dashboard.
              </p>
            </div>

            <div className="order-2 xl:order-3">
              <TrackerMockup onAdd={handleGetMeInterview} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto max-w-[660px] text-center">
              <h2 className="text-[25px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px] sm:leading-[1.08]">
                Everything You Need to Organize Your Job Search
              </h2>
              <p className="mx-auto mt-5 max-w-[650px] text-[17px] font-medium leading-8 text-[#596273]">
                Keep every job application, recruiter conversation, interview, and follow-up
                organized in one place so you always know what to do next.
              </p>
            </div>

            <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-3">
              {standOutCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="h-full min-h-[198px] min-w-0 overflow-hidden border border-black bg-[#ff4c00] p-6 text-white shadow-[5px_5px_0_0_rgba(0,0,0,0.65)]"
                  >
                    <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff4c00]">
                      <Icon size={23} strokeWidth={2.3} />
                    </span>
                    <h3 className="text-[20px] font-extrabold leading-tight">{card.title}</h3>
                    <p className="mt-4 text-[15px] font-medium leading-7 text-white/90">{card.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#fff6f3] px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[420px_1fr] lg:items-start">
            <div className="lg:pl-10">
              <h2 className="max-w-[390px] text-[25px] font-extrabold leading-[1.18] tracking-normal text-[#111827] sm:text-[43px] sm:leading-[1.34]">
                Stay Organized From Your First Application to Your Job Offer
              </h2>
              <p className="mt-6 max-w-[430px] text-[18px] font-medium leading-8 text-[#596273]">
                FlashFire keeps every opportunity, application, recruiter, and interview
                organized so nothing gets missed during your job search.
              </p>
              <div className="mt-12 flex gap-4">
                <button
                  type="button"
                  aria-label="Previous workflow card"
                  onClick={() => scrollWorkflow("left")}
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="Next workflow card"
                  onClick={() => scrollWorkflow("right")}
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="hide-scrollbar flex snap-x items-stretch gap-8 overflow-x-auto scroll-smooth pb-2"
            >
              {workflowCards.map((card) => (
                <article
                  key={card.title}
                  className="min-h-[205px] w-[min(330px,calc(100vw-3rem))] shrink-0 snap-start overflow-hidden border border-black bg-white p-8 shadow-[5px_5px_0_0_rgba(0,0,0,0.75)] sm:w-[360px]"
                >
                  <span className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00] text-white">
                    <FileText size={24} />
                  </span>
                  <h3 className="text-[22px] font-extrabold leading-tight text-[#111827]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[16px] font-medium leading-7 text-[#596273]">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[920px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[25px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px] sm:leading-[1.08]">
                Who Benefits From FlashFire&apos;s Job Tracker?
              </h2>
              <p className="mx-auto mt-6 max-w-[760px] text-[15px] font-medium leading-7 text-[#6b7280]">
                Whether you&apos;re applying to a few roles or hundreds, FlashFire helps you stay
                organized throughout your job search.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-[740px] auto-rows-fr gap-3 sm:grid-cols-2">
              {audienceItems.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[118px] min-w-0 overflow-hidden rounded-md border border-[#e0e0e0] bg-white px-7 py-6 shadow-[0_8px_22px_rgba(0,0,0,0.10)]"
                >
                  <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                    <Check size={24} strokeWidth={3} />
                  </span>
                  <p className="text-[19px] font-bold leading-7 text-[#ff4c00]">{item.title}</p>
                  <p className="mt-2 text-[14px] font-medium leading-6 text-[#596273]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1040px]">
            <h2 className="mb-5 text-center text-[25px] font-extrabold leading-[1.15] text-[#111827] sm:text-[46px] sm:leading-[1.08]">
              Organize Your Job Search in 4 Simple Steps
            </h2>
            <p className="mx-auto mb-10 max-w-[660px] text-center text-[16px] font-medium leading-7 text-[#596273] sm:mb-14 sm:text-[17px]">
              Save opportunities, organize applications, monitor your progress, and manage
              recruiter conversations, all from one dashboard.
            </p>

            <div className="space-y-8 sm:space-y-12">
              {useSteps.map((step) => (
                <article
                  key={step.title}
                  className="grid min-h-[270px] min-w-0 items-center gap-7 border border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.65)] sm:grid-cols-2 sm:gap-12 sm:p-9 sm:shadow-[5px_5px_0_0_rgba(0,0,0,0.65)] lg:p-12"
                >
                  <div className={`min-w-0 ${step.reverse ? "sm:order-2" : ""}`}>
                    <p className="text-[12px] font-extrabold uppercase tracking-normal text-[#ff4c00]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-4 text-[23px] font-extrabold leading-tight text-[#ff4c00] sm:mt-5 sm:text-[28px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] font-semibold leading-7 text-black sm:mt-4 sm:text-[17px] sm:leading-8">{step.copy}</p>
                  </div>
                  <div className={`min-w-0 ${step.reverse ? "sm:order-1" : ""}`}>
                    <StepVisual type={step.visual} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff6f3] px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[880px] text-center">
            <h2 className="text-[25px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px] sm:leading-[1.08]">
              Why FlashFire Beats Tracking Job Applications in Spreadsheets
            </h2>
            <p className="mx-auto mt-5 max-w-[650px] text-[17px] font-medium leading-8 text-[#596273]">
              Spreadsheets become difficult to maintain as your job search grows. FlashFire keeps
              everything organized automatically.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[880px] overflow-hidden overflow-x-auto border border-black bg-white shadow-[5px_5px_0_0_rgba(0,0,0,0.65)]">
            <table className="w-full min-w-[300px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black bg-[#111827] text-white">
                  <th className="px-4 py-3.5 text-[15px] font-extrabold sm:px-6 sm:py-4 sm:text-[17px]">Spreadsheet</th>
                  <th className="px-4 py-3.5 text-[15px] font-extrabold text-[#ff4c00] sm:px-6 sm:py-4 sm:text-[17px]">
                    FlashFire
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.spreadsheet} className="border-b border-[#e0e0e0] last:border-b-0">
                    <td className="px-4 py-3.5 text-[14px] font-medium text-[#596273] sm:px-6 sm:py-4 sm:text-[15px]">
                      {row.spreadsheet}
                    </td>
                    <td className="px-4 py-3.5 text-[14px] font-bold text-[#111827] sm:px-6 sm:py-4 sm:text-[15px]">
                      {row.flashfire}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[880px] text-center">
            <h2 className="text-[25px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px] sm:leading-[1.08]">
              Why Most Job Searches Become Disorganized
            </h2>
            <p className="mx-auto mt-5 max-w-[650px] text-[17px] font-medium leading-8 text-[#596273]">
              As applications increase, it&apos;s easy to lose track of interviews, recruiter
              conversations, and follow-ups.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[880px] overflow-hidden overflow-x-auto border border-black bg-white shadow-[5px_5px_0_0_rgba(0,0,0,0.65)]">
            <table className="w-full min-w-[300px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black bg-[#111827] text-white">
                  <th className="px-4 py-3.5 text-[15px] font-extrabold sm:px-6 sm:py-4 sm:text-[17px]">
                    Without FlashFire
                  </th>
                  <th className="px-4 py-3.5 text-[15px] font-extrabold text-[#ff4c00] sm:px-6 sm:py-4 sm:text-[17px]">
                    With FlashFire
                  </th>
                </tr>
              </thead>
              <tbody>
                {problemRows.map((row) => (
                  <tr key={row.without} className="border-b border-[#e0e0e0] last:border-b-0">
                    <td className="px-4 py-3.5 text-[14px] font-medium text-[#596273] sm:px-6 sm:py-4 sm:text-[15px]">
                      {row.without}
                    </td>
                    <td className="px-4 py-3.5 text-[14px] font-bold text-[#111827] sm:px-6 sm:py-4 sm:text-[15px]">
                      {row.with}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Job Application Tracking</h2>
            <p>
              We get it, job application tracking can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobTrackerFAQs.map((faq, index) => (
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

function HeroPill({ className = "", label }: { className?: string; label: string }) {
  return (
    <div
      className={`flex min-h-[48px] items-center gap-3 rounded-lg border border-[#f4d9d1] bg-white px-3 text-[12px] font-bold text-[#111827] shadow-[0_14px_35px_rgba(17,24,39,0.08)] sm:min-h-[52px] sm:gap-4 sm:px-4 sm:text-[13px] ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#111827] text-[#ff4c00]">
        <ClipboardList size={17} />
      </span>
      {label}
    </div>
  );
}

function TrackerMockup({ onAdd }: { onAdd: () => void }) {
  const columns = [
    { title: "Wishlist", count: 10 },
    { title: "Applied", count: 5 },
    { title: "Interview", count: 2 },
  ];

  return (
    <div className="mx-auto w-full max-w-[330px] rounded-lg bg-white p-3 shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:max-w-[360px] sm:p-4 lg:w-[330px]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-[12px] font-extrabold text-[#111827]">My job search</h3>
          <p className="text-[9px] font-semibold text-[#7a8290]">Track everything in one place</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md bg-[#ff4c00] px-3 py-2 text-[9px] font-bold text-white transition hover:bg-[#e94400]"
        >
          Add More
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {columns.map((column) => (
          <div
            key={column.title}
            className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff0e8] p-2 sm:p-3"
          >
            <div className="mb-3 flex justify-between gap-1 text-[7px] font-extrabold text-[#111827] sm:text-[8px]">
              <span className="truncate">{column.title}</span>
              <span>{column.count}</span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-7 rounded-sm border border-[#ffd8ca] bg-white" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  if (type === "source") {
    return (
      <div className="min-w-0 rounded-[22px] border border-[#ffd8ca] bg-[#fff6f2] p-3 shadow-[0_8px_24px_rgba(255,76,0,0.08)] sm:rounded-[28px] sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 rounded-[18px] border border-[#ffd8ca] bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:flex-row sm:gap-5 sm:p-5">
          <div className="grid grid-cols-2 gap-2 sm:block sm:w-[34%] sm:space-y-3">
            {["LinkedIn", "Wellfound", "Google", "Indeed"].map((item) => (
              <div
                key={item}
                className="rounded-full border border-[#ffd8ca] bg-[#fff0e8] px-3 py-2 text-center text-[11px] font-extrabold text-black sm:px-4 sm:py-2.5 sm:text-left sm:text-[12px]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1 rounded-[16px] border border-[#ffd8ca] bg-white p-5">
            <div className="mb-3 h-4 w-28 max-w-full rounded bg-[#dfe3ea]" />
            <div className="mb-7 h-4 w-44 max-w-full rounded bg-[#dfe3ea]" />
            <div className="h-20 rounded-lg border border-[#ffd8ca] bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-5">
        <div className="grid min-w-0 grid-cols-3 gap-2 rounded-md border border-[#ffd8ca] bg-white p-3 sm:gap-3 sm:p-4">
          {["Wish", "Apply", "Int"].map((item) => (
            <div key={item} className="min-w-0 rounded bg-[#fff0e8] p-2 sm:p-3">
              <div className="mb-3 text-[9px] font-extrabold">{item}</div>
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="h-7 rounded-sm bg-white" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-6">
        <div className="rounded-xl bg-white p-4 sm:p-5">
          <p className="mb-5 text-[11px] font-extrabold">Job Search Summary</p>
          {["Applied", "Interview", "Accepted", "Rejected"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center gap-2 text-[9px] font-bold sm:gap-3 sm:text-[10px]">
              <span className="w-16 sm:w-20">{item}</span>
              <span
                className={`h-3 rounded bg-[#ff4c00]/20 ${
                  index === 0
                    ? "w-[90px] sm:w-[118px]"
                    : index === 1
                      ? "w-[76px] sm:w-[100px]"
                      : index === 2
                        ? "w-[62px] sm:w-[82px]"
                        : "w-[48px] sm:w-[64px]"
                }`}
              />
              <span>{index === 0 ? 50 : index === 1 ? 8 : index === 2 ? 2 : 15}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 rounded-[22px] border border-[#ffd8ca] bg-[#fff6f2] p-3 shadow-[0_8px_24px_rgba(255,76,0,0.08)] sm:rounded-[28px] sm:p-5">
      <div className="flex min-w-0 flex-col gap-4 rounded-[18px] border border-[#ffd8ca] bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:flex-row sm:gap-5 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:block sm:w-[34%] sm:space-y-3">
          {["Notes", "Contacts", "Docs", "History"].map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#ffd8ca] bg-[#fff0e8] px-3 py-2 text-center text-[11px] font-extrabold text-black sm:px-4 sm:py-2.5 sm:text-left sm:text-[12px]"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 rounded-[16px] border border-[#ffd8ca] bg-white p-5">
          <p className="mb-4 text-[15px] font-extrabold text-black">Manage Contact</p>
          <div className="mb-4 h-12 rounded-lg bg-[#f0f1f4]" />
          <div className="h-20 rounded-lg border border-[#ffd8ca] bg-[#fff0e8]" />
        </div>
      </div>
    </div>
  );
}
