'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Code2,
  Figma,
  Cpu,
  Palette,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { SERVICES_DATA, type ServiceDetail } from '@/data/servicesData';
import ServiceDetailModal from '@/components/modals/ServiceDetailModal';

export default function ServicesClient() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [copiedSpecs, setCopiedSpecs] = useState(false);

  const handleCopySpecs = async () => {
    const specsText = [
      'Saurav Bhusal — Full-Stack & UI/UX Developer Specs:',
      '- Primary Stack: Vanilla JS (ES6+), React, Tailwind CSS, Three.js, GSAP',
      '- Architecture: WebGL Canvas, Lenis Smooth Scroll, Accessible Semantic HTML5',
      '- Performance Guarantee: 95+ Lighthouse Target across Desktop & Mobile',
      '- Location / Timezone: Nepal (UTC+5:45) — Available Remote / WFH',
      '- CS50x Harvard Verified Alum | Web Design Hackathon 2026 Winner',
      '- Collaboration: 1-on-1 WhatsApp, Upwork Escrow, Fast-Track Portal',
      '- Portfolio: https://github.com/saurav-96'
    ].join('\n');

    try {
      await navigator.clipboard.writeText(specsText);
      setCopiedSpecs(true);
      setTimeout(() => setCopiedSpecs(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <>
      <main id="main-content" className="pt-28 sm:pt-32 pb-20">
        {/* ===================================================================
             SERVICES HERO HEADER
             =================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div data-hero-reveal>
                <span className="eyebrow-badge">
                  <span className="eyebrow-dot"></span>
                  <span>MY SERVICES</span>
                </span>
              </div>

              <h1 data-hero-reveal className="font-heading text-4xl sm:text-5xl font-bold text-white leading-[1.12]">
                What I <span className="text-gradient">Offer</span> — Turning Ideas Into Powerful Digital Solutions.
              </h1>

              <p data-hero-reveal className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Whether you need a high-converting landing page, a thoughtful Figma UI/UX prototype, an interactive 3D web experience, or custom Python workflow automation, I collaborate closely to deliver clean, reliable results.
              </p>
            </div>

            {/* 3D Torus Knot Visual Accent Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end" data-hero-reveal>
              <div className="glass-card p-6 w-full max-w-sm flex items-center gap-4" data-tilt>
                <svg className="w-20 h-20 shrink-0 animate-spin-slow" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                  <ellipse cx="50" cy="50" rx="40" ry="18" transform="rotate(28 50 50)" stroke="#22D3EE" strokeWidth="2.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="18" transform="rotate(-32 50 50)" stroke="#A855F7" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="10" fill="rgba(124,58,237,0.35)" stroke="#F8FAFC" strokeWidth="1.5" />
                </svg>
                <div>
                  <div className="font-mono text-xs text-cyan-300 uppercase">FREELANCE READY</div>
                  <div className="font-heading text-base font-bold text-white mt-0.5">Tailored Scope &amp; Clear Milestones</div>
                  <Link href="/hire" className="text-xs text-purple-300 hover:text-cyan-300 transition mt-1 inline-block">
                    Discuss your project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
             4 PREMIUM SERVICE SECTIONS + WORKING PROCESS SIDEBAR
             =================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left 8 Columns: The 4 Detailed Service Sections */}
            <div className="lg:col-span-8 space-y-7">

              {/* SERVICE 01: WEB DEVELOPMENT */}
              <article id="web-development" className="glass-card p-6 sm:p-8" data-tilt>
                {/* Visual Reference Banner */}
                <div className="service-visual-banner mb-6">
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-r from-purple-900/30 via-slate-900/40 to-cyan-950/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        <span className="font-mono text-[11px] text-slate-400 ml-2">app.tsx — React + Three.js + Tailwind</span>
                      </div>
                      <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">60 FPS WebGL</span>
                    </div>
                    <div className="font-mono text-xs text-slate-300 flex items-center justify-between">
                      <span className="text-purple-300">const <span className="text-cyan-300">scene</span> = new Three.Scene(); <span className="text-slate-500">// Responsive 3D Canvas</span></span>
                      <span className="text-emerald-400">● 100% Mobile Ready</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-300">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-purple-300 uppercase tracking-widest">SERVICE 01</span>
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">Web Development</h2>
                    </div>
                  </div>
                  <span className="status-badge status-live">Frontend &amp; Interactive</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Modern, responsive, and performance-focused websites engineered with clean semantic code, smooth motion design, and cross-device reliability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {[
                    'Responsive websites',
                    'Modern landing pages',
                    'Business websites',
                    'React applications',
                    'Interactive websites',
                    'Three.js experiences',
                    'WordPress websites'
                  ].map((item, idx) => (
                    <div
                      key={item}
                      className={`p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 ${
                        idx === 6 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mandatory CTA after Service 01 */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES_DATA['web-development'])}
                    className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                  >
                    <span>Explore Details &amp; FAQs</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <Link href="/hire" className="btn-primary text-sm" data-magnetic>
                    <span>Inquire About Web Development</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              {/* SERVICE 02: UI/UX DESIGN */}
              <article id="ui-ux-design" className="glass-card p-6 sm:p-8" data-tilt>
                {/* Visual Reference Banner */}
                <div className="service-visual-banner mb-6">
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-pink-950/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                        <span className="font-mono text-[11px] text-pink-300">Figma • Design System v2.4</span>
                      </div>
                      <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">Auto-Layout 5.0</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10">❖ Button / Primary</span>
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10">❖ Card / Glassmorphic</span>
                      <span className="text-pink-300 hidden sm:inline">↗ Interactive Prototype</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                      <Figma className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">SERVICE 02</span>
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">UI/UX Design</h2>
                    </div>
                  </div>
                  <span className="status-badge status-concept">User-Centered Design</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Intuitive, conversion-focused digital interfaces designed from user flows and wireframes up to polished, developer-ready Figma design systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {[
                    'Website UI design',
                    'Mobile interface design',
                    'Figma wireframes',
                    'Interactive prototypes',
                    'Design systems',
                    'Website redesign',
                    'Responsive layouts'
                  ].map((item, idx) => (
                    <div
                      key={item}
                      className={`p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 ${
                        idx === 6 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mandatory CTA after Service 02 */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES_DATA['ui-ux-design'])}
                    className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                  >
                    <span>Explore Details &amp; FAQs</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <Link href="/contact?service=UI/UX%20Design" className="btn-primary text-sm" data-magnetic>
                    <span>Inquire About UI/UX Design</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              {/* SERVICE 03: AI AUTOMATION */}
              <article id="ai-automation" className="glass-card p-6 sm:p-8" data-tilt>
                {/* Visual Reference Banner */}
                <div className="service-visual-banner mb-6">
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-r from-indigo-950/40 via-slate-900/40 to-cyan-950/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                        <span className="font-mono text-[11px] text-indigo-300">Python 3.11 • Automated Pipeline</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">REST API Sync</span>
                    </div>
                    <div className="font-mono text-xs text-slate-300 flex items-center justify-between">
                      <span className="text-cyan-300">python -m run_pipeline --batch=active <span className="text-emerald-400">[200 OK]</span></span>
                      <span className="text-purple-300 hidden sm:inline">Chrome MV3 Service Worker</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">SERVICE 03</span>
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">AI Automation</h2>
                    </div>
                  </div>
                  <span className="status-badge status-lab">Workflow Efficiency</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Smart scripts, browser extensions, and AI-assisted pipelines designed to eliminate repetitive manual work and streamline digital operations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {[
                    'Python automation',
                    'AI-assisted workflows',
                    'Browser automation',
                    'Custom scripts',
                    'API integrations',
                    'Productivity tools'
                  ].map((item) => (
                    <div key={item} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mandatory CTA after Service 03 */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES_DATA['ai-automation'])}
                    className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                  >
                    <span>Explore Details &amp; FAQs</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <Link href="/contact?service=AI%20Automation" className="btn-primary text-sm" data-magnetic>
                    <span>Inquire About AI Automation</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              {/* SERVICE 04: GRAPHIC DESIGN */}
              <article id="graphic-design" className="glass-card p-6 sm:p-8" data-tilt>
                {/* Visual Reference Banner */}
                <div className="service-visual-banner mb-6">
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-r from-pink-950/40 via-purple-900/30 to-amber-950/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
                        <span className="font-mono text-[11px] text-pink-300">Visual Suite • High-Converting CTR</span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">High Contrast</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                      <span className="text-white font-semibold">▶ YouTube Thumbnails</span>
                      <span className="text-purple-300">◆ Brand Logos</span>
                      <span className="text-pink-300 hidden sm:inline">✦ Campaign Posters</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/40 flex items-center justify-center text-pink-300">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-pink-300 uppercase tracking-widest">SERVICE 04</span>
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">Graphic Design</h2>
                    </div>
                  </div>
                  <span className="status-badge status-concept">Visual Identity</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Compelling visual communication assets designed to elevate your brand presence, attract clicks, and communicate clearly across digital channels.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {[
                    'YouTube thumbnails',
                    'Logo concepts',
                    'Brand identity',
                    'Marketing posters',
                    'Social media graphics',
                    'Presentation design'
                  ].map((item) => (
                    <div key={item} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mandatory CTA after Service 04 */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES_DATA['graphic-design'])}
                    className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                  >
                    <span>Explore Details &amp; FAQs</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <Link href="/contact?service=Graphic%20Design" className="btn-primary text-sm" data-magnetic>
                    <span>Inquire About Graphic Design</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

            </div>

            {/* Right 4 Columns: Interactive 4-Step Working Process Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">

              {/* Direct Developer 1-on-1 Access Card */}
              <div className="glass-card p-5 flex items-center gap-4" data-tilt>
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/25 to-purple-600/30 border border-cyan-400/40 shrink-0">
                  <Image
                    src="/assets/images/saurav-cutout.png"
                    alt="Saurav Bhusal — Lead Web Developer"
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Saurav Bhusal</span>
                    <span className="status-badge status-live text-[9px] py-0.5 px-1.5">Active</span>
                  </div>
                  <div className="font-mono text-[11px] text-cyan-300 mt-0.5">Direct 1-on-1 Collaboration</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Zero middlemen, rapid turnaround &amp; continuous communication.</div>
                </div>
              </div>

              {/* Card 2: 4-Step Working Process */}
              <div className="glass-card p-6 sm:p-7">
                <span className="eyebrow-badge mb-3">
                  <span className="eyebrow-dot"></span>
                  <span>HOW WE WORK</span>
                </span>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">
                  Our Working Process
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-6">
                  A transparent, four-step workflow designed to keep your project aligned from initial discovery to final delivery.
                </p>

                {/* 4-Step Vertical Timeline */}
                <div className="relative pl-4 space-y-6 timeline-container" id="working-process-timeline">
                  <div className="timeline-track-rail" aria-hidden="true">
                    <div className="timeline-track-fill" id="timeline-progress-fill" style={{ height: '70%' }}></div>
                  </div>

                  {/* Step 01 */}
                  <div className="relative flex items-start gap-4 timeline-step">
                    <div className="w-9 h-9 rounded-full bg-[#0D0E17] border-2 border-cyan-400 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      01
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-heading text-base font-bold text-white">Discover</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Understand the client&apos;s goals and requirements.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="relative flex items-start gap-4 timeline-step">
                    <div className="w-9 h-9 rounded-full bg-[#0D0E17] border-2 border-purple-400 text-purple-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                      02
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-heading text-base font-bold text-white">Plan &amp; Design</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Develop the structure, visual direction, and user experience.
                      </p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="relative flex items-start gap-4 timeline-step">
                    <div className="w-9 h-9 rounded-full bg-[#0D0E17] border-2 border-indigo-400 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                      03
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-heading text-base font-bold text-white">Develop</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Transform the design into a functional digital product.
                      </p>
                    </div>
                  </div>

                  {/* Step 04 */}
                  <div className="relative flex items-start gap-4 timeline-step">
                    <div className="w-9 h-9 rounded-full bg-[#0D0E17] border-2 border-emerald-400 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                      04
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-heading text-base font-bold text-white">Deliver &amp; Improve</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        Test, refine, and deliver the final result.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <Link href="/hire" className="btn-primary w-full justify-center">
                    <span>Start Your Project</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <a
                    href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center text-xs"
                  >
                    <span>Hire Me on Upwork ↗</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Client Quality Standards & Guarantees */}
              <div className="glass-card p-6" data-tilt>
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow-badge">
                    <span className="eyebrow-dot"></span>
                    <span>CLIENT STANDARDS</span>
                  </span>
                  <span className="tech-pill text-cyan-300 border-cyan-500/30">100% Quality</span>
                </div>
                <h2 className="font-heading text-xl font-bold text-white mb-2">
                  Engineering Guarantees
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Every project is crafted under strict performance, accessibility, and clean architecture standards.
                </p>

                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">⚡</div>
                    <div>
                      <h3 className="font-heading text-xs font-bold text-white">95+ Lighthouse Performance</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Sub-second loading, optimized WebGL shaders, zero layout shift.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 text-sm">🛡️</div>
                    <div>
                      <h3 className="font-heading text-xs font-bold text-white">Milestone Escrow Protection</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Secure contracts backed by Upwork or milestone-based delivery.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-sm">🎨</div>
                    <div>
                      <h3 className="font-heading text-xs font-bold text-white">Figma Architecture Handover</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Auto-layout tokens, reusable components, and full design system.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 text-sm">🤝</div>
                    <div>
                      <h3 className="font-heading text-xs font-bold text-white">100% Code Ownership &amp; QA</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Clean GitHub repository, zero vendor lock-in, and post-launch support.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Live Cyberpunk Developer Console Widget */}
              <div className="glass-card p-5" data-tilt>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="font-mono text-[11px] text-slate-400 ml-2">saurav@portfolio:~$ --specs</span>
                  </div>
                  <span className="status-badge status-live text-[9px] py-0.5 px-2">Online</span>
                </div>

                <div className="font-mono text-xs space-y-2 py-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Status:</span>
                    <span className="text-emerald-400 font-bold">● Available (Remote)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Timezone:</span>
                    <span className="text-cyan-300">UTC+5:45 (Nepal)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Response SLA:</span>
                    <span className="text-purple-300">&lt; 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Iteration Cycle:</span>
                    <span className="text-white">Daily Staging Demos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Direct Chat:</span>
                    <span className="text-emerald-400 font-semibold">WhatsApp &amp; Telegram</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Contract Ready</span>
                  <button
                    type="button"
                    onClick={handleCopySpecs}
                    className="text-[11px] font-mono text-cyan-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSpecs ? '✓ Specs Copied!' : 'Copy Dev Specs'}</span>
                  </button>
                </div>
              </div>

              {/* Card 5: Verified Achievements & Credential Spotlight */}
              <div className="glass-card p-5" data-tilt>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-300">🏆 Verified Credentials</span>
                  <span className="status-badge status-live text-[9px] py-0.5 px-2">Verified</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                    <div className="text-lg">🥇</div>
                    <div>
                      <div className="font-heading text-xs font-bold text-white">First Runner-Up — Web Design Hackathon 2026</div>
                      <div className="text-[10px] text-amber-300/90 font-mono mt-0.5">NIT LEGEND &amp; Butwal City • Trophy Winner</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                    <div className="text-lg">🎓</div>
                    <div>
                      <div className="font-heading text-xs font-bold text-white">Harvard University CS50x Alum</div>
                      <div className="text-[10px] text-purple-300/90 font-mono mt-0.5">Computer Science &amp; Full-Stack Engineering</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/about#certifications"
                  className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-300 hover:text-white transition group"
                >
                  <span>Inspect Verified Certificates</span>
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>

              {/* Card 6: Fast-Track Consultation Callout Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-midnight to-cyan-950/40 border border-purple-500/30 space-y-4" data-tilt>
                <div className="flex items-center justify-between">
                  <span className="eyebrow-badge">
                    <span className="eyebrow-dot"></span>
                    <span>INSTANT CONSULTATION</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400">● Live</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">Have a Project in Mind?</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Send a quick project brief directly on WhatsApp for instant turnaround estimation and scope discussion.
                  </p>
                </div>
                <div className="space-y-2.5 pt-1">
                  <a
                    href="https://wa.me/9779766271244?text=Hi%20Saurav,%20I%20am%20interested%20in%20discussing%20a%20project%20scope."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-xs py-3"
                    data-magnetic
                  >
                    <span>Chat on WhatsApp (+977 9766271244)</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <Link
                    href="/hire"
                    className="btn-secondary w-full justify-center text-xs py-2.5"
                  >
                    <span>Fast-Track Hire Me Page →</span>
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </section>
      </main>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}

