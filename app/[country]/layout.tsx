import type { ReactNode } from "react";
import { EU_PREFIXES } from "@/src/utils/locale";

// One static copy of this tree per EU locale; any other first segment 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return EU_PREFIXES.map((prefix) => ({ country: prefix.slice(1) }));
}

export default function EULayout({ children }: { children: ReactNode }) {
  return children;
}
