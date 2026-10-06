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

  // Order matters: strongest projects first. `ai: true` means the app calls an
  // AI model or API; the hero stat and the "AI & Vision" filter both read it.
  projects: [
    {
      id: 7,
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
      caseStudy: {
        problem: "Warehouse pest control is usually reactive: damage is found after the fact, and manual monitoring can't run around the clock.",
        approach: [
          "Custom-trained a YOLO11-Nano model (5.2 MB, runs on CPU) with CLAHE low-light preprocessing across up to four camera zones.",
          "Alerts in under a second through WebSocket, browser audio, Telegram, and Indonesian text-to-speech. Snake is DANGER, cat is WARNING, gecko is INFO, and each level maps to its own SOP.",
          "A Gemini 2.0 Flash RAG assistant, role-based access, and analytics with PDF/CSV reports. Runs in Docker.",
        ],
        result: [
          "Selected project for PT Kawan Lama Group's AI Open Innovation Challenge 2026.",
          "The submission estimated monthly pest-control spend falling from about Rp 15–30M to about Rp 3M per warehouse, with payback in 4–6 months. These are estimates from the submission, not measured results.",
        ],
      },
    },
    {
      id: 10,
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
      id: 12,
      title: "AstraPayNK",
      subtitle: "Naik Kelas Companion Mobile App",
      context: "Hackathon — AstraPay 2026",
      summary:
        "Flutter companion app for Naik Kelas. Merchants can see their AstraScore, manage working capital (Modal Jalan), and redeem points to lower fees, with charts and an audit log.",
      tech: ["Flutter", "Dart", "fl_chart", "google_fonts", "smooth_page_indicator", "flutter_svg"],
      github: "https://github.com/SultanZhalifa/AstraPayNK",
      demo: null,
    },
    {
      id: 6,
      title: "MiniBookLibrary",
      subtitle: "Offline-First Android Book App",
      period: "Dec 2025 — Present",
      context: "Android app",
      summary:
        "Offline-first book management app with reading progress, ISBN auto-fill from the Google Books API, and PDF/JSON export.",
      result: "51 unit tests (JUnit 4, MockK, Turbine) run on GitHub Actions on every push.",
      tech: ["Kotlin", "MVVM", "Room", "Coroutines", "Flow", "JUnit 4", "MockK", "Turbine", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/MiniBookLibrary",
      demo: null,
    },
    {
      id: 4,
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
      ],
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
