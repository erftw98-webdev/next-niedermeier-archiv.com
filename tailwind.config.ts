import type { Config } from "tailwindcss";

const config: Config = {
  // Wir stellen sicher, dass Tailwind JEDE Datei im src-Ordner scannt
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;