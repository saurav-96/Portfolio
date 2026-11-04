# ANIMATION & INTERACTION INVENTORY

## 1. Overview of Motion Systems
The portfolio employs three complementary motion engines working in harmonious synchrony:
1. **Three.js WebGL Engine:** Dynamic 3D sculpture and cosmic particle field rendered on fixed full-viewport background canvas.
2. **Interactive 2.5D / Canvas Engines:**
   - 36-frame 360° turntable portrait (`#portrait-360-canvas`) with drag inertia and idle return.
   - Interactive 3D profile card (`#profile-3d-card`) with pitch/yaw drag rotation and holographic badge flip.
3. **GSAP + Lenis Motion System:** Smooth scrolling synchronized via GSAP ticker, ScrollTrigger reveals, buttery-smooth carousel controller, 3D card tilt, and magnetic hover physics.

---

## 2. Three.js Background WebGL System (`js/three-scene.js`)

| Component | Technical Implementation | Motion & Interactivity |
| :--- | :--- | :--- |
| **Sculpture Wireframe** | `THREE.IcosahedronGeometry(2.3, 0)` with `LineBasicMaterial` (purple & cyan vertex blending) | Continuous gyroscopic rotation on $X, Y, Z$ axes; scales and tilts with scroll velocity |
| **Vertex Nodes** | 12 instanced glowing spheres placed at icosahedron vertices | Pulsing emission and scale sync |
| **Inner Core** | `THREE.OctahedronGeometry(1.2, 0)` with PBR standard reflective material | Counter-rotates to icosahedron, creating layered kinetic depth |
| **Signature Torus Knot**| `THREE.TorusKnotGeometry(1.4, 0.22, 100, 16)` | Smooth ribbon orbit around central core |
| **Gyroscopic Orbital Rings** | 3 concentric thin torus rings tilted at 45° and 90° | Multi-speed orbital rotation mimicking an astrolabe |
| **Cosmic Starfield Particles** | 1,200 particle buffer with `THREE.DynamicDrawUsage` | Continuous Z-axis streaming toward viewer; accelerates dynamically during rapid scroll |
| **Studio Rim Lighting** | 3 PointLights: Electric Cyan (`#06B6D4`, left), Neon Purple (`#A855F7`, right), Indigo (`#4F46E5`, top) | Intensities oscillate subtly with user scroll speed and pointer movement |
| **Camera Inertia & Depth** | `THREE.PerspectiveCamera(50, w/h, 0.1, 100)` | Camera flies forward through the scene during scroll, reacting to mouse parallax |
| **Performance Guard** | `IntersectionObserver` & `document.visibilityState` | 100% rAF render loop pause when tab is inactive or canvas is out of view |

---

## 3. Interactive 3D Turntable Portrait (`js/portrait-360.js`)

| Feature | Technical Implementation | Details |
| :--- | :--- | :--- |
| **Canvas Engine** | High-DPI 2D Canvas (`657x1008` logical resolution) | Single-frame zero-ghosting GPU blit from decoded image textures |
| **Frame Dataset** | 36 high-resolution rotation frames (`frame-0.png` to `frame-35.png`) | $10^\circ$ interval covering full $360^\circ$ horizontal turntable turn |
| **Drag Physics** | `DRAG_SENSITIVITY = 0.48`, `INERTIA_FRICTION = 0.92`, `MAX_FLING = 3.6` | Natural 1:1 turntable drag feel with smooth velocity decay on release |
| **3D Perspective Tilt** | Dynamic `rotateX` and `rotateY` style transforms | Tilts towards pointer coordinates during desktop mouse inspection |
| **Idle Auto-Return** | 3.5s inactivity timer | Returns smoothly to original $0^\circ$ frontal angle after user lets go |
| **Angle Badge Telemetry**| Live counter (`0°` to `350°`) | Updates synchronously in realtime with rotation |
| **Accessibility & Touch**| `touch-action: pan-y` | Horizontal drag rotates the model while vertical scrolling remains 100% fluid |

---

## 4. Interactive 3D Profile Card (`js/profile-3d.js`)

| Feature | Technical Implementation | Details |
| :--- | :--- | :--- |
| **3D Stage** | CSS 3D perspective (`perspective(1400px)`) | Double-sided card (`transform-style: preserve-3d`) |
| **Front Face** | High-contrast studio portrait with status beacon | Specular dynamic glare overlay tracking `--glare-x` and `--glare-y` |
| **Back Face** | Holographic Cybernetic Developer ID badge | Harvard CS50x credentials, Nepal coordinates, NFC chip graphic |
| **Drag Controller** | Pitch/yaw pointer tracking with damping (`0.085`) and friction (`0.94`) | Free 360° inspection on both axes; flings with momentum on release |
| **Double-Click Reset** | Spring reset to neutral front position | Restores zero rotation on double-tap or double-click |

---

## 5. GSAP & Lenis Smooth Motion Engine (`js/animations.js` & `js/projects.js`)

| Animation Feature | Controller / Library | Details |
| :--- | :--- | :--- |
| **Lenis Smooth Scroll** | `lenis` + `ScrollTrigger` | Synchronized through `gsap.ticker.add((time) => lenis.raf(time * 1000))` |
| **Staggered Section Reveals** | `gsap.fromTo` + `ScrollTrigger` | `y: 40 -> 0`, `opacity: 0 -> 1`, `duration: 0.8`, `stagger: 0.12`, `power2.out` |
| **Featured Projects Carousel** | Custom GSAP tween controller | `power3.out` (0.95s duration), touch drag with velocity inertia (`velocityX * 160`), horizontal wheel scroll, progress track indicator |
| **3D Card Tilt & Spotlight** | rAF Pointer Tracking | `rotateX`, `rotateY`, `translate3d(0, -8px, 24px)` with dynamic radial cursor glare |
| **Magnetic Buttons** | GSAP QuickTo / Lerp | Button magnetizes towards cursor within 60px proximity, springs back on leave |
| **Preloader Curtain** | Coordinated Timeline | Monogram ring scale, SVG stroke dashoffset progress (0% -> 100%), curtain exit slide up |
| **Reduced Motion Support** | `@media (prefers-reduced-motion: reduce)` | Replaces 3D fly-ins with instant subtle cross-fades and disables carousel auto-scroll |
