import type { ReactNode } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import "@/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#F0A400" },
      { title: `${siteConfig.name} | Informasi Publik Desa` },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: siteConfig.description },
      { property: "og:locale", content: "id_ID" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootNotFound,
  errorComponent: RootError,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <RootDocument>
      <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <p className="mb-2 text-lg font-semibold text-primary-700">404</p>
        <h1 className="mb-3 text-3xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mb-8 max-w-md text-muted">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
      </Container>
    </RootDocument>
  );
}

function RootError({ reset }: ErrorComponentProps) {
  return (
    <RootDocument>
      <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="mb-3 text-3xl font-bold">Terjadi kesalahan</h1>
        <p className="mb-8 max-w-md text-muted">
          Halaman gagal dimuat. Silakan coba lagi.
        </p>
        <Button onClick={reset}>Coba lagi</Button>
      </Container>
    </RootDocument>
  );
}
