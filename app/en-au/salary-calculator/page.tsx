import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/salary-calculator/page";

export const metadata: Metadata = {
  title: "Salary Calculator – Estimate Take-Home Pay | Flashfire Australia",
  description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, income tax and Medicare levy estimates.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/salary-calculator",
    languages: hreflangLanguages("/salary-calculator"),
  },
  openGraph: {
    title: "Salary Calculator – Estimate Take-Home Pay | Flashfire Australia",
    description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, income tax and Medicare levy estimates.",
    url: "https://www.flashfirejobs.com/en-au/salary-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
