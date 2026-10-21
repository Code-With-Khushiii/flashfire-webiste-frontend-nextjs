import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/salary-calculator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Salary Calculator – Estimate Take-Home Pay | Flashfire EU",
  description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and provincial tax estimates.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/salary-calculator"),
    languages: hreflangLanguages("/salary-calculator"),
  },
  openGraph: {
    title: "Salary Calculator – Estimate Take-Home Pay | Flashfire EU",
    description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and provincial tax estimates.",
    url: url("/salary-calculator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
