import { navbarCTAs, navbarLinks } from "@/src/data/navbar";
import NavbarClient from "./navbarClient";

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <NavbarClient links={navbarLinks} ctas={navbarCTAs} />
    </div>
  );
}
