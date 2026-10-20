import {Metadata} from "next";
import AICopilot from "@/src/components/AICopilot/AICopilot";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { hreflangLanguages } from "@/src/utils/locale";
export const metadata: Metadata = {
  title: "AI Job Application Automation Software & Job Search Platform",
  description:
    "FlashFire is an AI job search platform that finds jobs, optimizes your resume and applies daily for you, helping you get interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/AI-copilot",
    languages: hreflangLanguages("/AI-copilot"),
  },
  openGraph: {
    title: "AI Job Application Automation Software & Job Search Platform",
    description:
      "FlashFire is an AI job search platform that finds jobs, optimizes your resume and applies daily for you, helping you get interviews faster.",
    url: "https://www.flashfirejobs.com/AI-copilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};
export default function AIcopilot() {
  return (
    <>
      <Navbar />
      <AICopilot />
      <Footer />
    </>
  );
}
