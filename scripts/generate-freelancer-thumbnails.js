const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'thumbnails');
const heroLaptopB64 = fs.readFileSync(path.join(outDir, 'hero-laptop-1440.png')).toString('base64');
const heroMobileB64 = fs.readFileSync(path.join(outDir, 'hero-mobile-390.png')).toString('base64');
const hero3dCardB64 = fs.readFileSync(path.join(outDir, 'hero-3d-card.png')).toString('base64');
const heroViewportB64 = fs.readFileSync(path.join(outDir, 'hero-viewport.png')).toString('base64');

// HTML Template 1: Premium Desktop Laptop Frame + Real Hero Section + Floating Tech Badges
const htmlTemplate1 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: #030712;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    
    /* Radial ambient glows */
    .glow-cyan {
      position: absolute;
      width: 700px;
      height: 700px;
      top: -150px;
      left: 10%;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.16) 0%, transparent 70%);
      pointer-events: none;
    }
    .glow-purple {
      position: absolute;
      width: 900px;
      height: 900px;
      bottom: -200px;
      right: 5%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .grid-pattern {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, transparent 80%);
      pointer-events: none;
    }

    /* Top Bar */
    .header-bar {
      position: relative;
      z-index: 10;
      padding: 44px 72px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-logo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00f2fe, #8b5cf6, #ec4899);
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 20px;
    }
    .brand-logo-inner {
      width: 100%;
      height: 100%;
      background: #030712;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00f2fe;
      letter-spacing: -1px;
    }
    .brand-text h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      background: linear-gradient(to right, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand-text p {
      font-size: 13px;
      color: #00f2fe;
      letter-spacing: 2px;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .rating-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      padding: 10px 22px;
      border-radius: 9999px;
    }
    .stars {
      color: #fbbf24;
      font-size: 16px;
      letter-spacing: 2px;
    }
    .rating-text {
      font-size: 14px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: 0.5px;
    }

    /* Main Showcase Stage */
    .showcase-stage {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 72px;
    }

    /* Laptop Frame */
    .laptop-frame {
      width: 1220px;
      height: 720px;
      background: #0b0f19;
      border-radius: 20px 20px 4px 4px;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      box-shadow: 
        0 30px 100px -15px rgba(0, 0, 0, 0.9),
        0 0 50px -10px rgba(0, 242, 254, 0.25),
        0 0 80px -20px rgba(139, 92, 246, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      transform: translateY(-8px);
    }
    .laptop-header {
      height: 38px;
      background: #080c14;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 8px;
      position: relative;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #eab308; }
    .dot-green { background: #22c55e; }
    .laptop-url-bar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 4px 24px;
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: monospace;
    }
    .url-lock {
      color: #22c55e;
      font-size: 10px;
    }
    .laptop-screen {
      flex: 1;
      width: 100%;
      overflow: hidden;
      background: #030712;
      position: relative;
    }
    .laptop-screen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    /* Floating Badges */
    .floating-card-left {
      position: absolute;
      left: 60px;
      top: 50%;
      transform: translateY(-50%);
      width: 250px;
      background: rgba(11, 15, 25, 0.85);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      z-index: 20;
    }
    .floating-card-left h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #00f2fe;
      margin-bottom: 12px;
      font-weight: 700;
    }
    .pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .pill:last-child { margin-bottom: 0; }
    .dot-badge {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .floating-card-right {
      position: absolute;
      right: 60px;
      top: 50%;
      transform: translateY(-50%);
      width: 250px;
      background: rgba(11, 15, 25, 0.85);
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      z-index: 20;
    }
    .floating-card-right h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #a855f7;
      margin-bottom: 12px;
      font-weight: 700;
    }

    /* Bottom Banner */
    .bottom-bar {
      position: relative;
      z-index: 10;
      padding: 0 72px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cta-text {
      font-size: 18px;
      font-weight: 700;
      color: #e2e8f0;
      letter-spacing: -0.2px;
    }
    .cta-highlight {
      background: linear-gradient(90deg, #00f2fe, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 800;
    }
    .platforms {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .platform-badge {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="glow-cyan"></div>
  <div class="glow-purple"></div>
  <div class="grid-pattern"></div>

  <!-- Header Bar -->
  <header class="header-bar">
    <div class="brand-title">
      <div class="brand-logo">
        <div class="brand-logo-inner">SB</div>
      </div>
      <div class="brand-text">
        <h1>Saurav Bhusal</h1>
        <p>3D Web Developer & UI/UX Designer</p>
      </div>
    </div>
    <div class="rating-badge">
      <span class="stars">★★★★★</span>
      <span class="rating-text">TOP-RATED FREELANCER • 100% SUCCESS</span>
    </div>
  </header>

  <!-- Central Showcase Stage with REAL HERO SECTION -->
  <main class="showcase-stage">
    <!-- Left Feature Badges -->
    <div class="floating-card-left">
      <h3>Core Expertise</h3>
      <div class="pill">
        <span class="dot-badge" style="background: #00f2fe;"></span>
        <span>Three.js & WebGL 3D</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #3b82f6;"></span>
        <span>React 19 & Next.js</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #a855f7;"></span>
        <span>GSAP Cinematic Motion</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #ec4899;"></span>
        <span>Figma UI/UX Systems</span>
      </div>
    </div>

    <!-- The Realistic Laptop Frame with Saurav's ACTUAL Hero Section -->
    <div class="laptop-frame">
      <div class="laptop-header">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
        <div class="laptop-url-bar">
          <span class="url-lock">🔒</span>
          <span>saurav-96.github.io/Portfolio</span>
        </div>
      </div>
      <div class="laptop-screen">
        <img src="data:image/png;base64,${heroLaptopB64}" alt="Saurav Bhusal Real Website Hero Section" />
      </div>
    </div>

    <!-- Right Feature Badges -->
    <div class="floating-card-right">
      <h3>Deliverables</h3>
      <div class="pill">
        <span class="dot-badge" style="background: #10b981;"></span>
        <span>100% Responsive Design</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #06b6d4;"></span>
        <span>60FPS Smooth Scroll</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #8b5cf6;"></span>
        <span>Clean Scalable Code</span>
      </div>
      <div class="pill">
        <span class="dot-badge" style="background: #f59e0b;"></span>
        <span>Fast Turnaround</span>
      </div>
    </div>
  </main>

  <!-- Bottom Bar -->
  <footer class="bottom-bar">
    <div class="cta-text">
      Need a High-Converting Website? <span class="cta-highlight">Let's Build It Together.</span>
    </div>
    <div class="platforms">
      <span class="platform-badge" style="color: #60a5fa; border-color: rgba(96,165,250,0.3);">UPWORK</span>
      <span class="platform-badge" style="color: #34d399; border-color: rgba(52,211,153,0.3);">FIVERR</span>
      <span class="platform-badge" style="color: #38bdf8; border-color: rgba(56,189,248,0.3);">FREELANCER</span>
      <span class="platform-badge" style="color: #c084fc; border-color: rgba(192,132,252,0.3);">REMOTE READY</span>
    </div>
  </footer>
</body>
</html>
`;

// HTML Template 2: Multi-Device Responsive Split Showcase (Real Laptop + Real Mobile iPhone + 3D Portrait Card)
const htmlTemplate2 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 30%, #0d1527 0%, #030712 70%);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    
    .glow-cyan {
      position: absolute;
      width: 800px;
      height: 800px;
      top: -100px;
      right: 15%;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 65%);
      pointer-events: none;
    }
    .glow-purple {
      position: absolute;
      width: 800px;
      height: 800px;
      bottom: -150px;
      left: 10%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 65%);
      pointer-events: none;
    }

    /* Top Bar */
    .header-bar {
      position: relative;
      z-index: 10;
      padding: 38px 72px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .hero-heading h1 {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -1px;
      line-height: 1.1;
    }
    .hero-heading h1 span {
      background: linear-gradient(90deg, #00f2fe, #a855f7, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-heading p {
      font-size: 14px;
      color: #94a3b8;
      margin-top: 6px;
      letter-spacing: 0.5px;
    }

    .hire-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      color: #34d399;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
    }

    /* Stage */
    .stage {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 72px;
      gap: 32px;
    }

    /* Laptop Frame Main */
    .laptop-frame {
      width: 1080px;
      height: 640px;
      background: #080c14;
      border-radius: 18px 18px 4px 4px;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 35px 80px -10px rgba(0, 0, 0, 0.8), 0 0 60px -15px rgba(0, 242, 254, 0.25);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .browser-header {
      height: 34px;
      background: #04070d;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      padding: 0 14px;
      gap: 6px;
      position: relative;
    }
    .b-dot { width: 9px; height: 9px; border-radius: 50%; }
    .b-red { background: #ef4444; }
    .b-yellow { background: #eab308; }
    .b-green { background: #22c55e; }
    .b-url {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
    }
    .laptop-img {
      flex: 1;
      width: 100%;
      object-fit: cover;
      object-position: top center;
    }

    /* Mobile iPhone Mockup */
    .mobile-frame {
      width: 290px;
      height: 600px;
      background: #000;
      border-radius: 42px;
      border: 4px solid #1e293b;
      box-shadow: 
        0 30px 70px -10px rgba(0, 0, 0, 0.9),
        0 0 40px -10px rgba(168, 85, 247, 0.35);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      margin-left: -20px;
      transform: translateY(20px);
      z-index: 25;
    }
    .notch {
      width: 90px;
      height: 18px;
      background: #1e293b;
      border-radius: 0 0 12px 12px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 30;
    }
    .mobile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    /* 3D Profile Card Cutout Preview */
    .profile-card-preview {
      width: 280px;
      height: 380px;
      border-radius: 20px;
      border: 1px solid rgba(0, 242, 254, 0.35);
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0,242,254,0.2);
      overflow: hidden;
      position: absolute;
      left: 72px;
      bottom: 120px;
      z-index: 30;
      background: rgba(3, 7, 18, 0.9);
      backdrop-filter: blur(16px);
      display: flex;
      flex-direction: column;
    }
    .profile-card-header {
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11px;
      font-weight: 700;
      color: #00f2fe;
      letter-spacing: 1px;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .profile-card-img {
      flex: 1;
      width: 100%;
      object-fit: contain;
      background: #030712;
      padding: 8px;
    }

    /* Bottom Footer */
    .bottom-bar {
      position: relative;
      z-index: 10;
      padding: 0 72px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tags {
      display: flex;
      gap: 12px;
    }
    .tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .freelance-cred {
      font-size: 14px;
      color: #94a3b8;
      font-weight: 600;
    }
    .freelance-cred b {
      color: #f8fafc;
    }
  </style>
</head>
<body>
  <div class="glow-cyan"></div>
  <div class="glow-purple"></div>

  <!-- Header -->
  <header class="header-bar">
    <div class="hero-heading">
      <h1>Saurav Bhusal — <span>3D Interactive & Full-Stack Developer</span></h1>
      <p>Real-World Production Websites • 3D WebGL Experiences • High-Performance Web Apps</p>
    </div>
    <div class="hire-pill">
      <span class="pulse-dot"></span>
      <span>AVAILABLE FOR HIRE NOW</span>
    </div>
  </header>

  <!-- Multi-Device Stage with SAURAV'S ACTUAL SITE PICTURES -->
  <main class="stage">
    <!-- Desktop Laptop Mockup -->
    <div class="laptop-frame">
      <div class="browser-header">
        <div class="b-dot b-red"></div>
        <div class="b-dot b-yellow"></div>
        <div class="b-dot b-green"></div>
        <div class="b-url">https://www.saurav-bhusal.com.np</div>
      </div>
      <img class="laptop-img" src="data:image/png;base64,${heroLaptopB64}" alt="Saurav's Real Laptop Hero" />
    </div>

    <!-- Mobile iPhone Mockup with SAURAV'S REAL MOBILE HERO -->
    <div class="mobile-frame">
      <div class="notch"></div>
      <img class="mobile-img" src="data:image/png;base64,${heroMobileB64}" alt="Saurav's Real Mobile Hero" />
    </div>

    <!-- 3D Turntable / Profile Card Highlight -->
    <div class="profile-card-preview">
      <div class="profile-card-header">
        <span>3D Interactive Turntable</span>
        <span style="color: #4ade80; font-size: 9px;">● 360° TURNTABLE</span>
      </div>
      <img class="profile-card-img" src="data:image/png;base64,${hero3dCardB64}" alt="Saurav's Real 3D Card" />
    </div>
  </main>

  <!-- Bottom Details -->
  <footer class="bottom-bar">
    <div class="tags">
      <span class="tag">⚡ Next.js 15 App Router</span>
      <span class="tag">🎨 Three.js 3D & GSAP</span>
      <span class="tag">📱 100% Mobile Responsive</span>
      <span class="tag">💎 Figma Design to Code</span>
    </div>
    <div class="freelance-cred">
      Top Freelance Portfolio Showcase • <b>Upwork | Fiverr | Direct Contracts</b>
    </div>
  </footer>
</body>
</html>
`;

(async () => {
  console.log('[generate-thumbnails] Launching renderer...');
  const browser = await chromium.launch({ headless: true });
  
  // Render Template 1 (1920x1080)
  const page1 = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page1.setContent(htmlTemplate1, { waitUntil: 'load' });
  await page1.waitForTimeout(500);

  const thumb1Path = path.join(outDir, 'freelance-thumbnail-desktop-hero.png');
  await page1.screenshot({ path: thumb1Path });
  console.log(`  ✓ Generated Thumbnail 1: ${thumb1Path}`);

  // Also save a 1280x720 version for Upwork / Fiverr upload
  const thumb1FiverrPath = path.join(outDir, 'freelance-thumbnail-desktop-hero-1280.png');
  const page1Small = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page1Small.setContent(htmlTemplate1, { waitUntil: 'load' });
  // We can scale it or take screenshot
  await page1.screenshot({ path: thumb1FiverrPath });

  // Render Template 2 (Multi-device split showcase)
  const page2 = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page2.setContent(htmlTemplate2, { waitUntil: 'load' });
  await page2.waitForTimeout(500);

  const thumb2Path = path.join(outDir, 'freelance-thumbnail-multidevice-hero.png');
  await page2.screenshot({ path: thumb2Path });
  console.log(`  ✓ Generated Thumbnail 2: ${thumb2Path}`);

  // Copy both into public/assets/images for direct website/repo hosting
  const destDir = path.join(__dirname, '..', 'public', 'assets', 'images');
  fs.copyFileSync(thumb1Path, path.join(destDir, 'saurav-hero-thumbnail-laptop.png'));
  fs.copyFileSync(thumb2Path, path.join(destDir, 'saurav-hero-thumbnail-multidevice.png'));
  console.log('  ✓ Copied thumbnails to public/assets/images/');

  await browser.close();
  console.log('[generate-thumbnails] Completed successfully!');
})().catch(err => {
  console.error('[generate-thumbnails] Error:', err);
  process.exit(1);
});
