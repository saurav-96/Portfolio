'use client';

import { useEffect, useRef } from 'react';
import { getAssetPath } from '@/lib/assets';

const TOTAL_FRAMES = 36;
const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg per frame
const FRAME_PATH = getAssetPath('/assets/images/portrait-360/frame-');
const FRAME_EXT = '.png';

const DRAG_SENSITIVITY = 0.52;
const ROTATION_STEP_DEG = 25; // Symmetrical rotation step for arrow buttons

export default function Portrait360() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);
  const angleBadgeRef = useRef<HTMLSpanElement | null>(null);

  // High-performance physics state stored in ref for 60/120fps tracking without React re-render overhead
  const stateRef = useRef({
    images: [] as (HTMLImageElement | null)[],
    loaded: [] as boolean[],
    currentAngle: 0,
    targetAngle: 0,
    isDragging: false,
    hasActivated: false,
    lastRenderedQuantized: -1,
    lastRoundedAngle: -1,
    lastPointerX: 0,
    dragVelocity: 0,
    rafId: null as number | null,
    idleTimer: null as number | null,

    // Smooth return-to-original state
    isAutoReturning: false,
    returnStartAngle: 0,
    returnDeltaAngle: 0,
    returnStartTime: 0,
    returnDuration: 680,

    // Smooth arrow sliding animation state
    isSliding: false,
    slideStartAngle: 0,
    slideTargetAngle: 0,
    slideDeltaAngle: 0,
    slideStartTime: 0,
    slideDuration: 480,
  });

  const cancelIdleTimer = () => {
    const s = stateRef.current;
    if (s.idleTimer) {
      window.clearTimeout(s.idleTimer);
      s.idleTimer = null;
    }
  };

  const scheduleIdleTimer = () => {
    cancelIdleTimer();
    const s = stateRef.current;
    const norm = ((s.currentAngle % 360) + 360) % 360;
    if (norm >= 1.5 && norm <= 358.5) {
      s.idleTimer = window.setTimeout(() => {
        triggerSmoothReturn(750);
      }, 3500);
    }
  };

  const updateUI = (normAngle: number) => {
    const s = stateRef.current;
    const rounded = Math.round(normAngle);
    if (s.lastRoundedAngle !== rounded) {
      s.lastRoundedAngle = rounded;

      // Compute symmetrical signed angle relative to 0° front view (-180° to +180°)
      let signed = rounded;
      if (signed > 180) signed -= 360;

      if (angleBadgeRef.current) {
        angleBadgeRef.current.textContent = `${signed}°`;
      }
      const orbitRing = document.querySelector('.neon-orbit-ring') as HTMLElement | null;
      if (orbitRing) {
        orbitRing.style.transform = `translateX(-50%) rotateX(72deg) rotateZ(${(signed * 0.4).toFixed(1)}deg)`;
      }
    }
  };

  const activate3D = () => {
    const s = stateRef.current;
    cancelIdleTimer();
    if (!s.hasActivated) {
      s.hasActivated = true;
      const fallback = fallbackImgRef.current;
      if (fallback) {
        fallback.classList.remove('is-revealing');
        void fallback.offsetWidth;
        fallback.classList.add('is-hidden');
      }
    }
  };

  // Gentle soft-focus transition when original authentic portrait re-appears at true 0°
  const restoreOriginalPicture = () => {
    const s = stateRef.current;
    const fallback = fallbackImgRef.current;
    if (fallback) {
      fallback.classList.remove('is-hidden');
      fallback.classList.remove('is-revealing');
      void fallback.offsetWidth;
      fallback.classList.add('is-revealing');
    }
    s.hasActivated = false;
    s.isAutoReturning = false;
    s.isSliding = false;
  };

  // High-precision sub-frame optical cross-blending between adjacent 10° angular poses
  const renderFrame = (angle: number, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const s = stateRef.current;
    const normAngle = ((angle % 360) + 360) % 360;

    // Fractional frame position (e.g., 2.35)
    const exactFrame = normAngle / DEGREES_PER_FRAME;
    const frameIndexA = Math.floor(exactFrame) % TOTAL_FRAMES;
    const frameIndexB = (frameIndexA + 1) % TOTAL_FRAMES;
    const blendProgress = exactFrame - Math.floor(exactFrame);

    // Quantize check to avoid redundant draws on static frames
    const quantized = Math.round(exactFrame * 20) / 20;
    if (!force && quantized === s.lastRenderedQuantized) {
      updateUI(normAngle);
      return;
    }

    let imgA = s.images[frameIndexA];
    let imgB = s.images[frameIndexB];

    // Fallbacks if frames are still loading
    if (!imgA || !s.loaded[frameIndexA]) imgA = s.images[0] || null;
    if (!imgB || !s.loaded[frameIndexB]) imgB = imgA;

    if (imgA) {
      ctx.clearRect(0, 0, 657, 1008);

      if (!imgB || imgA === imgB || blendProgress < 0.02) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgA, 0, 0, 657, 1008);
      } else if (blendProgress > 0.98) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgB, 0, 0, 657, 1008);
      } else {
        // Continuous, seamless sub-frame optical cross-blend for liquid-smooth rotation
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgA, 0, 0, 657, 1008);
        ctx.globalAlpha = blendProgress;
        ctx.drawImage(imgB, 0, 0, 657, 1008);
        ctx.globalAlpha = 1.0;
      }

      s.lastRenderedQuantized = quantized;
    }

    updateUI(normAngle);
  };

  // Gentle and smooth spring-return to original pose (0°)
  const triggerSmoothReturn = (duration = 680) => {
    const s = stateRef.current;
    if (s.isDragging) return;

    cancelIdleTimer();
    s.isSliding = false;

    const norm = ((s.currentAngle % 360) + 360) % 360;
    if (norm < 0.5 || norm > 359.5) {
      s.currentAngle = 0;
      s.targetAngle = 0;
      s.isAutoReturning = false;
      renderFrame(0, true);
      restoreOriginalPicture();
      return;
    }

    // Shortest circular path to 0°
    let diff = 0 - norm;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;

    s.returnStartAngle = norm;
    s.returnDeltaAngle = diff;
    s.returnStartTime = performance.now();
    s.returnDuration = Math.max(500, Math.min(820, Math.abs(diff) * 3.8));
    s.isAutoReturning = true;
    wakeLoop();
  };

  // Smooth continuous sliding animation when clicking arrow buttons
  const slideByAngle = (delta: number, duration = 480) => {
    activate3D();
    const s = stateRef.current;
    s.isAutoReturning = false;
    cancelIdleTimer();

    const baseTarget = s.isSliding ? s.slideTargetAngle : s.currentAngle;
    s.slideStartAngle = s.currentAngle;
    s.slideTargetAngle = baseTarget + delta;
    s.slideDeltaAngle = s.slideTargetAngle - s.currentAngle;
    s.slideStartTime = performance.now();
    s.slideDuration = duration;
    s.isSliding = true;
    wakeLoop();
  };

  const tick = () => {
    const s = stateRef.current;
    const now = performance.now();
    let keepLooping = false;

    if (s.isDragging) {
      let diff = s.targetAngle - s.currentAngle;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      // Natural interpolation: responsive tracking with subtle momentum filtering
      if (Math.abs(diff) > 0.02) {
        s.currentAngle = ((s.currentAngle + diff * 0.45) % 360 + 360) % 360;
        renderFrame(s.currentAngle);
        keepLooping = true;
      } else {
        s.currentAngle = s.targetAngle;
        renderFrame(s.currentAngle);
      }
    } else if (s.isSliding) {
      const elapsed = now - s.slideStartTime;
      const progress = Math.min(1, elapsed / s.slideDuration);

      // Silky cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      s.currentAngle = s.slideStartAngle + s.slideDeltaAngle * ease;
      s.targetAngle = s.currentAngle;
      renderFrame(s.currentAngle);

      if (progress >= 1) {
        s.currentAngle = ((s.slideTargetAngle % 360) + 360) % 360;
        s.targetAngle = s.currentAngle;
        s.isSliding = false;
        scheduleIdleTimer();
      } else {
        keepLooping = true;
      }
    } else if (s.isAutoReturning) {
      const elapsed = now - s.returnStartTime;
      const progress = Math.min(1, elapsed / s.returnDuration);

      // Silky quartic ease-out for graceful zero-jerk arrival at 0°
      const ease = 1 - Math.pow(1 - progress, 4);
      s.currentAngle = ((s.returnStartAngle + s.returnDeltaAngle * ease) % 360 + 360) % 360;
      s.targetAngle = s.currentAngle;
      renderFrame(s.currentAngle);

      if (progress >= 1) {
        s.currentAngle = 0;
        s.targetAngle = 0;
        s.isAutoReturning = false;
        renderFrame(0, true);
        restoreOriginalPicture();
      } else {
        keepLooping = true;
      }
    }

    if (keepLooping || s.isDragging || s.isSliding || s.isAutoReturning) {
      s.rafId = requestAnimationFrame(tick);
    } else {
      s.rafId = null;
    }
  };

  const wakeLoop = () => {
    const s = stateRef.current;
    if (!s.rafId) {
      s.rafId = requestAnimationFrame(tick);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    cancelIdleTimer();
    const s = stateRef.current;
    s.isAutoReturning = false;
    s.isSliding = false;
    activate3D();
    s.isDragging = true;
    s.targetAngle = s.currentAngle;
    s.lastPointerX = e.clientX;

    if (containerRef.current) {
      containerRef.current.classList.add('is-dragging');
    }

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}

    wakeLoop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const deltaX = e.clientX - s.lastPointerX;
    s.lastPointerX = e.clientX;

    if (deltaX !== 0) {
      const angleDelta = -deltaX * DRAG_SENSITIVITY;
      s.targetAngle = ((s.targetAngle + angleDelta) % 360 + 360) % 360;
      wakeLoop();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    s.isDragging = false;

    if (containerRef.current) {
      containerRef.current.classList.remove('is-dragging');
    }

    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    // When released / undragged: gently spring-return to 0°
    triggerSmoothReturn(680);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    slideByAngle(-ROTATION_STEP_DEG, 480);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    slideByAngle(ROTATION_STEP_DEG, 480);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelIdleTimer();
    const s = stateRef.current;
    const norm = ((s.currentAngle % 360) + 360) % 360;
    if (norm >= 1.5 && norm <= 358.5) {
      activate3D();
      triggerSmoothReturn(600);
    } else {
      s.currentAngle = 0;
      s.targetAngle = 0;
      renderFrame(0, true);
      restoreOriginalPicture();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 657 * dpr;
    canvas.height = 1008 * dpr;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (ctx) ctx.scale(dpr, dpr);

    const s = stateRef.current;
    s.images = new Array(TOTAL_FRAMES).fill(null);
    s.loaded = new Array(TOTAL_FRAMES).fill(false);

    // Eagerly preload Frame 0 first for instant pixel-perfect render
    const frame0 = new Image();
    frame0.src = `${FRAME_PATH}00${FRAME_EXT}`;
    frame0.onload = () => {
      s.images[0] = frame0;
      s.loaded[0] = true;
      renderFrame(0, true);
    };

    // Preload remaining frames in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = i.toString().padStart(2, '0');
      img.src = `${FRAME_PATH}${pad}${FRAME_EXT}`;
      img.onload = () => {
        s.images[i] = img;
        s.loaded[i] = true;
        const currentFrame = Math.round(((s.currentAngle % 360) + 360) % 360 / DEGREES_PER_FRAME) % TOTAL_FRAMES;
        if (i === currentFrame && s.hasActivated) {
          renderFrame(s.currentAngle, true);
        }
      };
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    }

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
      if (s.idleTimer) window.clearTimeout(s.idleTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-portrait-360"
      className="portrait-turntable-360 select-none cursor-grab active:cursor-grabbing relative flex flex-col items-center justify-center w-full max-w-[535px]"
      role="region"
      aria-label="Interactive 3D rotating portrait of Saurav Bhusal. Drag horizontally to rotate; release to gently spring back to original pose."
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Dedicated Visual Media Stage — Shared 657:1008 Aspect Ratio Coordinate Plane */}
      <div className="portrait-media-stage relative w-full aspect-[657/1008] max-h-[580px] flex items-center justify-center overflow-visible">
        {/* High-DPI 3D Turntable Canvas with Continuous Sub-Frame Optical Blending */}
        <canvas
          ref={canvasRef}
          id="portrait-360-canvas"
          className="portrait-360-canvas absolute inset-0 w-full h-full object-contain pointer-events-none"
          width={657}
          height={1008}
        />

        {/* Initial SSR Fallback Image — Exactly Matches Canvas 657x1008 Coordinates */}
        <img
          ref={fallbackImgRef}
          src={getAssetPath('/assets/images/saurav-cutout.png')}
          alt="Saurav Bhusal — Creative Web Developer and UI/UX Designer"
          className="portrait-fallback-img is-revealing absolute inset-0 w-full h-full object-contain pointer-events-none"
          id="portrait-static-img"
          width={657}
          height={1008}
          loading="eager"
        />
      </div>

      {/* Sleek Unified 3D Floating Control Bar */}
      <div
        className="portrait-360-unified-bar font-sans mt-[-8px] relative z-10"
        id="portrait-360-badge"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <span className="badge-icon-spin text-cyan-400" aria-hidden="true">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </span>
          <span className="font-semibold text-white text-[12px] tracking-tight">3D Interactive</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 text-[11px] font-medium">Drag to Rotate</span>
        </div>

        <div className="flex items-center gap-1.5 pl-2.5 border-l border-white/10">
          <button
            type="button"
            className="portrait-nav-btn active:scale-90 transition-transform"
            id="portrait-btn-prev"
            aria-label="Rotate Left Smoothly"
            onClick={handlePrev}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span
            ref={angleBadgeRef}
            className="badge-angle-pill font-sans text-cyan-400 font-bold text-[11px] min-w-[32px] text-center"
            id="portrait-360-angle"
          >
            0°
          </span>

          <button
            type="button"
            className="portrait-nav-btn active:scale-90 transition-transform"
            id="portrait-btn-next"
            aria-label="Rotate Right Smoothly"
            onClick={handleNext}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="portrait-reset-btn group active:scale-95 transition-all"
            id="portrait-btn-reset"
            aria-label="Reset to Front View"
            onClick={handleReset}
          >
            <svg className="w-3 h-3 text-cyan-400 group-hover:-rotate-45 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[11px] font-medium font-sans">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
