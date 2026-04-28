# Habit Tracker PWA

A Progressive Web App for tracking daily habits with offline support and installable features.

**Features:** Sign up, login, create/edit/delete habits, mark complete, track streaks, offline-capable, installable

---

## 🚀 Quick Start

```bash
# Install
npm install

# Dev
npm run dev
# Visit http://localhost:3000

# Test
npm run test:unit
npm run test:integration
npm run test:e2e

# Build & Deploy
npm run build
npm run start
```

---

## 📁 Structure

```
src/
├── app/              # Pages & routes
├── components/       # React components
├── lib/              # Utilities & functions
├── types/            # TypeScript types
public/
├── manifest.json     # PWA config
├── sw.js             # Service worker
└── icons/            # App icons
tests/               # Unit, integration, e2e tests
```

---

## 💾 Data Storage

All data in **localStorage** (no backend):

```javascript
// habit-tracker-users → User accounts
// habit-tracker-session → Current logged-in user
// habit-tracker-habits → All habits with completions
```

---

## 🧪 Test Commands

```bash
npm run test:unit          # Unit tests
npm run test:integration   # Component tests
npm run test:e2e          # Browser tests
npm run test              # All tests
```

Required test titles are in each test file.

---

## 📱 PWA Installation

**Desktop:** Click install icon → App launches fullscreen  
**Mobile:** Share menu → Add to Home Screen → Launches fullscreen

Works offline after first load (cached by service worker).

---

## 🔑 Key Functions

- `getHabitSlug(name)` — Converts "Drink Water" → "drink-water"
- `validateHabitName(name)` — Validates habit names (max 60 chars)
- `calculateCurrentStreak(completions)` — Counts consecutive days
- `toggleHabitCompletion(habit, date)` — Marks habit done/undone

---

## 🔐 Auth

**Signup:** Email + password → creates user + session → /dashboard  
**Login:** Email + password → creates session → /dashboard  
**Logout:** Clears session → /login

---

## 📖 Routes

| Route | Purpose |
|-------|---------|
| `/` | Splash screen (redirects to /login or /dashboard) |
| `/signup` | Create account |
| `/login` | Sign in |
| `/dashboard` | Main app (protected, shows your habits) |

---

## 🎯 Habits CRUD

**Create:** Click "Create Habit" → Fill form → Save  
**Read:** See all your habits on dashboard  
**Update:** Click Edit → Change name/description → Update  
**Delete:** Click Delete → Confirm → Gone

---

## 📊 Streak Calculation

```
No completions → 0
Today completed → 1
Today + yesterday → 2
Yesterday (not today) → 0
```

---

## 🚢 Deploy to Vercel

```bash
git push
# Auto-deploys when pushed to main
```

Or manual:
```bash
npm run build
vercel
```

---

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

---

## 📝 Types

```typescript
// User
{ id: string; email: string; password: string; createdAt: string }

// Session
{ userId: string; email: string }

// Habit
{
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: 'daily';
  createdAt: string;
  completions: string[]; // ["2024-04-23", "2024-04-22"]
}
```

---

## 🐛 Troubleshooting

**App won't start?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**localStorage missing?** → Check DevTools → Application → Local Storage

**Tests failing?** → Check test file syntax, run with `--reporter=verbose`

**Service worker not working?** → DevTools → Application → Service Workers → Unregister & refresh

---

## ✅ Before Submitting

- [ ] All routes working (/, /login, /signup, /dashboard)
- [ ] Sign up, login, logout working
- [ ] Create, edit, delete habits working
- [ ] Mark habit complete updates streak
- [ ] Data persists after page reload
- [ ] All tests passing (`npm run test`)
- [ ] 80%+ coverage on src/lib
- [ ] App installable (has install button)
- [ ] Works offline after first load
- [ ] No TypeScript errors
- [ ] Deployed to Vercel/Netlify

---

## 📱 GitHub & Live URL

**GitHub:** [Your repo URL]  
**Live:** [Your Vercel/Netlify URL]

---

**Done!** 🚀