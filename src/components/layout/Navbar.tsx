'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <header className="navbar-wrap">
      <nav className="navbar-glass" aria-label="Primary Navigation">
        <Link href="/" className="brand-logo" aria-label="Saurav Bhusal Home">
          <div className="brand-logo-frame">
            <Image
              src="/assets/images/saurav-logo.png"
              alt="Saurav Bhusal Logo"
              className="brand-logo-img"
              width={38}
              height={38}
              priority
            />
          </div>
          <span>
            SAURAV<span className="text-purpleNeon">.</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AVAILABLE
          </span>
        </Link>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                data-nav-page={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/hire" className="btn-primary btn-nav-cta nav-cta-desktop" data-magnetic>
            <span>Hire Me</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            id="mobile-menu-toggle"
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? (
              <svg className="icon-close w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="icon-menu w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Responsive Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${isMobileOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation"
        style={{ display: isMobileOpen ? 'block' : 'none' }}
      >
        <ul className="flex flex-col gap-1.5 mb-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link w-full ${isActive(item.href) ? 'active' : ''}`}
                data-nav-page={item.href}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/hire" className="btn-primary w-full justify-center" onClick={() => setIsMobileOpen(false)}>
          <span>Hire Me</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
