"use client";

import { ClipboardList, HandHeart, Puzzle, Sparkles, ArrowRight } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const features = [
  {
    icon: Puzzle,
    number: "01",
    title: "Jobs That Match Your Goals",
    text: "We understand your skills, experience, and career goals to help you target the right opportunities.",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "Strategic Job Search",
    text: "We focus on quality opportunities that genuinely fit your profile, not just more applications.",
  },
  {
    icon: HandHeart,
    number: "03",
    title: "Personalized Career Support",
    text: "Every recommendation is tailored to your experience, interests, and long-term career goals.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Apply With Confidence",
    text: "We help you apply to roles where you're a strong fit, increasing your chances of interview calls.",
  },
];

export default function JobMatchingSection() {
  const { getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleStartAIJobSearch = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Matching_Section"
          : "Job_Matching_Section";

      GTagUTM({
        eventName: "sign_up_click",
        label: "Job_Matching_Start_AI_Job_Search_Button",
        utmParams: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign:
            typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
        },
      });
      trackButtonClick("Start AI-Powered Job Search", "job_matching_cta", "cta", {
        button_location: "job_matching_section",
        section: "job_matching",
      });
      trackSignupIntent("job_matching_cta", {
        signup_source: "job_matching_button",
        funnel_stage: "signup_intent",
      });

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", "/Get-Started");
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    } catch (error) {
      console.error("Error starting AI job search:", error);
    } finally {
      stopHold();
    }
  };

  return (
    <section className="w-full bg-[#fafafa] px-4 py-20 sm:px-6 md:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          {/* Left column: sticky intro + CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4c00]/30 bg-[#ff4c00]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4c00]">
              Why Flashfire
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-black md:text-5xl">
              More Than a{" "}
              <span className="relative inline-block">
                Job Application
                <svg
                  className="absolute -bottom-1 left-0 w-full text-[#ff4c00]"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 Q 50 0, 100 4 T 200 3"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              Service
            </h2>

            <p className="mt-6 max-w-md text-base font-medium leading-8 text-[#7a7a7a] md:text-lg">
              Landing interviews takes more than clicking &ldquo;Apply.&rdquo;
              Flashfire combines experienced career experts with intelligent
              technology to help you find better opportunities, improve your
              resume, apply strategically, stay organized, and prepare for
              interviews.
            </p>
            <p className="mt-3 max-w-md text-base font-bold leading-8 text-black md:text-lg">
              Technology helps us move faster. Our people help you get hired.
            </p>

            <button
              {...getButtonProps()}
              onClick={handleStartAIJobSearch}
              className="group mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] bg-black px-8 text-base font-bold text-white shadow-md transition-colors hover:bg-[#ff4c00] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
            >
              Start AI-Powered Job Search
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right column: numbered feature list */}
          <div className="divide-y divide-[#e4e4e4] rounded-[5px] border border-[#e4e4e4] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative flex items-start gap-6 overflow-hidden px-7 py-8 transition-colors duration-200 hover:bg-[#fff7f2] sm:px-9"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-0 bg-[#ff4c00] transition-all duration-200 group-hover:w-1"
                  />

                  <span className="shrink-0 font-mono text-sm font-bold text-[#d0d0d0] transition-colors duration-200 group-hover:text-[#ff4c00] md:text-base">
                    {item.number}
                  </span>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff1e8] text-[#ff4c00] transition-colors duration-200 group-hover:bg-[#ff4c00] group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="mb-1.5 text-base font-extrabold text-black md:text-lg">
                      {item.title}
                    </h3>

                    <p className="text-sm font-medium leading-6 text-[#777] md:text-[15px]">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
