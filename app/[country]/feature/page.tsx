import EUHome from "@/src/components/countries/eu/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";
import { euMetadata } from "@/src/utils/euTree";

export const generateMetadata = euMetadata((url) => ({
  title: "Features - AI-Powered Job Search Automation | Flashfire",
  description:
    "Discover Flashfire's powerful features: automated job applications, AI resume tailoring, real-time tracking, and more to accelerate your job search.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/feature"),
  },
  openGraph: {
    title: "Features - AI-Powered Job Search Automation",
    description:
      "Discover Flashfire's powerful features for automated job search.",
    url: url("/feature"),
    type: "website",
  },
}));

export default function FeaturePageEU() {
  return (
    <>
      <EUHome />
      <ScrollToSection targetId="feature" />
    </>
  );
}

