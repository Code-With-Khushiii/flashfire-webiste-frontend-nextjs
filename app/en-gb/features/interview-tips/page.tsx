import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";
export { default } from "@/app/features/interview-tips/page";

export const metadata: Metadata = {
    title: "Interview Tips for UK Job Seekers | Flashfire",
    description: "Interview Tips - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/en-gb/features/interview-tips",
        languages: hreflangLanguages("/features/interview-tips"),
    },
    openGraph: {
        title: "Interview Tips for UK Job Seekers | Flashfire",
        description: "Interview Tips - Flashfire",
        url: "https://www.flashfirejobs.com/en-gb/features/interview-tips",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Interview Tips for UK Job Seekers | Flashfire",
        description: "Interview Tips - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
}
 