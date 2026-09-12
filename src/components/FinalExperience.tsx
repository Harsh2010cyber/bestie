"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function FinalExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const statement1Ref = useRef<HTMLHeadingElement>(null);
  const statement2Ref = useRef<HTMLHeadingElement>(null);
  const punjabiRef = useRef<HTMLHeadingElement>(null);
  const fadeLinesRef = useRef<HTMLDivElement>(null);
  const favoriteRef = useRef<HTMLHeadingElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);

  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Image emerges from absolute darkness
      gsap.fromTo(
        imageBoxRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(12px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageBoxRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Statement 1: "THANK YOU FOR EXISTING IN MY STORY."
      if (statement1Ref.current) {
        gsap.fromTo(
          statement1Ref.current,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement1Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Statement 2: "YOU MADE LIFE A LITTLE BRIGHTER."
      if (statement2Ref.current) {
        gsap.fromTo(
          statement2Ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement2Ref.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Punjabi statement: "ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦੇ ਇਸ ਸੋਹਣੇ ਹਿੱਸੇ ਲਈ — ਦਿਲੋਂ ਧੰਨਵਾਦ।"
      if (punjabiRef.current) {
        gsap.fromTo(
          punjabiRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: punjabiRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Fade lines: "Some memories fade. Some people don't."
      if (fadeLinesRef.current) {
        gsap.fromTo(
          fadeLinesRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fadeLinesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 6. Favorite memory
      if (favoriteRef.current) {
        gsap.fromTo(
          favoriteRef.current,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: favoriteRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 7. Ending Block
      if (endingRef.current) {
        gsap.fromTo(
          endingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: endingRef.current,
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
      id="final-experience"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050507] pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Chapter Marker */}
      <div className="mb-14 md:mb-20 flex items-center gap-4">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
          {siteConfig.story.finalExperience.chapter}
        </span>
        <div className="w-12 h-[1px] bg-bronze/30" />
      </div>

      {/* Emerging Strong Portrait of Her */}
      <div
        ref={imageBoxRef}
        className="relative w-full max-w-lg aspect-[4/5] bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] mb-20 md:mb-28 group"
        data-cursor="image"
        data-cursor-label="FOREVER"
        onMouseEnter={() => setCursor("image", "FOREVER")}
        onMouseLeave={() => resetCursor()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.media.photo01}
          alt={siteConfig.bestie.name}
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-ivory/60 uppercase">
          <span>PORTRAIT // ARCHIVE</span>
          <span>{siteConfig.bestie.specialDate}</span>
        </div>
      </div>

      {/* Main Climactic Text Block */}
      <div className="max-w-4xl text-center space-y-12 md:space-y-18">
        {/* Statement 1 */}
        <h2
          ref={statement1Ref}
          className="display-large font-serif font-light text-ivory tracking-tight uppercase leading-[0.98] drop-shadow-2xl whitespace-pre-line"
        >
          {siteConfig.story.finalExperience.statement1}
        </h2>

        {/* Statement 2 */}
        <h3
          ref={statement2Ref}
          className="text-2xl md:text-5xl font-serif italic text-bronze-light font-light tracking-wide whitespace-pre-line"
        >
          “{siteConfig.story.finalExperience.statement2}”
        </h3>

        {/* Punjabi Statement */}
        <div className="pt-6 pb-4">
          <h4
            ref={punjabiRef}
            className="text-2xl md:text-4xl lg:text-5xl font-punjabi text-ivory/95 font-normal leading-relaxed whitespace-pre-line"
          >
            {siteConfig.story.finalExperience.punjabiStatement}
          </h4>
        </div>

        {/* Dual Sentences: "Some memories fade. Some people don't." */}
        <div
          ref={fadeLinesRef}
          className="pt-10 space-y-3 font-serif text-lg md:text-2xl text-ivory-subtle font-light tracking-wide"
        >
          <p className="italic text-ivory/50">{siteConfig.story.finalExperience.fadeLine1}</p>
          <p className="text-ivory font-medium">{siteConfig.story.finalExperience.fadeLine2}</p>
        </div>

        {/* Grand Final Declaration */}
        <div className="pt-14 md:pt-20">
          <h2
            ref={favoriteRef}
            className="display-medium font-serif font-light text-ivory tracking-tight uppercase leading-tight whitespace-pre-line"
          >
            {siteConfig.story.finalExperience.favoriteMemory}
          </h2>
        </div>
      </div>

      {/* ================= CINEMATIC ENDING / FOOTER ================= */}
      <div
        ref={endingRef}
        className="w-full max-w-2xl mt-36 md:mt-52 pt-20 border-t border-white/[0.08] flex flex-col items-center text-center"
      >
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-ivory/50 mb-8 whitespace-pre-line">
          {siteConfig.story.ending.tinyPre}
        </p>

        <h1 className="display-large font-serif font-light tracking-tight text-ivory uppercase mb-12 drop-shadow-2xl">
          {siteConfig.story.ending.thankYou}
        </h1>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-bronze to-transparent mb-8" />

        <p className="text-xs md:text-sm font-sans tracking-widest text-ivory/40 font-light lowercase">
          {siteConfig.story.ending.bottomNote}
        </p>

        {/* Back to top smooth button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
          className="mt-12 text-[9px] font-mono tracking-[0.3em] uppercase text-bronze hover:text-ivory transition-colors border-b border-bronze/40 hover:border-ivory pb-1"
          data-cursor="button"
          data-cursor-label="TOP"
        >
          BACK TO BEGINNING ↑
        </button>
      </div>
    </section>
  );
}
