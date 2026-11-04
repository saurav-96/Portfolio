import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import { constructMetadata, generatePersonJsonLd, generateWebSiteJsonLd } from '@/lib/seo';
import SmoothScroll from '@/components/layout/SmoothScroll';
import MotionEngine from '@/components/layout/MotionEngine';
import ThreeCanvas from '@/components/3d/ThreeCanvas';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import NavigationProgress from '@/components/layout/NavigationProgress';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-hand',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="bg-obsidian text-slate-100 antialiased selection:bg-purple-600/30 selection:text-cyan-300 min-h-screen relative overflow-x-hidden font-body">
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>

        {/* Instant Navigation Progress Indicator */}
        <NavigationProgress />

        {/* Global Loading Orchestrator Curtain */}
        <Preloader />

        {/* Global GSAP ScrollTrigger, Parallax & Magnetic Motion Engine */}
        <MotionEngine />

        {/* Fixed Full-Viewport Three.js WebGL Simulation Canvas */}
        <ThreeCanvas />

        {/* Atmospheric Floating Aurora Orbs & Animated Cyber Grid */}
        <div className="ambient-backdrop" aria-hidden="true" />
        <div className="bg-grid-overlay" aria-hidden="true" />

        {/* Smooth Scroll & GSAP ScrollTrigger Motion Context */}
        <SmoothScroll>
          <div className="site-wrapper">
            <Navbar />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
