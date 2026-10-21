import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-headline-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Resume Headline Generator | Flashfire EU",
  description: "Generate 5 AI-powered, recruiter-tested resume headlines instantly. Free resume headline generator.",
  alternates: {
    canonical: url("/resume-headline-generator"),
    languages: hreflangLanguages("/resume-headline-generator"),
  },
}));
