import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Design tokens taken from the Figma file "Web Desa":
 * primary #F0A400, Primary-15 #FDF1D9, bg light #F8F8F8, card #FDFDFD,
 * card shadow 0 2 16 rgba(0,0,0,.04), Montserrat, hero gradient 227deg.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF9EC",
          100: "#FDF1D9", // Figma: Primary-15
          DEFAULT: "#F0A400", // Figma: Primary
          300: "#F6C866", // Figma: Primary-60 (active page number)
          400: "#F3B633", // Figma: Primary-80 (search button)
          500: "#F0A400",
          600: "#D18F00",
          700: "#8F5F00", // text on light backgrounds (contrast >= 4.5:1)
        },
        ink: "#221C1C", // Figma: Black-100,
        muted: "#717171", // Figma: BodyText
        body: "#3E3E3E", // Figma: Text,
        canvas: "#F8F8F8", // Figma: GreyScale/bg light
        surface: "#FDFDFD", // Figma: card fill
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
        logo: ["var(--font-work-sans)", ...defaultTheme.fontFamily.sans], // Figma: logo + footer
      },
      boxShadow: {
        card: "0px 2px 16px 0px rgba(0, 0, 0, 0.04)",
        "card-hover": "0px 6px 24px 0px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(227deg, rgba(0, 20, 38, 0.8) 0%, rgba(102, 70, 1, 0.8) 89%)",
      },
    },
  },
  plugins: [],
};

export default config;
