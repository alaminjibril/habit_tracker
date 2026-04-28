# Habit Tracker PWA

A modern, high-performance Habit Tracker built with Next.js, TypeScript, and Tailwind CSS. This application is a Progressive Web App (PWA) that works offline and is fully installable.

## 🚀 Features

- **Authentication**: Secure email/password login and signup (Local storage based).
- **Habit Management**: Create, edit, and delete habits with ease.
- **Streak Tracking**: Automatically calculate daily streaks based on completion history.
- **PWA Ready**: Installable on mobile and desktop, works offline.
- **Responsive Design**: Mobile-first, premium UI with dark mode support.
- **Comprehensive Testing**: Unit, integration, and E2E tests included.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest, React Testing Library, Playwright
- **Persistence**: LocalStorage

## 📦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
# Run all tests
npm run test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

- `src/app`: Application routes and layout.
- `src/components`: Reusable UI components (Auth, Habits, Shared).
- `src/lib`: Core logic, utilities, and storage helpers.
- `src/types`: TypeScript type definitions.
- `src/hooks`: Custom React hooks for Auth and Habits.
- `tests/`: Full test suite (Unit, Integration, E2E).

## 🔐 Auth & Storage

This app uses `localStorage` as the source of truth.
- `habit-tracker-users`: Stores user credentials.
- `habit-tracker-session`: Stores active user session.
- `habit-tracker-habits`: Stores all habit data.

---
