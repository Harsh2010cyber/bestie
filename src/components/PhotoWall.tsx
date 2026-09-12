"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function PhotoWall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".wall-photo-card");
      if (!items) return;

      items.forEach((item, idx) => {
        // Staggered directional entrances: top, bottom, left, right
        let startX = 0;
        let startY = 0;

        if (idx % 4 === 0) startY = 90; // from bottom
        else if (idx % 4 === 1) startX = -80; // from left
        else if (idx % 4 === 2) startY = -90; // from top
        else startX = 80; // from right

        gsap.fromTo(
          item,
          {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.94,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous parallax drift as user scrolls
        gsap.to(item, {
          yPercent: (idx % 2 === 0 ? -1 : 1) * 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="photo-wall"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#070709] py-32 md:py-48 px-6 md:px-16 overflow-hidden select-none"
    >
      {/* Chapter Marker & Editorial Intro */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
              {siteConfig.story.photoWall.chapter}
            </span>
            <div className="w-12 h-[1px] bg-bronze/30" />
          </div>
          <h2 className="display-medium font-serif font-light text-ivory uppercase tracking-tight">
            {siteConfig.story.photoWall.title}
          </h2>
        </div>
        <p className="text-xs md:text-sm font-sans text-ivory-subtle/80 max-w-xs font-light">
          {siteConfig.story.photoWall.subtitle}
        </p>
      </div>

      {/* Asymmetrical Magazine Editorial Collage */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start relative">
        {/* Photo 1 (Tall, Left Column) */}
        <div className="md:col-span-5 relative">
          <div
            className="wall-photo-card relative aspect-[3/4] bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(-1.2deg)" }}
            data-cursor="image"
            data-cursor-label="REMEMBER"
            onMouseEnter={() => setCursor("image", "REMEMBER")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[0].image}
              alt="Memory 1"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[0].caption}”
              </span>
            </div>
          </div>
        </div>

        {/* Photo 2 (Square, Center Top) */}
        <div className="md:col-span-7 md:mt-12 relative">
          <div
            className="wall-photo-card relative aspect-[4/3] bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(1.5deg)" }}
            data-cursor="image"
            data-cursor-label="MEMORIES"
            onMouseEnter={() => setCursor("image", "MEMORIES")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[1].image}
              alt="Memory 2"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[1].caption}”
              </span>
            </div>
          </div>
        </div>

        {/* Photo 3 (Wide Panorama, Center Overlapping) */}
        <div className="md:col-span-7 md:-mt-8 md:col-start-2 relative z-10">
          <div
            className="wall-photo-card relative aspect-[16/10] bg-dark-surface border border-white/15 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(-1deg)" }}
            data-cursor="image"
            data-cursor-label="TIMELESS"
            onMouseEnter={() => setCursor("image", "TIMELESS")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[2].image}
              alt="Memory 3"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[2].caption}”
              </span>
            </div>
          </div>
        </div>

        {/* Photo 4 (Tall, Right Column) */}
        <div className="md:col-span-4 md:-mt-20 relative">
          <div
            className="wall-photo-card relative aspect-[3/4] bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(2deg)" }}
            data-cursor="image"
            data-cursor-label="UNSCRIPTED"
            onMouseEnter={() => setCursor("image", "UNSCRIPTED")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[3].image}
              alt="Memory 4"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[3].caption}”
              </span>
            </div>
          </div>
        </div>

        {/* Photo 5 (Square, Bottom Left) */}
        <div className="md:col-span-5 md:mt-6 relative">
          <div
            className="wall-photo-card relative aspect-square bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(-1.8deg)" }}
            data-cursor="image"
            data-cursor-label="GOLDEN"
            onMouseEnter={() => setCursor("image", "GOLDEN")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[4].image}
              alt="Memory 5"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[4].caption}”
              </span>
            </div>
          </div>
        </div>

        {/* Photo 6 (Wide, Bottom Right) */}
        <div className="md:col-span-7 md:mt-8 relative">
          <div
            className="wall-photo-card relative aspect-[16/9] bg-dark-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl group transition-all duration-500 hover:z-30 hover:scale-[1.03] hover:border-bronze/40"
            style={{ transform: "rotate(1.2deg)" }}
            data-cursor="image"
            data-cursor-label="ETERNAL"
            onMouseEnter={() => setCursor("image", "ETERNAL")}
            onMouseLeave={() => resetCursor()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.story.photoWall.items[5].image}
              alt="Memory 6"
              className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-95 group-hover:brightness-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="font-serif italic text-sm md:text-base text-ivory-muted drop-shadow">
                “{siteConfig.story.photoWall.items[5].caption}”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
