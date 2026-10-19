import { Metadata } from "next";

export { default } from "@/app/ai-job-alerts/page";

export const metadata: Metadata = {
  title: "AI Job Alerts & Smart Job Notifications | Flashfire EU",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile in Europe.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/ai-job-alerts",
  },
};
