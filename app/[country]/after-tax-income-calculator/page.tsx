import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/after-tax-income-calculator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "After Tax Income Calculator – Net Annual Income | Flashfire EU",
  description: "Estimate your after-tax income by filing status, deductions, tax credits, and provincial tax rate.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/after-tax-income-calculator"),
    languages: hreflangLanguages("/after-tax-income-calculator"),
  },
  openGraph: {
    title: "After Tax Income Calculator – Net Annual Income | Flashfire EU",
    description: "Estimate your after-tax income by filing status, deductions, tax credits, and provincial tax rate.",
    url: url("/after-tax-income-calculator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
