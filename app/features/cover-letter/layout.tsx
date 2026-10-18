import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/cover-letter",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/cover-letter",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/cover-letter",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/cover-letter",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/cover-letter",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/cover-letter",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/cover-letter",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/cover-letter",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/cover-letter",
      "x-default": "https://www.flashfirejobs.com/features/cover-letter",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator — Flashfire",
    description: "Create personalized, ATS-optimized cover letters tailored to each job in minutes with Flashfire's AI cover letter builder.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
