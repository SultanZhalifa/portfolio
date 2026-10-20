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
      role: "Sole developer (AI-assisted)",
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
        team: "Team Andalusia",
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
      id: 14,
      featured: true,
      title: "Sultan Arcade",
      subtitle: "Mini Games with Weekly Leaderboards",
      role: "Sole developer (AI-assisted)",
      period: "Oct 2026 – Present",
      context: "Personal project, link in my Instagram bio",
      summary:
        "Ten browser mini games: five score games with weekly leaderboards and a daily challenge, plus chess, a stickman fighter, soccer, a samurai duel and 8-ball that can be played online with the server as referee.",
      result: "Live, installable as a PWA, with other players' scores on the weekly leaderboard.",
      tech: ["JavaScript", "Canvas", "Cloudflare Workers", "Supabase", "PWA", "Durable Objects", "WebSocket", "PostgreSQL"],
      github: null, // repo is private
      image: "/previews/sultan-arcade.webp",
      demo: "https://sultan-arcade.pages.dev",
      // Case study sourced from the sultan-arcade repo: README, supabase/setup.sql, server/worker.js,
      // server/shared.js, server/realtime-room.js, server/wrangler.toml, keepalive/worker.js,
      // scripts/check-precache.mjs, public/_headers, public/sw.js and the commit history (Oct 2026).
      caseStudy: {
        problem:
          "The games sit behind a link in an Instagram bio, so they have to open at once, work on a phone with nothing to install, and give people a reason to come back. Leaderboards reset every Monday, so everyone starts from zero each week.",
        flow: [
          "Five score games (stacking blocks, a piano-tiles style game, a gravity flipper, a track runner and a mosquito swatter) run on a canvas in the browser. Sound is made with Web Audio, so there are no sound files.",
          "When a round ends, the score goes to the database through a function call. The function checks the game, the score range and who owns the name before it saves anything.",
          "Names are claimed per phone: the first phone to use a name keeps it, proven by a random token that only exists on that phone. The database stores a hash of the token.",
          "Each day one of the five games is the daily challenge. The date seeds the level, so everyone gets the same one, and the database decides which game counts for that day.",
          "Chess, the stickman fighter, soccer, the samurai duel and 8-ball can be played against a bot, online, or (all but the samurai duel) on one phone. In the real-time games the server runs the match at 60 simulation steps a second and sends snapshots 30 times a second, and phones only send their inputs. Chess moves and 8-ball shots are run on the server too.",
          "The site can be installed and works offline for the score games and for chess against a bot or on one phone. Scores and online play need a connection.",
        ],
        decisions: [
          {
            title: "One simulation for the phone and the server",
            text: "The physics and rules of the stickman fighter, soccer, the samurai duel and 8-ball live in files that both the browser and the server import. The 8-ball simulation only uses addition, subtraction, multiplication, division and square roots, so it gives the same result in Chrome, in Safari and on the server.",
          },
          {
            title: "The server is the referee",
            text: "In online matches a phone sends its inputs as one number, capped per connection, and the server works out health, hits, the ball and goals. That can't be faked from dev tools. Chess moves are checked for legality, turn and seat on the server, and a room only accepts connections from the site's own origin.",
          },
          {
            title: "The database is only reachable through functions",
            text: "The tables have row level security on, and direct access is removed from the public roles. Visitors can only call a short list of functions that check every input, and the helper functions sit in a schema that isn't exposed to the internet.",
          },
          {
            title: "Limit by IP without storing IPs",
            text: "Score submissions are limited to 60 per 10 minutes and new names to 10 per hour for each IP. Only a hash of the IP is stored, and those records are deleted after a day.",
          },
          {
            title: "Refuse to deploy a broken offline cache",
            text: "The offline version loads from a precache list. A small script compares that list with the files in the public folder and fails the deploy if a file is missing or if the list names a file that doesn't exist.",
          },
          {
            title: "Keep the free database awake",
            text: "Supabase's free plan pauses a project after 7 days without activity, so a small Cloudflare Worker on a daily schedule calls the database once a day.",
          },
        ],
        result: [
          "Ten games from one link: five score games, and five that can be played against a bot, online or, for most of them, on one phone.",
          "Live at sultan-arcade.pages.dev, with other players' scores on the weekly leaderboard.",
          "Weekly and all-time leaderboards, a daily challenge, score cards sized for Instagram stories, and a link that challenges a friend to beat a score.",
          "The repository's 19 commits run from 17 to 19 October 2026.",
        ],
        limits: [
          "Scores come from the player's phone, so someone technical can still submit a fake score under their own name. The database caps the score per game and limits submissions, but it can't replay the game.",
          "There are no automated tests. The simulations are deterministic, so they would be easy to test, but nothing does it yet.",
          "Name ownership is only checked for the leaderboard. In chess and the real-time games anyone can use any name.",
          "Online matches draw the server's picture without prediction on the phone, so a weak connection shows up as a short delay or the opponent jumping.",
          "Moderation is manual: removing a score or freeing a name means running SQL in the Supabase dashboard.",
          "It runs on free plans (Supabase and Cloudflare), and the source repository is private.",
        ],
      },
    },
    {
      id: 10,
      featured: true,
      title: "SaringSini",
      subtitle: "Hoax Checker for Family Group Chats",
      role: "Sole developer (AI-assisted)",
      period: "May — Jul 2026",
      context: "Competition Entry — #JuaraVibeCoding 2026",
      summary:
        "PWA that checks text, screenshots, and links for hoaxes with Gemini, then drafts polite replies in 4 regional languages (Javanese, Sundanese, Minangkabau, Batak) for family group chats.",
      result: "Rate limiting (6 requests/min), CSP headers, and a non-root Docker image set up for Google Cloud Run.",
      tech: ["Node.js", "Express", "Gemini AI", "PWA", "Docker", "Google Cloud Run"],
      github: "https://github.com/SultanZhalifa/SaringSini",
      demo: null,
      ai: true,
      // Case study sourced from the SaringSini repo: README, CHANGELOG, metadata.json, Dockerfile,
      // src/config.js, src/lib/analysis.js, src/lib/file-type.js, src/middleware/security.js,
      // src/middleware/rate-limit.js, src/prompts/guard.js and the commit history (Oct 2026).
      caseStudy: {
        problem:
          "Hoaxes travel through family WhatsApp groups, and correcting a parent or an uncle in front of everyone often turns into an argument. SaringSini checks a suspicious message and drafts a polite reply, so the family can talk about it without a fight.",
        team: "Sultan & Misha",
        flow: [
          "You paste a message, upload a screenshot, image or video (up to 5 MB), or paste a link. Text can also be dictated with the browser's speech input.",
          "The server checks the type and length of every field. It reads the first bytes of an upload to find the real file type instead of trusting what the browser says, and it never fetches a pasted link.",
          "The input goes to Gemini inside tagged blocks, with a system prompt that says the content is data to analyse, not instructions.",
          "Gemini's JSON answer is treated as untrusted. Each field is forced to the expected type and length, and if the risk label isn't one of the three allowed ones, it is worked out from the score (below 30 is safe, below 70 is a warning).",
          "The result shows a risk score, each claim with a short explanation, and three reply drafts: polite, casual and humorous. A slider changes the tone, and a reply can be converted to Javanese Krama, Sundanese Halus, Minang or Batak. It can be exported as PNG or PDF, or shared to WhatsApp.",
          "By default, a snippet of up to 110 characters is added to a demo community feed saved in a local JSON file, with phone numbers, emails and long digit runs masked on a best-effort basis. COMMUNITY_AUTO_PUBLISH=false turns this off.",
        ],
        decisions: [
          {
            title: "Treat the model's answer as untrusted",
            text: "Gemini's output can be malformed, or steered by text inside the message it was given. Every field is coerced to a bounded plain-text value before it is stored or shown, and the user's message is wrapped as tagged data. The README says this only partly covers prompt injection.",
          },
          {
            title: "Never fetch a pasted link",
            text: "The link check is Gemini's opinion of the URL text, and the server never requests the address. A pasted link can't make the server call an internal address, at the cost of not looking at what is actually behind it.",
          },
          {
            title: "Render everything as text",
            text: "A hardening pass in October 2026 found that message text and AI output were stored and shown to every visitor as HTML, which made the community feed a stored XSS risk. All of it is now rendered with textContent, and the CSP has no inline scripts or styles (script-src 'self', style-src-attr 'none') as a second layer.",
          },
          {
            title: "Count rate limits by the real client address",
            text: "AI calls are limited to 6 a minute per IP because each one uses Gemini quota. Behind Cloud Run the app saw the proxy's address for everyone, so all visitors shared one limit. The Docker image now sets TRUST_PROXY=1 to read the real address.",
          },
          {
            title: "Write the browser tests before splitting the script",
            text: "The front end was one script of about 2,200 lines. Browser tests for every feature were added first, then the script was split into ES modules, so a broken split would show up in the tests.",
          },
        ],
        result: [
          "A practice mode: a chat simulator where Gemini plays a family member, then gives feedback on how you answered.",
          "Installable as a PWA. The app shell works offline, while the AI features need a connection.",
          "About 120 unit, integration and smoke tests (the integration tests use a fake Gemini, so they need no API key) and about 80 Playwright browser tests.",
          "CI runs lint, the tests on Node 22 and 24, browser tests on Chromium, npm audit, a Docker build with a health check, and CodeQL.",
          "The Docker image is built on Node 24 Alpine and runs as the unprivileged node user, with a health check.",
          "Open source under MIT. One outside contributor's smoke test for the stats endpoint was merged.",
        ],
        limits: [
          "No source search and no citations. The score is the model's own number, not a calibrated probability, and the deepfake and link checks are model guesses, not forensic or security scans.",
          "The accuracy of the AI output hasn't been measured. The tests use a fake Gemini, so they cover the code around the model, not what the model says.",
          "The community numbers, leaderboard, map and live activity are demo data, not real users.",
          "The feed is a local JSON file and the rate limiter lives in memory, so both are per instance. On Cloud Run's temporary disk the feed can be lost, so this isn't ready for real traffic.",
          "There is no public demo at the moment. The README says to run it locally with a Gemini API key.",
          "Accessibility has not been audited against WCAG.",
        ],
      },
    },
    {
      id: 2,
      featured: true,
      title: "Naik Kelas",
      subtitle: "Credit Scoring for Small Merchants",
      role: "Sole developer (AI-assisted)",
      period: "Jun 2026",
      context: "Hackathon — AstraPay 2026",
      summary:
        "Explainable credit-scoring prototype that turns QRIS transaction history into a score (AstraScore) and tiered micro-loans for small merchants, repaid automatically from sales.",
      result: "41 unit and edge-case tests (20 unit, 21 edge-case) across 5 test personas.",
      tech: ["Next.js", "TypeScript", "Vitest", "QRIS"],
      github: "https://github.com/SultanZhalifa/naik-kelas",
      demo: null,
      // Case study sourced from the naik-kelas repo: README, PITCH.md, lib/engine.ts, lib/state.ts,
      // lib/personas.ts, lib/astrapay.ts, lib/store.ts, app/api/*, tests/ and scripts/.
      caseStudy: {
        problem:
          "Small merchants who depend on a motorbike (street vendors, couriers, small shops, workshops) usually have no payslip, no collateral and no credit score, so a bank has nothing to score them with. They do leave a record, though: daily QRIS sales and motorbike installments paid on time. Naik Kelas turns that record into a score and a small loan that pays itself back from sales.",
        team: "Team Andalusia",
        flow: [
          "A merchant picks one of five demo profiles (a street vendor, a small shop, a courier, a workshop and a newcomer) and agrees to share transaction data.",
          "The score engine reads 90 days of transactions and scores five factors: on-time FIF installments (35%), QRIS sales volume and consistency (30%), how often they transact (15%), account age and verification level (10%), and sales growth over three months (10%). The result is a score from 300 to 850.",
          "The score sets a tier (Belum Memenuhi, Pemula, Tumbuh, Mapan or Juara) and a loan limit: the tier's cap or half of the monthly QRIS sales, whichever is lower. A panel shows how many points each factor added.",
          "The merchant takes a Modal Jalan loan up to that limit, with a fee set by the tier. Only one loan can be active at a time.",
          "Each QRIS sale pays back 20% of itself until the loan is cleared, so repayment follows sales instead of a fixed due date. The last cut never goes past what is still owed.",
          "When the loan is cleared, the score is recalculated from the latest transactions, with a bonus of up to 40 points for on-time repayment, so the tier and limit can go up. The merchant also earns AstraPoints (1 per Rp1,000 borrowed), and 250 points take 0.5% off the next loan's fee.",
        ],
        decisions: [
          {
            title: "A score you can check by hand",
            text: "The engine is a pure function with fixed weights, not a trained model. The screen shows how many points each factor added, the what-if projection runs on the same engine, and an audit view lays out raw data, weights and contributions so the math can be redone with a calculator.",
          },
          {
            title: "Tie the limit to cash flow, not only the score",
            text: "Tier caps run from Rp500,000 to Rp5,000,000, and the limit can never be more than half of the monthly QRIS sales. A high score alone can't push a loan past what the shop's sales can pay back.",
          },
          {
            title: "Don't let one odd day move the score",
            text: "Consistency uses the standard deviation of daily sales. Daily sales are capped at three times the average before that calculation, so a single outlier day, including a payment injected during the demo, doesn't distort it.",
          },
          {
            title: "Put the payment API behind an interface",
            text: "The app talks to a PaymentProvider interface with two versions: a local mock and an AstraPay Sandbox adapter. An environment variable picks one, and if the Sandbox call fails or takes more than 5 seconds, the mock answers instead. Endpoint paths can be changed through environment variables because the real API details were only given with the organizers' credentials.",
          },
          {
            title: "Generate demo data from a seeded generator",
            text: "Each profile's 90 days of transactions come from a seeded random generator, so every run gives the same score. That makes the numbers testable, and the score is calculated from the transactions every time instead of being hardcoded.",
          },
        ],
        result: [
          "The whole loop works: score, loan, automatic repayment, a higher tier, points, and a second loan with a lower fee.",
          "The five profiles cover the range, from a shop that reaches the top tier to a newcomer with three months of history whose score is too low for a loan. For that profile, the what-if tool shows what would raise it.",
          "20 unit tests with Vitest (score formula, tier boundaries, limit rule, each profile's tier, repayment and reward logic), plus an API script with 21 checks and a 9-step browser run that saves a screenshot at every screen.",
          "Built for the AstraPay Hackathon 2026 by Team Andalusia, with a pitch outline and prepared answers for likely questions from the judges.",
        ],
        limits: [
          "No real data. Transactions come from a seeded generator, and each profile was set up to land in a chosen tier. The tests check that it does, so they show the code is consistent, not that the score predicts who repays.",
          "Fees, limits and the 20% rate are illustrative. They haven't been calibrated with a lender.",
          "A repaid loan counts twice: as an on-time installment in the FIF factor and again as the repayment bonus, so the app's own loans raise the score twice. That is fine for a demo, but a real scorer would need to keep the two apart.",
          "The server trusts the state snapshot the browser sends, which is how the demo survives serverless cold starts. A client could fake its own score or limit, so this is demo-only.",
          "The AstraPay Sandbox adapter is written, but the repo doesn't show it running against the real Sandbox. The demo runs on the local mock.",
          "No CI and no public demo link in the repo. The tests run by hand, and the API and browser scripts need a running server.",
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
      // Case study sourced from the MiniBookLibrary repo: README, app/build.gradle.kts, the data,
      // domain, ui and util packages, app/src/test and .github/workflows/android.yml.
      caseStudy: {
        problem:
          "A reading list should keep working without a connection, and adding a book shouldn't mean typing everything in. The app began as a class project in Java with raw SQLite, then was rewritten from scratch in Kotlin with MVVM, Room and Material 3.",
        flow: [
          "Sign up or sign in. Passwords are stored as a salted SHA-256 hash, and the session is kept in SharedPreferences so the app opens straight to the dashboard.",
          "Add a book by hand, or type or scan an ISBN. The scanner uses CameraX and ML Kit, and the lookup asks the Google Books API for the title, author, year, category and page count. It only fills fields that are still empty, and gives up after 8 seconds.",
          "Covers come from the system photo picker, which needs no permission on Android 13 and later. The image is copied into the app's own storage so it survives a reinstall.",
          "The library list searches as you type, sorts by title, date added or rating, and filters by reading status (want to read, reading, finished). The sort and filter choices are remembered.",
          "Every screen reads from Room through Flow, so the dashboard, the list and the counters update by themselves when a book changes.",
          "The library can be exported to PDF or JSON, and a JSON backup can be imported. Importing adds the books instead of replacing the existing ones. A home screen widget shows what is currently being read.",
        ],
        decisions: [
          {
            title: "Room is the source of truth",
            text: "Room emits data, a ViewModel turns it into a StateFlow of UI state, and the fragment collects it. Nothing is pushed into the screens; everything shown is derived from the database.",
          },
          {
            title: "Only the repository knows about Room",
            text: "ViewModels talk to repositories, and only the repositories know about the database. If the books ever came from a remote API, no ViewModel would need to change.",
          },
          {
            title: "A small hand-written service locator instead of Hilt",
            text: "Hilt would have worked, but it felt heavy for a single module, and a small container can be read in half a minute.",
          },
          {
            title: "Parse the lookup result separately from the network call",
            text: "The Google Books parser is its own class, so it can be tested on the JVM with JSON fixtures and no network. The lookup itself uses HttpURLConnection and org.json, which are already on the platform, so it adds no libraries.",
          },
          {
            title: "Never overwrite what the user typed",
            text: "The ISBN lookup fills a field only if it is blank, and a unit test checks that existing input is left alone.",
          },
          {
            title: "Say how far the password hashing goes",
            text: "The hasher uses a random salt per user with SHA-256, and the code's own comment explains why: bcrypt or Argon2 would add a dependency, and this is an offline app where the realistic threat is a leaked database file. The same comment says real production code should use a memory-hard function.",
          },
        ],
        result: [
          "51 unit tests with JUnit 4, MockK, Turbine and the coroutines test library. They cover the ISBN parser, both repositories, enum storage, the password hasher and three ViewModels (sign-in, add or edit a book, and the book list).",
          "GitHub Actions runs the unit tests and builds a debug APK on every push and pull request, and keeps the APK for 14 days.",
          "Works on Android 5.0 and later and targets Android 14.",
          "Three reading states, page progress, a 1 to 5 rating, a dashboard with the average rating and a status breakdown, a three-slide onboarding and a light, dark or system theme.",
        ],
        limits: [
          "The 51 tests are JVM unit tests. There are no instrumented tests, so the screens, the camera scanner and the widget aren't tested automatically.",
          "Passwords use a single round of salted SHA-256, which the code itself says is not suited for production. The account exists only on the device, so it guards the local library and not an online account.",
          "Books are kept in an unencrypted Room database, and there is no cloud sync. Moving a library to another phone means exporting and importing JSON.",
          "The ISBN lookup depends on the public Google Books API, and finds nothing when there is no connection or no match.",
        ],
      },
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
      // Case study sourced from the srmaudit-octave-allegro repo: README, docs/ARCHITECTURE.md,
      // docs/adr, schema.sql, src/services/engines/*, src/data/*, src/services/storage/*, tests/ and
      // .github/workflows/ci.yml, and the changes merged to the repo in October 2026.
      caseStudy: {
        problem:
          "A security risk assessment is a chain of linked steps: what the organisation is, which assets matter, what could go wrong with them, and what to check afterwards. SRMAudit puts that chain into one tool, built around the asset-first approach of OCTAVE Allegro, so each step feeds the next and the work ends in a report.",
        flow: [
          "Sign in. If Supabase keys are set, accounts and data live in Supabase. If not, the app runs in a local mode with accounts and data kept in the browser (IndexedDB). The features are the same in both modes.",
          "Describe the organisation: its sector, size and main system type. An exposure score from 1 to 10 is worked out from those three inputs.",
          "List the assets and rate each one High, Medium or Low for confidentiality, integrity and availability. The weights 3, 2 and 1 are added up to a criticality from 3 to 9: 8 and up is Critical, 6 and up High, 4 and up Medium.",
          "For each asset, pick vulnerabilities from a catalogue of 19 entries in 8 categories (injection, broken authentication, sensitive data exposure and so on). Each pick becomes a risk scored as likelihood times impact, each from 1 to 5: 16 and up is Critical, 10 and up High, 5 and up Medium. Both numbers start from a default stored with the vulnerability, and the user can change them for each risk. The ratings are kept when the assessment is run again.",
          "An audit checklist is generated with one item per unique vulnerability, each tied to ISO/IEC 27001:2022 Annex A and NIST CSF 2.0 controls, plus five baseline controls. Each item is marked compliant, partially, non-compliant, pending or not applicable. Evidence files are uploaded on their own page.",
          "The compliance score is the compliant items plus half of the partial ones, divided by the items that apply, as a percentage. Pending and not applicable items are left out. 85 and up is Compliant and 60 and up is Needs Improvement.",
          "Findings come from risks scored 10 or more and from every non-compliant control, and the assessment can be exported as a PDF report. An assistant answers questions with the user's own Gemini or OpenRouter key, or from a built-in knowledge base when there is no key.",
        ],
        decisions: [
          {
            title: "Two storage backends behind one interface",
            text: "The app talks to a storage interface with two versions: Supabase (real sign-in, a per-user table and file storage) and a local one on IndexedDB. The config picks one at start-up, and the Supabase code is loaded lazily so local-only builds don't carry it. The written decision notes that the original Supabase account had been lost, so the app couldn't assume a working cloud.",
          },
          {
            title: "Keep the maths in pure functions",
            text: "The risk, compliance, exposure and findings engines are plain functions with no network and no page access. That is where the calculations are, and where most of the unit tests are.",
          },
          {
            title: "Escape everything by default",
            text: "Pages are built with an html template tag that escapes every interpolated value. Trusted markup has to opt in with raw(). Clicks and inputs go through event delegation (data-action) instead of inline onclick handlers.",
          },
          {
            title: "One-way layers",
            text: "Code is split into core, data, services, features and app, and a layer may only import from the ones before it. Each page is a self-contained feature, and features never import each other.",
          },
          {
            title: "Upgrade old password hashes when the user signs in",
            text: "Accounts in local mode first stored a plain SHA-256 of the password. New accounts now use PBKDF2-SHA256 with a random salt and 600,000 iterations, saved with the account. An old account still signs in, and its record is rewritten with a salted hash on that sign-in, because that is the only moment the password is available.",
          },
          {
            title: "Rows that belong to one user",
            text: "All audit data sits in one table keyed by user id and a name, with a row level security policy that only lets a user read and write their own rows. The evidence bucket is private, with matching policies on a folder named after the user id, and files are opened through signed links that expire after an hour. Only the file's path is saved, never a link.",
          },
          {
            title: "Quality gates on every push",
            text: "Strict TypeScript, ESLint with zero warnings allowed, a Prettier check, the tests and the build all run in CI on every push and pull request. The build works with empty Supabase variables, which is how local mode is built.",
          },
        ],
        result: [
          "Fourteen pages: dashboard, users, organisation, assets, threats, risks, audit checklist, evidence, compliance, findings, an assistant, the report, settings and docs.",
          "83 unit tests in 12 files, run on Node 20 and Node 26: the four engines, rating a risk, HTML escaping, the local storage adapter (including salted passwords and upgrading an old hash) on a fake IndexedDB, the Supabase adapter against a fake client, role-based page access and the assistant.",
          "Each vulnerability category is mapped to real ISO/IEC 27001:2022 Annex A and NIST CSF 2.0 control identifiers.",
          "A later pass fixed what the first version got wrong: a public evidence bucket, unsalted password hashes, the Gemini key sent in a URL, an outdated setup guide, and development dependencies with known vulnerabilities. npm audit now reports none.",
          "Three architecture decision records and an architecture document in the repo.",
        ],
        limits: [
          "Likelihood and impact start from a default for each catalogue entry. They can be changed per risk, and the notes the user wrote in Step 1 about what low, medium and high impact mean are shown above the register. But nothing suggests a rating and those notes change no score.",
          "Risks are picked from a fixed catalogue of 19 web application vulnerabilities instead of being built from free-form threat scenarios, so it follows OCTAVE Allegro's asset-first idea, not the full method.",
          "Roles only change what the interface shows. The database separates users by sign-in, not by role, and has no role column.",
          "Each account has its own private workspace, so one assessment can't be shared between several accounts. The Users page is a list inside one workspace.",
          "In local mode the data in the browser is not encrypted, so the account is only a convenience lock for that browser.",
          "Cloud mode, including the private bucket and the signed links, has only been tested against a fake Supabase client, not against a real project.",
        ],
      },
    },
    {
      id: 13,
      title: "UMKM Order Pages",
      subtitle: "WhatsApp Ordering Pages for Small Businesses",
      period: "Oct 2026 — Present",
      context: "Freelance service — Cikarang",
      summary:
        "One-page sites for small businesses that still take orders by chat. Customers see the prices and pick items or a time slot, and the page opens WhatsApp with one complete order message, total included. No app to install.",
      result: "5 working demo pages: a noodle shop, a food stall, a motorbike workshop, a laundry, and a boarding house, plus a free selling-price calculator. The business names are made up, but every order button works.",
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
      demo: "https://astrapay-naik-kelas.vercel.app",
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
