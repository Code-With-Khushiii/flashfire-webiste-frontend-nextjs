"use client";


const comparisonRows = [
  {
    label: "Job relevance",
    alone: "Self-managed search; automated filters and targeting vary by tool.",
    flashfire: "Matching shaped by your target roles, pay and location preferences.",
  },
  {
    label: "Resume tailoring",
    alone: "You adapt each resume yourself, or rely on the tool's available options.",
    flashfire: "Resume aligned to relevant job descriptions and your actual experience.",
  },
  {
    label: "Human review",
    alone: "Self-review, external help or tool-specific review; availability varies.",
    flashfire: "AI assists the workflow, with human review where included in your service.",
  },
  {
    label: "Application visibility",
    alone: "Records may be self-managed; tracking and updates vary by tool.",
    flashfire: "A dashboard and WhatsApp updates make submitted work visible.",
  },
];

export default function HomePageWhyChooseFF() {
  return (
    <section
      id="feature"
      className="relative bg-white border-t border-[#111] py-20 px-8 text-center font-['Space_Grotesk',sans-serif] overflow-hidden max-[480px]:py-12 max-[480px]:px-5"
    >
      {/* === Header === */}
      <header className="mx-auto mb-10 grid w-full max-w-[80rem] grid-cols-2 items-end gap-12 text-left max-[900px]:grid-cols-1 max-[900px]:gap-4">
        <h2 className="font-['Satoshi',sans-serif] text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#02060A] max-[768px]:text-[1.9rem]">
          Why Flashfire Is a Smarter Job Matching Platform
        </h2>
        <p className="font-['Satoshi',sans-serif] text-[1.05rem] font-medium leading-[1.5] text-[#3a3a3a]">
          More applications are not the same as more relevant applications.
          Flashfire organizes matching, tailoring and tracking around your
          goals, rather than a random mass-application approach.
        </p>
      </header>

      {/* === Comparison table === */}
      <div className="mx-auto mb-4 w-full max-w-[80rem] overflow-x-auto text-left">
        <table className="w-full min-w-[640px] border border-[#111] border-collapse">
          <thead>
            <tr>
              <th className="w-[20%] bg-[#f8f0eb] p-6 text-[0.9rem] font-semibold text-[#111]">
                What matters
              </th>
              <th className="w-[40%] bg-[#f8f0eb] p-6 text-[1.15rem] font-semibold text-[#111]">
                Applying alone / generic auto-apply
              </th>
              <th className="w-[40%] bg-[#111] p-6 text-[1.15rem] font-semibold text-white">
                With Flashfire
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label} className="border-t border-[#111]/60 align-top">
                <th className="bg-[#fbf3ee] p-6 text-left text-[1rem] font-bold text-[#111]">
                  {row.label}
                </th>
                <td className="bg-[#fbf3ee] p-6 text-[1rem] leading-[1.5] text-[#5a524d]">
                  {row.alone}
                </td>
                <td className="border-l border-[#111]/60 bg-white p-6 text-[1rem] leading-[1.5] text-[#111]">
                  {row.flashfire}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto w-full max-w-[80rem] text-left text-[0.8rem] text-[#5a524d]">
        Descriptive comparison, not a claim about every tool. Confirm review
        scope and service inclusions before choosing a plan.
      </p>
    </section>
  );
}
