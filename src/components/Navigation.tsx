"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig } from "../config/siteConfig";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navigation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        if (progressLineRef.current) {
          progressLineRef.current.style.transform = `scaleY(${self.progress})`;
        }
      },
    });

    return () => st.kill();
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy prevented playback until user gesture
          setIsPlaying(false);
        });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={siteConfig.media.ambientAudio}
        loop
        preload="auto"
      />

      {/* Floating Top Minimal Navigation */}
      <header className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 md:py-8 flex items-center justify-between pointer-events-none transition-opacity duration-500">
        {/* Monogram / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="pointer-events-auto group flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors"
          data-cursor="button"
          data-cursor-label="HOME"
        >
          <span className="font-serif text-sm md:text-base tracking-[0.2em] font-medium">
            {siteConfig.bestie.name}
          </span>
          <span className="w-1 h-1 rounded-full bg-bronze/70 group-hover:scale-150 transition-transform" />
        </a>

        {/* Minimal Editorial Links */}
        <nav className="pointer-events-auto backdrop-blur-md bg-dark/40 border border-white/10 rounded-full px-5 py-2 flex items-center gap-5 md:gap-7 shadow-2xl opacity-70 hover:opacity-100 transition-opacity duration-300">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/70 hover:text-ivory transition-colors"
            data-cursor="button"
          >
            HER
          </a>
          <a
            href="#memory-scroll"
            onClick={(e) => handleNavClick(e, "#memory-scroll")}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/70 hover:text-ivory transition-colors"
            data-cursor="button"
          >
            MEMORIES
          </a>
          <a
            href="#her-video"
            onClick={(e) => handleNavClick(e, "#her-video")}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/70 hover:text-ivory transition-colors"
            data-cursor="button"
          >
            VIDEO
          </a>
          <a
            href="#what-you-changed"
            onClick={(e) => handleNavClick(e, "#what-you-changed")}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/70 hover:text-ivory transition-colors"
            data-cursor="button"
          >
            WORDS
          </a>
          <a
            href="#punjabi-letter"
            onClick={(e) => handleNavClick(e, "#punjabi-letter")}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bronze-light hover:text-bronze transition-colors hidden sm:inline-block"
            data-cursor="button"
          >
            ਦਿਲ ਤੋਂ
          </a>
        </nav>

        {/* Audio Ambient Toggle Button */}
        <button
          onClick={toggleAudio}
          type="button"
          aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/10 bg-dark/40 backdrop-blur-md text-ivory/70 hover:text-ivory transition-all duration-300 group"
          data-cursor="button"
          data-cursor-label={isPlaying ? "MUTE" : "MUSIC"}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] hidden sm:inline-block text-ivory/60 group-hover:text-ivory">
            {isPlaying ? "SOUND ON" : "SOUND"}
          </span>
          <div className="flex items-center gap-[2px] h-3">
            {isPlaying ? (
              <>
                <span className="w-[2px] h-3 bg-bronze animate-pulse" />
                <span className="w-[2px] h-2 bg-bronze animate-pulse delay-75" />
                <span className="w-[2px] h-3.5 bg-bronze animate-pulse delay-150" />
                <span className="w-[2px] h-1.5 bg-bronze animate-pulse" />
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-ivory/50 group-hover:text-ivory" />
            )}
          </div>
        </button>
      </header>

      {/* Vertical Scroll Progress Bar (Right Edge) */}
      <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[490] flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[8px] font-mono tracking-widest text-ivory/40 uppercase rotate-90 origin-center translate-y-3">
          {Math.round(scrollProgress * 100)}%
        </span>
        <div className="w-[1px] h-24 md:h-32 bg-white/10 overflow-hidden relative rounded-full">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-b from-bronze to-amber-sunset origin-top transition-transform duration-75 ease-out"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
      </div>
    </>
  );
}
