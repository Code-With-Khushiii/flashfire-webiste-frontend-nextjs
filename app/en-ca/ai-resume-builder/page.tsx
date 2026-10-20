import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-resume-builder/page";

export const metadata: Metadata = {
  title: "AI Resume Builder for Job Seekers | Flashfire Canada",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for in Canada.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ai-resume-builder",
    languages: hreflangLanguages("/ai-resume-builder"),
  },
};
