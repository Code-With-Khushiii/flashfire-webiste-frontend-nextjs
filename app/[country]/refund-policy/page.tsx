import RefundPolicy from "@/src/components/legal/RefundPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";

import { hreflangLanguages } from "@/src/utils/locale";
export const generateMetadata = euMetadata((url) => ({
  title: "Refund Policy - Flashfire Guarantee & Eligibility",
  description:
    "Understand Flashfire's refund policy, eligibility criteria, and process for requesting a refund on our job search automation services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/refund-policy"),
    languages: hreflangLanguages("/refund-policy"),
  },
  openGraph: {
    title: "Refund Policy - Flashfire Guarantee & Eligibility",
    description:
      "Understand Flashfire's refund policy, eligibility criteria, and process for requesting a refund.",
    url: url("/refund-policy"),
    type: "website",
  },
}));

export default function RefundPolicyPageEU() {
  return (
    <>
      <Navbar />
      <RefundPolicy />
      <Footer />
    </>
  );
}

