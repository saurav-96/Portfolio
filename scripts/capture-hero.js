const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'thumbnails');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  console.log('[capture-hero] Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // High DPI context (scale 2 = 3840x2160 internally for ultra crispness)
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const targetUrl = 'https://saurav-96.github.io/Portfolio/';
  console.log(`[capture-hero] Navigating to ${targetUrl}...`);

  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000); // Allow GSAP reveals, 3D turntable, and fonts to settle

  // 1. Capture full hero section viewport (1920x1080)
  const heroViewportPath = path.join(outDir, 'hero-viewport.png');
  await page.screenshot({ path: heroViewportPath, fullPage: false });
  console.log(`  ✓ Saved hero viewport: ${heroViewportPath}`);

  // 2. Capture isolated hero container if available
  const heroSection = await page.$('section') || await page.$('main');
  if (heroSection) {
    const heroSectionPath = path.join(outDir, 'hero-section.png');
    await heroSection.screenshot({ path: heroSectionPath });
    console.log(`  ✓ Saved hero section element: ${heroSectionPath}`);
  }

  // 3. Capture 3D Profile Card / Turntable element
  const cardElement = await page.$('#hero-3d-card') || await page.$('.portrait-360-container') || await page.$('[data-tilt]');
  if (cardElement) {
    const cardPath = path.join(outDir, 'hero-3d-card.png');
    await cardElement.screenshot({ path: cardPath });
    console.log(`  ✓ Saved 3D card element: ${cardPath}`);
  }

  // 4. Capture at 1440x900 for a compact laptop mockup frame
  const laptopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const laptopPage = await laptopContext.newPage();
  await laptopPage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await laptopPage.waitForTimeout(2500);

  const laptopHeroPath = path.join(outDir, 'hero-laptop-1440.png');
  await laptopPage.screenshot({ path: laptopHeroPath, fullPage: false });
  console.log(`  ✓ Saved laptop viewport (1440x900): ${laptopHeroPath}`);

  // 5. Capture mobile hero (375x812 iPhone view)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  const mobileHeroPath = path.join(outDir, 'hero-mobile-390.png');
  await mobilePage.screenshot({ path: mobileHeroPath, fullPage: false });
  console.log(`  ✓ Saved mobile viewport: ${mobileHeroPath}`);

  await browser.close();
  console.log('[capture-hero] All real website hero section screenshots captured successfully!');
})().catch(err => {
  console.error('[capture-hero] Error:', err);
  process.exit(1);
});
