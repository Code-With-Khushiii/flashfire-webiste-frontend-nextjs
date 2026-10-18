import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-tracker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/job-tracker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/job-tracker",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/job-tracker",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/job-tracker",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/job-tracker",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/job-tracker",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/job-tracker",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/job-tracker",
      "x-default": "https://www.flashfirejobs.com/features/job-tracker",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
