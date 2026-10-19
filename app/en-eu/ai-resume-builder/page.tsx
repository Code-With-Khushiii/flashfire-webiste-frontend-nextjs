import { Metadata } from "next";

export { default } from "@/app/ai-resume-builder/page";

export const metadata: Metadata = {
  title: "AI Resume Builder for Job Seekers | Flashfire EU",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for in Europe.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/ai-resume-builder",
  },
};
