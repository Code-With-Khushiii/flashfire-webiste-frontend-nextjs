"use client";

import Image from "next/image";
import { useRef, type SyntheticEvent } from "react";
import { usePathname } from "next/navigation";
import {
  heroSectionData,
  heroSectionDataAU,
  heroSectionDataCA,
  heroSectionDataEU,
  heroSectionDataUK,
} from "@/src/data/herosection";
import { getEUCountryName, getLocale, type Locale } from "@/src/utils/locale";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import HeroVideo from "./HeroVideo";

type Props = {
  country?: Locale;
};

const HERO_EYEBROW = "Job search assistance, built around your goals";
const HERO_HEADING = "Spend less time applying. Focus on landing the right opportunity.";
const HERO_DESCRIPTION =
  "Flashfire finds relevant openings, tailors your resume, applies to suitable jobs and tracks progress — combining AI-assisted workflows with human review and support.";
const HERO_NOTE =
  "Personalized targeting. Visibility into your applications. No promise of interviews or offers.";

function HeroSection({ country }: Props) {
  const pathname = usePathname();
  const locale: Locale = country ?? getLocale(pathname);
  const data =
    locale === "uk"
      ? heroSectionDataUK
      : locale === "ca"
        ? heroSectionDataCA
        : locale === "au"
          ? heroSectionDataAU
          : locale === "eu"
            ? heroSectionDataEU
            : heroSectionData;
  const euCountry = locale === "eu" ? getEUCountryName(pathname) : null;
  const heroData = euCountry
    ? {
        ...data,
        description: [
          `We apply to 1200 ${euCountry} job applications & track everything while you focus on winning the interview.`,
        ],
      }
    : data;

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
    trackButtonClick(heroData.cta.label, "hero_cta", "cta", {
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
      <div className="bg-[#f7e6df] px-4 pb-10 pt-6 text-left sm:px-8 lg:hidden">
        <div className="mx-auto max-w-[640px]">
          <div className="mb-4 inline-flex h-[26px] max-w-full items-center justify-center rounded-full bg-white px-3.5 text-[10px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
            {HERO_EYEBROW}
          </div>

          <h1 className="text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-black min-[400px]:text-[38px] sm:text-[46px]">
            {HERO_HEADING}
          </h1>

          <p className="mt-4 font-['Satoshi',sans-serif] text-[15px] font-medium leading-[1.55] text-[#3a3a3a]">
            {HERO_DESCRIPTION}
          </p>

          <div className="mt-6 flex flex-row flex-wrap items-center gap-3">
            <button
              type="button"
              {...getButtonProps()}
              onPointerUp={handleGetStartedClick}
              onClick={handleGetStartedClick}
              className="inline-flex h-[44px] w-auto touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-5 text-[15px] font-bold text-white shadow-[0_4px_0_#000] outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
            >
              Get started
            </button>
            <a
              href="#how-it-works"
              className="inline-flex h-[44px] w-auto items-center justify-center rounded-[10px] border border-black px-5 text-[14px] font-bold text-black"
            >
              See how Flashfire works
            </a>
          </div>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#5a524d]">{HERO_NOTE}</p>

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

          <div className="relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-10 px-[4vw] py-20 xl:gap-12">
            <div className="text-left">
              <div className="mb-5 inline-flex h-[26px] items-center justify-center rounded-full bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
                {HERO_EYEBROW}
              </div>

              <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-0.02em] text-black xl:text-[54px]">
                {HERO_HEADING}
              </h1>

              <p className="mt-6 max-w-[520px] font-['Satoshi',sans-serif] text-[17px] font-medium leading-[1.6] text-[#3a3a3a]">
                {HERO_DESCRIPTION}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  {...getButtonProps()}
                  onClick={handleGetStartedClick}
                  className="inline-flex h-[54px] min-w-[174px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-7 text-[18px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  Get started
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex h-[54px] items-center justify-center rounded-[10px] border border-black bg-transparent px-7 text-[16px] font-bold text-black transition duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
                >
                  See how Flashfire works
                </a>
              </div>
              <p className="mt-5 max-w-[520px] text-[14px] leading-[1.5] text-[#5a524d]">{HERO_NOTE}</p>
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

export default HeroSection;
