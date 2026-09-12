# For Her — A Cinematic Memory Archive

> *“Some people enter your life. Somehow, they become a part of it.”*

An award-level cinematic personal website dedicated to my girl best friend. Designed with the interaction quality of luxury editorial sites, creative studios, and immersive Awwwards storytelling experiences.

---

## ✦ Aesthetic & Motion Philosophy

- **Atmosphere**: Deep charcoal (`#08080A`), warm ivory, muted bronze, sunset amber, soft cream, and subtle reddish-brown accents.
- **Typography**: Sculpted serif display paired with modern clean sans-serif and authentic Gurmukhi Punjabi script (`Noto Serif Gurmukhi`).
- **Motion System**:
  - **Lenis**: Silky inertial scrolling synchronized with GSAP ScrollTrigger.
  - **GSAP**: Line-by-line kinetic reveals, circular cursor reveal masks, pinned horizontal galleries, directional photo wall entrances, and velocity-responsive marquees.
  - **Custom Cursor**: 2-layer interpolated lerp cursor with contextual states (`image`, `video`, `gallery`, `text`, `button`) and automatic mobile touch fallback.
  - **Soundscape**: Embedded ambient classical score with mute/play toggle and audio visualizer.

---

## ✦ Story Chapters & Sections

1. **Section 01 — Cinematic Intro**: Cursor-following circular reveal discovering the photo of the two friends, expanding into full-screen on scroll.
2. **Section 02 — How It Started**: Editorial split-view with masked photo entrance and line-by-line kinetic reveal (*“It started with something ordinary…”*).
3. **Section 03 — The Memory Scroll**: Pinned horizontal scrolling art exhibition featuring memory fragments with unique rotations, film frames, and metadata.
4. **Section 04 — Her Video**: Cinematic letterbox window expanding on scroll with video playback and ambient controls.
5. **Section 05 — What You Changed**: Pinned emotional centerpiece with slow opacity, blur, and vertical drift giving sacred breathing room to each statement.
6. **Section 06 — Punjabi Emotional Letter**: Dedicated Gurmukhi typography section celebrating heartfelt friendship with meaning toggles (*“ਕੁਝ ਗੱਲਾਂ ਦਿਲ ਤੋਂ…”*).
7. **Section 07 — Photo Reveal Wall**: Asymmetrical magazine collage with directional entries (top, bottom, left, right), parallax, and hover captions.
8. **Section 08 — The Everything Section**: Minimalist stark statement on friendship and destiny.
9. **Section 09 — Memory Marquee**: Dual-row infinite marquee accelerating and decelerating dynamically with scroll velocity.
10. **Section 10 — Final Cinematic Experience & Ending**: Emerging portrait from blackness, climactic gratitude statements, and an emotional closing note.

---

## ✦ Personalization

Everything is centralized in [`src/config/siteConfig.ts`](./src/config/siteConfig.ts) for effortless editing:
- Bestie's name, dates, and nicknames
- Hero photo & reveal image
- Personal gallery & wall photos
- Video clip path
- Captions, quotes, and memories
- Punjabi lines and translations
- Ambient music track

---

## ✦ Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

*Made with memories, a little madness, and a lot of gratitude.*
