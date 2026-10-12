export const data = {
  name: "Sultan Zhalifunnas Musyaffa",
  nameShort: "Sultan",
  location: "Kab. Bekasi, Jawa Barat",
  phone: "+62 851 1051 1140",
  title: "Full-Stack & AI Developer",
  subtitle: "Software Engineer Intern · Full-Stack & AI Developer",
  availability: "Open to part-time & remote roles",
  summary:
    "Informatics student (Cyber Security concentration) and Software Engineer Intern at Kementerian PANRB. I mostly build web, mobile, and AI projects on my own, from planning to deployment. Open to part-time or remote roles.",
  email: "sultanzhalifunnasmusyaffa@gmail.com",
  github: "https://github.com/SultanZhalifa",
  linkedin: "https://linkedin.com/in/sultanzhalifunnasmusyaffa",

  now: [
    "Software Engineer Intern at Kementerian PANRB, Government Digital Transformation (Jul 2026 — Jan 2027, expected)",
    "Open to part-time and remote roles now. Full-time after I graduate (Dec 2027).",
  ],

  education: [
    {
      school: "President University",
      degree: "Bachelor of Informatics (S.Kom.), Cyber Security Concentration",
      period: "Sep 2024 — Dec 2027 (expected)",
      location: "Cikarang, Indonesia",
      points: [
        "GPA 3.23 / 4.00. Jababeka Scholarship recipient (Aug 2024 — present).",
        "Relevant coursework: Algorithms, Data Structures, Database Systems, Software Engineering, Computer Networks.",
      ],
    },
  ],

  skills: [
    {
      category: "Programming",
      items: ["TypeScript", "JavaScript", "Python", "Kotlin", "Dart", "Java", "SQL", "C", "Haskell"],
    },
    {
      category: "Web & Mobile",
      items: [
        "React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "REST API",
        "Android (MVVM, Room, Coroutines)", "Flutter", "PWA",
      ],
    },
    {
      category: "AI & Database",
      items: [
        "Gemini API", "Claude API", "Vercel AI SDK", "YOLO11", "OpenCV", "RAG",
        "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Prisma", "Supabase",
      ],
    },
    {
      category: "Tools & Testing",
      items: ["Git", "GitHub Actions", "Docker", "Linux", "Vitest", "Playwright", "JUnit", "MockK"],
    },
    {
      category: "Security",
      items: ["Vulnerability assessment", "Network security", "Risk assessment (OCTAVE Allegro)"],
    },
  ],

  languages: ["Indonesian (native)", "English (professional working)"],

  // Order matters. `featured: true` projects show as cards with a screenshot,
  // the rest go in the compact list below them. `ai: true` means the app calls
  // an AI model or API; the hero stat and the "AI & Vision" filter both read it.
  // `image` overrides the default /previews/<github-repo-name>.webp screenshot;
  // `screenshot: false` hides it (no real screenshot yet), and `highlight`
  // shows a key number in its place on featured cards.
  projects: [
    {
      id: 7,
      featured: true,
      title: "PestGuard AI",
      subtitle: "Real-Time Warehouse Pest Detection",
      role: "AI & Backend Developer",
      period: "Apr — Jun 2026",
      context: "AI Open Innovation Challenge 2026 — PT Kawan Lama Group",
      summary:
        "Warehouse pest detection with a custom-trained YOLO11 model. It sends WebSocket alerts in under 1 second, handles low-light footage with CLAHE, and has a Gemini-based RAG assistant.",
      result: "Selected project in the AI Open Innovation Challenge 2026 (PT Kawan Lama Group).",
      tech: ["Python", "FastAPI", "React", "YOLO11", "OpenCV", "Gemini AI", "WebSocket", "SQLite", "Docker"],
      github: "https://github.com/SultanZhalifa/PestGuard-AI",
      demo: "https://pestguard-ai.vercel.app/login",
      ai: true,
      // Case study sourced from the PestGuard-AI repo: README, backend/routes/camera.py,
      // backend/config.py, backend/routes/chat.py, backend/routes/model_info.py,
      // backend/scripts/train_custom_model.py.
      caseStudy: {
        problem: "Snakes, cats and geckos getting into a warehouse are a safety and contamination risk. Checking by hand doesn't scale to a large warehouse, and it can't run around the clock.",
        team: "Team project with Team Andalusia. My role: AI & Backend Developer.",
        flow: [
          "Each camera zone (webcam, RTSP stream or video file) is read in its own thread at about 30 fps. If a stream drops, the worker reconnects on its own.",
          "Every 3rd frame goes to a separate inference thread. That queue holds a single frame, so when the model is still busy the new frame is dropped instead of piling up.",
          "Before inference, CLAHE brightens the lightness channel (clip limit 2.5, 8×8 tiles) so dark night footage is easier to read. YOLO11-Nano then runs at 320 px, in half precision when a GPU is available.",
          "Detections above the confidence threshold (50% by default) are drawn onto the live stream. Each class has a 10-second cooldown per zone, so one gecko walking past doesn't fire a dozen alerts.",
          "A new detection is saved to SQLite with a snapshot, pushed to the dashboard over WebSocket, sent to Telegram, and read out with Indonesian text-to-speech. Snake detections (DANGER) also sound a browser alarm.",
          "The Gemini assistant gets a fresh snapshot of the warehouse data with every question, including the last 5 detections, and is told to answer only from that data. When Gemini isn't available, a rule-based fallback still answers common questions like the latest detection or the riskiest zone.",
        ],
        decisions: [
          { title: "Capture and inference run in separate threads", text: "The video loop never waits for the model. It keeps drawing the latest known boxes, so the stream stays smooth even when inference is slow." },
          { title: "Drop frames instead of queueing them", text: "With a one-frame queue, an alert is always about what the camera sees now, not a frame from several seconds ago stuck in a backlog." },
          { title: "A small model at a small input size", text: "YOLO11-Nano is about 5.2 MB and runs on CPU. It was trained at 640 px but runs at 320 px, which keeps inference fast enough for several zones at once." },
          { title: "Report the weak class honestly", text: "The model page shows per-class numbers instead of one average, so Snake's lower recall is visible instead of hidden behind the stronger classes." },
        ],
        metrics: {
          caption: "Validation split, final training run (YOLO11-Nano, trained at 640 px).",
          columns: ["Class", "Risk", "Train images", "Precision", "Recall", "mAP50", "mAP50-95"],
          rows: [
            ["Snake", "Danger", "8,477", "82.6%", "76.5%", "83.4%", "57.5%"],
            ["Cat", "Warning", "10,001", "91.6%", "89.3%", "94.3%", "76.7%"],
            ["Gecko", "Info", "1,435", "99.5%", "99.8%", "99.3%", "93.1%"],
            ["Lizard", "Info", "2,409", "97.5%", "99.3%", "99.2%", "78.2%"],
          ],
        },
        result: [
          "Selected project in PT Kawan Lama Group's AI Open Innovation Challenge 2026 (Logistics).",
          "Backend API tests (pytest on an isolated temporary database) plus frontend lint, unit tests and build run in GitHub Actions on every push.",
          "Runs with one docker-compose command.",
        ],
        limits: [
          "Snake is the class where a miss matters most, and it has the lowest recall: 76.5%, so about 1 in 4 snakes in the validation images was missed.",
          "All model numbers come from the validation split (public Roboflow data plus custom footage), not from a camera in a real warehouse.",
          "The cost figures in the submission (about Rp 3M a month against Rp 15–30M for manual pest control, payback in 4–6 months) are estimates, not measured results.",
        ],
      },
    },
    {
      id: 10,
      featured: true,
      title: "SaringSini",
      subtitle: "Hoax Checker for Family Group Chats",
      period: "May — Jul 2026",
      context: "Competition Entry — #JuaraVibeCoding 2026",
      summary:
        "PWA that checks text, screenshots, and links for hoaxes with Gemini, then drafts polite replies in 4 regional languages (Javanese, Sundanese, Minangkabau, Batak) for family group chats.",
      result: "Rate limiting (6 requests/min), CSP headers, and a non-root Docker build. Deployed on Google Cloud Run.",
      tech: ["Node.js", "Express", "Gemini AI", "PWA", "Docker", "Google Cloud Run"],
      github: "https://github.com/SultanZhalifa/SaringSini",
      demo: null,
      ai: true,
    },
    {
      id: 2,
      featured: true,
      title: "Naik Kelas",
      subtitle: "Credit Scoring for Small Merchants",
      role: "Full-Stack Developer",
      period: "Jun 2026",
      context: "Hackathon — AstraPay 2026",
      summary:
        "Explainable credit-scoring prototype that turns QRIS transaction history into a score (AstraScore) and tiered micro-loans for small merchants, repaid automatically from sales.",
      result: "41 unit and edge-case tests (20 unit, 21 edge-case) across 5 test personas.",
      tech: ["Next.js", "TypeScript", "Vitest", "QRIS"],
      github: "https://github.com/SultanZhalifa/naik-kelas",
      demo: null,
      caseStudy: {
        problem: "Small merchants who ride motorbikes are invisible to traditional credit scoring, even with steady QRIS income.",
        approach: [
          "Turns QRIS transaction history into AstraScore, a deterministic score that shows how each factor contributes.",
          "Modal Jalan micro working capital with 20% of each QRIS sale auto-deducted for repayment, plus a tier system (higher score, bigger limit, lower fee through AstraPoints).",
          "An audit view where merchants can check every calculation.",
        ],
        result: [
          "41 tests: 20 unit tests (score engine and 5-persona tier checks) and 21 edge-case tests (API and headless UI flows).",
          "Built for the AstraPay Hackathon 2026 (Tim Andalusia).",
        ],
      },
    },
    {
      id: 6,
      featured: true,
      title: "MiniBookLibrary",
      subtitle: "Offline-First Android Book App",
      period: "Dec 2025 — Present",
      context: "Android app",
      summary:
        "Offline-first book management app with reading progress, ISBN auto-fill from the Google Books API, and PDF/JSON export.",
      result: "51 unit tests (JUnit 4, MockK, Turbine) run on GitHub Actions on every push.",
      screenshot: false,
      highlight: { value: "51", label: "unit tests on every push" },
      tech: ["Kotlin", "MVVM", "Room", "Coroutines", "Flow", "JUnit 4", "MockK", "Turbine", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/MiniBookLibrary",
      demo: null,
    },
    {
      id: 4,
      featured: true,
      title: "SRMAudit",
      subtitle: "OCTAVE Allegro Risk Assessment Tool",
      role: "Full-Stack Developer",
      period: "Jun 2026 — Present",
      context: "Security Risk Management mini project",
      summary:
        "Web platform for running OCTAVE Allegro risk assessments step by step. Works in cloud mode (Supabase auth with row-level security) or fully offline (IndexedDB).",
      result: "CI runs typecheck, lint, tests, and build.",
      tech: ["TypeScript", "Vite", "Supabase", "IndexedDB", "Vitest", "ESLint", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/srmaudit-octave-allegro",
      demo: null,
    },
    {
      id: 13,
      title: "UMKM Order Pages",
      subtitle: "WhatsApp Ordering Pages for Small Businesses",
      period: "Oct 2026 — Present",
      context: "Freelance service — Cikarang",
      summary:
        "One-page sites for small businesses that still take orders by chat. Customers see the prices and pick items or a time slot, and the page opens WhatsApp with one complete order message, total included. No app to install.",
      result: "4 working demo pages: a food stall, a motorbike workshop, a laundry, and a boarding house. The business names are made up, but every order button works.",
      tech: ["HTML", "CSS", "JavaScript", "WhatsApp click-to-chat", "Cloudflare Pages"],
      github: null,
      demo: "https://websultan.pages.dev/",
      image: "/previews/umkm-wa-order.webp",
    },
    {
      id: 1,
      title: "Obsidian",
      subtitle: "Crypto Trading Terminal",
      role: "Full-Stack Developer",
      period: "Jun 2026 — Present",
      context: "Personal project",
      summary:
        "Crypto trading terminal in full-stack TypeScript: live Binance data over WebSocket, 7 technical indicators computed on the server, a paper-trading engine with average-cost P&L, and price alerts. Login uses sessions with role-based access and an audit log. No mock data.",
      result: "Indicators and P&L are covered by Vitest. Playwright tests cover the main flows on desktop and mobile.",
      tech: ["Next.js 15", "TypeScript", "PostgreSQL", "TimescaleDB", "Drizzle ORM", "WebSocket", "TanStack Query", "Zustand", "Vitest", "Playwright", "Docker"],
      github: "https://github.com/SultanZhalifa/Obsidian",
      screenshot: false,
      demo: null,
      caseStudy: {
        problem: "Retail crypto tools either hide their math or can't be trusted with real money. Indicators differ between platforms and paper-trading P&L quietly drifts.",
        approach: [
          "One long-lived WebSocket to Binance's live feed. Indicators (RSI, MACD, Bollinger Bands and others) are computed on the server and checked against reference series.",
          "A paper-trading engine that tracks average cost across open, add, partial close, flip, and fee cases. Price alerts are evaluated on the server.",
          "Login with Argon2id and hashed session tokens, role-based access, CSRF origin checks, rate limiting, and an append-only audit log.",
        ],
        result: [
          "Indicators and P&L are deterministic and checked against reference values.",
          "Vitest unit tests (indicators and P&L) and Playwright end-to-end flows on desktop and mobile.",
          "A monochrome design system with hand-built SVG icons, checked for WCAG AA contrast.",
        ],
      },
    },
    {
      id: 11,
      title: "FounderIQ",
      subtitle: "AI Co-Founder Tool",
      role: "Full-Stack Developer",
      period: "Jun 2026",
      context: "Personal project",
      summary:
        "Solo-built AI co-founder tool (Next.js 15, TypeScript, Claude) with 4 tools: a 0–100 idea score, a business model canvas generator, a pitch crafter, and market research. Answers stream in real time.",
      result: "Live on Vercel. Husky and lint-staged run checks before each commit.",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Framer Motion", "Vercel AI SDK", "Anthropic Claude", "OpenRouter"],
      github: "https://github.com/SultanZhalifa/FounderIQ",
      demo: "https://founderiq.vercel.app",
      ai: true,
      caseStudy: {
        problem: "First-time founders juggle idea validation, business modeling, pitching, and market research across many separate tools.",
        approach: [
          "One app with four tools: Idea Validator, Business Model Canvas, Pitch Crafter, and Market Intel.",
          "Streaming through the Vercel AI SDK and the Anthropic Claude API, with structured output rendered as it arrives to cut perceived latency.",
          "A small provider layer (Anthropic and OpenRouter) so the model can be switched at runtime.",
        ],
        result: [
          "Live at founderiq.vercel.app, built with Next.js 15 and TypeScript, with Husky and lint-staged pre-commit checks.",
          "Gives an idea score (0–100), a 9-box Business Model Canvas, a pitch, and TAM/SAM/SOM market numbers in one flow.",
        ],
      },
    },
    {
      id: 3,
      title: "DevLog",
      subtitle: "Developer Progress Tracker",
      role: "Full-Stack Developer",
      period: "May — Jun 2026",
      context: "Personal project",
      summary:
        "Progress tracker (Next.js 16, Prisma, PostgreSQL on Supabase, GitHub login with Auth.js) with daily entries, a GitHub-style streak heatmap, an analytics dashboard, and public profiles.",
      result: "8 unit tests on the streak logic. GitHub Actions runs typecheck, lint, and tests on every push.",
      tech: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Auth.js", "Tailwind CSS", "shadcn/ui", "Recharts", "Vitest"],
      github: "https://github.com/SultanZhalifa/devlog",
      demo: "https://devlog-sultanzhalifa.vercel.app",
      caseStudy: {
        problem: "It's hard to stay consistent when your daily learning isn't visible to anyone, including you.",
        approach: [
          "Next.js 16 App Router with server components, and GitHub login through Auth.js v5.",
          "A GitHub-style streak heatmap, public profiles, and a discovery feed on a follow schema.",
          "The streak calculation is kept in one function with 8 edge-case tests (empty logs, gaps, duplicates).",
        ],
        result: [
          "Live at devlog-sultanzhalifa.vercel.app.",
          "GitHub Actions runs typecheck, lint, and tests on every push.",
        ],
      },
    },
    {
      id: 12,
      title: "AstraPayNK",
      subtitle: "Naik Kelas Companion Mobile App",
      context: "Hackathon — AstraPay 2026",
      summary:
        "Flutter companion app for Naik Kelas. Merchants can see their AstraScore, manage working capital (Modal Jalan), and redeem points to lower fees, with charts and an audit log.",
      tech: ["Flutter", "Dart", "fl_chart", "google_fonts", "smooth_page_indicator", "flutter_svg"],
      github: null, // repo is no longer public
      screenshot: false,
      demo: null,
    },
    {
      id: 5,
      title: "FinTrack.ai",
      subtitle: "Local-First Finance App",
      context: "Personal project",
      summary:
        "Personal finance app that runs fully in the browser, with no backend or account. It gives a 0–100 financial health score, safe-to-spend and month-end forecasts, and optional Gemini insights.",
      result: "Installable offline PWA. Without an API key it says so instead of faking advice.",
      tech: ["React 19", "Vite", "Chart.js", "Framer Motion", "Gemini AI", "PWA"],
      github: "https://github.com/SultanZhalifa/fintrack-ai",
      demo: "https://financetrackersultan.vercel.app/",
      ai: true,
      caseStudy: {
        problem: "Most finance apps need an account and upload your data to a server, and some show fake \"AI advice\" even when no model is set up.",
        approach: [
          "Everything runs in the browser (React 19 and Vite). No backend, no account.",
          "A health score (0–100) from savings rate, budget adherence, expense stability, and emergency buffer, plus safe-to-spend and month-end forecasts.",
          "Multiple accounts, recurring transactions, CSV/JSON backup, and optional Gemini insights.",
        ],
        result: [
          "Installable offline PWA, live at financetrackersultan.vercel.app.",
          "Without an API key it asks for one instead of faking advice.",
        ],
      },
    },
    {
      id: 9,
      title: "Duitku",
      subtitle: "Cross-Platform Finance Tracker",
      context: "Personal project",
      summary:
        "Offline-first Flutter finance app that runs the same code on Android and web. It handles multiple wallets and currencies, budgets, recurring transactions, and JSON backup.",
      result: "17 automated tests and no flutter analyze issues.",
      tech: ["Flutter", "Dart", "Provider", "fl_chart", "Material 3", "local_auth"],
      github: "https://github.com/SultanZhalifa/Duitku",
      demo: "https://sultanzhalifa.github.io/Duitku/",
      caseStudy: {
        problem: "Finance apps often count transfers as spending and double-post recurring transactions that were missed.",
        approach: [
          "Offline-first Flutter with the same code on Android and web. A transfer is stored as two linked entries and kept out of spending totals.",
          "A recurring engine that catches up safely: exactly one transaction per missed occurrence.",
          "Multiple wallets and currencies with your own exchange rates, category budgets with alerts, charts, biometric lock, and JSON backup/restore.",
        ],
        result: [
          "17 automated tests and no flutter analyze issues.",
          "Live at sultanzhalifa.github.io/Duitku.",
        ],
      },
    },
    {
      id: 8,
      title: "TaskFlow",
      subtitle: "Task Manager in Vanilla JS",
      context: "Personal project",
      summary:
        "Task manager in plain HTML, CSS, and JavaScript, with no frameworks or build step. It has priorities, due dates, drag-and-drop, search, and JSON import/export.",
      result: "Core logic is covered by Vitest. GitHub Actions runs lint, format, and tests.",
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Vitest", "ESLint", "GitHub Actions"],
      github: "https://github.com/SultanZhalifa/TaskFlow",
      demo: null,
    },
  ],

  experience: [
    {
      company: "Kementerian PANRB",
      role: "Software Engineer Intern, Government Digital Transformation Division",
      period: "Jul 2026 — Jan 2027 (expected)",
      location: "Jakarta",
      points: [
        "Help develop and maintain internal web apps used to evaluate and monitor government digital transformation.",
        "Work on frontend and backend, database design, REST API integration, and testing and bug fixing on existing systems.",
      ],
    },
    {
      company: "Freelance",
      role: "Freelance Software Developer, independent projects (web, mobile, AI)",
      period: "Jan 2025 — Present",
      location: "Remote",
      points: [
        "Build websites (React, Next.js), mobile apps (Flutter, Kotlin), and small AI tools for clients from my campus and school.",
        "Handle each project from figuring out what the client needs to deployment and fixes after launch.",
        "Since Oct 2026, offering landing pages to small businesses around Cikarang (food stalls, motorbike workshops, laundries, boarding houses). Customers pick items or a time slot, and the page sends a ready-to-read order to the owner's WhatsApp.",
      ],
      links: [{ label: "Demo pages", href: "https://websultan.pages.dev/" }],
    },
  ],

  certifications: [
    {
      issuer: "Google (Coursera)",
      date: "2024 — 2026",
      items: [
        "Google Cybersecurity Professional Certificate",
        "Google IT Support Professional Certificate",
      ],
    },
    {
      issuer: "Google for Education",
      date: "2026",
      items: ["Gemini Certified Faculty", "Gemini Certified Student"],
    },
    {
      issuer: "IBM",
      date: "2025 — 2026",
      items: [
        "Build an AI Agent",
        "Introduction to Large Language Models",
        "Team Essentials for Designing AI Solutions",
        "Data Literacy",
        "Sensemaking with Data",
        "Getting Started with Git and GitHub",
      ],
    },
    {
      issuer: "Dicoding Indonesia",
      date: "2026",
      items: [
        "Belajar Prinsip Pemrograman SOLID",
        "Memulai Pemrograman dengan Java",
        "Memulai Pemrograman dengan C",
        "Memulai Pemrograman dengan Haskell",
        "Belajar Dasar Manajemen Proyek",
      ],
    },
    {
      issuer: "RevoU",
      date: "2024 — 2026",
      items: ["Coding Camp: Intro to Software Engineering", "Intro to Data Analytics"],
    },
  ],

  activities: [
    {
      title: "HACKSPHERE 2025, National 48-Hour Hackathon",
      role: "Event Committee",
      org: "President University",
      date: "Oct 2025",
      points: [
        "Part of the organizing committee for a 48-hour national hackathon with university students, high-schoolers, and industry professionals in teams of three. Helped with participant operations and event logistics.",
      ],
    },
    {
      title: "Kindness Community for Knowledge",
      role: "IT Support & Event Operations",
      org: "Cikarang",
      date: "2024 — 2025",
      points: [
        "Helped with technical support, documentation, data organization, and basic troubleshooting at community events.",
      ],
    },
  ],
};
