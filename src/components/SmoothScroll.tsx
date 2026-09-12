"use client";

import React, { useEffect, useRef } from "react";
import LenisModule from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP ScrollTrigger safely
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      console.warn("GSAP registerPlugin warning:", e);
    }

    let lenisInstance: any = null;

    try {
      // Safely resolve Lenis constructor across ESM and CJS bundlers
      const LenisClass =
        typeof LenisModule === "function"
          ? LenisModule
          : (LenisModule as any)?.default || LenisModule;

      if (typeof LenisClass === "function") {
        lenisInstance = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.2,
          infinite: false,
        });

        lenisRef.current = lenisInstance;

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenisInstance.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time: number) => {
          lenisInstance.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
          gsap.ticker.remove(tickerCallback);
          if (lenisInstance) lenisInstance.destroy();
          try {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          } catch (err) {}
        };
      }
    } catch (err) {
      console.warn("Lenis initialization skipped, falling back to native scroll:", err);
    }
  }, []);

  return <div className="smooth-scroll-wrapper relative w-full">{children}</div>;
}
