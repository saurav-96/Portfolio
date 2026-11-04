'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';

export interface CertificateData {
  title: string;
  meta: string;
  src: string;
  verifyUrl?: string;
  isHackathon?: boolean;
}

interface TrophyModalProps {
  cert: CertificateData | null;
  onClose: () => void;
}

export default function TrophyModal({ cert, onClose }: TrophyModalProps) {
  const [activeSrc, setActiveSrc] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState<string>('');

  useEffect(() => {
    if (cert) {
      setActiveSrc(cert.src);
      setActiveTitle(cert.title);
      document.body.style.overflow = 'hidden';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  const resolvedSrc = activeSrc.startsWith('/') ? activeSrc : `/${activeSrc}`;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-2xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-midnight/95 border border-purple-500/30 p-6 sm:p-7 shadow-2xl space-y-4"
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
            <p className="font-mono text-xs text-slate-300 mt-1">{cert.meta}</p>
          </div>
          <button
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
            src={resolvedSrc}
            alt={activeTitle || cert.title}
            width={1200}
            height={800}
            className="max-h-[55vh] w-auto h-auto object-contain rounded-lg transition-opacity duration-200"
          />
        </div>

        {/* Trophy Gallery Extension for Hackathon Award */}
        {cert.isHackathon && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber-300 uppercase tracking-wider font-semibold">
                🏆 Award Moments &amp; Trophy Gallery
              </span>
              {activeSrc !== cert.src && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSrc(cert.src);
                    setActiveTitle(cert.title);
                  }}
                  className="btn-secondary text-xs py-1 px-3 rounded-lg text-slate-300 hover:text-white"
                >
                  View Certificate
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveSrc('/assets/certificates/saurav-hackathon-runnerup.jpg');
                  setActiveTitle('Saurav Bhusal receiving First Runner-Up Trophy & Rs. 10,000/- Check');
                }}
                className={`p-2 rounded-xl bg-white/[0.03] border transition cursor-pointer flex items-center gap-3 ${
                  activeSrc.includes('runnerup') ? 'border-cyan-400 bg-white/[0.08]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/assets/certificates/saurav-hackathon-runnerup.jpg"
                    alt="Stage presentation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Award Presentation on Stage</div>
                  <div className="text-[10px] text-cyan-300 font-mono mt-0.5">Click to Inspect in Frame</div>
                </div>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveSrc('/assets/certificates/hackathon-trophy.jpg');
                  setActiveTitle('Official First Runner-Up Web Design Competition Trophy');
                }}
                className={`p-2 rounded-xl bg-white/[0.03] border transition cursor-pointer flex items-center gap-3 ${
                  activeSrc.includes('trophy') ? 'border-cyan-400 bg-white/[0.08]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/assets/certificates/hackathon-trophy.jpg"
                    alt="Winner trophy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Official Winner Trophy</div>
                  <div className="text-[10px] text-cyan-300 font-mono mt-0.5">Click to Inspect in Frame</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="font-mono text-xs text-slate-400">Issued to Saurav Bhusal • Verified Credential Scan</span>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 inline-flex items-center gap-1.5 shadow-violet"
            >
              <span>Verify Online at Issuer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
