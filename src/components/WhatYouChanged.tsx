"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function WhatYouChanged() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const statementEls = section?.querySelectorAll(".statement-block");
      if (!section || !statementEls || statementEls.length === 0) return;

      // Pin the section and animate statements sequentially through scroll scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${statementEls.length * 120}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      statementEls.forEach((el, i) => {
        // Initial state
        gsap.set(el, {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
          pointerEvents: "none",
        });

        // Reveal this statement
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          i * 2
        );

        // Keep it in view for a moment (except final statement which stays)
        if (i < statementEls.length - 1) {
          tl.to(
            el,
            {
              opacity: 0,
              y: -50,
              filter: "blur(10px)",
              duration: 0.8,
              ease: "power2.in",
            },
            i * 2 + 1.2
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-you-changed"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060608] flex items-center justify-center overflow-hidden select-none px-6 md:px-16"
      onMouseEnter={() => setCursor("text")}
      onMouseLeave={() => resetCursor()}
    >
      {/* Chapter Marker */}
      <div className="absolute top-12 left-6 md:left-16 z-20 flex items-center gap-4">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
          {siteConfig.story.whatYouChanged.chapter}
        </span>
        <div className="w-12 h-[1px] bg-bronze/30" />
      </div>

      {/* Center Container for Stacked Cinematic Statements */}
      <div
        ref={statementsRef}
        className="relative w-full max-w-5xl h-full flex items-center justify-center text-center"
      >
        {siteConfig.story.whatYouChanged.lines.map((line, idx) => {
          const isClimax = idx === siteConfig.story.whatYouChanged.lines.length - 1;
          return (
            <div
              key={idx}
              className={`statement-block absolute inset-0 flex flex-col items-center justify-center p-6`}
            >
              <h2
                className={`font-serif font-light text-ivory tracking-tight uppercase leading-[1.02] ${
                  isClimax
                    ? "display-large text-ivory drop-shadow-2xl"
                    : "text-3xl md:text-6xl lg:text-7xl text-ivory/90"
                }`}
              >
                {line.split("\n").map((part, pIdx) => (
                  <span key={pIdx} className="block">
                    {part}
                  </span>
                ))}
              </h2>

              {isClimax && (
                <div className="mt-8 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-bronze" />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-bronze">
                    MY STORY // FOREVER
                  </span>
                  <span className="w-8 h-[1px] bg-bronze" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Dots on Left */}
      <div className="absolute bottom-12 left-6 md:left-16 z-20 flex items-center gap-2">
        <span className="text-[9px] font-mono tracking-widest text-ivory/40 uppercase">
          READ SLOWLY
        </span>
      </div>
    </section>
  );
}
