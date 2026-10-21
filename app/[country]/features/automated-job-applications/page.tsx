import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/automated-job-applications/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Job Application Automation Tool | AI Job Applications | Flashfire EU",
  description:
    "Flashfire is an AI job application automation tool that helps European job seekers automate job applications, beat ATS filters, and land interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/automated-job-applications"),
    languages: hreflangLanguages("/features/automated-job-applications"),
  },
  openGraph: {
    title: "Job Application Automation Tool | AI Job Applications | Flashfire EU",
    description:
      "Automate job applications, beat ATS filters, and land interviews faster with Flashfire's AI job application automation tool.",
    url: url("/features/automated-job-applications"),
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
}));
