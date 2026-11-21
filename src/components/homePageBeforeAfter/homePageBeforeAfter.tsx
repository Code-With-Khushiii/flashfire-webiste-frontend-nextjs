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

        {/* Table (all screen sizes) */}
        <div className="border-[4px] border-[#fcf9f7] bg-[#fcf9f7] md:border-[6px]">
          <div className="grid grid-cols-[0.8fr_1.1fr_1.1fr] gap-[3px] md:grid-cols-[1fr_1.5fr_1.5fr] md:gap-[6px]">
            <div className="bg-white px-2 py-3 text-[10px] font-medium text-[#545b65] md:px-6 md:py-5 md:text-sm">
              What matters
            </div>
            <div className="bg-white px-2 py-3 text-[12px] font-bold leading-tight text-[#24272d] md:px-6 md:py-5 md:text-lg">
              Going it alone
            </div>
            <div className="bg-[#ff5a1f] px-2 py-3 text-[12px] font-bold leading-tight text-white md:px-6 md:py-5 md:text-lg">
              With Flashfire
            </div>
          </div>

          {rows.map((row) => (
            <div
              key={row.topic}
              className="mt-[3px] grid grid-cols-[0.8fr_1.1fr_1.1fr] gap-[3px] md:mt-[6px] md:grid-cols-[1fr_1.5fr_1.5fr] md:gap-[6px]"
            >
              <div className="bg-white px-2 py-3 text-[11px] font-bold leading-snug text-[#080b10] md:px-6 md:py-5 md:text-sm md:font-medium">
                {row.topic}
              </div>
              <div className="bg-white px-2 py-3 text-[11px] font-medium leading-[1.45] text-[#545b65] md:px-6 md:py-5 md:text-sm md:leading-relaxed">
                {row.alone}
              </div>
              <div className="bg-[#fffaf7] px-2 py-3 text-[11px] font-medium leading-[1.45] text-[#24272d] md:px-6 md:py-5 md:text-sm md:leading-relaxed">
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
