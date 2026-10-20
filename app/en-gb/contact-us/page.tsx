import { Metadata } from "next";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  title: "Contact Flashfire: Get in Touch | Flashfire UK",
  description:
    "Have questions about Flashfire? Contact our UK team for support, partnerships, or job search automation inquiries.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/contact-us",
    languages: hreflangLanguages("/contact-us"),
  },
  openGraph: {
    title: "Contact Flashfire: Get in Touch | Flashfire UK",
    description:
      "Talk to Flashfire’s UK team for support, partnerships, or general questions.",
    url: "https://www.flashfirejobs.com/en-gb/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function ContactUsPageUK() {
  return (
    <>
      <Navbar />
      <ContactUsClient />
      <Footer />
    </>
  );
}

