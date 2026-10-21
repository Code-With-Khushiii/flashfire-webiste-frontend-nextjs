import RecentJobOpenings from "@/src/components/recentJobOpenings/recentJobOpenings";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";
export const generateMetadata = euMetadata((url) => ({
    title: "Recent EU Job Openings | Flashfire",
    description: "Recent Job Openings - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: url("/recent-job-openings"),
        languages: hreflangLanguages("/recent-job-openings"),
    },
    openGraph: {
        title: "Recent EU Job Openings | Flashfire",
        description: "Recent Job Openings - Flashfire",
        url: "https://www.flashfirejobs.com/recent-job-openings",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Recent EU Job Openings | Flashfire",
        description: "Recent Job Openings - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
}));

export default function RecentJobOpeningsPage() {
    return (
        <>
            <Navbar/>
            <RecentJobOpenings/>
            <Footer/>
        </>
    )
}