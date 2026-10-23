"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./homePageResultStats.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { useEffect, useState } from "react";

export default function HomePageResultStats() {
  const [showStrategyCard, setShowStrategyCard] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }
    },
  });
  useEffect(() => {
    const openCard = () => setShowStrategyCard(true);
    window.addEventListener("showStrategyCallCard", openCard);
    return () =>
      window.removeEventListener("showStrategyCallCard", openCard);
  }, []);
  

  return (
    <section className={styles.resultSection}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <p className={styles.resultTagline}>RESULT THAT SPEAKS</p>
            <h2 className={styles.resultHeading}>Results at a glance</h2>
          </div>
          <p className={styles.resultIntro}>
            Get more interview calls with a dedicated job search team.
            Individual outcomes vary; interviews and offers are not guaranteed.
          </p>
        </div>

        <div className={styles.resultStats}>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>95%</h3>
            <p className={styles.resultStatText}>
              Users land interview call within a month*
            </p>
          </div>
          <div className={styles.resultStatBox}>
            <h3 className={styles.resultStatNumber}>90%</h3>
            <p className={styles.resultStatText}>
              Users get job offer within 3 months*
            </p>
          </div>
        </div>

        <div className={styles.resultBanner}>
          <p className={styles.resultBannerTitle}>60+ offer letters received</p>
          <button
            {...getButtonProps()}
            className={styles.resultButton}
          onClick={() => {
            const utmSource =
              typeof window !== "undefined"
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";

            const utmMedium =
              typeof window !== "undefined"
                ? localStorage.getItem("utm_medium") || "Result_Stats_Section"
                : "Result_Stats_Section";

            GTagUTM({
              eventName: "sign_up_click",
              label: "Result_Stats_Get_Me_Interview_Button",
              utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign:
                  typeof window !== "undefined"
                    ? localStorage.getItem("utm_campaign") || "Website"
                    : "Website",
              },
            });

            trackButtonClick(
              "schedule a free career call",
              "result_stats_cta",
              "cta",
              {
                button_location: "result_stats_section",
                section: "result_stats",
                target_url: "/schedule-a-free-career-call",
              }
            );

            trackSignupIntent("result_stats_cta", {
              signup_source: "result_stats_button",
              funnel_stage: "signup_intent",
              target_url: "/schedule-a-free-career-call",
            });

            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
            }
          }}
          >
            Schedule a Free Career Call
          </button>
        </div>

        <p className={styles.resultNote}>
          *Based on verified user data from 2024-25 cohort.
        </p>
      </div>
    </section>
  );
}
