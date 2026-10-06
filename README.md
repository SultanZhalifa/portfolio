# Portfolio — Sultan Zhalifunnas Musyaffa

> Personal portfolio website built with React + Framer Motion. Monochrome, modern, fully responsive.

**Live:** [sultanzhalifunnas.vercel.app](https://sultanzhalifunnas.vercel.app) &nbsp;|&nbsp; **CV:** [Download PDF](https://sultanzhalifunnas.vercel.app/Sultan_CV.pdf)

---

## Sections

- **Hero** — Introduction, animated stats, social links
- **Now** — Currently-building status band
- **Skills** — Languages & Web, Mobile & Testing, AI & Data, Tools & Security
- **Projects** — Filterable list with expandable rows, previews & case-study modals
- **Experience & Education** — Timeline layout with activities
- **Certifications** — Google, IBM, Dicoding, RevoU, and other verified credentials
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

Almost everything on the page comes from `src/data.js`. The hero stats (project count, AI apps, certificates) are computed from it, so they stay in sync when you add a project (`ai: true` marks apps that call an AI model).
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
