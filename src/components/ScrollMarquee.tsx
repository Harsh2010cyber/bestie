"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const speedMultiplier = useRef(1);
  const targetSpeedMultiplier = useRef(1);
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Track scroll velocity to accelerate marquee
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity());
        // Map velocity to speed acceleration
        const extraSpeed = Math.min(vel / 400, 3.5);
        targetSpeedMultiplier.current = 1 + extraSpeed;
      },
    });

    const animateMarquee = () => {
      // Lerp speed multiplier back to 1 for silky smooth deceleration
      speedMultiplier.current += (targetSpeedMultiplier.current - speedMultiplier.current) * 0.08;
      targetSpeedMultiplier.current += (1 - targetSpeedMultiplier.current) * 0.05;

      const baseSpeed = 0.75 * speedMultiplier.current;

      pos1.current -= baseSpeed;
      pos2.current += baseSpeed * 0.9;

      if (row1Ref.current) {
        // Wrap around at 50%
        const halfWidth1 = row1Ref.current.scrollWidth / 2;
        if (Math.abs(pos1.current) >= halfWidth1) {
          pos1.current = 0;
        }
        row1Ref.current.style.transform = `translate3d(${pos1.current}px, 0, 0)`;
      }

      if (row2Ref.current) {
        const halfWidth2 = row2Ref.current.scrollWidth / 2;
        if (pos2.current >= 0) {
          pos2.current = -halfWidth2;
        }
        row2Ref.current.style.transform = `translate3d(${pos2.current}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(animateMarquee);
    };

    rafId.current = requestAnimationFrame(animateMarquee);

    return () => {
      trigger.kill();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const phrases = siteConfig.story.marquee;

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#060608] overflow-hidden select-none border-y border-white/[0.06]"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-amber-glow blur-3xl pointer-events-none" />

      {/* Row 1 - Leftward scrolling */}
      <div className="flex whitespace-nowrap overflow-hidden w-full mb-6 md:mb-10">
        <div ref={row1Ref} className="flex items-center gap-8 md:gap-14 will-change-transform">
          {[...phrases, ...phrases].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-14">
              <span className="font-serif text-2xl md:text-5xl lg:text-6xl uppercase tracking-wider text-ivory/80 hover:text-ivory transition-colors">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-bronze/60 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Rightward scrolling */}
      <div className="flex whitespace-nowrap overflow-hidden w-full">
        <div ref={row2Ref} className="flex items-center gap-8 md:gap-14 will-change-transform">
          {[...phrases.slice().reverse(), ...phrases.slice().reverse()].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-14">
              <span className="font-serif italic text-2xl md:text-5xl lg:text-6xl text-bronze-light/70 hover:text-bronze-light transition-colors">
                “{item}”
              </span>
              <span className="w-2 h-2 rounded-full bg-ivory/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
