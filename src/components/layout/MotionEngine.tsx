'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address-bar hide/show from triggering expensive layout recalculations
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export default function MotionEngine() {
  const pathname = usePathname();
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // 1. Ambient Cursor Spotlight (Desktop fine pointer only)
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    let spotlight = spotlightRef.current;
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

    const setX = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power2.out' });
    const setY = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (!document.body.classList.contains('cursor-active')) {
        document.body.classList.add('cursor-active');
      }
      setX(e.clientX);
      setY(e.clientY);
    };

    const onMouseLeave = () => {
      document.body.classList.remove('cursor-active');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // 2. Main ScrollTrigger & 3D Motion System
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const ctx = gsap.context(() => {
      const tiltCleanups: (() => void)[] = [];

      // A. 3D Card Tilt + Cursor Radial Glare (Desktop mouse/pointer only, excluding horizontal carousel cards)
      const allGlassCards = Array.from(document.querySelectorAll<HTMLElement>('.glass-card, .project-card')).filter(
        (card) => !card.closest('.projects-carousel-track')
      );
      allGlassCards.forEach((card) => {
        if (!card.hasAttribute('data-tilt')) {
          card.setAttribute('data-tilt', '');
        }
      });

      if (isFinePointer) {
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

        // B. 3D Portrait Stage Interactive Tilt (Home page)
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

        // C. Magnetic Buttons with GSAP quickTo
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

      // D. Hero Section 3D Entrance (Runs immediately on mount / route transition)
      const heroElements = document.querySelectorAll<HTMLElement>('[data-hero-reveal]');
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

      // E1. HOME CREDIBILITY STRIP 3D SCROLL ENTRANCE INTO PLACE
      const credCards = Array.from(document.querySelectorAll<HTMLElement>('.home-credibility-strip .glass-card'));
      if (credCards.length > 0) {
        gsap.fromTo(
          credCards,
          {
            opacity: 0,
            y: 48,
            z: -65,
            rotationX: -12,
            scale: 0.94,
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
            clearProps: 'transformPerspective,z',
            scrollTrigger: {
              trigger: document.querySelector('.home-credibility-strip') || credCards[0],
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // E2. HOME CREATIVE PHILOSOPHY 4-COLUMN BENTO 3D SCROLL ENTRANCE INTO PLACE
      const philosophyGrid = document.querySelector<HTMLElement>('.home-philosophy-grid');
      const philosophyCards = Array.from(document.querySelectorAll<HTMLElement>('.home-philosophy-grid .glass-card'));
      if (philosophyCards.length > 0) {
        gsap.fromTo(
          philosophyCards,
          {
            opacity: 0,
            y: 55,
            z: -70,
            rotationX: -14,
            scale: 0.93,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.10,
            ease: 'power3.out',
            clearProps: 'transformPerspective,z',
            scrollTrigger: {
              trigger: philosophyGrid || philosophyCards[0],
              start: 'top 86%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // E3. HOME SERVICES PREVIEW GRID 3D SCROLL ENTRANCE INTO PLACE
      const servicesGrid = document.querySelector<HTMLElement>('.home-services-grid');
      const servicesCards = Array.from(document.querySelectorAll<HTMLElement>('.home-services-grid .glass-card'));
      if (servicesCards.length > 0) {
        gsap.fromTo(
          servicesCards,
          {
            opacity: 0,
            y: 50,
            z: -60,
            rotationX: -12,
            scale: 0.94,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.10,
            ease: 'power3.out',
            clearProps: 'transformPerspective,z',
            scrollTrigger: {
              trigger: servicesGrid || servicesCards[0],
              start: 'top 86%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // E4. HOME BOTTOM CALL-TO-ACTION CARD 3D SCROLL ENTRANCE INTO PLACE
      const ctaCard = document.querySelector<HTMLElement>('.home-cta-card');
      if (ctaCard) {
        gsap.fromTo(
          ctaCard,
          {
            opacity: 0,
            y: 50,
            z: -65,
            rotationX: -10,
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
            ease: 'power3.out',
            clearProps: 'transformPerspective,z',
            scrollTrigger: {
              trigger: ctaCard,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // E5. UNIVERSAL SCROLL-BASED 3D COMPONENT ANIMATION (Subpages & Other Sections)
      const otherCards = Array.from(
        document.querySelectorAll<HTMLElement>('.glass-card, .project-card, [data-reveal-item]')
      ).filter((card) => {
        if (card.closest('[data-hero-reveal]')) return false;
        if (card.closest('.home-credibility-strip')) return false;
        if (card.closest('.home-philosophy-grid')) return false;
        if (card.closest('.home-services-grid')) return false;
        if (card.closest('.home-cta-card')) return false;
        if (card.closest('.projects-carousel-track')) return false;
        if (card.tagName === 'MAIN' || card.tagName === 'SECTION') return false;
        return true;
      });

      otherCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            z: -65,
            rotationX: -12,
            rotationY: index % 2 === 0 ? -3 : 3,
            scale: 0.94,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.80,
            ease: 'power3.out',
            clearProps: 'transformPerspective,z',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // F. DEDICATED FEATURED PROJECTS CAROUSEL SMOOTH SCROLL REVEAL (Home page)
      const projectsCarouselTrack = document.getElementById('projects-carousel-track');
      if (projectsCarouselTrack) {
        const carouselSection = projectsCarouselTrack.closest('section');
        const sectionHeader = carouselSection ? carouselSection.querySelector<HTMLElement>('[data-reveal-item]') : null;
        const initialCards = Array.from(projectsCarouselTrack.querySelectorAll<HTMLElement>('.project-card')).slice(0, 3);
        const remainingCards = Array.from(projectsCarouselTrack.querySelectorAll<HTMLElement>('.project-card')).slice(3);

        gsap.set(remainingCards, { opacity: 1, y: 0, scale: 1 });

        const carouselTl = gsap.timeline({
          scrollTrigger: {
            trigger: carouselSection || projectsCarouselTrack,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        if (sectionHeader) {
          carouselTl.fromTo(
            sectionHeader,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
          );
        }

        carouselTl.fromTo(
          initialCards,
          {
            opacity: 0,
            y: 52,
            scale: 0.94,
            rotationX: -10,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.95,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          '-=0.45'
        );
      }

      // G. Section Headings & Badges 3D Scroll Entrance
      const sectionHeaders = document.querySelectorAll<HTMLElement>(
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
              toggleActions: 'play none none none',
              once: true,
            },
            onComplete: () => {
              header.style.transform = '';
              header.style.opacity = '1';
            },
          }
        );
      });

      // H. Scroll-Based Parallax on Hero Portrait, Studio Aura & Base Orbit Ring
      const portraitStage = document.querySelector<HTMLElement>('.hero-portrait-stage');
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

      // I. Dynamic Working Process Timeline (Services page)
      const timelineContainer = document.getElementById('working-process-timeline');
      const timelineFill = document.getElementById('timeline-progress-fill');
      if (timelineContainer && timelineFill) {
        const steps = timelineContainer.querySelectorAll('.timeline-step');
        ScrollTrigger.create({
          trigger: timelineContainer,
          start: 'top 78%',
          end: 'bottom 60%',
          scrub: 0.35,
          onUpdate: (self) => {
            const p = self.progress;
            timelineFill.style.transform = `scaleY(${p})`;
            steps.forEach((step, idx) => {
              const stepThreshold = steps.length > 1 ? idx / (steps.length - 1) : 0;
              if (p >= stepThreshold - 0.06) {
                step.classList.add('is-active');
              } else {
                step.classList.remove('is-active');
              }
            });
          },
        });
      }

      // J. Top Scroll Progress Bar Sync
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

      // K. Pause Offscreen CSS Keyframe Work (optimize-web-animations)
      if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
            });
          },
          { threshold: 0.02, rootMargin: '120px 0px 120px 0px' }
        );
        document.querySelectorAll('section, footer').forEach((sec) => {
          sectionObserver.observe(sec);
        });
      }

      // L. Multi-Stage ScrollTrigger Refresh to account for dynamic fonts & image loading
      const refreshTimers = [
        setTimeout(() => ScrollTrigger.refresh(), 100),
        setTimeout(() => ScrollTrigger.refresh(), 350),
        setTimeout(() => ScrollTrigger.refresh(), 800),
      ];

      const onWindowLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onWindowLoad);
      window.addEventListener('resize', onWindowLoad);

      tiltCleanups.push(() => {
        refreshTimers.forEach(clearTimeout);
        window.removeEventListener('load', onWindowLoad);
        window.removeEventListener('resize', onWindowLoad);
      });

      return () => {
        tiltCleanups.forEach((cleanup) => cleanup());
      };
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
