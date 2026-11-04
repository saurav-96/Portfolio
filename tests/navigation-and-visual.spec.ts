import { test, expect } from '@playwright/test';

test.describe('Saurav Bhusal Portfolio — Visual & Navigation Suite', () => {
  const waitForReady = async (page: any) => {
    // Wait for preloader to finish and page-ready class to be attached to document.body
    await page.waitForFunction(() => document.body.classList.contains('page-ready'), { timeout: 8000 }).catch(() => {});
    // Wait for Next.js App Router streaming metadata title to hydrate
    await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 8000 }).catch(() => {});
  };

  test('Home route loads successfully with Three.js canvas and preloader', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/Saurav Bhusal/);
    await expect(page.locator('#webgl-canvas')).toBeAttached();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('About route renders story, 3D card, and verified credentials', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator('#achievements')).toBeAttached();
    await page.locator('#achievements').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Harvard CS50x Certificate' })).toBeVisible();
  });

  test('Projects route supports category filtering and modal details', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/Projects Portfolio/);
    const swasthya = page.getByText('SwasthyaSutra').first();
    await swasthya.scrollIntoViewIfNeeded();
    await expect(swasthya).toBeVisible();
  });

  test('Services route displays 4 service tiers and developer console', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/Freelance Services/);
    await page.locator('#web-development').scrollIntoViewIfNeeded();
    await expect(page.locator('#web-development')).toBeVisible();
    await expect(page.locator('#ui-ux-design')).toBeVisible();
  });

  test('Contact route provides accessible form validation', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/Contact & Inquiries/);
    await page.locator('form').scrollIntoViewIfNeeded();
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#contact-name')).toBeVisible();
  });

  test('Hire route renders 3 instant fast-track channels and roadmap', async ({ page }) => {
    await page.goto('/hire', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page).toHaveTitle(/Hire Saurav Bhusal/);
    const whatsapp = page.getByText('WhatsApp Direct 1-on-1').first();
    await whatsapp.scrollIntoViewIfNeeded();
    await expect(whatsapp).toBeVisible();
  });

  test('404 route displays friendly digital space recovery', async ({ page }) => {
    await page.goto('/non-existent-random-route', { waitUntil: 'load' });
    await waitForReady(page);
    await expect(page.getByText('Lost in Digital Space')).toBeVisible();
    await expect(page.getByText('Return to Homepage')).toBeVisible();
  });
});
