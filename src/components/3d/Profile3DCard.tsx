'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Profile3DCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  // High-performance physics state
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    rafId: null as number | null,
  });

  const SENSITIVITY_X = 0.44;
  const SENSITIVITY_Y = 0.38;
  const DAMPING_DRAG = 0.18;   // Snappy, direct tracking while dragging
  const DAMPING_RETURN = 0.075; // Silky, gentle spring return to original pose

  const renderLoop = () => {
    const card = cardRef.current;
    if (!card) return;

    const damping = stateRef.current.isDragging ? DAMPING_DRAG : DAMPING_RETURN;

    stateRef.current.currentRotX += (stateRef.current.targetRotX - stateRef.current.currentRotX) * damping;
    stateRef.current.currentRotY += (stateRef.current.targetRotY - stateRef.current.currentRotY) * damping;

    // Apply smooth hardware-accelerated 3D transform without expensive filter recalculations
    card.style.transform = `perspective(1200px) rotateX(${stateRef.current.currentRotX.toFixed(2)}deg) rotateY(${stateRef.current.currentRotY.toFixed(2)}deg)`;

    // Update specular glare
    const radY = (stateRef.current.currentRotY * Math.PI) / 180;
    const radX = (stateRef.current.currentRotX * Math.PI) / 180;
    const glareX = 50 + Math.sin(radY) * 45;
    const glareY = 50 - Math.sin(radX) * 45;
    card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
    card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);

    setRotationDegrees(Math.round(stateRef.current.currentRotY));

    // Keep loop active while dragging or while settling back to origin
    const distTarget =
      Math.abs(stateRef.current.targetRotX - stateRef.current.currentRotX) +
      Math.abs(stateRef.current.targetRotY - stateRef.current.currentRotY);

    if (stateRef.current.isDragging || distTarget > 0.05) {
      stateRef.current.rafId = requestAnimationFrame(renderLoop);
    } else {
      // Snap cleanly to exact 0 when settled
      if (!stateRef.current.isDragging) {
        stateRef.current.currentRotX = 0;
        stateRef.current.currentRotY = 0;
        stateRef.current.targetRotX = 0;
        stateRef.current.targetRotY = 0;
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        setRotationDegrees(0);
      }
      stateRef.current.rafId = null;
    }
  };

  const wakeLoop = () => {
    if (!stateRef.current.rafId) {
      stateRef.current.rafId = requestAnimationFrame(renderLoop);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.startX = e.clientX;
    stateRef.current.startY = e.clientY;
    setIsDragging(true);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}

    wakeLoop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;

    const dx = e.clientX - stateRef.current.startX;
    const dy = e.clientY - stateRef.current.startY;

    stateRef.current.targetRotY = dx * SENSITIVITY_X;
    stateRef.current.targetRotX = Math.max(-55, Math.min(55, -dy * SENSITIVITY_Y));

    wakeLoop();
  };

  // When user releases or stops dragging: gently and smoothly spring back to original upright pose (0, 0)
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    stateRef.current.isDragging = false;
    setIsDragging(false);

    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    // Gentle spring return to original pose
    stateRef.current.targetRotX = 0;
    stateRef.current.targetRotY = 0;
    wakeLoop();
  };

  useEffect(() => {
    return () => {
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId);
    };
  }, []);

  return (
    <div className="glass-card p-5 sm:p-6 relative overflow-visible font-sans">
      {/* Clean Sans-Serif 3D Status Bar Inside Card */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div
          id="profile-3d-hint"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-sans text-xs font-medium shadow-inner"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Interactive 3D</span>
        </div>

        <div className="text-xs font-sans text-slate-400 flex items-center gap-1.5 font-medium">
          <span>Drag to Rotate</span>
          {rotationDegrees !== 0 && (
            <span className="text-cyan-400 font-bold ml-1">{rotationDegrees}°</span>
          )}
        </div>
      </div>

      <div
        className={`profile-3d-scene ${isDragging ? 'is-dragging' : ''} cursor-grab active:cursor-grabbing select-none`}
        role="region"
        aria-label="Interactive 3D portrait. Click and drag to rotate; release to gently spring back to original pose."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={cardRef}
          className="profile-3d-card transition-shadow duration-300"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* FRONT FACE: Authentic Portrait & Subtle Ambient Glow */}
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
                <div className="font-sans text-sm font-bold text-white">Saurav Bhusal</div>
                <div className="font-sans text-[11px] text-cyan-300 font-medium">Creative Technologist • Nepal</div>
              </div>
              <span className="status-badge status-live font-sans font-semibold text-[10px]">Remote Ready</span>
            </div>
          </div>

          {/* REVERSE FACE: Cyber Holographic Identity Card */}
          <div className="profile-card-face profile-card-back font-sans">
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
                  <div className="font-sans text-xs font-bold text-white tracking-wide">SAURAV BHUSAL</div>
                  <div className="font-sans text-[10px] text-purple-300">ID: SB-NEPAL-2026</div>
                </div>
              </div>
              <span className="font-sans text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-semibold">
                VERIFIED DEV
              </span>
            </div>

            <div className="profile-back-body">
              <div className="text-[11px] text-slate-300 leading-relaxed font-sans mb-3">
                Creative Technologist &amp; CS student turning complex problems into intuitive interfaces, robust frontend architectures, and intelligent workflows.
              </div>

              <div className="space-y-1.5 font-sans text-[11px] text-slate-400 mb-3 border-t border-b border-white/10 py-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">BASE:</span>
                  <span className="text-slate-200">Nepal (UTC+5:45)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FOCUS:</span>
                  <span className="text-cyan-300">Three.js • React • AI Tools</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MODE:</span>
                  <span className="text-emerald-400">Remote / Global Contracts</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 font-sans">
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">React</span>
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">Three.js</span>
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">Next.js</span>
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">Python</span>
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">Tailwind</span>
                <span className="tech-pill text-[10px] py-0.5 px-2 font-medium">Figma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Focus Badges beneath Card (Pure Sans-Serif) */}
      <div className="grid grid-cols-2 gap-3 mt-4 font-sans">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="font-sans font-bold text-white text-sm">Full-Stack &amp; 3D</div>
          <div className="text-[11px] text-slate-400 font-medium">Creative Engineering</div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
          <div className="font-sans font-bold text-white text-sm">UI/UX &amp; AI</div>
          <div className="text-[11px] text-slate-400 font-medium">Design Systems &amp; Python</div>
        </div>
      </div>
    </div>
  );
}
