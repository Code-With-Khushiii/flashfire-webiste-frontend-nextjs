import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/ai-cover-letter-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Cover Letter Builder for ATS-Friendly Job Applications | Flashfire EU",
  description:
    "Flashfire's AI cover letter builder helps European job seekers generate job-specific, ATS-friendly cover letters in minutes using AI-powered customization.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/ai-cover-letter-generator"),
    languages: hreflangLanguages("/features/ai-cover-letter-generator"),
  },
  openGraph: {
    title: "AI Cover Letter Builder for ATS-Friendly Job Applications | Flashfire EU",
    description:
      "Generate job-specific, ATS-friendly cover letters in minutes with Flashfire's AI-powered customization, built for European job seekers.",
    url: url("/features/ai-cover-letter-generator"),
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
