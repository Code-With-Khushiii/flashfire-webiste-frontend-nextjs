import Image from "next/image";
import Link from "next/link";

const shell = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-[#f55d1d]";

function SectionHeading({
  eyebrowText,
  title,
  description,
}: {
  eyebrowText: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className={eyebrow}>{eyebrowText}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#151515] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5a524d] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function HomeDraftResults() {
  return (
    <section id="results" className="bg-white py-16 sm:py-20">
      <div className={shell}>
        <div className="grid gap-8 border-b border-[#e8e3df] pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <SectionHeading
            eyebrowText="Results at a glance"
            title="Results at a glance"
          />
          <p className="max-w-2xl text-sm leading-6 text-[#5a524d] sm:text-base">
            Outcomes reported by Flashfire customers. Individual results vary;
            interviews and offers are not guaranteed.
          </p>
        </div>

        <div className="grid gap-4 pt-6 md:grid-cols-2">
          {[
            ["95%", "Users land an interview call within a month*"],
            ["90%", "Users get a job offer within 3 months*"],
          ].map(([value, label]) => (
            <article key={value} className="border border-[#d9d5d1] bg-[#fffdfc] p-6 sm:p-8">
              <p className="mt-3 text-6xl font-bold leading-none tracking-[-0.06em] text-[#f55d1d] sm:text-7xl">
                {value}
              </p>
              <p className="mt-3 text-base font-semibold text-[#222]">{label}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-[#706862]">
          *Based on verified user data from the 2024–25 cohort. Individual outcomes vary.
        </p>

        <div className="mt-4 grid gap-4 border border-[#d9d5d1] bg-[#faf8f6] p-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-center sm:p-6">
          <div>
            <h3 className="text-2xl font-bold text-[#171717]">60+ offer letters received</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#f55d1d]">Across Flashfire customers</p>
          </div>
          <p className="text-sm leading-6 text-[#5a524d]">
            Offer letters shared by customers who reached their next career milestone.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3" aria-label="Employers represented in published customer outcomes">
          <p className="mr-2 w-full text-xs font-semibold text-[#706862] sm:w-auto">
            Employers represented in published customer outcomes
          </p>
          {[
            ["Amazon", "/logo/amazon.png"],
            ["Akamai", "/logo/akamai.png"],
            ["Skyworks", "/logo/skyworks.png"],
            ["IBM", "/logo/ibm.png"],
            ["Deloitte", "/logo/deloitte.png"],
          ].map(([name, src]) => (
            <div key={name} className="flex h-12 min-w-28 flex-1 items-center justify-center border border-[#e5e0dc] bg-white px-4">
              <Image src={src} alt={name} width={100} height={32} className="h-7 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const offerWallExamples = [
  { name: "Neha", company: "Deloitte", image: "/images/neha_offer.png" },
  { name: "Akrati", company: "Akamai Technologies", image: "/images/akrati_offer.png" },
  { name: "Rijul Jain", company: "Wise", image: "/images/rijul_offer.png" },
  { name: "Aman Guleria", company: "Barclays", image: "/images/aman_offer.png" },
];

export function HomeDraftOfferWall() {
  return (
    <section id="offer-letters" className="border-t-4 border-[#f55d1d] bg-[#fff8f4] py-16 sm:py-20">
      <div className={shell}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f55d1d]">
          04 — Offer letter wall / evidence, not promises
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-[#151515] sm:text-[38px]">
          60+ offer letters. Real career moves.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#4b403b]">
          Redacted customer offer letters show real career outcomes. Original client documents and personal details stay private.
        </p>

        <div className="mt-8 grid grid-cols-2 items-start gap-4 sm:gap-6 lg:grid-cols-4">
          {offerWallExamples.map((offer, index) => (
            <article
              key={offer.name}
              className={`overflow-hidden border border-[#efc6b4] bg-white shadow-[0_3px_12px_rgba(105,52,29,0.07)] ${
                index === 1 ? "lg:mt-10" : index === 2 ? "lg:mt-3" : index === 3 ? "lg:mt-[60px]" : ""
              }`}
            >
              <div className="relative aspect-[0.95] border-b-2 border-[#f55d1d] bg-white p-2 sm:p-3">
                <Image
                  src={offer.image}
                  alt={`Redacted ${offer.company} offer letter shared by ${offer.name}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 270px"
                  className="object-contain p-3 sm:p-5"
                />
              </div>
              <div className="border-t border-[#f5e3da] bg-[#fffdfc] px-3 py-2.5 sm:px-4">
                <p className="text-xs font-semibold text-[#222] sm:text-sm">{offer.name} · <span className="text-[#c74716]">{offer.company}</span></p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 text-sm text-[#5a524d] sm:flex-row sm:items-center sm:justify-between">
          <p>Redacted offer letters; original client documents remain private.</p>
          <a href="#stories" className="inline-flex min-h-11 items-center justify-center bg-[#f55d1d] px-4 font-semibold text-white transition hover:bg-[#d94c14]">
            Explore customer outcomes
          </a>
        </div>

        <div className="mt-7">
          <p className="mb-3 text-xs text-[#625a55]">Employers represented in published customer outcomes</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Amazon", "/logo/amazon.png"],
              ["Akamai", "/logo/akamai.png"],
              ["Skyworks", "/logo/skyworks.png"],
              ["IBM", "/logo/ibm.png"],
              ["Deloitte", "/logo/deloitte.png"],
            ].map(([name, src]) => (
              <div key={name} className="flex h-12 items-center justify-center border border-[#efc6b4] bg-white px-4">
                <Image src={src} alt={name} width={112} height={32} className="h-7 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const comparisonRows = [
  ["Job relevance", "Self-managed search; automated filters and targeting vary by tool.", "Matching shaped by your target roles and location preferences."],
  ["Resume tailoring", "You adapt each resume yourself, or rely on the tool’s available options.", "Resume aligned to relevant job descriptions and your actual experience."],
  ["Human review", "Self-review, external help or tool-specific review; availability varies.", "AI assists the workflow, with human review where included in your service."],
  ["Application visibility", "Records may be self-managed; tracking and updates vary by tool.", "Application monitoring and updates make submitted work visible."],
];

export function HomeDraftComparison() {
  return (
    <section id="feature" className="bg-white py-16 sm:py-20">
      <div className={shell}>
        <SectionHeading
          eyebrowText="05 / Differentiation / targeted work, visible process"
          title="Why Flashfire is a smarter job matching platform"
          description="More applications are not the same as more relevant applications. Flashfire organizes matching, tailoring and tracking around your goals, rather than a random mass-application approach."
        />
        <div className="overflow-x-auto border border-[#d9d5d1]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-white">
                <th scope="col" className="bg-[#333] p-4">What matters</th>
                <th scope="col" className="bg-[#333] p-4">Applying alone / generic auto-apply</th>
                <th scope="col" className="bg-[#f55d1d] p-4">With Flashfire</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([topic, alone, flashfire]) => (
                <tr key={topic} className="border-t border-[#e5e0dc] align-top">
                  <th scope="row" className="w-[18%] bg-[#faf8f6] p-4 font-bold text-[#222]">{topic}</th>
                  <td className="p-4 leading-6 text-[#5a524d]">{alone}</td>
                  <td className="bg-[#fff8f4] p-4 leading-6 text-[#3d302a]">{flashfire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#706862]">
          Descriptive comparison, not a claim about every tool. Confirm review
          scope and service inclusions before choosing a plan.
        </p>
      </div>
    </section>
  );
}

const journeyStages = [
  {
    title: "Understand your goals",
    copy: "Share your target roles, preferred locations, experience and requirements. Your profile sets the direction for the search.",
    marker: "Profile",
    panelTitle: "Your search profile",
    type: "profile",
  },
  {
    title: "Find and tailor",
    copy: "Find relevant opportunities and align your resume to the job description, grounded in your actual experience.",
    marker: "Resume",
    panelTitle: "Relevant opportunity → tailored resume",
    type: "tailoring",
  },
  {
    title: "Review and apply",
    copy: "AI assists matching and resume drafts. Human review is used where included, before suitable applications are submitted within your agreed service scope.",
    marker: "Apply",
    panelTitle: "Application record",
    type: "application",
  },
  {
    title: "Track and improve",
    copy: "Follow application statuses, review activity and use support touchpoints to refine preferences as your search progresses.",
    marker: "Track",
    panelTitle: "Application activity & support",
    type: "activity",
  },
] as const;

function JourneyPanel({ stage }: { stage: (typeof journeyStages)[number] }) {
  return (
    <div className="border border-[#aaa] bg-[#f5f4f3] p-5 sm:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c74716]">Flashfire workflow</p>
      <h3 className="mt-4 text-lg font-bold text-[#242424] sm:text-xl">{stage.panelTitle}</h3>

      {stage.type === "profile" && (
        <div className="mt-5 grid gap-x-4 gap-y-4 sm:grid-cols-2">
          {[
            ["Target roles", "Defined from your career goals"],
            ["Locations / work mode", "Set to your preferences"],
            ["Experience", "Based on your work history"],
            ["Visa / sponsorship requirements", "Discussed during intake"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-2 text-xs text-[#626262]">{label}</p>
              <div className="min-h-11 border border-[#c9c9c9] bg-white px-3 py-3 text-sm text-[#333]">{value}</div>
            </div>
          ))}
          <p className="text-[11px] leading-5 text-[#626262] sm:col-span-2">Preferences and eligibility are confirmed during intake.</p>
        </div>
      )}

      {stage.type === "tailoring" && (
        <>
          <p className="mt-3 text-xs text-[#626262]">Role requirements guide resume tailoring to your actual background.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="border border-[#c9c9c9] bg-white p-4">
              <p className="text-sm font-bold text-[#222]">Relevant experience</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-[#5a524d]">
                <li>Skills aligned to the role requirements</li>
                <li>Relevant achievements brought forward</li>
                <li>Experience remains grounded in your history</li>
              </ul>
            </div>
            <div className="border border-[#c9c9c9] bg-white p-4">
              <p className="text-sm font-bold text-[#222]">Resume alignment</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-[#5a524d]">
                <li>Role-specific resume draft</li>
                <li>Relevant qualifications made easy to find</li>
                <li>No invented experience or credentials</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-5 text-[#626262]">AI-assisted drafts; human review where included in your plan.</p>
        </>
      )}

      {stage.type === "application" && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ["Job title", "Role from the reviewed opportunity"],
            ["Company", "Employer from the job listing"],
            ["Status", "Updated as the application progresses"],
            ["Resume version", "Tailored to the opportunity"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-2 text-xs text-[#626262]">{label}</p>
              <div className="min-h-11 border border-[#c9c9c9] bg-white px-3 py-3 text-sm text-[#333]">{value}</div>
            </div>
          ))}
          <p className="text-[11px] leading-5 text-[#626262] sm:col-span-2">Submission and review steps depend on the confirmed plan scope.</p>
        </div>
      )}

      {stage.type === "activity" && (
        <div className="mt-5 space-y-3">
          {[
            ["Matched", "Relevant opportunity identified"],
            ["Resume prepared", "Role-aligned version ready for review"],
            ["Application update", "Status and support activity recorded"],
          ].map(([label, detail]) => (
            <div key={label} className="flex items-center gap-3 border border-[#c9c9c9] bg-white p-3">
              <span className="h-3 w-3 shrink-0 rounded-full border border-[#f55d1d]" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-xs font-semibold text-[#333]">{label} <span className="font-normal text-[#6a625e]">→ {detail}</span></p>
            </div>
          ))}
          <p className="text-[11px] leading-5 text-[#626262]">Activity is recorded as work progresses; updates follow your service scope.</p>
        </div>
      )}
    </div>
  );
}

function JourneyStageCopy({ stage, index }: { stage: (typeof journeyStages)[number]; index: number }) {
  return (
    <div className="flex flex-col justify-center py-4 lg:px-4">
      <div className="mb-7 flex items-center gap-3 text-[#666]" aria-hidden="true">
        <span className="flex h-11 items-center border border-[#aaa] bg-[#f4f1ef] px-3 text-xs">{stage.marker}</span>
        <span className="h-px flex-1 bg-[#bdbdbd]" />
        <span className="text-xl text-[#c74716]">↓</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wide text-[#c74716]">Stage {String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-3 text-xl font-bold text-[#242424] sm:text-2xl">{stage.title}</h3>
      <p className="mt-5 max-w-md text-sm leading-6 text-[#5a524d] sm:text-base">{stage.copy}</p>
    </div>
  );
}

export function HomeDraftJourney() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className={shell}>
        <SectionHeading
          eyebrowText="How Flashfire works"
          title="From your career goals to a more focused job search."
          description="One connected process — preferences guide the search, and each application leaves a record you can follow."
        />
        <div>
          {journeyStages.map((stage, index) => {
            const text = <JourneyStageCopy key={`${stage.type}-copy`} stage={stage} index={index} />;
            const panel = <JourneyPanel key={`${stage.type}-panel`} stage={stage} />;
            return (
              <div key={stage.title}>
                <article className="grid items-center gap-6 py-7 lg:grid-cols-2 lg:gap-10">
                  {index % 2 === 0 ? <>{text}{panel}</> : <>{panel}{text}</>}
                </article>
                {index < journeyStages.length - 1 && (
                  <div className="flex flex-col items-center border-b border-[#d0d0d0] pb-3 text-[#c74716]" aria-hidden="true">
                    <span className="h-7 w-px bg-[#c9a397]" />
                    <span className="-mt-1 text-xl">↓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeDraftDashboard() {
  return (
    <section className="bg-[#f7f5f3] py-16 sm:py-20">
      <div className={shell}>
        <SectionHeading
          eyebrowText="Application tracking"
          title="Know where your applications go."
          description="A centralized dashboard tracks the roles you apply to, their status and the resume version used."
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid border border-[#d8d2cd] bg-white sm:grid-cols-[150px_minmax(0,1fr)]">
            <aside className="hidden border-r border-[#e8e3df] bg-[#faf8f6] p-5 sm:block">
              <p className="font-bold text-[#f55d1d]">Flashfire</p>
              <ul className="mt-7 space-y-4 text-xs text-[#5a524d]">
                <li className="font-semibold text-[#222]">Overview</li>
                <li>Applications</li><li>Resumes</li><li>Preferences</li>
              </ul>
            </aside>
            <div className="p-5 sm:p-6">
              <p className={eyebrow}>Your job search</p>
              <h3 className="mt-2 text-xl font-bold text-[#222]">Every application, in one place</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Company and role", "See which opportunity each application is for."],
                  ["Application status", "Follow progress from preparation through submission."],
                  ["Resume version", "Know which tailored resume was used for each role."],
                ].map(([title, copy]) => (
                  <article key={title} className="border border-[#e8e3df] bg-[#fffaf7] p-4">
                    <h4 className="text-sm font-bold text-[#222]">{title}</h4>
                    <p className="mt-2 text-xs leading-5 text-[#5a524d]">{copy}</p>
                  </article>
                ))}
              </div>
              <a href="/how-it-works" className="mt-5 inline-flex text-sm font-bold text-[#f55d1d] underline underline-offset-4">
                Explore how it works
              </a>
            </div>
          </div>
          <aside className="border border-[#e8e3df] bg-white p-5 sm:p-6">
            <h3 className="text-xl font-bold leading-tight text-[#171717]">After payment, not a black box.</h3>
            <p className="mt-3 text-sm leading-6 text-[#5a524d]">
              Confirm your goals and plan scope, then follow the work and application updates included in your service.
            </p>
            <div className="mt-5 border-t border-[#e8e3df] pt-4">
              <p className="text-sm font-bold text-[#222]">WhatsApp updates and support</p>
              <p className="mt-2 text-xs leading-5 text-[#706862]">
                Support channel and response times depend on your plan.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
const draftFaqs = [
  ["How does Flashfire select relevant jobs?", "We use the target roles, locations, experience and requirements you share to guide job matching. The agreed service scope determines which opportunities are reviewed and submitted."],
  ["Can I choose my target roles and locations?", "Yes. Your preferences are gathered during intake and guide the search. You can discuss changes with the team during your service."],
  ["How are visa and sponsorship requirements handled?", "Share any work authorization or sponsorship requirements during intake so they can be considered when suitable roles are reviewed."],
  ["How does AI-assisted resume tailoring and human review work?", "AI assists matching and resume drafts using your actual experience. Human review is included where stated in your confirmed plan."],
  ["Can I see where my applications have been submitted?", "Application records and progress updates are provided according to your plan, including status and resume-version information where available."],
  ["Are interviews or job offers guaranteed?", "No. Results depend on many factors, and interviews or offers are not guaranteed."],
  ["What support and interview preparation are included?", "Support channels and interview preparation vary by plan. Review the specific inclusions before purchasing."],
  ["What happens after I pay?", "The team confirms your goals and purchased scope, then begins the agreed search and application workflow. Updates follow the communication plan for your service."],
];

export function HomeDraftFAQ() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.7fr_1.3fr]`}>
        <div>
          <p className={eyebrow}>10 / FAQs / resolve decision questions</p>
          <h2 className="mt-3 text-3xl font-bold text-[#171717] sm:text-4xl">Questions before you start?</h2>
          <p className="mt-3 text-sm leading-6 text-[#5a524d]">Review the service scope and support details before choosing a plan.</p>
        </div>
        <div className="divide-y divide-[#e5e0dc] border-y border-[#e5e0dc]">
          {draftFaqs.map(([question, answer]) => (
            <details key={question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#222] marker:hidden sm:text-base">
                {question}
                <span aria-hidden="true" className="text-xl font-normal text-[#f55d1d] group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pt-3 text-sm leading-6 text-[#5a524d]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeDraftFinalCTA() {
  return (
    <section className="bg-[#f7e6df] py-14 sm:py-16">
      <div className={`${shell} flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="max-w-2xl">
          <p className={eyebrow}>11 / Final CTA / decision</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#171717] sm:text-4xl">Make your next job search more focused.</h2>
          <p className="mt-3 text-sm leading-6 text-[#5a524d]">Start with your goals, understand the service scope and choose support with visibility into the work.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/Get-Started" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#ff4c00] px-5 text-sm font-bold text-white shadow-[0_4px_0_#171717] transition hover:bg-[#e94708]">Get started</Link>
          <Link href="/pricing" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#171717] bg-white px-5 text-sm font-bold text-[#171717] transition hover:bg-[#fff8f4]">View pricing</Link>
        </div>
      </div>
    </section>
  );
}
