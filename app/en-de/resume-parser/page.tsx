import { Metadata } from "next";

export { default } from "@/app/resume-parser/page";

export const metadata: Metadata = {
  title: "Resume Parser | Flashfire EU",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-de/resume-parser",
    languages: {
      "en-US": "https://www.flashfirejobs.com/resume-parser",
      "en-CA": "https://www.flashfirejobs.com/en-ca/resume-parser",
      "en-GB": "https://www.flashfirejobs.com/en-gb/resume-parser",
      "en-AU": "https://www.flashfirejobs.com/en-au/resume-parser",
      "en-IE": "https://www.flashfirejobs.com/en-ie/resume-parser",
      "en-DE": "https://www.flashfirejobs.com/en-de/resume-parser",
      "en-NL": "https://www.flashfirejobs.com/en-nl/resume-parser",
      "en-FR": "https://www.flashfirejobs.com/en-fr/resume-parser",
      "x-default": "https://www.flashfirejobs.com/resume-parser",
    },
  },
};
