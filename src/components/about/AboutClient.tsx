'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  ZoomIn,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  LayoutTemplate,
  FileCode2,
  Paintbrush,
  Braces,
  Atom,
  Wind,
  Box,
  PenTool,
  Workflow,
  Globe,
  Palette,
  Smartphone,
  Layers,
  Terminal,
  Cpu,
  Code,
  Server,
  Wrench,
  GitBranch,
  Github,
  Layout,
  Puzzle,
  Figma,
} from 'lucide-react';
import Profile3DCard from '@/components/3d/Profile3DCard';
import SkillDetailModal from '@/components/modals/SkillDetailModal';
import TrophyModal, { type CertificateData } from '@/components/modals/TrophyModal';
import { SKILLS_DATA, type SkillDetail } from '@/data/skillsData';

export default function AboutClient() {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      {/* ===================================================================
          SECTION 1: PERSONAL INTRODUCTION & INTERACTIVE 3D CARD
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Personal Introduction & Handwritten Signature */}
          <div className="lg:col-span-7 space-y-6">
            <div data-hero-reveal>
              <span className="eyebrow-badge">
                <span className="eyebrow-dot" />
                <span>ABOUT ME</span>
              </span>
            </div>

            <h1 data-hero-reveal className="font-heading text-3xl sm:text-5xl font-bold text-white leading-[1.15]">
              I'm Saurav Bhusal, a <span className="text-gradient">Creative Web Developer</span> &amp; CS Student from Nepal.
            </h1>

            <div data-hero-reveal className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-body">
              <p>
                I'm Saurav Bhusal, a Computer Science student and creative web developer based in Nepal.
              </p>
              <p>
                I enjoy combining technology, design, and problem-solving to create digital experiences that are both visually appealing and practically useful.
              </p>
              <p>
                My journey involves continuous experimentation, independent projects, programming, and learning modern technologies.
              </p>
            </div>

            {/* Handwritten Signature & Quick Facts */}
            <div data-hero-reveal className="pt-2 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
              <div>
                <div className="font-hand text-3xl sm:text-4xl text-purple-300 tracking-wide select-none">
                  Saurav Bhusal
                </div>
                <div className="font-mono text-xs text-slate-400 mt-0.5">
                  Oxford Secondary College • Kapilvastu &amp; Butwal, Nepal
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/assets/documents/Saurav-Bhusal-CV.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm inline-flex items-center gap-2"
                  data-magnetic
                >
                  <FileText className="w-4 h-4" />
                  <span>View / Download CV</span>
                </a>
                <Link href="/hire" className="btn-secondary text-sm inline-flex items-center gap-1.5" data-magnetic>
                  <span>Work With Me</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Profile Card */}
          <div className="lg:col-span-5" data-hero-reveal>
            <Profile3DCard />
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: SKILLS & TECHNOLOGIES (4 INTERACTIVE CATEGORIES)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-reveal-group>
        <div className="max-w-2xl mb-10" data-reveal-item>
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>TECHNICAL TOOLKIT</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-body">
            Organized across frontend engineering, core programming languages, design tools, and modern development workflows—grounded in real project practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Category 1: Frontend Development */}
          <div className="glass-card p-6 sm:p-7" data-reveal-item data-tilt>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="icon-box icon-box-purple w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-purple-300 uppercase tracking-wider">01 / INTERFACES</span>
                  <h3 className="font-heading text-xl font-bold text-white">Frontend Development</h3>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5 font-body">
              Building responsive, accessible, and interactive web applications with clean semantic markup and modern animation libraries.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="html5" onClick={() => setSelectedSkill(SKILLS_DATA.html5)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.html5); } }}
                aria-label="Inspect HTML5 details"
              >
                <FileCode2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">HTML5</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="css3" onClick={() => setSelectedSkill(SKILLS_DATA.css3)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.css3); } }}
                aria-label="Inspect CSS3 details"
              >
                <Paintbrush className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">CSS3</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="javascript" onClick={() => setSelectedSkill(SKILLS_DATA.javascript)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.javascript); } }}
                aria-label="Inspect JavaScript details"
              >
                <Braces className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">JavaScript</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="react" onClick={() => setSelectedSkill(SKILLS_DATA.react)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.react); } }}
                aria-label="Inspect React details"
              >
                <Atom className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">React</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="tailwind" onClick={() => setSelectedSkill(SKILLS_DATA.tailwind)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.tailwind); } }}
                aria-label="Inspect Tailwind CSS details"
              >
                <Wind className="w-4 h-4 text-teal-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Tailwind CSS</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/50 transition-all"
                data-skill-id="threejs" onClick={() => setSelectedSkill(SKILLS_DATA.threejs)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.threejs); } }}
                aria-label="Inspect Three.js details"
              >
                <Box className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Three.js</span>
              </div>
            </div>
          </div>

          {/* Category 2: UI/UX & Design */}
          <div className="glass-card p-6 sm:p-7" data-reveal-item data-tilt>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="icon-box icon-box-cyan w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">02 / EXPERIENCE</span>
                  <h3 className="font-heading text-xl font-bold text-white">UI/UX &amp; Design</h3>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5 font-body">
              Translating complex user needs into wireframes, high-fidelity prototypes, cohesive design systems, and visual assets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                data-skill-id="figma" onClick={() => setSelectedSkill(SKILLS_DATA.figma)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.figma); } }}
                aria-label="Inspect Figma details"
              >
                <Figma className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Figma</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                data-skill-id="figjam" onClick={() => setSelectedSkill(SKILLS_DATA.figjam)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.figjam); } }}
                aria-label="Inspect FigJam details"
              >
                <Workflow className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">FigJam</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                data-skill-id="webflow" onClick={() => setSelectedSkill(SKILLS_DATA.webflow)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.webflow); } }}
                aria-label="Inspect Webflow details"
              >
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Webflow</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                data-skill-id="canva" onClick={() => setSelectedSkill(SKILLS_DATA.canva)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.canva); } }}
                aria-label="Inspect Canva details"
              >
                <Palette className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Canva</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                onClick={() => setSelectedSkill(SKILLS_DATA['graphic-design'])}
                aria-label="Inspect Graphic Design details"
              >
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Graphic Design</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                onClick={() => setSelectedSkill(SKILLS_DATA['responsive-design'])}
                aria-label="Inspect Responsive Design details"
              >
                <Smartphone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Responsive Design</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-400/50 transition-all"
                data-skill-id="prototyping" onClick={() => setSelectedSkill(SKILLS_DATA.prototyping)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.prototyping); } }}
                aria-label="Inspect Prototyping details"
              >
                <Layers className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Prototyping</span>
              </div>
            </div>
          </div>

          {/* Category 3: Programming */}
          <div className="glass-card p-6 sm:p-7" data-reveal-item data-tilt>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="icon-box icon-box-pink w-11 h-11 rounded-2xl bg-pink-500/15 border border-pink-500/40 flex items-center justify-center text-pink-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-pink-300 uppercase tracking-wider">03 / FOUNDATIONS</span>
                  <h3 className="font-heading text-xl font-bold text-white">Programming</h3>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5 font-body">
              Strong algorithmic problem-solving foundations honed through Harvard's CS50x and practical scripting experiments.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-pink-600/20 border border-white/10 hover:border-pink-400/50 transition-all"
                data-skill-id="c" onClick={() => setSelectedSkill(SKILLS_DATA.c)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.c); } }}
                aria-label="Inspect C details"
              >
                <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">C</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-pink-600/20 border border-white/10 hover:border-pink-400/50 transition-all"
                data-skill-id="python" onClick={() => setSelectedSkill(SKILLS_DATA.python)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.python); } }}
                aria-label="Inspect Python details"
              >
                <Code className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Python</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-pink-600/20 border border-white/10 hover:border-pink-400/50 transition-all"
                data-skill-id="php" onClick={() => setSelectedSkill(SKILLS_DATA.php)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.php); } }}
                aria-label="Inspect PHP details"
              >
                <Server className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">PHP</span>
              </div>
            </div>
          </div>

          {/* Category 4: Tools & Other Technologies */}
          <div className="glass-card p-6 sm:p-7" data-reveal-item data-tilt>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="icon-box icon-box-emerald w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-emerald-300 uppercase tracking-wider">04 / ECOSYSTEM</span>
                  <h3 className="font-heading text-xl font-bold text-white">Tools &amp; Other Technologies</h3>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5 font-body">
              Version control, content platforms, AI-assisted workflows, and Chromium browser extension engineering.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-400/50 transition-all"
                data-skill-id="git" onClick={() => setSelectedSkill(SKILLS_DATA.git)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.git); } }}
                aria-label="Inspect Git details"
              >
                <GitBranch className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Git</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-400/50 transition-all"
                data-skill-id="github" onClick={() => setSelectedSkill(SKILLS_DATA.github)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.github); } }}
                aria-label="Inspect GitHub details"
              >
                <Github className="w-4 h-4 text-slate-200 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">GitHub</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-400/50 transition-all"
                data-skill-id="wordpress" onClick={() => setSelectedSkill(SKILLS_DATA.wordpress)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSkill(SKILLS_DATA.wordpress); } }}
                aria-label="Inspect WordPress details"
              >
                <Layout className="w-4 h-4 text-sky-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">WordPress</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-400/50 transition-all"
                onClick={() => setSelectedSkill(SKILLS_DATA['ai-tools'])}
                aria-label="Inspect AI Dev Tools details"
              >
                <Sparkles className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">AI Dev Tools</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                className="skill-card-btn group col-span-2 sm:col-span-2 cursor-pointer flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-400/50 transition-all"
                onClick={() => setSelectedSkill(SKILLS_DATA['browser-extensions'])}
                aria-label="Inspect Browser Extension Development details"
              >
                <Puzzle className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition">Browser Extension Development</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: VERIFIED ACHIEVEMENTS & CERTIFICATES GALLERY (6 CARDS)
          =================================================================== */}
      <section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-reveal-group>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10" data-reveal-item>
          <div>
            <span className="eyebrow-badge mb-3">
              <span className="eyebrow-dot" />
              <span>100% VERIFIABLE CREDENTIALS</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Achievements &amp; <span className="text-gradient">Verified Certificates</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-md font-body">
            Every achievement and developer certification below includes its authentic certificate scan, official credential ID, and direct verification link. Click any certificate to inspect full-screen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Certificate 01: NIT Legend Hackathon Trophy */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: '1st Runner-Up — Web Design Hackathon 2026',
                    meta: 'Issued by NIT LEGEND (Team of IT Experts) & Butwal Sub-Metropolitan City • Date: 16th Jestha, 2083 (May 30, 2026)',
                    src: '/assets/certificates/nit-legend-hackathon-2026.jpg',
                    hasGallery: true, isHackathon: true,
                  })
                }
              >
                <Image
                  src="/assets/certificates/nit-legend-hackathon-2026.jpg"
                  alt="NIT Legend Hackathon Trophy & Award Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Full Certificate &amp; Trophy
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-amber-300 font-semibold">01 • HACKATHON AWARD</span>
                <span className="status-badge status-live">1st Runner-Up</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                First Runner-Up — Web Design Hackathon 2026
              </h3>
              <p className="text-xs font-mono text-purple-300 mb-2">
                NIT LEGEND &amp; Butwal Sub-Metropolitan City • 16th Jestha, 2083 (May 30, 2026)
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Awarded for outstanding innovation, technical mastery, and creative brilliance in the Web Design Hackathon 2026. Signed by Program Co-Ordinator <strong>Kamal Nyaupane</strong> and Chief Guest <strong>Khelraj Pandey</strong> (Mayor, Butwal Sub-Metropolitan City). Includes trophy award moments gallery.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">Official Physical Credential</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCert({
                    title: '1st Runner-Up — Web Design Hackathon 2026',
                    meta: 'Issued by NIT LEGEND (Team of IT Experts) & Butwal Sub-Metropolitan City • Date: 16th Jestha, 2083 (May 30, 2026)',
                    src: '/assets/certificates/nit-legend-hackathon-2026.jpg',
                    hasGallery: true, isHackathon: true,
                  })
                }
                className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Trophy &amp; Cert</span>
              </button>
            </div>
          </article>

          {/* Certificate 02: Sagarmatha UX/UI Competition 2025 */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: 'UX/UI Design Competition 2025 — Certificate of Participation',
                    meta: 'Organized by Sagarmatha Secondary Boarding School with Swarnim IT Club • Representing Oxford H.S.S. • Date: Nov 28, 2025',
                    src: '/assets/certificates/sagarmatha-ux-ui-2025.jpg',
                  })
                }
              >
                <Image
                  src="/assets/certificates/sagarmatha-ux-ui-2025.jpg"
                  alt="Sagarmatha Secondary Boarding School UX/UI Competition 2025"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-cyan-300 font-semibold">02 • UI/UX COMPETITION</span>
                <span className="status-badge status-concept">Nov 28, 2025</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                UX/UI Design Competition — 2025
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-2">
                Sagarmatha Secondary Boarding School &amp; Swarnim IT Club
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Presented to <strong>Saurav Bhusal</strong> representing <strong>Oxford H.S.S.</strong> for applying principles of user-centered UX &amp; UI design. Signed by <strong>Hira K.C.</strong> (Chairman, Swarnim Sagarmatha College) and <strong>Krishna Prasad Paudel</strong> (Principal).
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">ISO 9001:2015 Certified Inst.</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCert({
                    title: 'UX/UI Design Competition 2025 — Certificate of Participation',
                    meta: 'Organized by Sagarmatha Secondary Boarding School with Swarnim IT Club • Representing Oxford H.S.S. • Date: Nov 28, 2025',
                    src: '/assets/certificates/sagarmatha-ux-ui-2025.jpg',
                  })
                }
                className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>
          </article>

          {/* Certificate 03: Harvard CS50x */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: 'Harvard CS50x: Introduction to Computer Science Certificate',
                    meta: 'Harvard University • Cambridge, Massachusetts • Issued to Saurav Bhusal • Certificate ID: c95716f9-c771-4c7b-91b5-c0e45c322f56',
                    src: '/assets/certificates/cs50x-certificate.png',
                    verifyUrl: 'https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56',
                  })
                }
              >
                <Image
                  src="/assets/certificates/cs50x-certificate.png"
                  alt="Harvard CS50x Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-300 font-semibold">03 • COMPUTER SCIENCE</span>
                <span className="status-badge status-live">Verified ID</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                Harvard CS50x Certificate
              </h3>
              <p className="text-xs font-mono text-emerald-300 mb-2">
                Harvard University • ID: c95716f9-c771-4c7b-91b5-c0e45c322f56
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Completed Harvard University's CS50x Introduction to Computer Science, covering C, Python, SQL, JavaScript, memory management, data structures, algorithms, and full-stack software engineering (Final Project: TubeKit).
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard('c95716f9-c771-4c7b-91b5-c0e45c322f56')}
                className="font-mono text-xs text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                {copiedId === 'c95716f9-c771-4c7b-91b5-c0e45c322f56' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCert({
                      title: 'Harvard CS50x: Introduction to Computer Science Certificate',
                      meta: 'Harvard University • Cambridge, Massachusetts • Issued to Saurav Bhusal • Certificate ID: c95716f9-c771-4c7b-91b5-c0e45c322f56',
                      src: '/assets/certificates/cs50x-certificate.png',
                      verifyUrl: 'https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56',
                    })
                  }
                  className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
                <a
                  href="https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>

          {/* Certificate 04: freeCodeCamp Responsive Web Design */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: 'freeCodeCamp — Legacy Responsive Web Design V8',
                    meta: 'Issued Nov 1, 2026 • ~300 Hours of Coursework • Credential ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                    src: '/assets/certificates/fcc-responsive-web-design-v8.png',
                    verifyUrl:
                      'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/responsive-web-design',
                  })
                }
              >
                <Image
                  src="/assets/certificates/fcc-responsive-web-design-v8.png"
                  alt="freeCodeCamp Responsive Web Design"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-purple-300 font-semibold">04 • 300 HRS CERTIFICATION</span>
                <span className="status-badge status-live">Nov 1, 2026</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                Legacy Responsive Web Design V8
              </h3>
              <p className="text-xs font-mono text-purple-300 mb-2 break-all">
                ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Developer certification representing approximately 300 hours of coursework in semantic HTML5, modern CSS3 architecture, Flexbox, CSS Grid, accessibility, and responsive visual layouts. Signed by <strong>Quincy Larson</strong>.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard('fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76')}
                className="font-mono text-xs text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                {copiedId === 'fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCert({
                      title: 'freeCodeCamp — Legacy Responsive Web Design V8',
                      meta: 'Issued Nov 1, 2026 • ~300 Hours • ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                      src: '/assets/certificates/fcc-responsive-web-design-v8.png',
                      verifyUrl:
                        'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/responsive-web-design',
                    })
                  }
                  className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Preview</span>
                </button>
                <a
                  href="https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/responsive-web-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>

          {/* Certificate 05: freeCodeCamp JS Algorithms V8 */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: 'freeCodeCamp — JavaScript Algorithms and Data Structures (V8)',
                    meta: 'Issued Nov 2, 2026 • ~300 Hours • Credential ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                    src: '/assets/certificates/fcc-javascript-algorithms-v8.png',
                    verifyUrl:
                      'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures-v8',
                  })
                }
              >
                <Image
                  src="/assets/certificates/fcc-javascript-algorithms-v8.png"
                  alt="freeCodeCamp JavaScript Algorithms V8"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-amber-300 font-semibold">05 • 300 HRS CERTIFICATION</span>
                <span className="status-badge status-live">Nov 2, 2026</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                JavaScript Algorithms &amp; Data Structures V8
              </h3>
              <p className="text-xs font-mono text-amber-300 mb-2 break-all">
                ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Mastery in modern ECMAScript (ES6+), functional programming patterns, object-oriented JavaScript, data transformation algorithms, and DOM scripting logic.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard('fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76')}
                className="font-mono text-xs text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                {copiedId === 'fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCert({
                      title: 'freeCodeCamp — JavaScript Algorithms and Data Structures (V8)',
                      meta: 'Issued Nov 2, 2026 • ~300 Hours • Credential ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                      src: '/assets/certificates/fcc-javascript-algorithms-v8.png',
                      verifyUrl:
                        'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures-v8',
                    })
                  }
                  className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Preview</span>
                </button>
                <a
                  href="https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures-v8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>

          {/* Certificate 06: freeCodeCamp JS Algorithms V7 */}
          <article className="glass-card p-5 flex flex-col justify-between" data-reveal-item data-tilt>
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedCert({
                    title: 'Legacy JavaScript Algorithms and Data Structures Certification (V7)',
                    meta: 'Issued Nov 2, 2026 • ~300 Hours of Algorithmic Practice',
                    src: '/assets/certificates/fcc-javascript-algorithms-v7.png',
                    verifyUrl:
                      'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures',
                  })
                }
              >
                <Image
                  src="/assets/certificates/fcc-javascript-algorithms-v7.png"
                  alt="freeCodeCamp Legacy JS Algorithms V7"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-pink-300 font-semibold">06 • 300 HRS CERTIFICATION</span>
                <span className="status-badge status-live">Nov 2, 2026</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                JavaScript Algorithms &amp; Data Structures V7
              </h3>
              <p className="text-xs font-mono text-pink-300 mb-2">Algorithmic Foundations &amp; Logic</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-body">
                Core algorithmic certification covering recursion, regular expressions, Roman numeral ciphers, cash register state machines, and classic algorithms.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">Algorithmic Foundations</span>
              <a
                href="https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: MY VISION & CALL TO ACTION
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-reveal-group>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-7 glass-card p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden" data-reveal-item data-tilt>
            <div className="text-5xl font-heading text-purple-400/40 select-none leading-none mb-3">“</div>
            <blockquote className="font-hand text-2xl sm:text-4xl text-slate-100 leading-snug mb-6">
              "I want to build meaningful digital products, work with ambitious teams, and continuously grow as a creative technologist."
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <div className="font-heading text-sm font-bold text-white">My Vision</div>
                <div className="font-mono text-xs text-cyan-300">Design • Develop • Innovate</div>
              </div>
              <Sparkles className="w-10 h-10 text-cyan-400 opacity-60 animate-pulse" />
            </div>
          </div>

          <div className="lg:col-span-5 glass-card p-7 sm:p-9 flex flex-col justify-between gap-6" data-reveal-item data-tilt>
            <div>
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">NEXT STEP</span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1 mb-2">
                Ready to see my work in action?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                Explore 7 detailed project case studies—including SwasthyaSutra, KeyFlow, Butwal SmartGov, and TubeKit—complete with interactive architecture breakdowns and live demos.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary text-sm inline-flex items-center gap-2" data-magnetic>
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/hire" className="btn-secondary text-sm inline-flex items-center gap-1.5" data-magnetic>
                <span>Hire Me</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modals */}
      <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      <TrophyModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </main>
  );
}
