import { Metadata } from "next";

import { hreflangLanguages } from "@/src/utils/locale";
export const metadata: Metadata = {
  title: "Precision Job Targeting for Better Interview Chances",
  description: "Find jobs that match your skills, experience, and career goals. FlashFire helps you focus on high-fit opportunities to improve your interview chances.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/ai-job-targeting",
    languages: hreflangLanguages("/features/ai-job-targeting"),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

