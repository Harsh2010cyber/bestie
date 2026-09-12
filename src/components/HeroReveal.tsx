"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CustomCursor";

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const footerLeftRef = useRef<HTMLDivElement>(null);
  const footerRightRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const { setCursor, resetCursor } = useCursor();

  // Coordinates with lerp for smooth luxury lag
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0, dist: 0 });
  const animFrameId = useRef<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial default spotlight at center
    const width = window.innerWidth;
    const height = window.innerHeight;
    mousePos.current = { x: width * 0.5, y: height * 0.45 };
    currentPos.current = { x: width * 0.5, y: height * 0.45 };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!hasInteracted) setHasInteracted(true);
    };

    // Touch movement handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      if (!hasInteracted) setHasInteracted(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
      container.addEventListener("touchstart", handleTouchMove, { passive: true });
    }

    // High performance animation loop for mask lerp & subtle distortion
    let prevX = currentPos.current.x;
    let prevY = currentPos.current.y;
    let idleAngle = 0;

    const updateSpotlight = () => {
      // If user hasn't touched/moved on mobile yet, create a gentle atmospheric drift
      if (!hasInteracted) {
        idleAngle += 0.015;
        const driftX = (width * 0.5) + Math.cos(idleAngle) * (width * 0.15);
        const driftY = (height * 0.45) + Math.sin(idleAngle * 0.8) * (height * 0.1);
        mousePos.current = { x: driftX, y: driftY };
      }

      // Lerp for smooth lag (controlled, intentional, expensive feel)
      const lerp = 0.085;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      // Calculate speed for subtle stretch
      const dx = currentPos.current.x - prevX;
      const dy = currentPos.current.y - prevY;
      const speed = Math.hypot(dx, dy);
      prevX = currentPos.current.x;
      prevY = currentPos.current.y;

      const dynamicRadius = Math.min(260, Math.max(160, 180 + speed * 1.5));
      const blurEdge = dynamicRadius * 0.35;

      if (imageRevealRef.current) {
        // Soft feathered circular mask
        const mask = `radial-gradient(circle ${dynamicRadius}px at ${currentPos.current.x}px ${currentPos.current.y}px, black 0%, rgba(0,0,0,0.85) 65%, transparent 100%)`;
        imageRevealRef.current.style.maskImage = mask;
        imageRevealRef.current.style.webkitMaskImage = mask;
      }

      // Parallax counter-shift on the image inside
      if (imageInnerRef.current) {
        const moveX = (currentPos.current.x - width / 2) * -0.02;
        const moveY = (currentPos.current.y - height / 2) * -0.02;
        imageInnerRef.current.style.transform = `scale(1.08) translate3d(${moveX}px, ${moveY}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(updateSpotlight);
    };

    animFrameId.current = requestAnimationFrame(updateSpotlight);

    // Initial Entrance Reveal Sequence
    const ctx = gsap.context(() => {
      // Set initial positions
      gsap.set(tagRef.current, { y: 25, opacity: 0 });
      gsap.set(headingRef.current, { y: 60, opacity: 0, filter: "blur(8px)" });
      gsap.set(subtitleRef.current, { y: 30, opacity: 0, filter: "blur(4px)" });
      gsap.set([footerLeftRef.current, footerRightRef.current], { opacity: 0, y: 15 });
      gsap.set(hintRef.current, { opacity: 0, scale: 0.95 });

      const tl = gsap.timeline({ delay: 0.6 });

      tl.to(tagRef.current, {
        y: 0,
        opacity: 0.7,
        duration: 1.2,
        ease: "power3.out",
      })
        .to(
          headingRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.8"
        )
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 0.85,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .to(
          [footerLeftRef.current, footerRightRef.current],
          {
            y: 0,
            opacity: 0.6,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .to(
          hintRef.current,
          {
            opacity: 0.8,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          hintRef.current,
          {
            opacity: 0,
            duration: 1.5,
            delay: 3,
            ease: "power2.inOut",
          }
        );

      // Section Scroll Transition:
      // Circular reveal expands into full-screen, scales camera into photo,
      // and gently pushes typography upward with parallax.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          imageRevealRef.current,
          {
            maskImage: "radial-gradient(circle 1800px at 50% 50%, black 0%, black 100%, transparent 100%)",
            webkitMaskImage: "radial-gradient(circle 1800px at 50% 50%, black 0%, black 100%, transparent 100%)",
            ease: "power2.inOut",
          },
          0
        )
        .to(
          imageInnerRef.current,
          {
            scale: 1.22,
            ease: "none",
          },
          0
        )
        .to(
          titleContainerRef.current,
          {
            y: -140,
            opacity: 0,
            filter: "blur(6px)",
            ease: "power2.in",
          },
          0.1
        )
        .to(
          [footerLeftRef.current, footerRightRef.current],
          {
            opacity: 0,
            y: 30,
            ease: "power2.in",
          },
          0
        );
    }, containerRef);

    return () => {
      ctx.revert();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchstart", handleTouchMove);
      }
    };
  }, [hasInteracted]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#060608] flex items-center justify-center select-none"
      onMouseEnter={() => setCursor("image", "DISCOVER")}
      onMouseLeave={() => resetCursor()}
    >
      {/* Background Deep Atmospheric Ambient (Nearly completely dark) */}
      <div className="absolute inset-0 bg-[#070709] z-0">
        {/* Very faint silhouette texture */}
        <div
          className="absolute inset-0 opacity-[0.07] filter blur-xl scale-110"
          style={{
            backgroundImage: `url(${siteConfig.media.heroImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/80" />
      </div>

      {/* CURSOR REVEAL LAYER: Soft masked photograph following cursor */}
      <div
        ref={imageRevealRef}
        className="absolute inset-0 z-10 pointer-events-none transition-[opacity] duration-700 will-change-[mask-image]"
        style={{
          maskImage: "radial-gradient(circle 200px at 50% 50%, black 0%, rgba(0,0,0,0.85) 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 200px at 50% 50%, black 0%, rgba(0,0,0,0.85) 65%, transparent 100%)",
        }}
      >
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageInnerRef}
            src={siteConfig.media.heroImage}
            alt={siteConfig.bestie.name}
            className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-100 ease-out"
            loading="eager"
          />
          {/* Subtle warm sunset amber tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-wine-accent/20 via-transparent to-amber-sunset/15 mix-blend-overlay pointer-events-none" />
        </div>
      </div>

      {/* Hero Typography Layer */}
      <div
        ref={titleContainerRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl pointer-events-none"
      >
        {/* Tiny Label */}
        <div
          ref={tagRef}
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-ivory/70 font-sans font-medium mb-5 md:mb-7 flex items-center gap-3"
        >
          <span className="w-6 h-[1px] bg-bronze/60" />
          <span>{siteConfig.story.hero.tag}</span>
          <span className="w-6 h-[1px] bg-bronze/60" />
        </div>

        {/* Main Title: "FOR HER." */}
        <h1
          ref={headingRef}
          className="display-hero font-serif font-light text-ivory tracking-tight drop-shadow-2xl uppercase"
        >
          {siteConfig.story.hero.mainTitle}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 md:mt-8 font-serif text-base md:text-xl lg:text-2xl text-ivory-muted font-light italic max-w-lg leading-relaxed"
        >
          {siteConfig.story.hero.subtitle}
        </p>

        {/* Hint near center/cursor */}
        <div
          ref={hintRef}
          className="mt-8 md:mt-12 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ivory/10 bg-dark/60 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-ping" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
            {isTouchDevice ? "drag to explore memories" : siteConfig.story.hero.cursorHint}
          </span>
        </div>
      </div>

      {/* Editorial Viewport Badges */}
      <div
        ref={footerLeftRef}
        className="absolute bottom-8 md:bottom-12 left-6 md:left-12 z-20 text-[10px] md:text-xs font-mono tracking-[0.25em] text-ivory/50 uppercase pointer-events-none"
      >
        {siteConfig.story.hero.badgeLeft}
      </div>

      <div
        ref={footerRightRef}
        className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20 text-[10px] md:text-xs font-mono tracking-[0.25em] text-ivory/50 uppercase pointer-events-none flex items-center gap-2"
      >
        <span>{siteConfig.story.hero.badgeRight}</span>
      </div>
    </section>
  );
}
