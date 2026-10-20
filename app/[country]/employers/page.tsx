import EmployerForm from "@/src/components/employers/employerForm";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire for Employers: Hire Top Talent Faster",
  description:
    "Partner with Flashfire to access pre-screened, qualified candidates. Connect with job seekers actively applying to roles in your industry.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/employers"),
    languages: hreflangLanguages("/employers"),
  },
  openGraph: {
    title: "Flashfire for Employers: Hire Top Talent Faster",
    description:
      "Partner with Flashfire to access pre-screened, qualified candidates.",
    url: url("/employers"),
    type: "website",
  },
}));

export default function EmployersPageEU() {
  return (
    <>
      <Navbar />
      <EmployerForm />
      <Footer />
    </>
  );
}

