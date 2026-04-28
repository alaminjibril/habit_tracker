import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    
    await expect(page).toHaveURL(/.*dashboard/);
    
    await page.goto('/');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('newuser@example.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    // Signup first user
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user1@example.com');
    await page.getByTestId('auth-signup-password').fill('pass1');
    await page.getByTestId('auth-signup-submit').click();
    
    // Add habit for user 1
    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('User 1 Habit');
    await page.getByTestId('habit-save-button').click();
    
    // Logout
    await page.getByTestId('auth-logout-button').click();
    
    // Signup second user
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user2@example.com');
    await page.getByTestId('auth-signup-password').fill('pass2');
    await page.getByTestId('auth-signup-submit').click();
    
    // Verify user 1's habit is NOT visible
    await expect(page.getByText('User 1 Habit')).not.toBeVisible();
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Morning Meditation');
    await page.getByTestId('habit-description-input').fill('10 mins of focus');
    await page.getByTestId('habit-save-button').click();

    await expect(page.getByTestId('habit-card-morning-meditation')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Daily Water');
    await page.getByTestId('habit-save-button').click();

    await expect(page.getByTestId('habit-streak-daily-water')).toHaveText('0 day streak');
    
    await page.getByTestId('habit-complete-daily-water').click();
    await expect(page.getByTestId('habit-streak-daily-water')).toHaveText('1 day streak');
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Persistent Habit');
    await page.getByTestId('habit-save-button').click();

    await page.reload();
    await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('auth-logout-button').click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/');
    // Simulate offline
    await context.setOffline(true);
    await page.reload();
    // In a real PWA, this would show the cached page. 
    // Testing SW in E2E can be tricky, but we verify basic navigation doesn't crash if cached.
    await expect(page.getByTestId('splash-screen')).toBeVisible();
  });
});
