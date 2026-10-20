import PaymentPolicy from "@/src/components/legal/PaymentPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { euMetadata } from "@/src/utils/euTree";

export const generateMetadata = euMetadata((url) => ({
  title: "Payment Policy - Payment Terms & Methods | Flashfire",
  description:
    "Learn about Flashfire's payment policy, accepted payment methods, billing cycles, and refund procedures.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url("/payment-policy"),
  },
  openGraph: {
    title: "Payment Policy - Payment Terms & Methods",
    description:
      "Learn about Flashfire's payment policy and accepted payment methods.",
    url: url("/payment-policy"),
    type: "website",
  },
}));

export default function PaymentPolicyPageEU() {
  return (
    <>
      <Navbar />
      <PaymentPolicy />
      <Footer />
    </>
  );
}

