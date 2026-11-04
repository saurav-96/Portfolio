import type { Metadata } from 'next';
import ServicesClient from '@/components/services/ServicesClient';
import { generatePageMetadata, getPersonSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Freelance Services — Saurav Bhusal | Web Dev, UI/UX & AI',
  description:
    'Hire Saurav Bhusal for responsive Web Development, Figma UI/UX Design, Python AI Automation, and Graphic Design. Explore services and collaborative workflow.',
  path: '/services',
  image: '/assets/images/saurav-portrait.jpg',
  keywords: [
    'Hire Saurav Bhusal',
    'Freelance Web Developer',
    'UI/UX Designer Upwork',
    'Three.js Developer',
    'Figma Designer',
    'Python Automation',
    'Full Stack Nepal'
  ]
});

export default function ServicesPage() {
  const jsonLd = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
