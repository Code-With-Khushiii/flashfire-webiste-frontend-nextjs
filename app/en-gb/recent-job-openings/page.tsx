import{Metadata} from "next";
import RecentJobOpenings from "@/src/components/recentJobOpenings/recentJobOpenings";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { hreflangLanguages } from "@/src/utils/locale";
export const metadata: Metadata = {
    title: "Recent UK Job Openings | Flashfire",
    description: "Recent Job Openings - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/en-gb/recent-job-openings",
        languages: hreflangLanguages("/recent-job-openings"),
    },
    openGraph: {
        title: "Recent UK Job Openings | Flashfire",
        description: "Recent Job Openings - Flashfire",
        url: "https://www.flashfirejobs.com/recent-job-openings",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Recent UK Job Openings | Flashfire",
        description: "Recent Job Openings - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
};

export default function RecentJobOpeningsPage() {
    return (
        <>
            <Navbar/>
            <RecentJobOpenings/>
            <Footer/>
        </>
    )
}