# Web Desa Pendil

Website informasi publik Desa Pendil. Next.js (App Router) + TypeScript + Tailwind CSS.

## Menjalankan

```bash
yarn install
cp .env.example .env.local   # opsional
yarn dev                     # http://localhost:3000
```

Skrip lain: `yarn build`, `yarn start`, `yarn lint`, `yarn typecheck`.

## Struktur

```
src/
  app/          route (/, /article, /services, /profile, /gallery), layout, error, 404
  components/
    layout/     Navbar, Footer
    ui/         Button, Container, Panel, PageHero, SectionHeading, ...
    cards/      ArticleCard, OfficialCard, StatCard, ...
  sections/     bagian halaman yang dipakai ulang
  data/         konten statis (placeholder)
  config/       navigasi, info situs
  lib/          api, format tanggal, helper gambar
  types/        tipe TypeScript bersama
```

## Desain

Token desain (warna, bayangan, gradient hero, font Montserrat) berasal dari Figma
"Web Desa" dan ada di `tailwind.config.ts`. Layout mobile-first untuk 375px sampai desktop lebar.

## Data

Berita diambil dari `API_BASE_URL` (lihat `.env.example`) dan di-cache 1 jam.
Jika API gagal, halaman menampilkan keadaan kosong, bukan error.
Data desa, perangkat, keunggulan, dan kesenian masih placeholder di `src/data/village.ts`.
