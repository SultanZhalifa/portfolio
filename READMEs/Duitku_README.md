# Duitku — Expense Tracker

> An offline-first, privacy-respecting personal finance app in **Flutter** — multi-wallet, multi-currency, and running the *same code* on Android and the web. Backed by **17 automated tests** and zero `flutter analyze` issues.

 **Live web demo:** [sultanzhalifa.github.io/Duitku](https://sultanzhalifa.github.io/Duitku/)
*(The web build runs identical code to mobile; native-only features like biometrics hide automatically where unsupported.)*

<!-- TIP: Add app screenshots (donut chart + home) here. -->

---

## Features

- **Multi-wallet, multi-currency** with user-defined exchange rates; balances derive from transaction history
- **Transfers** modeled as linked dual-leg pairs (kept out of spending totals for accuracy)
- **Recurring engine** — daily/weekly/monthly rules with idempotent catch-up on launch (exactly one txn per missed occurrence)
- **Analytics** — monthly summaries, donut charts, 6-month trends, category budgets with over-budget alerts
- **Biometric / passcode lock** · versioned JSON backup-restore · CSV export via share sheet

---

## Testing — 17 tests

Covers the logic most likely to corrupt money data: transfer mechanics (paired delete), balance + currency conversion, recurring catch-up idempotency, and backup round-trips with corrupt-input rejection — plus widget tests for onboarding and home. `flutter analyze` reports **zero issues**; Android APK and web builds both verified.

---

## Notable design

- **Immutable transaction model** (`copyWith`, positive amounts — sign derives from type)
- **Honest platform boundaries** — services expose real capability checks; unavailable features are hidden, never faked
- **Versioned schema** in backups for validated, typed restore

---

## Tech Stack

**Flutter** (Material 3) · **Dart** · Provider (ChangeNotifier) · fl_chart · local_auth · flutter_local_notifications · shared_preferences · share_plus
*Platforms: Android · iOS · Web · desktop folders present*

---

## Run

```bash
git clone https://github.com/SultanZhalifa/Duitku.git
cd Duitku && flutter pub get
flutter run            # device/emulator
flutter test           # run the 17 tests
```

---

## Author

**Sultan Zhalifunnas Musyaffa** — Informatics @ President University
[LinkedIn](https://linkedin.com/in/sultanzhalifunnasmusyaffa) · sultanzhalifunnasmusyaffa@gmail.com
