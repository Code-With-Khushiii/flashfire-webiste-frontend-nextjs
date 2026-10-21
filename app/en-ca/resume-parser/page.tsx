import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-parser/page";

export const metadata: Metadata = {
  title: "Resume Parser | Flashfire Canada",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/resume-parser",
    languages: hreflangLanguages("/resume-parser"),
  },
};
