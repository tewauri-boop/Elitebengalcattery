import { SITE, CATEGORIES, PRODUCTS } from '@/src/config/site.js';
import ShopClient from './ShopClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Available Bengal Kittens for Sale | Purebred TICA Lineage',
  description: 'Browse available Bengal kittens for sale at Elite Bengal Cattery. Brown rosetted, snow lynx, silver charcoal kittens with genetic health guarantees and delivery.',
  openGraph: {
    title: 'Available Bengal Kittens for Sale | Purebred TICA Lineage',
    description: 'Browse available Bengal kittens for sale at Elite Bengal Cattery. Brown rosetted, snow lynx, silver charcoal kittens with genetic health guarantees and delivery.',
    url: `https://${SITE.domain}/shop/`,
    images: [{ url: 'https://images.unsplash.com/photo-1513360309081-38f0762daed1?auto=format&fit=crop&w=1200&q=80' }],
  },
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ShopIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Available Kittens',
        item: `https://${SITE.domain}/shop/`,
      },
    ],
  };

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema} />
      <ShopClient categories={CATEGORIES} products={PRODUCTS} />
    </main>
  );
}
