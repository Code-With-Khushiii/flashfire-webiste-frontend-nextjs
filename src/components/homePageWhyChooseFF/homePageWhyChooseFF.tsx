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
        <table className="w-full table-fixed border border-[#111] border-collapse">
          <thead>
            <tr>
              <th className="w-[24%] bg-[#f8f0eb] p-2.5 text-left text-[0.7rem] font-semibold text-[#111] sm:w-[20%] sm:p-6 sm:text-[0.9rem]">
                What matters
              </th>
              <th className="w-[38%] bg-[#f8f0eb] p-2.5 text-left text-[0.75rem] font-semibold leading-tight text-[#111] sm:w-[40%] sm:p-6 sm:text-[1.15rem]">
                Applying alone / generic auto-apply
              </th>
              <th className="w-[38%] bg-[#111] p-2.5 text-left text-[0.75rem] font-semibold leading-tight text-white sm:w-[40%] sm:p-6 sm:text-[1.15rem]">
                With Flashfire
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label} className="border-t border-[#111]/60 align-top">
                <th className="break-words bg-[#fbf3ee] p-2.5 text-left text-[0.75rem] font-bold text-[#111] sm:p-6 sm:text-[1rem]">
                  {row.label}
                </th>
                <td className="break-words bg-[#fbf3ee] p-2.5 text-[0.72rem] leading-[1.45] text-[#5a524d] sm:p-6 sm:text-[1rem] sm:leading-[1.5]">
                  {row.alone}
                </td>
                <td className="break-words border-l border-[#111]/60 bg-white p-2.5 text-[0.72rem] leading-[1.45] text-[#111] sm:p-6 sm:text-[1rem] sm:leading-[1.5]">
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
