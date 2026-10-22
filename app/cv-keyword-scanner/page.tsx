import Navbar from "@/src/components/navbar/navbar";
import ToolSeoContent from "@/src/components/toolSeo/ToolSeoContent";
import Footer from "@/src/components/footer/footer";
import CVKeywordScanner from "@/src/components/resumeTools/CVKeywordScanner";

import { hreflangLanguages } from "@/src/utils/locale";
export const metadata = {
  title: "CV Keyword Scanner | Flashfire",
  description: "Scan your resume for missing keywords. Match your CV to job descriptions. Free CV keyword scanner.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/cv-keyword-scanner",
    languages: hreflangLanguages("/cv-keyword-scanner"),
  },
};

export default function CVKeywordScannerPage() {
  return (
    <>
      <Navbar />
      <CVKeywordScanner />
      <ToolSeoContent slug="cv-keyword-scanner" />
      <Footer />
    </>
  );
}
