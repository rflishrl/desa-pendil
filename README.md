# Desa Pendil Website

Official public website for Desa Pendil, located in Kecamatan Banyuanyar, Kabupaten Probolinggo, Jawa Timur, Indonesia. The platform provides public information, village administrative profiles, news updates, local demographic records, and community activity galleries.

Built with **TanStack Start**, **TanStack Router**, **React 19**, **Vite 8**, **Nitro**, **Tailwind CSS**, and powered by the **Bun** runtime.

News and gallery entries are dynamically sourced from the [desa-pendil-backend](https://github.com/rflishrl/desa-pendil-backend) service running on port 4000. All other informational sections are statically maintained within this repository with offline fallbacks.

---

## Tech Stack

- **Framework**: TanStack Start 1.169 (Full-stack SSR with Nitro)
- **Routing**: TanStack Router 1.170 (100% type-safe file-based routing)
- **Bundler & Build Tool**: Vite 8.3
- **Runtime & Package Manager**: Bun 1.4+
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5.9 (Strict mode)
- **Validation**: Zod 4
- **Code Hygiene**: Biome 2.6 (Linter & Formatter)
- **Icons**: React Icons (Heroicons, Phosphor Icons, FontAwesome)

---

## Getting Started

### Prerequisites

You need [Bun](https://bun.sh) (version 1.0 or newer).

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
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Commands

| Command | Action |
| :--- | :--- |
| `bun dev` | Starts local Vite development server on port 5173 |
| `bun run build` | Compiles client and Nitro SSR production bundles into `.output` |
| `bun run preview` | Previews the production build locally |
| `bun run start` | Alias for `bun run preview` |
| `bun run typecheck` | Validates TypeScript types with `tsc --noEmit` |
| `bun run lint` | Runs Biome to check code quality and formatting (`biome check .`) |
| `bun run check` | Applies safe Biome linter and formatter autofixes (`biome check --write .`) |
| `bun run format` | Formats all files with Biome (`biome format --write .`) |

---

## Environment Variables

| Variable | Description | Requirement |
| :--- | :--- | :--- |
| `API_BASE_URL` | Base URL of the backend API without trailing slash (e.g. `http://localhost:4000/api` or production endpoint) | Required in production |
| `REVALIDATE_SECRET` | Shared secret token for on-demand cache revalidation at `POST /api/revalidate` | Optional (Required for webhook revalidation) |
| `VITE_SITE_URL` | Canonical public URL used for Open Graph metadata, `sitemap.xml`, and `robots.txt` (defaults to `https://desapendil.id`) | Optional |

In development, `API_BASE_URL` defaults to `http://localhost:4000/api`. In production, builds validate this configuration and fail early if the endpoint is missing or malformed.

---

## Route Architecture

All routes use TanStack Router file-based routing inside `src/routes/`:

| Route File | URL Path | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `src/routes/__root.tsx` | Root shell | Layout | HTML document shell, head metadata, navbar, footer, and progress bar |
| `src/routes/index.tsx` | `/` | Streaming SSR | Landing page: hero search, streaming latest news, village head speech, officials, and agenda |
| `src/routes/article/index.tsx` | `/article` | Full SSR | News archive with search filter (`?q=`) and pagination (`?page=`) |
| `src/routes/article/$id.tsx` | `/article/$id` | Full SSR | Article detail view with dynamic Open Graph tags and custom 404 guard |
| `src/routes/services.tsx` | `/services` | Full SSR | Village public services, demographic data, and hamlet statistics |
| `src/routes/profile.tsx` | `/profile` | Static SSR | Historical origin, administrative governance, village culture, and achievements |
| `src/routes/gallery.tsx` | `/gallery` | Full SSR | Photo gallery with responsive grid, mobile swipe rail, and pagination |
| `src/routes/robots[.]txt.ts` | `/robots.txt` | Server Route | Crawler directives (GET) |
| `src/routes/sitemap[.]xml.ts` | `/sitemap.xml` | Server Route | Search engine sitemap XML (GET) |
| `src/routes/api/revalidate.ts` | `/api/revalidate` | Server Route | Constant-time authorized webhook for cache invalidation (POST) |

---

## Data Fetching & Server Functions

Backend communication is handled through typed server functions defined in `src/lib/api/functions.ts` via TanStack Start `createServerFn`:

- **Isomorphic Execution**: Data loaders run on the server during SSR and make lightweight RPC calls during client transitions.
- **Resilience**: An 8-second request timeout (`AbortSignal.timeout(8000)`) is enforced. If an item contains unexpected shapes, it is safely logged and skipped rather than failing the entire page. When the backend is offline, the frontend degrades to informative empty states and static placeholders.
- **Webhook Invalidation**: `POST /api/revalidate` uses constant-time token comparison (`timingSafeEqual`) to verify the secret before processing cache tags.

---

## Web Standards & Accessibility

- **Semantics**: Uses standard HTML5 landmark elements (`<header>`, `<nav>`, `<main>`, `<search>`, `<footer>`) with valid heading hierarchy.
- **Keyboard Navigation**: Includes an accessible skip-to-content link targeting `<main tabIndex={-1}>` and visible focus outlines for all interactive controls.
- **View Transitions**: Leverages the native browser View Transitions API for smooth cross-document page changes, respecting `prefers-reduced-motion`.
- **Layout Stability & CLS**: All images define intrinsic dimensions and asynchronous decoding. The document shell sets `scrollbar-gutter: stable` to eliminate horizontal layout shifts.
- **Mobile Ergonomics**: Horizontal card rails provide scroll affordance hints, touch-friendly tap targets (minimum 44px), and `overscroll-behavior-inline: contain`.
- **Print Optimization**: Includes a dedicated `@media print` stylesheet that strips navigation overlays and formats content cleanly for physical printing by village residents.
- **Self-Hosted Assets**: Montserrat and Work Sans fonts are locally bundled in WOFF2 format under `src/fonts/` with `font-display: swap`, eliminating third-party CDN tracking and external network failures.

---

## Project Structure

```
src/
  components/
    cards/        Domain cards (ArticleCard, OfficialCard, StatCard, AgendaCard, CultureCard)
    layout/       Shared navigation bar and footer
    ui/           Accessible UI primitives (Button, CardRail, Container, Panel, TopProgressBar)
  config/         Site constants, navigation links, and operational hours
  data/           Authentic local records, village statistics, and cultural information
  fonts/          Locally hosted font files (SIL Open Font License)
  lib/            Server functions, API client, environment validation, and utilities
  routes/         TanStack Router file-based route definitions
  sections/       Composed section components used across pages
  types/          TypeScript interface contracts
  globals.css     Tailwind layers, font declarations, and print styles
  router.tsx      Router factory and TanStack Router registration
  routeTree.gen.ts Generated route tree (maintained by router plugin)
```
