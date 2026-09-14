"use client";

import { Star, Mic, MessageSquare, Sparkles, FileText, UserCheck, GraduationCap, Repeat, Shield } from "lucide-react";
import HomePageHappyUsers from "../homePageHappyUsers/homePageHappyUsers";
import HomePageFAQ from "../homePageFAQ/homePageFAQ";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { localizeHref } from "@/src/utils/locale";

export default function InterviewBuddy() {
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // Bypass will be handled by the event listener
        },
    });
    const pushCustomUrl = (path?: string) => {
        if (typeof window === "undefined" || !path) return;
        const normalized = localizeHref(path, window.location.pathname);
        window.history.pushState({}, "", normalized);
    };

    const handleStartFree = () => {
        const utmSource = typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "WEBSITE"
            : "WEBSITE";
        const utmMedium = typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "Interview_Buddy_Page"
            : "Interview_Buddy_Page";
        GTagUTM({
            eventName: "sign_up_click",
            label: "Interview_Buddy_Get_Me_Interview_Button",
            utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: typeof window !== "undefined"
                    ? localStorage.getItem("utm_campaign") || "Website"
                    : "Website",
            },
        });
        trackButtonClick("Get me interview", "interview_buddy_cta", "cta", {
            button_location: "interview_buddy_hero_section",
            section: "interview_buddy_hero"
        });
        trackSignupIntent("interview_buddy_cta", {
            signup_source: "interview_buddy_hero_button",
            funnel_stage: "signup_intent"
        });

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        pushCustomUrl("/interview-buddy/Start-free");
    };

    const featureList = [
        {
            title: "On-the-spot support & guidance",
            desc: "Get instant AI suggestions when questions get tough. Stay calm and respond clearly without pauses.",
            icon: <Sparkles size={22} />,
            mock: <MockAnswerCard />,
        },
        {
            title: "Accurate real-time transcripts",
            desc: "Track the conversation live, capture key points, and respond with clarity and confidence.",
            icon: <Mic size={22} />,
            mock: <MockTranscriptCard />,
        },
        {
            title: "Instant answers to interview questions",
            desc: "Receive structured, role-specific answers tailored to your profile in real time.",
            icon: <MessageSquare size={22} />,
            mock: <MockInstantAnswer />,
        },
        {
            title: "Highlight relevant experience instantly",
            desc: "Surface the most relevant achievements from your resume exactly when needed.",
            icon: <FileText size={22} />,
            mock: <MockResumeHighlight />,
        },
    ];

    const audience = [
        {
            title: "Active Job Seekers",
            desc: "Get real-time guidance during live interviews, screenings, and technical rounds.",
            icon: <UserCheck size={20} />,
        },
        {
            title: "Freshers & Early Professionals",
            desc: "Deliver structured, professional answers even with limited interview experience.",
            icon: <GraduationCap size={20} />,
        },
        {
            title: "Career Switchers",
            desc: "Handle unfamiliar interview formats and explain transitions with confidence.",
            icon: <Repeat size={20} />,
        },
        {
            title: "Candidates Under Pressure",
            desc: "Stay calm, organized, and articulate during high-stakes interview moments.",
            icon: <Shield size={20} />,
        },
    ];

    return (
        <div className="w-full bg-white">

            {/* ================= HERO SECTION: asymmetric split ================= */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-white" />

                <div className="relative max-w-[1240px] mx-auto px-6 py-24 sm:py-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-5 text-sm text-gray-600">
                            <span className="font-semibold">Excellent</span>
                            <div className="flex text-[#ff4c00]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="opacity-70">Trusted by job seekers</span>
                        </div>

                        <h1 className="text-4xl md:text-[3.4rem] font-extrabold leading-tight text-black">
                            AI Interview Assistant for{" "}
                            <span className="text-[#ff4c00]">Real-Time Confidence</span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 max-w-xl">
                            Get live AI support during interviews. Receive instant guidance,
                            suggested answers, and structured responses while you speak.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            <button
                                {...getButtonProps()}
                                onClick={handleStartFree}
                                className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_3px_0_black] hover:opacity-90"
                            >
                                Start free
                            </button>

                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center">
                                    {[
                                        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                                        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                                        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
                                    ].map((url, i) => (
                                        <div
                                            key={i}
                                            className={`relative w-[2.2rem] h-[2.2rem] rounded-full border-2 border-white overflow-hidden -ml-3.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] max-[768px]:w-[2rem] max-[768px]:h-[2rem] max-[768px]:-ml-3 max-[480px]:w-[1.8rem] max-[480px]:h-[1.8rem] max-[480px]:-ml-2.5 ${i === 0 ? "ml-0" : ""}`}
                                        >
                                            <Image
                                                src={url}
                                                alt={`User ${i + 1}`}
                                                fill
                                                sizes="2.2rem"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-base text-black font-medium">Loved by 1000+ users</p>
                            </div>
                        </div>
                    </div>

                    {/* Live-call style mockup */}
                    <div className="w-full max-w-[420px] mx-auto lg:mx-0 rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                            <span className="ml-3 text-xs font-semibold text-gray-500">Live Interview</span>
                        </div>
                        <div className="px-6 py-6 space-y-4">
                            <div className="bg-[#fff7f3] rounded-xl p-3 text-sm">
                                <strong>Interviewer:</strong> Tell me about your experience.
                            </div>
                            <div className="bg-[#ff4c00]/10 rounded-xl p-3 text-sm">
                                <strong>You:</strong> I recently worked on a project where…
                            </div>
                            <div className="rounded-xl border border-[#ff4c00]/30 bg-white p-4">
                                <p className="text-xs text-[#ff4c00] font-semibold mb-2 tracking-wide">
                                    SUGGESTED ANSWER
                                </p>
                                <p className="text-gray-700 text-sm">
                                    &ldquo;I led a cross-functional project where we launched a new feature
                                    that improved user engagement by 30%…&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES: alternating rows ================= */}
            <section className="max-w-[1200px] mx-auto px-6 py-24">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-black">
                        Everything you need to ace interviews
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Real-time AI assistance that helps you think, respond, and perform better.
                    </p>
                </div>

                <div className="space-y-16">
                    {featureList.map((item, i) => (
                        <div
                            key={item.title}
                            className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-3 text-[#ff4c00]">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8]">
                                        {item.icon}
                                    </span>
                                    <h3 className="font-bold text-xl text-black">{item.title}</h3>
                                </div>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
                                {item.mock}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= WHO IS THIS FOR: icon-row list ================= */}
            <section className="relative bg-[#fff7f3]">
                <div className="relative max-w-[1200px] mx-auto px-6 py-24">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black">
                            Who Is This AI Interview Assistant For?
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Built for candidates who want clarity, confidence, and real-time support
                            when interviews matter most.
                        </p>
                    </div>

                    <div className="divide-y divide-[#ff4c00]/15 rounded-3xl border border-[#ff4c00]/15 bg-white overflow-hidden">
                        {audience.map((item, i) => (
                            <div key={item.title} className="flex flex-col sm:flex-row sm:items-center gap-5 px-8 py-7">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4c00] text-white">
                                    {item.icon}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-black">{item.title}</h3>
                                    <p className="mt-1 text-gray-600">{item.desc}</p>
                                </div>
                                <span className="hidden sm:block text-sm font-semibold text-[#ff4c00]/50">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HomePageHappyUsers />
            <HomePageFAQ />
        </div>
    );
}

/* ================= UI MOCKS ================= */

function MockAnswerCard() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5">
            <p className="text-xs text-[#ff4c00] font-semibold mb-2">
                SUGGESTED ANSWER
            </p>
            <p className="text-gray-700 text-sm">
                &ldquo;I led a cross-functional project where we launched a new feature
                that improved user engagement by 30%…&rdquo;
            </p>
        </div>
    );
}

function MockTranscriptCard() {
    return (
        <div className="space-y-3">
            <div className="bg-[#fff7f3] rounded-xl p-3 text-sm">
                <strong>Interviewer:</strong> Tell me about your experience.
            </div>
            <div className="bg-[#ff4c00]/10 rounded-xl p-3 text-sm">
                <strong>You:</strong> I recently worked on a project where…
            </div>
        </div>
    );
}

function MockInstantAnswer() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm text-gray-700">
            Press <span className="font-semibold text-[#ff4c00]">Space</span> to get an
            AI-generated answer instantly during the interview.
        </div>
    );
}

function MockResumeHighlight() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm">
            <p className="font-semibold mb-2">Highlighted Experience</p>
            <div className="h-3 bg-[#ff4c00]/20 rounded w-3/4 mb-2" />
            <div className="h-3 bg-[#ff4c00]/10 rounded w-2/3" />
        </div>
    );
}
