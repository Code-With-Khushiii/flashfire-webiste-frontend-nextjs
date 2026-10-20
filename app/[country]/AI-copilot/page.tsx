import AICopilot from "@/src/components/AICopilot/AICopilot";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";
export const generateMetadata = euMetadata((url) => ({
  title: "AI Copilot: Personalized Interview Tips | Flashfire",
  description:
    "Get personalized interview tips based on your skills, experience, and career goals. Our interview buddy is here to help you land your dream job.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/AI-copilot"),
    languages: hreflangLanguages("/AI-copilot"),
  },
  openGraph: {
    title: "AI Copilot: Personalized Interview Tips | Flashfire",
    description:
      "Get personalized interview tips based on your skills, experience, and career goals.",
    url: url("/AI-copilot"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
}));
export default function AIcopilot() {
  return (
    <>
      <Navbar />
      <AICopilot />
      <Footer />
    </>
  );
}