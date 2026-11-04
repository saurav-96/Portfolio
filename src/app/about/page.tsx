import type { Metadata } from 'next';
import AboutClient from '@/components/about/AboutClient';
import { generatePageMetadata, getPersonSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Me — Saurav Bhusal | Web Developer, UI/UX & CS Student',
  description:
    'Learn about Saurav Bhusal, a Computer Science student and Creative Web Developer from Nepal. Harvard CS50x verified alum, Hackathon 2026 winner, specializing in React, Next.js, Three.js, and Figma.',
  path: '/about',
  image: '/assets/images/saurav-portrait.jpg',
  keywords: [
    'About Saurav Bhusal',
    'Saurav Bhusal Bio',
    'Harvard CS50x Saurav',
    'Web Developer Nepal',
    'NIT Legend Hackathon Winner',
    'Frontend Developer Nepal'
  ]
});

export default function AboutPage() {
  const jsonLd = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
