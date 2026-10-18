import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Flashfire AI Job Search Automation",
  description:
    "Book a free demo to see how Flashfire applies to jobs for you with tailored resumes, real-time updates and a dedicated team.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/book-a-demo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
