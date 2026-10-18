import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/get-me-interview",
    languages: {
      "en-US": "https://www.flashfirejobs.com/get-me-interview",
      "en-CA": "https://www.flashfirejobs.com/en-ca/get-me-interview",
      "en-GB": "https://www.flashfirejobs.com/en-gb/get-me-interview",
      "en-AU": "https://www.flashfirejobs.com/en-au/get-me-interview",
      "en-IE": "https://www.flashfirejobs.com/en-ie/get-me-interview",
      "en-DE": "https://www.flashfirejobs.com/en-de/get-me-interview",
      "en-NL": "https://www.flashfirejobs.com/en-nl/get-me-interview",
      "en-FR": "https://www.flashfirejobs.com/en-fr/get-me-interview",
      "x-default": "https://www.flashfirejobs.com/get-me-interview",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
