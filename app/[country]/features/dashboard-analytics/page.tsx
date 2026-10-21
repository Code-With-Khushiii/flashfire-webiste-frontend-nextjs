import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/dashboard-analytics/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Job Application Dashboard & Analytics | Flashfire EU",
  description:
    "See every European application, pipeline stage, and conversion metric in one analytics dashboard so you always know what's next.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/dashboard-analytics"),
    languages: hreflangLanguages("/features/dashboard-analytics"),
  },
  openGraph: {
    title: "Job Application Dashboard & Analytics | Flashfire EU",
    description:
      "Track applications, interviews, and wins through Flashfire’s live analytics dashboard built for job seekers.",
    url: url("/features/dashboard-analytics"),
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

