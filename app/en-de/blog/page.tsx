import { Metadata } from "next";
import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashfire Blog: EU Career Tips & Job Advice",
  description:
    "Discover expert career tips, job search strategies, resume writing guides, and industry insights to accelerate your job search success.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-de/blog",
    languages: {
      "en-US": "https://www.flashfirejobs.com/blog",
      "en-CA": "https://www.flashfirejobs.com/en-ca/blog",
      "en-GB": "https://www.flashfirejobs.com/en-gb/blog",
      "en-AU": "https://www.flashfirejobs.com/en-au/blog",
      "en-IE": "https://www.flashfirejobs.com/en-ie/blog",
      "en-DE": "https://www.flashfirejobs.com/en-de/blog",
      "en-NL": "https://www.flashfirejobs.com/en-nl/blog",
      "en-FR": "https://www.flashfirejobs.com/en-fr/blog",
      "x-default": "https://www.flashfirejobs.com/blog",
    },
  },
  openGraph: {
    title: "Flashfire Blog: EU Career Tips & Job Advice",
    description:
      "Discover expert career tips, job search strategies, and industry insights.",
    url: "https://www.flashfirejobs.com/en-de/blog",
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

export default function BlogPageEU() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient heading="Career Tips & Job Advice for European Job Seekers" />
      </Suspense>
      <Footer />
    </>
  );
}

