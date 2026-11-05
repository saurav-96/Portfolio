'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, ArrowUpRight, MapPin, Clock, Award, ExternalLink, Sparkles } from 'lucide-react';
import { getAssetPath } from '@/lib/assets';

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('sauravbhusal2008@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
    }
  };

  // Silky-smooth buttery transition back to top with zero initial stutter
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const lenis = (window as any).portfolioLenis;

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      const startY = window.scrollY || document.documentElement.scrollTop;
      const startTime = performance.now();
      const duration = 1600;
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animateScroll = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / duration;
        if (elapsed < 1) {
          window.scrollTo(0, startY * (1 - easeInOutCubic(elapsed)));
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, 0);
        }
      };
      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-gradient-to-b from-[#0a0b18]/80 to-[#04050d] text-slate-200 overflow-hidden font-sans">
      {/* Decorative ambient gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* TOP CALLOUT BAR: HIGH-IMPACT COLLABORATION BANNER */}
        <div className="mb-14 p-6 sm:p-9 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans font-medium tracking-wide bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/30 text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Available for Q2 &amp; Q3 2026 Projects</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Have a project in mind? Let&apos;s build something exceptional.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Whether it&apos;s a 3D WebGL web experience, a full-stack Next.js web application, or a high-converting UI/UX design system — I&apos;m ready to collaborate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <Link
                href="/hire"
                prefetch={true}
                className="btn-primary text-sm px-6 py-3 justify-center text-center"
                data-magnetic
              >
                <span>Fast-Track Hire</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary text-xs sm:text-sm px-4 sm:px-5 py-3 cursor-pointer justify-center text-center"
                data-magnetic
                aria-label="Copy Saurav's direct email to clipboard"
              >
                <span>{copiedEmail ? '✓ Copied to Clipboard!' : 'Copy Direct Email'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-COLUMN ARCHITECTURAL HIERARCHY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Identity & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" prefetch={true} className="inline-flex items-center gap-3 group" aria-label="Saurav Bhusal Home">
              <div className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center">
                <Image
                  src={getAssetPath('/assets/images/saurav-logo.png')}
                  alt="Saurav Bhusal Avatar"
                  width={44}
                  height={44}
                  className="w-full h-full rounded-full object-cover bg-midnight"
                />
              </div>
              <div>
                <div className="font-sans text-lg font-bold text-white tracking-wider">
                  SAURAV<span className="text-purpleNeon">.</span>
                </div>
                <div className="font-sans text-xs text-cyan-300 font-medium">Creative Technologist &amp; Developer</div>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-sm">
              Computer science student and creative developer bridging cutting-edge 3D WebGL interfaces, fluid motion engineering, and production Next.js architectures.
            </p>

            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-sans font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Active &amp; Ready for Contract Engagements</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-sans">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Kapilvastu &amp; Butwal, Nepal</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>UTC+5:45 Timezone</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Site Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-sans text-sm font-medium">
              <li>
                <Link href="/" prefetch={true} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" prefetch={true} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Projects (7)
                </Link>
              </li>
              <li>
                <Link href="/services" prefetch={true} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={getAssetPath('/assets/documents/Saurav-Bhusal-CV.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-xs pt-1"
                >
                  <span>Resume / CV</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Credentials & Recognition (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
              Accreditation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
              <li>
                <a
                  href="https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 group flex items-start gap-1.5 transition-colors font-medium"
                >
                  <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:text-cyan-400" />
                  <span>Harvard CS50x Graduate</span>
                </a>
              </li>
              <li>
                <Link href="/about#awards" prefetch={true} className="hover:text-cyan-300 group flex items-start gap-1.5 transition-colors font-medium">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:text-cyan-400" />
                  <span>1st Runner-Up Hackathon</span>
                </Link>
              </li>
              <li className="text-slate-400 text-xs pt-1 leading-relaxed">
                Computer Science Major • Oxford College
              </li>
              <li className="text-slate-400 text-xs leading-relaxed">
                TubeKit Chrome Extension • CS50x Finalist
              </li>
            </ul>
          </div>

          {/* Column 4: Collaboration & Platforms (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
              Platforms &amp; Hire
            </h3>

            <div className="space-y-3.5">
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://github.com/saurav-96"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-all font-sans font-medium"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/saurav-b-502352415/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300 hover:text-white border border-cyan-500/30 transition-all font-sans font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/all_saurav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Twitter Profile"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-all font-sans font-medium"
                >
                  X
                </a>
                <a
                  href="https://wa.me/9779766271244"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Direct Message"
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all font-sans font-medium"
                >
                  WhatsApp
                </a>
                <a
                  href="https://t.me/+9779766271244"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Direct Message"
                  className="px-3 py-1.5 rounded-lg bg-sky-950/30 hover:bg-sky-900/50 text-sky-300 hover:text-white border border-sky-500/30 transition-all font-sans font-medium"
                >
                  Telegram
                </a>
              </div>

              <div className="pt-1">
                <div className="font-sans text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Escrow Verified Profiles:
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Upwork Profile"
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-all font-sans font-medium flex items-center gap-1"
                  >
                    <span>Upwork</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                  <a
                    href="https://www.fiverr.com/sellers/saurav_bhusal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fiverr Profile"
                    className="px-3 py-1.5 rounded-lg bg-[#1DBF73]/15 hover:bg-[#1DBF73]/25 text-[#1DBF73] border border-[#1DBF73]/35 transition-all font-sans font-medium flex items-center gap-1"
                  >
                    <span>Fiverr</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#1DBF73]" />
                  </a>
                  <a
                    href="https://www.freelancer.com/u/sauravb369"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Freelancer Profile"
                    className="px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 transition-all font-sans font-medium flex items-center gap-1"
                  >
                    <span>Freelancer</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA & BACK TO TOP BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-300 font-medium">
              © {new Date().getFullYear()} Saurav Bhusal. High-Performance Creative Engineering.
            </p>
            <p className="text-slate-500 text-[11px]">
              Kapilvastu &amp; Butwal, Nepal • Available Worldwide for Remote Roles
            </p>
          </div>

          <button
            type="button"
            data-back-to-top
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-xs text-slate-200 bg-white/[0.06] hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer active:scale-95 shadow-sm group"
            aria-label="Smooth scroll back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
