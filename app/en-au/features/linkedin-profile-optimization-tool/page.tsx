import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/linkedin-profile-optimization-tool/page";

export const metadata: Metadata = {
  title: "LinkedIn Profile Optimization for Recruiter Visibility | Flashfire Australia",
  description:
    "Optimize your LinkedIn profile to boost recruiter visibility. FlashFire optimizes your LinkedIn to rank higher in recruiter searches and get more interview messages in Australia.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/features/linkedin-profile-optimization-tool",
    languages: hreflangLanguages("/features/linkedin-profile-optimization-tool"),
  },
  openGraph: {
    title: "LinkedIn Profile Optimization for Recruiter Visibility | Flashfire Australia",
    description:
      "Rank higher in recruiter searches and get more interview messages with Flashfire's LinkedIn profile optimization.",
    url: "https://www.flashfirejobs.com/en-au/features/linkedin-profile-optimization-tool",
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
};
