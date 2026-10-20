import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/job-tracker/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Real-Time AI Job Tracker Dashboard | Flashfire EU",
  description:
    "Monitor every European application in one live dashboard with status updates, recruiter notes, and reminders so nothing slips.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/job-tracker"),
    languages: hreflangLanguages("/features/job-tracker"),
  },
  openGraph: {
    title: "Real-Time AI Job Tracker Dashboard | Flashfire EU",
    description:
      "Track submissions, interviews, and outcomes across every job Flashfire applies to on your behalf.",
    url: url("/features/job-tracker"),
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

