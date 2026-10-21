import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HappyUsersGalleryPage from "@/src/components/homePageHappyUsers/HappyUsersGalleryPage";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire Reviews: Success Stories & Testimonials",
  description:
    "See real success stories from job seekers who landed their dream jobs with Flashfire. Read testimonials from professionals who automated their job search and saved 150+ hours.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/image-testimonials"),
    languages: hreflangLanguages("/image-testimonials"),
  },
  openGraph: {
    title: "Flashfire Reviews: Success Stories & Testimonials",
    description:
      "See real success stories from job seekers who landed their dream jobs with Flashfire.",
    url: url("/image-testimonials"),
    type: "website",
  },
}));

export default function ImageTestimonialsPage() {
  return (
    <>
      <Navbar />
      <HappyUsersGalleryPage />
      <Footer />
    </>
  );
}

