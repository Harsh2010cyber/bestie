"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCursor } from "./CustomCursor";

interface WidgetTilt {
  rx: number;
  ry: number;
}

export default function FloatingGlassWidgets() {
  const { setCursor, resetCursor } = useCursor();
  const [tilts, setTilts] = useState<{ [key: string]: WidgetTilt }>({});
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // 3D Parallax Mouse Tilt Handler for widgets
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 12; // tilt X
    const ry = (x / (rect.width / 2)) * 12; // tilt Y
    setTilts((prev) => ({ ...prev, [id]: { rx, ry } }));
  };

  const handleMouseLeave = (id: string) => {
    setTilts((prev) => ({ ...prev, [id]: { rx: 0, ry: 0 } }));
    resetCursor();
  };

  const triggerSparkle = (e: React.MouseEvent) => {
    const newSpark = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setSparks((prev) => [...prev.slice(-10), newSpark]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1000);
  };

  const getTransform = (id: string, baseRotation: number = 0) => {
    const tilt = tilts[id] || { rx: 0, ry: 0 };
    return `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${baseRotation}deg) translateZ(12px)`;
  };

  return (
    <>
      {/* Click Sparkle Bursts */}
      {sparks.map((s) => (
        <div
          key={s.id}
          className="fixed pointer-events-none z-[99999] flex items-center justify-center animate-ping"
          style={{ top: s.y - 12, left: s.x - 12 }}
        >
          <span className="text-xl">✨</span>
        </div>
      ))}

      {/* ====================================================
          WIDGET 1: FRIENDSHIP COORDINATES & LIVE STATUS
          Position: Floating upper-left area
      ==================================================== */}
      <div className="absolute top-[110vh] left-6 md:left-14 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w1")}
          onMouseLeave={() => handleMouseLeave("w1")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "STATUS")}
          className="group relative rounded-2xl p-3.5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:border-bronze/50 hover:bg-white/[0.07] animate-float-slow"
          style={{
            transform: getTransform("w1", -2),
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[9px] font-mono tracking-widest text-ivory/80 uppercase">
              LIVE BESTIE ARCHIVE
            </span>
          </div>
          <div className="text-[11px] font-mono text-bronze-light font-medium">
            31° 19&apos; 12&quot; N • 75° 23&apos; 45&quot; E
          </div>
          <div className="mt-1 flex items-center justify-between text-[8px] font-mono text-ivory/50 uppercase tracking-wider border-t border-white/10 pt-1.5">
            <span>SOULMATE BOND</span>
            <span className="text-emerald-400 font-semibold">100% PURE</span>
          </div>
        </div>
      </div>

      {/* ====================================================
          WIDGET 2: AMBIENT SOUND EQUALIZER CAPSULE
          Position: Floating right side near memories
      ==================================================== */}
      <div className="absolute top-[230vh] right-6 md:right-16 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w2")}
          onMouseLeave={() => handleMouseLeave("w2")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "SOUND")}
          className="group relative rounded-2xl p-3 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:border-amber-sunset/50 hover:bg-white/[0.07] animate-float-slow"
          style={{
            transform: getTransform("w2", 2.5),
            animationDelay: "-2.5s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-0.5 h-4 w-5">
              <span className="w-1 bg-amber-sunset rounded-full animate-[bounce_1.2s_infinite]" style={{ height: "60%" }} />
              <span className="w-1 bg-amber-sunset rounded-full animate-[bounce_0.8s_infinite_0.2s]" style={{ height: "100%" }} />
              <span className="w-1 bg-amber-sunset rounded-full animate-[bounce_1.4s_infinite_0.4s]" style={{ height: "40%" }} />
              <span className="w-1 bg-amber-sunset rounded-full animate-[bounce_1.0s_infinite_0.1s]" style={{ height: "80%" }} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-ivory/90 font-medium">
                Gymnopédie No. 1
              </div>
              <div className="text-[8px] font-mono text-ivory/50 tracking-wider uppercase">
                432Hz Ambient Heartbeat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          WIDGET 3: BESTIE VIBE CHECK METER
          Position: Floating left side near What You Changed
      ==================================================== */}
      <div className="absolute top-[410vh] left-6 md:left-20 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w3")}
          onMouseLeave={() => handleMouseLeave("w3")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "VIBES")}
          className="group relative rounded-2xl p-3.5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:border-bronze/50 hover:bg-white/[0.07] animate-float-slow"
          style={{
            transform: getTransform("w3", -3),
            animationDelay: "-5s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[9px] font-mono text-ivory/70 uppercase tracking-widest">
              VIBE METER
            </span>
            <span className="text-xs">✨</span>
          </div>
          <div className="text-sm font-serif italic text-ivory font-light">
            “Infinite Warmth &amp; Smiles”
          </div>
          <div className="mt-2 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-bronze via-amber-sunset to-rose-400 h-full w-[99%]" />
          </div>
          <div className="mt-1 flex items-center justify-between text-[8px] font-mono text-ivory/40 uppercase">
            <span>MEASURED</span>
            <span className="text-bronze">OFF THE CHARTS</span>
          </div>
        </div>
      </div>

      {/* ====================================================
          WIDGET 4: PUNJABI SOUL FRAGMENT NOTE
          Position: Floating right side near Punjabi letter
      ==================================================== */}
      <div className="absolute top-[520vh] right-6 md:right-24 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w4")}
          onMouseLeave={() => handleMouseLeave("w4")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "ਦਿਲ ਦੀ ਗੱਲ")}
          className="group relative rounded-2xl p-4 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 hover:border-bronze/50 hover:bg-white/[0.07] animate-float-slow max-w-xs"
          style={{
            transform: getTransform("w4", 3.5),
            animationDelay: "-1.5s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="text-[9px] font-mono text-bronze uppercase tracking-widest">
              ਦਿਲ ਦੀਆਂ ਗੱਲਾਂ // ARCHIVE
            </span>
            <span className="text-xs text-rose-400">❤️</span>
          </div>
          <p className="font-punjabi text-sm text-ivory/90 leading-relaxed">
            ਤੂੰ ਮੇਰੀਆਂ ਯਾਦਾਂ ਦੀ ਸਭ ਤੋਂ ਸੋਹਣੀ ਕਿਤਾਬ ਐਂ।
          </p>
          <div className="mt-2 text-[8px] font-serif italic text-ivory/50">
            The sweetest chapter of my memories
          </div>
        </div>
      </div>

      {/* ====================================================
          WIDGET 5: TIME CAPSULE & SNAPSHOT COUNTER
          Position: Floating left side near Photo Wall / Everything
      ==================================================== */}
      <div className="absolute top-[670vh] left-6 md:left-16 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w5")}
          onMouseLeave={() => handleMouseLeave("w5")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "ARCHIVE")}
          className="group relative rounded-2xl p-3.5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:border-bronze/50 hover:bg-white/[0.07] animate-float-slow"
          style={{
            transform: getTransform("w5", -2),
            animationDelay: "-3.5s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs">📸</span>
            <span className="text-[9px] font-mono text-ivory/70 uppercase tracking-widest">
              SNAPCHAT VAULT
            </span>
          </div>
          <div className="text-xs font-mono font-medium text-ivory">
            11 Captured Memories • ∞ To Come
          </div>
          <div className="mt-1 text-[8px] font-mono text-bronze tracking-wider uppercase">
            CURATED WITH LOVE
          </div>
        </div>
      </div>

      {/* ====================================================
          WIDGET 6: ETERNAL BOND MEDALLION
          Position: Floating right side near Finale
      ==================================================== */}
      <div className="absolute top-[820vh] right-8 md:right-28 z-20 pointer-events-auto">
        <div
          onMouseMove={(e) => handleMouseMove(e, "w6")}
          onMouseLeave={() => handleMouseLeave("w6")}
          onClick={triggerSparkle}
          onMouseEnter={() => setCursor("button", "FOREVER")}
          className="group relative rounded-3xl p-4 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-bronze/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-300 hover:border-bronze hover:scale-105 animate-float-slow text-center"
          style={{
            transform: getTransform("w6", 2),
            animationDelay: "-6s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="text-2xl mb-1">🌹💍</div>
          <div className="text-xs font-serif font-semibold tracking-wider text-ivory uppercase">
            RASMALI &amp; ME
          </div>
          <div className="text-[8px] font-mono text-bronze tracking-widest uppercase mt-0.5">
            2024 — FOREVER
          </div>
        </div>
      </div>
    </>
  );
}
