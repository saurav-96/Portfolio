import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-36 pb-20 text-center min-h-[75vh] flex items-center justify-center">
      <div className="glass-card p-10 sm:p-14 w-full">
        <span className="eyebrow-badge mb-4">
          <span className="eyebrow-dot"></span>
          <span>ERROR 404 • COORDINATES NOT FOUND</span>
        </span>
        <h1 className="font-heading text-6xl sm:text-7xl font-bold text-gradient mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
          Lost in Digital Space
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          The page or resource you requested doesn&apos;t exist or has moved. Explore my projects, services, or return to the homepage below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary" data-magnetic>
            <span>Return to Homepage</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn-secondary">
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
