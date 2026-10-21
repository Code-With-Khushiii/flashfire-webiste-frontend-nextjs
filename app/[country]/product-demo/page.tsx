import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export const generateMetadata = euMetadata((url) => ({
  title: "Flashfire Product Demo - See the Platform in Action | EU",
  description:
    "Watch a full walkthrough of the Flashfire platform: how we find roles, tailor your CV for every application, and track everything from one dashboard.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/product-demo"),
    languages: hreflangLanguages("/product-demo"),
  },
  openGraph: {
    title: "Flashfire Product Demo - See the Platform in Action",
    description:
      "A full walkthrough of the Flashfire job search automation platform.",
    url: url("/product-demo"),
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
}));

export default function ProductDemoPageEU() {
  return (
    <>
      <Navbar />
      <HomePageVideo />
      <Footer />
    </>
  );
}
