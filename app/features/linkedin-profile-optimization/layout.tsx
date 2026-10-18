import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best LinkedIn Profile Optimization Services to Rank Higher | FlashFire",
  description: "FlashFire offers LinkedIn profile optimization services to help job seekers rank higher in recruiter searches and improve their LinkedIn profile ranking.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/linkedin-profile-optimization",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/linkedin-profile-optimization",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/linkedin-profile-optimization",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/linkedin-profile-optimization",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/linkedin-profile-optimization",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/linkedin-profile-optimization",
      "x-default": "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profile Optimization — Flashfire",
    description: "Optimize your LinkedIn profile to rank higher in recruiter searches and convert profile views into interview messages with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
