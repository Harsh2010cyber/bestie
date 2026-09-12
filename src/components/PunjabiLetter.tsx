"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function PunjabiLetter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const finalStatementRef = useRef<HTMLDivElement>(null);
  const closingLineRef = useRef<HTMLDivElement>(null);

  const [showTranslations, setShowTranslations] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading entrance
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Individual letter lines reveal
      const lines = letterRef.current?.querySelectorAll(".punjabi-line-item");
      if (lines) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 45, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: letterRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Final Punjabi statement
      if (finalStatementRef.current) {
        gsap.fromTo(
          finalStatementRef.current,
          { opacity: 0, scale: 0.95, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: finalStatementRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Closing line
      if (closingLineRef.current) {
        gsap.fromTo(
          closingLineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingLineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="punjabi-letter"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#08080A] py-32 md:py-44 px-6 md:px-16 lg:px-28 overflow-hidden select-none"
    >
      {/* Chapter Marker */}
      <div className="mb-14 md:mb-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
            {siteConfig.story.punjabiLetter.chapter}
          </span>
          <div className="w-16 h-[1px] bg-bronze/30" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">
            PUNJABI ARCHIVE
          </span>
        </div>

        {/* Translation Toggle Pill */}
        <button
          onClick={() => setShowTranslations(!showTranslations)}
          className="text-[9px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-ivory/60 hover:text-ivory hover:border-bronze transition-all"
          data-cursor="button"
          data-cursor-label="TOGGLE"
        >
          {showTranslations ? "Hide Meanings" : "View Meanings"}
        </button>
      </div>

      {/* Main Punjabi Heading: "ਕੁਝ ਗੱਲਾਂ ਦਿਲ ਤੋਂ…" */}
      <div className="max-w-4xl mb-16 md:mb-24">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-punjabi font-normal text-ivory leading-tight tracking-wide"
        >
          {siteConfig.story.punjabiLetter.heading}
        </h2>
        <p className="mt-4 text-xs font-mono tracking-[0.25em] uppercase text-bronze/70">
          {siteConfig.story.punjabiLetter.subtitle}
        </p>
      </div>

      {/* Main Content: 2-Column Grid with Poetic Lines & Editorial Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Editorial Letter Lines (Left) */}
        <div
          ref={letterRef}
          className="lg:col-span-7 space-y-12 md:space-y-16 pl-4 md:pl-8 border-l border-bronze/20"
        >
          {siteConfig.story.punjabiLetter.lines.map((item, idx) => (
            <div key={idx} className="punjabi-line-item group">
              <span className="block text-[10px] font-mono tracking-[0.25em] text-bronze/50 mb-2">
                0{idx + 1}
              </span>
              <p className="font-punjabi text-xl md:text-2xl lg:text-3xl text-ivory/90 leading-relaxed group-hover:text-ivory transition-colors">
                “{item.text}”
              </p>
              {showTranslations && (
                <p className="mt-2 font-serif italic text-sm md:text-base text-ivory-subtle/70 animate-fade-in">
                  {item.translation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Editorial Glass Photo Cards (Right) */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end gap-8 pt-4">
          {/* Photo 1: Radiant Portrait */}
          <div
            className="relative w-full max-w-sm aspect-[4/5] rounded-2xl p-3 bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group hover:scale-[1.02] hover:border-bronze/40 transition-all duration-500"
            style={{ transform: "rotate(1.8deg)" }}
            data-cursor="image"
            data-cursor-label="SOULMATE"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/Snapchat-908669016.jpg"
              alt="Rasmali"
              className="w-full h-[85%] object-cover rounded-xl filter contrast-[1.04] brightness-95"
            />
            <div className="h-[15%] flex items-center justify-between px-2 pt-2 text-[10px] font-mono tracking-widest text-ivory/70 uppercase">
              <span className="text-bronze font-semibold">ਹੀਰੇ ਵਾਂਗ ਚਮਕ</span>
              <span>FOREVER // 2024</span>
            </div>
            {/* Glass corner highlight */}
            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-ivory/80 uppercase">
              ਸੋਹਣੀ ਯਾਦ
            </div>
          </div>

          {/* Photo 2: Secondary Floating Candid Polaroid */}
          <div
            className="relative w-64 md:w-72 aspect-square rounded-2xl p-2.5 bg-white/[0.03] backdrop-blur-lg border border-white/10 shadow-2xl -mt-12 lg:-mr-4 group hover:scale-105 hover:z-20 transition-all duration-500"
            style={{ transform: "rotate(-3.5deg)" }}
            data-cursor="image"
            data-cursor-label="LAUGHTER"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/Snapchat-482331247.jpg"
              alt="Memory"
              className="w-full h-[82%] object-cover rounded-xl filter contrast-[1.05]"
            />
            <div className="h-[18%] flex items-center justify-between px-2 pt-1.5 text-[9px] font-mono tracking-wider text-ivory/60 uppercase">
              <span className="text-amber-sunset">ਦਿਲ ਦੀਆਂ ਗੱਲਾਂ</span>
              <span>PURE BOND</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grand Climactic Punjabi Statement */}
      <div
        ref={finalStatementRef}
        className="mt-24 md:mt-36 max-w-4xl p-8 md:p-14 bg-gradient-to-br from-dark-surface to-dark-elevated border border-bronze/25 rounded-sm shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-bronze" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-bronze mb-4 block">
          THE CORE // ਦਿਲ ਦੀ ਗੱਲ
        </span>

        <h3 className="font-punjabi text-2xl md:text-4xl lg:text-5xl text-ivory font-normal leading-relaxed whitespace-pre-line">
          {siteConfig.story.punjabiLetter.finalStatement}
        </h3>

        {showTranslations && (
          <p className="mt-6 font-serif italic text-base md:text-lg text-ivory-subtle/80 border-t border-white/10 pt-4">
            “{siteConfig.story.punjabiLetter.finalStatementTranslation}”
          </p>
        )}
      </div>

      {/* Closing Personal Note */}
      <div
        ref={closingLineRef}
        className="mt-16 md:mt-24 max-w-2xl text-right ml-auto pr-2 md:pr-4"
      >
        <p className="font-punjabi text-lg md:text-2xl text-ivory/80 leading-relaxed whitespace-pre-line">
          {siteConfig.story.punjabiLetter.closingLine}
        </p>
        {showTranslations && (
          <p className="mt-2 font-serif italic text-xs md:text-sm text-ivory/50">
            {siteConfig.story.punjabiLetter.closingLineTranslation}
          </p>
        )}
      </div>
    </section>
  );
}
