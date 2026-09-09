"use client";

import {
    Award,
    DollarSign,
    Shield,
    ThumbsUpIcon,
    TrendingUp,
    UsersIcon,
    AlertTriangle,
    BarChart3,
    MessageCircle,
    Check,
    ArrowRight,
    Sparkles
} from "lucide-react";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { localizeHref } from "@/src/utils/locale";

export default function SalaryNegotiationUI() {
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        }
    });

    const pushCustomUrl = (path?: string) => {
        if (typeof window === "undefined" || !path) return;
        const normalized = localizeHref(path, window.location.pathname);
        window.history.pushState({}, "", normalized);
    };

    const handleCTAClick = (label: string, location: string, targetPath?: string) => {
        const getLocal = (key: string, fallback: string) =>
            typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

        const utmSource = getLocal("utm_source", "WEBSITE");
        const utmMedium = getLocal("utm_medium", "Offer_Salary_Page");
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
            section: "offer_and_salary",
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

    return (
        <div className="bg-white font-['Space_Grotesk',sans-serif] text-[#111827] overflow-x-hidden">

            {/* ====== HERO SECTION ====== */}
            <section className="relative overflow-hidden border-b border-black/5 bg-[#fffaf7] pt-10 pb-16 md:pt-16 md:pb-24">
                {/* backdrop: dotted strip up top, faded out, plus a soft orange glow */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    style={dotGrid}
                />
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-80"
                    style={{
                        background:
                            "radial-gradient(55% 100% at 50% 0%, rgba(255,76,0,0.09) 0%, rgba(255,76,0,0) 70%)",
                    }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

                <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00] sm:text-xs">
                        <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
                        Offer &amp; Salary Negotiation Advisor
                    </span>

                    <h1 className="mx-auto mt-6 max-w-3xl text-[2rem] font-black leading-[1.08] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                        Negotiate your job offer with{" "}
                        <span className="relative whitespace-nowrap text-[#ff4c00]">
                            confidence
                            <svg className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[#ff4c00]/25" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 3.49998 106.25 -3.50003 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-[#384154] md:text-lg">
                        FlashFire analyzes your offer, compares it with market data, and helps
                        you negotiate professionally — without awkward conversations.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Analyze My Offer", "offer_salary_hero", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black sm:w-auto"
                        >
                            Analyze My Offer
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ====== INSIGHT SECTION ====== */}
            <section className="py-14 md:py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
                            Most candidates don't negotiate — and lose money
                        </h2>
                        <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-7 text-[#4b5565] md:text-lg">
                            Salary negotiation isn't about being aggressive. It's about being informed,
                            prepared, and professional.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Offers are rarely final",
                                desc: "Most companies expect negotiation. Candidates who ask professionally often receive better compensation without risking the offer.",
                            },
                            {
                                icon: BarChart3,
                                title: "Market data changes everything",
                                desc: "Knowing how similar roles are paid gives you confidence and removes guesswork from the conversation.",
                            },
                            {
                                icon: MessageCircle,
                                title: "The right words matter",
                                desc: "How you ask is as important as what you ask. Clear, respectful language improves outcomes.",
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
                                <p className="mt-2 text-sm font-medium leading-6 text-[#4b5565] flex-grow">
                                    {desc}
                                </p>

                                <div className="mt-6 pt-5 border-t border-black/10">
                                    <span className="text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                        Key Insight
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== BENEFITS GRID ====== */}
            <section className="py-14 md:py-24 px-4 sm:px-6 bg-[#fffaf7]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                            Features
                        </span>
                        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#172031] sm:text-4xl md:text-5xl">
                            What You Get With FlashFire
                        </h2>
                        <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-5 text-[#677083]">
                            Actionable insights, negotiation scripts and confidence boosters that matter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Market Salary Insights",
                                desc: "Know where your offer stands in the real world with our market salary insights.",
                            },
                            {
                                icon: Shield,
                                title: "Confident Strategy",
                                desc: "Approach negotiations with clarity and calm with our confident strategy.",
                            },
                            {
                                icon: UsersIcon,
                                title: "Role-specific Scripts",
                                desc: "Negotiation messages tailored to your role with our role-specific scripts.",
                            },
                            {
                                icon: Award,
                                title: "Maximize Compensation",
                                desc: "Don't miss equity, bonuses, or perks with our maximize compensation strategy.",
                            },
                            {
                                icon: ThumbsUpIcon,
                                title: "Acceptance Probability",
                                desc: "Know how likely your counter-offer will be accepted with our acceptance probability analysis.",
                            },
                            {
                                icon: DollarSign,
                                title: "Total Compensation Breakdown",
                                desc: "Understand every dollar in your offer package with our total compensation breakdown.",
                            },
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <article
                                key={title}
                                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)] sm:p-7"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                                </span>
                                <h4 className="mt-4 text-lg font-black leading-tight text-[#111827] group-hover:text-[#ff4c00] transition-colors">
                                    {title}
                                </h4>
                                <p className="mt-2 text-sm font-medium leading-6 text-black/60">{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO SHOULD USE THIS STRATEGY ===== */}
            <section className="relative overflow-hidden bg-white py-14 md:py-24">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72"
                    style={{
                        background:
                            "radial-gradient(60% 100% at 50% 0%, rgba(255,76,0,0.06) 0%, rgba(255,76,0,0) 70%)",
                    }}
                />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: CONTENT */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                <Shield className="w-3.5 h-3.5" />
                                Salary Negotiation Strategy
                            </span>

                            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
                                Who Should Use This{" "}
                                <span className="text-[#ff4c00]">Strategy?</span>
                            </h2>

                            <p className="mt-6 text-base font-medium leading-7 text-[#4b5565] md:text-lg">
                                FlashFire's salary negotiation strategy is built for professionals who want
                                to negotiate confidently, avoid leaving money on the table, and secure
                                compensation that truly reflects their value — without sounding pushy or risky.
                            </p>

                            <p className="mt-4 text-sm font-medium leading-7 text-black/60 sm:text-base">
                                Whether you're negotiating base pay, bonuses, equity, or benefits, FlashFire
                                helps you approach the conversation with clarity, data, and confidence.
                            </p>

                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Get Started", "offer_salary_who_should", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                                className="group mt-8 inline-flex items-center gap-2 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black">
                                Get Started Now
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* RIGHT: USE CASES */}
                        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Candidates with a New Job Offer",
                                        desc: "Understand whether your offer is competitive and how to counter professionally."
                                    },
                                    {
                                        title: "Professionals Switching Roles or Industries",
                                        desc: "Navigate unfamiliar pay ranges and negotiate from a position of knowledge."
                                    },
                                    {
                                        title: "Candidates Unsure How to Negotiate Pay",
                                        desc: "Get step-by-step guidance and scripts that remove hesitation and anxiety."
                                    },
                                    {
                                        title: "Job Seekers Negotiating Bonuses, Equity, or Benefits",
                                        desc: "See the full compensation picture — not just base salary."
                                    },
                                ].map((item, index) => (
                                    <div key={item.title} className="flex gap-4 items-start group">
                                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                                            <Check className="h-5 w-5" strokeWidth={2.6} />
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="text-base font-black leading-tight text-[#111827] sm:text-lg">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm font-medium leading-6 text-black/60">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== STRATEGIC GUIDANCE SECTION ====== */}
            <section className="bg-[#fffaf7] py-14 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: TEXT */}
                        <div className="order-2 lg:order-1">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                Guidance
                            </span>
                            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
                                Strategic Salary Negotiation{" "}
                                <span className="text-[#ff4c00]">Guidance</span>
                            </h2>

                            <ul className="mt-6 space-y-4">
                                {[
                                    "Receive personalized strategies tailored to your role and industry",
                                    "Learn how to clearly articulate your value to justify higher compensation",
                                    "Get guidance on the right timing to negotiate for maximum impact",
                                ].map((text) => (
                                    <li key={text} className="flex items-start gap-4 group">
                                        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                                            <Check className="h-4 w-4" strokeWidth={3} />
                                        </span>
                                        <span className="text-base font-medium leading-7 text-[#4b5565] group-hover:text-[#111827] transition-colors">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                                <p className="text-xs font-extrabold uppercase tracking-wide text-[#ff4c00] mb-2">Pro Tip</p>
                                <p className="text-sm font-medium leading-6 text-[#4b5565]">
                                    The best negotiations happen when you're prepared with data. Our AI analyzes thousands of similar offers to give you the upper hand.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: ILLUSTRATION */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -inset-3 rounded-[28px] bg-[#fff0e9] rotate-3"></div>
                                <div className="relative rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                                    <img
                                        src="/images/offer&salary1.png"
                                        alt="Salary negotiation guidance"
                                        className="w-full h-auto rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== COMPREHENSIVE ANALYSIS SECTION ====== */}
            <section className="bg-white py-14 md:py-24 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: ILLUSTRATION */}
                        <div>
                            <div className="relative">
                                <div className="absolute -inset-3 rounded-[28px] bg-[#fffaf7] -rotate-2"></div>
                                <div className="relative rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                                    <img
                                        src="/images/offer&salary2.png"
                                        alt="Offer analysis"
                                        className="w-full h-auto rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: TEXT */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                                Analysis
                            </span>
                            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
                                Comprehensive Offer{" "}
                                <span className="text-[#ff4c00]">Analysis</span>
                            </h2>

                            <ul className="mt-6 space-y-4">
                                {[
                                    "Compare your offer against industry benchmarks and market standards",
                                    "Understand the full value of your compensation, including bonuses and benefits",
                                    "Identify key leverage points to negotiate a stronger offer",
                                ].map((text) => (
                                    <li key={text} className="flex items-start gap-4 group">
                                        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                                            <Check className="h-4 w-4" strokeWidth={3} />
                                        </span>
                                        <span className="text-base font-medium leading-7 text-[#4b5565] group-hover:text-[#111827] transition-colors">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Analyze Offer", "offer_salary_analysis", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                                className="group mt-8 inline-flex items-center gap-2 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black">
                                Analyze Your Offer
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== FINAL CTA SECTION ====== */}
            <section className="relative overflow-hidden bg-[#fffaf7] px-4 py-16 md:py-28">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4c00]/12 blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.35]" style={dotGrid} />
                </div>

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-black text-[#111827] sm:text-4xl md:text-5xl">
                        Ready to maximize your offer?
                    </h2>
                    <p className="mb-8 text-base font-medium text-[#4b5565] md:text-xl">
                        Join thousands of professionals who have successfully negotiated higher salaries using FlashFire's data-driven approach.
                    </p>
                    <button
                        {...getButtonProps()}
                        onClick={() => handleCTAClick("Start Now", "offer_salary_final_cta", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black">
                        Start Negotiating Smarter
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </button>
                    <p className="mt-4 text-sm font-medium text-[#4b5565]">Free analysis • Takes 2 minutes • No risk</p>
                </div>
            </section>

        </div>
    );
}
