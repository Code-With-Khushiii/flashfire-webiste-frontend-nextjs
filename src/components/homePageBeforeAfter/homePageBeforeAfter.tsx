"use client"

export default function BeforeAfterComparison() {
  const rows = [
    {
      topic: "Job relevance",
      alone: "Self-managed search; automated filters and targeting vary by tool and effort.",
      flashfire: "Matching shaped by your target roles and location, with every application reviewed by an expert.",
    },
    {
      topic: "Resume quality",
      alone: "One generic resume sent to every role, often missing ATS keywords.",
      flashfire: "A recruiter-ready resume tailored for every role to improve ATS and recruiter visibility.",
    },
    {
      topic: "Application strategy",
      alone: "Random listings and mass applications with little focus on fit.",
      flashfire: "We apply to 1,200+ carefully selected jobs that match your skills and career goals.",
    },
    {
      topic: "Time and effort",
      alone: "Hours every week spent searching, filling forms and re-applying.",
      flashfire: "Spend less time applying and more time preparing for interviews.",
    },
    {
      topic: "Tracking and transparency",
      alone: "Scattered spreadsheets and no clear view of what was sent.",
      flashfire: "Monitor every application with real-time updates and transparent progress.",
    },
    {
      topic: "Interview opportunities",
      alone: "Slow, unpredictable response rates.",
      flashfire: "A smarter job search strategy helps you get interview calls faster.",
    },
  ]

  return (
    <section
      className="py-16 md:py-24 bg-[#f4f4f4]"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Heading */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-start mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Flashfire Is a Smarter Job Matching Platform
          </h2>

          <p className="md:pt-2 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            See how <span className="font-semibold">expert guidance and smart technology</span>{" "}
            help you land <span className="text-[#ff4c00] font-medium">more interviews, faster.</span>{" "}
            More applications are not the same as more relevant applications. Flashfire organizes
            matching, tailoring and tracking around your goals, rather than a random
            mass-application approach.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border border-gray-400 bg-white">
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr]">
            <div className="px-6 py-6 text-sm font-semibold text-gray-900 bg-gray-200">
              What matters
            </div>
            <div className="px-6 py-6 text-lg font-semibold text-gray-900 bg-gray-200">
              Applying alone / generic auto-apply
            </div>
            <div className="px-6 py-6 text-lg font-semibold text-white bg-gray-900 border-b-4 border-[#ff4c00]">
              With Flashfire
            </div>
          </div>

          {rows.map((row) => (
            <div key={row.topic} className="grid grid-cols-[1fr_1.5fr_1.5fr] border-t border-gray-300">
              <div className="px-6 py-6 text-sm font-bold text-gray-900">{row.topic}</div>
              <div className="px-6 py-6 text-sm text-gray-600 leading-relaxed bg-gray-50">{row.alone}</div>
              <div className="px-6 py-6 text-sm text-gray-900 leading-relaxed bg-white">{row.flashfire}</div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.topic} className="border border-gray-400 bg-white">
              <h3 className="px-4 py-3 text-base font-bold text-gray-900 bg-gray-200">{row.topic}</h3>
              <div className="px-4 py-3 text-sm text-gray-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                  Applying alone / generic auto-apply
                </p>
                {row.alone}
              </div>
              <div className="px-4 py-3 text-sm text-gray-900 border-t-4 border-[#ff4c00] bg-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#ff4c00] mb-1">
                  With Flashfire
                </p>
                {row.flashfire}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
            Stop applying blindly. Start getting interviews strategically.
          </p>
        </div>

      </div>
    </section>
  )
}
