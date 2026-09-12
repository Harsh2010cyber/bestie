"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "../config/siteConfig";

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // Initial states
      gsap.set(textRef.current, { opacity: 0, y: 18, filter: "blur(4px)" });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
      gsap.set(subtextRef.current, { opacity: 0 });

      // Choreographed cinematic preloader (1.6s total)
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.65,
            ease: "power2.inOut",
          },
          "-=0.15"
        )
        .to(
          subtextRef.current,
          {
            opacity: 0.7,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to([textRef.current, lineRef.current, subtextRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          delay: 0.25,
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: "expo.inOut",
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#060608] text-ivory pointer-events-auto select-none"
    >
      <div className="flex flex-col items-center max-w-xs text-center px-6">
        <h1
          ref={textRef}
          className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-ivory font-light uppercase"
        >
          {siteConfig.story.hero.mainTitle}
        </h1>

        <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-bronze to-transparent my-4">
          <div ref={lineRef} className="w-full h-full bg-bronze" />
        </div>

        <p
          ref={subtextRef}
          className="text-[10px] font-sans tracking-[0.3em] uppercase text-ivory/60"
        >
          loading memories…
        </p>
      </div>
    </div>
  );
}
