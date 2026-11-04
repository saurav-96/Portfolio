# DESIGN SYSTEM & DESIGN TOKENS SPECIFICATION

## 1. Visual Language & Creative Direction
- **Identity:** High-Craft 3D Interactive Portfolio for **Saurav Bhusal**
- **Theme:** Luxury Cybernetic Glassmorphism & Studio Dark Mode
- **Atmosphere:** Deep Obsidian (`#06060B`) with Neon Purple (`#A855F7`), Electric Cyan (`#06B6D4`), and Indigo (`#4F46E5`) rim lighting
- **Surface Elevation:** Translucent high-density frosted glass (`rgba(12, 13, 23, 0.80)`) with multi-layer inner specular highlights (`inset 0 1px 0 rgba(255,255,255,0.14)`) and dual-glow borders (`rgba(168, 85, 247, 0.24)` and `rgba(34, 211, 238, 0.52)`).

---

## 2. Color Palette & Design Tokens

### Backgrounds
| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#06060B` | Deepest canvas background, body background |
| `--bg-midnight` | `#0C0D17` | Card and component surfaces |
| `--bg-elevated` | `#121426` | Modals, drawers, and elevated flyouts |

### Vibrant Accents
| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--accent-violet` | `#7C3AED` | Primary interactive buttons, gradients, glowing halos |
| `--accent-purple` | `#A855F7` | Brand highlight, rim lighting, 3D mesh illumination |
| `--accent-cyan` | `#06B6D4` | Secondary lighting, active state indicators, telemetry metrics |
| `--accent-indigo` | `#4F46E5` | Deep atmospheric depth lights, badges, borders |
| `--accent-emerald` | `#10B981` | Availability beacon (`🟢 AVAILABLE`), live status badges |

### Glassmorphism & Borders
| Token | Value | Semantic Role |
| :--- | :--- | :--- |
| `--surface-glass` | `rgba(255, 255, 255, 0.035)` | Subtle translucent backdrops |
| `--surface-glass-hover` | `rgba(255, 255, 255, 0.065)` | Interactive hover state elevation |
| `--surface-card` | `rgba(12, 13, 23, 0.80)` | Standard glassmorphic cards with backdrop blur |
| `--border-glass` | `rgba(168, 85, 247, 0.24)` | Subtle brand border glow |
| `--border-glass-strong` | `rgba(34, 211, 238, 0.52)` | Focused and active border glow |
| `--border-cyan` | `rgba(6, 182, 212, 0.42)` | Technical badge & widget outlines |
| `--border-subtle` | `rgba(255, 255, 255, 0.10)` | Neutral hairline divider borders |

### Typography Hierarchy
| Level | Font Family | Size / Clamp | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Display 1 (Hero Title)** | `'Space Grotesk', sans-serif` | `clamp(2.75rem, 6.2vw, 5.0rem)` | 800 (Extrabold) | 1.05 |
| **Heading 1 (Section Title)** | `'Space Grotesk', sans-serif` | `clamp(2.0rem, 4.2vw, 3.25rem)` | 700 (Bold) | 1.15 |
| **Heading 2 (Card Title)** | `'Space Grotesk', sans-serif` | `1.5rem (24px)` | 600 (Semibold) | 1.30 |
| **Body (Editorial)** | `'Inter', sans-serif` | `1.0rem (16px)` | 400 (Regular) | 1.65 |
| **Small / Badges** | `'Inter', sans-serif` | `0.875rem (14px)` | 500 (Medium) | 1.40 |
| **Code / Coordinates / Telemetry** | `'JetBrains Mono', monospace` | `0.8125rem (13px)` | 500 / 600 | 1.50 |
| **Editorial Hand Accent** | `'Caveat', cursive` | `1.25rem - 1.5rem` | 600 / 700 | 1.20 |

---

## 3. UI Component Specifications

### 1. Navigation Bar (`.navbar-glass`)
- **Position:** Fixed at top, centered with `max-width: 1280px`
- **Backdrop:** `backdrop-filter: blur(28px) saturate(180%)`
- **Border:** Dual-layer border with `rgba(168, 85, 247, 0.28)`
- **Monogram Brand:** "SB" logo mark with live pulsing emerald status beacon (`🟢 AVAILABLE`)
- **Navigation Links:** Home, About, Projects, Services, Contact with active pill indicator
- **CTA:** Glowing magnetic "Hire Me" button with gradient border and hover sheen

### 2. Interactive Glass Cards (`.glass-card`, `.project-card`)
- **Backdrop Blur:** `blur(24px)`
- **Border Radius:** `1.25rem (20px)`
- **3D Card Tilt:** Perspective 1200px, dynamically reacts to pointer movements with hardware-accelerated transforms (`translate3d`, `rotateX`, `rotateY`)
- **Dynamic Specular Glare:** Radial gradient positioned dynamically via CSS variables `--mouse-x` and `--mouse-y`

### 3. Modals & Drawers (`.modal-backdrop`, `.modal-window`)
- **Backdrop:** `rgba(6, 6, 11, 0.88)` with `backdrop-filter: blur(20px)`
- **Window:** Max-width 860px (Case Studies) / 780px (Services & Skills), smooth spring enter animation (`scale: 0.96 -> 1`, `opacity: 0 -> 1`)
- **Accessibility:** ESC key listener, focus trap, and background click dismiss

### 4. Master "WOW" Footer
- **Layout:** High-density 4-column responsive grid with brand intro, quick navigation routes, technical credentials, and freelance escrow links
- **Social & Channel Links:** 10 authentic vector SVG channels (GitHub, LinkedIn, Instagram, Facebook, X, WhatsApp, Telegram, Upwork, Fiverr, Freelancer)
- **Interactive Tools:** Fast-track hire shortcut, Lenis-interpolated "Back to Top ↑", live timezone clock (`UTC+5:45 Nepal`)
