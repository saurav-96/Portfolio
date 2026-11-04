import type { Metadata } from 'next';
import ProjectsClient from '@/components/projects/ProjectsClient';
import { generatePageMetadata, getPersonSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Projects Portfolio — Saurav Bhusal | Web Dev, UI/UX & AI',
  description:
    'Explore Saurav Bhusal\'s project portfolio featuring SwasthyaSutra, KeyFlow, E-Government Platform, YouTube Power-Tools browser extension, UI/UX concepts, and AI automation.',
  path: '/projects',
  image: '/assets/projects/swasthyasutra-thumb.png',
  keywords: [
    'Saurav Bhusal Projects',
    'SwasthyaSutra',
    'KeyFlow',
    'Butwal SmartGov',
    'TubeKit',
    'Web Developer Portfolio',
    'UI/UX Case Studies',
    'Frontend Developer Nepal'
  ]
});

export default function ProjectsPage() {
  const jsonLd = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
