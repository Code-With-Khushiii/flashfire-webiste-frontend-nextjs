import { Metadata } from "next";
import SalaryEstimator from "@/src/components/salaryEstimator/SalaryEstimator";
import ToolSeoContent from "@/src/components/toolSeo/ToolSeoContent";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Salary Estimator: Salary Range by Role | Flashfire",
    description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/salary-estimator" },
    openGraph: {
        title: "Salary Estimator: Salary Range by Role | Flashfire",
        description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
        url: "https://www.flashfirejobs.com/salary-estimator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function SalaryEstimatorPage() {
    return (
        <>
            <Navbar />
            <SalaryEstimator />
            <ToolSeoContent slug="salary-estimator" />
            <Footer />
        </>
    );
}
