import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/salary-estimator/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Salary Estimator – Realistic Salary Range by Role | Flashfire EU",
  description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/salary-estimator"),
    languages: hreflangLanguages("/salary-estimator"),
  },
  openGraph: {
    title: "Salary Estimator – Realistic Salary Range by Role | Flashfire EU",
    description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
    url: url("/salary-estimator"),
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
}));
