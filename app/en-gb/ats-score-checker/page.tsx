import { Metadata } from "next";

export { default } from "@/app/ats-score-checker/page";

export const metadata: Metadata = {
  title: "Free ATS Resume Score Checker | Flashfire UK",
  description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/ats-score-checker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ats-score-checker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ats-score-checker",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ats-score-checker",
      "en-AU": "https://www.flashfirejobs.com/en-au/ats-score-checker",
      "en-IE": "https://www.flashfirejobs.com/en-ie/ats-score-checker",
      "en-DE": "https://www.flashfirejobs.com/en-de/ats-score-checker",
      "en-NL": "https://www.flashfirejobs.com/en-nl/ats-score-checker",
      "en-FR": "https://www.flashfirejobs.com/en-fr/ats-score-checker",
      "x-default": "https://www.flashfirejobs.com/ats-score-checker",
    },
  },
  openGraph: {
    title: "Free ATS Resume Score Checker | Flashfire UK",
    description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
    url: "https://www.flashfirejobs.com/en-gb/ats-score-checker",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
};
