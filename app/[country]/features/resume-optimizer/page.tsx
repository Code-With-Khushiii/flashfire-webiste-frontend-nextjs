import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/resume-optimizer/page";

export const generateMetadata = euMetadata((url) => ({
  title: "ATS Resume Optimizer & Builder | Flashfire EU",
  description:
    "Optimize your resume for each job you apply to. Flashfire aligns your experience with every JD so European recruiters and ATS systems say yes.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/resume-optimizer"),
    languages: hreflangLanguages("/features/resume-optimizer"),
  },
  openGraph: {
    title: "ATS Resume Optimizer & Builder | Flashfire EU",
    description:
      "Automatically tailor your resume to each job description and pass every ATS filter with Flashfire.",
    url: url("/features/resume-optimizer"),
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

