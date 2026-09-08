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
    <div className="min-h-screen bg-[#faf8f5] font-['Space_Grotesk',sans-serif] text-[#141414]">

      {/* === HERO + FORM === */}
      <div className="border-b border-black/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff4c00]">
              Contact
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Flashfire Contact – Customer Support, Sales & Enquiries
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#141414]/70">
              Use the Flashfire contact page to reach customer support, sales enquiries, or general assistance. Our team is available via Flashfire email support or demo requests.
            </p>
          </div>

          {/* Contact Form */}
          <div className="border border-black/10 bg-white p-8">
            <h2 className="mb-6 text-xl font-bold uppercase tracking-tight text-[#141414]">
              Contact Flashfire Customer Support or Sales Team
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* === FLASHFIRE CONTACT DETAILS === */}
      <div className="border-b border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-black/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff4c00]">
              Get in touch
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Flashfire <span className="text-[#ff4c00]">Contact Details</span>
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-lg text-[#141414]/70">
            Clear, direct ways to reach the Flashfire team.
          </p>

          <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
            {/* Support */}
            <div className="bg-[#faf8f5] p-10 transition-colors duration-300 hover:bg-white">
              <FaEnvelope className="mb-8 text-2xl text-[#ff4c00]" />
              <h3 className="mb-4 text-xl font-bold text-[#141414]">
                Customer Support
              </h3>
              <p className="mb-8 leading-relaxed text-[#141414]/70">
                Need help? Flashfire customer support is available via email to assist with your account, job search, or platform questions.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-[#ff4c00]">
                  Flashfire Email Support: support@flashfirejobs.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-sm text-[#141414]/50 transition-colors hover:text-[#ff4c00]"
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
            <div className="bg-[#faf8f5] p-10 transition-colors duration-300 hover:bg-white">
              <FaUser className="mb-8 text-2xl text-[#ff4c00]" />
              <h3 className="mb-4 text-xl font-bold text-[#141414]">
                Flashfire Sales Enquiry & Demo Requests
              </h3>
              <p className="mb-8 leading-relaxed text-[#141414]/70">
                Explore demos, partnerships, or product questions.
              </p>
              <button
                onClick={handleScheduleDemo}
                className="group inline-flex items-center gap-2 font-semibold text-[#ff4c00]"
              >
                Schedule a Flashfire Demo
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Company */}
            <div className="bg-[#faf8f5] p-10 transition-colors duration-300 hover:bg-white">
              <FaBuilding className="mb-8 text-2xl text-[#ff4c00]" />
              <h3 className="mb-4 text-xl font-bold text-[#141414]">
                Company
              </h3>
              <p className="mb-8 leading-relaxed text-[#141414]/70">
                Official corporate and business information.
              </p>
              <p className="font-semibold text-[#141414]">
                Flashfire Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === FAQ === */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 border-b border-black/10 pb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Frequently Asked
              <span className="block">Questions</span>
            </h2>
          </div>
          <p className="mb-10 text-lg text-[#141414]/70">
            Get answers about contacting Flashfire.
          </p>

          <div className="border-t border-black/10">
            {faqs.map((item, i) => {
              const isOpen = activeFaqIndex === i;
              return (
                <div key={i} className="border-b border-black/10">
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lg font-semibold text-[#141414]">
                      {item.q}
                    </span>
                    <span className="flex-none text-[#ff4c00]">
                      {isOpen ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="pb-6 pr-10 leading-relaxed text-[#141414]/70">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
