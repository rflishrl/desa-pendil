# Migration Notes: TanStack Start -> SvelteKit 3 (`desa-pendil`)

Audit Fase 0 (sebelum perubahan kode aplikasi). Target deployment: Vercel Hobby (Node.js >= 22.17 via `@sveltejs/adapter-vercel`), package manager: Bun (`bun.lock`).

---

## 1. Daftar Rute

| File Route TanStack | URL Final | Statis / Dinamis | Detail & Catatan Migrasi |
|---|---|---|---|
| `src/routes/__root.tsx` | *(Root layout)* | Layout dinamis | `createRootRoute`: `head()` (charset, viewport, `theme-color: #F0A400`, OG `id_ID`, Twitter card, `/favicon.ico`), `notFoundComponent: RootNotFound` (404), `errorComponent: RootError`, `<TopProgressBar />`, skip link, `<Navbar />`, `<main id="main-content">`, `<Footer />`, impor `@/globals.css`. |
| `src/routes/index.tsx` | `/` | Dinamis (SSR + streaming) | `loader` mengembalikan unawaited `articlesPromise: getArticlesServerFn()` dengan `<Suspense>` + `<Await>` (`LatestNewsSection` menampilkan maks 3 berita, fallback `LatestNewsSectionSkeleton`). |
| `src/routes/article/index.tsx` | `/article` | Dinamis (SSR + `?q=&page=`) | `validateSearch: articleSearchSchema` (`q` default `""`, `page` int >= 1 default `1`). Filter `title` case-insensitive & paginasi `PAGE_SIZE = 6` di loader dari hasil `getArticlesServerFn()`. |
| `src/routes/article/$id.tsx` | `/article/:id` | Dinamis (SSR) | `loader`: `Promise.all([getArticleServerFn({ data: params.id }), getArticlesServerFn()])`; `throw notFound()` jika tidak ditemukan (`notFoundComponent: ArticleNotFound`). `head()` dinamis (`og:type: article`, deskripsi 155 karakter, `og:image`). |
| `src/routes/services.tsx` | `/services` | Dinamis (SSR + fallback statis) | `loader`: `getGalleryImagesServerFn()`, fallback ke `galleryImages` statis (`src/data/village.ts`) jika `null`. Merender 3 foto pertama di `<GalleryGrid rail />` + statistik desa & dusun. |
| `src/routes/profile.tsx` | `/profile` | Statis (kandidat `prerender = true`) | Tidak memiliki `loader`; konten statis (`villageOrigin`, `LeaderSection`, `OfficialsSection`, `FeaturesSection`, `CultureSection`). |
| `src/routes/gallery.tsx` | `/gallery` | Dinamis (SSR + `?page=` + fallback statis) | `validateSearch: gallerySearchSchema` (`page` int >= 1 default `1`). `loader`: `getGalleryImagesServerFn()`, fallback `galleryImages` statis, paginasi `PAGE_SIZE = 6`. |
| `src/routes/robots[.]txt.ts` | `/robots.txt` | Server route (`GET`) | `text/plain; charset=utf-8`, `Allow: /`, `Sitemap: ${getSiteUrl()}/sitemap.xml`. |
| `src/routes/sitemap[.]xml.ts` | `/sitemap.xml` | Server route (`GET`) | `application/xml; charset=utf-8` untuk 5 path statis (`""`, `"/article"`, `"/services"`, `"/profile"`, `"/gallery"`). |
| `src/routes/api/revalidate.ts` | `/api/revalidate` | API route (`POST`) | Webhook invalidasi cache dengan Bearer `REVALIDATE_SECRET` (`SHA-256` + `crypto.timingSafeEqual`). |

---

## 2. Sumber Data Saat Ini & Cara Akses

- **Data statis lokal**:
  - `src/config/site.ts`: `siteConfig`, `mainNav` (`/`, `/article`, `/services`, `/profile`), `footerGroups`, `socialLinks`, `popularSearches` (`["Desa Pendil", "Tari Remo", "Reog"]`).
  - `src/data/village.ts`: `villageStats`, `hamlets`, `officials` (8 perangkat), `features`, `cultures` (3 kesenian), `agenda` (4 entri), `leader`, `villageOrigin`, dan fallback `galleryImages` (9 foto lokal `/images/*`).
- **Backend REST API (`desa-pendil-backend`)** via `src/lib/api/client.server.ts`, `src/lib/api/index.ts`, & `src/lib/api/schemas.ts`:
  - Base URL dari `API_BASE_URL` (wajib & divalidasi `.url()` di `NODE_ENV === "production"`, default `http://localhost:4000/api` saat dev).
  - `fetch()` langsung dengan `AbortSignal.timeout(8_000)`, tanpa retry dan **tanpa lapisan cache aktif** (parameter `tags` saat ini diabaikan).
  - Endpoint yang dipanggil:
    - `getArticles()` -> `GET ${API_BASE_URL}/news/v1?limit=50` (skip item gagal Zod via `parseItems`, kembalikan `[]` pada `ApiClientError`)
    - `getArticle(id)` -> `GET ${API_BASE_URL}/news/v1/${encodeURIComponent(id)}` (`allowNotFound: true`)
    - `getGalleryImages()` -> `GET ${API_BASE_URL}/gallery/v1?limit=50` (kembalikan `null` saat gagal agar rute fallback ke data statis)

---

## 3. Server Function, Endpoint API, Middleware, dan Form

- **Server Functions (`src/lib/api/functions.ts`)** (semuanya `GET`):
  - `getArticlesServerFn`
  - `getArticleServerFn` (validasi `z.string()`)
  - `getGalleryImagesServerFn`
- **Endpoint API**:
  - `POST /api/revalidate` (`src/routes/api/revalidate.ts`): memeriksa `REVALIDATE_SECRET` (`503` jika kosong), verifikasi `Authorization: Bearer` via SHA-256 + `timingSafeEqual` (`401` jika salah), validasi `{ tags: string[] }` (`min(1).max(10)`), filter terhadap `CACHE_TAGS` (`["news", "gallery"]`), kembalikan `{ revalidated: tags }`. **Bukan endpoint tulis publik** (webhook internal dengan Bearer secret; tetap dicatat untuk acuan Prompt 2 / Vercel WAF).
  - `GET /robots.txt` & `GET /sitemap.xml`.
- **Middleware**: Tidak ada.
- **Form & Kontrol Client**:
  - **Tidak ada `<form>` tulis (`POST`) / form kontak**.
  - `HomeHero` (`src/sections/HomeHero.tsx`): `<search><form action="/article" method="get">` untuk pencarian berita (`?q=`).
  - `Navbar` (`src/components/layout/Navbar.tsx`): drawer menu mobile (`role="dialog"`, Escape/backdrop close, lock scroll).
  - `ShareButton`, `TopProgressBar`, `Pagination`, `CardRail`.

---

## 4. Login/Admin & Modul Cloudflare R2

- **Login / Admin**: **Tidak ada** di `desa-pendil`. Seluruh autentikasi & panel admin berada di `desa-pendil-backend`.
- **Cloudflare R2 Server Upload**: **Tidak ada** klien S3/R2, `sharp`, maupun quota guard di `desa-pendil`.
- **URL Media Publik R2 (`src/lib/media-url.ts`, `src/lib/images.ts`, `MediaImage.tsx`)**:
  - Menggunakan `VITE_MEDIA_PUBLIC_DOMAIN` (contoh: `https://media-dp.raflisahrul.my.id`) -> pada SvelteKit 3 dipindahkan ke `PUBLIC_MEDIA_PUBLIC_DOMAIN` (`$env/static/public`) tanpa mengubah format URL/custom domain.
  - `isAllowedMediaUrl()` hanya mengizinkan path lokal `/...` (menolak `//...`), origin `MEDIA_PUBLIC_DOMAIN`, atau `http://localhost:4000` di non-produksi (juga divalidasi di Zod `allowedMediaUrlSchema`).
  - `deriveThumbUrl()` menurunkan `<key>.webp` -> `<key>-thumb.webp` khusus pada origin custom domain R2.

---

## 5. Daftar Dependency React-Spesifik & Padanan SvelteKit 3

| Paket Saat Ini (`desa-pendil`) | Padanan SvelteKit 3 / Rilis Target |
|---|---|
| `@tanstack/react-start` (`1.169.5`), `@tanstack/react-router` (`1.170.46`), `@tanstack/router-plugin`, `nitro` (`^3.0.261103-rc`) | `@sveltejs/kit` (3.x stable, `3.2.1`), `@sveltejs/adapter-vercel` (7.x stable, `nodejs24.x`) |
| `react` (`19.3.1`), `react-dom` (`19.3.1`), `@vitejs/plugin-react` (`6.2.1`), `@types/react*` | `svelte` (5.x stable, runes), `@sveltejs/vite-plugin-svelte` (7.x stable) |
| `react-icons` (`5.7.0` — `hi2`, `fa6`, `lu`, `md`, `pi`) | `@lucide/svelte` + komponen SVG ikon ringan agar visual tetap identik |
| `tailwindcss` (`4.3.5`), `@tailwindcss/vite` (`4.3.5`), `zod` (`4.6.7`) | Tetap dipertahankan di major yang sama + font WOFF2 self-hosted di `src/fonts/*` |
| `typescript` (`5.9.3`), `@biomejs/biome` (`2.6.6`), `vite` (`8.3.6`) | `typescript` (`~6.0.3`), `svelte-check`, `vite` (`8.3.x`), `eslint` + `prettier` |
| `bun:test` (`test/media-url.test.ts`) | `vitest` (5.x stable) + `@playwright/test` (1.x stable) |

---

## 6. Daftar Environment Variable

| Nama Env Saat Ini | Sifat | Kegunaan | Catatan Migrasi SvelteKit 3 |
|---|---|---|---|
| `API_BASE_URL` | Private (Server) | Base URL `desa-pendil-backend` (mis. `http://localhost:4000/api`) | `$app/env/private` (`static: false`) |
| `REVALIDATE_SECRET` | Private (Server) | Bearer secret `POST /api/revalidate` | `$app/env/private` (`static: false`) |
| `VITE_MEDIA_PUBLIC_DOMAIN` | Public (Client & Server) | Custom domain R2 (`https://media-dp.raflisahrul.my.id`) | Ganti ke `PUBLIC_MEDIA_PUBLIC_DOMAIN` (`$app/env/public`, `static: true`) |
| `SITE_URL` / `VITE_SITE_URL` / `NEXT_PUBLIC_SITE_URL` | Public (Client & Server) | URL kanonik situs (default `https://desapendil.id`) | Konsolidasi ke `PUBLIC_SITE_URL` (`$app/env/public`, `static: true`) |
| `NODE_ENV` | Runtime | Deteksi mode produksi | Standar Node/Vite |

---

## 7. Risiko & Hal Ambigu

1. **Penamaan env publik (`VITE_*` / `NEXT_PUBLIC_*` -> `PUBLIC_*`)**: SvelteKit 3 memakai prefix `PUBLIC_` (`PUBLIC_MEDIA_PUBLIC_DOMAIN`, `PUBLIC_SITE_URL`). Perlu konfirmasi agar env di Vercel disesuaikan sebelum deploy.
2. **Kode tidak terpakai**: `src/lib/api/client.ts` (barrel kosong tak terpakai) dan `formatDate` di `src/lib/format.ts` tidak dipakai di rute mana pun.
3. **Node.js lokal tidak ada di PATH**: Di mesin lokal hanya tersedia `bun` `1.4.4`; eksekusi lokal memakai Bun, sedangkan Vercel tetap ditargetkan ke `nodejs24.x` (`>= 22.17`).
4. **Data artikel di DB lokal saat audit**: `GET /api/news/v1` mengembalikan 0 artikel saat baseline Fase 0 diambil, sehingga rute `/article/:id` belum memiliki entri live untuk screenshot before (layout 404 artikel dan `/article` tetap teruji).
5. **Versi paket < 14 hari**: `@sveltejs/kit@3.3.0` dirilis 2026-11-17 (< 14 hari) dan `typescript@7.0.2` bukan 6.x — akan memakai `@sveltejs/kit@3.2.1` dan `typescript@~6.0.3` sesuai aturan prompt.

---

## 8. Baseline Screenshot (`.baseline-screenshots/before/`)

Diambil menggunakan Playwright Chromium terhadap `desa-pendil` (TanStack Start `vite dev` di `http://localhost:3000` dengan `desa-pendil-backend` aktif di `http://localhost:4000`):

| File | URL / State | Viewport | HTTP Status |
|---|---|---|---|
| `.baseline-screenshots/before/home-desktop.png` | `/` | `1440x900` | `200` |
| `.baseline-screenshots/before/home-mobile.png` | `/` | `390x844` | `200` |
| `.baseline-screenshots/before/home-mobile-menu-open.png` | `/` (drawer mobile terbuka) | `390x844` | `200` |
| `.baseline-screenshots/before/article-desktop.png` | `/article` | `1440x900` | `200` |
| `.baseline-screenshots/before/article-mobile.png` | `/article` | `390x844` | `200` |
| `.baseline-screenshots/before/services-desktop.png` | `/services` | `1440x900` | `200` |
| `.baseline-screenshots/before/services-mobile.png` | `/services` | `390x844` | `200` |
| `.baseline-screenshots/before/profile-desktop.png` | `/profile` | `1440x900` | `200` |
| `.baseline-screenshots/before/profile-mobile.png` | `/profile` | `390x844` | `200` |
| `.baseline-screenshots/before/gallery-desktop.png` | `/gallery` | `1440x900` | `200` |
| `.baseline-screenshots/before/gallery-mobile.png` | `/gallery` | `390x844` | `200` |
| `.baseline-screenshots/before/not-found-desktop.png` | `/halaman-tidak-ada-404` | `1440x900` | `404` |
| `.baseline-screenshots/before/not-found-mobile.png` | `/halaman-tidak-ada-404` | `390x844` | `404` |


---

## 9. Catatan Penyelesaian Migrasi (Fase 1–7)

- **Konfigurasi SvelteKit 3**:
  - Tidak ada `svelte.config.js`; seluruh opsi diteruskan via `sveltekit({...})` di `vite.config.ts`.
  - Alias `#lib` & `#lib/*` di `package.json` (`imports`), nol penggunaan `$lib`.
  - Env dideklarasikan lewat `src/env.ts` (`defineEnvVars`): `$app/env/private` (`API_BASE_URL`, `REVALIDATE_SECRET`) dan `$app/env/public` (`PUBLIC_SITE_URL`, `PUBLIC_MEDIA_PUBLIC_DOMAIN`).
  - Adapter: `@sveltejs/adapter-vercel` 7.x (`runtime: 'nodejs24.x'`, `regions: ['sin1']`), dengan wrapper `safeVercelAdapter` untuk kompatibilitas symlink Windows saat build lokal.
- **Perubahan Struktur & Pembersihan**:
  - Rute `/profile` di-prerender (`export const prerender = true`).
  - Rute `/` tetap streaming `articlesPromise` (`{#await data.articlesPromise}` dengan `<LatestNewsSectionSkeleton />`).
  - Drawer menu mobile di `Navbar.svelte` menggunakan elemen native `<dialog>` (`showModal()`, Escape, klik backdrop, `overscroll-behavior: contain`).
  - Kode lama (TanStack Start/Router, React, Biome, `public/`, `.legacy/`) serta kode mati (`src/lib/api/client.ts`, `formatDate` tak terpakai) telah dihapus di Fase 7.
- **Versi Final Terpasang (dari `bun.lock`)**:
  - `@sveltejs/kit`: `3.2.1` (menghindari `3.3.0` yang < 14 hari)
  - `svelte`: `5.58.0`
  - `vite`: `8.3.8`
  - `@sveltejs/vite-plugin-svelte`: `7.3.1`
  - `@sveltejs/adapter-vercel`: `7.0.4`
  - `tailwindcss` & `@tailwindcss/vite`: `4.3.5`
  - `typescript`: `6.0.3`
  - `zod`: `4.6.7`
  - `@lucide/svelte`: `1.74.0`
  - `vitest`: `5.1.1`
  - `@playwright/test`: `1.65.1`
- **Tindak Lanjut Manual di Vercel**:
  - Ubah Node.js Version ke **24.x** di Vercel Project Settings.
  - Tambahkan/ganti env publik menjadi `PUBLIC_SITE_URL` dan `PUBLIC_MEDIA_PUBLIC_DOMAIN`.

---

## 10. Audit Rate Limiter & Anti-Spam (Prompt 2 — `feat/rate-limiter`)

- **Inventarisasi Endpoint Tulis (`desa-pendil`)**:
  - Tidak ada form kontak publik, halaman login/admin, atau endpoint upload R2 pada aplikasi frontend publik (`/` hanya memakai form pencarian baca-saja `GET /article`).
  - Satu-satunya endpoint `POST` adalah `/api/revalidate` (webhook internal backend-ke-frontend) yang sudah dilindungi `Bearer REVALIDATE_SECRET` (`SHA-256` + `timingSafeEqual`) serta validasi Zod `4.6.7` (`tags` 1..10 item). Tidak ada UI/fitur baru yang ditambahkan agar paritas visual terjaga.
  - Implementasi rate limiter berlapis `rl:desa-pendil` (`login`, `upload`) beserta honeypot dan Turnstile berada di repo `desa-pendil-backend`.
- **Rekomendasi Vercel Hobby WAF (1 rule gratis)**: Dapat diarahkan ke `/article` (anti-scraping agresif) bila dibutuhkan di level CDN Vercel.
