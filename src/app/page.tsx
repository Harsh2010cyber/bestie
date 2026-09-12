"use client";

import React, { useState } from "react";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroReveal from "@/components/HeroReveal";
import HowItStarted from "@/components/HowItStarted";
import HorizontalMemoryGallery from "@/components/HorizontalMemoryGallery";
import VideoMemory from "@/components/VideoMemory";
import WhatYouChanged from "@/components/WhatYouChanged";
import PunjabiLetter from "@/components/PunjabiLetter";
import PhotoWall from "@/components/PhotoWall";
import TheEverything from "@/components/TheEverything";
import ScrollMarquee from "@/components/ScrollMarquee";
import FinalExperience from "@/components/FinalExperience";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CustomCursor>
      {/* Cinematic Fast Preloader */}
      <PageLoader onComplete={() => setIsLoaded(true)} />

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
  );
}
