"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Activity, FileText, Send, UserRound } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const SAMPLE = "Sample view · example details only";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-[#545b65]">{label}</p>
      <div className="mt-1 border border-[#eadfd8] bg-white px-3 py-2 text-xs font-bold text-[#24272d]">
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
    <div className="w-full border-[6px] border-[#fcf9f7] bg-[#fcf9f7]">
      <div className="bg-white p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#ff5a1f]">
          {SAMPLE}
        </p>
        <h3 className="mt-3 text-lg font-extrabold text-[#080b10]">{title}</h3>
        <div className="mt-4">{children}</div>
        <p className="mt-4 text-[11px] font-bold leading-4 text-[#545b65]">{note}</p>
      </div>
    </div>
  );
}

function ComparePane({
  title,
  lines,
  highlight,
}: {
  title: string;
  lines: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`border p-3 ${
        highlight ? "border-[#ff5a1f] bg-[#fff4ee]" : "border-[#eadfd8] bg-white"
      }`}
    >
      <p className="text-xs font-extrabold text-[#080b10]">{title}</p>
      <ul className="mt-3 space-y-2 text-[11px] font-bold leading-4 text-[#545b65]">
        {lines.map((l) => (
          <li key={l} className="flex gap-2">
            <span className={highlight ? "text-[#ff5a1f]" : "text-[#b9aea6]"}>●</span>
            {l}
          </li>
        ))}
      </ul>
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
    stage: "STEP 01",
    title: "Tell us what you actually want",
    text: "Start with a quick chat about the roles you're after, where you'd like to work, your experience and any visa needs. No two people want the same job, so your search shouldn't look the same either.",
    card: (
      <Card
        title="Your search profile"
        note="We confirm your preferences and eligibility with you before anything goes out."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Target roles" value="Data Analyst, BI Analyst" />
          <Field label="Location / work mode" value="Toronto · Hybrid or remote" />
          <Field label="Experience" value="2 years" />
          <Field label="Visa / sponsorship" value="Needs sponsorship" />
        </div>
      </Card>
    ),
  },
  {
    tag: "Resume",
    icon: FileText,
    stage: "STEP 02",
    title: "We find the roles and shape your resume for each one",
    text: "We look for openings that genuinely fit, then tailor your resume to each job description. It's built from your real experience, so it sounds like you and nothing gets made up.",
    card: (
      <Card
        title="One role, one tailored resume"
        note="AI drafts it, a person reviews it where your plan includes that."
      >
        <p className="mb-3 text-xs font-bold text-[#545b65]">
          Data Analyst · Example Co. · Toronto
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ComparePane
            title="Your resume today"
            lines={["General summary", "Skills in no set order", "Few keywords from the job"]}
          />
          <ComparePane
            highlight
            title="Tailored for this role"
            lines={["Summary aimed at the role", "Relevant skills first", "Keywords from the job post"]}
          />
        </div>
      </Card>
    ),
  },
  {
    tag: "Apply",
    icon: Send,
    stage: "STEP 03",
    title: "Reviewed, then sent",
    text: "AI handles the heavy lifting on matching and drafts. Where your plan includes it, a real person looks everything over before suitable applications go out, within the scope you agreed.",
    card: (
      <Card
        title="Application record"
        note="What gets reviewed and submitted depends on your plan."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Job title" value="Data Analyst" />
          <Field label="Company" value="Example Co." />
          <Field label="Status" value="Reviewed · Submitted" />
          <Field label="Resume version" value="Data Analyst v2" />
        </div>
      </Card>
    ),
  },
  {
    tag: "Track",
    icon: Activity,
    stage: "STEP 04",
    title: "Watch it move, and tweak as you go",
    text: "See where every application stands, check what's been done, and talk to us whenever you want to adjust your preferences. Your search can change as you learn what's working.",
    card: (
      <Card
        title="Activity and support"
        note="Example workflow only. These are not real customer results."
      >
        <div className="space-y-3">
          {[
            "Role matched → Resume tailored",
            "Reviewed → Submitted",
            "Status update → Check-in with you",
          ].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between border border-[#eadfd8] bg-white px-4 py-3 text-xs font-bold text-[#24272d]"
            >
              <span className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5a1f]" />
                {row}
              </span>
              <span className="text-[10px] text-[#545b65]">Example</span>
            </div>
          ))}
        </div>
      </Card>
    ),
  },
];

export default function JobMatchingSection() {
  const { getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const listRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const list = listRef.current;
      if (!list) return;
      const mark = window.innerHeight * 0.5;
      const rect = list.getBoundingClientRect();
      setLineProgress(Math.min(1, Math.max(0, (mark - rect.top) / rect.height)));
      let current = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mark) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
    <>
    <section className="w-full bg-[#fffefd] px-5 py-12 font-['Satoshi',sans-serif] sm:px-6 md:px-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Process */}
        <div className="max-w-3xl">
          <h2 className="font-bold tracking-[-0.03em] leading-[110%] text-[#02060A] text-[1.75rem] min-[769px]:text-[2.4rem] min-[1025px]:text-[50.84px]">
            From your career goals to a{" "}
            <span className="bg-gradient-to-r from-[#d84a22] via-[#f05a23] to-[#ff7a2a] bg-clip-text text-transparent">
              more focused job search.
            </span>
          </h2>
          <p className="mt-4 max-w-[640px] text-[15px] font-medium leading-[145%] tracking-[-0.02em] text-[#02060A] md:mt-5 md:text-[20px] md:leading-[139%] md:tracking-[-0.03em]">
            Job hunting feels better when someone has a plan. Here's how we take
            what you want and turn it into applications you can actually follow.
          </p>
        </div>

        <div ref={listRef} className="relative mt-10 pl-9 md:mt-12 md:pl-14">
          {/* Progress line: grey track + orange fill that grows as you scroll */}
          <div className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-[#f0d5c8] md:left-[15px]" aria-hidden="true">
            <div
              className="w-full bg-[#ff5a1f]"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {stages.map((st, i) => {
            const text = (
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <span
                    aria-label={st.tag}
                    className="inline-flex h-10 w-10 items-center justify-center bg-[#ff5a1f]"
                  >
                    <st.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </span>
                  <div className="h-px flex-1 bg-[#f0d5c8]" />
                </div>
                <p className="mt-4 text-[11px] font-bold tracking-wide text-[#ff5a1f]">
                  {st.stage}
                </p>
                <h3 className="mt-2 text-[20px] font-bold tracking-[-0.02em] leading-[1.15] text-[#02060A] md:text-[24px]">
                  {st.title}
                </h3>
                <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#545b65]">
                  {st.text}
                </p>
              </div>
            );

            return (
              <div
                key={st.stage}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`relative ${i > 0 ? "mt-12 md:mt-20" : ""}`}
              >
                {/* Step marker on the line */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-9 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors duration-300 md:-left-14 md:h-8 md:w-8 md:text-xs ${
                    i <= active
                      ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
                      : "border-[#f0d5c8] bg-white text-[#b9aea6]"
                  }`}
                >
                  {i + 1}
                </span>
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
      </div>
    </section>

    {/* Dashboard */}
    <section className="w-full bg-[#fcf9f7] px-4 py-14 font-['Satoshi',sans-serif] sm:px-6 md:px-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="border-[6px] border-white bg-white">
          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#ff5a1f]">
              Once you're on board
            </p>
            <h2 className="mt-3 font-bold tracking-[-0.03em] leading-[110%] text-[#02060A] text-[1.8rem] min-[769px]:text-[2.4rem] min-[1025px]:text-[50.84px]">
              Always know where your applications stand.
            </h2>
            <p className="mt-3 max-w-[640px] text-base font-medium leading-[139%] tracking-[-0.03em] text-[#02060A] md:text-[20px]">
              No chasing for updates. Your preferences, the roles in progress and
              everything that's been submitted live in one place.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2.6fr_1fr]">
              <div className="self-start overflow-hidden border border-[#eadfd8] bg-white">
                <Image
                  src="/images/dashboard.png"
                  alt="Flashfire dashboard showing total applications, active interviews and recent activity"
                  width={1899}
                  height={822}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 800px, 100vw"
                />
              </div>

              <div>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] leading-tight text-[#02060A] md:text-2xl">
                  Nothing hidden after you sign up.
                </h3>
                <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#545b65]">
                  We confirm your goals and what your plan covers. After that, you
                  can see which roles we're working on and where applications have
                  gone.
                </p>
                <ul className="mt-6 divide-y divide-[#f0d5c8] border-y border-[#f0d5c8] text-xs font-bold text-[#24272d]">
                  <li className="py-3">
                    <span className="mr-2 text-[#ff5a1f]">01 /</span>Check each job and its status
                  </li>
                  <li className="py-3">
                    <span className="mr-2 text-[#ff5a1f]">02 /</span>See which resume version was used
                  </li>
                  <li className="py-3">
                    <span className="mr-2 text-[#ff5a1f]">03 /</span>Catch up on recent updates
                  </li>
                </ul>
                <div className="mt-6 border-[6px] border-[#fcf9f7] bg-[#fcf9f7]">
                  <div className="bg-white p-4">
                    <p className="text-sm font-extrabold text-[#080b10]">
                      Questions along the way?
                    </p>
                    <p className="mt-2 text-xs font-bold leading-5 text-[#545b65]">
                      Our team is here to help. Support channels and response
                      times vary by plan, so we'll confirm what's included for
                      you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            {...getButtonProps()}
            onClick={handleStartAIJobSearch}
            className="inline-flex min-h-12 items-center justify-center bg-[#ff5a1f] px-8 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#e04d18] focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
