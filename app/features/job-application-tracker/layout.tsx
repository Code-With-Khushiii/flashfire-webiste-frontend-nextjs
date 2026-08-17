import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Application Tracker to Organize Your Job Search",
  description: "Track job applications, manage interviews, organize recruiter contacts, and monitor your job search progress from one centralized dashboard with FlashFire.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-application-tracker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

