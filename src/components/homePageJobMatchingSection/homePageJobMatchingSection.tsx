"use client";

import type { ReactNode } from "react";
import { Activity, FileText, Send, UserRound } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const SCHEMATIC = "PRODUCT UI SCHEMATIC / PLACEHOLDER DATA ONLY";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-[#7a7a7a]">{label}</p>
      <div className="mt-1 border border-[#cfcfcf] bg-white px-3 py-2 text-xs text-[#333]">
        {value}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  note,
}: {
  title: string;
  children: ReactNode;
  note: string;
}) {
  return (
    <div className="w-full border border-[#c9c9c9] bg-[#f3f3f3] p-5 sm:p-6">
      <p className="text-[10px] tracking-wide text-[#7a7a7a]">{SCHEMATIC}</p>
      <h3 className="mt-3 text-lg font-bold text-black">{title}</h3>
      <div className="mt-4">{children}</div>
      <p className="mt-4 text-[11px] text-[#7a7a7a]">{note}</p>
    </div>
  );
}

function ComparePane({ title }: { title: string }) {
  return (
    <div className="border border-[#d4d4d4] bg-white p-3">
      <p className="text-xs font-bold text-black">{title}</p>
      <p className="mt-2 text-[10px] text-[#7a7a7a]">[Experience snippet — placeholder]</p>
      <div className="mt-3 space-y-2">
        <div className="h-1.5 w-4/5 bg-[#d9d9d9]" />
        <div className="h-1.5 w-3/5 bg-[#d9d9d9]" />
        <div className="h-1.5 w-2/3 bg-[#d9d9d9]" />
      </div>
      <p className="mt-3 text-[10px] text-[#7a7a7a]">[Alignment notes pending]</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex flex-col items-center py-4 text-[#7a7a7a]">
      <div className="h-6 w-px bg-[#bdbdbd]" />
      <span className="text-sm leading-none">↓</span>
    </div>
  );
}

const stages: {
  tag: string;
  icon: typeof UserRound;
  stage: string;
  title: string;
  text: string;
  card: ReactNode;
}[] = [
  {
    tag: "Profile",
    icon: UserRound,
    stage: "STAGE 01",
    title: "Understand your goals",
    text: "Share your target roles, preferred locations, experience and requirements. Your profile sets the direction for the search.",
    card: (
      <Card
        title="Your search profile"
        note="Preferences and eligibility handling confirmed during intake."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Target roles" value="[Your preferred roles]" />
          <Field label="Locations / work mode" value="[Your preferred locations]" />
          <Field label="Experience" value="[Your experience level]" />
          <Field label="Visa / sponsorship requirements" value="[Requirements to confirm]" />
        </div>
      </Card>
    ),
  },
  {
    tag: "Resume",
    icon: FileText,
    stage: "STAGE 02",
    title: "Find and tailor",
    text: "Find relevant opportunities and align your resume to the job description, grounded in your actual experience.",
    card: (
      <Card
        title="Relevant opportunity → tailored resume"
        note="AI-assisted draft → human review where included. No invented experience."
      >
        <p className="mb-3 text-xs text-[#555]">
          [Job-title slot] · [Company slot] · [Location slot]
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ComparePane title="Before / your resume" />
          <ComparePane title="After / role-aligned draft" />
        </div>
      </Card>
    ),
  },
  {
    tag: "Apply",
    icon: Send,
    stage: "STAGE 03",
    title: "Review and apply",
    text: "AI assists matching and resume drafts. Human review is used where included, before suitable applications are submitted within your agreed service scope.",
    card: (
      <Card
        title="Application record"
        note="Submission and review steps depend on the confirmed plan scope."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Job title" value="[Relevant role slot]" />
          <Field label="Company" value="[Company slot]" />
          <Field label="Status" value="[Review / submission status]" />
          <Field label="Resume version" value="[Role-aligned version slot]" />
        </div>
      </Card>
    ),
  },
  {
    tag: "Track",
    icon: Activity,
    stage: "STAGE 04",
    title: "Track and improve",
    text: "Follow application statuses, review activity and use support touchpoints to refine preferences as your search progresses.",
    card: (
      <Card
        title="Application activity & support"
        note="Example workflow statuses, not customer results or real application activity."
      >
        <div className="space-y-3">
          {[
            "Matched → Resume prepared",
            "Review → Submitted",
            "Status update → Support touchpoint",
          ].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between border border-[#d4d4d4] bg-white px-4 py-3 text-xs text-[#333]"
            >
              <span className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full border border-black" />
                {row}
              </span>
              <span className="text-[10px] text-[#7a7a7a]">[Date]</span>
            </div>
          ))}
        </div>
      </Card>
    ),
  },
];

const dashboardStatuses = ["In review", "Prepared", "Submitted"];

export default function JobMatchingSection() {
  const { getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleStartAIJobSearch = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Matching_Section"
          : "Job_Matching_Section";

      GTagUTM({
        eventName: "sign_up_click",
        label: "Job_Matching_Start_AI_Job_Search_Button",
        utmParams: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign:
            typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
        },
      });
      trackButtonClick("Start AI-Powered Job Search", "job_matching_cta", "cta", {
        button_location: "job_matching_section",
        section: "job_matching",
      });
      trackSignupIntent("job_matching_cta", {
        signup_source: "job_matching_button",
        funnel_stage: "signup_intent",
      });

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", "/Get-Started");
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    } catch (error) {
      console.error("Error starting AI job search:", error);
    } finally {
      stopHold();
    }
  };

  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 md:px-12 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Process */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold leading-tight text-black md:text-5xl">
            From your career goals to a more focused job search.
          </h2>
          <p className="mt-4 text-sm text-[#7a7a7a] md:text-base">
            One connected process — preferences guide the search, and each
            application leaves a record you can follow.
          </p>
        </div>

        <div className="mt-12">
          {stages.map((st, i) => {
            const text = (
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <span
                    aria-label={st.tag}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[#bdbdbd] bg-[#ececec]"
                  >
                    <st.icon className="h-5 w-5 text-[#ff4c00]" strokeWidth={2} />
                  </span>
                  <div className="h-px flex-1 bg-[#d4d4d4]" />
                </div>
                <p className="mt-4 text-[10px] font-semibold tracking-wide text-[#ff4c00]">
                  {st.stage}
                </p>
                <h3 className="mt-2 text-xl font-bold text-black">{st.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#666]">{st.text}</p>
              </div>
            );

            return (
              <div key={st.stage}>
                {i > 0 && (
                  <>
                    <Arrow />
                    <div className="h-px w-full bg-[#e4e4e4]" />
                    <div className="h-6" />
                  </>
                )}
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                  {i % 2 === 0 ? (
                    <>
                      {text}
                      {st.card}
                    </>
                  ) : (
                    <>
                      <div className="order-2 md:order-1">{st.card}</div>
                      <div className="order-1 md:order-2">{text}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard */}
        <div className="mt-20 bg-[#f3f3f3] p-5 sm:p-8 lg:p-10">
          <p className="text-[10px] text-[#7a7a7a]">
            Inside the experience / accountability after payment
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-black md:text-4xl">
            Know where your applications go.
          </h2>
          <p className="mt-3 text-sm text-[#666]">
            A desktop dashboard schematic: your preferences, the work in
            progress and a record of submissions, all in one view.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_1fr]">
            <div className="flex overflow-hidden border border-[#c9c9c9] bg-white">
              <aside className="hidden w-32 shrink-0 bg-[#ececec] p-4 text-xs text-[#555] sm:block">
                <p className="font-bold text-black">Flashfire</p>
                <ul className="mt-4 space-y-3">
                  {["Overview", "Applications", "Resumes", "Preferences", "Support"].map(
                    (n) => (
                      <li key={n}>{n}</li>
                    )
                  )}
                </ul>
                <p className="mt-6 text-[9px] leading-4 text-[#888]">
                  SCHEMATIC / not live product data
                </p>
              </aside>

              <div className="min-w-0 flex-1 p-4 sm:p-5">
                <h3 className="text-base font-bold text-black">Your job search</h3>
                <p className="mt-1 text-[10px] text-[#7a7a7a]">
                  Example data: schematic / placeholder only, not customer activity
                </p>

                <div className="mt-4 bg-[#f3f3f3] p-3 text-[11px] text-[#444]">
                  <p className="font-bold text-black">Target roles &amp; preferences</p>
                  <p className="mt-1">Roles: [Your target roles] · Locations: [Your locations]</p>
                  <p>Experience: [Level] · Requirements: [To confirm]</p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Matched", "In review", "Submitted"].map((l) => (
                    <div key={l} className="border border-[#d4d4d4] p-3">
                      <p className="text-[10px] text-[#7a7a7a]">{l}</p>
                      <p className="mt-1 text-xl font-bold text-black">[—]</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-[#d4d4d4] text-[10px] font-bold text-black">
                        <th className="py-2 pr-2">JOB / COMPANY</th>
                        <th className="py-2 pr-2">STATUS</th>
                        <th className="py-2 pr-2">RESUME</th>
                        <th className="py-2">LAST ACTIVITY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardStatuses.map((status) => (
                        <tr
                          key={status}
                          className="border-b border-[#e4e4e4] align-top text-[#444]"
                        >
                          <td className="py-3 pr-2">
                            <p className="font-bold text-black">[Job title]</p>
                            <p className="text-[10px] text-[#7a7a7a]">[Company placeholder]</p>
                          </td>
                          <td className="py-3 pr-2">{status}</td>
                          <td className="py-3 pr-2 text-[#7a7a7a]">[Version / tailoring status]</td>
                          <td className="py-3 text-[#7a7a7a]">[Date pending]</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-[#f3f3f3] p-3 text-[11px] text-[#444]">
                  <p className="font-bold text-black">Recent activity</p>
                  <p className="mt-1">[Date / time] — [Application or resume update]</p>
                  <p>[Date / time] — [Support touchpoint]</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold leading-tight text-black">
                After payment, not a black box.
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#666]">
                Confirm your goals and purchased scope, then see which roles are
                being worked on and where applications have been submitted.
              </p>
              <ul className="mt-6 divide-y divide-[#d4d4d4] border-y border-[#d4d4d4] text-xs text-[#444]">
                <li className="py-3">
                  <span className="mr-2 text-[#ff4c00]">01 /</span>Review job details and status
                </li>
                <li className="py-3">
                  <span className="mr-2 text-[#ff4c00]">02 /</span>See the resume version used
                </li>
                <li className="py-3">
                  <span className="mr-2 text-[#ff4c00]">03 /</span>Follow recent activity and updates
                </li>
              </ul>
              <div className="mt-6 border border-[#c9c9c9] bg-white p-4">
                <p className="text-sm font-bold text-black">WhatsApp updates / support</p>
                <p className="mt-2 text-xs text-[#444]">Availability to be confirmed</p>
                <p className="mt-2 text-[11px] text-[#7a7a7a]">
                  Channel, response times and plan eligibility require confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            {...getButtonProps()}
            onClick={handleStartAIJobSearch}
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-black px-8 text-base font-bold text-white shadow-md transition-colors hover:bg-[#ff4c00] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
          >
            Start AI-Powered Job Search
          </button>
        </div>
      </div>
    </section>
  );
}
