"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import {
  Target,
  Rocket,
  Handshake,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { stripLocalePrefix, localizeHref } from "@/src/utils/locale";

const steps = [
  {
    id: 1,
    title: "Share Your Goals & Location",
    description: "We learn your job preferences, skills, and where you want to work.",
    icon: Target,
  },
  {
    id: 2,
    title: "We Scan Matching Jobs",
    description: "Flashfire filters roles near you that match your skills, visa status, salary expectations, and more.",
    icon: Rocket,
  },
  {
    id: 3,
    title: "Our Team Applies for You",
    description: "A dedicated team of 4-5 trained professionals applies manually to each role.",
    icon: Handshake,
  },
  {
    id: 4,
    title: "You Get Updates",
    description: "You see where applications are sent and how they perform - without doing it yourself.",
    icon: Trophy,
  },
];

const benefits = [
  "Flashfire scans job listings near your location",
  "Our team applies to matched roles for you",
  "You get updates without lifting a finger"
];

const liveApplications = [
  { role: "Software Engineer", company: "Google", location: "Mountain View, CA", status: "Applied" },
  { role: "Product Manager", company: "Meta", location: "Menlo Park, CA", status: "Applied" },
  { role: "Data Scientist", company: "Netflix", location: "Los Gatos, CA", status: "Scanning" },
];

const jobSearchFaqs = [
  {
    question: "How is Flashfire different from a normal job search?",
    answer:
      "A normal job search means hours spent scrolling through job boards, retyping the same details into dozens of application forms, and losing track of which roles you've already applied to. Flashfire replaces that manual grind with a dedicated team that searches, filters, and applies to matching roles on your behalf, so your time goes into interview prep instead of data entry.",
  },
  {
    question: "Do real people apply to jobs, or is it fully automated?",
    answer:
      "It's human-powered automation. A trained team of 4-5 specialists reviews each opening, checks it against your goals, skills, visa status, and salary expectations, and submits a tailored application. Software helps us scan listings faster, but a person makes the final call on every submission.",
  },
  {
    question: "What information does Flashfire use to find matching jobs?",
    answer:
      "We start with your target roles, preferred locations, salary range, work authorization status, and core skills. From there, we continuously scan job listings across company career pages and major job boards, filtering out roles that don't fit so you only see progress on opportunities that actually match your profile.",
  },
  {
    question: "How will I know which jobs have been applied to?",
    answer:
      "Every application is logged and visible from your dashboard in real time. You'll see the company, role, and application status without having to ask for updates or dig through your inbox for confirmation emails.",
  },
  {
    question: "Is this job search service suitable for career changers and recent graduates?",
    answer:
      "Yes. Whether you're pivoting industries, graduating and applying for your first full-time role, or a working professional looking for your next step, the underlying process is the same: define your goals, let the team find and apply to matching roles, and review progress from one place instead of managing it all yourself.",
  },
];

export default function JobSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetStarted = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Search_Page"
          : "Job_Search_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Search_Get_Started_Button",
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
        trackButtonClick("Get Started With Flashfire", "job_search_cta", "cta", {
          button_location: "job_search_cta_section",
          section: "job_search_cta",
        });
        trackSignupIntent("job_search_cta", {
          signup_source: "job_search_cta_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path first
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        stripLocalePrefix(normalizedPath) === "/get-me-interview";
      const isOnJobSearchPage =
        stripLocalePrefix(normalizedPath) === "/job-search";

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

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

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      // If on job search page, change URL but keep page content visible
      if (isOnJobSearchPage) {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem(
            "previousPageBeforeGetMeInterview",
            normalizedPath
          );
          sessionStorage.setItem(
            "preserveScrollPosition",
            currentScrollY.toString()
          );
        }

        const targetPath = localizeHref("/get-me-interview", normalizedPath);
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }

      // Only navigate if NOT already on the page
      const targetPath = "/get-me-interview";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Get Started handler:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf9f7] text-slate-900">

      {/* ===== Hero: full-width editorial ===== */}
      <section className="relative border-b border-slate-200/70 px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4c00]/40 to-transparent" />

        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4c00]">
            <span className="h-px w-8 bg-[#ff4c00]" />
            Human-powered automation
            <span className="h-px w-8 bg-[#ff4c00]" />
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Find Jobs Faster With{" "}
            <span className="italic text-[#ff4c00]">Human-Powered</span>{" "}
            Automation
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Flashfire applies to relevant jobs on your behalf so you don&apos;t have to search manually.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {benefits.map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                <Check className="h-3.5 w-3.5 text-[#ff4c00]" strokeWidth={3} />
                {benefit}
              </span>
            ))}
          </div>

          <button
            {...getButtonProps()}
            onClick={handleGetStarted}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-8 py-4 text-lg font-bold text-white shadow-[0_15px_35px_-10px_rgba(255,76,0,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#e64400]"
          >
            Get Started With Flashfire
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Live application feed */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-25px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-medium text-slate-400">Flashfire Dashboard — live feed</span>
            </div>
            <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {liveApplications.map((app) => {
                const scanning = app.status === "Scanning";
                return (
                  <div key={app.role} className="p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          scanning
                            ? "animate-pulse bg-slate-100 text-slate-500"
                            : "bg-[#ff4c00]/10 text-[#ff4c00]"
                        }`}
                      >
                        {scanning ? "Scanning…" : "Applied"}
                      </span>
                    </div>
                    <p className="mt-3 font-semibold text-slate-900">{app.role}</p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {app.company} • {app.location}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works: vertical timeline ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              Your job search, automated in four simple steps
            </p>
          </div>

          <ol className="relative space-y-10 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#ff4c00]/20">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <li key={step.id} className="relative pl-16">
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a3d] text-white shadow-md ring-4 ring-white">
                    <IconComponent className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-sm font-bold text-[#ff4c00]">
                      Step 0{step.id}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="mt-2 max-w-lg leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ===== Why Choose: sticky two-column ===== */}
      <section className="border-y border-slate-200 bg-[#fdf9f7] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Why Job Seekers Choose Flashfire
            </h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-[#ff4c00]" />
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-slate-600">
            <p className="border-l-2 border-[#ff4c00]/30 pl-5">
              Searching for a job while working full-time, studying, or managing a career transition is exhausting.
              Most job seekers spend more time filling out repetitive application forms than actually preparing for
              interviews. Flashfire was built to fix that imbalance by taking the manual, repetitive part of the
              job search off your plate.
            </p>
            <p className="border-l-2 border-[#ff4c00]/30 pl-5">
              Instead of relying on generic keyword matching, our team looks at your specific goals — the roles
              you want, the industries you're targeting, your location preferences, and your visa or work
              authorization status — before applying to a single job. That means the applications going out under
              your name are relevant, not just high in volume.
            </p>
            <p className="border-l-2 border-[#ff4c00]/30 pl-5">
              This approach works well for people who already know what they want but don't have the bandwidth to
              apply consistently, as well as for people who are new to the job market and unsure where to start.
              Either way, you keep full visibility into every application through your dashboard, so you're never
              left wondering what's happening with your job search.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ: matches site-wide FAQ style ===== */}
      <section className="w-full bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-[980px] text-center">
          <h2 className="text-[clamp(1.9rem,4vw,3.1rem)] font-extrabold leading-[1.05] text-[#02050a]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto max-w-[900px] border border-[#ebdfd7] bg-white">
          {jobSearchFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="relative border-b border-[#eee7e1] last:border-b-0"
              >
                {isOpen && (
                  <>
                    <span className="pointer-events-none absolute -left-px -top-px h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-[#ff4c00]" />
                    <span className="pointer-events-none absolute -right-px -top-px h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px] border-[#ff4c00]" />
                    <span className="pointer-events-none absolute -bottom-px -left-px h-3.5 w-3.5 border-b-[1.5px] border-l-[1.5px] border-[#ff4c00]" />
                    <span className="pointer-events-none absolute -bottom-px -right-px h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] border-[#ff4c00]" />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-6 px-5 text-left text-[1rem] font-extrabold leading-[1.25] text-[#05070b] transition-colors hover:bg-[#fffaf7] sm:px-8 sm:text-[1.08rem] ${
                    isOpen ? "pb-[0.8rem] pt-[1.35rem]" : "py-[1.35rem]"
                  }`}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`inline-flex flex-none items-center justify-center text-[0.95rem] ${
                      isOpen ? "text-[#05070b]" : "text-[#ff4c00]"
                    }`}
                  >
                    {isOpen ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-[1.3rem] pr-10 text-[0.95rem] leading-[1.35] text-[#6f6965] sm:px-8 sm:pr-[4.5rem] sm:text-[1.03rem]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA: full-bleed orange band ===== */}
      <section className="bg-gradient-to-br from-[#ff4c00] to-[#ff7a3d] px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to Let Flashfire Search &amp; Apply for You?
          </h2>
          <p className="mt-4 text-lg text-white/85">
            Set the goal. Flashfire runs the system.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              {...getButtonProps()}
              onClick={handleGetStarted}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#ff4c00] shadow-lg transition-all hover:-translate-y-0.5"
            >
              Get Started With Flashfire
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <p className="mt-6 text-sm text-white/75">
            No credit card required • Setup takes 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}