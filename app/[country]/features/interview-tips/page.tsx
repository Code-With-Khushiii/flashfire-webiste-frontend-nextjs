import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";
export { default } from "@/app/features/interview-tips/page";

export const generateMetadata = euMetadata((url) => ({
    title: "Interview Tips for European Job Seekers | Flashfire",
    description: "Interview Tips - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: url("/features/interview-tips"),
        languages: hreflangLanguages("/features/interview-tips"),
    },
    openGraph: {
        title: "Interview Tips for European Job Seekers | Flashfire",
        description: "Interview Tips - Flashfire",
        url: url("/features/interview-tips"),
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
}));
 