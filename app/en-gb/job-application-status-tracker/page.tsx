import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/job-application-status-tracker/page";

export const metadata: Metadata = {
  title: "Job Application Status Tracker with AI | Flashfire UK",
  description:
    "Track every job application, follow-up, and interview in one AI-powered job application status tracker.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/job-application-status-tracker",
    languages: hreflangLanguages("/job-application-status-tracker"),
  },
};
