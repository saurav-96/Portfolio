# MIGRATION MANIFEST — HTML TO NEXT.JS (APP ROUTER)

## 1. Project Specifications
- **Source Project Directory:** `c:\Users\Administrator\Desktop\portfolio\3d Portfolio Website` (Original source of truth, protected and read-only)
- **Target Project Directory:** `c:\Users\Administrator\Desktop\portfolio\3d Portfolio (Next.JS)` (Complete production-ready Next.js application)
- **Target Framework:** Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS / Vanilla CSS modules
- **Production Domain:** `https://owns.com.np`
- **Primary Success Criteria:** 1:1 visual fidelity, animation preservation, interaction equivalence, responsive accuracy, performance optimization (Core Web Vitals), and machine-readable SEO.

---

## 2. Route Architecture Mapping

| Original HTML File | Next.js App Router Route | Route Type | Interactive Elements & Features |
| :--- | :--- | :--- | :--- |
| `index.html` | `src/app/page.tsx` | Hybrid (RSC + Client Components) | Hero with 360° turntable portrait (`canvas`), Three.js WebGL sculpture background, featured projects carousel with GSAP drag/slide, philosophy bento grid, quick stats, services preview, and high-converting CTA. |
| `about.html` | `src/app/about/page.tsx` | Hybrid (RSC + Client Components) | Personal story, interactive 3D profile card with 360° drag rotation and holographic developer ID badge flip, 4 skills categories with interactive detail modals, genuine credentials, and Hackathon First Runner-Up trophy moments gallery modal. |
| `projects.html` | `src/app/projects/page.tsx` | Hybrid (RSC + Client Components) | 7 comprehensive projects, instant category filtering (All, Web Applications, UI/UX & Creative, Automation), URL query parameter sync (`?filter=...`), and expandable full-depth case-study modal with deep-linking (`?project=...`). |
| `services.html` | `src/app/services/page.tsx` | Hybrid (RSC + Client Components) | 4 core service tiers (Web Development, UI/UX Design, 3D & Creative Development, AI Automation & Extensions), interactive deep-dive modal with deliverables and FAQs, 4-step agile process, live developer console widget, and consultation CTA. |
| `contact.html` | `src/app/contact/page.tsx` | Client Component / Hybrid | Dedicated general inquiry form, client-side validation, accessible status messaging, direct messaging links (WhatsApp, Telegram, Email), social links, and interactive creator card. |
| `hire.html` | `src/app/hire/page.tsx` | Client Component / Hybrid | Fast-track client onboarding hub, 3 instant channels (WhatsApp 1-on-1, Upwork Escrow, Freelancer/Fiverr), 4-step agile engagement roadmap, and project brief inquiry form. |
| `404.html` | `src/app/not-found.tsx` | Client Component | 3D interactive backdrop, cybernetic status beacon, clear diagnostic message, and return home navigation. |

---

## 3. Component Architecture

```text
src/
├── app/
│   ├── layout.tsx                # Root layout with fonts, smooth scroll provider, Three.js backdrop, navbar, preloader, master footer
│   ├── page.tsx                  # Home route (index.html replica)
│   ├── about/page.tsx            # About route (about.html replica)
│   ├── projects/page.tsx         # Projects route (projects.html replica)
│   ├── services/page.tsx         # Services route (services.html replica)
│   ├── contact/page.tsx          # Contact route (contact.html replica)
│   ├── hire/page.tsx             # Hire Me route (hire.html replica)
│   ├── not-found.tsx             # 404 page (404.html replica)
│   ├── robots.ts                 # Dynamic robots.txt
│   ├── sitemap.ts                # Dynamic sitemap.xml
│   └── globals.css               # Shared design tokens, glassmorphism, responsive resets
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Glassmorphic navbar with active link indicator, glowing CTA, and mobile drawer
│   │   ├── Footer.tsx            # Master "WOW" footer with 10 social channels, fast-track CTA, back-to-top, live UTC+5:45 time
│   │   ├── Preloader.tsx         # Coordinated loading curtain with monogram ring and progress bar
│   │   └── SmoothScroll.tsx      # Lenis smooth-scroller integrated with GSAP ScrollTrigger ticker
│   │
│   ├── 3d/
│   │   ├── ThreeCanvas.tsx       # Three.js WebGL background (icosahedron, octahedron core, torus knot, particles)
│   │   ├── Portrait360.tsx       # High-DPI 36-frame 360° turntable canvas controller with inertia and tilt
│   │   └── Profile3DCard.tsx     # Interactive 3D card with pitch/yaw drag rotation and holographic badge flip
│   │
│   ├── home/
│   │   ├── HeroSection.tsx       # Hero typography, badge, quick actions, and portrait stage
│   │   ├── FeaturedProjects.tsx  # Smooth animated sliding carousel with GSAP drag/inertia
│   │   ├── PhilosophyBento.tsx   # 4-pillar design & engineering philosophy grid
│   │   └── HomeServicesCta.tsx   # Services preview and bottom CTA banner
│   │
│   ├── about/
│   │   ├── StorySection.tsx      # Developer biography, philosophy, and profile stage
│   │   ├── SkillsGrid.tsx        # 4 interactive skills categories triggering deep-dive modals
│   │   ├── Achievements.tsx      # Verified credentials, CS50x Harvard verification, and Hackathon trophy
│   │   └── TrophyModal.tsx       # Moments gallery modal for Hackathon trophy and award inspection
│   │
│   ├── projects/
│   │   ├── ProjectFilter.tsx     # Filter buttons with animated active states and count pills
│   │   ├── ProjectCard.tsx       # 3D tilted card with live links and case study trigger
│   │   └── CaseStudyModal.tsx    # Expandable deep-dive case study modal with full architecture breakdown
│   │
│   ├── services/
│   │   ├── ServiceCard.tsx       # Interactive service cards with benefit badges
│   │   ├── ServicesSidebar.tsx   # Developer console widget, quality guarantees, achievements spotlight
│   │   ├── ProcessRoadmap.tsx    # 4-step agile engineering roadmap
│   │   └── ServiceDetailModal.tsx# Comprehensive scope, deliverables, timeline, and FAQ modal
│   │
│   └── contact/
│       ├── ContactForm.tsx       # Accessible validated inquiry form with fallback states
│       ├── DirectChannels.tsx    # Vector SVG channel links (WhatsApp, Telegram, Upwork, LinkedIn, etc.)
│       └── CreatorCard.tsx       # High-contrast glassmorphic profile card with Nepal location status
│
├── data/
│   ├── projectsData.ts           # 7 complete case studies with problem, objective, tech stack, and outcomes
│   ├── servicesData.ts           # 4 service definitions with deliverables, workflow, benefits, and FAQs
│   └── skillsData.ts             # Complete skills taxonomy with capability lists and experience levels
│
└── lib/
    ├── gsap.ts                   # GSAP, ScrollTrigger, and ticker registration helper
    └── seo.ts                    # Metadata templates and JSON-LD schema generators
```

---

## 4. Migration Execution Phases

1. **Phase 1: Manifest, Design Tokens & Asset Migration** (Current)
   - Audit source site structure.
   - Extract design system, animation inventory, and media catalog.
   - Synchronize all assets to `public/assets/`.
2. **Phase 2: Project Architecture & Dependencies**
   - Configure `package.json`, Next.js 15 App Router, TypeScript, Tailwind CSS, Lucide icons, Three.js, GSAP, and Lenis.
   - Set up `globals.css` preserving exact color variables, font hierarchies, glassmorphic filters, and keyframes.
3. **Phase 3: Data Layer & Core Libraries**
   - Port `projectsData`, `servicesData`, and `skillsData` to strict TypeScript data models.
   - Implement `ThreeCanvas`, `Portrait360`, `Profile3DCard`, and `SmoothScroll`.
4. **Phase 4: Component & Page Replication**
   - Recreate Navbar, Footer, Preloader, and shared UI components.
   - Build `/` (Home), `/about`, `/projects`, `/services`, `/contact`, `/hire`, and `not-found.tsx`.
   - Wire up all modals (Case Study, Skills, Services, Trophy Gallery).
5. **Phase 5: Animation & Interaction Synchronization**
   - Verify GSAP ScrollTrigger reveals, 3D card tilt, magnetic buttons, and carousel sliding.
   - Ensure offscreen pausing and GPU cleanup to prevent memory leaks.
6. **Phase 6: SEO, Accessibility & Performance**
   - Add JSON-LD (Person, WebSite), Open Graph, semantic tags, and accessible ARIA attributes.
   - Optimize bundle size, lazy-load non-critical 3D elements, and audit Core Web Vitals.
7. **Phase 7: Visual Regression & Build Verification**
   - Verify build (`next build`), type safety (`tsc --noEmit`), and responsiveness across breakpoints.
