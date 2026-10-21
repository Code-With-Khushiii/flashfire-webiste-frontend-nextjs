import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-interview-answer-generator/page";

export const metadata: Metadata = {
  title: "AI Interview Answer Generator – STAR Format | Flashfire Australia",
  description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-interview-answer-generator",
    languages: hreflangLanguages("/ai-interview-answer-generator"),
  },
  openGraph: {
    title: "AI Interview Answer Generator – STAR Format | Flashfire Australia",
    description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
    url: "https://www.flashfirejobs.com/en-au/ai-interview-answer-generator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
