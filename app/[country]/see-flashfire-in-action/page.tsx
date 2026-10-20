import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Watch Flashfire Live Demo & Product Tour",
  description:
    "Watch Flashfire in action. See how our AI-powered job search automation works with a live demo of our platform features.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/see-flashfire-in-action"),
    languages: hreflangLanguages("/see-flashfire-in-action"),
  },
  openGraph: {
    title: "Watch Flashfire Live Demo & Product Tour",
    description:
      "Watch Flashfire in action with a live demo of our platform.",
    url: url("/see-flashfire-in-action"),
    type: "website",
  },
}));

export default function SeeFlashfireInActionPageEU() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="demo" />
    </>
  );
}

