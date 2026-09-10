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
    Sparkles,
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

    const insights = [
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
    ];

    const benefits = [
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
    ];

    const useCases = [
        {
            title: "Candidates with a New Job Offer",
            desc: "Understand whether your offer is competitive and how to counter professionally.",
        },
        {
            title: "Professionals Switching Roles or Industries",
            desc: "Navigate unfamiliar pay ranges and negotiate from a position of knowledge.",
        },
        {
            title: "Candidates Unsure How to Negotiate Pay",
            desc: "Get step-by-step guidance and scripts that remove hesitation and anxiety.",
        },
        {
            title: "Job Seekers Negotiating Bonuses, Equity, or Benefits",
            desc: "See the full compensation picture — not just base salary.",
        },
    ];

    const cardClass =
        "rounded-[0.4rem] border border-[#94959a] bg-[#fffdfc] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)]";
    const iconTile =
        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] text-white shadow-[0_4px_0_#000]";
    const primaryBtn =
        "group inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_6px_0_#000] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]";
    const kicker = "text-xs font-bold uppercase tracking-[0.08em] text-[#f55d1d]";

    return (
        <div className="bg-white font-['Space_Grotesk',sans-serif] text-[#02060A] overflow-x-hidden">

            {/* ====== HERO SECTION ====== */}
            <section className="relative overflow-hidden bg-[#f7e6df] px-4 pt-12 pb-16 sm:px-6 md:pt-16 md:pb-24">
                <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />
                <div className="pointer-events-none absolute -right-32 top-32 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />

                <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                    {/* LEFT: COPY */}
                    <div className="text-center lg:text-left">
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d] shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
                            Offer &amp; Salary Negotiation Advisor
                        </span>

                        <h1 className="mt-6 font-['Satoshi',sans-serif] text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#02060A] sm:text-5xl lg:text-[3.3rem]">
                            Negotiate your job offer with{" "}
                            <span className="relative whitespace-nowrap text-[#ff4c00]">
                                confidence
                                <svg className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[#ff4c00]/25" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 3.49998 106.25 -3.50003 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-xl font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a] md:text-lg lg:mx-0">
                            FlashFire analyzes your offer, compares it with market data, and helps
                            you negotiate professionally — without awkward conversations.
                        </p>

                        <div className="mt-8 flex justify-center lg:justify-start">
                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Analyze My Offer", "offer_salary_hero", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                                className={`${primaryBtn} w-full sm:w-auto`}
                            >
                                Analyze My Offer
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: OFFER-CLIMB VISUAL */}
                    <div className="relative mx-auto w-full max-w-md">
                        <div className="absolute -inset-3 rotate-2 rounded-[0.6rem] bg-white/50" />
                        <div className="relative rounded-[0.4rem] border border-[#94959a] bg-[#fffdfc] p-6 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
                            <div className="mb-5 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-black/10" />
                                <span className="h-2 w-2 rounded-full bg-black/10" />
                                <span className="h-2 w-2 rounded-full bg-black/10" />
                            </div>
                            <div className="space-y-3">
                                {[38, 55, 71, 100].map((w, i) => (
                                    <div key={i} className="h-8 overflow-hidden rounded-[6px] bg-[#f7e6df]">
                                        <div
                                            className={`h-full rounded-[6px] ${i === 3 ? "bg-[#ff4c00]" : "bg-[#f2c4ac]"}`}
                                            style={{ width: `${w}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex items-center gap-2">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4c00]">
                                    <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-white" strokeWidth={3} />
                                </span>
                                <span className="h-2.5 flex-1 rounded-full bg-[#f7e6df]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== INSIGHT SECTION ====== */}
            <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.03em] text-[#02060A] sm:text-4xl">
                            Most candidates don't negotiate — and lose money
                        </h2>
                        <p className="mt-4 font-['Satoshi',sans-serif] text-lg font-medium leading-[1.6] text-[#3a3a3a]">
                            Salary negotiation isn't about being aggressive. It's about being informed,
                            prepared, and professional.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {insights.map(({ icon: Icon, title, desc }) => (
                            <article key={title} className={`flex flex-col ${cardClass} p-6`}>
                                <div className={iconTile}>
                                    <Icon className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <span className={`mt-5 ${kicker}`}>Key Insight</span>
                                <h3 className="mt-1 font-['Satoshi',sans-serif] text-lg font-bold text-[#111]">{title}</h3>
                                <p className="mt-2 flex-grow font-['Satoshi',sans-serif] text-sm leading-[1.5] text-[#333]">{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== BENEFITS GRID ====== */}
            <section className="bg-[#f7e6df] px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d] shadow-sm">
                            Features
                        </span>
                        <h2 className="mt-4 font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.03em] text-[#02060A] sm:text-4xl">
                            What You Get With FlashFire
                        </h2>
                        <p className="mx-auto mt-3 max-w-md font-['Satoshi',sans-serif] text-base font-medium text-[#3a3a3a]">
                            Actionable insights, negotiation scripts and confidence boosters that matter.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {benefits.map(({ icon: Icon, title, desc }) => (
                            <article key={title} className={`flex flex-col ${cardClass} p-6`}>
                                <div className={iconTile}>
                                    <Icon className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <h4 className="mt-5 font-['Satoshi',sans-serif] text-lg font-bold text-[#111]">{title}</h4>
                                <p className="mt-2 font-['Satoshi',sans-serif] text-sm leading-[1.5] text-[#333]">{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO SHOULD USE THIS STRATEGY ===== */}
            <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* LEFT: CONTENT */}
                    <div className="lg:sticky lg:top-28">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
                            <Shield className="h-3.5 w-3.5" />
                            Salary Negotiation Strategy
                        </span>

                        <h2 className="mt-5 font-['Satoshi',sans-serif] text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-[#02060A] sm:text-4xl md:text-[2.7rem]">
                            Who Should Use This{" "}
                            <span className="text-[#ff4c00]">Strategy?</span>
                        </h2>

                        <p className="mt-6 font-['Satoshi',sans-serif] text-lg font-medium leading-[1.7] text-[#3a3a3a]">
                            FlashFire's salary negotiation strategy is built for professionals who want
                            to negotiate confidently, avoid leaving money on the table, and secure
                            compensation that truly reflects their value — without sounding pushy or risky.
                        </p>

                        <p className="mt-4 font-['Satoshi',sans-serif] text-base font-medium leading-[1.7] text-[#666]">
                            Whether you're negotiating base pay, bonuses, equity, or benefits, FlashFire
                            helps you approach the conversation with clarity, data, and confidence.
                        </p>

                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Get Started", "offer_salary_who_should", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className={`mt-8 ${primaryBtn}`}>
                            Get Started Now
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* RIGHT: USE CASES */}
                    <div className="space-y-4">
                        {useCases.map((item, index) => (
                            <div key={item.title} className={`flex gap-4 ${cardClass} p-5`}>
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#ff4c00] text-[13px] font-bold text-white shadow-[0_4px_0_#000]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h4 className="font-['Satoshi',sans-serif] text-base font-bold leading-tight text-[#111] sm:text-lg">
                                        {item.title}
                                    </h4>
                                    <p className="mt-1 font-['Satoshi',sans-serif] text-sm leading-[1.5] text-[#333]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== STRATEGIC GUIDANCE SECTION ====== */}
            <section className="bg-[#f7e6df] px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* LEFT: TEXT */}
                    <div className="order-2 lg:order-1">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d] shadow-sm">
                            Guidance
                        </span>
                        <h2 className="mt-4 font-['Satoshi',sans-serif] text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-[#02060A] sm:text-4xl">
                            Strategic Salary Negotiation{" "}
                            <span className="text-[#ff4c00]">Guidance</span>
                        </h2>

                        <ul className="mt-7 space-y-3">
                            {[
                                "Receive personalized strategies tailored to your role and industry",
                                "Learn how to clearly articulate your value to justify higher compensation",
                                "Get guidance on the right timing to negotiate for maximum impact",
                            ].map((text) => (
                                <li key={text} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4c00]">
                                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                    </span>
                                    <span className="font-['Satoshi',sans-serif] font-medium leading-[1.6] text-[#02060A]">{text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={`mt-8 ${cardClass} bg-white p-6`}>
                            <p className={kicker}>Pro Tip</p>
                            <p className="mt-2 font-['Satoshi',sans-serif] text-sm leading-[1.5] text-[#333]">
                                The best negotiations happen when you're prepared with data. Our AI analyzes thousands of similar offers to give you the upper hand.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: ILLUSTRATION */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="absolute -inset-3 rotate-2 rounded-[0.6rem] bg-white/60" />
                            <div className={`relative ${cardClass} bg-white p-4`}>
                                <img
                                    src="/images/offer&salary1.png"
                                    alt="Salary negotiation guidance"
                                    className="h-auto w-full rounded-[0.3rem]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== COMPREHENSIVE ANALYSIS SECTION ====== */}
            <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* LEFT: ILLUSTRATION */}
                    <div>
                        <div className="relative">
                            <div className="absolute -inset-3 -rotate-2 rounded-[0.6rem] bg-[#f7e6df]" />
                            <div className={`relative ${cardClass} bg-white p-4`}>
                                <img
                                    src="/images/offer&salary2.png"
                                    alt="Offer analysis"
                                    className="h-auto w-full rounded-[0.3rem]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: TEXT */}
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f7e6df] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
                            Analysis
                        </span>
                        <h2 className="mt-4 font-['Satoshi',sans-serif] text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-[#02060A] sm:text-4xl">
                            Comprehensive Offer{" "}
                            <span className="text-[#ff4c00]">Analysis</span>
                        </h2>

                        <ul className="mt-7 space-y-3">
                            {[
                                "Compare your offer against industry benchmarks and market standards",
                                "Understand the full value of your compensation, including bonuses and benefits",
                                "Identify key leverage points to negotiate a stronger offer",
                            ].map((text) => (
                                <li key={text} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4c00]">
                                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                    </span>
                                    <span className="font-['Satoshi',sans-serif] font-medium leading-[1.6] text-[#02060A]">{text}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Analyze Offer", "offer_salary_analysis", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className={`mt-8 ${primaryBtn}`}>
                            Analyze Your Offer
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ====== FINAL CTA SECTION ====== */}
            <section className="bg-[#f7e6df] px-4 py-16 sm:px-6 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.02em] text-[#02060A] sm:text-[2.6rem]">
                        Ready to maximize your offer?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-['Satoshi',sans-serif] text-lg font-medium text-[#3a3a3a]">
                        Join thousands of professionals who have successfully negotiated higher salaries using FlashFire's data-driven approach.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Start Now", "offer_salary_final_cta", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className="group inline-flex items-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_6px_0_#000] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
                        >
                            Start Negotiating Smarter
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                    <p className="mt-6 text-sm text-[#666]">Free analysis • Takes 2 minutes • No risk</p>
                </div>
            </section>

        </div>
    );
}
