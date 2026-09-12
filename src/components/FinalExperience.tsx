"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "../config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";
import { Heart, Sparkles, Check, Send } from "lucide-react";

export default function FinalExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const statement1Ref = useRef<HTMLHeadingElement>(null);
  const statement2Ref = useRef<HTMLHeadingElement>(null);
  const punjabiRef = useRef<HTMLHeadingElement>(null);
  const fadeLinesRef = useRef<HTMLDivElement>(null);
  const favoriteRef = useRef<HTMLHeadingElement>(null);
  const endingRef = useRef<HTMLDivElement>(null);

  // Proposal State
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [maybeAttempts, setMaybeAttempts] = useState(0);
  const [maybePos, setMaybePos] = useState({ x: 0, y: 0 });
  const celebrationCanvasRef = useRef<HTMLCanvasElement>(null);

  const { setCursor, resetCursor } = useCursor();

  // GSAP Scroll Triggers
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

      // 2. Statement 1
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

      // 3. Statement 2
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

      // 4. Punjabi statement
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

      // 5. Fade lines
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Web Audio chime generator
  const playRomanticChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.14);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.14 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.14);
        osc.stop(ctx.currentTime + idx * 0.14 + 1.2);
      });
    } catch {
      // AudioContext might be blocked until user gesture, ignore silently
    }
  };

  // Celebration Fireworks / Golden Stardust Animation
  useEffect(() => {
    if (!hasAccepted || !celebrationCanvasRef.current) return;

    const canvas = celebrationCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      isHeart?: boolean;
      rot: number;
      rotSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = ["#d4af37", "#f3e5ab", "#c59b6d", "#ff758f", "#ff4d6d", "#ffffff"];

    // Spawn 180 particles
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 + 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 3 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.006 + Math.random() * 0.012,
        isHeart: Math.random() > 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;
        p.rot += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isHeart) {
          // Draw mini heart
          const s = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.3, s * 0.3, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.3, s * 0.3, s, -s * 0.6, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw diamond petal
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [hasAccepted]);

  // Handle Playful "Let me think" dodge
  const handleMaybeDodge = () => {
    setMaybeAttempts((prev) => prev + 1);
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    setMaybePos({ x: randomX, y: randomY });
  };

  const handleAccept = () => {
    setHasAccepted(true);
    playRomanticChime();
  };

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

      {/* ========================================================================= */}
      {/* 🌹 THE ULTIMATE CONFESSION: "CAN YOU BE MY GF?" UNIQUE ANIMATED EXPERIENCE */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-2xl mt-28 md:mt-36 flex flex-col items-center">
        {/* Ambient Glow Aura */}
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-900/20 via-bronze/25 to-rose-900/20 rounded-3xl blur-3xl opacity-75 pointer-events-none animate-pulse" />

        {/* Floating Proposal Card */}
        <div className="relative w-full rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20 p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.8)] text-center overflow-hidden transition-all duration-700 hover:border-bronze/60">
          {/* Subtle Top Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-bronze uppercase mb-6">
            <Sparkles className="w-3 h-3 text-bronze animate-spin" />
            <span>ONE UNWRITTEN QUESTION</span>
          </div>

          {!isQuestionOpen ? (
            /* Sealed Envelope / Locked Teaser State */
            <div className="flex flex-col items-center space-y-6 py-4">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-950 via-rose-800 to-amber-600 flex items-center justify-center shadow-[0_0_40px_rgba(200,40,70,0.4)] border border-rose-400/30 group">
                <Heart className="w-9 h-9 text-white animate-pulse" />
                <div className="absolute -inset-1 rounded-full border border-dashed border-bronze/40 animate-spin" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-xl md:text-2xl font-serif text-ivory uppercase tracking-wider font-light">
                  I have one last question for you…
                </h3>
                <p className="text-xs md:text-sm font-serif italic text-ivory/60">
                  “The one I’ve been keeping quietly in my heart since the first laugh we shared.”
                </p>
              </div>

              <button
                onClick={() => {
                  setIsQuestionOpen(true);
                  playRomanticChime();
                }}
                className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-bronze via-[#dfb788] to-bronze text-dark font-semibold text-xs md:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(197,155,109,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                data-cursor="button"
                data-cursor-label="OPEN 🌹"
              >
                TOUCH TO UNVEIL ✨
              </button>
            </div>
          ) : !hasAccepted ? (
            /* Open Proposal Animated State */
            <div className="flex flex-col items-center space-y-8 py-2 animate-in fade-in duration-700">
              {/* Blooming Rose Motif */}
              <div className="flex items-center justify-center gap-3 text-2xl">
                <span className="animate-bounce">🌹</span>
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-bronze">
                  FOR RASMALI
                </span>
                <span className="animate-bounce">🌹</span>
              </div>

              {/* The Grand Question */}
              <div className="space-y-4 max-w-lg">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-ivory uppercase tracking-tight leading-none drop-shadow-2xl">
                  CAN YOU BE MY GF?
                </h2>
                <div className="text-lg md:text-2xl font-punjabi text-bronze-light font-normal">
                  ਕੀ ਤੂੰ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਹਮਸਫ਼ਰ ਬਣੇਂਗੀ?
                </div>
                <p className="text-xs md:text-sm font-serif italic text-ivory/70 max-w-sm mx-auto leading-relaxed pt-2">
                  Not just for the good days, but for every ordinary, chaotic, and beautiful day ahead.
                </p>
              </div>

              {/* Interactive Response Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative w-full">
                {/* YES Option 1 */}
                <button
                  onClick={handleAccept}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 text-white font-semibold text-xs md:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(230,50,80,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-rose-300/40"
                  data-cursor="button"
                  data-cursor-label="YES! 🌹"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>YES, OF COURSE 🌹</span>
                </button>

                {/* YES Option 2 */}
                <button
                  onClick={handleAccept}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-bronze via-[#e0bb8b] to-bronze text-dark font-semibold text-xs md:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(197,155,109,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2"
                  data-cursor="button"
                  data-cursor-label="YES! ✨"
                >
                  <Sparkles className="w-4 h-4 text-dark fill-dark" />
                  <span>A MILLION TIMES YES ✨</span>
                </button>

                {/* Playful Dodging Option */}
                {maybeAttempts < 4 ? (
                  <button
                    onMouseEnter={handleMaybeDodge}
                    onTouchStart={handleMaybeDodge}
                    onClick={handleMaybeDodge}
                    style={{
                      transform: `translate(${maybePos.x}px, ${maybePos.y}px)`,
                      transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-ivory/40 hover:text-ivory transition-colors cursor-pointer"
                  >
                    {maybeAttempts === 0
                      ? "Let me think… 😉"
                      : maybeAttempts === 1
                      ? "Wait, not so fast! 🏃‍♀️"
                      : maybeAttempts === 2
                      ? "Still trying? Haha! 💖"
                      : "Only YES is allowed! ✨"}
                  </button>
                ) : (
                  <div className="text-[10px] font-mono text-bronze uppercase tracking-widest animate-pulse">
                    (The universe only accepts YES! ❤️)
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Celebration State after she says YES */
            <div className="flex flex-col items-center space-y-6 py-6 animate-in zoom-in-95 duration-700">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-3">
                <div className="text-2xl md:text-4xl font-serif text-ivory tracking-wide uppercase font-light">
                  SHE SAID YES! 🌹💍
                </div>
                <div className="text-base md:text-xl font-punjabi text-bronze-light">
                  ਤੂੰ ਮੇਰੀ ਦੁਨੀਆ ਬਣ ਗਈ ਏਂ।
                </div>
                <p className="text-xs md:text-sm font-serif italic text-ivory/80 max-w-md mx-auto pt-1 leading-relaxed">
                  “From best friends to forever. I promise to cherish every conversation, protect every smile, and be right beside you through it all.”
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-bronze uppercase">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span>OFFICIALLY MINE // FOREVER & ALWAYS</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Stardust / Petal Celebration Canvas */}
      {hasAccepted && (
        <canvas
          ref={celebrationCanvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        />
      )}

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
