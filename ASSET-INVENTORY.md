# ASSET INVENTORY & MEDIA AUDIT

## 1. Asset Directory Structure & Synchronization

All source assets from `c:\Users\Administrator\Desktop\portfolio\3d Portfolio Website\assets` are mapped 1:1 into `c:\Users\Administrator\Desktop\portfolio\3d Portfolio (Next.JS)\public\assets`.

```text
public/
├── CNAME                         # Domain binding (owns.com.np)
├── robots.txt                    # Search crawler policy
├── sitemap.xml                   # XML sitemap fallback
└── assets/
    ├── icons/
    │   ├── favicon.ico           # Multi-resolution favicon
    │   ├── favicon.png           # 32x32 PNG icon
    │   └── favicon.svg           # High-DPI scalable 3D prism vector
    │
    ├── images/
    │   ├── saurav-cutout.png     # Transparent rim-lit studio portrait (657x1008)
    │   ├── saurav-portrait.jpg   # High-resolution original portrait
    │   ├── saurav-avatar-logo.jpg# Circular branded developer avatar
    │   ├── saurav-logo.png       # Transparent monogram logo mark
    │   └── portrait-360/         # 36 rotation frames (frame-0.png to frame-35.png)
    │
    ├── projects/
    │   ├── swasthyasutra-thumb.png
    │   ├── swasthyasutra.jpg
    │   ├── keyflow-thumb.png
    │   ├── keyflow.jpg
    │   ├── egov-thumb.png
    │   ├── egov-platform.jpg
    │   ├── tubekit-thumb.png
    │   ├── tubekit.svg
    │   ├── mindful-you.svg
    │   ├── brand-nodeloop.svg
    │   ├── ad-halo-bottle.svg
    │   ├── ai-automation-lab.svg
    │   ├── creative-design-suite.svg
    │   ├── poster-buildnext.svg
    │   ├── social-campaign.svg
    │   └── thumbnail-automation.svg
    │
    ├── certificates/
    │   ├── cs50x-certificate.png
    │   ├── hackathon-trophy.jpg
    │   ├── saurav-hackathon-runnerup.jpg
    │   ├── nit-legend-hackathon-2026.jpg
    │   ├── sagarmatha-ux-ui-2025.jpg
    │   ├── fcc-javascript-algorithms-v7.png
    │   ├── fcc-javascript-algorithms-v8.png
    │   └── fcc-responsive-web-design-v8.png
    │
    └── documents/
        └── Saurav-Bhusal-CV.html # Printable semantic CV document
```

---

## 2. Media Optimization Strategy

| Media Group | Formats | Delivery Strategy | Performance Protection |
| :--- | :--- | :--- | :--- |
| **Hero Cutout** | PNG (`saurav-cutout.png`) | Eager loading with `fetchpriority="high"` | Explicit width & height (657x1008) to eliminate CLS |
| **360° Turntable Frames** | 36 PNGs (`frame-0.png` ... `frame-35.png`) | Lazy background preloading after main thread idle | Initial paint loads frame 0 immediately; remaining 35 frames load concurrently |
| **Project Thumbnails** | PNG & WebP / JPG | Next.js dynamic `<Image>` with blur placeholder | Lazy loaded below fold |
| **Certificates & Gallery** | JPG / PNG | Loaded dynamically upon modal trigger | Zero bandwidth consumption until user interaction |
| **Vector Icons & Graphics**| SVG | Inlined React SVG components | Zero network requests, crisp rendering on all DPIs |
