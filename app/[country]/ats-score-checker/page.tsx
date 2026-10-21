import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ats-score-checker/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Free ATS Resume Score Checker | Flashfire EU",
  description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
  alternates: {
    canonical: url("/ats-score-checker"),
    languages: hreflangLanguages("/ats-score-checker"),
  },
  openGraph: {
    title: "Free ATS Resume Score Checker | Flashfire EU",
    description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
    url: url("/ats-score-checker"),
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
}));
