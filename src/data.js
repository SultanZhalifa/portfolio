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
        "Python", "JavaScript", "TypeScript", "Java", "Kotlin", "SQL",
        "React", "Next.js", "Node.js", "Express", "FastAPI", "Flask", "Tailwind CSS",
      ],
    },
    {
      category: "Mobile & Testing",
      items: [
        "Android (Kotlin)", "MVVM", "Room", "Coroutines",
        "JUnit 4", "MockK", "Turbine", "GitHub Actions CI", "Manual Testing", "Edge Case Analysis",
      ],
    },
    {
      category: "AI & Data",
      items: [
        "Gemini AI", "YOLOv8", "YOLOv11", "Chart.js",
        "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Room ORM",
      ],
    },
    {
      category: "Tools & Security",
      items: [
        "Git", "GitHub", "Docker", "Linux", "REST API", "Android Studio",
        "Vulnerability Assessment", "Penetration Testing", "Digital Forensics", "Network Security",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "fintrack-ai",
      subtitle: "AI-Powered Personal Finance Tracker",
      description:
        "Built a React web app with Chart.js for spending visualization and Gemini AI for natural language financial insights. Deployed on Vercel.",
      tech: ["React", "Chart.js", "Gemini AI", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/SultanZhalifa/fintrack-ai",
      demo: "https://fintrack-ai.vercel.app",
      featured: true,
      context: "Personal Project",
    },
    {
      id: 2,
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
      id: 3,
      title: "Smart Warehouse",
      subtitle: "AI Inventory Management System",
      description:
        "Built an object detection pipeline using YOLOv8 and YOLOv11 to track warehouse inventory in real time. Contributed to validation and accuracy testing of detection output.",
      tech: ["Python", "YOLOv8", "YOLOv11", "PostgreSQL", "JavaScript"],
      github: "https://github.com/SultanZhalifa/smartwarehouse-ai",
      demo: null,
      featured: true,
      context: "Group Project, Software Engineering Course",
    },
    {
      id: 4,
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
  ],

  experience: [
    {
      company: "PT Honda Prospect Motor",
      role: "Production Worker — Repair AF / Welding Division",
      period: "Apr 2023 — Apr 2024",
      location: "Karawang, Indonesia",
      points: [
        "Performed quality control checks on welded components daily, flagging rework items that did not meet OEM tolerance standards.",
        "Built disciplined habits around systematic checking, attention to detail, and consistent delivery within a structured manufacturing team.",
      ],
    },
    {
      company: "PT Indomobil Trada Nasional Cikarang (Nissan Datsun)",
      role: "Industrial Internship Program (PRAKERIN)",
      period: "Mar 2021 — May 2021",
      location: "Cikarang, Indonesia",
      points: [
        "Supported workshop inspection and service operations at an authorized Nissan Datsun dealership.",
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
