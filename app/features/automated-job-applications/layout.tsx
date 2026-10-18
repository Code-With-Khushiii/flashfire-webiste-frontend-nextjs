import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automate Job Applications to  Get More Interviews",
  description: "FlashFire finds relevant jobs, optimizes your resume for ATS and submits applications for you, so you can land more interviews with far less effort.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/automated-job-applications",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

