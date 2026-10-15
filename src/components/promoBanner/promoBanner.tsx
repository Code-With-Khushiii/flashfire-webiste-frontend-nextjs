"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./promoBanner.module.css";

const OFFER_END = new Date(new Date().getFullYear(), 9, 31, 23, 59, 59, 999);

function getTimeLeft() {
  const diff = OFFER_END.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

type TimeLeft = NonNullable<ReturnType<typeof getTimeLeft>>;

type Props = {
  pricingHref?: string;
};

export default function PromoBanner({ pricingHref = "/pricing" }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const t = getTimeLeft();
      setTimeLeft(t);
      setExpired(!t);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (expired) return null;

  const countdown = timeLeft
    ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
    : "";

  return (
    <Link href={pricingHref} className={styles.promoBar} aria-label="Halloween offer - view pricing">
      <span className={styles.promoText}>
        <svg className={styles.pumpkin} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#0b0b0b" d="M12 6.2c-1-1-2.6-1.4-4.2-1C4.6 6 2.5 9 2.5 12.6c0 4 3.3 7.4 7.1 7.4 1 0 1.8-.3 2.4-.8.6.5 1.4.8 2.4.8 3.8 0 7.1-3.4 7.1-7.4C21.5 9 19.4 6 16.2 5.2c-1.6-.4-3.2 0-4.2 1z" />
          <path fill="#0b0b0b" d="M11 5.5c0-1.6.6-3 2.2-3.7l.6 1.1c-.9.5-1.2 1.4-1.2 2.6z" />
          <path fill="#ff8a4c" d="M7.5 10.5l2 3h-4zM16.5 10.5l2 3h-4zM8 16c1.2 1.5 2.6 2 4 2s2.800-.5 4-2c-1.300.6-2.600.8-4 .8s-2.700-.2-4-.8z" />
        </svg> Halloween Offer ends in{" "}
        <strong className={styles.countdown}>{countdown || "\u00A0"}</strong>.{" "}
        <span className={styles.tail}>
          Last chance to unlock extra <strong>50%</strong> off
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
