export const data = {
  name: "Sultan Zhalifunnas Musyaffa",
  nameShort: "Sultan",
  location: "Bekasi, Indonesia",
  phone: "+62 856 9422 9552",
  title: "AI Full-Stack Engineer & Founder",
  subtitle: "AI Full-Stack Engineer · Founder",
  summary:
    "AI-focused full-stack software engineer and founder. I architect and ship production-grade products end to end — across computer vision, real-time systems, fintech, and mobile — independently, from system design to deployment. Proficient in TypeScript, Python, and Kotlin with modern AI APIs (Anthropic Claude, Gemini, YOLO11). Recently delivered a real-time computer-vision pest-detection platform for PT Kawan Lama Group (YOLO11 + a Gemini RAG assistant) and founded FounderIQ, an AI startup-validation SaaS.",
  email: "sultanzhalifunnasmusyaffa@gmail.com",
  github: "https://github.com/SultanZhalifa",
  linkedin: "https://linkedin.com/in/sultanzhalifunnasmusyaffa",

  now: [
    "Building FounderIQ — an AI startup-validation SaaS (Next.js 15 · Claude API)",
    "Open to Software Engineering / AI internship opportunities",
  ],

  education: [
    {
      school: "President University",
      degree: "Bachelor of Informatics",
      period: "2024 — 2027 (Expected)",
      location: "Cikarang, Indonesia",
      points: [
        "6th semester. Recipient of the Jababeka Scholarship.",
        "Coursework: Algorithms, Data Structures, Database Systems, Software Engineering, Computer Networks.",
      ],
    },
  ],

  skills: [
    {
      category: "Languages & Web",
      items: [
        "Python", "JavaScript", "TypeScript", "Java", "Kotlin", "Dart", "C", "Haskell", "SQL",
        "React", "Next.js", "Node.js", "Express", "FastAPI", "Flask", "Tailwind CSS",
      ],
    },
    {
      category: "Mobile & Testing",
      items: [
        "Android (Kotlin)", "Flutter", "MVVM", "Room", "Coroutines", "Provider",
        "JUnit 4", "MockK", "Turbine", "Vitest", "GitHub Actions CI", "Manual Testing",
      ],
    },
    {
      category: "AI & Data",
      items: [
        "Anthropic Claude", "Gemini AI", "Vercel AI SDK", "Prompt Engineering",
        "YOLOv8", "YOLOv11", "Chart.js", "Recharts",
        "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Prisma ORM", "Room ORM",
      ],
    },
    {
      category: "Tools & Security",
      items: [
        "Git", "GitHub", "Docker", "Linux", "REST API", "Android Studio", "PWA",
        "Vulnerability Assessment", "Penetration Testing", "Digital Forensics", "Network Security",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Obsidian",
      subtitle: "Enterprise-Grade Real-Time Crypto Trading Terminal",
      description:
        "Built a professional trading terminal as a full-stack TypeScript monorepo — a single durable WebSocket connection to Binance's live market feed, server-side technical indicator computation (RSI, MACD, Bollinger Bands — validated against canonical reference series), a paper-trading P&L engine with average-cost tracking across open/add/partial-close/flip/fee scenarios, and real-time price alerts evaluated server-side. Auth uses Argon2id + session tokens (SHA-256 hashed, sliding expiry), with RBAC, CSRF origin checks, rate limiting, and an append-only audit log. Designed a deliberate monochrome design system with graded grayscale and hand-built SVG glyphs, WCAG AA compliant. Tested with Vitest (indicator + P&L unit tests) and Playwright (full e2e flows on desktop + mobile).",
      tech: ["Next.js 15", "TypeScript", "PostgreSQL", "TimescaleDB", "Drizzle ORM", "WebSocket", "TanStack Query", "Zustand", "Vitest", "Playwright", "Docker"],
      github: "https://github.com/SultanZhalifa/Obsidian",
      demo: null,
      featured: true,
      context: "Personal Project",
      caseStudy: {
        problem: "Retail crypto tools either hide their math or can't be trusted with real money — indicators differ between platforms and paper-trading P&L quietly drifts.",
        approach: [
          "A single durable WebSocket to Binance's live feed; technical indicators (RSI, MACD, Bollinger Bands) computed server-side and validated against canonical reference series.",
          "A paper-trading P&L engine tracking average cost across open / add / partial-close / flip / fee scenarios, with price alerts evaluated server-side.",
          "Hardened auth — Argon2id + SHA-256 session tokens, RBAC, CSRF origin checks, rate limiting, and an append-only audit log.",
        ],
        result: [
          "Deterministic, reference-validated indicators and P&L — no client-side guessing.",
          "Covered by Vitest unit tests (indicators + P&L) and Playwright e2e flows on desktop + mobile.",
          "WCAG-AA monochrome design system with hand-built SVG glyphs.",
        ],
      },
    },
    {
      id: 2,
      title: "Naik Kelas",
      subtitle: "AstraPay Micro-Merchant Credit Scoring Prototype",
      description:
        "Built a working fintech prototype for the AstraPay Hackathon 2026 (Tim Andalusia) — transforms motor-based micro-merchant QRIS transaction trails into AstraScore, a transparent, deterministic alternative credit score with explainable factor breakdowns. Features Modal Jalan (micro working capital) with auto-deducting 20% QRIS repayments in real time, a tiered loyalty loop (score rises → plafon grows → fee drops via AstraPoints redemption), and a full audit view letting merchants verify every calculation. Covered by 20 unit tests (score engine + 5-persona tier verification), plus API edge-case and headless UI flow tests with screenshots.",
      tech: ["Next.js", "TypeScript", "Vitest", "QRIS"],
      github: "https://github.com/SultanZhalifa/naik-kelas",
      demo: null,
      featured: true,
      context: "Hackathon — AstraPay 2026",
      caseStudy: {
        problem: "Motor-based micro-merchants are invisible to traditional credit scoring despite a steady QRIS cash flow.",
        approach: [
          "Transforms QRIS transaction trails into AstraScore — a transparent, deterministic alternative credit score with explainable factor breakdowns.",
          "Modal Jalan micro working-capital with auto-deducting 20% QRIS repayments in real time, and a tiered loyalty loop (score rises → plafon grows → fee drops).",
          "A full audit view letting merchants verify every calculation.",
        ],
        result: [
          "20 unit tests (score engine + 5-persona tier verification), plus API edge-case and headless UI flow tests with screenshots.",
          "Built for the AstraPay Hackathon 2026 (Tim Andalusia).",
        ],
      },
    },
    {
      id: 3,
      title: "DevLog",
      subtitle: "Developer Progress Tracking Platform",
      description:
        "Developed a fullstack accountability platform on the Next.js 16 App Router (server components, type-safe data access) where developers log daily learning with tags and mood, visualize a GitHub-style streak heatmap, share public profiles, and browse a discovery feed — built on GitHub OAuth (Auth.js v5) and a relational follow schema. The trickiest piece, calculateStreak, is covered by 8 edge-case unit tests (empty logs, gaps, deduplication); GitHub Actions runs typecheck, lint, and tests on every push.",
      tech: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Auth.js", "Tailwind CSS", "shadcn/ui", "Recharts", "Vitest"],
      github: "https://github.com/SultanZhalifa/devlog",
      demo: "https://devlog-sultanzhalifa.vercel.app",
      featured: true,
      context: "Personal Project",
      caseStudy: {
        problem: "Developers lose momentum because daily learning is invisible and accountability is hard to sustain.",
        approach: [
          "Next.js 16 App Router (server components, type-safe data access) with GitHub OAuth via Auth.js v5.",
          "A GitHub-style streak heatmap, public shareable profiles, and a discovery feed on a relational follow schema.",
          "The tricky calculateStreak logic isolated and covered by 8 edge-case unit tests (empty logs, gaps, deduplication).",
        ],
        result: [
          "Live product at devlog-sultanzhalifa.vercel.app.",
          "GitHub Actions runs typecheck, lint, and tests on every push.",
        ],
      },
    },
    {
      id: 4,
      title: "SRMAudit",
      subtitle: "GRC & Security Audit Platform — OCTAVE Allegro",
      description:
        "Built an enterprise GRC and security-audit platform implementing the OCTAVE Allegro risk-assessment methodology — a small, fast, fully-typed SPA with a clean layered architecture (core → data → services → UI). Features dual-mode persistence: cloud mode with Supabase auth, per-user RLS, and storage, or a fully-functional local mode via IndexedDB — no mocks, no fake state. Designed a warm, minimal, accessible UI with light/dark themes, zero emoji (every glyph is an inline SVG), and strict quality gates: strict TypeScript, ESLint, Prettier, Vitest, and CI.",
      tech: ["TypeScript", "Vite", "Supabase", "IndexedDB", "Vitest", "ESLint", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/srmaudit-octave-allegro",
      demo: null,
      featured: true,
      context: "Mini Project — Security Risk Management",
    },
    {
      id: 5,
      title: "FinTrack.ai",
      subtitle: "Local-First Finance App with a Health Score",
      description:
        "Built a 100% local-first personal finance app (React 19 + Vite) — no backend, no account, fully private. Computes a financial health score (0–100) across savings rate, budget adherence, expense stability, and emergency buffer, with YNAB-style safe-to-spend and month-end forecasts. Includes multi-account tracking, recurring transactions, a Ctrl/Cmd-K command palette, CSV/JSON backup, and optional Gemini insights — honest by design: with no API key it says one is required rather than faking advice. Installable as an offline PWA.",
      tech: ["React 19", "Vite", "Chart.js", "Framer Motion", "Gemini AI", "PWA"],
      github: "https://github.com/SultanZhalifa/fintrack-ai",
      demo: "https://financetrackersultan.vercel.app/",
      featured: true,
      context: "Personal Project",
      caseStudy: {
        problem: "Most finance apps require an account and upload your data to a server — and some fake 'AI advice' even with no model configured.",
        approach: [
          "100% local-first (React 19 + Vite) — no backend, no account, fully private in the browser.",
          "A financial health score (0–100) across savings rate, budget adherence, expense stability, and emergency buffer, with YNAB-style safe-to-spend and month-end forecasts.",
          "Multi-account tracking, recurring transactions, a Ctrl/Cmd-K command palette, CSV/JSON backup, and optional Gemini insights.",
        ],
        result: [
          "Installable offline PWA; live at financetrackersultan.vercel.app.",
          "Honest by design — with no API key it asks for one instead of faking advice.",
        ],
      },
    },
    {
      id: 6,
      title: "MiniBookLibrary",
      subtitle: "Offline-First Android App with 51 Automated Tests",
      description:
        "Built a Kotlin book-management app (MVVM, Room, Coroutines, Flow) with reading-progress tracking, ISBN auto-fill via the Google Books API, PDF/JSON export, and salted SHA-256 account security. Wrote 51 unit tests (JUnit 4, MockK, Turbine) covering authentication, CRUD, ViewModel state, and API parsing — run automatically alongside debug-APK builds through GitHub Actions CI on every push.",
      tech: ["Kotlin", "MVVM", "Room", "Coroutines", "Flow", "JUnit 4", "MockK", "Turbine", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/MiniBookLibrary",
      demo: null,
      featured: true,
      context: "Personal Project",
    },
    {
      id: 7,
      title: "PestGuard AI",
      subtitle: "Real-Time Warehouse Pest & Bio-Hazard Detection",
      description:
        "Engineered a 24/7 computer-vision surveillance platform that detects snakes, cats, and geckos across up to four camera zones with sub-second alerts via WebSocket, browser audio, Telegram, and Indonesian text-to-speech — with risk tiering (Snake/DANGER, Cat/WARNING, Gecko/INFO), each mapped to its own SOP. Custom-trained a YOLO11-Nano model (5.2 MB, CPU-fast) with CLAHE low-light preprocessing, and added a Gemini 2.0 Flash RAG assistant, role-based access, and analytics with PDF/CSV reporting. Estimated to cut pest-control cost from ~Rp 15–30M to ~Rp 3M per month — an estimated Rp 144–324 million annual saving per warehouse, breaking even in 4–6 months.",
      tech: ["Python", "FastAPI", "React", "YOLO11", "OpenCV", "Gemini AI", "WebSocket", "SQLite", "Docker"],
      github: "https://github.com/SultanZhalifa/PestGuard-AI",
      demo: "https://pestguard-ai.vercel.app/login",
      featured: true,
      context: "AI Open Innovation Challenge 2026 — PT Kawan Lama Group (Logistics)",
      caseStudy: {
        problem: "Warehouse pest control is reactive and expensive — damage is found after the fact, and manual monitoring can't run 24/7.",
        approach: [
          "Custom-trained a YOLO11-Nano model (5.2 MB, CPU-fast) with CLAHE low-light preprocessing across up to four camera zones.",
          "Sub-second alerts via WebSocket, browser audio, Telegram, and Indonesian text-to-speech, with risk tiering (Snake/DANGER, Cat/WARNING, Gecko/INFO) each mapped to its own SOP.",
          "A Gemini 2.0 Flash RAG assistant, role-based access, and analytics with PDF/CSV reporting; fully Dockerized.",
        ],
        result: [
          "Estimated Rp 144–324 million annual saving per warehouse, breaking even in 4–6 months.",
          "Built for PT Kawan Lama Group's AI Open Innovation Challenge 2026.",
        ],
      },
    },
    {
      id: 8,
      title: "TaskFlow",
      subtitle: "Zero-Dependency Task Manager in Vanilla JS",
      description:
        "Built a task manager with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, zero runtime dependencies — as a deliberate exercise in clean, testable code. Features task CRUD, priority levels, due dates with overdue indicators, drag-and-drop reordering, real-time search with highlighting, and JSON import/export. Pure logic is isolated in taskUtils.js and covered with Vitest; GitHub Actions runs lint, format, and tests on every push.",
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Vitest", "ESLint", "GitHub Actions"],
      github: "https://github.com/SultanZhalifa/TaskFlow",
      demo: null,
      featured: false,
      context: "Personal Project",
    },
    {
      id: 9,
      title: "Duitku",
      subtitle: "Cross-Platform Personal Finance Tracker",
      description:
        "Created an offline-first Flutter finance app running identical code on Android and web, backed by 17 automated tests with zero flutter analyze issues. Models transfers as linked dual-leg pairs (kept out of spending totals for accuracy) and a recurring engine with idempotent catch-up — exactly one transaction per missed occurrence. Features multi-wallet/multi-currency with user-defined exchange rates, category budgets with over-budget alerts, donut and 6-month trend charts, biometric lock, and versioned JSON backup/restore.",
      tech: ["Flutter", "Dart", "Provider", "fl_chart", "Material 3", "local_auth"],
      github: "https://github.com/SultanZhalifa/Duitku",
      demo: "https://sultanzhalifa.github.io/Duitku/",
      featured: true,
      context: "Personal Project",
      caseStudy: {
        problem: "Cross-platform finance apps often miscount transfers as spending and double-post missed recurring transactions.",
        approach: [
          "Offline-first Flutter running identical code on Android and web; transfers modeled as linked dual-leg pairs kept out of spending totals.",
          "A recurring engine with idempotent catch-up — exactly one transaction per missed occurrence.",
          "Multi-wallet / multi-currency with user-defined rates, category budgets with over-budget alerts, donut + 6-month trend charts, biometric lock, and versioned JSON backup/restore.",
        ],
        result: [
          "17 automated tests with zero flutter analyze issues.",
          "Live at sultanzhalifa.github.io/Duitku.",
        ],
      },
    },
    {
      id: 10,
      title: "SaringSini",
      subtitle: "AI Misinformation Checker for Family Chats",
      description:
        "Built a mobile-first PWA that analyzes text, screenshots, and URLs for hoaxes using multimodal Gemini, then generates calm, family-friendly responses in four Indonesian regional languages (Javanese Krama, Sundanese, Minangkabau, Batak) so you can correct a relative without damaging silaturahmi. Features a 'Bahasa Mama' coaching mode, a debounced tone slider, a generative Hoax DNA fingerprint, and Indonesian voice input. Production-hardened with rate limiting (6 req/min), CSP / anti-XSS headers, a non-root multi-stage Docker build, and WCAG 2.1 AA — deployed on Google Cloud Run.",
      tech: ["Node.js", "Express", "Gemini AI", "PWA", "Docker", "Google Cloud Run"],
      github: "https://github.com/SultanZhalifa/SaringSini",
      demo: null,
      featured: true,
      context: "Competition Entry, #JuaraVibeCoding 2026",
    },
    {
      id: 11,
      title: "FounderIQ",
      subtitle: "AI Co-Founder Platform",
      description:
        "Validate startup ideas, generate business models, craft investor pitches, and analyze markets in real-time. Streams structured Claude AI responses through the Vercel AI SDK. Features Idea Validator (VC-grade score 0–100 with strengths, weaknesses, opportunities, and actionable next steps), Business Canvas (auto-generate a full 9-box Business Model Canvas in seconds), Pitch Crafter (punchy tagline, 30-second elevator pitch, and investor narrative), and Market Intel (TAM/SAM/SOM, top competitors, and go-to-market strategy). Deployed on Vercel.",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Framer Motion", "Vercel AI SDK", "Anthropic Claude"],
      github: "https://github.com/SultanZhalifa/FounderIQ",
      demo: "https://founderiq.vercel.app",
      featured: true,
      context: "Founder — AI SaaS",
      caseStudy: {
        problem: "First-time founders juggle idea validation, business modeling, pitching, and market research across a dozen disconnected tools — losing momentum before they start.",
        approach: [
          "One platform with four specialized AI tools — Idea Validator, Business Model Canvas, Pitch Crafter, and Market Intel — covering the early-founder journey end to end.",
          "Real-time streaming via the Vercel AI SDK + Anthropic Claude API, with structured output rendered progressively to cut perceived latency.",
          "A dual AI-provider abstraction layer (Anthropic + OpenRouter) for runtime model switching and cost-flexible scaling.",
        ],
        result: [
          "Live SaaS at founderiq.vercel.app, shipped on Next.js 15 + TypeScript with Husky + lint-staged CI quality gates.",
          "VC-grade idea scoring (0–100), a full 9-box Business Model Canvas, investor pitch, and TAM/SAM/SOM market intel in one click.",
        ],
      },
    },
    {
      id: 12,
      title: "AstraPayNK",
      subtitle: "AstraPay Micro-Merchant Credit Scoring Mobile App",
      description:
        "Developed a Flutter mobile companion app for the AstraPay Hackathon 2026 (Naik Kelas project) — 'Mesin Skor & Modal Produktif untuk Pelaku Usaha Mikro Berbasis Motor'. Allows micro-merchants to monitor alternative credit scores (AstraScore), manage active working capital (Modal Jalan), and redeem loyalty points to lower interest fees. Features a modern dashboard with real-time score indicators, interactive financial charts, smooth onboarding flows, and a comprehensive profile audit logs.",
      tech: ["Flutter", "Dart", "fl_chart", "google_fonts", "smooth_page_indicator", "flutter_svg"],
      github: "https://github.com/SultanZhalifa/AstraPayNK",
      demo: null,
      featured: true,
      context: "Hackathon Companion — AstraPay 2026",
    },
  ],


  experience: [
    {
      company: "FounderIQ",
      role: "Founder & Full-Stack Developer",
      period: "Jun 2026 — Present",
      location: "Remote — founderiq.vercel.app",
      points: [
        "Designed and launched an AI startup-validation SaaS with four specialized tools — Idea Validator, Business Model Canvas, Pitch Crafter, and Market Intel — covering the full early-founder journey in one platform.",
        "Engineered a real-time streaming architecture with the Vercel AI SDK + Anthropic Claude API, delivering structured AI output with progressive rendering and lower perceived latency.",
        "Built a dual AI-provider abstraction layer (Anthropic + OpenRouter) for runtime model switching and cost-flexible scaling; shipped on Next.js 15 + TypeScript with Husky + lint-staged CI quality gates.",
      ],
    },
  ],

  certifications: [
    {
      issuer: "Google for Education",
      date: "May 2026 · valid to 2029",
      items: ["Gemini Certified Educator", "Gemini Certified Faculty", "Gemini Certified Student"],
    },
    {
      issuer: "IBM SkillsBuild",
      date: "May 2026",
      items: ["Team Essentials for AI Solutions", "Intro to LLMs", "Sensemaking with Data", "Data Literacy"],
    },
    {
      issuer: "Adobe Learning Manager",
      date: "May 2026",
      items: ["Intelligent by Design: Build an AI Agent"],
    },
    {
      issuer: "Dicoding",
      date: "2026",
      items: [
        "Akselerasi Karier dan Produktivitas dengan Gemini",
        "Memulai Pemrograman dengan C",
        "Memulai Pemrograman dengan Java",
        "Memulai Pemrograman dengan Haskell",
        "Belajar Prinsip Pemrograman SOLID",
        "Belajar Dasar Manajemen Proyek (x Google Developers)",
      ],
    },
    {
      issuer: "Dibimbing",
      date: "May 2026",
      items: ["Certificate of Appreciation: Event Online Cyber Security"],
    },
    {
      issuer: "RevoU",
      date: "2024 — 2026",
      items: ["Coding Camp: Intro to Software Engineering", "Intro to Data Analytics"],
    },
    {
      issuer: "SMK N 1 Cikarang Utara",
      date: "Mar 2022",
      items: ["Vocational Competency Certificate in Light Vehicle Automotive Engineering"],
    },
  ],

  activities: [
    {
      title: "HACKSPHERE 2025 — National 48-Hour Hackathon",
      role: "Event Committee",
      org: "President University",
      date: "Oct 2025",
      points: [
        "Served on the organizing committee for a 48-hour national hackathon uniting university students, high-schoolers, and industry professionals in teams of three, supporting participant operations and event logistics throughout.",
      ],
    },
  ],
};
