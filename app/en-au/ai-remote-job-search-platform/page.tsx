import { Metadata } from "next";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-remote-job-search-platform/page";

export const metadata: Metadata = {
  title: "AI Remote Job Search Platform | Flashfire Australia",
  description:
    "Discover remote jobs across Australia, US, and global markets with Flashfire's AI-powered remote job search platform.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-remote-job-search-platform",
    languages: hreflangLanguages("/ai-remote-job-search-platform"),
  },
};
