import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ResumeParser from "@/src/components/resumeTools/ResumeParser";

export const metadata = {
  title: "Free Online Resume Parser: Extract Data | Flashfire",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/resume-parser",
  },
};

export default function ResumeParserPage() {
  return (
    <>
      <Navbar />
      <ResumeParser />
      <Footer />
    </>
  );
}
