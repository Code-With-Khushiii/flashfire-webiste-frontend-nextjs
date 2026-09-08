"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { FaPlus, FaTimes } from "react-icons/fa";
import { stripLocalePrefix, localizeHref } from "@/src/utils/locale";

export default function AboutUs() {
  const router = useRouter();
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  // Scroll to top when navigating to about-us page (same pattern as pricing page)
  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, []);

  return (
    <div className="bg-[#faf8f5] min-h-screen font-['Space_Grotesk',sans-serif] relative overflow-hidden text-[#141414]">
      {/* === HERO === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {["LAND INTERVIEW IN 1 WEEK", "50 USERS LANDED JOB"].map((badge, idx) => (
              <span
                key={idx}
                className="border-b-2 border-[#ff4c00] pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#141414]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[#141414]">
            <span className="text-[#ff4c00]">
              AI Job Application Service
            </span>{" "}
            That Automates Job Search & Lands Interviews Faster
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg leading-relaxed max-w-2xl text-[#141414]/70">
            Flashfire is an AI job search platform built for job seekers who want to automate job applications, improve ATS visibility, and land more interviews without manual effort.
          </p>

          {/* CTA */}
          <button
            {...getButtonProps()}
            className="mt-10 inline-flex items-center gap-3 border border-[#ff4c00] bg-[#ff4c00] px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:bg-[#141414] hover:border-[#141414]"
      
      onClick={() => {
        const utmSource = typeof window !== "undefined"
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
        const utmMedium = typeof window !== "undefined"
          ? localStorage.getItem("utm_medium") || "About_Us_Page"
          : "About_Us_Page";
      
        try {
          GTagUTM({
            eventName: "sign_up_click",
            label: "About_Us_Get_Me_Interview_Button",
            utmParams: {
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign: typeof window !== "undefined"
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
            },
          });
        } catch (gtagError) {
          console.warn('GTagUTM error:', gtagError);
        }
      
        try {
          trackButtonClick("Get Me Interview", "about_us_cta", "cta", {
            button_location: "about_us_hero_section",
            section: "about_us_hero"
          });
          trackSignupIntent("about_us_cta", {
            signup_source: "about_us_hero_button",
            funnel_stage: "signup_intent"
          });
        } catch (trackError) {
          console.warn('Tracking error:', trackError);
        }
      
        const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
        const normalizedPath = currentPath.split('?')[0];
        const isAboutUsPage = stripLocalePrefix(normalizedPath) === '/about-us';
        const isAlreadyOnGetMeInterview = stripLocalePrefix(normalizedPath) === '/get-me-interview';
      
        if (isAlreadyOnGetMeInterview) {
          const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
          }
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            requestAnimationFrame(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              setTimeout(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              }, 50);
            });
          });
          return;
        }
      
        if (isAboutUsPage) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('previousPageBeforeGetMeInterview', normalizedPath);
          }
          const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
          }
          const targetPath = localizeHref('/get-me-interview', normalizedPath);
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', targetPath);
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
          }
          router.replace(targetPath);
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            requestAnimationFrame(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              setTimeout(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              }, 50);
            });
          });
          return;
        }
      
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        }
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
        }
        const targetPath = '/get-me-interview';
        router.push(targetPath);
      }}
    >
      Get Me Interview
    </button>

  </div>
</section>

      {/* === OUR FOUNDERS SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Our Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-black/10 md:grid-cols-2">
            {/* Pranjal Tripathi Card */}
            <div className="group border-b border-r border-black/10">
              <div className="overflow-hidden bg-[#f0ebe5]">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/pranjal_cto.png"
                  alt="Pranjal Tripathi"
                  width={400}
                  height={400}
                  className="h-96 w-full object-cover object-top"
                  priority
                  unoptimized
                />
              </div>
              <div className="border-t border-black/10 p-8">
                <h3 className="text-xl font-bold text-[#141414]">Pranjal Tripathi</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff4c00]">CTO, Flashfire</p>
                <p className="mt-5 text-lg font-medium italic leading-relaxed text-[#141414]/70">
                  "Every line of code we write is to help someone hear back finally"
                </p>
              </div>
            </div>

            {/* Adit Jain Card */}
            <div className="group border-b border-r border-black/10">
              <div className="overflow-hidden bg-[#f0ebe5]">
                <Image
                  src="/images/adit-jain-2.png"
                  alt="Adit Jain"
                  width={400}
                  height={400}
                  className="h-96 w-full object-cover object-top"
                  priority
                  unoptimized
                />
              </div>
              <div className="border-t border-black/10 p-8">
                <h3 className="text-xl font-bold text-[#141414]">Adit Jain</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff4c00]">Partner, Flashfire</p>
                <p className="mt-5 text-lg font-medium italic leading-relaxed text-[#141414]/70">
                  "I've seen brilliant people lose hope. Flashfire exists so they don't have to."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === THE STORY SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              The Story
            </h2>
          </div>

          <div className="mb-8 flex justify-center">
            <Image
              src="/images/character.png"
              alt="Flashfire Character"
              width={320}
              height={320}
              className="h-40 w-40 object-contain"
              priority
              unoptimized
            />
          </div>

          <p className="text-xl font-semibold text-[#141414]">
            To Every Job Seeker Who&apos;s Ready to Move Forward,
          </p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#141414]/80">
            <p>
              I know how exhausting the job search can be. You keep sending out applications, waiting for replies, and start to wonder if it&apos;s you. Especially in the U.S., where hundreds apply for the same role, even the most talented people begin to lose hope.
            </p>
            <p>
              Flashfire was born from that same feeling. I watched my sister, smart, capable, and hardworking, apply to hundreds of roles and still get no response. It wasn&apos;t her fault. The system had stopped seeing people for who they are.
            </p>
            <blockquote className="border-l-2 border-[#ff4c00] py-2 pl-6 text-xl font-semibold italic text-[#ff4c00]">
              The problem was never the people. It was the process.
            </blockquote>
            <p>
              That&apos;s when Pranjal joined. He&apos;d been through the same struggle, brilliant, qualified, but invisible to the system. We realized the failures weren&apos;t about talent or effort. They were about a process that had stopped working for people.
            </p>
            <p>
              Together, we started building Flashfire with belief, empathy, and persistence. What began as a way to help one person is now helping hundreds find their &apos;yes.&apos;
            </p>
          </div>
        </div>
      </section>

      {/* === OUR MISSION & VISION SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="divide-y divide-black/10 border-y border-black/10">
            <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12">
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#141414]">Our Mission</h3>
              <p className="text-lg leading-relaxed text-[#141414]/70">
                To help job seekers land more interviews by automating applications and optimizing visibility using AI.
              </p>
            </div>
            <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12">
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#141414]">Our Vision</h3>
              <p className="text-lg leading-relaxed text-[#141414]/70">
                To become the world&apos;s fastest and most intelligent job application engine, enabling anyone to apply to over 1,200 targeted roles and land interviews ten times faster all without wasting time or effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === HOW FLASHFIRE WORKS FOR YOU SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              How Our AI Job Application Service Automates Your Job Search
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-lg text-[#141414]/70">
            Flashfire's AI job application service automates job discovery, resume optimization, and application submission to help job seekers get noticed and land interviews faster.
          </p>

          <div className="border-t border-black/10">
            {[
              "AI-Powered Matching",
              "LinkedIn Profile Optimization",
              "Lightning Fast Applications",
              "Dynamic Resume Optimization",
              "Precision Targeting",
              "Dashboard & Analytics"
            ].map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-6 border-b border-black/10 py-6 transition-colors duration-200 hover:bg-white"
              >
                <span className="text-sm font-bold tabular-nums text-[#ff4c00]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg sm:text-xl font-semibold text-[#141414]">{feature}</p>
                <span className="ml-auto text-[#ff4c00] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHO IS THIS FOR SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Who Is This For?
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-lg text-[#141414]/70">
            Flashfire's AI job application service is built for job seekers who want to stop wasting time, automate applications, and finally start getting interview responses.
          </p>

          <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {[
              {
                title: "Active Job Seekers Applying at Scale",
                desc: "If you're applying to dozens of roles every week and still hearing nothing back, Flashfire helps you apply faster, smarter, and at scale without burning out."
              },
              {
                title: "Professionals Targeting US & Canadian Roles",
                desc: "Flashfire is optimized for North American hiring systems, ATS rules, and recruiter expectations, so your applications actually get seen."
              },
              {
                title: "Candidates Tired of Manual Applications",
                desc: "No more copying resumes, rewriting the same answers, or filling out endless forms. Flashfire automates the busywork so you can focus on interviews."
              },
              {
                title: "Job Seekers Struggling with ATS Visibility",
                desc: "If your resume never seems to pass automated systems, Flashfire uses AI-driven optimization to improve keyword alignment and visibility."
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="group bg-[#faf8f5] p-8 transition-colors duration-300 hover:bg-white"
              >
                <h3 className="mb-3 text-xl font-bold text-[#141414] transition-colors duration-300 group-hover:text-[#ff4c00]">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-[#141414]/70">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Emphasis Line */}
          <div className="mt-12 border border-[#ff4c00] bg-[#ff4c00] px-8 py-6">
            <p className="text-lg font-bold text-white">
              If you're qualified, motivated, and serious about landing interviews, Flashfire is built for you.
            </p>
          </div>
        </div>
      </section>

      {/* === THE FLASHFIRE STORY TIMELINE SECTION === */}
      <section className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase">
              The Flashfire Story
            </h2>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-4 text-[#141414]/70">
              <p className="leading-relaxed">
                Flashfire is an AI job search platform designed to solve modern hiring challenges by automating job applications and improving candidate visibility across ATS-driven hiring systems.
              </p>
              <p className="leading-relaxed">
                Flashfire began in April 2024 with a simple insight: most candidates lose opportunities before they&apos;re even seen. Built to match the speed and precision of modern hiring, Flashfire helps candidates apply at scale across U.S. and Canadian job markets with ATS-optimized applications.
              </p>
            </div>
            <Image
              src="/images/flashfire-logo.png"
              alt="Flashfire Logo"
              width={200}
              height={200}
              className="h-24 w-24 flex-shrink-0 object-contain opacity-80 lg:h-32 lg:w-32"
              priority
              unoptimized
            />
          </div>

          <div className="mt-14 border-t border-black/10">
            {[
              { date: "April 2024", label: "Founded", desc: "Flashfire was officially founded with a mission to simplify the job application process and remove inefficiencies from large-scale job searching." },
              { date: "May-June 2024", label: "Platform Development", desc: "Core workflows were built to automate job discovery, resume alignment, and application submission while maintaining human oversight for relevance and accuracy." },
              { date: "July-Aug 2024", label: "Early Validation", desc: "Flashfire onboarded early users and validated its system by helping candidates apply to 400-1,200+ relevant job opportunities, significantly reducing manual effort and application fatigue." },
              { date: "Sept-Dec 2024", label: "Helping 500+ Candidates", desc: "By the end of 2024, Flashfire had helped over 500+ candidates streamline their job search, refine their application strategy, and apply to roles more efficiently." },
              { date: "Jan-Feb 2025", label: "USA & Canada Expansion", desc: "Flashfire expanded its services across the United States and Canada, operating with timezone-agnostic execution aligned with North American hiring cycles and ATS systems." },
              { date: "Mar 2025-Present", label: "Scaling with focus", desc: "Today, Flashfire continues to support candidates globally, with a strong focus on US and Canadian job applications, optimizing continuously for interview outcomes rather than vanity application counts." }
            ].map((item, idx) => (
              <div key={idx} className="grid gap-2 border-b border-black/10 py-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10">
                <div>
                  <div className="text-lg font-bold text-[#ff4c00]">{item.date}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#141414]/50">{item.label}</div>
                </div>
                <p className="leading-relaxed text-[#141414]/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ SECTION === */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="mb-10 text-lg text-[#141414]/70">
            Get answers about our AI job application service.
          </p>

          <div className="border-t border-black/10">
            {[
              {
                question: "What is an AI job application service?",
                answer: "An AI job application service uses artificial intelligence to automate job applications, optimize resumes for ATS systems, and help job seekers apply to relevant roles faster and more effectively."
              },
              {
                question: "How does job application automation work?",
                answer: "Job application automation uses AI to identify relevant roles, tailor resumes, and submit applications at scale, saving time while improving interview response rates."
              },
              {
                question: "Is Flashfire an AI job search platform for US jobs?",
                answer: "Yes. Flashfire is an AI job search platform focused on automating job applications for the US and Canadian job markets with ATS-optimized workflows."
              }
            ].map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div key={index} className="border-b border-black/10">
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-[#141414]">
                      {faq.question}
                    </h3>
                    <span className="flex-none text-[#ff4c00]">
                      {isOpen ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="pb-6 pr-10 leading-relaxed text-[#141414]/70">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === DEMO CTA SECTION === */}
      <HomePageDemoCTA />
    </div>
  );
}    



