'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar
} from 'lucide-react';

export default function HireClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name or company.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.projectType) {
      errs.projectType = 'Please select the primary service required.';
    }
    if (!formData.budget) {
      errs.budget = 'Please select an estimated budget range.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a project description (minimum 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getBriefText = () => {
    return [
      'Hello Saurav,',
      '',
      `Client / Organization: ${formData.name}`,
      `Email: ${formData.email}`,
      `Service Needed: ${formData.projectType}`,
      `Budget Range: ${formData.budget}`,
      '',
      'Project Scope & Target Timeline:',
      formData.message
    ].join('\n');
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(getBriefText());
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2000);
    } catch {
      // fallback
    }
  };

  const mailtoHref = `mailto:sauravbhusal369@gmail.com?subject=${encodeURIComponent(
    `[Fast-Track Client Brief] ${formData.projectType} — ${formData.name}`
  )}&body=${encodeURIComponent(getBriefText())}`;

  return (
    <main id="main-content" className="pt-28 sm:pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 space-y-12">

        {/* Top Hero: Client Onboarding */}
        <div className="text-center max-w-3xl mx-auto space-y-4" data-hero-reveal>
          <span className="eyebrow-badge">
            <span className="eyebrow-dot"></span>
            <span>FAST-TRACK COLLABORATION</span>
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Build Something <span className="text-gradient">Extraordinary?</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Prioritize the fastest, most direct channels to hire me for full-stack frontend engineering, interactive 3D WebGL experiences, or UI/UX prototyping. Available for remote contracts worldwide.
          </p>
        </div>

        {/* 3 Instant Fast-Track Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* WhatsApp Direct Card */}
          <a
            href="https://wa.me/9779766271244?text=Hi%20Saurav,%20I%20have%20a%20project%20inquiry%20and%20would%20love%20to%20discuss%20it."
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex flex-col justify-between group block border-emerald-500/30 hover:border-emerald-400 transition"
            data-tilt
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z"/>
                  </svg>
                </div>
                <span className="status-badge status-live text-[10px] py-0.5 px-2">Fastest Response</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white group-hover:text-emerald-300 transition mb-1">
                WhatsApp Direct 1-on-1
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Instant chat for rapid project briefing, scope alignment, and immediate feedback.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-slate-400">+977 9766271244</span>
              <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition inline-flex items-center gap-1">
                Start Chat <span>→</span>
              </span>
            </div>
          </a>

          {/* Upwork Direct Card */}
          <a
            href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex flex-col justify-between group block border-emerald-500/30 hover:border-emerald-400 transition"
            data-tilt
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.715 0-5.834 2.651-6.496 4.606-1.579-2.383-2.614-5.06-2.614-5.06L6.59 4.564l-2.039 9.35-2.039-9.35H0l3.633 14.872h2.957l1.79-8.196c1.168 1.986 2.893 4.35 5.578 4.35 1.577 0 3.013-.67 4.072-1.74 1.056 1.07 2.492 1.74 4.07 1.74 3.328 0 6.035-2.707 6.035-6.035 0-3.327-2.707-6.035-6.035-6.035z"/>
                  </svg>
                </div>
                <span className="tech-pill text-emerald-300 border-emerald-500/40">Escrow Protected</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white group-hover:text-emerald-300 transition mb-1">
                Upwork Verified Profile
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Milestone-based escrow contracts, hourly or fixed-price protection, and enterprise invoices.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-slate-400">Direct Contract</span>
              <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition inline-flex items-center gap-1">
                Hire on Upwork <span>→</span>
              </span>
            </div>
          </a>

          {/* Fiverr & Freelancer.com Card */}
          <a
            href="https://www.fiverr.com/sellers/saurav_bhusal"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex flex-col justify-between group block border-cyan-500/30 hover:border-cyan-400 transition md:col-span-2 lg:col-span-1"
            data-tilt
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.003 12.001c0 6.076-4.926 11.002-11.002 11.002S1 18.077 1 12.001 5.926.999 12.001.999s11.002 4.926 11.002 11.002zM12 4.22c-4.298 0-7.781 3.483-7.781 7.781s3.483 7.781 7.781 7.781 7.781-3.483 7.781-7.781S16.298 4.22 12 4.22zm2.14 8.78h-2.14v3.25H9.86V8.75h4.28v4.25z"/>
                  </svg>
                </div>
                <span className="tech-pill text-cyan-300 border-cyan-500/40">Fiverr &amp; Freelancer</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition mb-1">
                Tailored Gig Packages
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Fixed-price packages on Fiverr or Freelancer.com with fast delivery and clear deliverables.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
              <span className="text-slate-400">@saurav_bhusal</span>
              <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition inline-flex items-center gap-1">
                Explore Packages <span>→</span>
              </span>
            </div>
          </a>
        </div>

        {/* 4-Step Agile Engagement Roadmap */}
        <div className="glass-card p-6 sm:p-9 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs text-purple-300 uppercase tracking-widest">TRANSPARENT CLIENT PROCESS</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">How We Will Work Together</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A transparent, agile 4-step workflow from initial brief to high-performance production deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-cyan-300 font-bold">01 / DISCOVERY</div>
              <h3 className="font-heading text-base font-bold text-white">Scope &amp; Architecture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We align on objectives, technical constraints, design references, target audience, and milestone deliverables.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-purple-300 font-bold">02 / PROTOTYPE</div>
              <h3 className="font-heading text-base font-bold text-white">Figma &amp; Wireframing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interactive UI/UX design with responsive grids, typography hierarchies, and motion choreographies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-indigo-300 font-bold">03 / DEVELOPMENT</div>
              <h3 className="font-heading text-base font-bold text-white">Full-Stack &amp; 3D Build</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean, semantic, high-performance code with Three.js WebGL, GSAP ScrollTrigger, and smooth physics.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-emerald-300 font-bold">04 / DEPLOYMENT</div>
              <h3 className="font-heading text-base font-bold text-white">QA, Polish &amp; Launch</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cross-device testing, lighthouse optimization, smooth animations audit, domain setup, and ongoing support.
              </p>
            </div>
          </div>
        </div>

        {/* Fast-Track Project Inquiry Form */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card send-message-card p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">FAST-TRACK CLIENT BRIEF</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">Submit Your Project Brief</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Fill out the parameters below. I will review your requirements and respond within 24 hours.
                </p>
              </div>
              <span className="status-badge status-live text-xs py-1 px-3">Direct Dispatch</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Accessible Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div
                  className="form-error-summary"
                  role="alert"
                  tabIndex={-1}
                  aria-labelledby="contact-error-summary-title"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <h3 id="contact-error-summary-title" className="font-heading text-sm font-bold text-red-200">
                      Please resolve the following before sending:
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {Object.values(errors).map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="hire-name" className="form-label">
                    Full Name / Organization <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="hire-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="e.g., Sarah Jenkins (Apex Studio)"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && (
                    <p className="field-error-msg visible" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="hire-email" className="form-label">
                    Work / Direct Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="hire-email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="sarah@apexstudio.io"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && (
                    <p className="field-error-msg visible" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Required Service */}
                <div>
                  <label htmlFor="hire-type" className="form-label">
                    Required Service <span className="text-purple-400">*</span>
                  </label>
                  <select
                    id="hire-type"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => {
                      setFormData({ ...formData, projectType: e.target.value });
                      if (errors.projectType) setErrors((prev) => ({ ...prev, projectType: '' }));
                    }}
                    className={`form-select ${errors.projectType ? 'input-error' : ''}`}
                  >
                    <option value="">Select Service Needed</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development (HTML/CSS/JS/React)</option>
                    <option value="Interactive 3D / WebGL Experience">Interactive 3D / WebGL Experience (Three.js/GSAP)</option>
                    <option value="UI/UX Prototyping & Design">UI/UX Prototyping &amp; Design (Figma)</option>
                    <option value="Graphic Design & Visual Identity">Graphic Design &amp; Visual Identity (Canva/Branding)</option>
                    <option value="Performance & Animation Optimization">Performance &amp; Animation Optimization</option>
                    <option value="Custom Software / Automation">Custom Software / Scripting (Python/C)</option>
                  </select>
                  {errors.projectType && (
                    <p className="field-error-msg visible" role="alert">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Estimated Budget */}
                <div>
                  <label htmlFor="hire-budget" className="form-label">
                    Estimated Budget Range <span className="text-purple-400">*</span>
                  </label>
                  <select
                    id="hire-budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={(e) => {
                      setFormData({ ...formData, budget: e.target.value });
                      if (errors.budget) setErrors((prev) => ({ ...prev, budget: '' }));
                    }}
                    className={`form-select ${errors.budget ? 'input-error' : ''}`}
                  >
                    <option value="">Select Estimated Budget</option>
                    <option value="Under $300 (Prototype / Consultation)">Under $300 (Prototype / Consultation)</option>
                    <option value="$300 – $700 (Landing Page / Feature Build)">$300 – $700 (Landing Page / Feature Build)</option>
                    <option value="$700 – $1,500 (Full Website / Web Application)">$700 – $1,500 (Full Website / Web Application)</option>
                    <option value="$1,500 – $3,000 (Comprehensive 3D Platform)">$1,500 – $3,000 (Comprehensive 3D Platform)</option>
                    <option value="$3,000+ (Long-Term Retainer / Enterprise)">$3,000+ (Long-Term Retainer / Enterprise)</option>
                    <option value="Flexible / Let's Discuss Scope">Flexible / Let&apos;s Discuss Scope</option>
                  </select>
                  {errors.budget && (
                    <p className="field-error-msg visible" role="alert">
                      {errors.budget}
                    </p>
                  )}
                </div>
              </div>

              {/* Message / Brief */}
              <div>
                <label htmlFor="hire-message" className="form-label">
                  Project Scope &amp; Target Timeline <span className="text-purple-400">*</span>
                </label>
                <textarea
                  id="hire-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Outline your project goals, key features, reference websites, and target deadline..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                ></textarea>
                {errors.message && (
                  <p className="field-error-msg visible" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-sm py-4 px-6 cursor-pointer"
                  data-magnetic
                >
                  <span>{isSubmitting ? 'Preparing Brief...' : 'Submit Fast-Track Project Brief'}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              {/* Status Feedback & Direct Email Fallback */}
              {submitted && (
                <div className="mt-5 p-5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-slate-200 text-sm space-y-3" role="status" aria-live="polite">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-heading font-semibold text-white text-base">
                      ✓ Project Brief Validated &amp; Ready
                    </p>
                    <span className="tech-pill text-cyan-300 border-cyan-500/40">Direct Dispatch</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Your fast-track brief for <strong>{formData.projectType}</strong> ({formData.budget}) is formatted and ready. Choose your preferred channel below:
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a href={mailtoHref} className="btn-primary text-xs py-2.5 px-4">
                      <span>Open in Email Client</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="btn-secondary text-xs py-2.5 px-4 cursor-pointer"
                    >
                      <span>{copiedBrief ? '✓ Copied to Clipboard!' : 'Copy Formatted Brief'}</span>
                    </button>
                    <a
                      href="https://www.upwork.com/freelancers/~010a6e73c111779a15"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2.5 px-4"
                    >
                      <span>Contract on Upwork ↗</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Looking for General Inquiries Callout */}
        <div className="text-center pt-6">
          <p className="text-xs sm:text-sm text-slate-400">
            Just want to say hello or have a general question?
            <Link href="/contact" className="text-cyan-300 hover:text-white underline font-medium transition ml-1">
              Visit General Contacts &amp; Inquiries →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
