'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ExternalLink, Github, X, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ProjectCaseStudy } from '@/data/projectsData';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const mounted = useModalScrollLock(Boolean(project));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project || !mounted) return null;

  return createPortal(
    <div
      id="case-study-modal"
      className="modal-backdrop open fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      data-lenis-prevent
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-midnight/95 border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6 touch-pan-y"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="case-study-modal-close"
          type="button"
          onClick={onClose}
          className="sticky top-0 float-right z-30 p-2 rounded-full bg-white/10 hover:bg-purple-600/40 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer shadow-lg"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body */}
        <div id="case-study-modal-body" className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-semibold">
                {project.number}
              </span>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
                {project.category}
              </span>
              <span className={`status-badge ${project.statusClass}`}>{project.projectNature}</span>
            </div>

            <h2 id="modal-project-title" className="font-heading text-2xl sm:text-4xl font-bold text-white">
              {project.title}
            </h2>
          </div>

          {/* Thumbnail Preview */}
          {project.thumbnail && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 860px"
              />
            </div>
          )}

          {/* Feature Breakdown if present (e.g. YouTube Power-Tools) */}
          {project.featureBreakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="font-heading text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                  ✓ Implemented Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-200 list-disc pl-4 font-body">
                  {project.featureBreakdown.implemented.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <h4 className="font-heading text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  ◎ Planned Roadmap Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4 font-body">
                  {project.featureBreakdown.planned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Gallery Assets if present (e.g. Creative Design Showcase) */}
          {project.galleryAssets && project.galleryAssets.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-pink-300 font-semibold">
                Visual Design Assets Gallery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryAssets.map((asset) => (
                  <div key={asset.src} className="rounded-xl overflow-hidden bg-black/40 border border-white/10 p-3 group">
                    <div className="relative w-full h-44 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={asset.src.startsWith('/') ? asset.src : `/${asset.src}`}
                        alt={asset.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                    </div>
                    <span className="font-heading text-xs font-semibold text-white block text-center">
                      {asset.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2 rounded-xl font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          {/* Case Study Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-4">
              <div>
                <h3 className="font-mono text-xs text-purple-300 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Project Overview
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.overview}</p>
              </div>

              <div>
                <h3 className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-1.5">
                  The Problem
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.problem}</p>
              </div>

              <div>
                <h3 className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-1.5">
                  Engineering Objective
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.objective}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-mono text-xs text-purple-300 uppercase tracking-widest font-semibold mb-1.5">
                  My Contribution &amp; Role
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.contribution}</p>
              </div>

              <div>
                <h3 className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-1.5">
                  Technical Challenges &amp; Solutions
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.challenges}</p>
              </div>

              <div>
                <h3 className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delivered Outcomes
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">{project.outcomes}</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2.5">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-200 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
