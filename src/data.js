export const data = {
  name: "Sultan Zhalifunnas Musyaffa",
  nameShort: "Sultan",
  location: "Bekasi, Indonesia",
  phone: "+62 856 9422 9552",
  title: "Informatics Student",
  subtitle: "Fullstack & AI Developer",
  summary:
    "Informatics undergraduate at President University building fullstack web, Android, and AI-integrated systems end to end. Delivered a real-time computer-vision pest-detection platform for an enterprise logistics client (PT Kawan Lama Group) using YOLO11 and a Gemini assistant, and shipped a Kotlin Android app backed by 51 automated tests. Comfortable across the stack — React, Next.js, FastAPI, PostgreSQL — with added perspective from cybersecurity and a manufacturing quality background.",
  email: "sultanzhalifunnasmusyaffa@gmail.com",
  github: "https://github.com/SultanZhalifa",
  linkedin: "https://linkedin.com/in/sultanzhalifunnasmusyaffa",

  education: [
    {
      school: "President University",
      degree: "Bachelor of Informatics",
      period: "2024 — 2027 (Expected)",
      location: "Cikarang, Indonesia",
      points: [
        "5th semester. Coursework: Algorithms, Data Structures, Database Systems, Software Engineering, Computer Networks.",
      ],
    },
  ],

  skills: [
    {
      category: "Languages & Web",
      items: [
        "Python", "JavaScript", "TypeScript", "Java", "Kotlin", "Dart", "SQL",
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
        "Gemini AI", "YOLOv8", "YOLOv11", "Chart.js", "Recharts",
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
      title: "DevLog",
      subtitle: "Developer Progress Tracking Platform",
      description:
        "Developed a fullstack accountability platform on the Next.js 16 App Router (server components, type-safe data access) where developers log daily learning with tags and mood, visualize a GitHub-style streak heatmap, share public profiles, and browse a discovery feed — built on GitHub OAuth (Auth.js v5) and a relational follow schema. The trickiest piece, calculateStreak, is covered by 8 edge-case unit tests (empty logs, gaps, deduplication); GitHub Actions runs typecheck, lint, and tests on every push.",
      tech: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Auth.js", "Tailwind CSS", "shadcn/ui", "Recharts", "Vitest"],
      github: "https://github.com/SultanZhalifa/devlog",
      demo: "https://devlog-sultanzhalifa.vercel.app",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 2,
      title: "FinTrack.ai",
      subtitle: "Local-First Finance App with a Health Score",
      description:
        "Built a 100% local-first personal finance app (React 19 + Vite) — no backend, no account, fully private. Computes a financial health score (0–100) across savings rate, budget adherence, expense stability, and emergency buffer, with YNAB-style safe-to-spend and month-end forecasts. Includes multi-account tracking, recurring transactions, a Ctrl/Cmd-K command palette, CSV/JSON backup, and optional Gemini insights — honest by design: with no API key it says one is required rather than faking advice. Installable as an offline PWA.",
      tech: ["React 19", "Vite", "Chart.js", "Framer Motion", "Gemini AI", "PWA"],
      github: "https://github.com/SultanZhalifa/fintrack-ai",
      demo: "https://financetrackersultan.vercel.app/",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 3,
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
      id: 4,
      title: "PestGuard AI",
      subtitle: "Real-Time Warehouse Pest & Bio-Hazard Detection",
      description:
        "Engineered a 24/7 computer-vision surveillance platform that detects snakes, cats, and geckos across up to four camera zones with sub-second alerts via WebSocket, browser audio, Telegram, and Indonesian text-to-speech — with risk tiering (Snake/DANGER, Cat/WARNING, Gecko/INFO), each mapped to its own SOP. Custom-trained a YOLO11-Nano model (5.2 MB, CPU-fast) with CLAHE low-light preprocessing, and added a Gemini 2.0 Flash RAG assistant, role-based access, and analytics with PDF/CSV reporting. Estimated to cut pest-control cost from ~Rp 15–30M to ~Rp 3M per month — an estimated Rp 144–324 million annual saving per warehouse, breaking even in 4–6 months.",
      tech: ["Python", "FastAPI", "React", "YOLO11", "OpenCV", "Gemini AI", "WebSocket", "SQLite", "Docker"],
      github: "https://github.com/SultanZhalifa/PestGuard-AI",
      demo: "https://pestguard-ai.vercel.app/login",
      featured: true,
      context: "AI Open Innovation Challenge 2026 — PT Kawan Lama Group (Logistics)",
    },
    {
      id: 5,
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
      id: 6,
      title: "Duitku",
      subtitle: "Cross-Platform Personal Finance Tracker",
      description:
        "Created an offline-first Flutter finance app running identical code on Android and web, backed by 17 automated tests with zero flutter analyze issues. Models transfers as linked dual-leg pairs (kept out of spending totals for accuracy) and a recurring engine with idempotent catch-up — exactly one transaction per missed occurrence. Features multi-wallet/multi-currency with user-defined exchange rates, category budgets with over-budget alerts, donut and 6-month trend charts, biometric lock, and versioned JSON backup/restore.",
      tech: ["Flutter", "Dart", "Provider", "fl_chart", "Material 3", "local_auth"],
      github: "https://github.com/SultanZhalifa/Duitku",
      demo: "https://sultanzhalifa.github.io/Duitku/",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 7,
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
  ],

  experience: [
    {
      company: "PT Honda Prospect Motor",
      role: "Production Worker — Repair AF / Welding Division",
      period: "Apr 2023 — Apr 2024",
      location: "Karawang, Indonesia",
      points: [
        "Applied systematic quality control checks on welded components, flagging rework items against OEM tolerance standards — directly translates to the debugging and code review mindset used in software engineering.",
        "Operated within a structured team under strict delivery schedules; built habits of attention to detail, reproducibility, and consistent output that carry directly into writing reliable, tested software.",
      ],
    },
    {
      company: "PT Indomobil Trada Nasional Cikarang (Nissan Datsun)",
      role: "Industrial Internship Program (PRAKERIN)",
      period: "Mar 2021 — May 2021",
      location: "Cikarang, Indonesia",
      points: [
        "Supported workshop inspection and service operations; developed a systematic approach to diagnosing and resolving technical failures.",
        "Received a 'Good' performance rating from the Workshop Head upon completion.",
      ],
    },
  ],

  certifications: [
    {
      issuer: "Google for Education",
      date: "2026",
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
