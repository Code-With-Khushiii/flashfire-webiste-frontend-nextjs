"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ContactForm from "./contactForm";
import { FaEnvelope, FaPhone, FaBuilding, FaUser, FaLinkedinIn, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";
import { Copy, Check } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { FaPlus, FaTimes } from "react-icons/fa";
import { stripLocalePrefix, localizeHref } from "@/src/utils/locale";



type FAQ = {
  q: string;
  a: string;
};
export default function ContactUsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);


  const faqs: FAQ[] = [
    {
      q: "How do I contact Flashfire customer support?",
      a: "You can contact Flashfire customer support by emailing support@flashfirejobs.com or using the contact form on this page.",
    },
    {
      q: "What are Flashfire's contact details?",
      a: "Flashfire contact details include our official email support channel and sales demo request options available on this page.",
    },
    {
      q: "Does Flashfire offer email support?",
      a: "Yes. Flashfire email support is available for product questions, technical issues, and general enquiries.",
    },
  ];

  const handleScheduleDemo = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Contact_Us_Page"
          : "Contact_Us_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Contact_Us_Schedule_Demo_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Schedule A Demo", "contact_us_cta", "cta", {
          button_location: "contact_us_sales_enquiry",
          section: "contact_us",
        });
        trackSignupIntent("contact_us_cta", {
          signup_source: "contact_us_schedule_demo_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        stripLocalePrefix(normalizedPath) === "/schedule-a-demo-with-flashfire";
      const isOnContactUsPage =
        stripLocalePrefix(normalizedPath) === "/contact-us";

      // If already on get-me-interview, just show modal
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      // If on contact us page, change URL but keep page content visible
      if (isOnContactUsPage) {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem(
            "previousPageBeforeGetMeInterview",
            normalizedPath
          );
          sessionStorage.setItem(
            "preserveScrollPosition",
            currentScrollY.toString()
          );
        }

        const targetPath = localizeHref("/schedule-a-demo-with-flashfire", normalizedPath);
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }

      // Navigate to get-me-interview
      const targetPath = "/schedule-a-demo-with-flashfire";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Schedule Demo handler:", error);
    }
  };

  const handleCopyEmail = async () => {
    const email = "support@flashfirejobs.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk',sans-serif] text-black">

      {/* === HERO + FORM === */}
      <section className="relative overflow-hidden bg-[#f7e6df] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d] shadow-sm">
              Contact
            </span>
            <h1 className="mt-6 font-['Satoshi',sans-serif] text-[2rem] sm:text-4xl lg:text-[2.9rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#02060A]">
              Flashfire Contact – Customer Support, Sales & Enquiries
            </h1>
            <p className="mt-5 max-w-xl font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a]">
              Use the Flashfire contact page to reach customer support, sales enquiries, or general assistance. Our team is available via Flashfire email support or demo requests.
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#94959a] bg-[#fffdfc] p-6 shadow-[0_2px_6px_rgba(0,0,0,0.03)] sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-[#111]">
              Contact Flashfire Customer Support or Sales Team
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* === FLASHFIRE CONTACT DETAILS === */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#f7e6df] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
              Get in touch
            </span>
            <h2 className="mt-5 font-['Satoshi',sans-serif] text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#02060A]">
              Flashfire <span className="text-[#ff4c00]">Contact Details</span>
            </h2>
            <p className="mt-4 font-['Satoshi',sans-serif] text-lg font-medium text-[#3a3a3a]">
              Clear, direct ways to reach the Flashfire team.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Support */}
            <div className="rounded-[0.5rem] border border-[#94959a] bg-[#fffdfc] p-8 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#ff4c00] text-white shadow-[0_4px_0_#000]">
                <FaEnvelope className="text-lg" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#111]">
                Customer Support
              </h3>
              <p className="mb-6 font-['Satoshi',sans-serif] text-[15px] leading-[1.6] text-[#333]">
                Need help? Flashfire customer support is available via email to assist with your account, job search, or platform questions.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-[#ff4c00]">
                  Flashfire Email Support: support@flashfirejobs.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#78716d] transition-colors hover:text-[#ff4c00]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sales */}
            <div className="rounded-[0.5rem] border border-[#94959a] bg-[#fffdfc] p-8 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#ff4c00] text-white shadow-[0_4px_0_#000]">
                <FaUser className="text-lg" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#111]">
                Flashfire Sales Enquiry & Demo Requests
              </h3>
              <p className="mb-6 font-['Satoshi',sans-serif] text-[15px] leading-[1.6] text-[#333]">
                Explore demos, partnerships, or product questions.
              </p>
              <button
                onClick={handleScheduleDemo}
                className="group inline-flex items-center gap-2 font-bold text-[#ff4c00]"
              >
                Schedule a Flashfire Demo
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Company */}
            <div className="rounded-[0.5rem] border border-[#94959a] bg-[#fffdfc] p-8 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#ff4c00] text-white shadow-[0_4px_0_#000]">
                <FaBuilding className="text-lg" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#111]">
                Company
              </h3>
              <p className="mb-6 font-['Satoshi',sans-serif] text-[15px] leading-[1.6] text-[#333]">
                Official corporate and business information.
              </p>
              <p className="font-bold text-[#111]">
                Flashfire Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="ff-faq-section">
        <div className="ff-faq-shell">
          <div className="ff-faq-header">
            <h2>
              Frequently Asked
              <span className="block">Questions</span>
            </h2>
            <p>Get answers about contacting Flashfire.</p>
          </div>

          <div className="ff-faq-list">
            {faqs.map((item, i) => {
              const isOpen = activeFaqIndex === i;
              return (
                <div key={i} className={`ff-faq-item ${isOpen ? "is-active" : ""}`}>
                  <button
                    type="button"
                    className="ff-faq-question"
                    onClick={() => setActiveFaqIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="ff-faq-question-text">{item.q}</span>
                    <span className="ff-faq-icon">
                      {isOpen ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ff-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
