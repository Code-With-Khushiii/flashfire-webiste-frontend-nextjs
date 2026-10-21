import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/job-application-status-tracker/page";

export const generateMetadata = euMetadata((url) => ({
  title: "Job Application Status Tracker with AI | Flashfire EU",
  description:
    "Track every job application, follow-up, and interview in one AI-powered job application status tracker.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/job-application-status-tracker"),
    languages: hreflangLanguages("/job-application-status-tracker"),
  },
}));
