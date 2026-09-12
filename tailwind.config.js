/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#08080A",
          surface: "#0E0E12",
          elevated: "#15151B",
          border: "rgba(255, 255, 255, 0.08)",
        },
        ivory: {
          DEFAULT: "#FBF8F2",
          muted: "#DDD5C7",
          subtle: "#9E978C",
        },
        bronze: {
          DEFAULT: "#C59B6D",
          light: "#DFC09B",
          dark: "#8C6538",
        },
        amber: {
          sunset: "#E07A43",
          glow: "rgba(224, 122, 67, 0.15)",
        },
        wine: {
          accent: "#7A342B",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        punjabi: ["var(--font-punjabi)", "Noto Serif Gurmukhi", "Mukta Mahee", "serif"],
        display: ["var(--font-display)", "Cinzel", "serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
}
