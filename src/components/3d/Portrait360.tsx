'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 36;
const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg per frame
const FRAME_PATH = '/assets/images/portrait-360/frame-';
const FRAME_EXT = '.png';

// Physics & Interaction constants
const DRAG_SENSITIVITY = 0.48; // Natural 1:1 turntable drag feel
const INERTIA_FRICTION = 0.92; // Smooth friction decay
const MIN_VELOCITY = 0.02; // Inertia cutoff
const MAX_FLING = 3.6; // Maximum flick velocity
const IDLE_RETURN_DELAY_MS = 3500; // 3.5s inactivity before smooth return

export default function Portrait360() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);
  const angleBadgeRef = useRef<HTMLSpanElement | null>(null);

  const [angleText, setAngleText] = useState('0°');
  const [isActivated, setIsActivated] = useState(false);

  // Mutable refs to manage physics & render loops at 60/120fps without re-rendering React
  const stateRef = useRef({
    images: new Array(TOTAL_FRAMES).fill(null) as (HTMLImageElement | null)[],
    loaded: new Array(TOTAL_FRAMES).fill(false) as boolean[],
    loadedCount: 0,
    currentAngle: 0,
    targetAngle: 0,
    isDragging: false,
    hasActivated: false,
    lastRenderedFrame: -1,
    lastRoundedAngle: -1,
    lastPointerX: 0,
    lastPointerTime: 0,
    velocity: 0,
    rafId: null as number | null,
    idleReturnTimer: null as ReturnType<typeof setTimeout> | null,
    isAutoReturning: false,
    returnStartAngle: 0,
    returnDeltaAngle: 0,
    returnStartTime: 0,
    returnDuration: 800,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High-DPI Canvas Setup matching saurav-cutout.png (657x1008)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalW = 657;
    const logicalH = 1008;

    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.scale(dpr, dpr);

    const orbitRing = document.querySelector('.neon-orbit-ring') as HTMLElement | null;

    // Crisp single-frame rendering
    function renderFrame(angle: number, force = false) {
      const normAngle = ((angle % 360) + 360) % 360;
      const frameIndex = Math.round(normAngle / DEGREES_PER_FRAME) % TOTAL_FRAMES;

      if (!force && frameIndex === stateRef.current.lastRenderedFrame) {
        updateUI(normAngle);
        return;
      }

      let img = stateRef.current.images[frameIndex];
      if (!img || !stateRef.current.loaded[frameIndex]) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = (frameIndex - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
          if (stateRef.current.images[prev] && stateRef.current.loaded[prev]) {
            img = stateRef.current.images[prev];
            break;
          }
          const next = (frameIndex + offset) % TOTAL_FRAMES;
          if (stateRef.current.images[next] && stateRef.current.loaded[next]) {
            img = stateRef.current.images[next];
            break;
          }
        }
      }

      if (img && ctx) {
        ctx.clearRect(0, 0, logicalW, logicalH);
        ctx.drawImage(img, 0, 0, logicalW, logicalH);
        stateRef.current.lastRenderedFrame = frameIndex;
      }

      updateUI(normAngle);
    }

    function updateUI(normAngle: number) {
      const roundedAngle = Math.round(normAngle);
      if (stateRef.current.lastRoundedAngle !== roundedAngle) {
        stateRef.current.lastRoundedAngle = roundedAngle;
        if (angleBadgeRef.current) {
          angleBadgeRef.current.textContent = `${roundedAngle}°`;
        }
        if (orbitRing) {
          const ringRot = (normAngle * 0.4).toFixed(1);
          orbitRing.style.transform = `translateX(-50%) rotateX(72deg) rotateZ(${ringRot}deg)`;
        }
      }
    }

    function cancelIdleReturn() {
      if (stateRef.current.idleReturnTimer) {
        clearTimeout(stateRef.current.idleReturnTimer);
        stateRef.current.idleReturnTimer = null;
      }
      stateRef.current.isAutoReturning = false;
    }

    function restoreOriginalPicture() {
      const fallbackImg = fallbackImgRef.current;
      if (fallbackImg) {
        fallbackImg.style.display = 'block';
        void fallbackImg.offsetWidth;
        fallbackImg.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        fallbackImg.style.opacity = '1';
      }
      stateRef.current.hasActivated = false;
      stateRef.current.isAutoReturning = false;
      setIsActivated(false);
    }

    function triggerSmoothReturn(duration = 800) {
      if (stateRef.current.isDragging) return;

      const norm = ((stateRef.current.currentAngle % 360) + 360) % 360;
      if (norm < 1.0 || norm > 359.0) {
        stateRef.current.currentAngle = 0;
        stateRef.current.targetAngle = 0;
        renderFrame(0, true);
        restoreOriginalPicture();
        return;
      }

      let diff = 0 - norm;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      stateRef.current.returnStartAngle = norm;
      stateRef.current.returnDeltaAngle = diff;
      stateRef.current.returnStartTime = performance.now();
      stateRef.current.returnDuration = Math.max(550, Math.min(950, duration || Math.abs(diff) * 3.8));
      stateRef.current.isAutoReturning = true;
      stateRef.current.velocity = 0;
      wakeLoop();
    }

    function scheduleIdleReturn() {
      cancelIdleReturn();
      const norm = ((stateRef.current.currentAngle % 360) + 360) % 360;
      if (norm >= 1.5 && norm <= 358.5) {
        stateRef.current.idleReturnTimer = setTimeout(() => {
          triggerSmoothReturn(850);
        }, IDLE_RETURN_DELAY_MS);
      }
    }

    function tick() {
      stateRef.current.currentTiltX += (stateRef.current.targetTiltX - stateRef.current.currentTiltX) * 0.12;
      stateRef.current.currentTiltY += (stateRef.current.targetTiltY - stateRef.current.currentTiltY) * 0.12;
      if (canvas) {
        canvas.style.transform = `perspective(1200px) rotateX(${stateRef.current.currentTiltX.toFixed(2)}deg) rotateY(${stateRef.current.currentTiltY.toFixed(2)}deg)`;
      }

      let keepLooping = false;

      if (stateRef.current.isDragging) {
        let diff = stateRef.current.targetAngle - stateRef.current.currentAngle;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        stateRef.current.currentAngle = (((stateRef.current.currentAngle + diff * 0.85) % 360) + 360) % 360;
        renderFrame(stateRef.current.currentAngle);
        keepLooping = true;
      } else if (stateRef.current.isAutoReturning) {
        const now = performance.now();
        const elapsed = now - stateRef.current.returnStartTime;
        const progress = Math.min(1, elapsed / stateRef.current.returnDuration);
        const ease = 1 - Math.pow(1 - progress, 3);
        stateRef.current.currentAngle = (((stateRef.current.returnStartAngle + stateRef.current.returnDeltaAngle * ease) % 360) + 360) % 360;
        stateRef.current.targetAngle = stateRef.current.currentAngle;
        renderFrame(stateRef.current.currentAngle);

        if (progress >= 1) {
          stateRef.current.currentAngle = 0;
          stateRef.current.targetAngle = 0;
          renderFrame(0, true);
          restoreOriginalPicture();
        } else {
          keepLooping = true;
        }
      } else if (Math.abs(stateRef.current.velocity) > MIN_VELOCITY) {
        stateRef.current.currentAngle = (((stateRef.current.currentAngle + stateRef.current.velocity) % 360) + 360) % 360;
        stateRef.current.targetAngle = stateRef.current.currentAngle;
        stateRef.current.velocity *= INERTIA_FRICTION;
        renderFrame(stateRef.current.currentAngle);
        keepLooping = true;
      } else if (stateRef.current.velocity !== 0) {
        stateRef.current.velocity = 0;
        stateRef.current.targetAngle = stateRef.current.currentAngle;
        scheduleIdleReturn();
      }

      if (
        Math.abs(stateRef.current.targetTiltX - stateRef.current.currentTiltX) > 0.05 ||
        Math.abs(stateRef.current.targetTiltY - stateRef.current.currentTiltY) > 0.05
      ) {
        keepLooping = true;
      }

      if (keepLooping || stateRef.current.isDragging) {
        stateRef.current.rafId = requestAnimationFrame(tick);
      } else {
        stateRef.current.rafId = null;
      }
    }

    function wakeLoop() {
      if (!stateRef.current.rafId) {
        stateRef.current.rafId = requestAnimationFrame(tick);
      }
    }

    // Parallel preloading of 36 frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const pad = i.toString().padStart(2, '0');
      img.src = `${FRAME_PATH}${pad}${FRAME_EXT}`;
      img.onload = () => {
        stateRef.current.images[i] = img;
        stateRef.current.loaded[i] = true;
        stateRef.current.loadedCount++;
        const currentFrame = Math.round((((stateRef.current.currentAngle % 360) + 360) % 360) / DEGREES_PER_FRAME) % TOTAL_FRAMES;
        if (i === currentFrame && stateRef.current.hasActivated) {
          renderFrame(stateRef.current.currentAngle, true);
        }
      };
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    }

    // Attach external controls trigger functions to refs
    if (containerRef.current) {
      (containerRef.current as any).__activate3D = () => {
        cancelIdleReturn();
        if (!stateRef.current.hasActivated) {
          stateRef.current.hasActivated = true;
          setIsActivated(true);
          const fallbackImg = fallbackImgRef.current;
          if (fallbackImg) {
            fallbackImg.style.transition = 'opacity 0.25s ease';
            fallbackImg.style.opacity = '0';
            setTimeout(() => {
              if (stateRef.current.hasActivated && fallbackImg) {
                fallbackImg.style.display = 'none';
              }
            }, 270);
          }
        }
      };

      (containerRef.current as any).__triggerSmoothReturn = triggerSmoothReturn;
      (containerRef.current as any).__wakeLoop = wakeLoop;
      (containerRef.current as any).__cancelIdleReturn = cancelIdleReturn;
      (containerRef.current as any).__scheduleIdleReturn = scheduleIdleReturn;
    }

    return () => {
      cancelIdleReturn();
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId);
    };
  }, []);

  const activate3D = () => {
    const fn = (containerRef.current as any)?.__activate3D;
    if (typeof fn === 'function') fn();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    const cancelIdle = (containerRef.current as any)?.__cancelIdleReturn;
    if (typeof cancelIdle === 'function') cancelIdle();

    activate3D();
    stateRef.current.isDragging = true;
    stateRef.current.targetAngle = stateRef.current.currentAngle;
    stateRef.current.lastPointerX = e.clientX;
    stateRef.current.lastPointerTime = performance.now();
    stateRef.current.velocity = 0;

    containerRef.current?.classList.add('is-dragging');
    if (canvasRef.current && (canvasRef.current as any).setPointerCapture) {
      try {
        canvasRef.current.setPointerCapture(e.pointerId);
      } catch (_) {}
    }

    const wake = (containerRef.current as any)?.__wakeLoop;
    if (typeof wake === 'function') wake();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    stateRef.current.targetTiltY = normX * 8.0;
    stateRef.current.targetTiltX = -normY * 6.0;

    const wake = (container as any)?.__wakeLoop;
    if (typeof wake === 'function') wake();

    if (!stateRef.current.isDragging) return;

    const cancelIdle = (container as any)?.__cancelIdleReturn;
    if (typeof cancelIdle === 'function') cancelIdle();

    const now = performance.now();
    const dt = Math.max(1, now - stateRef.current.lastPointerTime);
    const deltaX = e.clientX - stateRef.current.lastPointerX;

    const angleDelta = -deltaX * DRAG_SENSITIVITY;
    stateRef.current.targetAngle = (((stateRef.current.targetAngle + angleDelta) % 360) + 360) % 360;

    const rawVel = (angleDelta / dt) * 16.6;
    stateRef.current.velocity = stateRef.current.velocity * 0.2 + rawVel * 0.8;

    stateRef.current.lastPointerX = e.clientX;
    stateRef.current.lastPointerTime = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    stateRef.current.isDragging = false;
    stateRef.current.targetAngle = stateRef.current.currentAngle;
    containerRef.current?.classList.remove('is-dragging');

    if (canvasRef.current && (canvasRef.current as any).releasePointerCapture) {
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    stateRef.current.velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, stateRef.current.velocity));

    const schedule = (containerRef.current as any)?.__scheduleIdleReturn;
    if (typeof schedule === 'function') schedule();

    const wake = (containerRef.current as any)?.__wakeLoop;
    if (typeof wake === 'function') wake();
  };

  const onPointerLeave = () => {
    if (!stateRef.current.isDragging) {
      stateRef.current.targetTiltX = 0;
      stateRef.current.targetTiltY = 0;
      const wake = (containerRef.current as any)?.__wakeLoop;
      if (typeof wake === 'function') wake();
    }
  };

  const handleRotateLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    const cancelIdle = (containerRef.current as any)?.__cancelIdleReturn;
    if (typeof cancelIdle === 'function') cancelIdle();
    activate3D();
    stateRef.current.targetAngle = stateRef.current.currentAngle;
    stateRef.current.velocity = -1.8;
    const schedule = (containerRef.current as any)?.__scheduleIdleReturn;
    if (typeof schedule === 'function') schedule();
    const wake = (containerRef.current as any)?.__wakeLoop;
    if (typeof wake === 'function') wake();
  };

  const handleRotateRight = (e: React.MouseEvent) => {
    e.preventDefault();
    const cancelIdle = (containerRef.current as any)?.__cancelIdleReturn;
    if (typeof cancelIdle === 'function') cancelIdle();
    activate3D();
    stateRef.current.targetAngle = stateRef.current.currentAngle;
    stateRef.current.velocity = 1.8;
    const schedule = (containerRef.current as any)?.__scheduleIdleReturn;
    if (typeof schedule === 'function') schedule();
    const wake = (containerRef.current as any)?.__wakeLoop;
    if (typeof wake === 'function') wake();
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    const cancelIdle = (containerRef.current as any)?.__cancelIdleReturn;
    if (typeof cancelIdle === 'function') cancelIdle();
    activate3D();
    stateRef.current.targetAngle = stateRef.current.currentAngle;
    const smoothReturn = (containerRef.current as any)?.__triggerSmoothReturn;
    if (typeof smoothReturn === 'function') smoothReturn(550);
  };

  return (
    <div
      ref={containerRef}
      id="hero-portrait-360"
      className="portrait-turntable-360"
      role="region"
      aria-label="Interactive 3D rotating portrait of Saurav Bhusal. Drag horizontally to rotate in 3D."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {/* High-DPI 3D Turntable Canvas with Smooth Sub-Frame Blending */}
      <canvas
        ref={canvasRef}
        id="portrait-360-canvas"
        className="portrait-360-canvas"
        width={657}
        height={1008}
      />

      {/* Authentic Original Hero Portrait as Initial Thumbnail */}
      <img
        ref={fallbackImgRef}
        id="portrait-static-img"
        src="/assets/images/saurav-cutout.png"
        alt="Saurav Bhusal — Creative Web Developer and UI/UX Designer"
        className="portrait-img portrait-fallback-img"
        width={440}
        height={495}
        loading="eager"
      />

      {/* Floating 3D Interactive Badge */}
      <div id="portrait-360-badge" className="portrait-360-badge" aria-live="polite">
        <span className="badge-icon-spin" aria-hidden="true">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </span>
        <span className="badge-label">3D Interactive</span>
        <span className="badge-separator">•</span>
        <span className="badge-instruction">Drag to Rotate</span>
        <span ref={angleBadgeRef} id="portrait-360-angle" className="badge-angle">
          {angleText}
        </span>
      </div>

      {/* Sleek Interaction Controls */}
      <div className="portrait-360-controls" aria-label="3D view controls">
        <button
          type="button"
          id="portrait-btn-prev"
          className="portrait-spin-btn btn-spin-left"
          onClick={handleRotateLeft}
          aria-label="Rotate Left"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px]">Left</span>
        </button>
        <button
          type="button"
          id="portrait-btn-reset"
          className="portrait-spin-btn btn-spin-reset"
          onClick={handleReset}
          aria-label="Reset to Front View"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-[10px] font-mono tracking-wider">RESET</span>
        </button>
        <button
          type="button"
          id="portrait-btn-next"
          className="portrait-spin-btn btn-spin-right"
          onClick={handleRotateRight}
          aria-label="Rotate Right"
        >
          <span className="text-[10px]">Right</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
