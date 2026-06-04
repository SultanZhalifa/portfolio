# SaringSini

> A multimodal AI fact-checker that helps families spot hoaxes in WhatsApp groups — **without damaging silaturahmi**. Built for the **#JuaraVibeCoding 2026** competition.

SaringSini analyzes text, screenshots, and links for misinformation using multimodal Gemini, then generates calm, family-friendly responses in four Indonesian regional languages so you can correct a relative without starting a fight.

<!-- TIP: Add a screenshot/GIF of the analysis flow + WhatsApp simulator here. -->

---

## Highlights

- **Multimodal analysis** — text, screenshots (deepfake cues), and URL phishing checks via Gemini
- **Family-friendly response templates** in Javanese Krama, Sundanese, Minangkabau, and Batak
- **"Bahasa Mama" coaching mode** — AI personas simulate realistic family persuasion dynamics
- **AI tone slider** — regenerate a response anywhere from gentle to formal (0–100), debounced
- **Hoax DNA** — a generative SVG "fingerprint" unique to each analysis
- Voice input (Indonesian) for elderly users · PDF report export · community feed

---

## Production-grade hardening

Rate limiting (6 req/min) · CSP + anti-XSS headers · multi-stage Docker build (non-root) · global error boundary · WCAG 2.1 AA · service worker (stale-while-revalidate) — deployed on **Google Cloud Run**.

---

## Tech Stack

**Backend** Node.js 18 · Express
**AI** Google Gemini (multimodal)
**Frontend** HTML5 · CSS3 · Vanilla JS (ES6+) · PWA / Service Worker · jsPDF · Web Speech API
**Infra** Docker · Google Cloud Run

---

## Run Locally

```bash
git clone https://github.com/SultanZhalifa/SaringSini.git
cd SaringSini && npm install
echo "GEMINI_API_KEY=your_key" > .env
npm start          # http://localhost:3000
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com
