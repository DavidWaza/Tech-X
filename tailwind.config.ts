// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-ubuntu)", "sans-serif"],
      },
      colors: {
        // African-Inspired Color Palette
        "african-gold": "#E5A54B",
        "african-ochre": "#D4A574",
        "terracotta": "#C65D3B",
        "burnt-sienna": "#A0522D",
        "deep-brown": "#3B2F2F",
        "kente-green": "#2F7F5F",
        "kente-gold": "#D4AF37",
        "saharan-red": "#B53920",
        "nubian-purple": "#5A3A69",
        "nile-blue": "#1A3F66",
        "earth-brown": "#8B4513",
        "savannah": "#C19A6B",
      },

      // African-Inspired Patterns & Effects
      backgroundImage: {
        "gradient-sunset":
          "linear-gradient(135deg, oklch(0.70 0.20 60) 0%, oklch(0.65 0.18 70) 100%)",
        "gradient-savannah":
          "linear-gradient(135deg, oklch(0.45 0.08 180) 0%, oklch(0.50 0.12 195) 100%)",
        "gradient-royal":
          "linear-gradient(135deg, oklch(0.30 0.08 350) 0%, oklch(0.75 0.15 80) 100%)",
        "gradient-earth":
          "linear-gradient(135deg, oklch(0.55 0.15 30) 0%, oklch(0.95 0.05 80) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // African-Inspired Animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
