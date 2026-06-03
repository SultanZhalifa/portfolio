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
        "Developed a fullstack platform for logging daily learning with a GitHub-style streak heatmap, analytics dashboard, public profiles, and a discovery feed — built on GitHub OAuth, a relational follow schema, and unit-tested streak logic behind a CI pipeline. Implemented with Next.js 16, Prisma, and PostgreSQL on Supabase.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "Auth.js", "Tailwind CSS", "Recharts", "Vitest"],
      github: "https://github.com/SultanZhalifa/devlog",
      demo: "https://devlog-sultanzhalifa.vercel.app",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 2,
      title: "fintrack-ai",
      subtitle: "AI-Powered Personal Finance Tracker",
      description:
        "Built a React web app with Chart.js for spending visualization and Gemini AI for natural language financial insights. Designed to surface actionable recommendations from raw user input. Deployed on Vercel.",
      tech: ["React", "Chart.js", "Gemini AI", "JavaScript", "Tailwind CSS"],
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
        "Engineered a 24/7 computer-vision surveillance platform for PT Kawan Lama Group (Logistics), detecting snakes, cats, and geckos across up to four camera zones with sub-second alerts via WebSocket, browser audio, and Telegram. Custom-trained a YOLO11-Nano model (~5.2 MB) with CLAHE low-light preprocessing, and added a Gemini 2.0 Flash RAG assistant, role-based access, and PDF/CSV reporting — quantifying an estimated Rp 144–324 million in annual savings per warehouse.",
      tech: ["Python", "FastAPI", "React", "YOLO11", "OpenCV", "Gemini AI", "WebSocket", "SQLite", "Docker"],
      github: "https://github.com/SultanZhalifa/PestGuard-AI",
      demo: "https://pestguard-ai.vercel.app/login",
      featured: true,
      context: "Client Project — PT Kawan Lama Group (Logistics)",
    },
    {
      id: 5,
      title: "TaskFlow",
      subtitle: "Task Management Web Application",
      description:
        "Built a full CRUD task manager with filtering and status tracking. Self-tested core flows and failure states before each release.",
      tech: ["React", "JavaScript", "Tailwind CSS"],
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
        "Created an offline-first Flutter app for multi-wallet, multi-currency expense tracking with transfers, recurring automation, budgets, and biometric lock — running identical code on Android and web, backed by 17 unit tests. Features user-defined exchange rates, monthly budget tracking with category-level progress, interactive donut and trend charts, and JSON backup/CSV export. All data stays on-device with no account required.",
      tech: ["Flutter", "Dart", "Provider", "FL Chart", "SQLite", "Material 3"],
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
        "Built a mobile-first PWA that analyzes text, images, and URLs for hoaxes using multimodal Gemini, generating family-friendly response templates across four Indonesian regional languages (Jawa, Sunda, Minang, Batak). Hardened with rate limiting, CSP / anti-XSS headers, and a multi-stage Docker build, deployed on Google Cloud Run. Features AI coaching with parent personas, a real-time tone adjuster, generative Hoax DNA visualization, and a live Indonesia hoax map.",
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
