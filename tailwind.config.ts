import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { opacity: "0.7", filter: "brightness(1)" }, // Start with lower opacity and normal brightness
          "50%": { opacity: "1", filter: "brightness(1.5)" }, // Increase opacity and brightness
          "100%": { opacity: "0.7", filter: "brightness(1)" }, // Return to initial state
        },
      },
      animation: {
        shine: "shine 11.5s infinite", // Apply the shine animation
      },
    
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['SF Pro', 'system-ui', 'sans-serif'],
        vazir: ['Vazir', 'system-ui', 'sans-serif'],
        parastoo: ['parastoo', 'system-ui', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
};
export default config;
