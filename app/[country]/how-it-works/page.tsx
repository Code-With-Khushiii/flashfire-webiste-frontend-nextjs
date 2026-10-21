import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";
import { euMetadata } from "@/src/utils/euTree";

export const generateMetadata = euMetadata((url) => ({
  title: "How It Works: Student Job Search Automation",
  description:
    "See how Flashfire gets international students interview calls faster: visa-aware matching, ATS-ready resumes, automated applications, tracking, and interview prep.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/how-it-works"),
  },
  openGraph: {
    title: "How It Works: Student Job Search Automation",
    description:
      "Understand how Flashfire automates sourcing, tailoring, and submitting applications so students land interviews faster.",
    url: url("/how-it-works"),
    type: "website",
  },
}));

export default function HowItWorksPage() {
  return <HowItWorks />;
}
