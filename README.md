# Desa Pendil Landing Page

Official public website for Desa Pendil, located in Kecamatan Banyuanyar, Kabupaten Probolinggo, Jawa Timur, Indonesia. The platform provides public information, village administrative profiles, news updates, local demographic records, and community activity galleries.

Built with **SvelteKit 3**, **Svelte 5 (Runes)**, **Vite 8**, **Tailwind CSS 4**, and **@sveltejs/adapter-vercel** (`nodejs24.x`), using **Bun** as the package manager.

News and gallery entries are dynamically sourced from the [desa-pendil-backend](https://github.com/rflishrl/desa-pendil-backend) service running on port 4000. All other informational sections are statically maintained within this repository with offline fallbacks.

---

## Tech Stack

- **Framework**: SvelteKit 3 (`@sveltejs/kit` 3.2.x) + `@sveltejs/adapter-vercel` 7.x (`nodejs24.x`)
- **UI**: Svelte 5 (Runes)
- **Bundler**: Vite 8
- **Package Manager**: Bun (`bun.lock`)
- **Runtime (Production / Vercel)**: Node.js 24 LTS (`>= 22.17`)
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`)
- **Language**: TypeScript 6 (Strict mode, `#lib` subpath imports)
- **Validation**: Zod 4
- **Testing**: Vitest 5 + Playwright
- **Code Hygiene**: ESLint + Prettier + `svelte-check`
- **Icons**: `@lucide/svelte` + inline brand SVGs

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (`>= 1.0`)
- [Node.js](https://nodejs.org) (`>= 22.17`, Node 24 LTS recommended for parity with Vercel)

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Copy the example environment file:

```bash
# Windows
copy .env.example .env.local

# macOS / Linux
cp .env.example .env.local
```

### 3. Run Development Server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Commands

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts local Vite development server on port 5173 |
| `bun run build` | Builds the SvelteKit production bundle via `@sveltejs/adapter-vercel` |
| `bun run preview` | Previews the production build locally |
| `bun run check` | Runs `svelte-kit sync` and `svelte-check` |
| `bun run lint` | Runs Prettier check and ESLint |
| `bun run format` | Formats all files with Prettier |
| `bun run test` | Runs Vitest unit/integration tests |
| `bun run test:e2e` | Runs Playwright end-to-end tests |

---

## Environment Variables

| Variable | Description | Requirement |
| :--- | :--- | :--- |
| `API_BASE_URL` | Base URL of the backend API without trailing slash (e.g. `http://localhost:4000/api` or production endpoint) | Required in production |
| `REVALIDATE_SECRET` | Shared secret token for on-demand cache revalidation at `POST /api/revalidate` | Optional (Required for webhook revalidation) |
| `PUBLIC_MEDIA_PUBLIC_DOMAIN` | Public Cloudflare R2 custom domain for village media (e.g. `https://media-dp.raflisahrul.my.id`) | Optional |
| `PUBLIC_SITE_URL` | Canonical public URL used for Open Graph metadata, `sitemap.xml`, and `robots.txt` (defaults to `https://desapendil.id`) | Optional |

In development, `API_BASE_URL` defaults to `http://localhost:4000/api`. In production, server loaders validate this configuration early.

- **Vercel Deployment**: Set **Framework Preset** to `SvelteKit` (command overrides OFF) and **Node.js Version** to **24.x** in Vercel Project Settings (`Settings -> Build & Deployment`); `package.json` omits `engines.node` intentionally so Vercel does not trigger `Node.Js Version Override`. Ensure `PUBLIC_SITE_URL` and `PUBLIC_MEDIA_PUBLIC_DOMAIN` are configured cleanly (remove legacy `VITE_*`, `NEXT_PUBLIC_*`, and `BLOB_*` vars).

---

## Route Architecture

All routes use SvelteKit file-based routing inside `src/routes/`:

| Route File | URL Path | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `src/routes/+layout.svelte` | Root shell | Layout | Skip link, top progress bar, navbar, main landmark, footer |
| `src/routes/+error.svelte` | Error / 404 | Error | Custom 404 and runtime error fallback |
| `src/routes/+page.svelte` | `/` | Streaming SSR | Landing page: hero search, streamed latest news, village head speech, officials, and agenda |
| `src/routes/article/+page.svelte` | `/article` | SSR | News archive with search filter (`?q=`) and pagination (`?page=`) |
| `src/routes/article/[id]/+page.svelte` | `/article/:id` | SSR | Article detail view with dynamic Open Graph tags and 404 handling |
| `src/routes/services/+page.svelte` | `/services` | SSR | Village public services, demographic data, hamlet statistics, and gallery preview |
| `src/routes/profile/+page.svelte` | `/profile` | Prerendered | Historical origin, administrative governance, village culture, and achievements |
| `src/routes/gallery/+page.svelte` | `/gallery` | SSR | Photo gallery with responsive grid, mobile swipe rail, and pagination |
| `src/routes/robots.txt/+server.ts` | `/robots.txt` | Server Route | Crawler directives (`GET`) |
| `src/routes/sitemap.xml/+server.ts` | `/sitemap.xml` | Server Route | Search engine sitemap XML (`GET`) |
| `src/routes/api/revalidate/+server.ts` | `/api/revalidate` | Server Route | Constant-time authorized webhook for cache invalidation (`POST`) |

---

## Data Fetching & Resilience

Backend communication is handled exclusively in server-only modules under `src/lib/server/api/`:

- **Server-only Secrets**: Private variables are read via `$app/env/private` (`src/env.ts` `defineEnvVars`); public values use `$app/env/public`.
- **Resilience**: An 8-second request timeout (`AbortSignal.timeout(8000)`) is enforced. Malformed items are logged and skipped rather than breaking the page. When the backend is unreachable, the site degrades cleanly to empty states and local fallback media.
- **Webhook Invalidation**: `POST /api/revalidate` uses SHA-256 + `crypto.timingSafeEqual` to verify the Bearer secret before accepting cache tags.

---

## Project Structure

```
src/
  app.html            Document shell, favicons, and base meta
  app.d.ts            SvelteKit ambient types
  env.ts              SvelteKit 3 defineEnvVars() declarations
  fonts/              Self-hosted Montserrat & Work Sans WOFF2 fonts
  styles/globals.css  Tailwind v4 @theme design tokens, fonts, and print styles
  lib/
    components/       Svelte 5 UI primitives, layout, domain cards, and sections
    config/           Site constants, navigation links, and operational hours
    data/             Static village records, demographics, and cultural items
    server/           Server-only API client, env validation, and revalidate logic
    types/            TypeScript interface contracts
  routes/             SvelteKit 3 file-based routes and endpoints
static/               Static assets (favicon, local fallback photos)
test/                 Vitest unit tests & Playwright E2E specs
```

---

## Deployment to Vercel

1. Set **Framework Preset** to **`SvelteKit`** with all command overrides (**Build Command**, **Output Directory**, **Install Command**, **Development Command**) **OFF** so Vercel auto-detects `bun.lock` and `.vercel/output`.
2. Set **Node.js Version** to **`24.x`** in **Project Settings -> Build & Deployment** (`vite.config.ts` targets `nodejs24.x`, region `sin1`; `package.json` omits `engines.node` to avoid Vercel's `Node.Js Version Override` warning).
3. Configure only the 4 active environment variables (`API_BASE_URL`, `REVALIDATE_SECRET`, `PUBLIC_SITE_URL`, `PUBLIC_MEDIA_PUBLIC_DOMAIN`). Since `PUBLIC_*` variables are inlined at build time, redeploy after changing them.
4. *(Optional, Free Tier)* Add 1 Vercel Firewall WAF rate-limiting rule on `POST /api/revalidate` or `/article` if needed.
