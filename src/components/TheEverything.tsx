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
      <div className="max-w-5xl flex flex-col items-center">
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
