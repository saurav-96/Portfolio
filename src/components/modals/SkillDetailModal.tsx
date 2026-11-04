'use client';

import { useEffect } from 'react';
import { X, CheckCircle2, Layers } from 'lucide-react';
import type { SkillDetail } from '@/data/skillsData';

interface SkillDetailModalProps {
  skill: SkillDetail | null;
  onClose: () => void;
}

export default function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skill) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-skill-title"
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-midnight/95 border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 float-right z-30 p-2 rounded-full bg-white/10 hover:bg-purple-600/40 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer shadow-lg"
          aria-label="Close skill modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300">
              {skill.category}
            </span>
            <span className={`status-badge ${skill.badgeClass}`}>{skill.proficiencyLevel}</span>
          </div>
          <h2 id="modal-skill-title" className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {skill.name}
          </h2>
          <p className="font-mono text-xs text-cyan-300">{skill.tagline}</p>
        </div>

        {/* Description */}
        <div className="text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
          <p>{skill.description}</p>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs text-purple-300 uppercase tracking-widest font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Core Engineering Capabilities
          </h3>
          <ul className="grid grid-cols-1 gap-2">
            {skill.capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.03] p-2.5 rounded-xl border border-white/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical Applications */}
        <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
          <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Practical Applications in Projects
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">{skill.practicalApplications}</p>
        </div>

        {/* Ecosystem & Tools */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Associated Ecosystem &amp; Libraries
          </h3>
          <div className="flex flex-wrap gap-2">
            {skill.ecosystem.map((tool) => (
              <span
                key={tool}
                className="text-xs px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-200 font-mono"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
