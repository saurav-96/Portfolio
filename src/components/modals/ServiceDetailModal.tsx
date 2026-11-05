'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X, CheckCircle2, ChevronDown, Clock, ArrowRight } from 'lucide-react';
import type { ServiceDetail } from '@/data/servicesData';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useModalScrollLock(Boolean(service));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service || !mounted) return null;

  return createPortal(
    <div
      id="service-detail-modal"
      className="modal-backdrop open fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      data-lenis-prevent
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl bg-midnight/95 border border-purple-500/30 p-4 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Close Button */}
        <button
          id="service-modal-close"
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-purple-600/40 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer shadow-lg w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0"
          aria-label="Close service modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Content Body */}
        <div id="service-modal-body" className="space-y-6 pt-1">
          {/* Header */}
          <div className="space-y-2 pr-10 sm:pr-12">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300">
                {service.badge}
              </span>
            </div>
            <h2 id="service-modal-title" className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {service.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed pt-1 font-body">{service.description}</p>
          </div>

          {/* Deliverables & Inclusions */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> What's Included &amp; Deliverables
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.included.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agile 4-Step Workflow */}
          <div className="space-y-3 pt-2">
            <h3 className="font-mono text-xs text-purple-300 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" /> Standard Engineering Workflow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.workflow.map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">{step.step}</span>
                  <div className="font-heading text-xs font-semibold text-white">{step.title}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-body">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {service.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-cyan-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 font-body">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              onClick={onClose}
              className="btn-primary py-3 px-6 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 inline-flex items-center gap-2 shadow-violet"
            >
              <span>{service.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-mono text-xs text-slate-400">Milestone-based Escrow • SLA Guaranteed</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
