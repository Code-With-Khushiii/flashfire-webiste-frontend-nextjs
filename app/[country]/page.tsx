import EUHome from "@/src/components/countries/eu/Home";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire: AI Job Search Automation EU",
  description:
    "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url(),
    languages: hreflangLanguages("/"),
  },
  openGraph: {
    title: "Flashfire: AI Job Search Automation EU",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    url: url(),
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

export default function HomeEU() {
  return <EUHome />;
}

