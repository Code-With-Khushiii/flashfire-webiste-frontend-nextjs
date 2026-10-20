import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import { euMetadata, euUrl, type EUPageProps } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire EU Pricing: Affordable Job Automation Plans",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/pricing"),
    languages: hreflangLanguages("/pricing"),
  },
  openGraph: {
    title: "Flashfire EU Pricing: Affordable Job Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: url("/pricing"),
    type: "website",
  },
}));

export default async function PricingPageEU({ params }: EUPageProps) {
  const url = euUrl((await params).country);
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flashfire",
    "url": url("/pricing"),
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered job search automation platform that finds jobs, optimizes resumes, and applies to roles on your behalf — for European job seekers.",
    "offers": [
      {
        "@type": "Offer",
        "name": "IGNITE",
        "price": "169",
        "priceCurrency": "EUR",
        "url": url("/pricing"),
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "PROFESSIONAL",
        "price": "299",
        "priceCurrency": "EUR",
        "url": url("/pricing"),
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "EXECUTIVE",
        "price": "499",
        "priceCurrency": "EUR",
        "url": url("/pricing"),
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Navbar />
      <HomePagePricingPlans />
      <HomePageOfferLetters
        heading="60+ Offer letters received"
        enableLoopControls
        buttonOnlyScroll
      />
      <div className="mt-[55px] md:mt-[70px]">
        <HomePageHappyUsers variant="pricing" />
      </div>
      <HomePageHappyUsers variant="pricingVideos" />
      <HomePageFoundersNote variant="pricing" />
      <HomePageFAQ />
      <Footer />
    </>
  );
}
