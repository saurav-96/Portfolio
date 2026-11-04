import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';
import { generatePageMetadata, getPersonSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact & Inquiries — Saurav Bhusal | Software & Web Developer',
  description:
    'Get in touch with Saurav Bhusal, Software & Web Developer and UI/UX Designer from Nepal. Send a message, discuss project inquiries, or connect directly via WhatsApp, Email, and social channels.',
  path: '/contact',
  image: '/assets/images/saurav-portrait.jpg',
  keywords: [
    'Contact Saurav Bhusal',
    'Web Developer Nepal Contact',
    'Hire Web Developer',
    'UI/UX Designer Nepal',
    'Saurav Bhusal Email',
    'WhatsApp Saurav Bhusal',
    'Remote Web Developer'
  ]
});

export default function ContactPage() {
  const jsonLd = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
