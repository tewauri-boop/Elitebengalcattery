import Link from 'next/link';
import { SITE, POSTS } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Bengal Cat Care & Genetics Guides | Elite Bengal Cattery',
  description: 'In-depth educational articles covering Bengal cat genetics, wild rosetting, kitten nutrition, environmental enrichment, and health test interpretations.',
  openGraph: {
    title: 'Bengal Cat Care & Genetics Guides | Elite Bengal Cattery',
    description: 'In-depth educational articles covering Bengal cat genetics, wild rosetting, kitten nutrition, environmental enrichment, and health test interpretations.',
    url: `https://${SITE.domain}/blog/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function BlogIndexPage() {
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
        name: 'Blog',
        item: `https://${SITE.domain}/blog/`,
      },
    ],
  };

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Care & Genetics Blog</span>
        </nav>

        {/* Page Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Educational Resources
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Bengal Cat Care & Genetics Journal
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Expert insights from our North Carolina nursery on feline genetics, rosette development, dietary needs, and home enrichment.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="product-frame relative bg-gray-100">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#141210]/90 backdrop-blur-md text-[#D4AF37] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg font-bold text-[#1E1B18] group-hover:text-[#8B5A2B] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B5A2B] hover:text-[#724822] transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
