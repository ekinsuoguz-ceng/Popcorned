# 🍿 Popcorned

A movie discovery app built with Next.js and the TMDB API. Browse popular movies, search in real time, switch between grid densities, and check out movie details — all wrapped in a dark, cinema-inspired UI.

## Features

- **Popular movies feed** — fetched server-side from TMDB, cached with `revalidate`.
- **Live search** — results update automatically as you type (debounced), no need to press Enter. Clearing the search box returns you to the popular movies list.
- **Grid density toggle** — switch between a 3-column and 5-column layout; your choice and search term are preserved together in the URL.
- **Movie detail pages** — poster, backdrop, rating, runtime, release date, and overview, fetched client-side with TanStack Query.
- **Popcorn confetti** — click the popcorn emoji for a little popcorn-shaped confetti burst (`@tsparticles/confetti`).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [TanStack React Query 5](https://tanstack.com/query) for client-side data fetching/caching
- [@tsparticles/confetti](https://particles.js.org/) for the popcorn confetti effect
- [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) for movie data

## Getting started

### Prerequisites

- Node.js 20+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your TMDB credentials:

   ```bash
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
app/
├── components/
│   ├── MovieCard.tsx       # Poster card used in the movies grid
│   ├── Navbar.tsx          # Top navigation bar
│   ├── PopcornClicker.tsx  # Popcorn emoji + confetti easter egg
│   └── SearchInput.tsx     # Debounced live search box
├── movies/
│   ├── page.tsx            # Movies grid (popular / search results)
│   └── [id]/page.tsx       # Movie detail page
├── providers/
│   └── QueryProvider.tsx    # TanStack Query provider
├── services/
│   └── tmdb.ts              # TMDB API calls (popular, search, details)
└── page.tsx                 # Landing page
```

## Notes

- Movie data is in Turkish (`language=tr-TR`) by default — change this in [`app/services/tmdb.ts`](app/services/tmdb.ts) if you need another language.
- `.env.local` is gitignored; never commit real API keys.
