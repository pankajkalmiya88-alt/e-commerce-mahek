"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 14,
    hours: 9,
    minutes: 6,
    seconds: 38,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="relative overflow-hidden rounded-2xl bg-[url('/images/flash-sale-bg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-white">
            <h2 className="font-playfair text-2xl font-bold leading-tight md:text-3xl tracking-tight">
              Flash Sale now on!
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/90 md:text-base font-poppins">
              Score Big Savings on All Your Favorites
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="w-[55px] rounded bg-white px-1.5 py-2 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-extrabold text-black">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] md:text-xs font-bold tracking-widest text-white font-poppins">DAYS</div>
              </div>

              <div className="text-center">
                <div className="w-[55px] rounded bg-white px-1.5 py-2 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-extrabold text-black">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] md:text-xs font-bold tracking-widest text-white font-poppins">HOURS</div>
              </div>

              <div className="text-center">
                <div className="w-[55px] rounded bg-white px-1.5 py-2 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-extrabold text-black">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] md:text-xs font-bold tracking-widest text-white font-poppins">MINS</div>
              </div>

              <div className="text-center">
                <div className="w-[55px] rounded bg-white px-1.5 py-2 flex items-center justify-center">
                  <div className="text-xl md:text-2xl font-extrabold text-black">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] md:text-xs font-bold tracking-widest text-white font-poppins">SECS</div>
              </div>
            </div>

            <Link
              href={ROUTES.SALE}
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3 font-playfair text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
            >
              Shop Sale
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
