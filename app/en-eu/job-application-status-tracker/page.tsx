import { Metadata } from "next";

export { default } from "@/app/job-application-status-tracker/page";

export const metadata: Metadata = {
  title: "Job Application Status Tracker with AI | Flashfire EU",
  description:
    "Track every job application, follow-up, and interview in one AI-powered job application status tracker.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/job-application-status-tracker",
  },
};
