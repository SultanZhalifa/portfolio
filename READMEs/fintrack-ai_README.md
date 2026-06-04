# FinTrack.ai

> A local-first personal finance app with budgeting intelligence — **100% private**, no backend, no account. Optional Google Gemini insights, installable as a PWA.

 **Live demo:** [financetrackersultan.vercel.app](https://financetrackersultan.vercel.app)

<!-- TIP: Add a screenshot of the dashboard + health-score here. -->

---

## Features

- **Multi-account** tracking (cash, bank, e-wallet, savings) with transfers and net-worth calculation
- **Budgeting** — monthly category budgets, YNAB-style "safe-to-spend per day," month-end forecasts
- **Recurring transactions** (daily/weekly/monthly/yearly)
- **Financial health score (0–100)** across four pillars: savings rate, budget adherence, expense stability, emergency buffer
- **AI insights (optional)** via Gemini — *honest by design:* with no API key, the panel says one is required rather than faking advice
- Command palette (Ctrl/Cmd-K) · CSV export · JSON backup · bilingual (ID/EN) · installable PWA with offline support

---

## Tech Stack

**React 19** · Vite 8 · Chart.js · Framer Motion · localStorage (versioned migrations) · vite-plugin-pwa · Google Gemini API (optional) · Frankfurter API (exchange rates)

---

## Architecture

Feature modules with **pure calculation libraries** (`lib/`)  easy to reason about and test. Centralized state via React Context, localStorage-backed with versioned migrations. Accessibility built in: ARIA labels, keyboard focus, Escape-to-close, `prefers-reduced-motion`.

---

## Run

```bash
git clone https://github.com/SultanZhalifa/fintrack-ai.git
cd fintrack-ai && npm install
# optional: echo "VITE_GEMINI_API_KEY=your_key" > .env.local
npm run dev
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com
