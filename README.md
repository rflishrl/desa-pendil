# Desa Pendil Website

Official public website for Desa Pendil, located in Banyuanyar, Probolinggo, East Java, Indonesia. The platform provides news updates, public administration data, village governance profiles, and community photo galleries.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and powered by the **Bun** runtime.

News and gallery entries are dynamically sourced from the [desa-pendil-backend](https://github.com/rflishrl/desa-pendil-backend) service. All other informational sections are statically maintained within this repository.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Runtime & Package Manager**: Bun 1.4+
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5.9 (Strict mode)
- **Icons**: React Icons (Heroicons, Phosphor Icons, FontAwesome)
- **Validation**: Zod 4

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
cp .env.example .env.local
```

### 3. Run Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Commands

| Command | Action |
| --- | --- |
| `bun dev` | Starts the local Next.js development server |
| `bun run build` | Compiles the production build using Turbopack |
| `bun run start` | Launches the compiled production server |
| `bun run lint` | Runs ESLint 9 checks |
| `bun run typecheck` | Validates TypeScript types with `tsc --noEmit` |

---

## Environment Variables

| Variable | Description | Requirement |
| --- | --- | --- |
| `API_BASE_URL` | Base URL of the backend API without trailing slash (e.g. `http://localhost:4000/api` or production endpoint) | Required in production |
| `REVALIDATE_SECRET` | Shared secret token for on-demand revalidation at `POST /api/revalidate` | Optional (Required for webhook revalidation) |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL used for Open Graph metadata, `sitemap.xml`, and `robots.txt` (defaults to `https://desapendil.id`) | Recommended |

In development, `API_BASE_URL` defaults to `http://localhost:4000/api`. In production, builds validate this configuration and fail early if the endpoint is missing or malformed.

---

## Site Pages & Architecture

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero search, latest news rail, village head address, officials, and agenda |
| `/article` | News archive with client search queries and pagination |
| `/article/[id]` | Individual article detail view |
| `/services` | Public services, demographic data, and village statistics |
| `/profile` | Historical overview, governance structure, culture, and achievements |
| `/gallery` | Community photo gallery with responsive grid and swipe rail |
| `/robots.txt` | Crawler directives |
| `/sitemap.xml` | Search engine indexing index |

---

## Data Fetching & Reliability

Backend interactions route through typed client helpers in `src/lib/api`. Network requests enforce an 8-second timeout and validate incoming payloads against Zod schemas.

- **Resilience**: If an item in a list contains invalid data, it is logged and skipped rather than failing the entire page. If the backend is temporarily unreachable, the frontend renders clear empty states instead of crashing.
- **Cache Strategy**: Dynamic endpoints cache content with Next.js tags (`news`, `gallery`). The backend triggers `POST /api/revalidate` with `revalidateTag(tag, { expire: 0 })` whenever village admins publish or update content.

---

## Modern Web Standards & Accessibility

- **Semantics**: Uses HTML5 landmark elements including `<search>`, `<header>`, `<nav>`, `<main>`, and `<footer>`.
- **Keyboard Navigation**: Features an accessible skip-to-content link targeting `<main tabIndex={-1}>` for assistive devices.
- **Layout Stability**: Configures `scrollbar-gutter: stable` to eliminate horizontal layout shifts (CLS) across page transitions.
- **Swipe Containment**: Mobile card rails employ `overscroll-behavior-inline: contain` to prevent accidental history navigation during touch scrolling.
- **Responsive Typography**: Headings use `text-wrap: balance` for symmetrical line wrapping; paragraphs utilize `text-wrap: pretty` to avoid orphaned words.
- **Self-Hosted Assets**: Montserrat and Work Sans fonts are locally bundled in WOFF2 format under `src/fonts`, ensuring zero external network dependencies during page load.

---

## Project Structure

```
src/
  app/          Next.js App Router routes, metadata, and error boundaries
  components/
    cards/      Domain-specific cards (Article, Official, Stat, Agenda, Culture)
    layout/     Shared header, navigation dialogs, and site footer
    ui/         Reusable UI primitives (Button, CardRail, Container, Panel)
  config/       Static site configuration, navigation trees, and constants
  data/         Fallback data and local static village records
  fonts/        Self-hosted font files with SIL Open Font Licenses
  lib/          API client, environment validation, formatting, and utilities
  sections/     Composed section modules used across pages
  types/        Shared TypeScript interfaces and definitions
```
