import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-job-matching-platform/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Job Matching Platform | Flashfire EU",
  description:
    "Flashfire's AI job matching platform connects your skills, experience, and goals with the right roles across the European market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-job-matching-platform"),
    languages: hreflangLanguages("/ai-job-matching-platform"),
  },
}));
