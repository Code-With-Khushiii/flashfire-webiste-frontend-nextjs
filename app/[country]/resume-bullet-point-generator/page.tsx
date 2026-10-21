import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-bullet-point-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Resume Bullet Point Generator | Flashfire EU",
  description: "Turn vague job duties into sharp, ATS-friendly bullet points. Free AI resume bullet point generator.",
  alternates: {
    canonical: url("/resume-bullet-point-generator"),
    languages: hreflangLanguages("/resume-bullet-point-generator"),
  },
}));
