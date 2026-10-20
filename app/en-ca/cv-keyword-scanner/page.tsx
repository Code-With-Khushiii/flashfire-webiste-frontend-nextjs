import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/cv-keyword-scanner/page";

export const metadata: Metadata = {
  title: "CV Keyword Scanner | Flashfire Canada",
  description: "Scan your resume for missing keywords. Match your CV to job descriptions. Free CV keyword scanner.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/cv-keyword-scanner",
    languages: hreflangLanguages("/cv-keyword-scanner"),
  },
};
