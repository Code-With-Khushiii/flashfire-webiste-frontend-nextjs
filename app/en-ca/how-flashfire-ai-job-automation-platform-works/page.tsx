import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  title: "How It Works: Student Job Search Automation",
  description:
    "See how Flashfire gets international students interview calls faster: visa-aware matching, ATS-ready resumes, automated applications, tracking, and interview prep.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/how-flashfire-ai-job-automation-platform-works",
    languages: hreflangLanguages("/how-flashfire-ai-job-automation-platform-works"),
  },
  openGraph: {
    title: "How It Works: Student Job Search Automation",
    description:
      "Understand how Flashfire automates sourcing, tailoring, and submitting applications so students land interviews faster.",
    url: "https://www.flashfirejobs.com/en-ca/how-flashfire-ai-job-automation-platform-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}

