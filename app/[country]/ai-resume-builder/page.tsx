import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-resume-builder/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Resume Builder for Job Seekers | Flashfire EU",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for in Europe.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-resume-builder"),
    languages: hreflangLanguages("/ai-resume-builder"),
  },
}));
