import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-job-alerts/page";

export const metadata: Metadata = {
  title: "AI Job Alerts & Smart Job Notifications | Flashfire Australia",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile in Australia.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-job-alerts",
    languages: hreflangLanguages("/ai-job-alerts"),
  },
};
