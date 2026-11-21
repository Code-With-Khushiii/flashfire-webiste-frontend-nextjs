"use client"

export default function BeforeAfterComparison() {
  const rows = [
    {
      topic: "Finding the right jobs",
      alone: "You scroll through listings for hours, and filters only get you so far.",
      flashfire: "We match roles to what you told us you want, and an expert looks over every application.",
    },
    {
      topic: "Your resume",
      alone: "One resume goes to every job, and ATS systems often skip right past it.",
      flashfire: "A fresh, recruiter-ready resume for each role, so the right keywords show up.",
    },
    {
      topic: "How you apply",
      alone: "Lots of applications sent fast, with little thought about whether you fit.",
      flashfire: "We apply to 1,200+ carefully chosen jobs that fit your skills and where you want to go.",
    },
    {
      topic: "Your time",
      alone: "Evenings and weekends go to searching, filling forms and applying again.",
      flashfire: "You get that time back to prepare for interviews and just live your life.",
    },
    {
      topic: "Knowing what's happening",
      alone: "A messy spreadsheet, and no clear idea what actually went out.",
      flashfire: "See every application and its progress as it happens. No guessing.",
    },
    {
      topic: "Getting interviews",
      alone: "Replies are slow and hard to predict, which can wear you down.",
      flashfire: "A focused strategy helps you reach more interview calls, sooner.",
    },
  ]

  return (
    <section
      className="py-12 md:py-16 lg:py-20 bg-[#fffefd]"
      style={{ fontFamily: "Satoshi, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Heading */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-start mb-8 md:mb-12">
          <h2 className="font-bold tracking-[-0.03em] leading-[110%] text-[#02060A] text-[1.75rem] min-[769px]:text-[2.4rem] min-[1025px]:text-[50.84px]">
            Why Flashfire is a{" "}
            <span className="bg-gradient-to-r from-[#d84a22] via-[#f05a23] to-[#ff7a2a] bg-clip-text text-transparent">
              smarter way
            </span>{" "}
            to find your next job
          </h2>

          <p className="md:pt-2 text-[15px] md:text-[20px] font-medium text-[#02060A] tracking-[-0.02em] md:tracking-[-0.03em] leading-[145%] md:leading-[139%]">
            Sending more applications isn't the same as sending better ones. We
            pair <span className="text-[#080b10]">expert guidance with smart technology</span>{" "}
            so your effort goes toward roles that fit, with a resume that fits
            too, and a clear view of how it's all going. The result is{" "}
            <span className="text-[#ff5a1f]">more interviews, sooner.</span>
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border-[6px] border-[#fcf9f7] bg-[#fcf9f7]">
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-[6px]">
            <div className="px-6 py-5 text-sm font-medium text-[#545b65] bg-white">
              What matters
            </div>
            <div className="px-6 py-5 text-lg font-bold text-[#24272d] bg-white">
              Going it alone
            </div>
            <div className="px-6 py-5 text-lg font-bold text-white bg-[#ff5a1f]">
              With Flashfire
            </div>
          </div>

          {rows.map((row) => (
            <div key={row.topic} className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-[6px] mt-[6px]">
              <div className="px-6 py-5 text-sm font-medium text-[#080b10] bg-white">{row.topic}</div>
              <div className="px-6 py-5 text-sm font-medium text-[#545b65] leading-relaxed bg-white">{row.alone}</div>
              <div className="px-6 py-5 text-sm font-medium text-[#24272d] leading-relaxed bg-[#fffaf7]">{row.flashfire}</div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.topic} className="border-[6px] border-[#fcf9f7] bg-[#fcf9f7]">
              <h3 className="px-4 py-3 text-base font-bold text-[#080b10] bg-white">{row.topic}</h3>
              <div className="mt-[6px] px-4 py-3 text-sm font-medium text-[#545b65] bg-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8a817a] mb-1">
                  Going it alone
                </p>
                {row.alone}
              </div>
              <div className="mt-[6px] px-4 py-3 text-sm font-medium text-[#24272d] bg-[#fffaf7]">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#ff5a1f] mb-1">
                  With Flashfire
                </p>
                {row.flashfire}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="text-center mt-10 md:mt-16">
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#080b10]">
            Stop applying blindly.{" "}
            <span className="text-[#ff5a1f]">Start getting interviews on purpose.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
