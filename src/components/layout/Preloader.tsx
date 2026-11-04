'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [progress, setProgress] = useState(25);
  const [status, setStatus] = useState('Loading environment...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const isSubsequentVisit = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_visited') === 'true';
    const targetDuration = isSubsequentVisit ? 220 : 450;
    const startTime = performance.now();

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
        sessionStorage.setItem('portfolio_visited', 'true');

        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 500);
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="site-preloader"
      className={`site-preloader fixed inset-0 z-[999] flex flex-col items-center justify-center bg-obsidian transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-0 pointer-events-none -translate-y-6' : 'opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Glowing Logo Monogram */}
        <div className="relative w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-br from-cyan-400 via-purple-500 to-indigo-600 animate-pulse shadow-[0_0_40px_rgba(168,85,247,0.5)]">
          <div className="w-full h-full rounded-[14px] bg-obsidian flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/images/saurav-logo.png"
              alt="Saurav Bhusal Logo"
              width={52}
              height={52}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Progress bar and counter */}
        <div className="w-56 space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              id="preloader-progress-bar"
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span id="preloader-status-text">{status}</span>
            <span className="text-cyan-300 font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
