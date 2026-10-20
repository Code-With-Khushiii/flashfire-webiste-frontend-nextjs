import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-resume-summary-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Resume Summary Generator | Flashfire EU",
  description: "Generate a compelling professional resume summary in seconds. Free AI resume summary generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-resume-summary-generator"),
    languages: hreflangLanguages("/ai-resume-summary-generator"),
  },
}));
