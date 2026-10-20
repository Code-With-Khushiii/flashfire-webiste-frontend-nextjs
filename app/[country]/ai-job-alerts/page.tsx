import { euMetadata } from "@/src/utils/euTree";
import { hreflangLanguages } from "@/src/utils/locale";

export { default } from "@/app/ai-job-alerts/page";

export const generateMetadata = euMetadata((url) => ({
  title: "AI Job Alerts & Smart Job Notifications | Flashfire EU",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile in Europe.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: url("/ai-job-alerts"),
    languages: hreflangLanguages("/ai-job-alerts"),
  },
}));
