import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-tracker",
    languages: hreflangLanguages("/features/job-tracker"),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
