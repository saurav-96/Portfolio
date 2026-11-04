'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          setIsScrolled(scrollY > 28);

          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const progress = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change or ESC
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Precision Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 z-[100] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress.toFixed(2)}%` }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={`navbar-glass max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl pointer-events-auto transition-all duration-300 ${
            isScrolled ? 'scrolled shadow-2xl backdrop-blur-2xl' : ''
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo Mark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl"
            aria-label="Saurav Bhusal — Home"
          >
            <div className="relative w-10 h-10 rounded-xl p-0.5 bg-gradient-to-br from-cyan-400 via-purple-500 to-indigo-600 transition-transform duration-300 group-hover:scale-105 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-obsidian flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/images/saurav-logo.png"
                  alt="Saurav Bhusal Monogram Logo"
                  width={36}
                  height={36}
                  priority
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                Saurav Bhusal
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] tracking-widest text-emerald-400 font-semibold uppercase">
                  AVAILABLE
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-2 py-1 rounded-full backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'active bg-gradient-to-r from-purple-600/40 to-cyan-600/30 text-white font-semibold shadow-inner border border-purple-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/hire"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-violet hover:shadow-[0_0_25px_rgba(168,85,247,0.65)] hover:-translate-y-0.5"
            >
              <span>Hire Me</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">↗</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-nav-drawer"
          className={`mobile-nav-drawer max-w-7xl mx-auto mt-2 p-5 rounded-2xl bg-midnight/95 border border-purple-500/30 backdrop-blur-2xl transition-all duration-300 md:hidden pointer-events-auto shadow-2xl ${
            isMobileOpen ? 'open opacity-100 translate-y-0 block' : 'opacity-0 -translate-y-4 pointer-events-none hidden'
          }`}
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col gap-1.5 mb-4">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'active bg-purple-900/40 border border-purple-400/40 text-cyan-300 font-semibold'
                        : 'text-slate-200 hover:bg-white/[0.05]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/hire"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-heading text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet text-center"
          >
            <span>Hire Me</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>
    </>
  );
}
