import type { Metadata } from 'next';
import './globals.css';
import { constructMetadata, generatePersonJsonLd, generateWebSiteJsonLd } from '@/lib/seo';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ThreeCanvas from '@/components/3d/ThreeCanvas';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-obsidian text-slate-100 antialiased selection:bg-purple-600/30 selection:text-cyan-300 min-h-screen relative overflow-x-hidden">
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>

        {/* Global Loading Orchestrator Curtain */}
        <Preloader />

        {/* Fixed Full-Viewport Three.js WebGL Simulation Canvas */}
        <ThreeCanvas />

        {/* Smooth Scroll & GSAP ScrollTrigger Motion Context */}
        <SmoothScroll>
          <Navbar />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
