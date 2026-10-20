import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-follow-up-email-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Follow-Up Email Generator for Job Applications | Flashfire EU",
  description:
    "Generate professional, timely follow-up emails for job applications and interviews using Flashfire's AI follow-up email generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-follow-up-email-generator"),
    languages: hreflangLanguages("/ai-follow-up-email-generator"),
  },
}));
