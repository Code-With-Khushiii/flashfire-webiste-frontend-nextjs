import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Profile Optimization for Job Seekers",
  description: "Optimize your LinkedIn profile for recruiter searches, stronger visibility, and more interview opportunities. Improve your headline, keywords, skills, and profile positioning with Flashfire.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

