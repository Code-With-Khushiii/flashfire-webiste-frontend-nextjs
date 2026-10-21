import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-resume-summary-generator/page";

export const metadata: Metadata = {
  title: "AI Resume Summary Generator | Flashfire Australia",
  description: "Generate a compelling professional resume summary in seconds. Free AI resume summary generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-resume-summary-generator",
    languages: hreflangLanguages("/ai-resume-summary-generator"),
  },
};
