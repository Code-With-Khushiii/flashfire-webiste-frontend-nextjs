import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/cv-keyword-scanner/page";

export const generateMetadata = euMetadata((url) => ({
  title: "CV Keyword Scanner | Flashfire EU",
  description: "Scan your resume for missing keywords. Match your CV to job descriptions. Free CV keyword scanner.",
  alternates: {
    canonical: url("/cv-keyword-scanner"),
    languages: hreflangLanguages("/cv-keyword-scanner"),
  },
}));
