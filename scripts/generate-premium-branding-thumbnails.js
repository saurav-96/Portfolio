const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'thumbnails');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Read assets as base64
const cutoutPath = path.join(rootDir, 'public', 'assets', 'images', 'saurav-cutout.png');
const avatarPath = path.join(rootDir, 'public', 'assets', 'images', 'saurav-avatar-logo.jpg');
const cutoutB64 = fs.existsSync(cutoutPath) ? fs.readFileSync(cutoutPath).toString('base64') : '';
const avatarB64 = fs.existsSync(avatarPath) ? fs.readFileSync(avatarPath).toString('base64') : '';

// Common SVGs for geometric wireframes & tech icons
const wireframeConstellationSvg = `
<svg class="wireframe-constellation" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Dodecahedron / Polyhedron Lines -->
  <polygon points="250,40 430,140 430,360 250,460 70,360 70,140" stroke="rgba(34, 211, 238, 0.28)" stroke-width="1.2" stroke-dasharray="4 3" />
  <polygon points="250,90 390,170 390,330 250,410 110,330 110,170" stroke="rgba(168, 85, 247, 0.35)" stroke-width="1" />
  <!-- Internal connecting nodes -->
  <line x1="250" y1="40" x2="250" y2="460" stroke="rgba(34, 211, 238, 0.15)" stroke-width="0.8" />
  <line x1="70" y1="140" x2="430" y2="360" stroke="rgba(168, 85, 247, 0.15)" stroke-width="0.8" />
  <line x1="70" y1="360" x2="430" y2="140" stroke="rgba(34, 211, 238, 0.15)" stroke-width="0.8" />
  <!-- Glowing vertex points -->
  <circle cx="250" cy="40" r="3" fill="#22D3EE" filter="drop-shadow(0 0 6px #22D3EE)" />
  <circle cx="430" cy="140" r="3" fill="#A855F7" filter="drop-shadow(0 0 6px #A855F7)" />
  <circle cx="430" cy="360" r="3" fill="#22D3EE" filter="drop-shadow(0 0 6px #22D3EE)" />
  <circle cx="250" cy="460" r="3" fill="#E879F9" filter="drop-shadow(0 0 6px #E879F9)" />
  <circle cx="70" cy="360" r="3" fill="#38BDF8" filter="drop-shadow(0 0 6px #38BDF8)" />
  <circle cx="70" cy="140" r="3" fill="#A855F7" filter="drop-shadow(0 0 6px #A855F7)" />
  <circle cx="250" cy="250" r="2.5" fill="#22D3EE" />
</svg>
`;

/* =========================================================================
   TEMPLATE 1: UPWORK THUMBNAIL (1000 x 750 px, 4:3)
   Clean, Elite, High-Trust Web Dev & UI/UX Showcase for Upwork Project Catalog
   ========================================================================= */
const upworkHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1000px;
      height: 750px;
      overflow: hidden;
      background-color: #06060B;
      color: #F8FAFC;
      font-family: 'Inter', -apple-system, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 44px 52px;
    }

    /* Ambient Atmosphere */
    .aurora-cyan {
      position: absolute;
      top: -120px;
      left: 15%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(79, 70, 229, 0.10) 50%, transparent 72%);
      pointer-events: none;
      filter: blur(40px);
    }
    .aurora-purple {
      position: absolute;
      top: 10%;
      right: -80px;
      width: 650px;
      height: 650px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(124, 58, 237, 0.16) 45%, transparent 70%);
      pointer-events: none;
      filter: blur(50px);
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 50px 50px;
      mask-image: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.8) 30%, transparent 85%);
      pointer-events: none;
    }

    /* Top Branding Row */
    .top-row {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-id {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1.5px solid #22D3EE;
      box-shadow: 0 0 14px rgba(34, 211, 238, 0.45);
      object-fit: cover;
    }
    .brand-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 19px;
      letter-spacing: 0.5px;
      color: #fff;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 16px;
      border-radius: 9999px;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(6, 182, 212, 0.14));
      border: 1px solid rgba(168, 85, 247, 0.45);
      box-shadow: 0 4px 18px rgba(124, 58, 237, 0.25);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #F3E8FF;
    }
    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22D3EE;
      box-shadow: 0 0 8px #22D3EE;
    }

    /* Main Content Layout (4:3 ratio) */
    .main-body {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 520px;
    }

    /* Left Copy Column */
    .left-col {
      width: 530px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #22D3EE;
      text-transform: uppercase;
    }
    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 46px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: #FFFFFF;
    }
    .text-gradient {
      background: linear-gradient(135deg, #E879F9 0%, #A855F7 38%, #38BDF8 74%, #22D3EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtext {
      font-size: 16px;
      line-height: 1.55;
      color: #CBD5E1;
      max-width: 480px;
      font-weight: 400;
    }

    /* Core Stack Pill Strip */
    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }
    .tech-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 13px;
      font-weight: 600;
      color: #E2E8F0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .dot-cyan { width: 6px; height: 6px; border-radius: 50%; background: #06B6D4; }
    .dot-purple { width: 6px; height: 6px; border-radius: 50%; background: #A855F7; }
    .dot-pink { width: 6px; height: 6px; border-radius: 50%; background: #EC4899; }
    .dot-green { width: 6px; height: 6px; border-radius: 50%; background: #10B981; }

    /* Right Portrait Stage */
    .right-col {
      position: relative;
      width: 400px;
      height: 520px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .portrait-aura-glow {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, rgba(6, 182, 212, 0.45) 0%, rgba(168, 85, 247, 0.48) 50%, transparent 74%);
      filter: blur(32px);
      z-index: 1;
    }

    .wireframe-svg-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 390px;
      height: 390px;
      z-index: 2;
      opacity: 0.75;
      pointer-events: none;
    }

    .tilted-neon-ring {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%) rotateX(72deg) rotateZ(16deg);
      width: 360px;
      height: 360px;
      border-radius: 50%;
      border: 3px solid transparent;
      background: linear-gradient(135deg, #22D3EE, #A855F7, #EC4899, transparent 75%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      box-shadow: 0 0 24px rgba(34, 211, 238, 0.45);
      z-index: 4;
      pointer-events: none;
    }

    .portrait-cutout {
      position: relative;
      z-index: 3;
      height: 500px;
      max-width: 100%;
      object-fit: contain;
      filter: drop-shadow(0 18px 35px rgba(0, 0, 0, 0.85));
    }

    /* Floating Glass Badge over Portrait */
    .floating-proof-badge {
      position: absolute;
      bottom: 24px;
      left: 8px;
      z-index: 6;
      background: rgba(12, 13, 23, 0.88);
      border: 1px solid rgba(34, 211, 238, 0.4);
      backdrop-filter: blur(16px);
      padding: 9px 16px;
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .proof-icon {
      font-size: 16px;
    }
    .proof-text-top {
      font-size: 11px;
      font-weight: 700;
      color: #22D3EE;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .proof-text-bot {
      font-size: 10px;
      color: #94A3B8;
      font-weight: 500;
    }

    /* Bottom Trust Bar */
    .bottom-row {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 16px;
    }
    .status-hire {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 13px;
      color: #94A3B8;
      font-weight: 500;
    }
    .live-dot {
      position: relative;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
    }
    .status-strong {
      color: #F8FAFC;
      font-weight: 600;
    }
    .upwork-reputation {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .stars {
      color: #FBBF24;
      font-size: 14px;
      letter-spacing: 2px;
    }
    .reputation-text {
      font-size: 12px;
      font-weight: 700;
      color: #E2E8F0;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="aurora-cyan"></div>
  <div class="aurora-purple"></div>
  <div class="grid-overlay"></div>

  <!-- Top Bar -->
  <header class="top-row">
    <div class="brand-id">
      <img class="brand-avatar" src="data:image/jpeg;base64,${avatarB64}" alt="Saurav Bhusal" />
      <span class="brand-title">SAURAV BHUSAL</span>
    </div>
    <div class="badge-pill">
      <span class="badge-dot"></span>
      <span>UPWORK VERIFIED • TOP FREELANCER</span>
    </div>
  </header>

  <!-- Main Body -->
  <main class="main-body">
    <!-- Left Pitch -->
    <div class="left-col">
      <div class="eyebrow">
        <span>●</span>
        <span>DESIGN • DEVELOP • INNOVATE</span>
      </div>
      
      <h1 class="headline">
        Modern Web Dev<br>
        &amp; <span class="text-gradient">Impactful UI/UX</span>
      </h1>
      
      <p class="subtext">
        Building high-converting digital products, interactive 3D WebGL experiences, and robust React / Next.js web applications.
      </p>

      <div class="tech-stack-row">
        <span class="tech-pill"><span class="dot-cyan"></span>Next.js 15 &amp; React</span>
        <span class="tech-pill"><span class="dot-purple"></span>Three.js / WebGL</span>
        <span class="tech-pill"><span class="dot-pink"></span>Figma UI/UX</span>
        <span class="tech-pill"><span class="dot-green"></span>Tailwind CSS</span>
      </div>
    </div>

    <!-- Right Portrait Stage -->
    <div class="right-col">
      <div class="portrait-aura-glow"></div>
      <div class="wireframe-svg-wrap">
        ${wireframeConstellationSvg}
      </div>
      <div class="tilted-neon-ring"></div>
      <img class="portrait-cutout" src="data:image/png;base64,${cutoutB64}" alt="Saurav Bhusal" />
      
      <div class="floating-proof-badge">
        <span class="proof-icon">⚡</span>
        <div>
          <div class="proof-text-top">100% Responsive</div>
          <div class="proof-text-bot">60FPS Smooth Motion</div>
        </div>
      </div>
    </div>
  </main>

  <!-- Bottom Proof Bar -->
  <footer class="bottom-row">
    <div class="status-hire">
      <span class="live-dot"></span>
      <span>Available for Remote Projects &amp; <span class="status-strong">Global Contracts</span></span>
    </div>
    <div class="upwork-reputation">
      <span class="stars">★★★★★</span>
      <span class="reputation-text">HARVARD CS50x CERTIFIED</span>
    </div>
  </footer>
</body>
</html>
`;

/* =========================================================================
   TEMPLATE 2: FREELANCER.COM THUMBNAIL (1200 x 900 px, 4:3)
   Vibrant, Eye-Catching, High-Converting Full-Stack Web Development Offer
   ========================================================================= */
const freelancerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 900px;
      overflow: hidden;
      background: radial-gradient(circle at 60% 40%, #0c0d1e 0%, #06060B 70%);
      color: #F8FAFC;
      font-family: 'Inter', -apple-system, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 52px 64px;
    }

    /* Ambient Lighting */
    .aurora-cyan {
      position: absolute;
      top: -100px;
      left: 10%;
      width: 750px;
      height: 750px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(79, 70, 229, 0.12) 50%, transparent 70%);
      pointer-events: none;
      filter: blur(55px);
    }
    .aurora-purple {
      position: absolute;
      bottom: -150px;
      right: 0%;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(124, 58, 237, 0.18) 45%, transparent 72%);
      pointer-events: none;
      filter: blur(60px);
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.85) 35%, transparent 88%);
      pointer-events: none;
    }

    /* Header */
    .header-bar {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-logo-disc {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #22D3EE, #A855F7, #EC4899);
      padding: 2px;
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
    }
    .brand-logo-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .brand-name-box h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #fff;
    }
    .brand-name-box p {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #22D3EE;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .badge-hire {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 9px 20px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34D399;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
    }

    /* Main Showcase (4:3) */
    .stage {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 610px;
    }

    /* Left Pitch */
    .left-side {
      width: 630px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .eyebrow-pill {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.12));
      border: 1px solid rgba(168, 85, 247, 0.45);
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #F3E8FF;
      text-transform: uppercase;
    }
    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 54px;
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.035em;
      color: #FFFFFF;
    }
    .text-gradient {
      background: linear-gradient(135deg, #E879F9 0%, #A855F7 38%, #38BDF8 74%, #22D3EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtext {
      font-size: 18px;
      line-height: 1.6;
      color: #CBD5E1;
      max-width: 580px;
    }

    /* 3 Feature Offering Glass Cards */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 4px;
    }
    .feat-card {
      background: rgba(12, 13, 23, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      backdrop-filter: blur(12px);
    }
    .feat-card-cyan { border-color: rgba(6, 182, 212, 0.35); }
    .feat-card-purple { border-color: rgba(168, 85, 247, 0.35); }
    .feat-card-pink { border-color: rgba(236, 72, 153, 0.35); }
    
    .feat-header {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .feat-card-cyan .feat-header { color: #22D3EE; }
    .feat-card-purple .feat-header { color: #C084FC; }
    .feat-card-pink .feat-header { color: #F472B6; }

    .feat-desc {
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.4;
    }

    /* Right Portrait Stage */
    .right-stage {
      position: relative;
      width: 470px;
      height: 610px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .aura-stage-glow {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 440px;
      height: 440px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, rgba(6, 182, 212, 0.48) 0%, rgba(168, 85, 247, 0.5) 48%, transparent 74%);
      filter: blur(36px);
      z-index: 1;
    }
    .wireframe-stage-wrap {
      position: absolute;
      top: 46%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 450px;
      z-index: 2;
      opacity: 0.8;
      pointer-events: none;
    }
    .orbit-ring {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%) rotateX(72deg) rotateZ(18deg);
      width: 430px;
      height: 430px;
      border-radius: 50%;
      border: 3.5px solid transparent;
      background: linear-gradient(135deg, #22D3EE, #A855F7, #EC4899, transparent 75%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      box-shadow: 0 0 28px rgba(34, 211, 238, 0.5);
      z-index: 4;
      pointer-events: none;
    }
    .portrait-image {
      position: relative;
      z-index: 3;
      height: 580px;
      max-width: 100%;
      object-fit: contain;
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9));
    }

    .badge-turntable {
      position: absolute;
      bottom: 28px;
      left: 20px;
      z-index: 6;
      background: rgba(12, 13, 23, 0.9);
      border: 1px solid rgba(168, 85, 247, 0.45);
      border-radius: 12px;
      padding: 10px 18px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .turntable-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #A855F7;
      box-shadow: 0 0 8px #A855F7;
    }
    .tt-title {
      font-size: 12px;
      font-weight: 700;
      color: #fff;
    }
    .tt-sub {
      font-size: 10px;
      color: #22D3EE;
      font-family: 'JetBrains Mono', monospace;
    }

    /* Bottom Row */
    .bottom-row {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 20px;
    }
    .credentials-pills {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .cred-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #CBD5E1;
      font-weight: 600;
    }
    .cred-icon {
      color: #22D3EE;
    }
    .action-cta {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: -0.2px;
    }
    .action-cta span {
      color: #38BDF8;
    }
  </style>
</head>
<body>
  <div class="aurora-cyan"></div>
  <div class="aurora-purple"></div>
  <div class="grid-overlay"></div>

  <!-- Header -->
  <header class="header-bar">
    <div class="brand-group">
      <div class="brand-logo-disc">
        <img class="brand-logo-img" src="data:image/jpeg;base64,${avatarB64}" alt="Saurav Bhusal" />
      </div>
      <div class="brand-name-box">
        <h2>SAURAV BHUSAL</h2>
        <p>Full-Stack &amp; 3D Creative Engineer</p>
      </div>
    </div>
    <div class="badge-hire">
      <span class="pulse-dot"></span>
      <span>AVAILABLE FOR DIRECT HIRE</span>
    </div>
  </header>

  <!-- Stage -->
  <main class="stage">
    <!-- Left Column -->
    <div class="left-side">
      <div class="eyebrow-pill">
        <span>●</span>
        <span>HIGH-CONVERTING DIGITAL PRODUCTS</span>
      </div>

      <h1 class="headline">
        Creative Frontend<br>
        &amp; <span class="text-gradient">3D Web Developer</span>
      </h1>

      <p class="subtext">
        Delivering modern web architecture, responsive UI/UX systems, and immersive WebGL experiences that captivate clients and boost conversion.
      </p>

      <div class="features-grid">
        <div class="feat-card feat-card-cyan">
          <div class="feat-header">React &amp; Next.js</div>
          <div class="feat-desc">Scalable, high-speed modern frontend applications.</div>
        </div>
        <div class="feat-card feat-card-purple">
          <div class="feat-header">Three.js &amp; 3D</div>
          <div class="feat-desc">Interactive WebGL scenes &amp; 60FPS fluid motion.</div>
        </div>
        <div class="feat-card feat-card-pink">
          <div class="feat-header">Figma to Code</div>
          <div class="feat-desc">Pixel-perfect translation with clean architecture.</div>
        </div>
      </div>
    </div>

    <!-- Right Column (Portrait) -->
    <div class="right-stage">
      <div class="aura-stage-glow"></div>
      <div class="wireframe-stage-wrap">
        ${wireframeConstellationSvg}
      </div>
      <div class="orbit-ring"></div>
      <img class="portrait-image" src="data:image/png;base64,${cutoutB64}" alt="Saurav Bhusal" />

      <div class="badge-turntable">
        <span class="turntable-dot"></span>
        <div>
          <div class="tt-title">Hackathon Runner-Up</div>
          <div class="tt-sub">7+ LIVE SHIPPED PROJECTS</div>
        </div>
      </div>
    </div>
  </main>

  <!-- Bottom Details -->
  <footer class="bottom-row">
    <div class="credentials-pills">
      <div class="cred-item">
        <span class="cred-icon">✓</span>
        <span>Clean Scalable Code</span>
      </div>
      <div class="cred-item">
        <span class="cred-icon">✓</span>
        <span>100% Mobile Responsive</span>
      </div>
      <div class="cred-item">
        <span class="cred-icon">✓</span>
        <span>Fast Turnaround</span>
      </div>
    </div>
    <div class="action-cta">
      Ready to elevate your project? <span>Let's talk →</span>
    </div>
  </footer>
</body>
</html>
`;

/* =========================================================================
   TEMPLATE 3: GENERAL WIDE PORTFOLIO THUMBNAIL (1920 x 1080 px, 16:9)
   Cinematic, Editorial Personal Branding Showcase (LinkedIn, Web, Media)
   ========================================================================= */
const wideHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background-color: #06060B;
      color: #F8FAFC;
      font-family: 'Inter', -apple-system, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 84px;
    }

    /* Ambient Auroras */
    .aurora-cyan {
      position: absolute;
      top: -150px;
      left: 12%;
      width: 950px;
      height: 950px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(79, 70, 229, 0.12) 50%, transparent 74%);
      pointer-events: none;
      filter: blur(70px);
    }
    .aurora-purple {
      position: absolute;
      top: 5%;
      right: 2%;
      width: 1050px;
      height: 1050px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(124, 58, 237, 0.18) 48%, transparent 72%);
      pointer-events: none;
      filter: blur(75px);
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.032) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.032) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.9) 35%, transparent 90%);
      pointer-events: none;
    }

    /* Top Navigation Bar mimicking saurav-bhusal.com */
    .site-nav {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .nav-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid #22D3EE;
      box-shadow: 0 0 16px rgba(34, 211, 238, 0.45);
      object-fit: cover;
    }
    .nav-brand-text {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 20px;
      letter-spacing: -0.5px;
      color: #fff;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      background: rgba(12, 13, 23, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px 28px;
      border-radius: 9999px;
      backdrop-filter: blur(16px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    .nav-item {
      font-size: 14px;
      font-weight: 600;
      color: #94A3B8;
      letter-spacing: 0.2px;
    }
    .nav-item-active {
      color: #22D3EE;
      background: rgba(6, 182, 212, 0.14);
      padding: 4px 14px;
      border-radius: 9999px;
      border: 1px solid rgba(6, 182, 212, 0.35);
    }
    .nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #7C3AED, #A855F7);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 8px 24px rgba(124, 58, 237, 0.4);
    }

    /* Main Cinematic Section (16:9) */
    .hero-split {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 720px;
    }

    /* Left Editorial Content */
    .left-editorial {
      width: 980px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .eyebrow-container {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 7px 18px;
      border-radius: 9999px;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(6, 182, 212, 0.1));
      border: 1px solid rgba(168, 85, 247, 0.42);
      box-shadow: 0 8px 24px -6px rgba(124, 58, 237, 0.35);
      align-self: flex-start;
    }
    .eyebrow-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22D3EE;
      box-shadow: 0 0 10px #22D3EE;
    }
    .eyebrow-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: #F3E8FF;
      text-transform: uppercase;
    }

    .main-heading {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 64px;
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.035em;
      color: #FFFFFF;
    }
    .text-gradient {
      background: linear-gradient(135deg, #E879F9 0%, #A855F7 38%, #38BDF8 74%, #22D3EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .editorial-p {
      font-size: 20px;
      line-height: 1.6;
      color: #CBD5E1;
      max-width: 860px;
      font-weight: 400;
    }

    /* Action Buttons Row */
    .button-group {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 4px;
    }
    .btn-main {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 30px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #7C3AED, #A855F7);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 12px 30px rgba(124, 58, 237, 0.45);
    }
    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #E2E8F0;
      font-weight: 600;
      font-size: 15px;
      backdrop-filter: blur(12px);
    }

    /* Availability */
    .availability-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #94A3B8;
      font-weight: 500;
      margin-top: -6px;
    }
    .avail-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 12px #10B981;
    }

    /* Right Portrait Hero Stage */
    .right-portrait-stage {
      position: relative;
      width: 680px;
      height: 720px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .hero-glow-aura {
      position: absolute;
      top: 44%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 580px;
      height: 580px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 35%, rgba(6, 182, 212, 0.48) 0%, rgba(168, 85, 247, 0.52) 50%, transparent 74%);
      filter: blur(45px);
      z-index: 1;
    }
    .hero-wireframe-wrap {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      z-index: 2;
      opacity: 0.85;
      pointer-events: none;
    }
    .hero-neon-orbit {
      position: absolute;
      bottom: 95px;
      left: 50%;
      transform: translateX(-50%) rotateX(72deg) rotateZ(18deg);
      width: 520px;
      height: 520px;
      border-radius: 50%;
      border: 3.5px solid transparent;
      background: linear-gradient(135deg, #22D3EE, #A855F7, #EC4899, transparent 75%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      box-shadow: 0 0 35px rgba(34, 211, 238, 0.5);
      z-index: 4;
      pointer-events: none;
    }
    .hero-portrait-img {
      position: relative;
      z-index: 3;
      height: 690px;
      max-width: 100%;
      object-fit: contain;
      filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95));
    }

    /* 3D Turntable Control Badge under portrait */
    .turntable-badge-bar {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 6;
      background: rgba(12, 13, 23, 0.9);
      border: 1px solid rgba(34, 211, 238, 0.4);
      border-radius: 9999px;
      padding: 9px 24px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(18px);
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 12px;
      font-weight: 600;
      color: #E2E8F0;
      white-space: nowrap;
    }
    .tt-live {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #22D3EE;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
    }

    /* Bottom Credibility Cards Strip */
    .credibility-strip {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .cred-card {
      background: rgba(12, 13, 23, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(14px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .cred-card:hover {
      border-color: rgba(34, 211, 238, 0.4);
    }
    .card-left h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #fff;
    }
    .card-left p {
      font-size: 12px;
      color: #94A3B8;
      margin-top: 2px;
    }
    .card-arrow {
      color: #22D3EE;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="aurora-cyan"></div>
  <div class="aurora-purple"></div>
  <div class="grid-overlay"></div>

  <!-- Top Navigation Bar -->
  <nav class="site-nav">
    <div class="nav-brand">
      <img class="nav-avatar" src="data:image/jpeg;base64,${avatarB64}" alt="Saurav Bhusal" />
      <span class="nav-brand-text">SAURAV.</span>
    </div>
    <div class="nav-links">
      <span class="nav-item nav-item-active">Home</span>
      <span class="nav-item">About</span>
      <span class="nav-item">Projects</span>
      <span class="nav-item">Services</span>
      <span class="nav-item">Contact</span>
    </div>
    <div class="nav-cta">
      <span>Hire Me</span>
      <span>↗</span>
    </div>
  </nav>

  <!-- Main Hero Split (16:9) -->
  <main class="hero-split">
    <!-- Left Column -->
    <div class="left-editorial">
      <div class="eyebrow-container">
        <span class="eyebrow-dot"></span>
        <span class="eyebrow-text">DESIGN • DEVELOP • INNOVATE</span>
      </div>

      <h1 class="main-heading">
        Hi, I'm Saurav Bhusal.<br>
        I turn ideas into <span class="text-gradient">intuitive,</span><br>
        <span class="text-gradient">impactful</span> digital experiences.
      </h1>

      <p class="editorial-p">
        I design and develop modern digital products, combining thoughtful UI/UX, creative frontend engineering, and emerging AI technologies.
      </p>

      <div class="button-group">
        <div class="btn-main">
          <span>Explore My Work</span>
          <span>→</span>
        </div>
        <div class="btn-outline">
          <span>Let's Work Together</span>
          <span>↗</span>
        </div>
      </div>

      <div class="availability-row">
        <span class="avail-dot"></span>
        <span>Available for remote freelance projects &amp; international collaborations</span>
      </div>
    </div>

    <!-- Right Column (Studio Portrait Stage) -->
    <div class="right-portrait-stage">
      <div class="hero-glow-aura"></div>
      <div class="hero-wireframe-wrap">
        ${wireframeConstellationSvg}
      </div>
      <div class="hero-neon-orbit"></div>
      <img class="hero-portrait-img" src="data:image/png;base64,${cutoutB64}" alt="Saurav Bhusal" />

      <div class="turntable-badge-bar">
        <span class="tt-live">● 3D INTERACTIVE</span>
        <span>Drag to Rotate 360° • saurav-bhusal.com</span>
      </div>
    </div>
  </main>

  <!-- Bottom Credibility Cards Strip -->
  <footer class="credibility-strip">
    <div class="cred-card">
      <div class="card-left">
        <h4>7+ Live &amp; Lab Projects</h4>
        <p>Web Apps, MV3 &amp; UI/UX</p>
      </div>
      <span class="card-arrow">↗</span>
    </div>
    <div class="cred-card">
      <div class="card-left">
        <h4>1st Runner-Up</h4>
        <p>Web Design Hackathon 2026</p>
      </div>
      <span class="card-arrow">↗</span>
    </div>
    <div class="cred-card">
      <div class="card-left">
        <h4>6 Verified Credentials</h4>
        <p>Harvard CS50x &amp; freeCodeCamp</p>
      </div>
      <span class="card-arrow">↗</span>
    </div>
    <div class="cred-card">
      <div class="card-left">
        <h4>Global Freelancer</h4>
        <p>Upwork, Fiverr &amp; Freelancer</p>
      </div>
      <span class="card-arrow">↗</span>
    </div>
  </footer>
</body>
</html>
`;

(async () => {
  console.log('[branding-thumbnails] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });

  // 1. Render Upwork Thumbnail (1000 x 750 px, 4:3)
  console.log('[branding-thumbnails] Generating Upwork Thumbnail (1000x750)...');
  const pageUpwork = await browser.newPage({
    viewport: { width: 1000, height: 750 },
    deviceScaleFactor: 1
  });
  await pageUpwork.setContent(upworkHtml, { waitUntil: 'networkidle' });
  await pageUpwork.evaluate(() => document.fonts.ready);
  await pageUpwork.waitForTimeout(600);
  const upworkOutPath = path.join(outDir, 'upwork-thumbnail.png');
  await pageUpwork.screenshot({ path: upworkOutPath });
  console.log(`  ✓ Generated: ${upworkOutPath}`);

  // 2. Render Freelancer.com Thumbnail (1200 x 900 px, 4:3)
  console.log('[branding-thumbnails] Generating Freelancer.com Thumbnail (1200x900)...');
  const pageFreelancer = await browser.newPage({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 1
  });
  await pageFreelancer.setContent(freelancerHtml, { waitUntil: 'networkidle' });
  await pageFreelancer.evaluate(() => document.fonts.ready);
  await pageFreelancer.waitForTimeout(600);
  const freelancerOutPath = path.join(outDir, 'freelancer-thumbnail.png');
  await pageFreelancer.screenshot({ path: freelancerOutPath });
  console.log(`  ✓ Generated: ${freelancerOutPath}`);

  // 3. Render General Wide Portfolio Thumbnail (1920 x 1080 px, 16:9)
  console.log('[branding-thumbnails] Generating General Wide Portfolio Thumbnail (1920x1080)...');
  const pageWide = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  await pageWide.setContent(wideHtml, { waitUntil: 'networkidle' });
  await pageWide.evaluate(() => document.fonts.ready);
  await pageWide.waitForTimeout(600);
  const wideOutPath = path.join(outDir, 'general-wide-thumbnail.png');
  await pageWide.screenshot({ path: wideOutPath });
  console.log(`  ✓ Generated: ${wideOutPath}`);

  await browser.close();
  console.log('[branding-thumbnails] All 3 thumbnails generated successfully!');
})().catch(err => {
  console.error('[branding-thumbnails] Error:', err);
  process.exit(1);
});
