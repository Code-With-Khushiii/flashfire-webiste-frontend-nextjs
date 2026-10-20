import OfferAndSalary from "@/src/components/offerAndSalary/offerAndSalary";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
    title: "Job Offer & Salary Negotiation | Flashfire",
    description: "Offer & Salary - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: url("/offer-and-salary"),
        languages: hreflangLanguages("/offer-and-salary", "/offer-and-salary-negotiation-advisor"),
    },
    openGraph: {
        title: "Job Offer & Salary Negotiation | Flashfire",
        description: "Offer & Salary - Flashfire",
        url: "https://www.flashfirejobs.com/offer-and-salary",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Job Offer & Salary Negotiation | Flashfire",
        description: "Offer & Salary - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
}));

export default function OfferAndSalaryPage() {
    return (
        <>
            <Navbar/>
            <OfferAndSalary/>
            <Footer/>
        </>
    )
}