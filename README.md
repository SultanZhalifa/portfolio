# Portfolio — Sultan Zhalifunnas Musyaffa

> Personal portfolio website built with React + Framer Motion. Monochrome, modern, fully responsive.

**Live:** [sultanzhalifunnas.pages.dev](https://sultanzhalifunnas.pages.dev) &nbsp;|&nbsp; **CV:** [Download PDF](https://sultanzhalifunnas.pages.dev/Sultan_CV.pdf)

---

## Sections

- **Hero** — Introduction, stats, social links
- **Now** — Current status band
- **Projects** — Featured projects as cards with screenshots, the rest in a compact list; filters, search, and a case-study page per project
- **Experience & Education** — Timeline layout with activities
- **Skills** — Grouped tags in two columns
- **Certifications** — Grouped by issuer
- **Contact** — EmailJS form (with honeypot) + direct contact links; the Projects section ends with a small live GitHub block

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 |
| Animations | Framer Motion |
| Icons | React Icons (Feather) |
| Email | EmailJS (`@emailjs/browser`) |
| Fonts | Inter · Space Grotesk · JetBrains Mono |
| Deploy | Vercel |

## Content

Almost everything on the page comes from `src/data.js`. The hero stats (project count, AI apps, certificates) are computed from it, so they stay in sync when you add a project.

Project fields worth knowing:
- `featured: true` shows the project as a card with its screenshot; the rest go in the list below.
- `ai: true` marks apps that call an AI model (hero stat and the AI & Vision filter).
- A project with a `caseStudy` gets its own page at `#/work/<slug>` (the slug is the title in lower case with dashes, e.g. `#/work/pestguard-ai`). It shows The Problem, then How It Works (`flow`) or What I Built (`approach`), then Decisions, Model Results (`metrics`), Results and Known Limits (`limits`), and skips any block the project doesn't have. Hash routes need no server rewrite rules.
- Screenshots live in `public/previews/<github-repo-name>.webp` (1000×625). Use `image` for a custom path, or `screenshot: false` if there's no real screenshot yet. A featured card without one can show `highlight: { value, label }` instead.

The resume is `public/Sultan_CV.pdf`; replace the file to update the download.

## Contact form setup

The form only works if these are set in Vercel (Project Settings → Environment Variables) and the site is redeployed. Without them the form says it can't send and shows the email address instead.

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

## Run Locally

```bash
git clone https://github.com/SultanZhalifa/portfolio
cd portfolio
npm install
npm run dev
```

Open `http://localhost:5173`

## Deploy

```bash
npm run build
# Push to GitHub, then import on vercel.com
```

---

Made by Sultan Zhalifunnas Musyaffa — [sultanzhalifunnasmusyaffa@gmail.com](mailto:sultanzhalifunnasmusyaffa@gmail.com)
