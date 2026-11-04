# Saurav Bhusal — 3D Interactive Portfolio (Next.js Edition)

## 🌟 Executive Summary

This repository contains the complete Next.js replica of Saurav Bhusal's 3D Interactive Developer & UI/UX Designer Portfolio. Every visual design detail, animation sequence, WebGL shader experience, responsive layout, modal interaction, and typography rule from the original website has been preserved with pixel-perfect fidelity and optimized for modern production performance.

---

## 📐 Technology Architecture

| Domain | Implementation | Version / Standard |
| :--- | :--- | :--- |
| **Framework** | Next.js App Router | `15.1.7` (React `19.0.0`) |
| **Language** | TypeScript (Strict Mode) | `5.7.3` |
| **Styling** | Tailwind CSS + Modern PostCSS | `3.4.17` |
| **3D & WebGL** | Three.js (Hardware-accelerated Canvas) | `0.173.0` |
| **Motion & Animation** | GreenSock (GSAP) & ScrollTrigger | `3.12.7` (`@gsap/react` `2.1.2`) |
| **Smooth Scrolling** | Lenis Scroller synced to GSAP Ticker | `1.1.20` |
| **Iconography** | Lucide React | `0.475.0` |
| **SEO & Schemas** | JSON-LD (Person & WebSite), Open Graph, App Router Metadata | Schema.org standard |
| **AI Discoverability** | `llms.txt` (Structured GEO / LLM-SEO) | Machine-readable standards |

---

## 🚀 Key Features & Pages Replicated

### 1. Master Layout & Navigation
- **Floating Glassmorphic Header (`Navbar.tsx`):** Glass backdrop (`backdrop-blur-xl`), brand monogram with neon violet accent (`SAURAV.`), active route indicator, live availability beacon (`🟢 AVAILABLE`), and responsive mobile drawer.
- **Top Scroll Progress Bar:** Hardware-accelerated dynamic viewport scroll progress meter.
- **Master Footer (`Footer.tsx`):** Universal footer across all pages with 10 direct and escrow channels (WhatsApp, Telegram, Upwork, Fiverr, Freelancer, GitHub, LinkedIn, Instagram, Facebook, X), live UTC+5:45 Nepal timezone indicator, and back-to-top smooth return.
- **Coordinated Preloader Curtain (`Preloader.tsx`):** Brand logo ring, loading bar, and status text with buttery-smooth exit fade.

### 2. Full 3D & WebGL Experiences
- **WebGL Background Canvas (`ThreeCanvas.tsx`):** Multi-layered Three.js scene featuring:
  - Wireframe icosahedron sculpture with cyan/purple gradient illumination.
  - Glowing inner core sphere with pulsing specular highlights.
  - Floating 3D torus knot with continuous orbit.
  - Concentric rotating orbital rings.
  - 420-particle starfield with GPU vertex streaming and depth-attenuated point rendering.
  - Offscreen and hidden tab `requestAnimationFrame` pausing to preserve CPU/GPU battery.
- **Interactive 360° Portrait Turntable (`Portrait360.tsx`):**
  - 36 pre-rendered high-resolution frames with continuous drag/touch turntable control.
  - Perspective parallax tilt tracking mouse coordinates.
  - Live angle telemetry badge (`0°` to `350°`).
  - Smooth inertia damping and automatic idle return to frame 0.
- **3D Holographic Profile Card (`Profile3DCard.tsx`):**
  - Interactive 360° pitch and yaw drag mechanics with specular surface glare.
  - Reverse side featuring holographic developer credentials, verified certificates, and tech taxonomy.

### 3. Route Inventory
| Route | Page | Purpose & Features |
| :--- | :--- | :--- |
| `/` | **Home (`page.tsx`)** | Hero, 360 Turntable, GSAP Featured Carousel, Bento Grid, Services preview, Contact CTA. |
| `/about` | **About (`about/page.tsx`)** | Developer journey, 3D interactive card, 4 skills categories, 6 verified certificates, trophy gallery, vision. |
| `/projects` | **Projects (`projects/page.tsx`)** | 5 category filter pills (`all`, `web`, `uiux`, `ai`, `graphic`), 7 interactive project cards, visual gallery, `<CaseStudyModal />`. |
| `/services` | **Services (`services/page.tsx`)** | 4 core offerings with feature checklists, 4-step agile engineering roadmap, Developer Console widget, `<ServiceDetailModal />`. |
| `/contact` | **Contact (`contact/page.tsx`)** | General Inquiries form with accessible validation, error summary, direct channels (WhatsApp, Telegram, Upwork, etc.). |
| `/hire` | **Hire (`hire/page.tsx`)** | Fast-track onboarding hub, 3 direct escrow channels (WhatsApp, Upwork, Fiverr), project brief submission. |
| `not-found` | **404 (`not-found.tsx`)** | "Lost in Digital Space" coordinates error card with home and project navigation fallbacks. |
| `/sitemap.xml` | **Sitemap (`sitemap.ts`)** | Dynamic App Router XML sitemap with freshness timestamps and route priorities. |
| `/robots.txt` | **Robots (`robots.ts`)** | Dynamic App Router search engine crawler rules. |
| `/llms.txt` | **LLM SEO (`llms.txt`)** | Machine-readable markdown profile optimized for AI search engines and crawler agents. |

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js **18.18+** or **20+** / **22+**
- npm **9+**

### Installation
```bash
# Navigate to the project root
cd "3d Portfolio (Next.JS)"

# Install verified dependencies
npm install
```

### Development Server
```bash
# Start Next.js dev server on http://localhost:3000
npm run dev
```

### Production Build
```bash
# Typecheck with TypeScript
npm run typecheck

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## ⚡ Performance & Core Web Vitals Optimization

1. **Sub-second LCP (< 2.5s):** Next.js Image component with modern WebP/AVIF formats, prioritized above-the-fold assets, and pre-warmed Google font subsets.
2. **Low INP (< 200ms):** Event delegation, non-blocking Three.js render loops, and debounced mousemove listeners.
3. **Zero CLS (< 0.1):** Explicit aspect ratios and dimension placeholders on all visual banners and 3D canvases.
4. **WebGL Efficiency:** Offscreen canvas throttling via `document.hidden` visibility observers, memory leak prevention via explicit `.dispose()` on Three.js geometries/materials.
5. **Lenis + ScrollTrigger Sync:** Native `scroll-behavior: smooth` disabled on `html` to eliminate scroll-jacking conflicts; Lenis drives the GSAP ticker directly.

---

## 📄 Audit Documents Reference
- [`MIGRATION-MANIFEST.md`](./MIGRATION-MANIFEST.md) — Comprehensive inventory of mapped HTML elements and Next.js components.
- [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) — Complete color tokens, font hierarchy, glassmorphism specs, and breakpoints.
- [`ANIMATION-INVENTORY.md`](./ANIMATION-INVENTORY.md) — Timelines, easing parameters, ScrollTrigger configs, and 3D scenes.
- [`ASSET-INVENTORY.md`](./ASSET-INVENTORY.md) — Index of all 60+ images, SVG icons, documents, and 360-turntable frames.

---

## 👤 Author & Contact

**Saurav Bhusal**  
- **Website:** [https://owns.com.np](https://owns.com.np)  
- **Email:** [sauravbhusal369@gmail.com](mailto:sauravbhusal369@gmail.com)  
- **WhatsApp:** [+977 9766271244](https://wa.me/9779766271244)  
- **GitHub:** [@saurav-96](https://github.com/saurav-96)  
- **LinkedIn:** [saurav-b-502352415](https://www.linkedin.com/in/saurav-b-502352415/)  
- **Upwork:** [Saurav Bhusal Profile](https://www.upwork.com/freelancers/~010a6e73c111779a15)
