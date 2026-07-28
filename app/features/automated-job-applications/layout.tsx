import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automate Job Applications to  Get More Interviews",
  description: "FlashFire automates your job search by finding relevant jobs, optimizing your resume for ATS, and submitting applications faster to increase interview opportunities.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/automated-job-applications",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

