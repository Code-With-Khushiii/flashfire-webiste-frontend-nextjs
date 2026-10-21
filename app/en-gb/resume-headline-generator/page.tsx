import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-headline-generator/page";

export const metadata: Metadata = {
  title: "Resume Headline Generator | Flashfire UK",
  description: "Generate 5 AI-powered, recruiter-tested resume headlines instantly. Free resume headline generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/resume-headline-generator",
    languages: hreflangLanguages("/resume-headline-generator"),
  },
};
