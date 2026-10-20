import { Metadata } from "next";
import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  title: "Flashfire for Employers: Hire Top Talent Faster",
  description:
    "Partner with Flashfire to access pre-screened, qualified candidates. Connect with job seekers actively applying to roles in your industry.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/employers",
    languages: hreflangLanguages("/employers"),
  },
  openGraph: {
    title: "Flashfire for Employers: Hire Top Talent Faster",
    description:
      "Partner with Flashfire to access pre-screened, qualified candidates.",
    url: "https://www.flashfirejobs.com/en-au/employers",
    type: "website",
  },
};

export default function EmployersPageAU() {
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

