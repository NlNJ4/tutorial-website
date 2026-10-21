# Learnly

A personal learning library. One creator organizes educational YouTube videos into simple collections and shares them with family, friends, or anyone through a public link.

**Upload elsewhere → organize → watch → learn → share.**

No accounts, no payments, no database — everything lives in one TypeScript file.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, static generation)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Getting started

For project-specific Cursor skills, rules, and reusable commands, see [`.cursor/README.md`](.cursor/README.md).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

## Adding a collection

Everything the site displays comes from [`data/collections.ts`](data/collections.ts). Two ways to add content:

1. **By hand** — copy an existing collection object and edit it. Each lesson needs a `title`, `youtubeId`, `duration` (in seconds), and a short `description`. Thumbnails are optional: a collection falls back to its first lesson's YouTube thumbnail automatically.
2. **With the creator tool** — visit [`/create`](http://localhost:3000/create), fill in the form, and paste the generated code into `data/collections.ts`.

Set `featured: true` on a collection to show it on the home page. Categories come from the canonical list in [`data/types.ts`](data/types.ts) — add your own there if needed.

## Project structure

```
app/                    Routes: home, library, collection, lesson, about, create
components/             Navbar, cards, filters, YouTube player, lesson sidebar…
data/                   types.ts + collections.ts (all content lives here)
lib/                    Query helpers, progress storage, utils
hooks/                  useCollectionProgress (localStorage progress)
```

## Features

- 📚 Collections with lesson lists, durations, and resource links
- 🔍 Client-side search, category filters, and sorting on the library page
- ▶️ YouTube videos embedded directly (privacy-enhanced `youtube-nocookie`)
- 🌗 Dark mode toggle
- ✅ Lightweight local progress: completed lessons and last-opened lesson, stored in `localStorage` (no accounts)
- 📱 Fully responsive — the lesson sidebar becomes a drawer on mobile

## Deploying

The site is fully static (no server code), so any Next.js host works. The easiest option is [Vercel](https://vercel.com): import the repo and deploy — no environment variables required.
