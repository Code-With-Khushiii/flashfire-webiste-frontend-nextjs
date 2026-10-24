import Image from "next/image";

const offers = [
  { name: "Sejal", company: "Vanguard", image: "/images/sejal-offer.png" },
  { name: "Riya", company: "Southwest Airlines", image: "/images/riya-offer.png" },
  { name: "Param", company: "Marqeta", image: "/images/Param-offer.png" },
  { name: "Naman", company: "Amplitude", image: "/images/naman offer.png" },
];

const companies = ["Vanguard", "Southwest Airlines", "IQVIA", "Marqeta", "Amplitude"];
const stagger = ["md:mt-0", "md:mt-10", "md:mt-3", "md:mt-14"];

export default function HomeOfferWall() {
  return (
    <section className="w-full border-t border-[#111] bg-white px-5 py-14 font-['Space_Grotesk',sans-serif] md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-[34px] font-bold leading-[1.1] text-black md:text-[44px]">
          60+ offer letters. Real career moves.
        </h2>
        <p className="mt-4 text-[16px] text-[#545b65]">
          Offer letters received by Flashfire customers, shared with permission.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {offers.map((offer, i) => (
            <div
              key={offer.company}
              className={`border border-[#111] bg-white p-5 ${stagger[i]}`}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#111]">
                Offer letter
              </p>
              <div className="relative mt-4 aspect-[1100/1236] w-full overflow-hidden border border-[#111]/20 bg-white">
                <Image
                  src={offer.image}
                  alt={`${offer.name} offer letter from ${offer.company}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 90vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-[14px] font-semibold text-[#111]">
                {offer.name} · {offer.company}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[#545b65]">
          <span>Names and offer letters are shared with customer permission.</span>
          <a href="#testimonials" className="font-bold text-black underline">
            Explore customer outcomes
          </a>
        </div>

        <p className="mt-8 text-[12px] text-[#6b625d]">
          Companies where Flashfire customers received offers
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company}
              className="border border-[#111]/40 bg-white px-3 py-3 text-center text-[13px] text-[#111]"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
