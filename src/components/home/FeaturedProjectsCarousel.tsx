'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS_LIST, type ProjectCaseStudy } from '@/data/projectsData';
import CaseStudyModal from '@/components/modals/CaseStudyModal';

export default function FeaturedProjectsCarousel() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const total = PROJECTS_LIST.length;

  const updateIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>('.project-card');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '28') || 28;
    const step = cardWidth + gap;

    const idx = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    setCurrentIndex(idx);
  }, [total]);

  const smoothSlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>('.project-card');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '28') || 28;
    const singleStep = cardWidth + gap;

    const trackWidth = track.clientWidth;
    let slideAmount = singleStep;
    if (trackWidth >= 1050) {
      slideAmount = singleStep * 3;
    } else if (trackWidth >= 680) {
      slideAmount = singleStep * 2;
    }

    const target = track.scrollLeft + direction * slideAmount;
    track.scrollTo({
      left: target,
      behavior: 'smooth',
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - track.offsetLeft;
    scrollLeftRef.current = track.scrollLeft;
    track.classList.add('is-dragging');
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!isDraggingRef.current || !track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    dragDistanceRef.current += Math.abs(walk);
    track.scrollLeft = scrollLeftRef.current - walk;
    updateIndexFromScroll();
  };

  const onPointerUp = () => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = false;
    track.classList.remove('is-dragging');
    updateIndexFromScroll();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateIndexFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateIndexFromScroll, { passive: true });
    updateIndexFromScroll();

    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateIndexFromScroll);
    };
  }, [updateIndexFromScroll]);

  const progressPercent = ((currentIndex + 1) / total) * 100;

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
              id="carousel-prev-btn"
              type="button"
              className="carousel-nav-btn"
              onClick={() => smoothSlide(-1)}
              disabled={currentIndex === 0}
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              id="carousel-next-btn"
              type="button"
              className="carousel-nav-btn"
              onClick={() => smoothSlide(1)}
              disabled={currentIndex >= total - 1}
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
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {PROJECTS_LIST.map((project) => (
            <article
              key={project.id}
              className="glass-card project-card p-5 flex flex-col justify-between"
              data-reveal-item
              data-tilt
            >
              <div>
                <div className="project-thumb-wrap mb-5">
                  <Image
                    src={project.thumbnail.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`}
                    alt={project.title}
                    width={640}
                    height={480}
                    className="project-thumb"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                    {project.category}
                  </span>
                  <span className={`status-badge ${project.statusClass}`}>{project.projectNature}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{project.overview}</p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      if (dragDistanceRef.current > 6) return;
                      setSelectedProject(project);
                    }}
                    className="text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-cyan-300 transition cursor-pointer"
                  >
                    Case Study + Details
                  </button>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
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
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <span>GitHub</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition cursor-pointer"
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
            <span className="text-[10px] uppercase tracking-wider text-purple-300">PROJECT</span>
            <span id="carousel-current-index" className="text-white font-bold font-mono">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400 font-mono">07</span>
          </div>

          <div className="carousel-progress-track mx-4 flex-1 max-w-xs">
            <div
              id="carousel-progress-indicator"
              className="carousel-progress-indicator"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Drag, swipe, or click arrows</span>
          </div>
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
