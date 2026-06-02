export const data = {
  name: "Sultan Zhalifunnas Musyaffa",
  nameShort: "Sultan",
  location: "Bekasi, Indonesia",
  phone: "+62 856 9422 9552",
  title: "Informatics Student",
  subtitle: "Fullstack & AI Developer",
  summary:
    "Informatics undergraduate at President University with hands-on experience across fullstack web, Android, and AI-integrated systems. Wrote 51 automated unit tests for an Android project using JUnit 4, MockK, and Turbine with GitHub Actions CI. Built and deployed a React web app with Gemini AI integration. Brings additional depth from a cybersecurity background in vulnerability assessment and penetration testing, and a manufacturing quality background from PT Honda Prospect Motor.",
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
        "5th semester. Coursework: Algorithms and Data Structures, Database Systems, Software Engineering, Computer Networks, Operating Systems.",
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
      title: "devlog",
      subtitle: "Developer Progress Tracker with Streak Analytics",
      description:
        "Built a full-stack platform for developers to log daily learning, visualize activity streaks (GitHub-style contribution calendar), and share progress publicly. Implemented GitHub OAuth via Auth.js, analytics dashboard with Recharts, mood tracking, tag-based entries, explore feed, and automated tests with Vitest + GitHub Actions CI.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Prisma", "Tailwind CSS", "Auth.js", "Recharts", "Vitest", "GitHub Actions"],
      github: "https://github.com/SultanZhalifa/devlog",
      demo: "https://devlog-rust.vercel.app",
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
      subtitle: "Android App with 51 Automated Unit Tests and CI",
      description:
        "Rewrote a Java + raw SQLite class project from scratch in Kotlin with MVVM, Room, and Coroutines. Wrote 51 unit tests covering authentication flows, book CRUD, ViewModel state transitions, search and filter, form validation, and Google Books API parsing including edge cases. Set up GitHub Actions CI to run the full suite on every push.",
      tech: ["Kotlin", "JUnit 4", "MockK", "Turbine", "Room", "MVVM", "GitHub Actions CI"],
      github: "https://github.com/SultanZhalifa/MiniBookLibrary",
      demo: null,
      featured: true,
      context: "Personal Project",
    },
    {
      id: 4,
      title: "PestGuard-AI",
      subtitle: "AI-Powered Bio-Hazard & Pest Detection System",
      description:
        "Built an AI-powered warehouse pest detection system for PT. Kawan Lama Group's AI Open Innovation Challenge. Uses YOLO11 custom-trained model to detect snakes, cats, and geckos in warehouse zones with CLAHE low-light preprocessing. Features real-time WebSocket alerts, browser audio alarms, Telegram notifications, Gemini AI chatbot with RAG pattern, multi-zone camera monitoring, and Docker deployment.",
      tech: ["React", "Python", "FastAPI", "YOLOv11", "Gemini AI", "Docker", "WebSocket", "SQLite"],
      github: "https://github.com/SultanZhalifa/PestGuard-AI",
      demo: "https://pestguard-ai.vercel.app/login",
      featured: true,
      context: "Group Project, AI Open Innovation Challenge 2026",
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
      subtitle: "Offline-First Expense Tracker with Flutter & Material 3",
      description:
        "Built a clean, offline-first personal finance app with Flutter and Material 3. Features multi-wallet and multi-currency support with user-defined exchange rates, recurring transactions with automatic catch-up, monthly budget tracking with category-level progress bars, interactive donut and trend charts, biometric app lock, JSON backup/restore, CSV export, and animated first-run onboarding. All data stays on-device with no account required.",
      tech: ["Flutter", "Dart", "Material 3", "Provider", "SQLite"],
      github: "https://github.com/SultanZhalifa/Duitku",
      demo: "https://sultanzhalifa.github.io/Duitku/",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 7,
      title: "SaringSini",
      subtitle: "AI Hoax Filter & Family Communication Coach",
      description:
        "Built a mobile-first SPA for detecting misinformation in WhatsApp family groups, developed for #JuaraVibeCoding 2026. Uses Gemini 3.5 Flash for multimodal analysis (text, screenshot, deepfake, URL phishing). Features AI coaching with 4 parent personas and mood tracking, real-time tone adjuster slider, generative Hoax DNA visualization, regional language templates (Jawa, Sunda, Minang, Batak), live hoax map of Indonesia, quiz system, and PWA support.",
      tech: ["Node.js", "Express", "Gemini AI", "JavaScript", "PWA"],
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
      date: "May 2026",
      items: ["Gemini Certified Faculty", "Gemini Certified Student"],
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
      date: "May 2026",
      items: [
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
      date: "Sep 2024",
      items: ["Intro to Data Analytics"],
    },
    {
      issuer: "SMK N 1 Cikarang Utara",
      date: "Mar 2022",
      items: ["Vocational Competency Certificate in Light Vehicle Automotive Engineering"],
    },
  ],
};
