import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/gross-pay-calculator/page";

export const metadata: Metadata = {
  title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire UK",
  description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/gross-pay-calculator",
    languages: hreflangLanguages("/gross-pay-calculator"),
  },
  openGraph: {
    title: "Gross Pay Calculator – Weekly, Monthly & Annual | Flashfire UK",
    description: "Calculate gross pay before taxes from hourly rate, regular hours, overtime, and annual bonus.",
    url: "https://www.flashfirejobs.com/en-gb/gross-pay-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
