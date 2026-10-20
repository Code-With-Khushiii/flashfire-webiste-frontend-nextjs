"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EU_TREES, getLocalePrefix } from "@/src/utils/locale";

const LANG_BY_PREFIX: Record<string, string> = {
  "/en-us": "en-US",
  "/en-ca": "en-CA",
  "/en-gb": "en-GB",
  "/en-au": "en-AU",
  ...Object.fromEntries(EU_TREES.map((tree) => [tree.prefix, tree.hreflang])),
};

/** Keeps <html lang> in step with the page's hreflang region (static HTML stays "en"). */
export default function HtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    const prefix = getLocalePrefix(pathname);
    document.documentElement.lang = LANG_BY_PREFIX[prefix] ?? "en-US";
  }, [pathname]);
  return null;
}
