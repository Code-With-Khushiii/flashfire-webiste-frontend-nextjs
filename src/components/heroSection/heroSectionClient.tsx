"use client";

import Image from "next/image";
import { useRef, type SyntheticEvent } from "react";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import HeroVideo from "./HeroVideo";

type Props = {
  data: HeroSectionData;
  heroImageSrc?: string;
  shiftHeroImageLeft?: boolean;
};

const heroStats = [
  {
    value: "1,200",
    label: "Applications are submitted in 2 months",
  },
  {
    value: "15+",
    label: "Average Interview calls",
  },
  {
    value: "60+",
    label: "Users landed jobs",
  },
];

const trustedUniversities = [
  {
    name: "Harvard University",
    domain: "harvard.edu",
    wordmark: ["HARVARD", "UNIVERSITY"],
    color: "#a7a7a7",
  },
  {
    name: "Stanford University",
    domain: "stanford.edu",
    wordmark: ["Stanford", "University"],
    color: "#8c1515",
  },
  {
    name: "University of Michigan",
    domain: "umich.edu",
    wordmark: ["UNIVERSITY OF", "MICHIGAN"],
    color: "#00274c",
  },
  {
    name: "Berkeley",
    domain: "berkeley.edu",
    wordmark: ["Berkeley", "UNIVERSITY OF CALIFORNIA"],
    color: "#003262",
  },
  {
    name: "Carnegie Mellon University",
    domain: "cmu.edu",
    wordmark: ["Carnegie", "Mellon", "University"],
    color: "#e1bfc4",
  },
];

const getUniversityLogo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const getUniversityLineClass = (universityName: string, lineIndex: number) => {
  if (universityName === "Berkeley" && lineIndex === 1) {
    return "text-[7px] font-bold leading-none tracking-[0.02em]";
  }

  if (universityName === "University of Michigan" && lineIndex === 0) {
    return "text-[8px] font-bold leading-none tracking-[0.03em]";
  }

  return "text-[20px] font-bold leading-[0.9] tracking-[-0.025em] xl:text-[22px]";
};

function PlaneTrailScene({
  priority = false,
  position = "topRight",
}: {
  priority?: boolean;
  position?: "topRight" | "bottomLeft";
}) {
  const isBottomLeft = position === "bottomLeft";

  return (
    <div
      className={`absolute inset-0 h-[200px] w-[200px] origin-center ${
        isBottomLeft ? "rotate-180" : ""
      }`}
    >
      <Image
        src="/images/element4.png"
        alt="Paper plane illustration"
        width={117}
        height={90}
        priority={priority}
        className={`absolute h-auto w-[300px] ${
          isBottomLeft ? "left-[0px] top-[10px]" : "left-0 top-0"
        }`}
      />
    </div>
  );
}

export default function HeroSectionClient({
  data,
  heroImageSrc = "/images/usa-img.png",
  shiftHeroImageLeft = false,
}: Props) {
  const mobileHeroFrameClass = shiftHeroImageLeft
    ? "w-[105vw] max-w-[460px]"
    : "w-[105vw] max-w-[460px]";
  const mobileHeroHeightClass = shiftHeroImageLeft
    ? "h-[300px] min-[340px]:h-[320px]"
    : "h-[300px] min-[340px]:h-[320px]";
  const mobileHeroOffsetClass = shiftHeroImageLeft ? "mt-16" : "mt-16";
  const mobileHeroImageClass = shiftHeroImageLeft
    ? "origin-bottom scale-[1.0]"
    : "origin-bottom scale-[1.0]";
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });
  const lastHeroCtaActivationRef = useRef(0);

  const handleGetStartedClick = (e?: SyntheticEvent<HTMLButtonElement>) => {
    try {
      e?.preventDefault();
      e?.stopPropagation();
    } catch {
      // Some browser-generated events cannot be cancelled.
    }

    if (typeof window === "undefined") return;

    const now = Date.now();
    if (now - lastHeroCtaActivationRef.current < 700) return;
    lastHeroCtaActivationRef.current = now;

    const utmSource = localStorage.getItem("utm_source") || "WEBSITE";
    const utmMedium = localStorage.getItem("utm_medium") || "Hero_Section";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Hero_Book_A_Demo_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: localStorage.getItem("utm_campaign") || "Website",
      },
    });
    trackButtonClick(data.cta.label, "hero_cta", "cta", {
      button_location: "hero_main_cta",
      section: "hero_landing",
      target_url: "/Get-Started",
    });
    trackSignupIntent("hero_cta", {
      signup_source: "hero_main_button",
      funnel_stage: "signup_intent",
      target_url: "/Get-Started",
    });

    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white font-['Space_Grotesk',sans-serif] text-black"
    >
      {/* Mobile / tablet hero */}
      <div className="bg-[#f7e6df] px-4 pb-10 pt-6 text-left sm:px-8 lg:hidden">
        <div className="mx-auto max-w-[640px]">
          <div className="mb-4 inline-flex h-[26px] max-w-full items-center justify-center rounded-full bg-white px-3.5 text-[10px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
            {data.badges[0]}
          </div>

          <h1 className="text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-black min-[400px]:text-[38px] sm:text-[46px]">
            <span className="block">Land More Interview Calls</span>
            <span className="block">
              With a Dedicated{" "}
              <FlashfireLogo
                width={58}
                height={58}
                className="-my-2 -ml-1 inline-block h-[1.5em] w-auto align-middle"
              />
            </span>
            <span className="block text-[#f55d1d]">Job Search Team</span>
          </h1>

          <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-[1.55] text-[#3a3a3a]">
            {data.description[0]} {data.description[1]} {data.description[2]}
          </p>

          <div className="mt-6 flex flex-row flex-wrap items-center gap-3">
            <button
              type="button"
              {...getButtonProps()}
              onPointerUp={handleGetStartedClick}
              onClick={handleGetStartedClick}
              className="inline-flex h-[44px] w-auto touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-5 text-[15px] font-bold text-white shadow-[0_4px_0_#000] outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
            >
              Get Started →
            </button>
            <a
              href="#how-it-works"
              className="inline-flex h-[44px] w-auto items-center justify-center rounded-[10px] border border-black px-5 text-[14px] font-bold text-black"
            >
              See how Flashfire works
            </a>
          </div>

          <div className="mt-7 pr-1">
            <HeroVideo />
          </div>
        </div>
      </div>

      <div className="relative isolate hidden overflow-visible lg:block">
        <div className="relative z-0 overflow-hidden bg-[#f7e6df]">
          <Image
            src="/images/element1.png"
            alt=""
            aria-hidden
            width={83}
            height={99}
            priority
            className="pointer-events-none absolute left-[46%] top-[90px] z-10 h-auto w-[44px] select-none"
          />
          <Image
            src="/images/element3.png"
            alt=""
            aria-hidden
            width={207}
            height={213}
            className="pointer-events-none absolute bottom-[70px] left-[44%] z-10 h-auto w-[36px] select-none"
          />

          <div className="relative z-20 mx-auto grid w-full max-w-[1280px] grid-cols-2 items-center gap-12 px-[5.4vw] py-20 xl:gap-16">
            <div className="text-left">
              <div className="mb-5 inline-flex h-[26px] items-center justify-center rounded-full bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
                {data.badges[0]}
              </div>

              <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-0.02em] text-black xl:text-[54px]">
                <span className="block">Land More Interview Calls</span>
                <span className="mt-1 block">
                  With a Dedicated{" "}
                  <FlashfireLogo
                    width={58}
                    height={58}
                    className="-my-2 -ml-1 inline-block h-[1.5em] w-auto align-middle"
                  />{" "}
                  <span className="text-[#f55d1d]">Job Search Team</span>
                </span>
              </h1>

              <p className="mt-6 max-w-[520px] font-['Satoshi',sans-serif] text-[17px] font-medium leading-[1.6] text-[#3a3a3a]">
                {data.description[0]} {data.description[1]} {data.description[2]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  {...getButtonProps()}
                  onClick={handleGetStartedClick}
                  className="inline-flex h-[54px] min-w-[174px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-7 text-[18px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  Get Started →
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex h-[54px] items-center justify-center rounded-[10px] border border-black bg-transparent px-7 text-[16px] font-bold text-black transition duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  See how Flashfire works
                </a>
              </div>
            </div>

            <div className="w-full">
              <HeroVideo />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
