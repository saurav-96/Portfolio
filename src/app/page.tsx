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
  Layers,
  Cpu,
  Palette,
  Globe,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Portrait360 from '@/components/3d/Portrait360';
import FeaturedProjectsCarousel from '@/components/home/FeaturedProjectsCarousel';

export default function HomePage() {
  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      {/* ===================================================================
          SECTION 1: HERO SECTION (SPLIT-SCREEN WITH 360° PORTRAIT)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow-badge">
                <span className="eyebrow-dot" />
                <span>DESIGN • DEVELOP • INNOVATE</span>
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl xl:text-[3.75rem] font-bold tracking-tight text-white leading-[1.09]">
              Hi, I'm Saurav Bhusal.<br />
              I turn ideas into <span className="text-gradient">intuitive, impactful</span> digital experiences.
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              I design and develop modern digital products, combining thoughtful UI/UX, creative frontend engineering, and emerging AI technologies.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/projects" className="btn-primary">
                <span>Explore My Work</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="btn-secondary">
                <span>Let's Work Together</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* Authentic Availability Indicator */}
            <div className="inline-flex items-center gap-2.5 pt-1 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for remote freelance projects &amp; international collaborations</span>
            </div>
          </div>

          {/* Right Column: 360° Interactive Portrait Showcase */}
          <div className="lg:col-span-5">
            <div className="hero-portrait-stage relative flex items-center justify-center">
              <div className="portrait-glow-aura" aria-hidden="true" />
              <div className="portrait-frame relative z-10 w-full max-w-[440px]">
                <Portrait360 />
              </div>
              <div className="neon-orbit-ring" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Credibility & Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <Link href="/projects" className="glass-card p-4 flex items-center gap-4 group hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-base group-hover:text-cyan-300 transition">
                7+ Live &amp; Lab Projects
              </div>
              <div className="text-xs text-slate-300">Web Apps, MV3 &amp; UI/UX</div>
            </div>
          </Link>

          <Link href="/about#achievements" className="glass-card p-4 flex items-center gap-4 group hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-base group-hover:text-purple-300 transition">
                1st Runner-Up
              </div>
              <div className="text-xs text-slate-300">Web Design Hackathon (NIT LEGEND)</div>
            </div>
          </Link>

          <Link href="/about#achievements" className="glass-card p-4 flex items-center gap-4 group hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-600/15 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-base group-hover:text-amber-300 transition">
                6 Verified Credentials
              </div>
              <div className="text-xs text-slate-300">Harvard CS50x &amp; freeCodeCamp</div>
            </div>
          </Link>

          <Link href="/contact" className="glass-card p-4 flex items-center gap-4 group hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-600/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-base group-hover:text-emerald-300 transition">
                Global Freelancer
              </div>
              <div className="text-xs text-slate-300">Upwork, Fiverr &amp; Freelancer</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: FEATURED PROJECT SHOWCASE (ANIMATED CAROUSEL)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <FeaturedProjectsCarousel />
      </section>

      {/* ===================================================================
          SECTION 3: CREATIVE PHILOSOPHY (4-COLUMN BENTO)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>CREATIVE PHILOSOPHY</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            My <span className="text-gradient">Potential</span> &amp; Approach
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            "Turning ideas into intuitive, meaningful, and impactful digital experiences."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-purple-400">01 / CONCEPT</span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 mb-2.5">Innovative Design Thinking</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Approaching every interface with fresh visual exploration—combining clean editorial hierarchy, subtle motion, and purposeful layouts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              Visual Clarity • Aesthetic Direction
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-cyan-400">02 / EMPATHY</span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 mb-2.5">User-Centered Approach</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Designing around real human behavior—prioritizing intuitive navigation, accessible contrast, and frictionless journeys across devices.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              Intuitive Flows • Accessibility
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/25 to-purple-600/15 border border-indigo-400/40 text-indigo-300 flex items-center justify-center mb-5">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-indigo-300">03 / EXECUTION</span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 mb-2.5">Design + Development Mindset</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bridging the gap between Figma prototypes and clean frontend code so design intent is preserved down to every micro-interaction.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              Figma to Code • Interactive Web
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-600/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-emerald-400">04 / EVOLUTION</span>
              <h3 className="font-heading text-lg font-bold text-white mt-1 mb-2.5">Continuous Learning &amp; Long-Term Impact</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Continuously experimenting with Three.js, modern frontend workflows, and AI automation to build forward-looking digital products.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
              Curiosity • Growth Mindset
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: SERVICES PREVIEW
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/services#web-development" className="glass-card p-6 group block hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-600/15 border border-purple-400/40 text-purple-300 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition">Web Development</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Responsive websites, modern landing pages, React apps, and interactive Three.js web experiences.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#ui-ux-design" className="glass-card p-6 group block hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition">UI/UX Design</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Website UI design, mobile interfaces, Figma wireframes, interactive prototypes, and design systems.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#ai-automation" className="glass-card p-6 group block hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/25 to-purple-600/15 border border-indigo-400/40 text-indigo-300 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition">AI Automation</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Python automation scripts, AI-assisted workflows, browser automation, and custom productivity tools.
            </p>
            <span className="text-xs font-mono text-cyan-300 inline-flex items-center gap-1">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link href="/services#graphic-design" className="glass-card p-6 group block hover:-translate-y-1 transition-all">
            <div className="icon-box w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-purple-600/15 border border-pink-400/40 text-pink-300 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition">Graphic Design</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
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
              <p className="text-slate-300 text-base sm:text-lg">
                Let's turn your vision into something extraordinary.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/hire" className="btn-primary text-base px-7 py-3.5 inline-flex items-center gap-2">
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm px-5 py-3.5 inline-flex items-center gap-2"
              >
                <span>Hire on Upwork</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
