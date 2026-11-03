import "./globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";

// Font disimpan di src/fonts (subset latin), jadi build tidak bergantung pada Google Fonts.
const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-montserrat",
});

const workSans = localFont({
  src: [
    { path: "../fonts/work-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/work-sans-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/work-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/work-sans-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Informasi Publik Desa`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F0A400",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${montserrat.variable} ${workSans.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
