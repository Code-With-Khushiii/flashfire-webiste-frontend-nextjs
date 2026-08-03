"use client";

import Image from "next/image";
import { useRef, type SyntheticEvent } from "react";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

type Props = {
  data: HeroSectionData;
  heroImageSrc?: string;
  shiftHeroImageLeft?: boolean;
};

const heroStats = [
  {
    value: "1,200",
    label: "Applications are submitted in 2 months",
    tone: "bg-black text-white",
  },
  {
    value: "15+",
    label: "Average Interview calls",
    tone: "bg-[#ff4c00] text-white",
  },
  {
    value: "60+",
    label: "Users landed jobs",
    tone: "bg-black text-white",
  },
];

const trustedUniversities = [
  { name: "Harvard University", domain: "harvard.edu" },
  { name: "Stanford University", domain: "stanford.edu" },
  { name: "University of Michigan", domain: "umich.edu" },
  { name: "Berkeley", domain: "berkeley.edu" },
  { name: "Carnegie Mellon University", domain: "cmu.edu" },
];

const getUniversityLogo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export default function HeroSectionClient({
  data,
  heroImageSrc = "/images/usa-img.png",
  shiftHeroImageLeft = false,
}: Props) {
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
    <section className="relative w-full overflow-hidden bg-white font-['Space_Grotesk',sans-serif] text-black">
      <div className="mx-auto max-w-7xl px-6 pt-14 sm:px-10 lg:pt-20">
        <div
          className={`grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12 ${
            shiftHeroImageLeft ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Text column */}
          <div className="relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              {data.badges[0]}
            </span>

            <h1 className="mt-6 text-[40px] font-black leading-[0.98] tracking-[-0.03em] text-black sm:text-[56px] lg:text-[52px] xl:text-[68px]">
              <span className="block">Land More Interview Calls</span>
              <span className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
                <span className="inline-flex shrink-0 items-center gap-x-1 whitespace-nowrap">
                  <span>With a Dedicated</span>
                  <FlashfireLogo
                    width={54}
                    height={54}
                    className="-ml-1 inline-block h-[0.95em] w-auto align-middle"
                  />
                </span>
                <span className="inline-block shrink-0 whitespace-nowrap bg-[#ff4c00] px-3 py-1 text-white">
                  Job Search Team
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-[480px] font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a] lg:mx-0 lg:text-[17px]">
              {data.description.join(" ")}
            </p>

            <div className="mt-9 flex justify-center lg:justify-start">
              <button
                type="button"
                {...getButtonProps()}
                onClick={handleGetStartedClick}
                className="inline-flex h-[58px] items-center justify-center rounded-[4px] border-2 border-black bg-[#ff4c00] px-9 text-[18px] font-bold text-white shadow-[6px_6px_0_#000] outline-none transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff4c00] focus-visible:ring-offset-2 active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0_#000]"
              >
                {data.cta.label}
              </button>
            </div>

            <div className="mx-auto mt-11 grid max-w-lg grid-cols-3 gap-3 lg:mx-0">
              {heroStats.map((stat) => (
                <div
                  key={stat.value}
                  className={`flex flex-col gap-1 rounded-[4px] px-3 py-4 text-left ${stat.tone}`}
                >
                  <strong className="text-[24px] font-black leading-none tracking-[-0.02em] sm:text-[28px]">
                    {stat.value}
                  </strong>
                  <span className="font-['Satoshi',sans-serif] text-[10px] font-bold leading-[1.2] opacity-80 sm:text-[11px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Showcase photo column — bold offset color block behind, clearly separate from text */}
          <div className="relative mx-auto w-full max-w-[440px] pb-10 lg:max-w-none lg:pb-0">
            <div
              aria-hidden="true"
              className="absolute right-4 top-6 h-full w-full rounded-[4px] bg-[#ff4c00] lg:right-6 lg:top-8"
            />
            <div className="relative h-[380px] w-full overflow-hidden rounded-[4px] border-2 border-black bg-white sm:h-[460px] lg:h-[540px] xl:h-[600px]">
              <Image
                src={heroImageSrc}
                alt="Students celebrating career success with Flashfire"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trusted universities */}
      <div className="mt-6 border-t-2 border-black bg-white py-9 lg:py-11">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-['Satoshi',sans-serif] text-[13px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a] md:text-[14px]">
            {data.universityHeading}
          </p>

          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {trustedUniversities.map((university) => (
              <div key={university.name} className="flex items-center gap-2 opacity-80">
                <Image
                  src={getUniversityLogo(university.domain)}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] object-contain"
                  unoptimized
                />
                <span className="whitespace-nowrap text-[13px] font-bold text-[#333]">
                  {university.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
