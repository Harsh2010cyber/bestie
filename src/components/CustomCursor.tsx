"use client";

import React, { useEffect, useRef, useState, createContext, useContext } from "react";

type CursorType = "default" | "image" | "video" | "gallery" | "text" | "button";

interface CursorContextType {
  setCursor: (type: CursorType, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  setCursor: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export default function CustomCursor({ children }: { children?: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isTouch, setIsTouch] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Position references for lerp
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const rafId = useRef<number | null>(null);

  const setCursor = (type: CursorType, label: string = "") => {
    setCursorType(type);
    setCursorLabel(label);
  };

  const resetCursor = () => {
    setCursorType("default");
    setCursorLabel("");
  };

  useEffect(() => {
    // Check if device supports fine hover pointer
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateTouch = () => setIsTouch(!mediaQuery.matches);
    updateTouch();
    mediaQuery.addEventListener("change", updateTouch);

    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Direct placement of tiny inner dot for 0-latency tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Global inspection of hovered elements for data-cursor attributes
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const type = (target.getAttribute("data-cursor") as CursorType) || "button";
        const label = target.getAttribute("data-cursor-label") || "";
        setCursorType(type);
        setCursorLabel(label);
      } else {
        const isClickable = (e.target as HTMLElement)?.closest("a, button, [role='button']");
        if (isClickable) {
          setCursorType("button");
          setCursorLabel("");
        } else {
          setCursorType("default");
          setCursorLabel("");
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    // Lerp loop for fluid outer ring
    const render = () => {
      // Lerp factor
      const lerp = 0.14;
      ring.current.x += (mouse.current.x - ring.current.x) * lerp;
      ring.current.y += (mouse.current.y - ring.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener("change", updateTouch);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // If mobile or touch device, do not render custom cursor
  if (isTouch) {
    return <CursorContext.Provider value={{ setCursor, resetCursor }}>{children}</CursorContext.Provider>;
  }

  // Ring dimensions and styles based on state
  let ringSize = "w-9 h-9 -ml-[18px] -mt-[18px]";
  let ringStyle = "border border-ivory/35 bg-transparent";

  if (cursorType === "image") {
    ringSize = "w-20 h-20 -ml-10 -mt-10";
    ringStyle = "border border-bronze/60 bg-bronze/10 backdrop-blur-[2px]";
  } else if (cursorType === "video") {
    ringSize = "w-24 h-24 -ml-12 -mt-12";
    ringStyle = "border border-amber-sunset/70 bg-amber-sunset/15 backdrop-blur-[3px]";
  } else if (cursorType === "gallery") {
    ringSize = "w-20 h-20 -ml-10 -mt-10";
    ringStyle = "border border-ivory/50 bg-white/5 backdrop-blur-[2px]";
  } else if (cursorType === "text") {
    ringSize = "w-14 h-14 -ml-7 -mt-7";
    ringStyle = "border border-ivory/15 bg-transparent scale-75 opacity-40";
  } else if (cursorType === "button") {
    ringSize = "w-12 h-12 -ml-6 -mt-6";
    ringStyle = "border border-bronze bg-bronze/15 scale-110";
  }

  return (
    <CursorContext.Provider value={{ setCursor, resetCursor }}>
      {/* Outer Interpolated Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-[width,height,margin,border-color,background-color,transform] duration-300 ease-out flex items-center justify-center ${ringSize} ${ringStyle} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="text-[9px] font-sans font-semibold uppercase tracking-widest text-ivory drop-shadow-md select-none animate-fade-in"
          >
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Inner Pin-Point Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-ivory rounded-full pointer-events-none z-[100000] transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${cursorType === "text" ? "opacity-20" : ""}`}
        style={{ willChange: "transform" }}
      />

      {children}
    </CursorContext.Provider>
  );
}
