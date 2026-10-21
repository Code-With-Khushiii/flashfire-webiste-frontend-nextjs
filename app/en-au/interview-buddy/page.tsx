import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/interview-buddy/page";

export const metadata: Metadata = {
  title: "AI Interview Assistant for Real-Time Support | Flashfire Australia",
  description:
    "Get real-time AI support during interviews with Flashfire's AI interview assistant. Receive instant answers, live transcripts, and role-specific guidance.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/interview-buddy",
    languages: hreflangLanguages("/interview-buddy"),
  },
  openGraph: {
    title: "AI Interview Assistant for Real-Time Support | Flashfire Australia",
    description:
      "Get real-time AI support during interviews with Flashfire's AI interview assistant. Receive instant answers, live transcripts, and role-specific guidance.",
    url: "https://www.flashfirejobs.com/en-au/interview-buddy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};
