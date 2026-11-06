"use client";

import { useEffect, useState } from "react";

const units = [
  ["days", "DAYS"],
  ["hours", "HRS"],
  ["minutes", "MINS"],
  ["seconds", "SECS"],
] as const;

export default function AnniversaryBar() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const remaining = Math.max(0, endOfDay.getTime() - now.getTime());

      setTimeLeft({
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor((remaining % 86_400_000) / 3_600_000),
        minutes: Math.floor((remaining % 3_600_000) / 60_000),
        seconds: Math.floor((remaining % 60_000) / 1_000),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#f7f7f2] px-2 py-1 text-[#171717] sm:gap-4 sm:px-4">
      <span className="hidden text-lg leading-none text-[#f15a24] sm:inline" aria-hidden="true">✱</span>
      <span className="shrink-0 text-[11px] font-extrabold tracking-wide sm:text-sm">FLASHFIRE ANNIVERSARY SALE</span>
      <span className="hidden text-sm text-[#f15a24] sm:inline" aria-hidden="true">✱</span>
      <span className="hidden text-sm sm:inline">Special pricing for a limited time</span>
      <div className="flex shrink-0 items-center gap-1" role="timer" aria-label="Time remaining in today's anniversary offer">
        {units.map(([key, label]) => (
          <span key={key} className="flex h-[35px] min-w-[36px] flex-col items-center justify-center rounded-[5px] border border-[#252525] bg-white px-1 shadow-[0_2px_0_#252525] sm:min-w-[41px]">
            <span className="text-sm font-bold leading-[16px] tabular-nums sm:text-base">{String(timeLeft[key]).padStart(2, "0")}</span>
            <span className="text-[7px] font-semibold leading-[9px] sm:text-[8px]">{label}</span>
          </span>
        ))}
      </div>
      <a href="/pricing" className="shrink-0 rounded-[7px] bg-[#f15a24] px-3 py-2 text-xs font-bold text-white no-underline shadow-[0_3px_0_#a93812] transition-colors hover:bg-[#d94a19] sm:px-5 sm:text-sm">
        Book Now
      </a>
    </div>
  );
}
