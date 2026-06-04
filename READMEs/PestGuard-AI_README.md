# PestGuard AI

> Real-time warehouse pest & bio-hazard detection — built for the **PT Kawan Lama Group AI Open Innovation Challenge 2026** (Logistics Category).

PestGuard AI continuously watches warehouse camera feeds and raises a **sub-second alert** the moment an unauthorized animal (snake, cat, gecko) enters a storage zone — protecting inventory from bio-hazard contamination that manual patrols routinely miss.

 **Live demo:** [pestguard-ai.vercel.app](https://pestguard-ai.vercel.app/login)

<!-- TIP: Add a screenshot or GIF of the live dashboard right here. It's the single biggest thing a recruiter looks at. Example: -->
<!-- ![PestGuard Dashboard](docs/screenshot-dashboard.png) -->

---

## Why it matters

| Metric | Value |
|---|---|
| Manual pest control cost | Rp 15–30 million / month |
| PestGuard operating cost | ~Rp 3 million / month |
| **Estimated annual savings** | **Rp 144–324 million** per warehouse |
| Break-even | 4–6 months · 3-year ROI > 200% |

---

## Key Features

- **Multi-zone monitoring** — up to 4 camera zones simultaneously at 720p
- **Sub-second alerts** over WebSocket, with browser audio alarm, Telegram bot, and Indonesian text-to-speech
- **Risk tiering** — Snake (DANGER) · Cat (WARNING) · Gecko (INFO), each with its own SOP response
- **Gemini AI assistant** — a RAG chatbot that injects live detection data into prompts for contextual warehouse guidance
- **Analytics dashboard** — trend charts, zone heatmaps, peak-hour analysis, PDF/CSV reports
- **Role-based access** — Admin · Manager · Operator tiers

---

## The Computer Vision

The detection model is a **custom-trained YOLO11-Nano** (5.2 MB) — small enough to run fast on CPU, accurate enough for real warehouse conditions.

- Trained on Roboflow public data **plus custom warehouse footage**, including nighttime and partial-occlusion samples
- **CLAHE low-light preprocessing** (clipLimit 2.5, 8×8 tiles) so detection holds up in dim storage areas
- Inference at 320px with frame-skipping for speed; automatic CUDA/CPU fallback
- Augmentation: horizontal flip, ±30% brightness, ±15% rotation, mosaic

---

## Architecture

```
Camera Layer    -->   AI / ML Layer     -->   Alert Layer
(RTSP / webcam,       (YOLO11 + CLAHE,        (WebSocket broadcast,
 720p, frame-skip)     CUDA/CPU auto)          audio / Telegram / TTS)
```

The **FastAPI** backend handles auth, camera routing, analytics, and Gemini integration over a thread-safe **SQLite (WAL mode)** store. The **React + Vite** frontend renders the live grid, charts, and AI panel.

---

## Tech Stack

**Backend** Python 3.12 · FastAPI · WebSocket · SQLite (WAL) · bcrypt
**AI / CV** YOLO11-Nano (custom) · OpenCV · CLAHE · Google Gemini 2.0 Flash (RAG)
**Frontend** React 18 · Vite · Recharts · Web Audio API
**Infra** Docker · Docker Compose · Telegram Bot API

---

## Quick Start

```bash
git clone https://github.com/SultanZhalifa/PestGuard-AI.git
cd PestGuard-AI
docker-compose up --build
```

Then open **localhost:5173** (dashboard) and **localhost:8000/docs** (API).
Default role passwords are auto-generated and printed in the terminal on first start.

---

## Structure

```
backend/   routes (auth, camera, analytics, chat, logs, zones, users) · services (detector, TTS, Telegram, WS)
src/       pages (LiveMonitor, DetectionLogs, RiskAnalysis, AskAI, SOPMitigasi, UserManagement) · components
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com

*MIT License*
