import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/take-home-pay-calculator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire EU",
  description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and provincial tax to get your net paycheck.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/take-home-pay-calculator"),
    languages: hreflangLanguages("/take-home-pay-calculator"),
  },
  openGraph: {
    title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire EU",
    description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and provincial tax to get your net paycheck.",
    url: url("/take-home-pay-calculator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
