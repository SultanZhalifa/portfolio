# DevLog

> Log what you learn and build each day, visualize your streaks like GitHub contributions, and share your journey publicly.

A fullstack accountability platform for developers — built on the **Next.js 16 App Router** with server components, type-safe data access, and a CI pipeline.

 **Live demo:** [devlog-sultanzhalifa.vercel.app](https://devlog-sultanzhalifa.vercel.app)

<!-- TIP: Add a screenshot of the streak heatmap + dashboard here — it's the most eye-catching part of the app. -->
<!-- ![DevLog dashboard](docs/dashboard.png) -->

---

## Features

- **GitHub OAuth** — passwordless sign-in via Auth.js v5
- **Daily logging** with technology tags and a 1–5 mood rating
- **Streak heatmap** — GitHub-style contribution calendar
- **Analytics dashboard** — weekly entries, tag-frequency charts, streak stats
- **Public profiles** — shareable pages with aggregated stats
- **Discovery feed** — browse others' entries and trending tags
- **Dark mode** + full mobile responsiveness

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript 5 |
| Database / ORM | Prisma 7 + PostgreSQL (Supabase) |
| Auth | Auth.js v5 (GitHub OAuth) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts |
| Testing | Vitest + React Testing Library |
| CI/CD | GitHub Actions to Vercel |

---

## Data Model

`User` (GitHub-synced, public/private) · `Entry` (daily log, mood, content) · `Tag` · `EntryTag` (many-to-many) · `Follow` (user-to-user)

---

## Testing & CI

- `calculateStreak` — 8 cases covering empty logs, gaps, and deduplication (the trickiest logic in the app)
- `EntryCard` — content, tags, conditional rendering
- GitHub Actions runs typecheck, lint, and tests on every push

---

## Run Locally

```bash
git clone https://github.com/SultanZhalifa/devlog.git
cd devlog && npm install
cp .env.example .env.local      # add GitHub OAuth + Supabase URL + NextAuth secret
npx prisma migrate deploy
npm run dev
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com · *MIT License*
