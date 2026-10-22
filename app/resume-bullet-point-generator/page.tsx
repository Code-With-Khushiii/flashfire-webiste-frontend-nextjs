import Navbar from "@/src/components/navbar/navbar";
import ToolSeoContent from "@/src/components/toolSeo/ToolSeoContent";
import Footer from "@/src/components/footer/footer";
import ResumeBulletPointGenerator from "@/src/components/resumeTools/ResumeBulletPointGenerator";

import { hreflangLanguages } from "@/src/utils/locale";
export const metadata = {
  title: "Resume Bullet Point Generator | Flashfire",
  description: "Turn vague job duties into sharp, ATS-friendly bullet points. Free AI resume bullet point generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/resume-bullet-point-generator",
    languages: hreflangLanguages("/resume-bullet-point-generator"),
  },
};

export default function ResumeBulletPointGeneratorPage() {
  return (
    <>
      <Navbar />
      <ResumeBulletPointGenerator />
      <ToolSeoContent slug="resume-bullet-point-generator" />
      <Footer />
    </>
  );
}
