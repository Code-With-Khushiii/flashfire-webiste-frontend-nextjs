"use client";

import type { ReactNode } from "react";
import { ChartNoAxesCombined, FileText, Send, UserRound } from "lucide-react";

const panelLabel =
  "text-[11px] uppercase tracking-[0.04em] text-[#6b625d]";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-[#6b625d]">{label}</p>
      <div className="mt-1 border border-[#111]/40 bg-white px-3 py-3 text-[14px] text-[#111]">
        {value}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[#111]/60 bg-[#fbf3ee] p-6">
      <p className={panelLabel}>Example only</p>
      <h3 className="mt-5 text-[22px] font-bold text-[#111]">{title}</h3>
      {children}
    </div>
  );
}

function SearchProfilePanel() {
  return (
    <Panel title="Your search profile">
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Target roles" value="Your preferred roles" />
        <Field label="Locations / work mode" value="Your preferred locations" />
        <Field label="Experience" value="Your experience level" />
        <Field label="Visa / sponsorship requirements" value="Requirements to confirm" />
      </div>
      <p className="mt-4 text-[12px] text-[#6b625d]">
        Preferences and eligibility handling confirmed during intake.
      </p>
    </Panel>
  );
}

function TailoredResumePanel() {
  const lines = ["w-[85%]", "w-[60%]", "w-[75%]"];
  return (
    <Panel title="Relevant opportunity → tailored resume">
      <p className="mt-4 text-[14px] text-[#111]">
        Job title · Company · Location
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { heading: "Before / your resume", note: "Experience snippet" },
          { heading: "After / role-aligned draft", note: "Experience snippet" },
        ].map((card) => (
          <div key={card.heading} className="border border-[#111]/40 bg-white p-4">
            <p className="text-[14px] font-bold text-[#111]">{card.heading}</p>
            <p className="mt-2 text-[12px] text-[#6b625d]">{card.note}</p>
            <div className="mt-4 space-y-3">
              {lines.map((w) => (
                <div key={w} className={`h-[7px] bg-[#111]/20 ${w}`} />
              ))}
            </div>
            <p className="mt-4 text-[12px] text-[#6b625d]">Alignment notes</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#6b625d]">
        AI-assisted draft → human review where included. No invented experience.
      </p>
    </Panel>
  );
}

function ApplicationRecordPanel() {
  return (
    <Panel title="Application record">
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Job title" value="Relevant role" />
        <Field label="Company" value="Company" />
        <Field label="Status" value="Review / submission status" />
        <Field label="Resume version" value="Role-aligned version" />
      </div>
      <p className="mt-4 text-[12px] text-[#6b625d]">
        Submission and review steps depend on the confirmed plan scope.
      </p>
    </Panel>
  );
}

function ActivityPanel() {
  const items = [
    "Matched → Resume prepared",
    "Review → Submitted",
    "Status update → Support touchpoint",
  ];
  return (
    <Panel title="Application activity & support">
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 border border-[#111]/40 bg-white px-4 py-3 text-[14px] text-[#111]"
          >
            <span className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border border-[#111]" />
              {item}
            </span>
            <span className="text-[12px] text-[#6b625d]">Date</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#6b625d]">
        Example workflow statuses, not customer results or real application
        activity.
      </p>
    </Panel>
  );
}

const stages = [
  {
    tile: "Profile",
    Icon: UserRound,
    title: "Understand your goals",
    text: "Share your target roles, preferred locations, experience and requirements. Your profile sets the direction for the search.",
    panel: <SearchProfilePanel />,
  },
  {
    tile: "Resume",
    Icon: FileText,
    title: "Find and tailor",
    text: "Find relevant opportunities and align your resume to the job description, grounded in your actual experience.",
    panel: <TailoredResumePanel />,
  },
  {
    tile: "Apply",
    Icon: Send,
    title: "Review and apply",
    text: "AI assists matching and resume drafts. Human review is used where included, before suitable applications are submitted within your agreed service scope.",
    panel: <ApplicationRecordPanel />,
  },
  {
    tile: "Track",
    Icon: ChartNoAxesCombined,
    title: "Track and improve",
    text: "Follow application statuses, review activity and use support touchpoints to refine preferences as your search progresses.",
    panel: <ActivityPanel />,
  },
];

export default function HomePageSteps() {
  return (
    <section className="border-t border-[#111] bg-white py-16 font-['Space_Grotesk',sans-serif] md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="mb-12 max-w-[820px] md:mb-16">
          <h2 className="text-[30px] font-bold leading-[1.1] text-[#080b10] md:text-[44px]">
            From your career goals to a more focused job search.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.55] text-[#545b65] md:text-[17px]">
            One connected process — preferences guide the search, and each
            application leaves a record you can follow.
          </p>
        </div>

        {stages.map((stage, index) => {
          const reversed = index % 2 === 1;
          const number = String(index + 1).padStart(2, "0");
          return (
            <div key={stage.title}>
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
                <div className={reversed ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-[56px] w-[64px] items-center justify-center border border-[#111]/60 bg-[#f8f0eb] text-[#ff4c00]"
                      title={stage.tile}
                    >
                      <stage.Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                      <span className="sr-only">{stage.tile}</span>
                    </span>
                    <span className="h-px flex-1 bg-[#111]/50" />
                    <span aria-hidden="true" className="text-[16px]">
                      ↓
                    </span>
                  </div>
                  <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.06em] text-[#111]">
                    Stage {number}
                  </p>
                  <h3 className="mt-3 text-[24px] font-bold leading-[1.2] text-[#111]">
                    {stage.title}
                  </h3>
                  <p className="mt-8 max-w-[440px] text-[16px] leading-[1.5] text-[#545b65]">
                    {stage.text}
                  </p>
                </div>

                <div className={reversed ? "md:order-1" : ""}>{stage.panel}</div>
              </div>

              {index < stages.length - 1 && (
                <div className="my-10 flex flex-col items-center">
                  <span className="h-8 w-px bg-[#111]/50" />
                  <span aria-hidden="true" className="text-[16px]">
                    ↓
                  </span>
                  <span className="mt-3 h-px w-full bg-[#111]/25" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
