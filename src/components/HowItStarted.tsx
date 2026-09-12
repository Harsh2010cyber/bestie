"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function HowItStarted() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const headingLinesRef = useRef<HTMLDivElement>(null);
  const revealHeadingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Masked entrance for photograph
      gsap.fromTo(
        imageWrapperRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle parallax on the inner image
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.25, yPercent: -10 },
        {
          scale: 1,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 2. Line by line heading reveal
      const headingChildren = headingLinesRef.current?.children;
      if (headingChildren) {
        gsap.fromTo(
          headingChildren,
          { y: 70, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.18,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingLinesRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Revealed heading ("But somehow, ordinary became unforgettable.")
      if (revealHeadingRef.current) {
        gsap.fromTo(
          revealHeadingRef.current,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: revealHeadingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Body paragraph & quote
      if (paragraphRef.current && quoteRef.current) {
        gsap.fromTo(
          [paragraphRef.current, quoteRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
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
      id="how-it-started"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#08080A] py-28 md:py-40 px-6 md:px-16 lg:px-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Chapter Marker */}
      <div className="mb-12 md:mb-20 flex items-center gap-4">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
          {siteConfig.story.howItStarted.chapter}
        </span>
        <div className="w-16 h-[1px] bg-bronze/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Main Huge Heading */}
          <div ref={headingLinesRef} className="overflow-hidden">
            <h2 className="display-large font-serif font-light text-ivory uppercase leading-none tracking-tight">
              IT STARTED <br />
              WITH SOMETHING <br />
              <span className="italic text-ivory/60">ORDINARY.</span>
            </h2>
          </div>

          {/* Emotional Counter-Reveal */}
          <div ref={revealHeadingRef} className="mt-10 md:mt-14 pl-4 border-l border-bronze/40">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-bronze-light font-light leading-snug">
              “But somehow, <br className="hidden sm:inline" />
              ordinary became unforgettable.”
            </h3>
          </div>

          {/* Narrative Paragraph */}
          <p
            ref={paragraphRef}
            className="mt-8 md:mt-12 text-base md:text-lg text-ivory-subtle font-sans font-light leading-relaxed max-w-xl"
          >
            {siteConfig.story.howItStarted.paragraph}
          </p>

          {/* Editorial Quote */}
          <div
            ref={quoteRef}
            className="mt-8 text-xs md:text-sm font-serif italic text-ivory/40 tracking-wide"
          >
            {siteConfig.story.howItStarted.quote}
          </div>
        </div>

        {/* Right Editorial Masked Photograph */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-sm group">
            {/* The Masked Container */}
            <div
              ref={imageWrapperRef}
              className="relative w-full h-full overflow-hidden bg-dark-surface shadow-2xl"
              data-cursor="image"
              data-cursor-label="MOMENT"
              onMouseEnter={() => setCursor("image", "MOMENT")}
              onMouseLeave={() => resetCursor()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageInnerRef}
                src={siteConfig.media.photo01}
                alt="How it started"
                className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

            {/* Film Metadata Label below photo */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-ivory/40 uppercase w-full">
              <span>{siteConfig.story.howItStarted.imageTag}</span>
              <span>EST. MEMORIES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
