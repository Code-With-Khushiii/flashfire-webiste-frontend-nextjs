"use client";

import { useState } from "react";

const featuredCustomer = {
  name: "Anjali Shah",
  company: "Skyworks Solutions, Inc.",
  linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
};

const video = {
  embedUrl: "https://www.youtube.com/embed/p9kzhLHjJuI?autoplay=1",
  thumbnail: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-18.jpg",
  name: "Aryan Gupta",
  company: "IBM",
};

export default function HomeStories() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="w-full border-t border-[#111] bg-white px-5 py-14 font-['Space_Grotesk',sans-serif] md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-[34px] font-bold leading-[1.1] text-black md:text-[44px]">
          Real people. Real job-search progress.
        </h2>
        <p className="mt-4 max-w-[820px] text-[16px] text-[#545b65]">
          Stories from Flashfire customers, shared with their permission.
          Individual outcomes vary.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[600fr_648fr]">
          {/* Featured story */}
          <div className="flex flex-col border border-[#111] p-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#111]">
              Featured story
            </p>
            <p className="mt-3 text-[14px] text-[#111]">Customer story</p>

            <p className="mt-6 text-[28px] font-medium leading-[1.25] text-[#111] md:text-[32px]">
              From job search to an offer at{" "}
              <span className="whitespace-nowrap">Skyworks Solutions.</span>
            </p>

            <div className="mb-8 mt-8 space-y-3 border-t border-[#111]/30 pt-5 text-[14px] text-[#111]">
              <p>
                <span className="text-[#6b625d]">Customer:</span>{" "}
                <a
                  href={featuredCustomer.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  {featuredCustomer.name}
                </a>
              </p>
              <p>
                <span className="text-[#6b625d]">Service:</span> Flashfire job-search support
              </p>
              <p>
                <span className="text-[#6b625d]">Now at:</span> {featuredCustomer.company}
              </p>
            </div>

            <div className="mt-auto bg-[#fbf3ee] p-4">
              <p className="text-[14px] font-bold text-[#111]">Outcome</p>
              <p className="mt-1 text-[14px] text-[#111]">
                Offer from {featuredCustomer.company}
              </p>
              <p className="mt-1 text-[12px] text-[#6b625d]">
                Individual outcomes vary; interviews and offers are not guaranteed.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 content-start gap-6 sm:grid-cols-2">
            <div className="border border-[#111]/60 bg-[#fbf3ee] p-5">
              <p className="text-[14px] font-bold text-[#111]">Customer reviews</p>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#3a3a3a]">
                Read what 1000+ job seekers say about working with Flashfire in
                the feedback section below.
              </p>
              <a href="#testimonials" className="mt-4 inline-block text-[14px] font-bold text-black underline">
                See customer feedback
              </a>
            </div>

            <div className="border border-[#111]/60 bg-[#fbf3ee] p-5">
              <p className="text-[14px] font-bold text-[#111]">Customer messages</p>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#3a3a3a]">
                Real conversations from the Flashfire job-search experience,
                shared with permission.
              </p>
              <a href="#testimonials" className="mt-4 inline-block text-[14px] font-bold text-black underline">
                See customer messages
              </a>
            </div>

            <div className="border border-[#111]/60 bg-[#f8f0eb] p-5 sm:col-span-2">
              <p className="text-[14px] font-bold text-[#111]">Video testimonial</p>
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
                      alt={`${video.name} video testimonial thumbnail`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                    <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white text-[18px] transition group-hover:scale-105">
                      ▶
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-3 text-[12px] text-[#6b625d]">
                {video.name} · {video.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
