"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight, Check, Search, FileText, Send, ShieldCheck, Zap, Eye, Lock, Briefcase, Code2, Repeat, Battery } from "lucide-react";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { useEffect, useState } from "react";
import { localizeHref } from "@/src/utils/locale";


export default function RecentJobOpenings() {
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        },
    });
    const handleFaqToggle = (index: number) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
      };

    const pushCustomUrl = (path?: string) => {
        if (typeof window === "undefined" || !path) return;
        const normalized = localizeHref(path, window.location.pathname);
        window.history.pushState({}, "", normalized);
    };

    const handleCTAClick = (label: string, location: string, targetPath?: string) => {
        const getLocal = (key: string, fallback: string) =>
            typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

        const utmSource = getLocal("utm_source", "WEBSITE");
        const utmMedium = getLocal("utm_medium", "Recent_Job_Openings_Page");
        const utmCampaign = getLocal("utm_campaign", "Website");

        GTagUTM({
            eventName: "sign_up_click",
            label: `${location}_${label.replace(/\s+/g, "_")}`,
            utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: utmCampaign,
            },
        });

        trackButtonClick(label, `${location}_cta`, "cta", {
            button_location: location,
            section: "recent_job_openings",
        });

        trackSignupIntent(`${location}_cta`, {
            signup_source: location,
            funnel_stage: "signup_intent",
        });

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        pushCustomUrl(targetPath);
    };

    const dotGrid = {
        backgroundImage: "radial-gradient(circle, rgba(17,24,39,0.08) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
    };
    const topGlow = {
        background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,76,0,0.06) 0%, rgba(255,76,0,0) 70%)",
    };

    const appliedRoles = ["Data Analyst", "Software Engineer", "Product Manager", "Marketing Manager"];

    return (
        <div className="bg-white font-['Space_Grotesk',sans-serif] text-[#111827]">

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-black/5 bg-white pt-12 pb-16 md:pt-16 md:pb-24">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={topGlow} />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                        {/* LEFT: COPY */}
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                AI Job Search Assistant
                            </span>

                            <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
                                AI Job Search Assistant That Automates Job Applications for You
                            </h1>

                            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-[#384154] md:text-lg lg:mx-0">
                                FlashFire is an AI job search assistant and job application automation software that finds relevant roles, tailors your resume, and automatically submits applications to help you apply faster.
                            </p>

                            <div className="mt-8 flex justify-center lg:justify-start">
                                <button
                                    {...getButtonProps()}
                                    onClick={() => handleCTAClick("Get Started", "recent_jobs_hero", "/recent-job-openings/Get-started")}
                                    className="group inline-flex items-center gap-2 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black"
                                >
                                    Get Started
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: DASHBOARD PANEL */}
                        <div className="relative mx-auto w-full max-w-md">
                            <div className="absolute -inset-3 rounded-[32px] bg-[#fff0e9] rotate-3" />

                            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                {/* window header */}
                                <div className="flex items-center gap-2 border-b border-black/10 bg-[#fffaf7] px-4 py-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                                    <span className="ml-2 text-[11px] font-extrabold uppercase tracking-wide text-[#4b5565]">FlashFire</span>
                                </div>

                                <Image
                                    src="/images/heroResultImage.jpg"
                                    alt="FlashFire applying to jobs"
                                    width={420}
                                    height={520}
                                    className="aspect-[4/3] w-full object-cover object-top"
                                    priority
                                />

                                {/* applied rows */}
                                <div className="divide-y divide-black/10">
                                    {appliedRoles.map((role) => (
                                        <div key={role} className="flex items-center justify-between gap-3 px-4 py-3">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00]">
                                                    <Check className="h-4 w-4" strokeWidth={2.6} />
                                                </span>
                                                <span className="truncate text-sm font-black text-[#111827]">{role}</span>
                                            </div>
                                            <span className="flex-shrink-0 rounded-full bg-[#fff0e9] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                                Applied
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-[#fffaf7] py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#172031] mb-5">
                            How Our AI Job Application Automation Software Works
                        </h2>
                        <p className="text-base md:text-lg font-medium leading-7 text-[#677083]">
                            FlashFire automates your entire job search — from finding roles to submitting applications — without compromising quality.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            {
                                icon: Search,
                                title: "Finds relevant jobs",
                                desc: "FlashFire acts as an AI job finder that scans thousands of listings daily to match your skills, experience, and preferences.",
                            },
                            {
                                icon: FileText,
                                title: "Tailors your resume",
                                desc: "Our AI career assistant customizes every application with optimized keywords to improve ATS matching and recruiter visibility.",
                            },
                            {
                                icon: Send,
                                title: "Applies automatically",
                                desc: "Our job application automation software submits applications daily, helping you scale job searches without manual effort.",
                            },
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <article
                                key={title}
                                className="group relative flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                            >
                                <span className="absolute right-5 top-4 text-2xl font-black text-black/10 transition group-hover:text-[#ff4c00] sm:text-3xl">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                                </div>
                                <h3 className="mt-4 text-base font-black leading-tight text-[#111827] sm:text-xl">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm font-medium leading-6 text-[#4b5565]">
                                    {desc}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Users Section */}
            <section className="relative overflow-hidden bg-white py-16 md:py-24">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={topGlow} />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HEADER */}
                    <div className="max-w-2xl mx-auto text-center mb-14">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                            Target Users
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] mb-5">
                            Built for serious job seekers
                        </h2>
                        <p className="text-base md:text-lg font-medium leading-7 text-[#4b5565]">
                            FlashFire is designed for people who care about speed, accuracy, and real hiring results.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            {
                                icon: Briefcase,
                                title: "Active job seekers",
                                desc: "Candidates applying consistently and losing hours to repetitive workflows."
                            },
                            {
                                icon: Code2,
                                title: "Technology professionals",
                                desc: "Engineers and developers targeting high-quality roles efficiently."
                            },
                            {
                                icon: Repeat,
                                title: "Career switchers",
                                desc: "Professionals moving between domains needing ATS-optimized applications."
                            },
                            {
                                icon: Battery,
                                title: "Burned-out candidates",
                                desc: "Job seekers exhausted by slow, manual, and error-prone processes."
                            }
                        ].map(({ icon: Icon, title, desc }, idx) => (
                            <div
                                key={idx}
                                className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)] lg:p-7"
                            >
                                <div className="flex gap-5 items-start">
                                    {/* ICON */}
                                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                                        <Icon className="h-5 w-5" strokeWidth={2.4} />
                                    </span>

                                    {/* TEXT */}
                                    <div className="min-w-0">
                                        <h3 className="text-lg lg:text-xl font-black leading-tight text-[#111827] mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-sm lg:text-base font-medium leading-6 text-black/60">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Safety Section */}
            <section className="bg-[#fffaf7] py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: TEXT */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#111827] mb-6">
                                Built for trust, safety, and results
                            </h2>

                            <p className="text-base md:text-lg font-medium leading-7 text-[#4b5565] mb-10">
                                FlashFire works as a secure job search AI tool designed to automate applications without risking privacy or professionalism.
                            </p>

                            <div className="space-y-7">
                                {[
                                    {
                                        icon: ShieldCheck,
                                        title: "Safe & controlled applications",
                                        desc: "FlashFire only applies to roles aligned with your profile and preferences. You stay in full control.",
                                    },
                                    {
                                        icon: Eye,
                                        title: "Transparent tracking",
                                        desc: "See exactly where your applications are sent and track progress from one clean dashboard.",
                                    },
                                    {
                                        icon: Zap,
                                        title: "Built for speed & scale",
                                        desc: "Apply to significantly more roles without burnout or manual effort.",
                                    },
                                    {
                                        icon: Lock,
                                        title: "Privacy-first by design",
                                        desc: "Your data is encrypted and never shared beyond job applications.",
                                    },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="flex gap-5 group">
                                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#ff4c00] shadow-sm transition group-hover:bg-[#ff4c00] group-hover:text-white">
                                            <Icon className="h-5 w-5" strokeWidth={2.4} />
                                        </span>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-black text-[#111827] mb-1">
                                                {title}
                                            </h4>
                                            <p className="text-sm md:text-base font-medium leading-6 text-black/60">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: VISUAL */}
                        <div className="relative">
                            <div className="absolute -inset-3 rounded-[28px] bg-[#fff0e9] rotate-3" />
                            <div className="relative flex items-center justify-center rounded-2xl border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)] lg:p-12">
                                <Image
                                    src="/images/recentJobOpening.png"
                                    alt="Recent Job Openings"
                                    width={520}
                                    height={420}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Automation Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#111827] mb-6">
                                Why automation beats manual job applications
                            </h2>

                            <p className="text-base md:text-lg font-medium leading-7 text-[#4b5565] mb-10 max-w-xl">
                                Manual applications limit how many opportunities you can reach. FlashFire removes that limit — without compromising quality.
                            </p>

                            <div className="space-y-7">
                                {[
                                    {
                                        title: "Apply 10× faster",
                                        desc: "Reach more companies daily without increasing effort.",
                                    },
                                    {
                                        title: "ATS-optimized every time",
                                        desc: "Each application is tailored to pass automated filters.",
                                    },
                                    {
                                        title: "Consistent quality",
                                        desc: "No missed fields, no rushed mistakes, no burnout.",
                                    },
                                    {
                                        title: "Works while you sleep",
                                        desc: "FlashFire applies continuously in the background.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-5 group">
                                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                                            <Zap className="h-5 w-5" strokeWidth={2.4} />
                                        </span>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-black text-[#111827] mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm md:text-base font-medium leading-6 text-black/60">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT – DECISION CARD */}
                        <div className="relative">
                            <div className="absolute -top-6 -right-6 w-full h-full rounded-[28px] bg-[#ff4c00]/15" />
                            <div className="relative rounded-2xl border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)] lg:p-12">
                                <h3 className="text-xl font-black text-[#111827] mb-8">
                                    Manual vs AI-powered applications
                                </h3>

                                <div className="space-y-4 text-base font-medium text-[#4b5565] mb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Slow and repetitive</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Limited daily reach</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Inconsistent quality</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-black/10">
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-600 font-bold text-lg">✓</span>
                                        <span className="font-black text-[#111827]">
                                            AI-powered: Fast, scalable, ATS-ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-[#fffaf7] py-16 md:py-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4c00]/12 blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.35]" style={dotGrid} />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] mb-6">
                        Ready to stop applying manually?
                    </h2>

                    <p className="text-base md:text-xl font-medium leading-7 text-[#4b5565] mb-10">
                        Let FlashFire handle job applications while you focus on preparing for interviews.
                    </p>

                    <button
                        {...getButtonProps()}
                        onClick={() => handleCTAClick("Start with FlashFire", "recent_jobs_bottom", "/recent-job-openings/Start-with-Flashfire")}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                    >
                        Start with FlashFire
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`${faqStyles.faqSection} relative z-10 bg-[#f9e8e0] py-16`}>
            <div id="faq-header" className={faqStyles.header}>
                <h2>Frequently Asked Questions</h2>
                <p>
                Get answers about our AI job search assistant and job application automation.
                </p>
            </div>

            <div className={faqStyles.faqContainer}>
                {[
                {
                    question: "What is an AI job search assistant?",
                    answer:
                    "An AI job search assistant helps automate job discovery, resume optimization, and application submission to improve efficiency and interview opportunities.",
                },
                {
                    question: "How does job application automation software work?",
                    answer:
                    "Job application automation software scans listings, matches relevant roles, customizes applications, and submits them automatically based on your preferences.",
                },
                {
                    question: "Is FlashFire an AI career assistant?",
                    answer:
                    "Yes. FlashFire functions as an AI career assistant by helping you find jobs, optimize resumes, track applications, and prepare for interviews.",
                },
                ].map((faq, index) => (
                <div
                    key={index}
                    className={`${faqStyles.faqItem} ${
                    activeFaqIndex === index ? faqStyles.active : ""
                    }`}
                >
                    <button
                    className={faqStyles.faqQuestion}
                    onClick={() => handleFaqToggle(index)}
                    >
                    <span>{faq.question}</span>
                    <span className={faqStyles.icon}>
                        {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                    </span>
                    </button>

                    {activeFaqIndex === index && (
                    <div className={faqStyles.faqAnswer}>
                        <p>{faq.answer}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
            </section>
        </div>
    );
}
