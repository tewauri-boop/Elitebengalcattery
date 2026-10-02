import { MetadataRoute } from 'next';
import { SITE, PRODUCTS, CATEGORIES, POSTS } from '@/src/config/site.js';

export async function generateSitemaps() {
  return [
    { id: 'pages' },
    { id: 'products' },
    { id: 'categories' },
    { id: 'blog' },
  ];
}

export default async function sitemap({ id }: { id: Promise<{ id: string }> | { id: string } }): Promise<MetadataRoute.Sitemap> {
  const resolvedId = typeof (id as any).then === 'function' ? (await (id as Promise<{ id: string }>)).id : (id as { id: string }).id;
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  if (resolvedId === 'pages') {
    return [
      {
        url: `${baseUrl}/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/shop/`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/faq/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/wholesale/`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/search/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ];
  }

  if (resolvedId === 'products') {
    return PRODUCTS.map((product) => ({
      url: `${baseUrl}/shop/${product.category}/${product.slug}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
      images: product.images,
    }));
  }

  if (resolvedId === 'categories') {
    return CATEGORIES.map((cat) => ({
      url: `${baseUrl}/shop/${cat.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [cat.image],
    }));
  }

  if (resolvedId === 'blog') {
    return POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [post.image],
    }));
  }

  return [];
}
