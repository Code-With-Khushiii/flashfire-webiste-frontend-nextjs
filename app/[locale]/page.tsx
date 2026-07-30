import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: "en-ca" }, { locale: "en-gb" }];
}
import HomePage from "@/src/components/pages/home/Home";
import CanadaHome from "@/src/components/countries/ca/Home";
import UKHome from "@/src/components/countries/uk/Home";

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  const isUK = locale === "en-gb";

  if (isUK) {
    return {
      title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster (UK)",
      description:
        "We apply to 1000+ jobs on your behalf with tailored CVs for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://www.flashfirejobs.com/en-gb",
      },
      openGraph: {
        title: "FLASHFIRE - AI-Powered Job Search Automation (UK)",
        description:
          "We apply to 1000+ jobs on your behalf with tailored CVs for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
        url: "https://www.flashfirejobs.com/en-gb",
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
  }

  if (!isCanada) {
    return {
      title: "Flashfire: Job Search Virtual Assistant",
      description:
        "Get hired faster with Flashfire. Our team helps optimize your resume, apply to the right jobs, and manage your job search from start to finish.",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://www.flashfirejobs.com/",
      },
      openGraph: {
        title: "Flashfire: Job Search Virtual Assistant",
        description:
          "Get hired faster with Flashfire. Our team helps optimize your resume, apply to the right jobs, and manage your job search from start to finish.",
        url: "https://www.flashfirejobs.com/",
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
        title: "Flashfire: Job Search Virtual Assistant",
        description:
          "Get hired faster with Flashfire. Our team helps optimize your resume, apply to the right jobs, and manage your job search from start to finish.",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  return {
    title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster (Canada)",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.flashfirejobs.com/en-ca",
    },
    openGraph: {
      title: "FLASHFIRE - AI-Powered Job Search Automation (Canada)",
      description:
        "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
      url: "https://www.flashfirejobs.com/en-ca",
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
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  // Handle default locale (no locale in URL)
  if (!locale || locale === "default") {
    return <HomePage />;
  }

  // Handle Canada locale
  if (locale === "en-ca") {
    return <CanadaHome />;
  }

  // Handle UK / EU locale
  if (locale === "en-gb") {
    return <UKHome />;
  }

  // Invalid locale - 404
  notFound();
}

