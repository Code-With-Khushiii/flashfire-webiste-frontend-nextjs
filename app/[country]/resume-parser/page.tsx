import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/resume-parser/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Resume Parser | Flashfire EU",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
  alternates: {
    canonical: url("/resume-parser"),
    languages: hreflangLanguages("/resume-parser"),
  },
}));
