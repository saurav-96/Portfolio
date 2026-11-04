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
} from 'lucide-react';
import Profile3DCard from '@/components/3d/Profile3DCard';
import SkillDetailModal from '@/components/modals/SkillDetailModal';
import TrophyModal, { type CertificateData } from '@/components/modals/TrophyModal';
import { SKILLS_LIST, type SkillDetail } from '@/data/skillsData';

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
            <div>
              <span className="eyebrow-badge">
                <span className="eyebrow-dot" />
                <span>ABOUT ME</span>
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-[1.15]">
              I'm Saurav Bhusal, a <span className="text-gradient">Creative Web Developer</span> &amp; CS Student from Nepal.
            </h1>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
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
            <div className="pt-2 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
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
                >
                  <FileText className="w-4 h-4" />
                  <span>View / Download CV</span>
                </a>
                <Link href="/hire" className="btn-secondary text-sm inline-flex items-center gap-1.5">
                  <span>Work With Me</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Profile Card */}
          <div className="lg:col-span-5">
            <Profile3DCard />
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: SKILLS & TECHNOLOGIES (INTERACTIVE MODALS)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>TECHNICAL TOOLKIT</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Click any skill card to inspect deep architectural capabilities, ecosystems, and verified experience levels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SKILLS_LIST.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelectedSkill(skill)}
              className="glass-card p-5 text-left flex flex-col justify-between group hover:-translate-y-1 transition-all cursor-pointer border border-white/10 hover:border-purple-400/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-purple-300 font-semibold">{skill.category}</span>
                  <span className="text-[11px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect ↗
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{skill.tagline}</p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">View Blueprint</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: VERIFIED ACHIEVEMENTS & CREDENTIALS
          =================================================================== */}
      <section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow-badge mb-3">
            <span className="eyebrow-dot" />
            <span>GENUINE CREDENTIALS</span>
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Verified <span className="text-gradient">Achievements</span> &amp; Certifications
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Every credential below is verified with official certificate IDs, institutional links, and authentic award photography.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Certificate 01: Hackathon First Runner-Up */}
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                onClick={() =>
                  setSelectedCert({
                    title: '1st Runner-Up — Web Design Hackathon 2026',
                    meta: 'National Infotech College (NIT LEGEND) • First Runner-Up Award • Prize: Rs. 10,000/- • Date: Jan 2026',
                    src: '/assets/certificates/nit-legend-hackathon-2026.jpg',
                    isHackathon: true,
                  })
                }
              >
                <Image
                  src="/assets/certificates/nit-legend-hackathon-2026.jpg"
                  alt="NIT Legend Hackathon Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-amber-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Award &amp; Trophy
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-amber-300 font-semibold">01 • HACKATHON WINNER</span>
                <span className="status-badge status-live">1st Runner-Up</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                Web Design Competition 2026
              </h3>
              <p className="text-xs font-mono text-amber-300 mb-2">NIT LEGEND Hackathon • Award Prize Rs. 10,000/-</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Secured First Runner-Up in the intensive web design hackathon organized by National Infotech College, designing and building a functional responsive web solution under strict live time constraints.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">Trophy &amp; Moments</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCert({
                    title: '1st Runner-Up — Web Design Hackathon 2026',
                    meta: 'National Infotech College (NIT LEGEND) • First Runner-Up Award • Prize: Rs. 10,000/- • Date: Jan 2026',
                    src: '/assets/certificates/nit-legend-hackathon-2026.jpg',
                    isHackathon: true,
                  })
                }
                className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Trophy &amp; Cert</span>
              </button>
            </div>
          </article>

          {/* Certificate 02: UX/UI Design Competition 2025 */}
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
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
                  alt="Sagarmatha UX/UI Design Competition Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-cyan-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Click to Inspect
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-cyan-300 font-semibold">02 • DESIGN COMPETITION</span>
                <span className="status-badge status-live">Participation</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                UX/UI Design Competition 2025
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-2">Sagarmatha Secondary School • Swarnim IT Club</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Participated representing Oxford Higher Secondary School in the regional UX/UI design competition, exploring user journeys, wireframes, and design thinking.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">ISO 9001:2015 Inst.</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedCert({
                    title: 'UX/UI Design Competition 2025 — Certificate of Participation',
                    meta: 'Organized by Sagarmatha Secondary Boarding School with Swarnim IT Club • Representing Oxford H.S.S. • Date: Nov 28, 2025',
                    src: '/assets/certificates/sagarmatha-ux-ui-2025.jpg',
                  })
                }
                className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>
          </article>

          {/* Certificate 03: Harvard University CS50x */}
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                onClick={() =>
                  setSelectedCert({
                    title: 'Harvard CS50x: Introduction to Computer Science Certificate',
                    meta: 'Harvard University • Cambridge, Massachusetts • Issued to Saurav Bhusal • Certificate ID: c95716f9-c771-4c7b-91b5-c0e45c322f56 • Verified edX Credential',
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
                  <span className="font-mono text-xs text-white bg-emerald-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Harvard Certificate
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
              <p className="text-xs font-mono text-emerald-300 mb-2">Harvard University • Cambridge, MA</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Completed Harvard University's CS50x Introduction to Computer Science, covering C, Python, SQL, JavaScript, memory management, algorithms, and full-stack software engineering.
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
                  className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
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
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
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
              <p className="text-xs font-mono text-purple-300 mb-2">freeCodeCamp Core Certification</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                ~300 hours covering semantic HTML5, CSS3, Flexbox, CSS Grid, media queries, accessibility, and modern responsive UI engineering.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">300 Hours Verified</span>
              <a
                href="https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/responsive-web-design"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* Certificate 05: freeCodeCamp JS Algorithms V8 */}
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                onClick={() =>
                  setSelectedCert({
                    title: 'freeCodeCamp — Legacy JavaScript Algorithms and Data Structures V8',
                    meta: 'Issued Nov 2, 2026 • ~300 Hours • ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                    src: '/assets/certificates/fcc-javascript-algorithms-v8.png',
                    verifyUrl:
                      'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures-v8',
                  })
                }
              >
                <Image
                  src="/assets/certificates/fcc-javascript-algorithms-v8.png"
                  alt="freeCodeCamp JS Algorithms V8"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-cyan-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    Inspect Certificate
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-cyan-300 font-semibold">05 • 300 HRS CERTIFICATION</span>
                <span className="status-badge status-live">Nov 2, 2026</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-1.5">
                JavaScript Algorithms &amp; Data Structures V8
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-2">ES6+, OOP, Functional Programming</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                In-depth algorithmic mastery covering modern ES6+ syntax, arrays, regex, functional programming, data structures, and complex computational logic.
              </p>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-400">ES6+ &amp; Data Structures</span>
              <a
                href="https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures-v8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* Certificate 06: freeCodeCamp JS Algorithms V7 */}
          <article className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-all">
            <div>
              <div
                className="cert-thumb-wrap mb-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
                onClick={() =>
                  setSelectedCert({
                    title: 'freeCodeCamp — Legacy JavaScript Algorithms and Data Structures V7',
                    meta: 'Issued Nov 2, 2026 • ~300 Hours of Coursework • Credential ID: fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76',
                    src: '/assets/certificates/fcc-javascript-algorithms-v7.png',
                    verifyUrl:
                      'https://freecodecamp.org/certification/fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76/javascript-algorithms-and-data-structures',
                  })
                }
              >
                <Image
                  src="/assets/certificates/fcc-javascript-algorithms-v7.png"
                  alt="freeCodeCamp JS Algorithms V7"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono text-xs text-white bg-pink-600/80 backdrop-blur-md px-2.5 py-1 rounded-full">
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-7 glass-card p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
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

          <div className="lg:col-span-5 glass-card p-7 sm:p-9 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">NEXT STEP</span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1 mb-2">
                Ready to see my work in action?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explore 7 detailed project case studies—including SwasthyaSutra, KeyFlow, Butwal SmartGov, and TubeKit—complete with interactive architecture breakdowns and live demos.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary text-sm inline-flex items-center gap-2">
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/hire" className="btn-secondary text-sm inline-flex items-center gap-1.5">
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
