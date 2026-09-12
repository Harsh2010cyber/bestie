"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import { useCursor } from "./CustomCursor";

export default function VideoMemory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Expanding masked window as user scrolls into video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      tl.fromTo(
        videoWrapperRef.current,
        {
          clipPath: "inset(12% 10% 12% 10%)",
          scale: 0.94,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "none",
        },
        0
      );

      // Subtle scale change inside video
      tl.fromTo(
        videoRef.current,
        { scale: 1.18 },
        { scale: 1.02, ease: "none" },
        0
      );

      // Opposite typography movement
      tl.fromTo(
        topTextRef.current,
        { y: 30, opacity: 0.8 },
        { y: -30, opacity: 1, ease: "none" },
        0
      );

      tl.fromTo(
        bottomTextRef.current,
        { y: -20, opacity: 0.7 },
        { y: 25, opacity: 1, ease: "none" },
        0
      );

      // Autoplay / Pause video based on viewport visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        },
        onLeave: () => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        },
        onEnterBack: () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        },
        onLeaveBack: () => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="her-video"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050507] py-28 md:py-36 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Chapter Marker */}
      <div className="mb-8 md:mb-12 flex items-center gap-4">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-bronze">
          {siteConfig.story.herVideo.chapter}
        </span>
        <div className="w-12 h-[1px] bg-bronze/30" />
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ivory/40">
          {siteConfig.story.herVideo.tag}
        </span>
      </div>

      {/* Top Small Line: "ONE MOMENT. A THOUSAND FEELINGS." */}
      <div ref={topTextRef} className="text-center mb-10 md:mb-14 max-w-xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-ivory uppercase tracking-tight leading-snug whitespace-pre-line">
          {siteConfig.story.herVideo.heading}
        </h2>
      </div>

      {/* Expanding Cinematic Video Frame */}
      <div
        ref={videoWrapperRef}
        className="relative w-full max-w-5xl aspect-video md:aspect-[21/9] bg-black overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] will-change-[clip-path,transform] group"
        data-cursor="video"
        data-cursor-label={isPlaying ? "WATCHING" : "PLAY"}
        onMouseEnter={() => setCursor("video", isPlaying ? "WATCHING" : "PLAY")}
        onMouseLeave={() => resetCursor()}
      >
        <video
          ref={videoRef}
          src={siteConfig.media.herVideo}
          muted={isMuted}
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95"
          preload="metadata"
        />

        {/* Cinematic Letterbox Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Minimal Audio Control Pill */}
        <button
          onClick={toggleMute}
          type="button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark/70 backdrop-blur-md border border-white/15 text-ivory/80 hover:text-ivory hover:border-bronze transition-all"
          data-cursor="button"
          data-cursor-label={isMuted ? "UNMUTE" : "MUTE"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-ivory/60" />
              <span className="text-[9px] font-mono tracking-widest uppercase">MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-bronze" />
              <span className="text-[9px] font-mono tracking-widest uppercase text-bronze">SOUND ON</span>
            </>
          )}
        </button>
      </div>

      {/* After the video: Emotional Reflection */}
      <div ref={bottomTextRef} className="mt-12 md:mt-16 text-center max-w-lg px-4">
        <p className="font-serif italic text-lg md:text-2xl text-ivory-muted font-light leading-relaxed">
          “{siteConfig.story.herVideo.subquote}”
        </p>
        <div className="mt-4 text-[10px] font-mono tracking-[0.3em] uppercase text-bronze/60">
          IMMORTALIZED IN TIME
        </div>
      </div>
    </section>
  );
}
