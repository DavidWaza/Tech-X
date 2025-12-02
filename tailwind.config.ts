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
      // African-Inspired Color Palette - Using OKLCH to match CSS variables
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        // Primary - Rich Teal (African waters & innovation)
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        // Gold - Saffron & Prosperity
        gold: {
          DEFAULT: "oklch(var(--gold))",
          dark: "oklch(var(--gold-dark))",
        },
        // Terracotta - Earth & Vitality
        terracotta: {
          DEFAULT: "oklch(var(--terracotta))",
        },
        // Savannah Green - Nature & Growth
        savannah: {
          DEFAULT: "oklch(var(--savannah))",
        },
        // Deep Purple/Burgundy - Spirituality
        royal: {
          DEFAULT: "oklch(var(--royal))",
        },
        // Sunset Orange - Energy & Enthusiasm
        sunset: {
          DEFAULT: "oklch(var(--sunset))",
        },
        // Existing colors
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        chart: {
          "1": "oklch(var(--chart-1))",
          "2": "oklch(var(--chart-2))",
          "3": "oklch(var(--chart-3))",
          "4": "oklch(var(--chart-4))",
          "5": "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      // African-Inspired Typography
      fontFamily: {
        // Display fonts (headings)
        sansita: ['Sansita', 'sans-serif'],
        display: ['Sansita', 'sans-serif'],
        
        // Body fonts
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      // African-Inspired Patterns & Effects
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, oklch(0.70 0.20 60) 0%, oklch(0.65 0.18 70) 100%)',
        'gradient-savannah': 'linear-gradient(135deg, oklch(0.45 0.08 180) 0%, oklch(0.50 0.12 195) 100%)',
        'gradient-royal': 'linear-gradient(135deg, oklch(0.30 0.08 350) 0%, oklch(0.75 0.15 80) 100%)',
        'gradient-earth': 'linear-gradient(135deg, oklch(0.55 0.15 30) 0%, oklch(0.95 0.05 80) 100%)',
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