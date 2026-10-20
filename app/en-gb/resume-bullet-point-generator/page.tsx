import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-bullet-point-generator/page";

export const metadata: Metadata = {
  title: "Resume Bullet Point Generator | Flashfire UK",
  description: "Turn vague job duties into sharp, ATS-friendly bullet points. Free AI resume bullet point generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/resume-bullet-point-generator",
    languages: hreflangLanguages("/resume-bullet-point-generator"),
  },
};
