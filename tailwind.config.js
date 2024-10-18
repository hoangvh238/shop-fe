import { nextui } from "@nextui-org/theme";
import { withUt } from "uploadthing/tw";
export default withUt({
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#6babe2",
              foreground: "#000",
            },
            focus: "#6babe2",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#6babe2",
              foreground: "#fff",
            },
            focus: "#6babe2",
          },
        },
      },
    }),
  ],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
});
/** @type {import('tailwindcss').Config} */