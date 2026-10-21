import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import Features from "@/src/components/pages/features/Features";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  title: "Flashfire Features: Why Choose Our AI Job Search Tool",
  description:
    "Explore Flashfire's key features: AI-powered matching, dynamic resume optimization, LinkedIn optimization, precision targeting, and more.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/features",
    languages: hreflangLanguages("/features"),
  },
};

export default function FeaturesPageUK() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <Features />
      </main>
      <Footer />
    </div>
  );
}

