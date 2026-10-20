import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/get-me-interview",
    languages: hreflangLanguages("/get-me-interview"),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
