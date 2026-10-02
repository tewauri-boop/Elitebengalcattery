import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, CATEGORIES, PRODUCTS, CONTACT } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { MessageSquare, ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!category) return {};

  return {
    title: `${category.name} for Sale | Elite Bengal Cattery`,
    description: `${category.description} Certified DNA negative parents, TICA registered with free nationwide flight courier delivery.`,
    openGraph: {
      title: `${category.name} for Sale | Elite Bengal Cattery`,
      description: category.description,
      url: `https://${SITE.domain}/shop/${category.slug}/`,
      images: [{ url: category.image }],
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

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
        name: 'Shop',
        item: `https://${SITE.domain}/shop/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://${SITE.domain}/shop/${category.slug}/`,
      },
    ],
  };

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Links */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8" aria-label="Breadcrumbs">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-[#8B5A2B]">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header: EXACTLY ONE H1 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E6E0D6] shadow-sm mb-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
              Pedigreed Bloodline
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] mt-2 mb-4">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {category.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded-full border border-[#E6E0D6]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                PK-Def & PRA-b Clear
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded-full border border-[#E6E0D6]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
                10% Crypto Discount
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded-full border border-[#E6E0D6]">
                ✈️ Free Flight Courier
              </span>
            </div>
          </div>
        </div>

        {/* Kitten Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((kitten) => (
            <div
              key={kitten.slug}
              className="bg-white rounded-2xl border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <div className="product-frame relative bg-gray-100">
                <SmartImage
                  src={kitten.images[0]}
                  alt={`${kitten.name} - ${category.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {kitten.badge && (
                  <span className="absolute top-3 left-3 bg-[#171513]/90 backdrop-blur-md text-[#D4AF37] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {kitten.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#1E1B18] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  ${kitten.price.toLocaleString()} USD
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="uppercase tracking-wider text-[#8B5A2B] font-semibold">
                      {kitten.gender}
                    </span>
                    <span>{kitten.colorPattern}</span>
                  </div>

                  <h2 className="font-serif text-base font-bold text-[#1E1B18] group-hover:text-[#8B5A2B] transition-colors">
                    <Link href={`/shop/${kitten.category}/${kitten.slug}/`}>
                      {kitten.name}
                    </Link>
                  </h2>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {kitten.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/shop/${kitten.category}/${kitten.slug}/`}
                    className="text-xs font-bold text-gray-700 hover:text-[#8B5A2B] transition-colors"
                  >
                    View Kitten →
                  </Link>

                  <a
                    href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(`Hello! I want to inquire about ${kitten.name} ($${kitten.price.toLocaleString()} USD).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reserve</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/shop/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5A2B] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All Kitten Categories</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
