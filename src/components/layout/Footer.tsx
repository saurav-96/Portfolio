'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-midnight/60 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="brand-logo text-base flex items-center gap-2 group">
            <div className="brand-logo-frame w-9 h-9 rounded-xl p-0.5 bg-gradient-to-r from-cyan-400 to-purple-600">
              <div className="w-full h-full rounded-[10px] bg-obsidian flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/images/saurav-logo.png"
                  alt="Saurav Bhusal Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="font-heading font-bold text-white tracking-wide">
              SAURAV<span className="text-purple-400">.</span>
            </span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-400 font-mono">Design • Develop • Innovate</span>
        </div>

        {/* Live status badge & actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Active &amp; Ready for Contracts (UTC+5:45)</span>
          </div>

          <Link
            href="/hire"
            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet transition-all"
          >
            <span>Fast-Track Hire</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 transition cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <span className="text-cyan-400" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>

      {/* Navigation routes & social escrow channels */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <ul className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-medium">
          <li>
            <Link href="/" className="hover:text-white transition">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white transition">About</Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-white transition">Projects</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-white transition">Services</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </li>
          <li>
            <a href="/assets/documents/Saurav-Bhusal-CV.html" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              Resume / CV
            </a>
          </li>
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs text-slate-400">
          <a href="https://github.com/saurav-96" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
          <a href="https://www.linkedin.com/in/saurav-b-502352415/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">LinkedIn</a>
          <a href="https://www.instagram.com/sauravbhusal_96/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">Instagram</a>
          <a href="https://www.facebook.com/saurav.bhusal.148" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Facebook</a>
          <a href="https://x.com/all_saurav" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">X</a>
          <a href="https://wa.me/9779766271244" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">WhatsApp</a>
          <a href="https://t.me/+9779766271244" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">Telegram</a>
          <span className="text-white/20">|</span>
          <a href="https://www.upwork.com/freelancers/~010a6e73c111779a15" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">Upwork</a>
          <a href="https://www.fiverr.com/sellers/saurav_bhusal" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DBF73] transition">Fiverr</a>
          <a href="https://www.freelancer.com/u/sauravb369" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition">Freelancer</a>
        </div>
      </div>

      {/* Copyright & Location Credits */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 Saurav Bhusal. Engineered with Next.js App Router, React 19, Three.js &amp; GSAP.</p>
        <p className="font-mono text-[11px] text-slate-400">Kapilvastu &amp; Butwal, Nepal 🇳🇵 • Available Worldwide (Remote)</p>
      </div>
    </footer>
  );
}
