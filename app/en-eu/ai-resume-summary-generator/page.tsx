import { Metadata } from "next";

export { default } from "@/app/ai-resume-summary-generator/page";

export const metadata: Metadata = {
  title: "AI Resume Summary Generator | Flashfire EU",
  description: "Generate a compelling professional resume summary in seconds. Free AI resume summary generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/ai-resume-summary-generator",
  },
};
