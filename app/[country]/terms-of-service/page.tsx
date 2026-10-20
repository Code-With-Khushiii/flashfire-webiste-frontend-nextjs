import TermsOfService from "@/src/components/legal/TermsOfService";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";

export const generateMetadata = euMetadata((url) => ({
  title: "Terms of Service - Flashfire User Agreement",
  description:
    "Read Flashfire's terms of service to understand the terms and conditions for using our job search automation platform.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/terms-of-service"),
  },
  openGraph: {
    title: "Terms of Service - Flashfire User Agreement",
    description:
      "Read Flashfire's terms of service and user agreement.",
    url: url("/terms-of-service"),
    type: "website",
  },
}));

export default function TermsOfServicePageEU() {
  return (
    <>
      <Navbar />
      <TermsOfService />
      <Footer />
    </>
  );
}

