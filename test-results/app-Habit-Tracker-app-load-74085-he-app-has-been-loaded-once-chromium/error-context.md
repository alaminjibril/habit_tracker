# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> loads the cached app shell when offline after the app has been loaded once
- Location: tests\e2e\app.spec.ts:124:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="splash-screen"], [data-testid="dashboard-page"], [data-testid="auth-login-email"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="splash-screen"], [data-testid="dashboard-page"], [data-testid="auth-login-email"]').first()

```

# Test source

```ts
  43  |   test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
  44  |     // Signup first user
  45  |     await page.goto('/signup');
  46  |     await page.getByTestId('auth-signup-email').fill('user1@example.com');
  47  |     await page.getByTestId('auth-signup-password').fill('pass1');
  48  |     await page.getByTestId('auth-signup-submit').click();
  49  |     
  50  |     // Add habit for user 1
  51  |     await page.getByTestId('create-habit-button').click();
  52  |     await page.getByTestId('habit-name-input').fill('User 1 Habit');
  53  |     await page.getByTestId('habit-save-button').click();
  54  |     
  55  |     // Logout
  56  |     await page.getByTestId('auth-logout-button').click();
  57  |     
  58  |     // Signup second user
  59  |     await page.goto('/signup');
  60  |     await page.getByTestId('auth-signup-email').fill('user2@example.com');
  61  |     await page.getByTestId('auth-signup-password').fill('pass2');
  62  |     await page.getByTestId('auth-signup-submit').click();
  63  |     
  64  |     // Verify user 1's habit is NOT visible
  65  |     await expect(page.getByText('User 1 Habit')).not.toBeVisible();
  66  |     await expect(page.getByTestId('empty-state')).toBeVisible();
  67  |   });
  68  | 
  69  |   test('creates a habit from the dashboard', async ({ page }) => {
  70  |     await page.goto('/signup');
  71  |     await page.getByTestId('auth-signup-email').fill('user@example.com');
  72  |     await page.getByTestId('auth-signup-password').fill('password');
  73  |     await page.getByTestId('auth-signup-submit').click();
  74  | 
  75  |     await page.getByTestId('create-habit-button').click();
  76  |     await page.getByTestId('habit-name-input').fill('Morning Meditation');
  77  |     await page.getByTestId('habit-description-input').fill('10 mins of focus');
  78  |     await page.getByTestId('habit-save-button').click();
  79  | 
  80  |     await expect(page.getByTestId('habit-card-morning-meditation')).toBeVisible();
  81  |   });
  82  | 
  83  |   test('completes a habit for today and updates the streak', async ({ page }) => {
  84  |     await page.goto('/signup');
  85  |     await page.getByTestId('auth-signup-email').fill('user@example.com');
  86  |     await page.getByTestId('auth-signup-password').fill('password');
  87  |     await page.getByTestId('auth-signup-submit').click();
  88  | 
  89  |     await page.getByTestId('create-habit-button').click();
  90  |     await page.getByTestId('habit-name-input').fill('Daily Water');
  91  |     await page.getByTestId('habit-save-button').click();
  92  | 
  93  |     await expect(page.getByTestId('habit-streak-daily-water')).toHaveText(/0 day/);
  94  |     
  95  |     await page.getByTestId('habit-complete-daily-water').click();
  96  |     await expect(page.getByTestId('habit-streak-daily-water')).toHaveText(/1 day/);
  97  |   });
  98  | 
  99  |   test('persists session and habits after page reload', async ({ page }) => {
  100 |     await page.goto('/signup');
  101 |     await page.getByTestId('auth-signup-email').fill('user@example.com');
  102 |     await page.getByTestId('auth-signup-password').fill('password');
  103 |     await page.getByTestId('auth-signup-submit').click();
  104 | 
  105 |     await page.getByTestId('create-habit-button').click();
  106 |     await page.getByTestId('habit-name-input').fill('Persistent Habit');
  107 |     await page.getByTestId('habit-save-button').click();
  108 | 
  109 |     await page.reload();
  110 |     await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
  111 |     await expect(page).toHaveURL(/.*dashboard/);
  112 |   });
  113 | 
  114 |   test('logs out and redirects to /login', async ({ page }) => {
  115 |     await page.goto('/signup');
  116 |     await page.getByTestId('auth-signup-email').fill('user@example.com');
  117 |     await page.getByTestId('auth-signup-password').fill('password');
  118 |     await page.getByTestId('auth-signup-submit').click();
  119 | 
  120 |     await page.getByTestId('auth-logout-button').click();
  121 |     await expect(page).toHaveURL(/.*login/);
  122 |   });
  123 | 
  124 |   test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
  125 |     await page.goto('/');
  126 |     
  127 |     // Wait for Service Worker to be fully registered, active, and controlling the page
  128 |     await page.evaluate(async () => {
  129 |       await navigator.serviceWorker.ready;
  130 |       if (!navigator.serviceWorker.controller) {
  131 |         await new Promise((resolve) => {
  132 |           navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
  133 |         });
  134 |       }
  135 |     });
  136 |     // Simulate offline
  137 |     await context.setOffline(true);
  138 |     // Navigation should still work via SW
  139 |     await page.goto('/', { waitUntil: 'commit' });
  140 |     
  141 |     // Verify app shell presence (either loading or loaded state)
  142 |     // We use a more resilient approach by waiting for any of these to appear
> 143 |     await expect(page.locator('[data-testid="splash-screen"], [data-testid="dashboard-page"], [data-testid="auth-login-email"]').first()).toBeVisible({ timeout: 10000 });
      |                                                                                                                                           ^ Error: expect(locator).toBeVisible() failed
  144 |   });
  145 | });
  146 | 
```