'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

export interface CertificateData {
  title: string;
  meta: string;
  src: string;
  verifyUrl?: string;
  isHackathon?: boolean;
  hasGallery?: boolean;
}

interface TrophyModalProps {
  cert: CertificateData | null;
  onClose: () => void;
}

export default function TrophyModal({ cert, onClose }: TrophyModalProps) {
  const [activeSrc, setActiveSrc] = useState<string>(cert?.src || '');
  const [activeTitle, setActiveTitle] = useState<string>(cert?.title || '');
  const mounted = useModalScrollLock(Boolean(cert));

  useEffect(() => {
    if (cert) {
      setActiveSrc(cert.src);
      setActiveTitle(cert.title);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert || !mounted) return null;

  const resolvedSrc = activeSrc.startsWith('/') ? activeSrc : `/${activeSrc}`;
  const showGallery = Boolean(cert.hasGallery || cert.isHackathon);

  return createPortal(
    <div
      id="cert-lightbox-modal"
      className="modal-backdrop open fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      data-lenis-prevent
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-midnight/95 border border-purple-500/30 p-6 sm:p-7 shadow-2xl space-y-4 touch-pan-y"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">
              VERIFIED CREDENTIAL PREVIEW
            </span>
            <h3 id="cert-lightbox-title" className="font-heading text-xl sm:text-2xl font-bold text-white mt-0.5">
              {activeTitle || cert.title}
            </h3>
            <p id="cert-lightbox-meta" className="font-mono text-xs text-slate-300 mt-1">
              {cert.meta}
            </p>
          </div>
          <button
            id="cert-lightbox-close"
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600/40 border border-white/20 flex items-center justify-center text-white transition cursor-pointer shrink-0 shadow-lg"
            aria-label="Close certificate preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Display Frame */}
        <div className="relative w-full min-h-[300px] max-h-[60vh] rounded-2xl overflow-hidden bg-black/70 border border-white/15 flex items-center justify-center p-2">
          <Image
            id="cert-lightbox-img"
            src={resolvedSrc}
            alt={activeTitle || cert.title}
            width={1200}
            height={800}
            className="max-h-[55vh] w-auto h-auto object-contain rounded-lg transition-opacity duration-200"
            priority
          />
        </div>

        {/* Trophy Gallery Extension for Hackathon Award (Requirement 6) */}
        {showGallery && (
          <div id="cert-gallery-section" className="mt-5 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-wider">
                  🏆 Award Moments &amp; Trophy Gallery
                </span>
                <span className="text-xs text-slate-400 font-mono">(Click image to view in main frame)</span>
              </div>
              <button
                id="cert-show-cert-btn"
                type="button"
                onClick={() => {
                  setActiveSrc(cert.src);
                  setActiveTitle(cert.title);
                }}
                className="btn-secondary text-xs py-1 px-3 cursor-pointer"
              >
                <span>View Certificate</span>
              </button>
            </div>

            <div className="cert-gallery-grid">
              <div
                className="gallery-thumb-card group"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveSrc('/assets/certificates/saurav-hackathon-runnerup.jpg');
                  setActiveTitle('Saurav Bhusal receiving First Runner-Up Trophy & Rs. 10,000/- Check');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSrc('/assets/certificates/saurav-hackathon-runnerup.jpg');
                    setActiveTitle('Saurav Bhusal receiving First Runner-Up Trophy & Rs. 10,000/- Check');
                  }
                }}
                aria-label="View Saurav holding trophy photograph"
              >
                <div className="relative w-full h-[160px] overflow-hidden">
                  <Image
                    src="/assets/certificates/saurav-hackathon-runnerup.jpg"
                    alt="Saurav Bhusal on stage receiving the First Runner-Up Trophy and Rs. 10,000 Award Check"
                    fill
                    className="gallery-thumb-img object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="gallery-thumb-caption">
                  <span>Award Presentation on Stage</span>
                  <span className="text-cyan-400 font-mono">⤢ Inspect</span>
                </div>
              </div>

              <div
                className="gallery-thumb-card group"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveSrc('/assets/certificates/hackathon-trophy.jpg');
                  setActiveTitle('Official First Runner-Up Web Design Competition Trophy');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSrc('/assets/certificates/hackathon-trophy.jpg');
                    setActiveTitle('Official First Runner-Up Web Design Competition Trophy');
                  }
                }}
                aria-label="View close-up of Web Design Competition trophy"
              >
                <div className="relative w-full h-[160px] overflow-hidden">
                  <Image
                    src="/assets/certificates/hackathon-trophy.jpg"
                    alt="Close-up photograph of the First Runner-Up Web Design Competition Trophy"
                    fill
                    className="gallery-thumb-img object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="gallery-thumb-caption">
                  <span>Official Winner Trophy</span>
                  <span className="text-cyan-400 font-mono">⤢ Inspect</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="font-mono text-xs text-slate-400">Issued to Saurav Bhusal • Verified Credential Scan</span>
          {cert.verifyUrl ? (
            <a
              id="cert-lightbox-verify"
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 inline-flex items-center gap-1.5 shadow-violet cursor-pointer"
            >
              <span>Verify Online at Issuer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div id="cert-lightbox-verify" className="hidden" />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
