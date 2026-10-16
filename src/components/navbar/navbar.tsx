import { navbarCTAs, navbarLinks } from "@/src/data/navbar";
import NavbarClient from "./navbarClient";
import PromoBanner from "@/src/components/promoBanner/promoBanner";

export default function Navbar() {
  return (
    <>
      {/* Mobile: the offer bar scrolls away so only the navbar stays pinned */}
      <div className="md:hidden">
        <PromoBanner />
      </div>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="hidden md:block">
          <PromoBanner />
        </div>
        <NavbarClient links={navbarLinks} ctas={navbarCTAs} />
      </div>
    </>
  );
}
