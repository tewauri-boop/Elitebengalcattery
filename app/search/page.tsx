import { SITE } from '@/src/config/site.js';
import JsonLd from '@/components/JsonLd';
import SearchClient from './SearchClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search Bengal Kittens & Guides | Elite Bengal Cattery',
  description: 'Search available purebred Bengal kittens, color varieties, and feline health guides at Elite Bengal Cattery.',
  openGraph: {
    title: 'Search Bengal Kittens & Guides | Elite Bengal Cattery',
    description: 'Search available purebred Bengal kittens, color varieties, and feline health guides at Elite Bengal Cattery.',
    url: `https://${SITE.domain}/search/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/search/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function SearchPage() {
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: 'Search Elite Bengal Cattery',
    url: `https://${SITE.domain}/search/`,
  };

  return (
    <main id="main">
      <JsonLd data={searchSchema} />
      <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading catalog search...</div>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
