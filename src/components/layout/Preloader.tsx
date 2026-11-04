'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [progress, setProgress] = useState(25);
  const [status, setStatus] = useState('Loading environment...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSubsequentVisit = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited') === 'true';
    const targetDuration = prefersReducedMotion ? 50 : (isSubsequentVisit ? 180 : 380);
    const startTime = performance.now();

    const triggerReady = () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('page-ready');
        document.body.classList.add('page-ready');
      }
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    };

    // Safety timeout to ensure page-ready is never blocked
    const safetyTimer = setTimeout(triggerReady, 500);

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progressFraction = Math.min(1, elapsed / targetDuration);
      const computed = Math.floor(progressFraction * 100);

      setProgress((prev) => Math.max(prev, computed));
      if (computed > 80) setStatus('Ready');
      else if (computed > 50) setStatus('Synchronizing 3D scene...');

      if (elapsed >= targetDuration) {
        clearInterval(interval);
        setProgress(100);
        setStatus('Ready');
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('portfolio_visited', 'true');
        }

        setTimeout(() => {
          setIsLoaded(true);
          triggerReady();
          setTimeout(() => {
            setShouldRender(false);
          }, 400);
        }, 100);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="site-preloader"
      className={`site-preloader ${isLoaded ? 'is-loaded' : ''}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="preloader-core">
        <div className="preloader-logo-ring">
          <Image
            src="/assets/images/saurav-logo.png"
            alt="Saurav Logo"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
            priority
          />
        </div>
        <div className="preloader-brand-title font-heading">
          SAURAV<span className="text-purpleNeon">.</span>
        </div>
        <div className="preloader-bar-wrap">
          <div
            id="preloader-progress-bar"
            className="preloader-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div id="preloader-status-text" className="preloader-status font-mono">
          {status}
        </div>
      </div>
    </div>
  );
}
