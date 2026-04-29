# Habit Tracker PWA

A Progressive Web App for tracking daily habits with offline support and installable features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run all tests
npm run test
```

## 📁 Project Overview
This application is a mobile-first Habit Tracker designed to help users build consistency. It supports user authentication, habit management (CRUD), and streak tracking. All data is persisted locally to ensure a fast, private, and deterministic experience.

## 📁 Data Storage & Local Persistence
The app uses `localStorage` for persistence. The data is structured as follows:

- **`habit-tracker-users`**: A JSON array of user objects.
  ```typescript
  { id: string; email: string; password: string; createdAt: string; }
  ```
- **`habit-tracker-session`**: The current session data.
  ```typescript
  { userId: string; email: string; } | null
  ```
- **`habit-tracker-habits`**: A JSON array of habits.
  ```typescript
  { id: string; userId: string; name: string; description: string; frequency: 'daily'; createdAt: string; completions: string[]; }
  ```

## 📱 PWA Implementation
PWA support is implemented using a standard manifest and a custom service worker:
- **`manifest.json`**: Defines the app's metadata, including icons (192x192 and 512x512), theme colors, and display mode (`standalone`).
- **`sw.js`**: A service worker that handles:
  - **Pre-caching**: Caches the "app shell" (main routes and assets) during the `install` event.
  - **Offline Fallback**: Intercepts fetch requests and serves cached content when the network is unavailable.
  - **Activation**: Cleans up old caches during the `activate` event.

## 🛠️ Trade-offs & Limitations
- **Local-only Storage**: Data is stored in the browser's `localStorage`. This means data does not sync across devices or browsers. If the user clears their browser data, their habits and progress will be lost.
- **Deterministic Auth**: Authentication is handled locally by matching emails and passwords in `localStorage`. This is secure for a local-first demonstration but would require a backend for production.
- **Single Frequency**: Only "daily" habits are supported in this stage, as per the technical requirements.

## 🧪 Test Suite Mapping
The test suite verifies the application's behavior across three levels:

### Unit Tests (`tests/unit/`)
- **`slug.test.ts`**: Verifies `getHabitSlug` correctly transforms names into URL-friendly strings.
- **`validators.test.ts`**: Verifies `validateHabitName` correctly enforces name requirements (required, max 60 chars).
- **`streaks.test.ts`**: Verifies `calculateCurrentStreak` accurately calculates consecutive days, handles duplicates, and resets correctly.
- **`habits.test.ts`**: Verifies habit completion toggling and storage helper logic.
- **`auth.test.ts`**: Verifies signup, login, and session management logic.
- **`storage.test.ts`**: Verifies low-level `localStorage` wrapper functionality.

### Integration Tests (`tests/integration/`)
- **`auth-flow.test.tsx`**: Verifies the UI interaction for signup and login, including error handling for duplicates and invalid credentials.
- **`habit-form.test.tsx`**: Verifies habit creation, editing, deletion (with confirmation), and completion toggling in the UI.

### End-to-End Tests (`tests/e2e/`)
- **`app.spec.ts`**: Verifies the full user journey:
  - Splash screen and route protection.
  - Signup, login, and user-specific habit visibility.
  - Habit lifecycle from creation to completion.
  - Persistence after page reloads.
  - Logout functionality.
  - Basic offline capability (app shell loading).

## ⚙️ Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test:unit": "vitest run --coverage",
  "test:integration": "vitest run",
  "test:e2e": "playwright test",
  "test": "npm run test:unit && npm run test:integration && npm run test:e2e"
}
```

## 🚢 Coverage
The project maintains **80%+ line coverage** for files in `src/lib`.