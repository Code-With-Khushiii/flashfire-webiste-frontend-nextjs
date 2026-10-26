"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocaleHome } from "@/src/utils/locale";
import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomeStories from "@/src/components/homeStories/homeStories";
import Navbar from "@/src/components/navbar/navbar";
import {
  HomeDraftComparison,
  HomeDraftDashboard,
  HomeDraftFAQ,
  HomeDraftFinalCTA,
  HomeDraftJourney,
  HomeDraftOfferWall,
  HomeDraftResults,
} from "./HomeDraftSections";

const Home = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when navigating to homepage (handles back button and direct navigation)
    const isHomePage = isLocaleHome(pathname);

    if (isHomePage) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        // Also scroll after a short delay to catch any late scrolls from browser restoration
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);

        // One more check after layout
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HomeDraftResults />
      <HomeDraftOfferWall />
      <HomeDraftComparison />
      <HomeDraftJourney />
      <HomeDraftDashboard />
      <HomeStories />
      <HomePageHappyUsers
        variant="homepageDraft"
        heading="Feedback from happy customers"
        headingClassName="mb-4 max-w-[340px] text-[40px] font-black leading-[1.15] tracking-[-0.02em] text-[#242424] max-[768px]:mb-4 max-[768px]:max-w-full max-[768px]:text-[36px]"
      />
      <HomeDraftFAQ />
      <HomeDraftFinalCTA />
      <Footer />
    </>
  );
};

export default Home;
