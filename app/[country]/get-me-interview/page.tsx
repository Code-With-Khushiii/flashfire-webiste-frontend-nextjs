import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/get-me-interview/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Get Me an Interview | Flashfire EU",
  description:
    "Unlock Flashfire’s human-powered, AI-assisted job search system built for European job seekers. Track every application and land interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/get-me-interview"),
    languages: hreflangLanguages("/get-me-interview"),
  },
  openGraph: {
    title: "Get Me an Interview | Flashfire EU",
    description:
      "Activate Flashfire’s end-to-end job application engine: resume tailoring, job automation, tracking, and updates—all for Europe.",
    url: url("/get-me-interview"),
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
}));

