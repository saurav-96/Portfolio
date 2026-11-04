'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { PROJECT_CASE_STUDIES, type ProjectCaseStudy } from '@/data/projectsData';
import CaseStudyModal from '@/components/modals/CaseStudyModal';

function SearchParamsReader({
  onParams
}: {
  onParams: (filter: string, project: string) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const f = searchParams.get('filter');
    const p = searchParams.get('project');
    if (f || p) {
      onParams(f || '', p || '');
    }
  }, []);
  return null;
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const handleUrlParams = (filter: string, project: string) => {
    if (filter) setActiveFilter(filter);
    if (project && PROJECT_CASE_STUDIES[project as keyof typeof PROJECT_CASE_STUDIES]) {
      setSelectedProject(PROJECT_CASE_STUDIES[project as keyof typeof PROJECT_CASE_STUDIES]);
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'uiux', label: 'UI/UX Design' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'graphic', label: 'Graphic Design' },
  ];

  // Map each project key to its categories
  const projectList = useMemo(() => [
    {
      ...PROJECT_CASE_STUDIES.swasthyasutra,
      categories: ['web', 'uiux'],
      codeNumber: '01 • Healthcare Technology',
      badge: 'Live Web App',
      badgeClass: 'status-live',
      pills: ['React', 'Tailwind CSS', 'SanjeevanAI Engine', 'Telemedicine UI'],
      type: 'web',
      accentColor: 'text-cyan-400'
    },
    {
      ...PROJECT_CASE_STUDIES.keyflow,
      categories: ['web', 'uiux'],
      codeNumber: '02 • Productivity Web App',
      badge: 'Live Web App',
      badgeClass: 'status-live',
      pills: ['React 19', 'Vite 6', 'Tailwind CSS', 'LocalStorage'],
      type: 'web',
      accentColor: 'text-purple-300'
    },
    {
      ...PROJECT_CASE_STUDIES.egov,
      categories: ['web', 'uiux'],
      codeNumber: '03 • Civic Technology',
      badge: 'Live Concept',
      badgeClass: 'status-live',
      pills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      type: 'web',
      accentColor: 'text-cyan-400'
    },
    {
      ...PROJECT_CASE_STUDIES.youtubepowertools,
      categories: ['web'],
      codeNumber: '04 • Browser Extension / JS',
      badge: 'CS50x Project',
      badgeClass: 'status-live',
      pills: ['Chrome Extension MV3', 'JavaScript (ES6+)', 'HTML5 Canvas', 'CS50x Final Project'],
      type: 'extension',
      accentColor: 'text-purple-300'
    },
    {
      ...PROJECT_CASE_STUDIES.mindfulyou,
      categories: ['uiux'],
      codeNumber: '05 • UI/UX Design Concept',
      badge: 'Design Prototype',
      badgeClass: 'status-concept',
      pills: ['Figma', 'Wireframing', 'Prototyping', 'Mobile UI'],
      type: 'uiux',
      accentColor: 'text-cyan-400'
    },
    {
      ...PROJECT_CASE_STUDIES.aiautomation,
      categories: ['ai'],
      codeNumber: '06 • AI / Python',
      badge: 'R&D Sandbox',
      badgeClass: 'status-lab',
      pills: ['Python', 'AI Workflows', 'CLI Scripts', 'Automation'],
      type: 'ai',
      accentColor: 'text-purple-300'
    },
    {
      ...PROJECT_CASE_STUDIES.creativedesign,
      categories: ['graphic', 'uiux'],
      codeNumber: '07 • Graphic Design',
      badge: 'Visual Suite',
      badgeClass: 'status-concept',
      type: 'graphic',
      accentColor: 'text-pink-400'
    }
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectList;
    return projectList.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter, projectList]);

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsReader onParams={handleUrlParams} />
      </Suspense>
      <main id="main-content" className="pt-28 sm:pt-32 pb-20">
        {/* ===================================================================
             HEADER & INTERACTIVE CATEGORY FILTERS
             =================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div data-hero-reveal className="mb-3">
              <span className="eyebrow-badge">
                <span className="eyebrow-dot"></span>
                <span>MY WORK &amp; CASE STUDIES</span>
              </span>
            </div>

            <h1 data-hero-reveal className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Explore My <span className="text-gradient">Projects</span>
            </h1>
            <p data-hero-reveal className="text-slate-300 text-base sm:text-lg">
              A curated collection of live web applications, browser extensions, UI/UX concepts, AI automation experiments, and visual design explorations. Click any project to inspect its full case study.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div data-hero-reveal className="flex flex-wrap items-center justify-center gap-2.5 mb-4" role="toolbar" aria-label="Filter projects by category">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <span id="project-count-label" className="font-mono text-xs text-slate-400" aria-live="polite">
              Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
            </span>
          </div>
        </section>

        {/* ===================================================================
             PROJECT SHOWCASE GRID (ALL 7 PROJECTS)
             =================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {/* PROJECT 01: SWASTHYASUTRA */}
            {filteredProjects.some((p) => p.id === 'swasthyasutra') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/swasthyasutra-thumb.png"
                      alt="SwasthyaSutra AI Smart Healthcare and Telemedicine Platform Showcase"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-cyan-400">01 • Healthcare Technology</span>
                    <span className="status-badge status-live">Live Web App</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">SwasthyaSutra</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    A healthcare-focused digital platform designed to make healthcare information and services more accessible.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">React</span>
                    <span className="tech-pill">Tailwind CSS</span>
                    <span className="tech-pill">SanjeevanAI Engine</span>
                    <span className="tech-pill">Telemedicine UI</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.swasthyasutra)}
                      className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                    >
                      <span>Case Study</span>
                    </button>
                    <a
                      href="https://saurav-96.github.io/SwasthyaSutra/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
                    >
                      <span>Live Demo</span>
                      <span className="circle-cta" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 02: KEYFLOW */}
            {filteredProjects.some((p) => p.id === 'keyflow') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/keyflow-thumb.png"
                      alt="KeyFlow Personal Keyboard Shortcut Manager SaaS Productivity Web App"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-purple-300">02 • Productivity Web App</span>
                    <span className="status-badge status-live">Live Web App</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">KeyFlow</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    A productivity-focused web experience designed around organization, workflow management, and focus.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">React 19</span>
                    <span className="tech-pill">Vite 6</span>
                    <span className="tech-pill">Tailwind CSS</span>
                    <span className="tech-pill">LocalStorage</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.keyflow)}
                      className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                    >
                      <span>Case Study</span>
                    </button>
                    <a
                      href="https://saurav-96.github.io/KeyFlow/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
                    >
                      <span>Live Demo</span>
                      <span className="circle-cta" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 03: E-GOVERNMENT PLATFORM */}
            {filteredProjects.some((p) => p.id === 'egov') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/egov-thumb.png"
                      alt="Butwal SmartGov AI E-Government Civic Portal Showcase"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-cyan-400">03 • Civic Technology</span>
                    <span className="status-badge status-live">Live Concept</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">E-Government Platform</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    A digital governance platform concept focused on making public services more accessible through modern web technologies.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">React 18</span>
                    <span className="tech-pill">TypeScript</span>
                    <span className="tech-pill">Tailwind CSS</span>
                    <span className="tech-pill">Framer Motion</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.egov)}
                      className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                    >
                      <span>Case Study</span>
                    </button>
                    <a
                      href="https://saurav-96.github.io/E-Governmet-platform/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
                    >
                      <span>Live Demo</span>
                      <span className="circle-cta" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 04: YOUTUBE POWER-TOOLS (TUBEKIT) */}
            {filteredProjects.some((p) => p.id === 'youtubepowertools') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/tubekit-thumb.png"
                      alt="YouTube Power-Tools (TubeKit) Chrome Extension MV3 In-Player Utility Suite"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-purple-300">04 • Browser Extension / JS</span>
                    <span className="status-badge status-live">CS50x Project</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">YouTube Power-Tools</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    A browser extension project exploring useful YouTube productivity features, including playback controls, thumbnail capture, screenshots, and keyboard shortcuts.
                  </p>

                  {/* Clear Distinction of Implemented vs Planned Features */}
                  <div className="p-3 rounded-xl bg-white/[0.025] border border-white/10 text-xs space-y-1.5 mb-4">
                    <div className="text-emerald-300 font-mono">
                      ✓ Implemented: <span className="text-slate-300 font-sans">7-element in-player pill, 0.10x–4.00x speed steps, lossless PNG frame screenshot, HD thumbnail grabber, hotkeys</span>
                    </div>
                    <div className="text-cyan-300 font-mono">
                      ◎ Planned: <span className="text-slate-400 font-sans">Markdown timestamp notes &amp; A–B loop sync</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">Chrome Extension MV3</span>
                    <span className="tech-pill">JavaScript (ES6+)</span>
                    <span className="tech-pill">HTML5 Canvas</span>
                    <span className="tech-pill">CS50x Final Project</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.youtubepowertools)}
                      className="btn-secondary text-xs py-2 px-3.5 cursor-pointer"
                    >
                      <span>Case Study</span>
                    </button>
                    <a
                      href="https://github.com/saurav-96/TubeKit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition"
                    >
                      <span>GitHub Repo</span>
                      <span className="circle-cta" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 05: MINDFUL YOU */}
            {filteredProjects.some((p) => p.id === 'mindfulyou') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/mindful-you.svg"
                      alt="Mindful You Wellness Landing Page and Mobile UI/UX Concept"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-cyan-400">05 • UI/UX Design Concept</span>
                    <span className="status-badge status-concept">Design Prototype</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">Mindful You</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    A modern wellness landing page and mobile interface concept focused on clean layouts, intuitive user journeys, and conversion-oriented visual design.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">Figma</span>
                    <span className="tech-pill">Wireframing</span>
                    <span className="tech-pill">Prototyping</span>
                    <span className="tech-pill">Mobile UI</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-cyan-300">Concept / Prototype</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.mindfulyou)}
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition cursor-pointer"
                    >
                      <span>Inspect Concept</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 06: AI & AUTOMATION EXPERIMENTS */}
            {filteredProjects.some((p) => p.id === 'aiautomation') && (
              <article className="glass-card project-card p-5 flex flex-col justify-between" data-tilt>
                <div>
                  <div className="project-thumb-wrap mb-5">
                    <img
                      src="/assets/projects/ai-automation-lab.svg"
                      alt="AI and Python Automation Experiments Workflow"
                      className="project-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-purple-300">06 • AI / Python</span>
                    <span className="status-badge status-lab">R&amp;D Sandbox</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-2">AI &amp; Automation Experiments</h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    An evolving collection of experiments exploring Python automation, AI-assisted workflows, and practical integrations.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tech-pill">Python</span>
                    <span className="tech-pill">AI Workflows</span>
                    <span className="tech-pill">CLI Scripts</span>
                    <span className="tech-pill">Automation</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-purple-300">Personal Lab Scripts</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.aiautomation)}
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-white hover:text-cyan-300 transition cursor-pointer"
                    >
                      <span>Explore Lab</span>
                      <span className="circle-cta" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* PROJECT 07: CREATIVE DESIGN (SPANS FULL WIDTH OR 3-COL CARD) */}
            {filteredProjects.some((p) => p.id === 'creativedesign') && (
              <article className="glass-card project-card p-6 md:col-span-2 lg:col-span-3">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-pink-400">07 • Graphic Design</span>
                      <span className="status-badge status-concept">Visual Suite</span>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                      Creative Design &amp; Visual Communication
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">
                      A curated showcase of visual design work across brand identities, high-converting YouTube thumbnails, promotional posters, and website visual concepts.
                    </p>

                    <ul className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-200 mb-6">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                        <span>Logo concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        <span>Website visual concepts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                        <span>YouTube thumbnails</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Promotional posters</span>
                      </li>
                      <li className="flex items-center gap-2 col-span-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <span>Branding explorations</span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(PROJECT_CASE_STUDIES.creativedesign)}
                        className="btn-primary text-sm cursor-pointer"
                      >
                        <span>Open Full Visual Gallery</span>
                        <span aria-hidden="true">→</span>
                      </button>
                      <Link href="/contact?service=Graphic%20Design" className="btn-secondary text-sm">
                        <span>Request Custom Visuals</span>
                      </Link>
                    </div>
                  </div>

                  {/* 4 Actual Design Assets Preview Grid */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden bg-[#07070C] border border-white/10 p-2.5 group">
                      <img
                        src="/assets/projects/brand-nodeloop.svg"
                        alt="NodeLoop Logo and Brand Identity Concept"
                        className="w-full h-36 object-cover rounded-lg mb-2 group-hover:scale-[1.02] transition"
                        loading="lazy"
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className="font-heading text-xs font-semibold text-white">NodeLoop Brand Identity</span>
                        <span className="font-mono text-[10px] text-purple-300">Logo Concept</span>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-[#07070C] border border-white/10 p-2.5 group">
                      <img
                        src="/assets/projects/thumbnail-automation.svg"
                        alt="YouTube Thumbnail Design Concept"
                        className="w-full h-36 object-cover rounded-lg mb-2 group-hover:scale-[1.02] transition"
                        loading="lazy"
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className="font-heading text-xs font-semibold text-white">Creator Thumbnail Design</span>
                        <span className="font-mono text-[10px] text-cyan-300">YouTube Visual</span>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-[#07070C] border border-white/10 p-2.5 group">
                      <img
                        src="/assets/projects/poster-buildnext.svg"
                        alt="BuildNext Promotional Hackathon Poster"
                        className="w-full h-36 object-cover rounded-lg mb-2 group-hover:scale-[1.02] transition"
                        loading="lazy"
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className="font-heading text-xs font-semibold text-white">BuildNext Event Poster</span>
                        <span className="font-mono text-[10px] text-pink-300">Promotional Poster</span>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-[#07070C] border border-white/10 p-2.5 group">
                      <img
                        src="/assets/projects/social-campaign.svg"
                        alt="Social Media Branding Exploration"
                        className="w-full h-36 object-cover rounded-lg mb-2 group-hover:scale-[1.02] transition"
                        loading="lazy"
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className="font-heading text-xs font-semibold text-white">Digital Campaign Visuals</span>
                        <span className="font-mono text-[10px] text-emerald-300">Brand Exploration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

          </div>
        </section>

        {/* Bottom Conversion CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="glass-card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6" data-tilt>
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/25 to-purple-600/30 border border-cyan-400/40 shrink-0 hidden sm:block">
                <Image
                  src="/assets/images/saurav-cutout.png"
                  alt="Saurav Bhusal"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                  Want a custom web application or UI/UX redesign?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base">
                  Let&apos;s discuss your goals and turn your concept into a polished digital product with Saurav Bhusal.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/hire" className="btn-primary" data-magnetic>
                <span>Start a Project</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className="btn-secondary">
                <span>View Services</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}



