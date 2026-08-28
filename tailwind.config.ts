import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tag-yellow": "#F5B800",
        "tag-yellow-light": "#FFD54F",
        "tag-green": "#00A651",
        "tag-green-dark": "#008C44",
        "tag-dark": "#0a0a0a",
        "tag-surface": "rgba(20, 20, 20, 0.92)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
