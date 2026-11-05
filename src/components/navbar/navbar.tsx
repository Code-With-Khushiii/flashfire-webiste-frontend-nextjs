import { navbarCTAs, navbarLinks } from "@/src/data/navbar";
import NavbarClient from "./navbarClient";

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <a
        href="/pricing"
        className="flex min-h-[44px] items-center justify-center gap-2.5 bg-[#ff8a4c] px-3 py-2 text-center text-black no-underline transition-colors hover:bg-[#ff985f] sm:gap-4 sm:py-1.5"
        aria-label="Celebrate our anniversary. Explore anniversary offers"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 fill-black sm:h-[18px] sm:w-[18px]"
        >
          <path d="M12 2.5 14 7l4.8-1.1-2.2 4.4 4.1 2.8-4.9.5-.8 4.8-3-3.9-4.5 2 1.6-4.7-3.8-3.1 4.9-.2L12 2.5Zm-7.7 13 1.9 1.4-1.4 1.9-1.9-1.4 1.4-1.9Zm13.9 2.2 2.2-.4.4 2.2-2.2.4-.4-2.2ZM6.1 5l1.5 1.7-1.7 1.5-1.5-1.7L6.1 5Z" />
        </svg>
        <span className="text-xs font-medium leading-snug sm:text-base">
          <span className="font-semibold">Flashfire Anniversary Offer</span>
          <span className="hidden sm:inline"> — Celebrate with us and explore our special anniversary pricing</span>
          <span className="sm:hidden"> — Special pricing for a limited time</span>
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xl text-white transition-transform group-hover:translate-x-1 sm:h-9 sm:w-9"
          aria-hidden="true"
        >
          →
        </span>
      </a>
      <NavbarClient links={navbarLinks} ctas={navbarCTAs} />
    </div>
  );
}
