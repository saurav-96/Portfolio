'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { PROJECTS_LIST, type ProjectCaseStudy } from '@/data/projectsData';
import CaseStudyModal from '@/components/modals/CaseStudyModal';

export default function FeaturedProjectsCarousel() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef<HTMLSpanElement | null>(null);

  const activeSlideTweenRef = useRef<gsap.core.Tween | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityXRef = useRef(0);
  const hasDraggedSignificantlyRef = useRef(false);

  const totalCards = PROJECTS_LIST.length;

  const getSingleCardStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 380;
    const firstCard = track.querySelector<HTMLElement>('.project-card');
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '28') || 28;
      return cardWidth + gap;
    }
    return 380;
  }, []);

  const getSlideStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 380;
    const trackWidth = track.clientWidth;
    const singleStep = getSingleCardStep();
    if (trackWidth >= 1050) {
      return singleStep * 3;
    } else if (trackWidth >= 680) {
      return singleStep * 2;
    }
    return singleStep;
  }, [getSingleCardStep]);

  // High-performance direct DOM update without triggering React component re-renders
  const updateControlsDOM = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const singleStep = getSingleCardStep();

    // Prev / Next button states
    if (prevBtnRef.current) {
      const isAtStart = scrollLeft <= 8;
      prevBtnRef.current.disabled = isAtStart;
      prevBtnRef.current.setAttribute('aria-disabled', isAtStart ? 'true' : 'false');
    }
    if (nextBtnRef.current) {
      const isAtEnd = scrollLeft >= maxScroll - 8;
      nextBtnRef.current.disabled = isAtEnd;
      nextBtnRef.current.setAttribute('aria-disabled', isAtEnd ? 'true' : 'false');
    }

    // Live progress bar
    if (progressFillRef.current) {
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const minWidthPct = (1 / totalCards) * 100;
      const currentWidthPct = minWidthPct + progress * (100 - minWidthPct);
      progressFillRef.current.style.width = `${Math.min(100, Math.max(minWidthPct, currentWidthPct)).toFixed(1)}%`;
    }

    // Current index label (01, 02, ..., 07)
    if (currentIndexRef.current) {
      const activeIndex = Math.min(totalCards, Math.max(1, Math.round(scrollLeft / singleStep) + 1));
      currentIndexRef.current.textContent = String(activeIndex).padStart(2, '0');
    }

    // High-performance 3D scroll-based perspective & depth curve
    const allCards = track.querySelectorAll<HTMLElement>('.project-card');
    const trackWidth = track.clientWidth;
    const trackCenter = trackWidth / 2;

    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      const cardCenter = i * singleStep + singleStep / 2 - scrollLeft;
      const distFromCenter = (cardCenter - trackCenter) / (trackWidth * 0.5);
      const clampedDist = Math.max(-1.15, Math.min(1.15, distFromCenter));

      // Authentic 3D Cylindrical Perspective: outer cards tilt outward and recede
      const rotY = (clampedDist * -7.5).toFixed(2);
      const transZ = (-Math.abs(clampedDist) * 32).toFixed(1);
      const scale = (1 - Math.abs(clampedDist) * 0.045).toFixed(3);
      const opacity = (1 - Math.min(1, Math.abs(clampedDist)) * 0.16).toFixed(2);

      card.style.opacity = opacity;
      card.dataset.scrollRotY = rotY;
      card.dataset.scrollTransZ = transZ;
      card.dataset.scrollScale = scale;

      // Only update transform if card is not currently tilted by active mouse hover
      if (!card.matches(':hover') || isPointerDownRef.current) {
        card.style.transform = `perspective(1200px) rotateY(${rotY}deg) translateZ(${transZ}px) scale(${scale})`;
      }
    }
  }, [getSingleCardStep, totalCards]);

  const scheduleUpdate = useCallback(() => {
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      updateControlsDOM();
      rafIdRef.current = null;
    });
  }, [updateControlsDOM]);

  const smoothSlideTo = useCallback(
    (target: number, duration = 0.95) => {
      const track = trackRef.current;
      if (!track) return;

      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const clampedTarget = Math.max(0, Math.min(maxScroll, target));

      if (activeSlideTweenRef.current) {
        activeSlideTweenRef.current.kill();
      }

      track.classList.add('is-animating');

      activeSlideTweenRef.current = gsap.to(track, {
        scrollLeft: clampedTarget,
        duration,
        ease: 'power3.out',
        onUpdate: () => {
          scheduleUpdate();
        },
        onComplete: () => {
          track.classList.remove('is-animating');
          updateControlsDOM();
          activeSlideTweenRef.current = null;
        },
      });
    },
    [scheduleUpdate, updateControlsDOM]
  );

  const smoothSlide = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;

      const step = getSlideStep();
      const singleStep = getSingleCardStep();

      let current = track.scrollLeft;
      if (activeSlideTweenRef.current && activeSlideTweenRef.current.isActive()) {
        current = (activeSlideTweenRef.current.vars as { scrollLeft: number }).scrollLeft ?? current;
      }

      let target = current + direction * step;
      target = Math.round(target / singleStep) * singleStep;
      smoothSlideTo(target, 0.95);
    },
    [getSlideStep, getSingleCardStep, smoothSlideTo]
  );

  // Pointer drag listeners with momentum fling physics & click suppression
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return;
      isPointerDownRef.current = true;
      hasDraggedSignificantlyRef.current = false;
      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      startScrollLeftRef.current = track.scrollLeft;
      velocityXRef.current = 0;

      if (activeSlideTweenRef.current) activeSlideTweenRef.current.kill();
      track.classList.add('is-dragging');
      try {
        track.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const currentX = e.clientX;
      const deltaX = currentX - startXRef.current;

      if (Math.abs(deltaX) > 6) {
        hasDraggedSignificantlyRef.current = true;
      }

      if (dt > 10) {
        velocityXRef.current = (currentX - lastXRef.current) / dt;
        lastXRef.current = currentX;
        lastTimeRef.current = now;
      }

      track.scrollLeft = startScrollLeftRef.current - deltaX;
      scheduleUpdate();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      track.classList.remove('is-dragging');

      try {
        if (track.hasPointerCapture(e.pointerId)) {
          track.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      const singleStep = getSingleCardStep();

      if (hasDraggedSignificantlyRef.current) {
        const momentumOffset = -velocityXRef.current * 160;
        let target = track.scrollLeft + momentumOffset;
        target = Math.round(target / singleStep) * singleStep;
        smoothSlideTo(target, 0.85);

        const suppressClick = (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        track.addEventListener('click', suppressClick, { capture: true, once: true });
        setTimeout(() => {
          track.removeEventListener('click', suppressClick, { capture: true });
          hasDraggedSignificantlyRef.current = false;
        }, 180);
      } else {
        hasDraggedSignificantlyRef.current = false;
        const target = Math.round(track.scrollLeft / singleStep) * singleStep;
        smoothSlideTo(target, 0.45);
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);

    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', onPointerUp);
      track.removeEventListener('pointercancel', onPointerUp);
    };
  }, [getSingleCardStep, scheduleUpdate, smoothSlideTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      scheduleUpdate();
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateControlsDOM, { passive: true });
    updateControlsDOM();

    // 3D Mouse Tilt & Specular Glare for carousel cards
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
    const cleanups: (() => void)[] = [];

    if (isFinePointer) {
      cards.forEach((card) => {
        let cachedRect: DOMRect | null = null;
        let tiltRaf: number | null = null;

        const onMouseEnter = () => {
          if (isPointerDownRef.current) return;
          cachedRect = card.getBoundingClientRect();
        };

        const onMouseMove = (e: MouseEvent) => {
          if (isPointerDownRef.current) return;
          if (!cachedRect) cachedRect = card.getBoundingClientRect();
          if (tiltRaf) cancelAnimationFrame(tiltRaf);

          tiltRaf = requestAnimationFrame(() => {
            if (!cachedRect) return;
            const x = e.clientX - cachedRect.left;
            const y = e.clientY - cachedRect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const relX = x / cachedRect.width - 0.5;
            const relY = y / cachedRect.height - 0.5;
            const tiltX = (-relY * 9.5).toFixed(2);
            const tiltY = (relX * 9.5).toFixed(2);
            const baseRotY = parseFloat(card.dataset.scrollRotY || '0');
            const baseTransZ = parseFloat(card.dataset.scrollTransZ || '0');
            const finalRotY = (baseRotY + parseFloat(tiltY)).toFixed(2);

            card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${finalRotY}deg) translate3d(0, -6px, ${baseTransZ + 20}px)`;
          });
        };

        const onMouseLeave = () => {
          if (tiltRaf) cancelAnimationFrame(tiltRaf);
          cachedRect = null;
          const rotY = card.dataset.scrollRotY || '0';
          const transZ = card.dataset.scrollTransZ || '0';
          const scale = card.dataset.scrollScale || '1';
          card.style.transform = `perspective(1200px) rotateY(${rotY}deg) translateZ(${transZ}px) scale(${scale})`;
        };

        card.addEventListener('mouseenter', onMouseEnter, { passive: true });
        card.addEventListener('mousemove', onMouseMove, { passive: true });
        card.addEventListener('mouseleave', onMouseLeave, { passive: true });

        cleanups.push(() => {
          card.removeEventListener('mouseenter', onMouseEnter);
          card.removeEventListener('mousemove', onMouseMove);
          card.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    }

    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateControlsDOM);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      cleanups.forEach((c) => c());
    };
  }, [scheduleUpdate, updateControlsDOM]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>SELECTED WORK</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              ref={prevBtnRef}
              id="carousel-prev-btn"
              type="button"
              className="carousel-nav-btn cursor-pointer"
              onClick={() => smoothSlide(-1)}
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              ref={nextBtnRef}
              id="carousel-next-btn"
              type="button"
              className="carousel-nav-btn cursor-pointer"
              onClick={() => smoothSlide(1)}
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <Link href="/projects" className="btn-secondary text-sm">
            <span>View All 7 Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="projects-carousel-container">
        <div
          ref={trackRef}
          id="projects-carousel-track"
          className="projects-carousel-track"
          tabIndex={0}
          aria-label="Featured Projects Carousel"
          role="region"
        >
          {PROJECTS_LIST.map((project) => (
            <article
              key={project.id}
              className="glass-card project-card p-5 flex flex-col justify-between h-[570px] sm:h-[585px] max-h-[585px] shrink-0"
              data-reveal-item
            >
              <div className="flex flex-col">
                <div className="project-thumb-wrap mb-4 aspect-[4/3] h-[180px] w-full shrink-0">
                  <Image
                    src={project.thumbnail.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`}
                    alt={project.title}
                    width={640}
                    height={480}
                    className="project-thumb"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2 h-6 shrink-0">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {project.category}
                  </span>
                  <span className={`status-badge ${project.statusClass}`}>{project.projectNature}</span>
                </div>
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-2 h-14 flex items-center line-clamp-2 leading-snug shrink-0">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-3 font-sans h-[4.25rem] line-clamp-3 shrink-0">
                  {project.overview}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-white/10 shrink-0">
                <div className="h-[4.5rem] flex flex-wrap gap-1.5 mb-3 content-start overflow-hidden">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-pill shrink-0">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 h-10 shrink-0">
                  <button
                    type="button"
                    data-open-case={project.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="text-xs font-sans font-semibold uppercase tracking-wider text-purple-300 hover:text-cyan-300 transition cursor-pointer"
                  >
                    Case Study + Details
                  </button>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-cyan-300 transition"
                      aria-label={`View ${project.title} Live Project`}
                    >
                      <span>View Project</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </a>
                  ) : project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-cyan-300 transition"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <span>GitHub</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-cyan-300 transition cursor-pointer"
                    >
                      <span>Inspect</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Live Carousel Progress & Interactive Indicators */}
        <div className="flex items-center justify-between mt-6 px-1">
          <div className="carousel-counter font-mono text-xs text-slate-400 flex items-center gap-2">
            <span>PROJECT</span>
            <span ref={currentIndexRef} id="carousel-current-index" className="text-white font-bold text-sm">
              01
            </span>
            <span>/</span>
            <span>07</span>
          </div>

          <div
            id="carousel-progress-track"
            className="carousel-progress-bar w-36 sm:w-48 h-1.5 rounded-full bg-white/10 overflow-hidden"
          >
            <div
              ref={progressFillRef}
              id="carousel-progress-indicator"
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-150"
              style={{ width: `${(1 / totalCards) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
