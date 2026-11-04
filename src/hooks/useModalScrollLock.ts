'use client';

import { useEffect, useState } from 'react';

/**
 * Universal Modal Scroll Lock Hook
 * - Portals modals to document.body so they escape any parent z-index stacking context
 * - Stops Lenis smooth scrolling so touch/wheel events don't bleed into the background
 * - Applies .modal-open to html and body with touch-action: none for rock-solid mobile prevention
 * - Restores smooth scrolling and cleanup on unmount/close
 */
export function useModalScrollLock(isOpen: boolean) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    const lenis = (window as any).portfolioLenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');

      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [isOpen]);

  return mounted;
}
