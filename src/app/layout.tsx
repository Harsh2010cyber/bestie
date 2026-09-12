import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "../config/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.bestie.nickname} — A Cinematic Memory Archive`,
  description: "A private cinematic digital memory dedicated to my girl best friend. Emotional, elegant, and timeless.",
  authors: [{ name: "Her Best Friend" }],
  keywords: ["bestie", "cinematic", "memories", "story", "editorial"],
  openGraph: {
    title: `${siteConfig.bestie.nickname} — A Cinematic Memory Archive`,
    description: "Some people enter your life. Somehow, they become a part of it.",
    type: "website",
    images: [
      {
        url: siteConfig.media.heroImage,
        width: 1200,
        height: 630,
        alt: siteConfig.bestie.nickname,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark text-ivory antialiased selection:bg-bronze/30 selection:text-ivory overflow-x-hidden font-sans">
        <div className="film-grain" aria-hidden="true" />
        <div className="cinematic-vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
