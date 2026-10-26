"use client";

import { useState } from "react";

const featuredCustomer = {
  name: "Anjali Shah",
  role: "Materials Planning Specialist 2",
  company: "Skyworks Solutions, Inc.",
  linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
  story:
    "From complete job search chaos to absolute clarity — Flashfire changed everything for me. I received interview calls from Skyworks Solutions in my first week.",
};

const customerQuotes = [
  {
    name: "Akrati",
    company: "Akamai Technologies",
    quote:
      "The platform's intelligent matching ensured I only applied to roles that fit my skills. I landed an interview at Akamai Technologies within 2 weeks.",
  },
  {
    name: "Aryan",
    company: "IBM",
    quote:
      "The detailed tracking system kept me organized throughout the process. My IBM offer was secured thanks to Flashfire's intelligent automation and attention to detail!",
  },
];

const video = {
  embedUrl: "https://www.youtube.com/embed/p9kzhLHjJuI?autoplay=1",
  thumbnail: "https://img.youtube.com/vi/p9kzhLHjJuI/maxresdefault.jpg",
  fallbackThumbnail: "/images/website_thumbnails-18.jpg",
  name: "Aryan Gupta",
  company: "IBM",
};

export default function HomeStories() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="stories" className="w-full border-t border-[#111] bg-white px-5 py-14 font-['Space_Grotesk',sans-serif] md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-[34px] font-bold leading-[1.1] text-black md:text-[44px]">
          Real people. Real job-search progress.
        </h2>
        <p className="mt-4 max-w-[820px] text-[16px] text-[#545b65]">
          Customer stories and feedback shared on Flashfire's website. Individual outcomes vary.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[600fr_648fr]">
          <article className="flex flex-col border border-[#111] p-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#111]">
              Featured customer
            </p>
            <h3 className="mt-3 text-[28px] font-medium leading-[1.25] text-[#111] md:text-[32px]">
              Interview calls from Skyworks Solutions in her first week.
            </h3>
            <blockquote className="mt-6 border-l-2 border-[#f55d1d] pl-4 text-[15px] leading-6 text-[#3a3a3a]">
              “{featuredCustomer.story}”
            </blockquote>
            <div className="mb-6 mt-8 space-y-3 border-t border-[#111]/30 pt-5 text-[14px] text-[#111]">
              <p>
                <span className="text-[#6b625d]">Customer:</span>{" "}
                <a href={featuredCustomer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                  {featuredCustomer.name}
                </a>
              </p>
              <p><span className="text-[#6b625d]">Role:</span> {featuredCustomer.role}</p>
              <p><span className="text-[#6b625d]">Company:</span> {featuredCustomer.company}</p>
            </div>
            <p className="mt-auto bg-[#fbf3ee] p-4 text-[12px] text-[#6b625d]">
              Individual outcomes vary; interviews and offers are not guaranteed.
            </p>
          </article>

          <div className="grid grid-cols-1 content-start gap-6 sm:grid-cols-2">
            {customerQuotes.map((customer) => (
              <article key={customer.name} className="border border-[#111]/60 bg-[#fbf3ee] p-5">
                <p className="text-[14px] font-bold text-[#111]">{customer.name} · {customer.company}</p>
                <blockquote className="mt-3 text-[14px] leading-[1.5] text-[#3a3a3a]">“{customer.quote}”</blockquote>
              </article>
            ))}

            <div className="border border-[#111]/60 bg-[#f8f0eb] p-5 sm:col-span-2">
              <p className="text-[14px] font-bold text-[#111]">Customer video</p>
              <div className="relative mt-3 aspect-video w-full overflow-hidden border border-[#111]/30 bg-[#ff4c00]">
                {playing ? (
                  <iframe
                    src={video.embedUrl}
                    title={`${video.name} video testimonial`}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${video.name} video testimonial`}
                    className="group absolute inset-0 h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt={`${video.name} from IBM in his Flashfire customer video`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        const image = event.currentTarget;
                        if (image.src !== new URL(video.fallbackThumbnail, window.location.href).href) {
                          image.src = video.fallbackThumbnail;
                        }
                      }}
                    />
                    <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white text-[18px] transition group-hover:scale-105" aria-hidden="true">▶</span>
                  </button>
                )}
              </div>
              <p className="mt-3 text-[12px] text-[#6b625d]">{video.name} · {video.company}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
