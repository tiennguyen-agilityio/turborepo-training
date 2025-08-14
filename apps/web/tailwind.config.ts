import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
      },
      color: {
        success: "var(--success)",
        error: "var(--error)",
        info: "var(--info)",
        warning: "var(--warning)",
        facebook: "var(--facebook)",
        google: "var(--google)",
        link: "var(--link)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
      },
    },
  },
  plugins: [],
};

export default config;
