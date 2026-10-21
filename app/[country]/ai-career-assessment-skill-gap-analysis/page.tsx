import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-career-assessment-skill-gap-analysis/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Career Assessment & Skill Gap Analysis Tool | Flashfire EU",
  description:
    "Run an AI-powered career assessment and skill gap analysis to understand your strengths, weaknesses, and best-fit roles in the European job market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-career-assessment-skill-gap-analysis"),
    languages: hreflangLanguages("/ai-career-assessment-skill-gap-analysis"),
  },
}));
