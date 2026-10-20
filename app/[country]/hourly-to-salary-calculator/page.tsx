import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/hourly-to-salary-calculator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire EU",
  description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/hourly-to-salary-calculator"),
    languages: hreflangLanguages("/hourly-to-salary-calculator"),
  },
  openGraph: {
    title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire EU",
    description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
    url: url("/hourly-to-salary-calculator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
