import type { ReactNode } from "react";
import { euMetadata } from "@/src/utils/euTree";

// Action page that renders the home page: keep it out of the index, but never
// let it inherit the root layout's homepage canonical.
export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire EU",
  description: "AI-powered job search automation.",
  robots: { index: false, follow: true },
  alternates: { canonical: url("/Get-Started") },
}));

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
