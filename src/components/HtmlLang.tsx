"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocalePrefix } from "@/src/utils/locale";

const LANG_BY_PREFIX: Record<string, string> = {
  "/en-us": "en-US",
  "/en-ca": "en-CA",
  "/en-gb": "en-GB",
  "/en-au": "en-AU",
  "/en-ie": "en-IE",
  "/en-de": "en-DE",
  "/en-nl": "en-NL",
  "/en-fr": "en-FR",
  // "en-EU" is not a real region tag, so the pan-European tree is plain English.
  "/en-eu": "en",
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
