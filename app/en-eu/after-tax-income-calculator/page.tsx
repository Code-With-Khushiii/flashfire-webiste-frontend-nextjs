import { Metadata } from "next";

export { default } from "@/app/after-tax-income-calculator/page";

export const metadata: Metadata = {
  title: "After Tax Income Calculator – Net Annual Income | Flashfire EU",
  description: "Estimate your after-tax income by filing status, deductions, tax credits, and provincial tax rate.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/after-tax-income-calculator",
  },
  openGraph: {
    title: "After Tax Income Calculator – Net Annual Income | Flashfire EU",
    description: "Estimate your after-tax income by filing status, deductions, tax credits, and provincial tax rate.",
    url: "https://www.flashfirejobs.com/en-eu/after-tax-income-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
