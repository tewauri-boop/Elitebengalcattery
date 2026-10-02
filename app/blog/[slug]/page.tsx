import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, POSTS } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://${SITE.domain}/blog/${post.slug}/`,
      images: [{ url: post.image }],
    },
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const blogSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: '2025-01-15T08:00:00Z',
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: SITE.name,
        url: `https://${SITE.domain}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: `https://${SITE.domain}/`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${SITE.domain}/blog/${post.slug}/`,
      },
    },
    {
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
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://${SITE.domain}/blog/${post.slug}/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={blogSchema} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-[#8B5A2B]">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Header: EXACTLY ONE H1 ON THIS PAGE */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="px-3 py-1 bg-[#8B5A2B]/10 text-[#8B5A2B] rounded-full font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image (4:3 frame) */}
        <div className="product-frame rounded-3xl overflow-hidden border border-[#E6E0D6] shadow-xl relative bg-gray-100">
          <SmartImage
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E6E0D6] shadow-sm space-y-8 text-gray-700 leading-relaxed">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Understanding Bengal Breed Genetics & Health Heritage
            </h2>
            <p>
              The Bengal cat breed is renowned worldwide for its extraordinary cosmetic beauty and active, inquisitive mind. Developed originally by crossing the wild Asian Leopard Cat (<em>Prionailurus bengalensis</em>) with domestic breeds like the Egyptian Mau and Abyssinian, modern fourth-generation (G4) and beyond Bengal cats maintain pure wild aesthetics while being thoroughly domestic and docile companions.
            </p>
            <p>
              When evaluating a Bengal kitten, prospective parents often focus primarily on rosette definition and coat clarity. However, ethical breeding demands equal attention to underlying genetic stability. Without meticulous screening for autosomal recessive anomalies such as PK-Def and PRA-b, even visually striking lines can suffer avoidable hereditary health challenges.
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1E1B18] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5A2B]" />
              Key Considerations for Bengal Parents
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Always verify two-year written health warranties covering genetic cardiac (HCM) and hereditary defects.</li>
              <li>Provide vertical territory: Cat trees exceeding 6 feet and dedicated exercise wheels satisfy instinctual energy.</li>
              <li>Feed high-protein, meat-first grain-free diets formulated for obligate carnivores.</li>
              <li>Ensure TICA registration papers are provided without hidden processing surcharges.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Environmental Enrichment & Socialization
            </h2>
            <p>
              Bengals possess canine-like loyalty and an extraordinary capacity for play. Unlike low-energy lap breeds, Bengals flourish when their cognitive faculties are regularly exercised. Interactive puzzle feeders, automated feather wands, and leash training allow your Bengal to satisfy their natural curiosity in a controlled, safe setting.
            </p>
            <p>
              Early neurological stimulation (ENS) performed by the breeder during weeks three through six establishes higher stress tolerance, improved cardiovascular performance, and calm responses to novel household stimuli such as vacuum cleaners, visiting guests, and family children.
            </p>
          </div>

          {/* Internal Linking Box */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-semibold">Interested in adoption?</span>
              <span className="text-sm font-bold text-[#1E1B18]">Explore our currently available litters in North Carolina.</span>
            </div>
            <Link
              href="/shop/"
              className="px-5 py-2.5 bg-[#8B5A2B] hover:bg-[#A06933] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shrink-0"
            >
              Browse Kittens →
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5A2B] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
