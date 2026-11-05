import type { Metadata } from 'next';
import HireClient from '@/components/hire/HireClient';
import { generatePageMetadata, getPersonSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Hire Saurav Bhusal — Fast-Track Client Onboarding & Freelance Contracts',
  description:
    'Hire Saurav Bhusal for frontend web development, interactive 3D WebGL experiences, and UI/UX design. Direct WhatsApp chat, Upwork escrow contracts, Fiverr gigs, and fast-track project onboarding.',
  path: '/hire',
  image: '/assets/images/hero-social-thumbnail.jpg',
  keywords: [
    'Hire Saurav Bhusal',
    'Hire Web Developer Nepal',
    'Freelance Frontend Developer',
    'Upwork Developer Saurav',
    'Fiverr UI UX',
    'WebGL Developer Hire',
    'Remote Developer Nepal'
  ]
});

export default function HirePage() {
  const jsonLd = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HireClient />
    </>
  );
}
