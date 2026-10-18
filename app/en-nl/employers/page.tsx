import { Metadata } from "next";
import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashfire for Employers: Hire Top Talent Faster",
  description:
    "Partner with Flashfire to access pre-screened, qualified candidates. Connect with job seekers actively applying to roles in your industry.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-nl/employers",
    languages: {
      "en-US": "https://www.flashfirejobs.com/employers",
      "en-CA": "https://www.flashfirejobs.com/en-ca/employers",
      "en-GB": "https://www.flashfirejobs.com/en-gb/employers",
      "en-AU": "https://www.flashfirejobs.com/en-au/employers",
      "en-IE": "https://www.flashfirejobs.com/en-ie/employers",
      "en-DE": "https://www.flashfirejobs.com/en-de/employers",
      "en-NL": "https://www.flashfirejobs.com/en-nl/employers",
      "en-FR": "https://www.flashfirejobs.com/en-fr/employers",
      "x-default": "https://www.flashfirejobs.com/employers",
    },
  },
  openGraph: {
    title: "Flashfire for Employers: Hire Top Talent Faster",
    description:
      "Partner with Flashfire to access pre-screened, qualified candidates.",
    url: "https://www.flashfirejobs.com/en-nl/employers",
    type: "website",
  },
};

export default function EmployersPageEU() {
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

