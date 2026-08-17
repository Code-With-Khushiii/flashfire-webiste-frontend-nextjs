import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker & Resume Optimizer",
  description: "Check your resume for ATS issues, improve keyword matching, and optimize it for recruiters. Use Flashfire's free ATS resume checker and resume optimizer.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/ats-resume-optimizer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

