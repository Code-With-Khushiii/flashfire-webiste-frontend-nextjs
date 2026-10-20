import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-interview-answer-generator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Interview Answer Generator – STAR Format | Flashfire EU",
  description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-interview-answer-generator"),
    languages: hreflangLanguages("/ai-interview-answer-generator"),
  },
  openGraph: {
    title: "AI Interview Answer Generator – STAR Format | Flashfire EU",
    description: "Generate polished STAR-format interview answers from your role, question, and achievement. Personalize and ace your next interview.",
    url: url("/ai-interview-answer-generator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
