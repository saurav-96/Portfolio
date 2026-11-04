'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Intercept clicks on same-origin navigation links to trigger instant zero-latency feedback
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.target === '_blank' ||
        target.hasAttribute('download')
      ) {
        return;
      }

      try {
        const nextUrl = new URL(href, window.location.href);
        if (nextUrl.origin === window.location.origin && nextUrl.pathname !== window.location.pathname) {
          setIsNavigating(true);
          setProgress(25);

          // Fast increment while route transitions
          setTimeout(() => setProgress((p) => (p > 0 ? 65 : 0)), 80);
          setTimeout(() => setProgress((p) => (p > 0 ? 85 : 0)), 220);
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    return () => document.removeEventListener('click', handleLinkClick, { capture: true });
  }, []);

  // When pathname changes, complete navigation bar smoothly
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] h-[2.5px] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_#22d3ee,0_0_20px_#a855f7] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 0.15s ease-out, opacity 0.25s ease-out' : 'width 0.25s ease-out',
        }}
      />
    </div>
  );
}
