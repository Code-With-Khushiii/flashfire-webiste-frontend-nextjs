"use client";

import { usePathname } from "next/navigation";
import { localizeHref } from "@/src/utils/locale";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function HomeFinalCTA() {
  const pathname = usePathname();
  const { getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleGetStarted = () => {
    try {
      trackButtonClick("Get Started", "final_cta", "cta", {
        button_location: "home_final_cta",
        section: "home_final_cta",
      });
      trackSignupIntent("final_cta", {
        signup_source: "home_final_cta_button",
        funnel_stage: "signup_intent",
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    } finally {
      stopHold();
    }
  };

  return (
    <section className="w-full border-t border-[#111] bg-white px-5 py-20 font-['Space_Grotesk',sans-serif] md:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
        <div className="max-w-[760px]">
          <h2 className="text-[34px] font-bold leading-[1.1] text-black md:text-[44px]">
            Make your next job search more focused.
          </h2>
          <p className="mt-4 text-[16px] leading-[1.5] text-[#545b65] md:text-[18px]">
            Start with your goals, understand the service scope and choose
            support with visibility into the work.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            {...getButtonProps()}
            onClick={handleGetStarted}
            className="inline-flex h-[54px] items-center justify-center rounded-[10px] bg-[#ff4c00] px-7 text-[17px] font-bold text-white shadow-[0_6px_0_#000] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
          >
            Get Started →
          </button>
          <a
            href={localizeHref("/pricing", pathname)}
            className="inline-flex h-[54px] items-center justify-center rounded-[10px] border border-black px-7 text-[16px] font-bold text-black transition hover:bg-[#fbf3ee]"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}
