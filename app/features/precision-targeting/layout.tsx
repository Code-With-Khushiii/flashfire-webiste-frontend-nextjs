import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/precision-targeting",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/precision-targeting",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/precision-targeting",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/precision-targeting",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/precision-targeting",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/precision-targeting",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/precision-targeting",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/precision-targeting",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/precision-targeting",
      "x-default": "https://www.flashfirejobs.com/features/precision-targeting",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
