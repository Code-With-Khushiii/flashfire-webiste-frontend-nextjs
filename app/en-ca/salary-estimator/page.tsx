import { Metadata } from "next";

export { default } from "@/app/salary-estimator/page";

export const metadata: Metadata = {
  title: "Salary Estimator – Realistic Salary Range by Role | Flashfire Canada",
  description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/salary-estimator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/salary-estimator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/salary-estimator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/salary-estimator",
      "en-AU": "https://www.flashfirejobs.com/en-au/salary-estimator",
      "en-IE": "https://www.flashfirejobs.com/en-ie/salary-estimator",
      "en-DE": "https://www.flashfirejobs.com/en-de/salary-estimator",
      "en-NL": "https://www.flashfirejobs.com/en-nl/salary-estimator",
      "en-FR": "https://www.flashfirejobs.com/en-fr/salary-estimator",
      "x-default": "https://www.flashfirejobs.com/salary-estimator",
    },
  },
  openGraph: {
    title: "Salary Estimator – Realistic Salary Range by Role | Flashfire Canada",
    description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
    url: "https://www.flashfirejobs.com/en-ca/salary-estimator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
