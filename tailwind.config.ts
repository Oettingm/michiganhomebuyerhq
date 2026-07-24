import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: "#16332A",
          light: "#25493B",
          dark: "#0D211A",
        },
        paper: "#FAF8F3",
        amber: {
          DEFAULT: "#C88A2E",
          light: "#E0AA55",
        },
        ink: "#1C1C1A",
        slate: "#5B6560",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
