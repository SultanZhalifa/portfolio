# MiniBookLibrary

> An offline-first Android app for managing your personal book collection — rewritten from a Java/SQLite class project into modern Kotlin, and backed by **51 automated tests** running in CI.

This project started as a university assignment and was rebuilt from scratch to portfolio standard: clean MVVM architecture, reactive data flow, and a real test suite — the kind of engineering discipline that matters on a team.

[![CI](https://github.com/SultanZhalifa/MiniBookLibrary/actions/workflows/android.yml/badge.svg)](https://github.com/SultanZhalifa/MiniBookLibrary/actions)

<!-- TIP: Add 2-3 app screenshots (or a short screen-recording GIF) here. Reviewers scan visuals first. -->
<!-- <p><img src="docs/screen1.png" width="220"/> <img src="docs/screen2.png" width="220"/></p> -->

---

## Features

- **Library management** — add/edit/delete books with cover, rating, notes; real-time search; sort with persisted preferences; swipe-to-delete with undo
- **Reading tracker** — Want to Read / Reading / Finished, with page-progress bars and 1–5 ratings
- **Dashboard** — adaptive greeting, stats (total, average rating, status breakdown), recently-added carousel
- **ISBN auto-fill** via the Google Books API — no extra dependencies
- **PDF export** (native PdfDocument) and **JSON backup/restore** with merge
- **Salted SHA-256** authentication

---

## Testing — 51 unit tests

The heart of this project. Coverage spans the logic that actually breaks in real apps:

| Suite | What it verifies |
|---|---|
| `PasswordHasherTest` | determinism, salt isolation, verification |
| `UserRepositoryTest` | registration, duplicates, login, session |
| `BookListViewModelTest` | search, filter, sort, persistence, swipe-delete + undo |
| `AuthViewModelTest` | login state transitions, validation, logout |
| `GoogleBooksParserTest` | JSON parsing, missing fields, multiple authors, short ISBNs |
| `AddEditBookViewModelTest` | form validation, save/edit, ISBN auto-fill rules |

**Frameworks:** JUnit 4 · MockK · Turbine (Flow) · kotlinx-coroutines-test · Room in-memory DB
**CI:** GitHub Actions runs the full suite on every push and publishes the debug APK as an artifact.

---

## Architecture

Unidirectional data flow: **Room to ViewModel (StateFlow) to Fragment**.

- Repository layer is the only thing that touches Room; ViewModels stay persistence-agnostic
- Reactive reads via `Flow`, suspend-based writes
- `GoogleBooksParser` decoupled from networking, so parsing is testable without a live call
- Hand-rolled `ServiceLocator` for DI (60 lines) — chosen over Hilt for review readability on a single-module app

---

## Tech Stack

**Kotlin 2.0** · MVVM + Repository · Coroutines + Flow/StateFlow · Room 2.6 (KSP) · Material 3 · ViewBinding · Coil · Navigation Component
*minSdk 21 · targetSdk 34*

---

## Build & Run

```bash
git clone https://github.com/SultanZhalifa/MiniBookLibrary.git
# open in Android Studio, or:
./gradlew assembleDebug    # APK in app/build/outputs/apk/debug/
./gradlew testDebugUnitTest
```

---

## Roadmap

Barcode scanning (ML Kit) · home-screen widget · reading streaks · analytics charts · cloud sync (Firebase)

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com · *MIT License*
