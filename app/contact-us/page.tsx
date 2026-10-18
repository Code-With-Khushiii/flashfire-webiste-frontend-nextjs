import { Metadata } from "next";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import ToolSeoContent from "@/src/components/toolSeo/ToolSeoContent";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashfire Contact | Customer Support & Enquiries",
  description:
    "Contact Flashfire for customer support, sales enquiries, demos, or general questions. Reach Flashfire email support or connect with our team today.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/contact-us",
    languages: {
      "en-US": "https://www.flashfirejobs.com/contact-us",
      "en-CA": "https://www.flashfirejobs.com/en-ca/contact-us",
      "en-GB": "https://www.flashfirejobs.com/en-gb/contact-us",
      "en-AU": "https://www.flashfirejobs.com/en-au/contact-us",
      "en-IE": "https://www.flashfirejobs.com/en-ie/contact-us",
      "en-DE": "https://www.flashfirejobs.com/en-de/contact-us",
      "en-NL": "https://www.flashfirejobs.com/en-nl/contact-us",
      "en-FR": "https://www.flashfirejobs.com/en-fr/contact-us",
      "x-default": "https://www.flashfirejobs.com/contact-us",
    },
  },
  openGraph: {
    title: "Flashfire Contact | Customer Support & Enquiries",
    description:
      "Contact Flashfire for customer support, sales enquiries, demos, or general questions. Reach Flashfire email support or connect with our team today.",
    url: "https://www.flashfirejobs.com/contact-us",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <ContactUsClient />
      <ToolSeoContent slug="contact-us" />
      <Footer />
    </>
  );
}
