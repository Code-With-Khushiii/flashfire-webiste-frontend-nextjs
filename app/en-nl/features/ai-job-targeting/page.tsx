import { Metadata } from "next";

export { default } from "@/app/features/ai-job-targeting/page";

export const metadata: Metadata = {
  title: "AI Precision Job Targeting for Faster Interview Calls | Flashfire EU",
  description:
    "Apply to jobs that actually match your profile. FlashFire's AI targets jobs where your skills, experience, and ATS score give European job seekers the highest chance of interviews.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-nl/features/ai-job-targeting",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/ai-job-targeting",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/ai-job-targeting",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/ai-job-targeting",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/ai-job-targeting",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/ai-job-targeting",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/ai-job-targeting",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/ai-job-targeting",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/ai-job-targeting",
      "x-default": "https://www.flashfirejobs.com/features/ai-job-targeting",
    },
  },
  openGraph: {
    title: "AI Precision Job Targeting for Faster Interview Calls | Flashfire EU",
    description:
      "FlashFire's AI targets jobs where your skills, experience, and ATS score give you the highest chance of interviews in Europe.",
    url: "https://www.flashfirejobs.com/en-nl/features/ai-job-targeting",
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
