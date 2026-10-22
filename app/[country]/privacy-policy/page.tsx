import PrivacyPolicy from "@/src/components/legal/PrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";

import { hreflangLanguages } from "@/src/utils/locale";
export const generateMetadata = euMetadata((url) => ({
  title: "Privacy Policy - How Flashfire Protects Your Data",
  description:
    "Read Flashfire's privacy policy to learn how we collect, use, and protect your personal data throughout the job search automation process.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/privacy-policy"),
    languages: hreflangLanguages("/privacy-policy"),
  },
  openGraph: {
    title: "Privacy Policy - How Flashfire Protects Your Data",
    description:
      "Read Flashfire's privacy policy to learn how we collect, use, and protect your personal data.",
    url: url("/privacy-policy"),
    type: "website",
  },
}));

export default function PrivacyPolicyPageEU() {
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

