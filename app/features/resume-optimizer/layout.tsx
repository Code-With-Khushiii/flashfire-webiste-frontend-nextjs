import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/resume-optimizer",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/resume-optimizer",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/resume-optimizer",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/resume-optimizer",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/resume-optimizer",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/resume-optimizer",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/resume-optimizer",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/resume-optimizer",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/resume-optimizer",
      "x-default": "https://www.flashfirejobs.com/features/resume-optimizer",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
