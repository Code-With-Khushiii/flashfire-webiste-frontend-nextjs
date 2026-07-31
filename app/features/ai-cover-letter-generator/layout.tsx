import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cover Letter Builder for Job Applications",
  description: "Create personalized, ATS-friendly cover letters tailored to every job application. Save time, match job descriptions, and improve your interview chances.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

