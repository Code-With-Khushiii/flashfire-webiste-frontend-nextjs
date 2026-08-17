"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import HomePage from "@/src/components/pages/home/Home";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Features from "@/src/components/pages/features/Features";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import InterviewBuddy from "@/src/components/interviewBuddy/interviewBuddy";
import CareerAdvisor from "@/src/components/careerAdvisor/careerAdvisor";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AICopilot from "@/src/components/AICopilot/AICopilot";
import dynamic from "next/dynamic";
import { stripLocalePrefix } from "@/src/utils/locale";

const ATSPage = dynamic(() => import("@/app/features/resume-optimizer/page"), {
  ssr: false,
});

// Force fresh import to avoid Turbopack cache issues
const JobAutomationPage = dynamic(
  async () => {
    const module = await import("@/app/features/job-automation/page");
    return module;
  },
  { ssr: false }
);

const LinkedInPage = dynamic(() => import("@/app/features/linkedin-profile-optimization/page"), {
  ssr: false,
});

const JobTrackerPage = dynamic(() => import("@/app/features/job-tracker/page"), {
  ssr: false,
});

const PrecisionTargetingPage = dynamic(() => import("@/app/features/precision-targeting/page"), {
  ssr: false,
});

const DashboardAnalyticsPage = dynamic(() => import("@/app/features/dashboard-analytics/page"), {
  ssr: false,
});

const CoverLetterPage = dynamic(() => import("@/app/features/cover-letter/page"), {
  ssr: false,
});

const JobSearchPage = dynamic(() => import("@/app/job-search/page"), {
  ssr: false,
});

export default function GetMeInterviewPage() {
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useLayoutEffect(() => {
        setIsMounted(true);
        
        const savedPreviousPage = sessionStorage.getItem('previousPageBeforeGetMeInterview');
        if (savedPreviousPage) {
            setPreviousPage(savedPreviousPage);
        }
        
        const savedScrollY = sessionStorage.getItem('preserveScrollPosition');
        if (savedScrollY) {
            const scrollY = parseInt(savedScrollY, 10);
            
            window.scrollTo({ top: scrollY, behavior: 'instant' });
            
            const restoreScroll = () => {
                window.scrollTo({ top: scrollY, behavior: 'instant' });
            };
            
            requestAnimationFrame(() => {
                restoreScroll();
                requestAnimationFrame(() => {
                    restoreScroll();
                    setTimeout(() => {
                        restoreScroll();
                        sessionStorage.removeItem('preserveScrollPosition');
                    }, 100);
                });
            });
        }
    }, []);

    if (!isMounted) {
        return <HomePage />;
    }

    if (stripLocalePrefix(previousPage) === '/AI-copilot') {
        return (
            <>
                <Navbar />
                <AICopilot />
                <Footer />
            </>
        );
    }

    if (stripLocalePrefix(previousPage) === '/about-us') {
        return (
            <>
                <Navbar />
                <AboutUs />
                <Footer />
            </>
        );
    }

    if (stripLocalePrefix(previousPage) === '/features' || stripLocalePrefix(previousPage) === '/feature' || 
        stripLocalePrefix(previousPage) === '/features' || stripLocalePrefix(previousPage) === '/feature') {
        return (
            <>
                <Navbar />
                <Features />
                <Footer />
            </>
        );
    }

    if (stripLocalePrefix(previousPage) === '/features/resume-optimizer' ||
        stripLocalePrefix(previousPage) === '/features/ats-optimizer' ||
        stripLocalePrefix(previousPage) === '/ats-optimized-resume-checker') {
        return <ATSPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/job-automation' ||
        stripLocalePrefix(previousPage) === '/job-application-automation') {
        return <JobAutomationPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/linkedin-profile-optimization' ||
        stripLocalePrefix(previousPage) === '/linkedin-profile-optimization-services' ||
        stripLocalePrefix(previousPage) === '/features/linkedin-profile-optimization-services') {
        return <LinkedInPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/job-tracker') {
        return <JobTrackerPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/precision-targeting') {
        return <PrecisionTargetingPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/dashboard-analytics') {
        return <DashboardAnalyticsPage />;
    }

    if (stripLocalePrefix(previousPage) === '/features/cover-letter') {
        return <CoverLetterPage />;
    }

    if (stripLocalePrefix(previousPage) === '/job-search') {
        return <JobSearchPage />;
    }

    if (stripLocalePrefix(previousPage) === '/contact-us') {
        return (
            <>
                <Navbar />
                <ContactUsClient />
                <Footer />
            </>
        );
    }

    if (stripLocalePrefix(previousPage) === '/career-advisor') {
        return (
            <>
                <Navbar />
                <CareerAdvisor />
                <Footer />
            </>
        );
    }

    if (stripLocalePrefix(previousPage) === '/interview-buddy') {
        return (
            <>
                <Navbar />
                <InterviewBuddy />
                <Footer />
            </>
        );
    }

    return <HomePage />;
}
