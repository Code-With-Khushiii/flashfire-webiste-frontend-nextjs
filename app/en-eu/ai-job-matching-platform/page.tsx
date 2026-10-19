import { Metadata } from "next";

export { default } from "@/app/ai-job-matching-platform/page";

export const metadata: Metadata = {
  title: "AI Job Matching Platform | Flashfire EU",
  description:
    "Flashfire's AI job matching platform connects your skills, experience, and goals with the right roles across the European market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/ai-job-matching-platform",
  },
};
