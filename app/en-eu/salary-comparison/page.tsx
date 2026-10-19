import { Metadata } from "next";

export { default } from "@/app/salary-comparison/page";

export const metadata: Metadata = {
  title: "Salary Comparison – Compare Two Job Offers | Flashfire EU",
  description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/salary-comparison",
  },
  openGraph: {
    title: "Salary Comparison – Compare Two Job Offers | Flashfire EU",
    description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
    url: "https://www.flashfirejobs.com/en-eu/salary-comparison",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
