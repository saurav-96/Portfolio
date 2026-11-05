'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, Menu, X } from 'lucide-react';
import { getAssetPath } from '@/lib/assets';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
    setNavigatingTo(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const isItemActive = (href: string) => {
    const activeRoute = navigatingTo !== null ? navigatingTo : pathname;
    if (href === '/') return activeRoute === '/';
    return activeRoute.startsWith(href);
  };

  // Butter-smooth slide all the way to the bottom of the page
  const scrollToBottom = () => {
    if (typeof window === 'undefined') return;
    const lenis = (window as any).portfolioLenis;
    const targetY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo('bottom', {
        duration: 1.8,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      const startY = window.scrollY || document.documentElement.scrollTop;
      const distance = targetY - startY;
      const startTime = performance.now();
      const duration = 1600;
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animateScroll = (currentTime: number) => {
        const elapsed = (currentTime - startTime) / duration;
        if (elapsed < 1) {
          window.scrollTo(0, startY + distance * easeInOutCubic(elapsed));
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetY);
        }
      };
      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] lg:hidden pointer-events-auto transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="navbar-wrap fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 transition-all duration-300 pointer-events-none font-sans">
        <nav
          className={`navbar-glass mx-auto max-w-7xl flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 pointer-events-auto border ${
            isScrolled
              ? 'bg-[#080914]/90 backdrop-blur-2xl border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(168,85,247,0.12)]'
              : 'bg-[#0a0b18]/75 backdrop-blur-xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.1)]'
          }`}
          aria-label="Primary Navigation"
        >
          {/* Brand Identity & Small Delicate Down Arrow Button */}
          <div className="brand-logo flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Link
              href="/"
              prefetch={true}
              className="flex items-center gap-1.5 sm:gap-2.5 group"
              aria-label="Saurav Bhusal Home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src={getAssetPath('/assets/images/saurav-logo.png')}
                  alt="Saurav Bhusal Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full rounded-full object-cover bg-midnight"
                />
              </div>
              <span className="font-sans font-bold text-sm sm:text-lg tracking-tight text-white whitespace-nowrap">
                SAURAV<span className="text-purpleNeon">.</span>
              </span>
            </Link>

            {/* Small Delicate Down Arrow Button */}
            <button
              type="button"
              onClick={scrollToBottom}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/50 shadow-sm transition-all duration-300 active:scale-90 group cursor-pointer shrink-0"
              aria-label="Smooth scroll all the way to page bottom"
              title="Scroll to Bottom"
            >
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
            </button>
          </div>

          {/* Desktop Navigation Links — Centered Text, Spaced Comfortably, Active Cyan Border & Purple Glow */}
          <ul className="nav-links hidden lg:flex items-center gap-1.5 bg-[#0a0b18]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={() => setNavigatingTo(item.href)}
                    className={`relative px-4 xl:px-5 py-2 rounded-full text-[13px] xl:text-[14px] font-sans border-[2px] transition-all duration-300 ease-out flex items-center justify-center text-center select-none ${
                      active
                        ? 'text-white font-bold bg-gradient-to-r from-[#3b185f]/95 via-[#4c1d95]/90 to-[#1e1b4b]/85 border-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.5)]'
                        : 'border-transparent bg-transparent text-slate-300 font-medium hover:text-white'
                    }`}
                    data-nav-page={item.href}
                  >
                    <span className="inline-block text-center">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="hidden sm:inline-flex shrink-0">
              <Link
                href="/hire"
                prefetch={true}
                className="btn-primary py-1.5 px-3 sm:py-2 sm:px-5 text-xs font-sans font-bold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all items-center gap-1.5 whitespace-nowrap"
                data-magnetic
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <button
              id="mobile-menu-toggle"
              type="button"
              className="lg:hidden p-2 rounded-full text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer w-9 h-9 flex items-center justify-center shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Responsive Mobile & Tablet Drawer */}
        {isMobileOpen && (
          <div
            id="mobile-nav-drawer"
            className="mobile-nav-drawer open lg:hidden mx-auto max-w-lg mt-2.5 p-4 sm:p-5 rounded-3xl bg-[#0a0b18]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(168,85,247,0.15)] pointer-events-auto font-sans animate-fadeIn"
          >
            <ul className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={() => {
                        setNavigatingTo(item.href);
                        setIsMobileOpen(false);
                      }}
                      className={`px-4 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-sans flex items-center justify-between transition-all ${
                        active
                          ? 'text-white font-bold bg-gradient-to-r from-[#3b185f]/95 via-[#4c1d95]/90 to-[#1e1b4b]/85 border border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.35)]'
                          : 'text-slate-300 font-medium hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Drawer CTA Button */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Link
                href="/hire"
                prefetch={true}
                onClick={() => {
                  setNavigatingTo('/hire');
                  setIsMobileOpen(false);
                }}
                className="btn-primary w-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-sans font-bold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-1.5"
              >
                <span>Hire Me / Fast-Track Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Status Badge */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Remote Work
                </span>
                <span>Nepal (UTC+5:45)</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
