import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/salary-comparison/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Salary Comparison – Compare Two Job Offers | Flashfire EU",
  description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/salary-comparison"),
    languages: hreflangLanguages("/salary-comparison"),
  },
  openGraph: {
    title: "Salary Comparison – Compare Two Job Offers | Flashfire EU",
    description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
    url: url("/salary-comparison"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
