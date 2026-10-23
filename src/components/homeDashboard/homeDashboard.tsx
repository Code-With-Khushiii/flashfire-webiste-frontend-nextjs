const nav = ["Overview", "Applications", "Resumes", "Preferences", "Support"];
const rows = [
  { title: "Software Engineer", company: "Example Co.", status: "In review", resume: "Tailored v2", date: "Example" },
  { title: "Data Analyst", company: "Example Co.", status: "Prepared", resume: "Tailored v1", date: "Example" },
  { title: "Product Associate", company: "Example Co.", status: "Submitted", resume: "Tailored v3", date: "Example" },
];

export default function HomeDashboard() {
  return (
    <section className="w-full border-t border-[#111] bg-[#fbf3ee] px-5 py-20 font-['Space_Grotesk',sans-serif] md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-[34px] font-bold leading-[1.1] text-black md:text-[44px]">
          Know where your applications go.
        </h2>
        <p className="mt-4 max-w-[760px] text-[16px] text-[#545b65]">
          A desktop dashboard: your preferences, the work in progress and a
          record of submissions, all in one view.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-1 border border-[#111] bg-white md:grid-cols-[170px_1fr]">
            <aside className="hidden bg-[#f8f0eb] p-4 md:block">
              <p className="mb-6 text-[16px] font-bold text-[#111]">Flashfire</p>
              <ul className="space-y-4 text-[13px] text-[#111]">
                {nav.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-8 text-[11px] text-[#6b625d]">Example data, not live product data</p>
            </aside>

            <div className="p-5 md:p-6">
              <h3 className="text-[22px] font-bold text-[#111]">Your job search</h3>
              <p className="mt-1 text-[12px] text-[#6b625d]">Example data, not customer activity</p>

              <div className="mt-5 bg-[#fbf3ee] p-4 text-[13px] text-[#111]">
                <p className="font-bold">Target roles &amp; preferences</p>
                <p className="mt-2">Roles: Your target roles · Locations: Your locations</p>
                <p className="mt-1">Experience: Your level · Requirements: To confirm</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Matched", "In review", "Submitted"].map((label) => (
                  <div key={label} className="border border-[#111]/50 p-3">
                    <p className="text-[12px] text-[#6b625d]">{label}</p>
                    <p className="mt-2 text-[24px] font-bold text-[#111]">—</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#111] text-[11px] uppercase tracking-[0.04em] text-[#111]">
                      <th className="py-2 pr-2">Job / Company</th>
                      <th className="py-2 pr-2">Status</th>
                      <th className="py-2 pr-2">Resume</th>
                      <th className="py-2">Last activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.title} className="border-b border-[#111]/20 align-top">
                        <td className="py-3 pr-2">
                          <p className="font-bold text-[#111]">{row.title}</p>
                          <p className="text-[#6b625d]">{row.company}</p>
                        </td>
                        <td className="py-3 pr-2 text-[#111]">{row.status}</td>
                        <td className="py-3 pr-2 text-[#6b625d]">{row.resume}</td>
                        <td className="py-3 text-[#6b625d]">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 bg-[#fbf3ee] p-4 text-[13px] text-[#111]">
                <p className="font-bold">Recent activity</p>
                <p className="mt-2">Application or resume update</p>
                <p className="mt-1">Support touchpoint</p>
              </div>
            </div>
          </div>

          <aside>
            <h3 className="text-[26px] font-bold leading-[1.2] text-[#111]">
              After payment, not a black box.
            </h3>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#3a3a3a]">
              Confirm your goals and purchased scope, then see which roles are
              being worked on and where applications have been submitted.
            </p>
            <ol className="mt-6 space-y-4 border-t border-[#111]/30 pt-6 text-[14px] text-[#111]">
              <li>01 / Review job details and status</li>
              <li>02 / See the resume version used</li>
              <li>03 / Follow recent activity and updates</li>
            </ol>
            <div className="mt-6 border border-[#111] bg-white p-5">
              <p className="text-[16px] font-bold text-[#111]">WhatsApp updates / support</p>
              <p className="mt-2 text-[14px] text-[#111]">A WhatsApp group made just for you</p>
              <p className="mt-2 text-[12px] text-[#6b625d]">
                Response times and plan eligibility depend on your plan.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
