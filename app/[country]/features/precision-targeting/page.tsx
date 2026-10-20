import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/features/precision-targeting/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Precision Job Targeting: Find EU Roles",
  description:
    "Flashfire pinpoints roles that match your visa status, salary goals, and tech stack so every application is high intent.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/features/precision-targeting"),
    languages: hreflangLanguages("/features/precision-targeting"),
  },
  openGraph: {
    title: "Precision Job Targeting: Find EU Roles",
    description:
      "Use Flashfire’s targeting engine to surface European roles aligned to your background, visa, and compensation needs.",
    url: url("/features/precision-targeting"),
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

