import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-remote-job-search-platform/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Remote Job Search Platform | Flashfire EU",
  description:
    "Discover remote jobs across EU, US, and global markets with Flashfire's AI-powered remote job search platform.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-remote-job-search-platform"),
    languages: hreflangLanguages("/ai-remote-job-search-platform"),
  },
}));
