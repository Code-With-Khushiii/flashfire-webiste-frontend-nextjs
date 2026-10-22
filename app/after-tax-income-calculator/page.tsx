import { Metadata } from "next";
import AfterTaxIncomeCalculator from "@/src/components/afterTaxIncomeCalculator/AfterTaxIncomeCalculator";
import ToolSeoContent from "@/src/components/toolSeo/ToolSeoContent";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

import { hreflangLanguages } from "@/src/utils/locale";
export const metadata: Metadata = {
    title: "After Tax Income Calculator – Net Annual Income | Flashfire",
    description: "Estimate your after-tax income by filing status, deductions, tax credits, and state tax rate.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/after-tax-income-calculator", languages: hreflangLanguages("/after-tax-income-calculator") },
    openGraph: {
        title: "After Tax Income Calculator – Net Annual Income | Flashfire",
        description: "Estimate your after-tax income by filing status, deductions, tax credits, and state tax rate.",
        url: "https://www.flashfirejobs.com/after-tax-income-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function AfterTaxIncomeCalculatorPage() {
    return (
        <>
            <Navbar />
            <AfterTaxIncomeCalculator />
            <ToolSeoContent slug="after-tax-income-calculator" />
            <Footer />
        </>
    );
}
