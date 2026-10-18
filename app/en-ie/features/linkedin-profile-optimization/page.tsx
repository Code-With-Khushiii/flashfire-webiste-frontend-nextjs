import { Metadata } from "next";

export { default } from "@/app/features/linkedin-profile-optimization/page";

export const metadata: Metadata = {
  title: "LinkedIn Optimization for European Recruiters",
  description:
    "Refresh your LinkedIn profile with recruiter-ready headlines, summaries, and keywords so European hiring teams can find and trust you faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/features/linkedin-profile-optimization",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/linkedin-profile-optimization",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/linkedin-profile-optimization",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/linkedin-profile-optimization",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/linkedin-profile-optimization",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/linkedin-profile-optimization",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/linkedin-profile-optimization",
      "x-default": "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
    },
  },
  openGraph: {
    title: "LinkedIn Optimization for European Recruiters",
    description:
      "Polish your LinkedIn presence with ATS-aligned keywords, proof-backed bullets, and an irresistible summary tailored for Europe.",
    url: "https://www.flashfirejobs.com/en-ie/features/linkedin-profile-optimization",
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

