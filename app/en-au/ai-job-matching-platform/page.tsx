import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-job-matching-platform/page";

export const metadata: Metadata = {
  title: "AI Job Matching Platform | Flashfire Australia",
  description:
    "Flashfire's AI job matching platform connects your skills, experience, and goals with the right roles across the Australian market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-job-matching-platform",
    languages: hreflangLanguages("/ai-job-matching-platform"),
  },
};
