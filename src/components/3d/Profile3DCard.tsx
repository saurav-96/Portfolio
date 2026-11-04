'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Profile3DCard() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Animation state
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    velX: 0,
    velY: 0,
    rafId: null as number | null,
  });

  const SENSITIVITY = 0.52;
  const DAMPING = 0.085;
  const FRICTION = 0.94;

  const renderCard = () => {
    const card = cardRef.current;
    if (!card) return;

    stateRef.current.currentRotX += (stateRef.current.targetRotX - stateRef.current.currentRotX) * DAMPING;
    stateRef.current.currentRotY += (stateRef.current.targetRotY - stateRef.current.currentRotY) * DAMPING;

    if (!stateRef.current.isDragging) {
      stateRef.current.targetRotX += stateRef.current.velX;
      stateRef.current.targetRotY += stateRef.current.velY;
      stateRef.current.velX *= FRICTION;
      stateRef.current.velY *= FRICTION;

      if (Math.abs(stateRef.current.velX) < 0.001) stateRef.current.velX = 0;
      if (Math.abs(stateRef.current.velY) < 0.001) stateRef.current.velY = 0;
    }

    const radY = (stateRef.current.currentRotY * Math.PI) / 180;
    const radX = (stateRef.current.currentRotX * Math.PI) / 180;
    const shadowX = Math.sin(radY) * -24;
    const shadowY = Math.sin(radX) * 24 + 20;

    card.style.transform = `rotateX(${stateRef.current.currentRotX.toFixed(2)}deg) rotateY(${stateRef.current.currentRotY.toFixed(2)}deg)`;
    card.style.filter = `drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px rgba(0, 0, 0, 0.75))`;

    const glareX = 50 + Math.sin(radY) * 40;
    const glareY = 50 - Math.sin(radX) * 40;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);

    if (
      stateRef.current.isDragging ||
      Math.abs(stateRef.current.targetRotX - stateRef.current.currentRotX) > 0.02 ||
      Math.abs(stateRef.current.targetRotY - stateRef.current.currentRotY) > 0.02 ||
      Math.abs(stateRef.current.velX) > 0.01 ||
      Math.abs(stateRef.current.velY) > 0.01
    ) {
      stateRef.current.rafId = requestAnimationFrame(renderCard);
    } else {
      stateRef.current.rafId = null;
    }
  };

  const wakeLoop = () => {
    if (!stateRef.current.rafId) {
      stateRef.current.rafId = requestAnimationFrame(renderCard);
    }
  };

  const resetView = () => {
    stateRef.current.targetRotX = 0;
    stateRef.current.targetRotY = 0;
    stateRef.current.velX = 0;
    stateRef.current.velY = 0;
    wakeLoop();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
    stateRef.current.lastX = e.clientX;
    stateRef.current.lastY = e.clientY;
    stateRef.current.velX = 0;
    stateRef.current.velY = 0;
    setIsDragging(true);

    if (!hasInteracted) setHasInteracted(true);
    wakeLoop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.lastX;
    const dy = e.clientY - stateRef.current.lastY;

    stateRef.current.targetRotY += dx * SENSITIVITY;
    stateRef.current.targetRotX -= dy * SENSITIVITY;
    stateRef.current.targetRotX = Math.max(-80, Math.min(80, stateRef.current.targetRotX));

    stateRef.current.velX = -dy * SENSITIVITY * 0.25;
    stateRef.current.velY = dx * SENSITIVITY * 0.25;

    stateRef.current.lastX = e.clientX;
    stateRef.current.lastY = e.clientY;
    wakeLoop();
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
    setIsDragging(false);
    wakeLoop();
  };

  useEffect(() => {
    return () => {
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId);
    };
  }, []);

  return (
    <div className="glass-card p-5 sm:p-6 relative overflow-visible">
      {/* 3D Orbit Hint Pill */}
      <div className={`profile-3d-hint ${hasInteracted ? 'has-interacted' : ''}`}>
        <span>✦ Drag to rotate 3D (360°)</span>
        <button
          type="button"
          onClick={resetView}
          className="underline hover:text-cyan-300 ml-1 cursor-pointer pointer-events-auto"
          title="Reset view"
        >
          Reset
        </button>
      </div>

      <div
        ref={stageRef}
        className={`profile-3d-scene ${isDragging ? 'is-dragging' : ''}`}
        role="region"
        aria-label="Interactive 3D profile picture. Click and drag with mouse or touch to rotate 360 degrees. Double click to reset."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={resetView}
      >
        <div ref={cardRef} className="profile-3d-card">
          {/* FRONT FACE: Authentic Portrait & Cyber Glow */}
          <div className="profile-card-face profile-card-front">
            <div className="profile-glare" />
            <Image
              src="/assets/images/saurav-cutout.png"
              alt="Portrait of Saurav Bhusal — Creative Web Developer and UI/UX Designer"
              width={400}
              height={450}
              priority
              className="profile-front-img w-full h-auto object-cover select-none pointer-events-none"
            />
            <div className="profile-front-badge">
              <div>
                <div className="font-heading text-sm font-bold text-white">Saurav Bhusal</div>
                <div className="font-mono text-[11px] text-cyan-300">Creative Technologist • Nepal</div>
              </div>
              <span className="status-badge status-live">Remote Ready</span>
            </div>
          </div>

          {/* REVERSE FACE: Cyberpunk Holographic Developer Identity Card */}
          <div className="profile-card-face profile-card-back">
            <div className="profile-glare" />
            <div className="profile-back-circuit" />

            <div className="profile-back-header">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  <Image
                    src="/assets/images/saurav-logo.png"
                    alt="Saurav Logo"
                    width={32}
                    height={32}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-heading text-xs font-bold text-white tracking-wider">SAURAV BHUSAL</div>
                  <div className="font-mono text-[10px] text-purple-300">ID: SB-NEPAL-2026</div>
                </div>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300">
                VERIFIED DEV
              </span>
            </div>

            <div className="profile-back-body">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">CREDENTIALS</div>
                <div className="font-heading text-xs font-semibold text-white">Harvard CS50x Alum</div>
                <div className="text-[11px] text-slate-300 leading-tight">Software &amp; Web Developer • UI/UX Specialist</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-mono text-[9px] text-slate-400">LOCATION</span>
                  <div className="text-slate-200 font-medium">Kapilvastu &amp; Butwal</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="font-mono text-[9px] text-slate-400">AVAILABILITY</span>
                  <div className="text-emerald-400 font-medium">Worldwide Remote</div>
                </div>
              </div>
            </div>

            <div className="profile-back-footer">
              <span className="font-mono text-[10px] text-slate-400">360° Interactive 3D Card</span>
              <span className="font-mono text-[10px] text-purple-300">Double-click to reset ↻</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Focus Pillars */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <div className="font-mono text-[11px] text-purple-300">PRIMARY FOCUS</div>
          <div className="font-heading text-sm font-semibold text-white mt-0.5">Web Dev &amp; UI/UX</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <div className="font-mono text-[11px] text-cyan-300">EXPLORATION</div>
          <div className="font-heading text-sm font-semibold text-white mt-0.5">3D Web &amp; AI Tools</div>
        </div>
      </div>
    </div>
  );
}
