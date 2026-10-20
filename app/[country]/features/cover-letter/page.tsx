import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/cover-letter/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Cover Letter Builder | Flashfire EU",
  description:
    "Generate personalized cover letters tailored to each European role without writing from scratch. Flashfire keeps tone, proof, and keywords on point.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/cover-letter"),
    languages: hreflangLanguages("/features/cover-letter"),
  },
  openGraph: {
    title: "AI Cover Letter Builder | Flashfire EU",
    description:
      "Craft compelling cover letters fast using Flashfire’s AI + human review workflow designed for European employers.",
    url: url("/features/cover-letter"),
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

