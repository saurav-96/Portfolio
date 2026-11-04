# AGENTS.md — Master AI Development Instructions & Working Rules

## Project Overview
High-performance 3D Developer Portfolio built with Next.js App Router, React 19 / React Three Fiber, GSAP / ScrollTrigger, and Lenis smooth scrolling.

### Project-Specific Priority
This project is a **faithful HTML-to-Next.js migration** of an existing interactive 3D portfolio (`3d Portfolio Website`).
- **Preserve:** The original visual design, animations, interactions, content, typography, and responsive layouts 1:1.
- **Optimize:** Implementation architecture, component composition, asset pipelines, and performance without unnecessarily changing visual output.

---

## Automatic Skill Selection & Application
Do not wait for manual skill invocations (`/`). Automatically identify the task type, inspect `.agents/skills/`, and apply relevant skills in combination while keeping context token-frugal.

### Skill Selection Matrix:
| Domain | Primary Skills in `.agents/skills/` | Focus Areas |
| :--- | :--- | :--- |
| **Next.js & App Router** | `next-bundle-optimizer`, `next-dev-loop`, `next-cache-components-adoption`, `next-partial-prefetching-adoption` | App Router structure, metadata, server/client boundaries, bundle size |
| **React Architecture** | `vercel-composition-patterns`, `vercel-react-best-practices`, `vercel-react-view-transitions` | Clean props, compound components, React 19 hooks, smooth view transitions |
| **3D & WebGL** | `threejs-core`, `threejs-react`, `threejs-loaders`, `threejs-materials`, `threejs-lighting`, `threejs-performance`, `threejs-shaders` | Canvas lifecycle, R3F/Drei, GLTF/DRACO optimization, 60fps budget, WebGL cleanup |
| **GSAP Animation** | `gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`, `gsap-plugins` | `useGSAP` hook scoping, cleanup on unmount, transform-only tweens, no layout thrashing |
| **Smooth Scrolling** | `cinematic-gsap-lenis-motion-system`, `cinematic-scroll-storytelling`, `scroll-progress-timeline` | Lenis smooth scroll ticker synced with GSAP ScrollTrigger |
| **UI/UX & Design** | `ui-ux-pro-max`, `web-design-guidelines`, `animation-on-scroll`, `masked-reveal` | Visual fidelity, design system tokens, responsive hierarchy, micro-interactions |
| **Performance & Vitals** | `core-web-vitals`, `performance`, `optimize-web-animations`, `vercel-optimize` | LCP < 2.5s, INP < 200ms, CLS < 0.1, offscreen pausing, RAF loop management |
| **Technical SEO** | `seo` | Structured data (JSON-LD), Open Graph metadata, semantic markup, sitemap |
| **AI Discoverability** | `llm-seo`, `retrieving-developer-knowledge`, `finding-google-skills` | `llms.txt`, agent-readable metadata, Google developer documentation standards |
| **Accessibility & Semantics**| `accessibility`, `best-practices`, `web-quality-audit` | WCAG 2.2 AA, ARIA roles, screen reader readiness, keyboard navigation |
| **Agent Efficiency** | `karpathy-guidelines`, `skill-creator` | Surgical edits, token conservation, verifying success criteria before execution |

---

## AI Agent Working Rules (Lean, Precise & Authoritative)
1. **Context Hygiene & Token Conservation**
   - Read only files relevant to the active task; use targeted searches rather than ingesting entire directories.
   - Do not re-read files that have not changed since last read.
   - For non-trivial architectural changes, present a concise plan first, then execute.

2. **Scope Discipline & Surgical Changes**
   - Make minimal, targeted changes. Do not modify files outside the specific task scope.
   - Preserve existing comments, docstrings, and formatting.

3. **Performance & Memory Management**
   - Keep 3D canvas performant (60fps); optimize draw calls, reuse geometries and materials, use DRACO/KTX2 compression.
   - Prevent memory leaks: call `.dispose()` on Three.js geometries/materials/textures and use `useGSAP({ scope: ... })` with proper teardown.
   - Respect user preferences (`prefers-reduced-motion`).

4. **Conflict Resolution & Documentation Priority**
   - Prioritize official, verified technical documentation over third-party conventions.
   - If two skills suggest conflicting approaches, identify the conflict and adopt the most authoritative and current standard (e.g. React 19 / Next.js App Router official specifications).
