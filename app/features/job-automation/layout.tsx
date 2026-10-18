import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-automation",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/job-automation",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/job-automation",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/job-automation",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/job-automation",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/job-automation",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/job-automation",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/job-automation",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/job-automation",
      "x-default": "https://www.flashfirejobs.com/features/job-automation",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Application Automation — Flashfire",
    description: "Automate your job applications with AI. Apply to 1,000+ roles with ATS-optimized resumes and get interviews faster with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
