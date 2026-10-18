import { Metadata } from "next";
export { default } from "@/app/features/interview-tips/page";

export const metadata: Metadata = {
    title: "Interview Tips for European Job Seekers | Flashfire",
    description: "Interview Tips - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/en-de/features/interview-tips",
        languages: {
            "en-US": "https://www.flashfirejobs.com/features/interview-tips",
            "en-CA": "https://www.flashfirejobs.com/en-ca/features/interview-tips",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/interview-tips",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/interview-tips",
      "en-IE": "https://www.flashfirejobs.com/en-ie/features/interview-tips",
      "en-DE": "https://www.flashfirejobs.com/en-de/features/interview-tips",
      "en-NL": "https://www.flashfirejobs.com/en-nl/features/interview-tips",
      "en-FR": "https://www.flashfirejobs.com/en-fr/features/interview-tips",
            "x-default": "https://www.flashfirejobs.com/features/interview-tips",
        },
    },
    openGraph: {
        title: "Interview Tips for European Job Seekers | Flashfire",
        description: "Interview Tips - Flashfire",
        url: "https://www.flashfirejobs.com/en-de/features/interview-tips",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Interview Tips for European Job Seekers | Flashfire",
        description: "Interview Tips - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
}
 