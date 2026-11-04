'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS_LIST, type ProjectCaseStudy } from '@/data/projectsData';
import CaseStudyModal from '@/components/modals/CaseStudyModal';

export default function FeaturedProjectsCarousel() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const total = PROJECTS_LIST.length;

  const updateIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 24 : 340;
    const idx = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / cardWidth)));
    setCurrentIndex(idx);
  }, [total]);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const targetIdx = Math.min(total - 1, Math.max(0, idx));
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 24 : 340;
    track.scrollTo({
      left: targetIdx * cardWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(targetIdx);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - track.offsetLeft;
    scrollLeftRef.current = track.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!isDraggingRef.current || !track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    track.scrollLeft = scrollLeftRef.current - walk;
    updateIndexFromScroll();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    updateIndexFromScroll();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => updateIndexFromScroll();
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
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
              type="button"
              onClick={() => scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="carousel-nav-btn p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(currentIndex + 1)}
              disabled={currentIndex >= total - 1}
              className="carousel-nav-btn p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <Link href="/projects" className="btn-secondary text-sm">
            <span>View All 7 Projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="projects-carousel-container relative">
        <div
          ref={trackRef}
          className="projects-carousel-track flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          tabIndex={0}
          aria-label="Featured Projects Carousel"
          role="region"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {PROJECTS_LIST.map((project) => (
            <article
              key={project.id}
              className="glass-card project-card p-5 flex flex-col justify-between w-[320px] sm:w-[380px] shrink-0 snap-start transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="project-thumb-wrap mb-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                  <Image
                    src={project.thumbnail.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`}
                    alt={project.title}
                    fill
                    className="project-thumb object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="380px"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                    {project.category}
                  </span>
                  <span className={`status-badge ${project.statusClass}`}>{project.projectNature}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">{project.overview}</p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-pill text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/5 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
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

          <div className="carousel-progress-track mx-4 flex-1 max-w-xs h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              id="carousel-progress-indicator"
              className="carousel-progress-indicator h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Drag, swipe, or click arrows</span>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
