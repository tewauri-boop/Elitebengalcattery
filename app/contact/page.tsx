import { SITE, CONTACT } from '@/src/config/site.js';
import JsonLd from '@/components/JsonLd';
import ContactClient from './ContactClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Contact Elite Bengal Cattery | North Carolina Nursery',
  description: 'Get in touch with Elite Bengal Cattery for kitten availability inquiries, individual HD photo requests, adoption deposits, or flight delivery arrangements.',
  openGraph: {
    title: 'Contact Elite Bengal Cattery | North Carolina Nursery',
    description: 'Get in touch with Elite Bengal Cattery for kitten availability inquiries, individual HD photo requests, adoption deposits, or flight delivery arrangements.',
    url: `https://${SITE.domain}/contact/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Elite Bengal Cattery',
    description: 'Adoption inquiries and nursery support for purebred Bengal kittens.',
    url: `https://${SITE.domain}/contact/`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      url: `https://${SITE.domain}/`,
    },
  };

  return (
    <main id="main">
      <JsonLd data={contactSchema} />
      <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading adoption concierge...</div>}>
        <ContactClient />
      </Suspense>
    </main>
  );
}
