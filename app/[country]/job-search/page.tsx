import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import JobSearch from "@/src/components/pages/jobSearch/JobSearch";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Job Search: Faster Human-Powered Automation",
  description:
    "Flashfire applies to relevant jobs on your behalf so you don't have to search manually. Get updates without lifting a finger.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/job-search"),
    languages: hreflangLanguages("/job-search"),
  },
  openGraph: {
    title: "Job Search: Faster Human-Powered Automation",
    description:
      "Flashfire applies to relevant jobs on your behalf so you don't have to search manually.",
    url: url("/job-search"),
    type: "website",
  },
}));

export default function JobSearchPageEU() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <JobSearch />
      </main>
      <Footer />
    </div>
  );
}

