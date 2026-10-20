import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-career-assessment-skill-gap-analysis/page";

export const metadata: Metadata = {
  title: "AI Career Assessment & Skill Gap Analysis Tool | Flashfire UK",
  description:
    "Run an AI-powered career assessment and skill gap analysis to understand your strengths, weaknesses, and best-fit roles in the UK job market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/ai-career-assessment-skill-gap-analysis",
    languages: hreflangLanguages("/ai-career-assessment-skill-gap-analysis"),
  },
};
