"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AU_PREFIX, CANADA_PREFIX, EU_TREES, UK_PREFIX, getLocalePrefix, stripLocalePrefix } from "@/src/utils/locale";
import { localeHasRoute } from "@/src/utils/localeRoutes.generated";

/** "" is the root tree (US pricing). */
const OPTIONS: ReadonlyArray<{ prefix: string; name: string }> = [
  { prefix: "", name: "United States" },
  { prefix: CANADA_PREFIX, name: "Canada" },
  { prefix: UK_PREFIX, name: "United Kingdom" },
  { prefix: AU_PREFIX, name: "Australia" },
  ...EU_TREES.map((tree) => ({ prefix: tree.prefix, name: tree.name })),
];

/**
 * Lets a visitor pick their country. Plain links, so it works without
 * JavaScript and crawlers can follow it; we never switch country by IP.
 * Each link lands on the same page in the other tree when it exists there.
 */
export default function CountrySelector() {
  const pathname = usePathname();
  const current = getLocalePrefix(pathname);
  const active = current;
  const subPath = stripLocalePrefix(pathname);
  const label = OPTIONS.find((option) => option.prefix === active)?.name ?? "United States";

  const hrefFor = (prefix: string) => {
    // The root tree has every page; the others only the ones they mirror.
    if (prefix && !localeHasRoute(prefix, subPath)) return prefix;
    return subPath === "/" ? prefix || "/" : `${prefix}${subPath}`;
  };

  return (
    <details className="relative mx-auto mb-4 w-fit text-sm">
      <summary className="cursor-pointer list-none rounded-md border border-white/70 px-3 py-1.5 font-medium">
        Country: {label}
      </summary>
      <ul className="absolute bottom-full left-1/2 z-20 mb-2 grid max-h-96 w-[min(90vw,40rem)] -translate-x-1/2 grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto rounded-md bg-white p-3 text-[#1a1a1a] shadow-lg sm:grid-cols-3 md:grid-cols-4">
        {OPTIONS.map((option) => (
          <li key={option.prefix || "us"}>
            <Link
              href={hrefFor(option.prefix)}
              hrefLang="en"
              aria-current={option.prefix === active ? "true" : undefined}
              className={option.prefix === active ? "font-bold text-[#f55d1d]" : "hover:underline"}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
