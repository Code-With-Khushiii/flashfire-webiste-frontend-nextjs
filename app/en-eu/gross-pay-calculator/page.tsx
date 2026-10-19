import { Metadata } from "next";

export { default } from "@/app/gross-pay-calculator/page";

export const metadata: Metadata = {
  title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire EU",
  description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ie/gross-pay-calculator",
  },
  openGraph: {
    title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire EU",
    description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
    url: "https://www.flashfirejobs.com/en-eu/gross-pay-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
