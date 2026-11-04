import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderGit2,
  Award,
  ShieldCheck,
  Globe2,
  Lightbulb,
  Users,
  Code2,
  Sparkles,
  Globe,
  Layers,
  Cpu,
  Palette,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import Portrait360 from '@/components/3d/Portrait360';
import FeaturedProjectsCarousel from '@/components/home/FeaturedProjectsCarousel';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Saurav Bhusal — Creative Web Developer & UI/UX Designer',
  description:
    'Portfolio of Saurav Bhusal — Creative Web Developer, UI/UX Designer, and AI Automation Enthusiast turning ideas into intuitive, impactful digital experiences.',
  canonical: '/',
});

export default function HomePage() {
  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      {/* ===================================================================
           SECTION 1: HERO SECTION (SPLIT-SCREEN LAYOUT — CLEAN PORTRAIT STAGE)
           =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div data-hero-reveal>
              <span className="eyebrow-badge">
                <span className="eyebrow-dot" />
                <span>DESIGN • DEVELOP • INNOVATE</span>
              </span>
            </div>

            <h1
              data-hero-reveal
              className="font-heading text-4xl sm:text-5xl xl:text-[3.75rem] font-bold tracking-tight text-white leading-[1.09]"
            >
              Hi, I'm Saurav Bhusal.
              <br />
              I turn ideas into <span className="text-gradient">intuitive, impactful</span> digital experiences.
            </h1>

            <p data-hero-reveal className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-body">
              I design and develop modern digital products, combining thoughtful UI/UX, creative frontend engineering, and emerging AI technologies.
            </p>

            <div data-hero-reveal className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/projects" className="btn-primary" data-magnetic>
                <span>Explore My Work</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="btn-secondary" data-magnetic>
                <span>Let's Work Together</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* Secondary Element: Authentic Availability Indicator */}
            <div data-hero-reveal className="inline-flex items-center gap-2.5 pt-1 text-xs sm:text-sm text-slate-300 font-medium font-body">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for remote freelance projects &amp; international collaborations</span>
            </div>
          </div>

          {/* Right Column: Clean Unobstructed Portrait Stage + Dual Studio Rim Lighting */}
          <div className="lg:col-span-5" data-hero-reveal>
            <div className="hero-portrait-stage" data-tilt data-tilt-max="4">
              <div className="portrait-glow-aura" aria-hidden="true" />
              <div className="portrait-frame">
                <Portrait360 />
              </div>
              <div className="neon-orbit-ring" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Credibility & Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 home-credibility-strip" data-reveal-group>
          <Link
            href="/projects"
            className="glass-card p-4 flex items-center justify-between gap-3 group h-full min-h-[82px] border border-white/10 hover:border-cyan-400/40 transition-all shadow-md"
            data-reveal-item
            data-tilt
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-sans font-bold text-white text-[15px] tracking-tight group-hover:text-cyan-300 transition-colors truncate">
                  7+ Live &amp; Lab Projects
                </div>
                <div className="font-sans text-[12px] text-slate-400 font-medium tracking-wide truncate">
                  Web Apps, MV3 &amp; UI/UX
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/about#achievements"
            className="glass-card p-4 flex items-center justify-between gap-3 group h-full min-h-[82px] border border-white/10 hover:border-purple-400/40 transition-all shadow-md"
            data-reveal-item
            data-tilt
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-sans font-bold text-white text-[15px] tracking-tight group-hover:text-purple-300 transition-colors truncate">
                  1st Runner-Up
                </div>
                <div className="font-sans text-[12px] text-slate-400 font-medium tracking-wide truncate">
                  Web Design Hackathon 2026
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/about#achievements"
            className="glass-card p-4 flex items-center justify-between gap-3 group h-full min-h-[82px] border border-white/10 hover:border-amber-400/40 transition-all shadow-md"
            data-reveal-item
            data-tilt
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-600/15 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-sans font-bold text-white text-[15px] tracking-tight group-hover:text-amber-300 transition-colors truncate">
                  6 Verified Credentials
                </div>
                <div className="font-sans text-[12px] text-slate-400 font-medium tracking-wide truncate">
                  Harvard CS50x &amp; freeCodeCamp
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/contact"
            className="glass-card p-4 flex items-center justify-between gap-3 group h-full min-h-[82px] border border-white/10 hover:border-emerald-400/40 transition-all shadow-md"
            data-reveal-item
            data-tilt
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-600/15 border border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-sans font-bold text-white text-[15px] tracking-tight group-hover:text-emerald-300 transition-colors truncate">
                  Global Freelancer
                </div>
                <div className="font-sans text-[12px] text-slate-400 font-medium tracking-wide truncate">
                  Upwork, Fiverr &amp; Freelancer
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>
        </div>
      </section>

      {/* ===================================================================
           SECTION 2: FEATURED PROJECT SHOWCASE (CUSTOM SHOWCASE THUMBNAILS)
           =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-reveal-group>
        <FeaturedProjectsCarousel />
      </section>

      {/* ===================================================================
           SECTION 3: CREATIVE PHILOSOPHY (4-COLUMN BENTO)
           =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-reveal-group>
        <div className="max-w-2xl mb-10" data-reveal-item>
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>CREATIVE PHILOSOPHY</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            My <span className="text-gradient">Potential</span> &amp; Approach
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-body">
            "Turning ideas into intuitive, meaningful, and impactful digital experiences."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 home-philosophy-grid">
          {/* Pillar 1 */}
          <div className="glass-card p-6 flex flex-col justify-between h-full min-h-[350px] border border-white/10 hover:border-purple-400/35 transition-all shadow-lg" data-reveal-item data-tilt>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)] flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className="font-sans text-[11px] font-semibold tracking-wider text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2.5 py-1 rounded-full">
                  Concept & Vision
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                Innovative Design Thinking
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Approaching every interface with fresh visual exploration—combining clean editorial hierarchy, subtle motion, and purposeful layouts.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/10 flex flex-wrap gap-1.5 font-sans text-[11px] font-medium">
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">Visual Clarity</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-950/30 border border-purple-500/20 text-purple-300">Aesthetic Direction</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-6 flex flex-col justify-between h-full min-h-[350px] border border-white/10 hover:border-cyan-400/35 transition-all shadow-lg" data-reveal-item data-tilt>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="font-sans text-[11px] font-semibold tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                  User Centricity
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                User-Centered Approach
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Designing around real human behavior—prioritizing intuitive navigation, accessible contrast, and frictionless journeys across devices.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/10 flex flex-wrap gap-1.5 font-sans text-[11px] font-medium">
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">Intuitive Flows</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-cyan-300">Accessibility</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-6 flex flex-col justify-between h-full min-h-[350px] border border-white/10 hover:border-indigo-400/35 transition-all shadow-lg" data-reveal-item data-tilt>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-purple-600/15 border border-indigo-400/40 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)] flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="font-sans text-[11px] font-semibold tracking-wider text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                  Design & Code
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                Design + Development Mindset
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Bridging the gap between Figma prototypes and clean frontend code so design intent is preserved down to every micro-interaction.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/10 flex flex-wrap gap-1.5 font-sans text-[11px] font-medium">
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">Figma to Code</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-950/30 border border-indigo-500/20 text-indigo-300">Interactive Web</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card p-6 flex flex-col justify-between h-full min-h-[350px] border border-white/10 hover:border-emerald-400/35 transition-all shadow-lg" data-reveal-item data-tilt>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="icon-box w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-600/15 border border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-sans text-[11px] font-semibold tracking-wider text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Continuous Growth
                </span>
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                Continuous Learning &amp; Long-Term Impact
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Continuously experimenting with Three.js, modern frontend workflows, and AI automation to build forward-looking digital products.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-white/10 flex flex-wrap gap-1.5 font-sans text-[11px] font-medium">
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">Curiosity</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">Growth Mindset</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 4: SERVICES PREVIEW (4 COMPACT SERVICE CARDS)
           =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-reveal-group>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10" data-reveal-item>
          <div>
            <span className="eyebrow-badge mb-3">
              <span className="eyebrow-dot" />
              <span>FREELANCE CAPABILITIES</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Services <span className="text-gradient">Preview</span>
            </h2>
          </div>
          <Link href="/services" className="btn-secondary text-sm self-start sm:self-auto">
            <span>Explore Full Services</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 home-services-grid">
          <Link href="/services#web-development" className="glass-card p-6 group block" data-reveal-item data-tilt>
            <div className="icon-box w-12 h-12 bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition">Web Development</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 font-body">
              Responsive websites, modern landing pages, React apps, and interactive Three.js web experiences.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#ui-ux-design" className="glass-card p-6 group block" data-reveal-item data-tilt>
            <div className="icon-box w-12 h-12 bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition">UI/UX Design</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 font-body">
              Website UI design, mobile interfaces, Figma wireframes, interactive prototypes, and design systems.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#ai-automation" className="glass-card p-6 group block" data-reveal-item data-tilt>
            <div className="icon-box w-12 h-12 bg-gradient-to-br from-indigo-500/25 to-purple-600/15 border border-indigo-400/40 text-indigo-300 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition">AI Automation</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 font-body">
              Python automation scripts, AI-assisted workflows, browser automation, and custom productivity tools.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#graphic-design" className="glass-card p-6 group block" data-reveal-item data-tilt>
            <div className="icon-box w-12 h-12 bg-gradient-to-br from-pink-500/25 to-purple-600/15 border border-pink-400/40 text-pink-300 mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition">Graphic Design</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 font-body">
              YouTube thumbnails, logo concepts, brand identity explorations, posters, and social media visuals.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ===================================================================
           SECTION 5: CLOSING CTA BANNER
           =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6" data-reveal-group>
        <div className="glass-card p-8 sm:p-12 relative overflow-hidden home-cta-card" data-reveal-item>
          <div className="absolute -right-16 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600/35 via-cyan-500/25 to-transparent blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-purple-300 font-mono text-xs uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AVAILABLE FOR FREELANCE &amp; COLLABORATION</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
                Have an idea worth building?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-body">
                Let's turn your vision into something extraordinary.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/hire" className="btn-primary text-base px-7 py-3.5" data-magnetic>
                <span>Contact Me</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-5 py-3.5"
                data-magnetic
              >
                <span>Hire on Upwork</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
