import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE, PRODUCTS, CATEGORIES, BRAND, CONTACT } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import ProductClient from './ProductClient';
import { ArrowLeft, Shield, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const kitten = PRODUCTS.find((p) => p.slug === slug);

  if (!kitten) return {};

  return {
    title: `${kitten.name} — ${kitten.colorPattern} Bengal Kitten | ${SITE.name}`,
    description: `${kitten.shortDescription} Price: $${kitten.price.toLocaleString()} USD. TICA registered, DNA health tested with free US flight delivery.`,
    openGraph: {
      title: `${kitten.name} — ${kitten.colorPattern} Bengal Kitten`,
      description: kitten.shortDescription,
      url: `https://${SITE.domain}/shop/${kitten.category}/${kitten.slug}/`,
      images: kitten.images.map((img) => ({ url: img })),
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/${kitten.category}/${kitten.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: catSlug, slug } = await params;
  const kitten = PRODUCTS.find((p) => p.slug === slug);
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!kitten || !category) {
    notFound();
  }

  const relatedKittens = PRODUCTS.filter(
    (p) => p.category === kitten.category && p.slug !== kitten.slug
  ).slice(0, 3);

  // Schema: Product + Offer + Brand + BreadcrumbList
  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${kitten.name} — Purebred Bengal Kitten`,
      description: kitten.description,
      image: kitten.images,
      sku: kitten.slug,
      category: category.name,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: SITE.currency,
        price: kitten.price,
        availability: 'https://schema.org/InStock',
        url: `https://${SITE.domain}/shop/${kitten.category}/${kitten.slug}/`,
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: SITE.name,
        },
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
          name: 'Shop',
          item: `https://${SITE.domain}/shop/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: `https://${SITE.domain}/shop/${category.slug}/`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: kitten.name,
          item: `https://${SITE.domain}/shop/${category.slug}/${kitten.slug}/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="py-10 bg-[#FAF7F2]">
      <JsonLd data={productSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-[#8B5A2B]">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${category.slug}/`} className="hover:text-[#8B5A2B]">{category.name}</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{kitten.name}</span>
        </nav>

        {/* Kitten Header: EXACTLY ONE H1 ON THIS PAGE */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
            {kitten.name} — {kitten.colorPattern} Bengal Kitten
          </h1>
        </div>

        {/* Client Product View (Interactive Gallery, Cart, WhatsApp Concierge) */}
        <ProductClient kitten={kitten} />

        {/* Detailed Description & Medical Schedule */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-[#E6E0D6] shadow-sm space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18] mb-4">
              Kitten Biography & Personality
            </h2>
            <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
              {kitten.description}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="font-serif text-xl font-bold text-[#1E1B18] mb-4">
              What Is Included with {kitten.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Official TICA Registration:</strong> Full pedigree registration papers provided upon adoption.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>2-Year Congenital Warranty:</strong> Binding written replacement guarantee against hereditary conditions.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Core Vaccinations & Microchip:</strong> Complete age-appropriate inoculations, deworming, and ISO microchip.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Complimentary Flight Nanny:</strong> In-cabin flight courier delivery directly to your closest major airport.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Starter Care Kit:</strong> Luxury travel carrier, scented nursery blanket, premium kitten kibble, and favorite toys.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Lifetime Breeder Support:</strong> Direct WhatsApp line to our nursery team for nutritional and behavioral advice.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Kittens */}
        {relatedKittens.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
                More {category.name} Available
              </h2>
              <Link
                href={`/shop/${category.slug}/`}
                className="text-xs font-bold text-[#8B5A2B] hover:underline"
              >
                View Category ({category.name}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedKittens.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-white rounded-2xl border border-[#E6E0D6] shadow-sm hover:shadow-lg transition-all overflow-hidden group flex flex-col"
                >
                  <div className="product-frame relative bg-gray-100">
                    <SmartImage
                      src={rel.images[0]}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-3 right-3 bg-white/95 text-xs font-bold px-2 py-1 rounded shadow-sm">
                      ${rel.price.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#1E1B18] group-hover:text-[#8B5A2B]">
                        <Link href={`/shop/${rel.category}/${rel.slug}/`}>{rel.name}</Link>
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{rel.shortDescription}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                      <Link
                        href={`/shop/${rel.category}/${rel.slug}/`}
                        className="text-xs font-bold text-[#8B5A2B] hover:underline"
                      >
                        View Kitten →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
