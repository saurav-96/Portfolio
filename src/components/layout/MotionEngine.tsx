'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MotionEngine() {
  const pathname = usePathname();
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Ambient Cursor Spotlight (Desktop fine pointer only)
    let spotlight = spotlightRef.current;
    let setX: ((val: number) => void) | null = null;
    let setY: ((val: number) => void) | null = null;

    if (isFinePointer && !prefersReducedMotion) {
      if (!spotlight) {
        spotlight = document.querySelector('.ambient-cursor-spotlight');
        if (!spotlight) {
          spotlight = document.createElement('div');
          spotlight.className = 'ambient-cursor-spotlight';
          spotlight.setAttribute('aria-hidden', 'true');
          document.body.appendChild(spotlight);
        }
        spotlightRef.current = spotlight;
      }

      setX = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power2.out' });
      setY = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        if (!document.body.classList.contains('cursor-active')) {
          document.body.classList.add('cursor-active');
        }
        if (setX && setY) {
          setX(e.clientX);
          setY(e.clientY);
        }
      };

      const onMouseLeave = () => {
        document.body.classList.remove('cursor-active');
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseleave', onMouseLeave, { passive: true });

      // Clean up pointer listeners on unmount
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Clean any prior ScrollTriggers for page content
    const ctx = gsap.context(() => {
      // 2. High-Performance 3D Card Tilt + Cursor Radial Glare
      const allGlassCards = document.querySelectorAll<HTMLElement>('.glass-card, .project-card');
      const tiltCleanups: (() => void)[] = [];

      if (isFinePointer && !prefersReducedMotion) {
        allGlassCards.forEach((card) => {
          const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '8.5');
          let rafId: number | null = null;
          let cachedRect: DOMRect | null = null;

          const onMouseEnter = () => {
            cachedRect = card.getBoundingClientRect();
          };

          const onMouseMove = (e: MouseEvent) => {
            if (!cachedRect) cachedRect = card.getBoundingClientRect();
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              if (!cachedRect) return;
              const x = e.clientX - cachedRect.left;
              const y = e.clientY - cachedRect.top;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              const relX = x / cachedRect.width - 0.5;
              const relY = y / cachedRect.height - 0.5;
              const rotX = (-relY * maxTilt * 2).toFixed(2);
              const rotY = (relX * maxTilt * 2).toFixed(2);
              card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -8px, 24px)`;
            });
          };

          const onMouseLeave = () => {
            if (rafId) cancelAnimationFrame(rafId);
            cachedRect = null;
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px)';
          };

          card.addEventListener('mouseenter', onMouseEnter, { passive: true });
          card.addEventListener('mousemove', onMouseMove, { passive: true });
          card.addEventListener('mouseleave', onMouseLeave, { passive: true });

          tiltCleanups.push(() => {
            if (rafId) cancelAnimationFrame(rafId);
            card.removeEventListener('mouseenter', onMouseEnter);
            card.removeEventListener('mousemove', onMouseMove);
            card.removeEventListener('mouseleave', onMouseLeave);
          });
        });

        // 3. 3D Portrait Stage Interactive Tilt (Home page)
        const portraitStage = document.querySelector<HTMLElement>('.hero-portrait-stage');
        if (portraitStage) {
          let stageRaf: number | null = null;
          const onStageMouseMove = (e: MouseEvent) => {
            if (stageRaf) cancelAnimationFrame(stageRaf);
            stageRaf = requestAnimationFrame(() => {
              const nx = (e.clientX / window.innerWidth - 0.5) * 2;
              const ny = (e.clientY / window.innerHeight - 0.5) * 2;
              const rotY = (nx * 8.5).toFixed(2);
              const rotX = (-ny * 6.5).toFixed(2);
              portraitStage.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            });
          };

          window.addEventListener('mousemove', onStageMouseMove, { passive: true });
          tiltCleanups.push(() => {
            if (stageRaf) cancelAnimationFrame(stageRaf);
            window.removeEventListener('mousemove', onStageMouseMove);
          });
        }

        // 4. Magnetic Buttons
        document.querySelectorAll<HTMLElement>('[data-magnetic], .btn-primary, .btn-secondary').forEach((btn) => {
          const xTo = gsap.quickTo(btn, 'x', { duration: 0.32, ease: 'power2.out' });
          const yTo = gsap.quickTo(btn, 'y', { duration: 0.32, ease: 'power2.out' });
          let btnRect: DOMRect | null = null;

          const onEnter = () => {
            btnRect = btn.getBoundingClientRect();
          };
          const onMove = (e: MouseEvent) => {
            if (!btnRect) btnRect = btn.getBoundingClientRect();
            const dx = e.clientX - (btnRect.left + btnRect.width / 2);
            const dy = e.clientY - (btnRect.top + btnRect.height / 2);
            xTo(dx * 0.22);
            yTo(dy * 0.25);
          };
          const onLeave = () => {
            btnRect = null;
            xTo(0);
            yTo(0);
          };

          btn.addEventListener('mouseenter', onEnter, { passive: true });
          btn.addEventListener('mousemove', onMove, { passive: true });
          btn.addEventListener('mouseleave', onLeave, { passive: true });

          tiltCleanups.push(() => {
            btn.removeEventListener('mouseenter', onEnter);
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
          });
        });
      }

      if (prefersReducedMotion) return;

      // 5. Hero Section 3D Entrance
      const heroElements = document.querySelectorAll('[data-hero-reveal]');
      if (heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          {
            opacity: 0,
            y: 35,
            z: -55,
            rotationX: -12,
            scale: 0.95,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      // 6. Universal Scroll-Based 3D Component Animation
      const scrollComponents = document.querySelectorAll(
        'section:not(:first-of-type) .glass-card, section:not(:first-of-type) .project-card, [data-reveal-group] > *'
      );

      scrollComponents.forEach((card, index) => {
        if (card.closest('[data-hero-reveal]') || card.closest('.projects-carousel-track')) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 65,
            z: -95,
            rotationX: -18,
            rotationY: index % 2 === 0 ? -4 : 4,
            scale: 0.91,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
            onComplete: () => {
              (card as HTMLElement).style.transform = '';
              (card as HTMLElement).style.opacity = '1';
            },
          }
        );
      });

      // 7. Section Headings & Badges 3D Scroll Entrance
      const sectionHeaders = document.querySelectorAll(
        'section:not(:first-of-type) .eyebrow-badge, section:not(:first-of-type) h2, section:not(:first-of-type) > div > .max-w-2xl'
      );
      sectionHeaders.forEach((header) => {
        if (header.closest('[data-hero-reveal]')) return;
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: 35,
            z: -50,
            rotationX: -14,
            transformPerspective: 1100,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            onComplete: () => {
              (header as HTMLElement).style.transform = '';
              (header as HTMLElement).style.opacity = '1';
            },
          }
        );
      });

      // 8. Scroll-Based Parallax on Hero Portrait, Studio Aura & Base Orbit Ring
      const portraitStage = document.querySelector('.hero-portrait-stage');
      if (portraitStage) {
        gsap.to('.portrait-frame', {
          y: -32,
          z: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitStage,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to('.neon-orbit-ring', {
          rotationX: 84,
          rotationZ: 45,
          scale: 1.15,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitStage,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to('.portrait-glow-aura', {
          scale: 1.25,
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitStage,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }

      // 9. Scroll Progress Bar Sync
      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) {
        ScrollTrigger.create({
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            progressBar.style.width = `${(self.progress * 100).toFixed(1)}%`;
          },
        });
      }

      // Refresh ScrollTrigger after DOM has settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        tiltCleanups.forEach((cleanup) => cleanup());
      };
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return (
    <>
      {/* Fixed Scroll Progress Indicator */}
      <div id="scroll-progress-bar" className="scroll-progress-bar" aria-hidden="true" />
    </>
  );
}
