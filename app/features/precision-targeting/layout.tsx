import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/precision-targeting",
    languages: hreflangLanguages("/features/precision-targeting"),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
