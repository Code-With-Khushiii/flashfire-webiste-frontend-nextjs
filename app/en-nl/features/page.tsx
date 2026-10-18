import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import Features from "@/src/components/pages/features/Features";

export const metadata: Metadata = {
  title: "Flashfire Features: Why Choose Our AI Job Search Tool",
  description:
    "Explore Flashfire's key features: AI-powered matching, dynamic resume optimization, LinkedIn optimization, precision targeting, and more.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-nl/features",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features",
      "en-AU": "https://www.flashfirejobs.com/en-au/features",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features",
      "en-DE": "https://www.flashfirejobs.com/en-de/features",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features",
      "x-default": "https://www.flashfirejobs.com/features",
    },
  },
};

export default function FeaturesPageEU() {
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

