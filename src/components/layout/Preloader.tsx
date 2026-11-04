'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Environment...');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetDuration = prefersReducedMotion ? 80 : 680;
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

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progressFraction = Math.min(1, elapsed / targetDuration);
      const computed = Math.floor(progressFraction * 100);

      setProgress(computed);

      if (computed >= 100) {
        clearInterval(interval);
        setStatus('Ready');
        setProgress(100);

        // Preloader only unlocks when it has fully reached 100%
        setTimeout(() => {
          setIsLoaded(true);
          triggerReady();
          setTimeout(() => {
            setShouldRender(false);
          }, 350);
        }, 100);
      } else if (computed > 75) {
        setStatus('Optimizing Shaders...');
      } else if (computed > 35) {
        setStatus('Loading Visual Assets...');
      }
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="site-preloader"
      className={`site-preloader fixed inset-0 z-[99999] bg-[#05060d] flex flex-col items-center justify-center transition-all duration-400 ease-out ${
        isLoaded ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 360px at 50% 50%, rgba(168, 85, 247, 0.16) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm px-6">
        {/* FAST, SMOOTH HOLOGRAPHIC GYROSCOPIC CORE */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Cyan Orbital Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/70 animate-spin"
            style={{
              animationDuration: '3.2s',
              transform: 'perspective(600px) rotateX(65deg) rotateY(15deg)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
            }}
          >
            <span className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
          </div>

          {/* Middle Purple Counter-Rotating Orbital Ring */}
          <div
            className="absolute inset-1.5 rounded-full border-2 border-purple-500/70 animate-spin"
            style={{
              animationDuration: '2.4s',
              animationDirection: 'reverse',
              transform: 'perspective(600px) rotateY(65deg) rotateX(25deg)',
              boxShadow: '0 0 22px rgba(168, 85, 247, 0.4)',
            }}
          >
            <span className="absolute -bottom-1 right-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
          </div>

          {/* Equatorial Axis Ring */}
          <div
            className="absolute inset-3 rounded-full border border-emerald-400/50 animate-spin"
            style={{
              animationDuration: '2s',
              transform: 'perspective(600px) rotateX(-45deg) rotateY(45deg)',
            }}
          />

          {/* Central Pulsating Energy Star */}
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-white to-purple-500 shadow-[0_0_30px_rgba(34,211,238,0.85),0_0_45px_rgba(168,85,247,0.65)] animate-pulse flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-white blur-[1px]" />
          </div>
        </div>

        {/* Identity & Progress readout (3D badge removed as requested) */}
        <div className="space-y-1">
          <div className="font-sans font-bold text-2xl tracking-[0.14em] text-white flex items-center justify-center">
            <span>SAURAV</span>
            <span className="text-cyan-400">.</span>
          </div>
          <p className="text-xs font-sans text-slate-400 tracking-wider uppercase font-medium">
            Creative Engineering
          </p>
        </div>

        {/* Progress Bar & Live Counter (Counts 0% -> 100%) */}
        <div className="w-64 space-y-2">
          <div className="w-full h-1.5 rounded-full bg-white/[0.08] p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-sans font-medium">
            <span className="text-slate-400 text-[11px] truncate">{status}</span>
            <span className="text-cyan-300 font-sans font-bold text-sm tracking-tight shrink-0 ml-2">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
