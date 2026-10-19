import { Metadata } from "next";

export { default } from "@/app/ai-interview-answer-generator/page";

export const metadata: Metadata = {
  title: "AI Interview Answer Generator – STAR Format | Flashfire EU",
  description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/ai-interview-answer-generator",
  },
  openGraph: {
    title: "AI Interview Answer Generator – STAR Format | Flashfire EU",
    description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
    url: "https://www.flashfirejobs.com/en-eu/ai-interview-answer-generator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
