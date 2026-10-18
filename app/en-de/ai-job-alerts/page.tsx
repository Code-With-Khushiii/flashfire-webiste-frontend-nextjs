import { Metadata } from "next";

export { default } from "@/app/ai-job-alerts/page";

export const metadata: Metadata = {
  title: "AI Job Alerts & Smart Job Notifications | Flashfire EU",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile in Europe.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-de/ai-job-alerts",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-job-alerts",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-job-alerts",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-job-alerts",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-job-alerts",
      "en-IE": "https://www.flashfirejobs.com/en-ie/ai-job-alerts",
      "en-DE": "https://www.flashfirejobs.com/en-de/ai-job-alerts",
      "en-NL": "https://www.flashfirejobs.com/en-nl/ai-job-alerts",
      "en-FR": "https://www.flashfirejobs.com/en-fr/ai-job-alerts",
      "x-default": "https://www.flashfirejobs.com/ai-job-alerts",
    },
  },
};
