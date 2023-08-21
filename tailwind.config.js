/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#F0A400",
      },
      backgroundImage: {
        "bg-container": "url('/images/bg-event.png')",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
