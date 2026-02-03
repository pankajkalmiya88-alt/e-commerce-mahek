import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#222222",
          dark: "#5F0D24",
          light: "#444444",
        },
        secondary: {
          DEFAULT: "#5F0D24",
          dark: "#786622",
        },
        accent: {
          DEFAULT: "#f06543",
          hover: "#e05533",
        },
        background: {
          DEFAULT: "#ffffff",
          gray: "#f5f5f5",
          light: "#fafafa",
        },
        text: {
          primary: "#222222",
          secondary: "#666666",
          muted: "#777777",
          light: "#999999",
        },
        border: {
          DEFAULT: "#e8e9eb",
          dark: "#d7d7d7",
          light: "#eeeeee",
        },
        sale: {
          DEFAULT: "#f00000",
          bg: "#fff0ef",
        },
        success: "#198754",
        error: "#dc3545",
        warning: "#ffc107",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        xs: ["11px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.7" }],
        base: ["14px", { lineHeight: "1.7" }],
        lg: ["15px", { lineHeight: "1.7" }],
        xl: ["16px", { lineHeight: "1.5" }],
        "2xl": ["18px", { lineHeight: "1.4" }],
        "3xl": ["19px", { lineHeight: "1.3" }],
        "4xl": ["24px", { lineHeight: "1.2" }],
        "5xl": ["26px", { lineHeight: "1.2" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "3px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 0 4px rgba(0,0,0,0.1)",
        DEFAULT: "0 0 15px rgba(5,0,0,0.1)",
        md: "0 0 15px rgba(5,0,0,0.15)",
        lg: "0 0 6px rgba(0,0,0,0.2)",
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "10": "10",
        "45": "45",
        "49": "49",
        "99": "99",
        "998": "998",
        "999": "999",
        "1000": "1000",
        "9999": "9999",
        "10000": "10000",
      },
      transitionDuration: {
        "400": "400ms",
      },
      letterSpacing: {
        tight: "0.02em",
        normal: "0.05em",
        wide: "0.1em",
        wider: "0.2px",
        widest: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
