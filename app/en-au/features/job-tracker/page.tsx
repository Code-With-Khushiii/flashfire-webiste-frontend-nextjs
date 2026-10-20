import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/job-tracker/page";

export const metadata: Metadata = {
  title: "Real-Time AI Job Tracker Dashboard | Flashfire AU",
  description:
    "Monitor every Australian application in one live dashboard with status updates, recruiter notes, and reminders so nothing slips.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/features/job-tracker",
    languages: hreflangLanguages("/features/job-tracker"),
  },
  openGraph: {
    title: "Real-Time AI Job Tracker Dashboard | Flashfire AU",
    description:
      "Track submissions, interviews, and outcomes across every job Flashfire applies to on your behalf.",
    url: "https://www.flashfirejobs.com/en-au/features/job-tracker",
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
};

