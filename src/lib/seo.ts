import type { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Saurav Bhusal',
  title: 'Saurav Bhusal — 3D Interactive Developer & UI/UX Design Portfolio',
  description:
    'High-craft 3D interactive developer and UI/UX design portfolio of Saurav Bhusal. Featuring WebGL Three.js experiences, modern React/Next.js engineering, GSAP animations, and human-centered design.',
  url: 'https://owns.com.np',
  ogImage: '/assets/images/saurav-portrait.jpg',
  author: 'Saurav Bhusal',
  location: 'Kapilvastu & Butwal, Nepal',
  email: 'sauravbhusal369@gmail.com',
  social: {
    github: 'https://github.com/saurav-96',
    linkedin: 'https://www.linkedin.com/in/saurav-b-502352415/',
    upwork: 'https://www.upwork.com/freelancers/~010a6e73c111779a15',
    fiverr: 'https://www.fiverr.com/saurav_bhusal',
    freelancer: 'https://www.freelancer.com/u/saurav96',
    whatsapp: 'https://wa.me/9779812984180',
    telegram: 'https://t.me/saurav_bhusal',
    instagram: 'https://instagram.com/saurav.bhusal',
    facebook: 'https://facebook.com/saurav.bhusal.official',
    twitter: 'https://x.com/saurav_bhusal',
  },
};

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const canonicalUrl = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;

  return {
    title: fullTitle,
    description,
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@saurav_bhusal',
    },
    icons: {
      icon: [
        { url: '/assets/icons/favicon.ico' },
        { url: '/assets/icons/favicon.svg', type: 'image/svg+xml' },
        { url: '/assets/icons/favicon.png', type: 'image/png' },
      ],
      apple: [{ url: '/assets/icons/favicon.png' }],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saurav Bhusal',
    url: 'https://owns.com.np',
    image: 'https://owns.com.np/assets/images/saurav-portrait.jpg',
    jobTitle: 'Software & Web Developer, UI/UX Designer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kapilvastu',
      addressRegion: 'Lumbini Province',
      addressCountry: 'Nepal',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Harvard University (CS50x)',
        url: 'https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56',
      },
    ],
    sameAs: [
      'https://github.com/saurav-96',
      'https://www.linkedin.com/in/saurav-b-502352415/',
      'https://www.upwork.com/freelancers/~010a6e73c111779a15',
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Three.js',
      'WebGL',
      'GSAP Animations',
      'UI/UX Design',
      'Figma',
      'Tailwind CSS',
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Saurav Bhusal Portfolio',
    url: 'https://owns.com.np',
    author: {
      '@type': 'Person',
      name: 'Saurav Bhusal',
    },
    description: SITE_CONFIG.description,
  };
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const meta = constructMetadata({
    title,
    description,
    canonical: path,
    image,
  });
  if (keywords) {
    meta.keywords = keywords;
  }
  return meta;
}

export const getPersonSchema = generatePersonJsonLd;
export const getWebSiteSchema = generateWebSiteJsonLd;
