"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function HorizontalMemoryGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Subtle parallax on individual memory fragments
      const items = track.querySelectorAll(".memory-fragment");
      items.forEach((item, index) => {
        const img = item.querySelector(".memory-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.92, y: index % 2 === 0 ? -15 : 15 },
            {
              scale: 1.05,
              y: index % 2 === 0 ? 15 : -15,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="memory-scroll"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#070709] overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Top Section Header */}
      <div className="absolute top-10 md:top-14 left-6 md:left-16 z-20 flex items-center gap-4">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
          {siteConfig.story.memoryScroll.chapter}
        </span>
        <div className="w-12 h-[1px] bg-bronze/30" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-ivory/50">
          {siteConfig.story.memoryScroll.sectionTitle}
        </span>
      </div>

      {/* Horizontal Pin Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full pl-6 md:pl-20 pr-24 md:pr-40 gap-12 md:gap-24 will-change-transform"
      >
        {/* Intro Exhibition Title Card */}
        <div className="flex-shrink-0 w-[280px] md:w-[420px] flex flex-col justify-center">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-bronze/80 mb-3">
            EXHIBITION // 03
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-ivory uppercase tracking-tight leading-tight">
            FRAGMENTS <br />
            OF PURE <br />
            <span className="italic text-bronze-light">HAPPINESS.</span>
          </h2>
          <p className="mt-6 text-sm text-ivory-subtle font-sans font-light leading-relaxed max-w-sm">
            Each picture is a timestamp of time standing still. Unscripted, effortless, and timeless.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-ivory/40 uppercase">
            <span>SCROLL HORIZONTALLY</span>
            <span className="text-bronze">→</span>
          </div>
        </div>

        {/* Memory Fragments */}
        {siteConfig.story.memoryScroll.memories.map((mem, idx) => (
          <div
            key={mem.id}
            className="memory-fragment flex-shrink-0 relative group flex flex-col justify-center"
            style={{
              transform: `rotate(${mem.rotation || 0}deg)`,
            }}
            data-cursor="gallery"
            data-cursor-label="FRAGMENT"
            onMouseEnter={() => setCursor("gallery", "FRAGMENT")}
            onMouseLeave={() => resetCursor()}
          >
            {/* Archival Film Frame Card */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[420px] bg-dark-surface/90 border border-white/10 p-3.5 md:p-4 rounded-sm shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Image Frame with Film Edge */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-black rounded-[1px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="memory-img w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 transition-all duration-700 ease-out group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-30 pointer-events-none" />
              </div>

              {/* Memory Fragment Metadata */}
              <div className="mt-4 flex flex-col">
                <div className="flex items-center justify-between text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-bronze uppercase">
                  <span>MOMENT {String(idx + 1).padStart(2, "0")}</span>
                  <span>{mem.date || "ARCHIVE"}</span>
                </div>

                <h3 className="mt-2 font-serif text-lg md:text-2xl text-ivory uppercase tracking-wide">
                  {mem.title}
                </h3>

                <p className="mt-1 font-sans text-xs md:text-sm text-ivory-subtle font-light leading-relaxed">
                  {mem.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Closing Grand Statement Card */}
        <div className="flex-shrink-0 w-[320px] md:w-[540px] flex flex-col justify-center pr-12 md:pr-24">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-bronze/70 mb-4">
            CHAPTER END // 03
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-ivory uppercase leading-tight tracking-tight whitespace-pre-line">
            {siteConfig.story.memoryScroll.closingStatement}
          </h3>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-bronze" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ivory/50">
              AND THE BEST ARE YET TO COME
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
