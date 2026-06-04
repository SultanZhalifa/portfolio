# TaskFlow

> A client-side task manager built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies. A deliberate exercise in writing clean, testable code without reaching for a library.

<!-- TIP: Add a screenshot or GIF (drag-and-drop reordering looks great in motion). -->

---

## Features

Task CRUD · priority levels · due dates with overdue indicators · duplicate detection · filter views (All/Active/Completed) · real-time search with highlighting · **drag-and-drop reordering** · JSON export/import backups · dark mode (`prefers-color-scheme`) · toast notifications · keyboard shortcuts (Enter, Escape, Ctrl+K) · responsive.

---

## Engineering

Testable logic is separated into `taskUtils.js` and covered with **Vitest**; **ESLint + Prettier** enforce style; **GitHub Actions** runs lint, format, and tests on every push. Data persists via the localStorage API; import/export uses the FileReader API.

---

## Tech

HTML5 · CSS3 (custom properties, animations) · JavaScript ES6+ · localStorage · FileReader API
*Zero runtime dependencies.*

---

## Run

```bash
git clone https://github.com/SultanZhalifa/TaskFlow.git
cd TaskFlow && npx serve .      # or just open index.html
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com · *MIT License*
