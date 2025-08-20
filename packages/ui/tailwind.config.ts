import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
      },
      colors: {
        success: "var(--success)",
        error: "var(--error)",
        info: "var(--info)",
        warning: "var(--warning)",
        facebook: "var(--facebook)",
        google: "var(--google)",
        link: "var(--link)",
      },
    },
  },
  plugins: [],
};

export default config;
