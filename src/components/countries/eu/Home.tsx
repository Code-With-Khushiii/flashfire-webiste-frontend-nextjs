"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageResultStats from "@/src/components/homePageResultStats/homePageResultStats";
import HomePageSteps from "@/src/components/homePageSteps/homePageSteps";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import HomeOfferWall from "@/src/components/homeOfferWall/homeOfferWall";
import HomeDashboard from "@/src/components/homeDashboard/homeDashboard";
import HomeStories from "@/src/components/homeStories/homeStories";
import HomeFinalCTA from "@/src/components/homeFinalCTA/homeFinalCTA";
import Navbar from "@/src/components/navbar/navbar";
import { getLocalePrefix } from "@/src/utils/locale";

export default function EUHome() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when navigating to the EU home page
    const isEUHomePage = pathname === getLocalePrefix(pathname);

    if (isEUHomePage) {
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
      <HomePageResultStats />
      <HomeOfferWall />
      <HomePageWhyChooseFF />
      <div id="how-it-works">
        <HomePageSteps />
      </div>
      <HomeDashboard />
      <HomeStories />
      <HomePageHappyUsers />
      <HomePageFAQ />
      <HomeFinalCTA />

      <Footer />
    </>
  );
}
