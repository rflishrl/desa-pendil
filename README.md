# Desa Pendil website

Public website for Desa Pendil: news, public services, the village profile, and a photo gallery. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS 3.

News and gallery photos come from the [backend](https://github.com/rflishrl/desa-pendil-backend). Everything else is static content in this repo.

## Run locally

```bash
yarn install
cp .env.example .env.local   # optional
yarn dev                     # http://localhost:3000
```

Other scripts: `yarn build`, `yarn start`, `yarn lint`, `yarn typecheck`.

## Environment

| Variable | Value | Required |
| --- | --- | --- |
| `API_BASE_URL` | Backend API address ending in `/api`, with no trailing slash. Example: `https://your-backend.vercel.app/api` | In production |

Outside production the address defaults to `http://localhost:4000/api`, which matches `npm run dev` in the backend. In production, `next build` stops if the variable is missing. On Vercel, redeploy after you change it.

## Pages

| Route | Content |
| --- | --- |
| `/` | Home: hero, latest news, village officials, strengths, local arts |
| `/article` | News list with search and pagination |
| `/article/[id]` | News detail |
| `/services` | Public services, village data, gallery preview |
| `/profile` | Village history, welcome message, officials |
| `/gallery` | Photo gallery with pagination |

## Project layout

```
src/
  app/          routes, layout, error and 404 pages
  components/   layout (Navbar, Footer), ui, cards
  sections/     page sections reused across routes
  data/         static content (placeholder)
  config/       navigation and site info
  fonts/        self-hosted Montserrat and Work Sans (latin subset)
  lib/          API client, date formatting, image helpers
  types/        shared TypeScript types
```

## Data and caching

All backend calls go through `src/lib/api`. The client sets an 8 second timeout, checks the status code, and validates each response with Zod. A single invalid item is skipped and logged instead of emptying the whole list. Pages cache results for 5 minutes and tag them `news` and `gallery`, so a revalidation call can refresh them sooner.

If the backend is down, pages show an empty state and do not crash. Configuration errors are not hidden.

Village data, officials, strengths, and arts are placeholders in `src/data/village.ts`.

## Design

Colors, shadows, the hero gradient, and the fonts come from the "Web Desa" Figma file and live in `tailwind.config.ts`. Layouts are mobile first, from 375px up to wide desktops.

Fonts are stored in `src/fonts` instead of loaded from Google Fonts, so builds do not depend on an external request. Both fonts use the SIL Open Font License; the license texts sit next to the files.
