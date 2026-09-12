"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function TheEverything() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const preTextRef = useRef<HTMLParagraphElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const postTextRef = useRef<HTMLHeadingElement>(null);

  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1.2,
        },
      });

      tl.fromTo(
        preTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.6, y: 0, duration: 1 }
      )
        .fromTo(
          mainTextRef.current,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 2 },
          "-=0.4"
        )
        .fromTo(
          postTextRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.8 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-everything"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050507] py-36 md:py-52 px-6 md:px-16 flex flex-col items-center justify-center text-center overflow-hidden select-none"
      onMouseEnter={() => setCursor("text")}
      onMouseLeave={() => resetCursor()}
    >
      {/* Floating Ambient Snapchat Photos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Floating Photo */}
        <div
          className="absolute top-1/4 left-4 md:left-12 lg:left-24 w-44 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl p-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl opacity-40 hover:opacity-100 transition-all duration-700 pointer-events-auto hover:scale-105 animate-float-slow hidden md:block"
          style={{ transform: "rotate(-4deg)" }}
          data-cursor="image"
          data-cursor-label="CHERISHED"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/Snapchat-324971514.jpg"
            alt="Essence 1"
            className="w-full h-[85%] object-cover rounded-xl filter contrast-[1.04]"
          />
          <div className="h-[15%] flex items-center justify-between px-1.5 pt-1.5 text-[9px] font-mono tracking-widest text-ivory/60 uppercase">
            <span className="text-bronze">THAT SMILE</span>
            <span>08 // A</span>
          </div>
        </div>

        {/* Right Floating Photo */}
        <div
          className="absolute bottom-1/4 right-4 md:right-12 lg:right-24 w-44 md:w-56 lg:w-64 aspect-[3/4] rounded-2xl p-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl opacity-40 hover:opacity-100 transition-all duration-700 pointer-events-auto hover:scale-105 animate-float-slow hidden md:block"
          style={{ transform: "rotate(4deg)", animationDelay: "-4s" }}
          data-cursor="image"
          data-cursor-label="IRREPLACEABLE"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/Snapchat-902996947.jpg"
            alt="Essence 2"
            className="w-full h-[85%] object-cover rounded-xl filter contrast-[1.04]"
          />
          <div className="h-[15%] flex items-center justify-between px-1.5 pt-1.5 text-[9px] font-mono tracking-widest text-ivory/60 uppercase">
            <span className="text-bronze">THAT ESSENCE</span>
            <span>08 // B</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl flex flex-col items-center relative z-10">
        {/* Small Text */}
        <p
          ref={preTextRef}
          className="text-xs md:text-sm font-mono tracking-[0.35em] uppercase text-ivory/60 mb-8 md:mb-12"
        >
          {siteConfig.story.theEverything.pre}
        </p>

        {/* Huge Gradual Statement */}
        <h2
          ref={mainTextRef}
          className="display-large font-serif font-light text-ivory tracking-tight uppercase leading-[0.98] drop-shadow-2xl whitespace-pre-line"
        >
          {siteConfig.story.theEverything.main}
        </h2>

        {/* Climax Statement */}
        <h3
          ref={postTextRef}
          className="mt-12 md:mt-20 text-3xl md:text-5xl lg:text-6xl font-serif italic text-bronze-light font-normal tracking-wide"
        >
          “{siteConfig.story.theEverything.post}”
        </h3>
      </div>
    </section>
  );
}
