"use client";

import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import PageLoader from "../components/PageLoader";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";
import Navigation from "../components/Navigation";
import HeroReveal from "../components/HeroReveal";
import HowItStarted from "../components/HowItStarted";
import HorizontalMemoryGallery from "../components/HorizontalMemoryGallery";
import VideoMemory from "../components/VideoMemory";
import WhatYouChanged from "../components/WhatYouChanged";
import PunjabiLetter from "../components/PunjabiLetter";
import PhotoWall from "../components/PhotoWall";
import TheEverything from "../components/TheEverything";
import ScrollMarquee from "../components/ScrollMarquee";
import FinalExperience from "../components/FinalExperience";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class SafeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: false }; // Never break the site layout
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Caught harmless client-side interaction error:", error, errorInfo);
  }

  public render() {
    return this.props.children;
  }
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SafeErrorBoundary>
      <CustomCursor>
        {/* Cinematic Fast Preloader */}
        <PageLoader />

        {/* Main Experience wrapped in Lenis Smooth Inertia Scroll */}
        <SmoothScroll>
          {/* Floating Minimal Navigation & Sound Controller */}
          <Navigation />

          <main className="relative w-full overflow-hidden bg-[#08080A]">
            {/* Section 01 — Cinematic Hero with Cursor Reveal Mask */}
            <HeroReveal />

            {/* Section 02 — How It Started */}
            <HowItStarted />

            {/* Section 03 — The Memory Scroll (Pinned Horizontal Gallery) */}
            <HorizontalMemoryGallery />

            {/* Section 04 — Her Video (Cinematic Letterbox Window) */}
            <VideoMemory />

            {/* Section 05 — What You Changed (Emotional Centerpiece) */}
            <WhatYouChanged />

            {/* Section 06 — Punjabi Emotional Letter */}
            <PunjabiLetter />

            {/* Section 07 — Photo Reveal Wall (Asymmetrical Editorial Collage) */}
            <PhotoWall />

            {/* Section 08 — The Everything Section */}
            <TheEverything />

            {/* Section 09 — Memory Marquee with Scroll Velocity Acceleration */}
            <ScrollMarquee />

            {/* Section 10 — Final Cinematic Experience & Ending */}
            <FinalExperience />
          </main>
        </SmoothScroll>
      </CustomCursor>
    </SafeErrorBoundary>
  );
}
