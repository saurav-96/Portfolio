'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 36;
const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg per frame
const FRAME_PATH = '/assets/images/portrait-360/frame-';
const FRAME_EXT = '.png';

const DRAG_SENSITIVITY = 0.48;
const INERTIA_FRICTION = 0.92;
const MIN_VELOCITY = 0.02;
const MAX_FLING = 3.6;
const IDLE_RETURN_DELAY_MS = 3500;

export default function Portrait360() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angleDisplay, setAngleDisplay] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Mutable animation state
  const stateRef = useRef({
    images: [] as HTMLImageElement[],
    loaded: [] as boolean[],
    loadedCount: 0,
    currentAngle: 0,
    targetAngle: 0,
    isDragging: false,
    lastRenderedFrame: -1,
    lastPointerX: 0,
    lastPointerTime: 0,
    velocity: 0,
    rafId: null as number | null,
    idleReturnTimer: null as NodeJS.Timeout | null,
    isAutoReturning: false,
    returnStartAngle: 0,
    returnDeltaAngle: 0,
    returnStartTime: 0,
    returnDuration: 800,
    currentTiltX: 0,
    currentTiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
  });

  const renderFrame = useCallback((angle: number, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const normAngle = ((angle % 360) + 360) % 360;
    const frameIndex = Math.round(normAngle / DEGREES_PER_FRAME) % TOTAL_FRAMES;

    if (!force && frameIndex === stateRef.current.lastRenderedFrame) {
      setAngleDisplay(Math.round(normAngle));
      return;
    }

    const img = stateRef.current.images[frameIndex];
    if (img && stateRef.current.loaded[frameIndex]) {
      ctx.clearRect(0, 0, 657, 1008);
      ctx.drawImage(img, 0, 0, 657, 1008);
      stateRef.current.lastRenderedFrame = frameIndex;
      setAngleDisplay(Math.round(normAngle));
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (stateRef.current.idleReturnTimer) clearTimeout(stateRef.current.idleReturnTimer);
    stateRef.current.isAutoReturning = false;

    stateRef.current.idleReturnTimer = setTimeout(() => {
      let norm = ((stateRef.current.currentAngle % 360) + 360) % 360;
      if (norm > 180) norm -= 360;
      if (Math.abs(norm) < 1.0) return;

      stateRef.current.isAutoReturning = true;
      stateRef.current.returnStartAngle = stateRef.current.currentAngle;
      stateRef.current.returnDeltaAngle = -norm;
      stateRef.current.returnStartTime = performance.now();
      stateRef.current.returnDuration = Math.min(1100, Math.max(500, Math.abs(norm) * 3.5));

      const tickReturn = () => {
        if (!stateRef.current.isAutoReturning) return;
        const now = performance.now();
        const progress = Math.min(1, (now - stateRef.current.returnStartTime) / stateRef.current.returnDuration);
        const ease = 1 - Math.pow(1 - progress, 3);

        stateRef.current.currentAngle = stateRef.current.returnStartAngle + stateRef.current.returnDeltaAngle * ease;
        renderFrame(stateRef.current.currentAngle);

        if (progress < 1) {
          stateRef.current.rafId = requestAnimationFrame(tickReturn);
        } else {
          stateRef.current.currentAngle = 0;
          stateRef.current.isAutoReturning = false;
          renderFrame(0, true);
        }
      };

      stateRef.current.rafId = requestAnimationFrame(tickReturn);
    }, IDLE_RETURN_DELAY_MS);
  }, [renderFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 657 * dpr;
    canvas.height = 1008 * dpr;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (ctx) ctx.scale(dpr, dpr);

    // Initialize image arrays
    stateRef.current.images = new Array(TOTAL_FRAMES).fill(null);
    stateRef.current.loaded = new Array(TOTAL_FRAMES).fill(false);

    // Preload frame 0 first for instant switch
    const frame0 = new window.Image();
    frame0.src = `${FRAME_PATH}0${FRAME_EXT}`;
    frame0.onload = () => {
      stateRef.current.images[0] = frame0;
      stateRef.current.loaded[0] = true;
      stateRef.current.loadedCount = 1;
      setIsReady(true);
      renderFrame(0, true);

      // Preload remaining frames
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = `${FRAME_PATH}${i}${FRAME_EXT}`;
        img.onload = () => {
          stateRef.current.images[i] = img;
          stateRef.current.loaded[i] = true;
          stateRef.current.loadedCount++;
        };
      }
    };

    return () => {
      if (stateRef.current.idleReturnTimer) clearTimeout(stateRef.current.idleReturnTimer);
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId);
    };
  }, [renderFrame]);

  // Pointer interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.lastPointerX = e.clientX;
    stateRef.current.lastPointerTime = performance.now();
    stateRef.current.velocity = 0;
    setIsInteracting(true);

    if (stateRef.current.idleReturnTimer) clearTimeout(stateRef.current.idleReturnTimer);
    stateRef.current.isAutoReturning = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    const now = performance.now();
    const deltaX = e.clientX - stateRef.current.lastPointerX;
    const dt = Math.max(1, now - stateRef.current.lastPointerTime);

    stateRef.current.velocity = (deltaX / dt) * 16.6;
    stateRef.current.velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, stateRef.current.velocity));

    stateRef.current.currentAngle -= deltaX * DRAG_SENSITIVITY;
    stateRef.current.lastPointerX = e.clientX;
    stateRef.current.lastPointerTime = now;

    renderFrame(stateRef.current.currentAngle);
  };

  const handlePointerUp = () => {
    if (!stateRef.current.isDragging) return;
    stateRef.current.isDragging = false;
    setIsInteracting(false);

    // Fling momentum loop
    if (Math.abs(stateRef.current.velocity) > MIN_VELOCITY) {
      const tickMomentum = () => {
        if (stateRef.current.isDragging) return;
        stateRef.current.currentAngle -= stateRef.current.velocity * DRAG_SENSITIVITY;
        stateRef.current.velocity *= INERTIA_FRICTION;
        renderFrame(stateRef.current.currentAngle);

        if (Math.abs(stateRef.current.velocity) > MIN_VELOCITY) {
          stateRef.current.rafId = requestAnimationFrame(tickMomentum);
        } else {
          resetIdleTimer();
        }
      };
      stateRef.current.rafId = requestAnimationFrame(tickMomentum);
    } else {
      resetIdleTimer();
    }
  };

  const rotateBy = (deg: number) => {
    const start = stateRef.current.currentAngle;
    const target = start + deg;
    const startTime = performance.now();
    const duration = 400;

    const tick = () => {
      const now = performance.now();
      const progress = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      stateRef.current.currentAngle = start + deg * ease;
      renderFrame(stateRef.current.currentAngle);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        stateRef.current.currentAngle = target;
        renderFrame(target);
        resetIdleTimer();
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <div
      ref={containerRef}
      className={`portrait-turntable-360 relative select-none touch-pan-y cursor-grab active:cursor-grabbing ${
        isInteracting ? 'is-interacting' : ''
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-label="Interactive 3D rotating portrait of Saurav Bhusal. Drag horizontally to rotate in 3D."
    >
      {/* Fallback Static Image (Above Fold LCP Asset) */}
      <Image
        src="/assets/images/saurav-cutout.png"
        alt="Saurav Bhusal — Creative Web Developer and UI/UX Designer"
        width={657}
        height={1008}
        priority
        className={`portrait-static-img w-full h-auto transition-opacity duration-500 pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${
          isReady ? 'opacity-0 absolute inset-0' : 'opacity-100 relative'
        }`}
      />

      {/* 360-Degree Turntable Canvas */}
      <canvas
        ref={canvasRef}
        className={`portrait-360-canvas w-full h-auto transition-opacity duration-300 pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${
          isReady ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
      />

      {/* Cybernetic Telemetry Badge */}
      <div
        className="portrait-360-badge absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/90 border border-purple-500/30 backdrop-blur-md text-xs font-mono text-purple-200 pointer-events-none shadow-lg"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="badge-label tracking-wider font-semibold">360° MODEL</span>
        <span className="badge-divider opacity-40">|</span>
        <span className="badge-angle text-cyan-300 font-bold">{angleDisplay}°</span>
      </div>

      {/* Precision Controls */}
      <div
        className="portrait-360-controls absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-midnight/80 border border-white/10 backdrop-blur-md"
        aria-label="3D view controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => rotateBy(-30)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Rotate Left 30°"
          aria-label="Rotate Left 30 degrees"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => rotateBy(0)}
          className="px-2 py-1 text-[11px] font-mono rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Reset to 0° Frontal View"
          aria-label="Reset rotation to 0 degrees"
        >
          RESET
        </button>
        <button
          type="button"
          onClick={() => rotateBy(30)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Rotate Right 30°"
          aria-label="Rotate Right 30 degrees"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
