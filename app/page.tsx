import Link from 'next/link';
import { SITE, CONTACT, BRAND, CATEGORIES, PRODUCTS, FAQ, SHOP, REVIEWS } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Eye,
  MessageSquare,
  DollarSign,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';

export const metadata = {
  title: 'Elite Bengal Kittens for Sale | TICA Registered Purebred Cattery',
  description: 'Discover ethically bred Elite Bengal kittens with wild rosetting and certified DNA health clearances. In-cabin nationwide pet nanny delivery included.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Elite Bengal Kittens for Sale | TICA Registered Purebred Cattery',
    description: 'Discover ethically bred Elite Bengal kittens with wild rosetting and certified DNA health clearances. In-cabin nationwide pet nanny delivery included.',
    url: `https://${SITE.domain}/`,
    images: [{ url: '/images/bengal_hero_kittens.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Bengal Kittens for Sale | TICA Registered Purebred Cattery',
    description: 'Discover ethically bred Elite Bengal kittens with wild rosetting and certified DNA health clearances. In-cabin nationwide pet nanny delivery included.',
    images: ['/images/bengal_hero_kittens.jpg'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function HomePage() {
  const featuredKittens = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const primaryHeroImage = '/images/bengal_hero_kittens.jpg';
  const productPrices = PRODUCTS.map((p) => p.price);
  const minPrice = Math.min(...productPrices);
  const maxPrice = Math.max(...productPrices);

  // JSON-LD Schemas: Store, Organization, WebSite, SearchAction, FAQPage
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization'],
      '@id': `https://${SITE.domain}/#organization`,
      name: SITE.name,
      description: BRAND.description,
      foundingDate: BRAND.foundingYear,
      foundingLocation: {
        '@type': 'Place',
        name: BRAND.foundingLocation,
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'North Carolina',
        addressCountry: 'US',
      },
      url: `https://${SITE.domain}/`,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: BRAND.sameAs,
      areaServed: ['United States'],
      numberOfItems: PRODUCTS.length,
      knowsAbout: [
        'Bengal Cats',
        'Bengal Kittens',
        'Domestic Bengal Cats',
        'Snow Bengal Kittens',
        'Brown Rosetted Bengals',
        'TICA Standards',
        'Feline Genetics',
      ],
      priceRange: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      makesOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: SITE.currency,
        lowPrice: minPrice,
        highPrice: maxPrice,
        offerCount: PRODUCTS.length,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '140',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `https://${SITE.domain}/#website`,
      url: `https://${SITE.domain}/`,
      name: SITE.name,
      description: SITE.tagline,
      publisher: {
        '@id': `https://${SITE.domain}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://${SITE.domain}/search/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.slice(0, 6).map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <main id="main">
      <JsonLd data={homeSchema} />

      {/* 1. HERO SECTION: Exactly ONE <h1> */}
      <section className="relative bg-[#141210] text-white min-h-[82vh] lg:min-h-[88vh] flex items-center overflow-hidden border-b border-[#292420]">
        {/* Bengal Kittens Hero Background */}
        <div className="absolute inset-0 z-0">
          <SmartImage
            src={primaryHeroImage}
            alt="Adorable purebred Bengal kittens with leopard rosettes playing in luxury nursery"
            fill
            priority
            className="object-cover object-center lg:object-right filter brightness-95 contrast-[1.05]"
          />
          {/* Directional scrim: dark on text side (left), crystal-clear view of the Bengal kittens on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141210] via-[#141210]/90 to-[#141210]/20 sm:via-[#141210]/80 sm:to-transparent lg:from-[#141210] lg:via-[#141210]/65 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Award className="w-3.5 h-3.5" />
              <span>TICA Registered Ethical Cattery • North Carolina</span>
            </div>

            {/* THE ONLY H1 ON THE ENTIRE PAGE */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
              Elite Bengal Kittens with Wild Elegance & Champion Rosettes
            </h1>

            <p className="text-base sm:text-lg text-[#D5CEBF] font-normal leading-relaxed">
              {BRAND.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href="/shop/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8B5A2B] hover:bg-[#A06933] text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Browse Available Kittens</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about reserving an Elite Bengal kitten.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-semibold rounded-xl text-sm backdrop-blur-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Live Concierge</span>
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#A69E94]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                Free Nationwide Courier Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                2-Year Health Warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST VALUE BAR */}
      <section className="bg-white border-b border-[#E6E0D6] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-1.5 p-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8B5A2B] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-[#1E1B18]">100% Certified Genetics</h2>
              <p className="text-xs text-gray-500">PK-Def, PRA-b clear & cardiologist HCM screened</p>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8B5A2B] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-[#1E1B18]">In-Cabin Flight Nanny</h2>
              <p className="text-xs text-gray-500">Free hand-delivery across all continental US states</p>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8B5A2B] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-[#1E1B18]">Home Raised Nursery</h2>
              <p className="text-xs text-gray-500">Early neurological stimulation & family cuddled</p>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8B5A2B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-[#1E1B18]">10% Crypto Discount</h2>
              <p className="text-xs text-gray-500">Save 10% on Bitcoin, USDT & crypto reservations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED KITTENS SHOWCASE (Uniform 4:3 aspect ratio cards) */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
                Immediate Placement Available
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
                Featured Elite Bengal Kittens
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Each kitten is raised in our living room with endless affection, full core vaccinations, microchip, and pedigree records.
              </p>
            </div>
            <Link
              href="/shop/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5A2B] hover:text-[#724822] transition-colors"
            >
              <span>Explore All {PRODUCTS.length} Available Kittens</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredKittens.map((kitten) => (
              <div
                key={kitten.slug}
                className="bg-white rounded-2xl border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* 4:3 Uniform Aspect Ratio Frame */}
                <div className="product-frame relative bg-gray-100">
                  <SmartImage
                    src={kitten.images[0]}
                    alt={`${kitten.name} - Purebred Bengal Kitten`}
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
                    <div className="text-[11px] uppercase tracking-wider text-[#8B5A2B] font-semibold">
                      {kitten.colorPattern}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1E1B18] group-hover:text-[#8B5A2B] transition-colors">
                      <Link href={`/shop/${kitten.category}/${kitten.slug}/`}>
                        {kitten.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {kitten.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="text-xs font-bold text-gray-700 hover:text-[#8B5A2B] transition-colors"
                    >
                      View Details →
                    </Link>
                    <a
                      href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(`Hello! I am interested in reserving ${kitten.name} ($${kitten.price.toLocaleString()} USD). Is this kitten currently available?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reserve</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE BY COLOR PATTERN & CATEGORY */}
      <section className="py-16 bg-white border-y border-[#E6E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
              Rare Bloodline Varieties
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
              Select Your Dream Bengal Coat
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              From golden leopard rosettes to sapphire-eyed Snow Lynx and midnight charcoals, our lines represent peak conformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="group relative rounded-2xl overflow-hidden border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-[#FAF7F2]"
              >
                <div className="product-frame relative overflow-hidden bg-gray-100">
                  <SmartImage
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-lg font-bold text-[#FAF7F2] drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {cat.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#8B5A2B] group-hover:underline">
                    <span>Explore Lineage</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND AUTHORITY & THE 12 TRUTHFUL SIGNALS */}
      <section className="py-16 lg:py-24 bg-[#141210] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5A2B]/30 border border-[#8B5A2B]/50 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                <span>About Elite Bengal Cattery</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F2] leading-snug">
                Dedicated to Preserving the Wild Splendor & Loving Temperament of Bengal Cats
              </h2>

              <p className="text-sm sm:text-base text-[#D5CEBF] leading-relaxed">
                Founded in 2019 in North Carolina, Elite Bengal Cattery was established with a singular vision: to breed the highest quality purebred Bengal cats with exotic jaguar rosettes, glittering silk coats, and exceptionally sweet, family-ready temperaments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#1F1C19] rounded-xl border border-[#2D2824]">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">2019</div>
                  <div className="text-xs font-semibold text-[#FAF7F2] mt-1">Established in North Carolina</div>
                  <div className="text-xs text-gray-400 mt-1">Over 7 years of selective ethical breeding excellence.</div>
                </div>

                <div className="p-4 bg-[#1F1C19] rounded-xl border border-[#2D2824]">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">100%</div>
                  <div className="text-xs font-semibold text-[#FAF7F2] mt-1">DNA Genetic Clearances</div>
                  <div className="text-xs text-gray-400 mt-1">Certified negative for PK-Def, PRA-b and annual HCM scans.</div>
                </div>

                <div className="p-4 bg-[#1F1C19] rounded-xl border border-[#2D2824]">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">50 States</div>
                  <div className="text-xs font-semibold text-[#FAF7F2] mt-1">Nationwide Flight Courier</div>
                  <div className="text-xs text-gray-400 mt-1">In-cabin flight nanny delivers safely into your arms.</div>
                </div>

                <div className="p-4 bg-[#1F1C19] rounded-xl border border-[#2D2824]">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">TICA</div>
                  <div className="text-xs font-semibold text-[#FAF7F2] mt-1">Certified Ethical Standards</div>
                  <div className="text-xs text-gray-400 mt-1">Official pedigree documentation and multi-gen ancestry.</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:underline"
                >
                  <span>Read Our Full Cattery Story & Breeding Ethics</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="product-frame rounded-2xl overflow-hidden shadow-2xl border border-[#2D2824]">
                <SmartImage
                  src="/images/health-guarantee-kitten.jpg"
                  alt="Elite Bengal Cattery 2-Year Health Guarantee Kitten"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#8B5A2B] text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-[#A06933]">
                <div className="flex items-center gap-2 text-[#FAF7F2] font-serif font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>2-Year Health Guarantee</span>
                </div>
                <p className="text-xs text-amber-100 mt-1">
                  Every kitten leaves our home with a binding health warranty against genetic defects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADOPTION PROCESS */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
              Seamless & Safe
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
              How to Welcome Your Bengal Kitten
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Our concierge team makes reserving and welcoming your new kitten smooth, transparent, and completely stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#1E1B18] mb-2">Select Your Kitten</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore our available litters. Review photos, personality profiles, color patterns, and veterinary certifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#1E1B18] mb-2">Photos & TikTok Videos</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Watch our kittens on TikTok <a href="https://www.tiktok.com/@elitebengalcatter" target="_blank" rel="noopener noreferrer" className="text-[#8B5A2B] font-bold hover:underline">@elitebengalcatter</a> and receive high-res individual photo sets directly via WhatsApp.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-[#1E1B18] mb-2">Secure Deposit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Reserve your kitten with a $500 deposit (save 10% on crypto). We prepare all health records and travel itineraries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-[#1E1B18] mb-2">Pet Nanny Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our flight courier travels in-cabin with your kitten and hands them over directly at your nearest airport or home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ADOPTER REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-20 bg-white border-t border-[#E6E0D6] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
              Verified Family Testimonials
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1B18] mt-2">
              Loved in Forever Homes Across North America
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
              Read real stories from families who welcomed our purebred Bengal kittens, received in-cabin flight nanny delivery, and experienced our life-long cattery support.
            </p>

            {/* Aggregate Score Bar */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3 px-6 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] shadow-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1E1B18]">5.0 Out of 5.0</span>
              </div>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">•</span>
              <span className="text-xs font-medium text-gray-700">140+ Happy Bengal Families</span>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">•</span>
              <span className="text-xs font-medium text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% In-Cabin Flight Nanny Delivery
              </span>
            </div>
          </div>

          {/* Reviews Grid (6 Reviews in 3-column responsive layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E6E0D6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Adopter
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1E1B18] mb-2 leading-snug">
                    &ldquo;{review.headline}&rdquo;
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E0D6] flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <SmartImage
                      src={review.image}
                      alt={`${review.kittenAdopted} - adopted by ${review.author}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#1E1B18] text-sm">{review.author}</div>
                    <div className="text-gray-500 font-medium">
                      {review.location} • <span className="text-[#8B5A2B] font-semibold">{review.variety}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof CTA */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 mb-4">
              Want to see daily nursery play sessions and photos from recent litters?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141210] hover:bg-[#25201C] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Follow @elitebengalcatter on TikTok</span>
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I read the adopter reviews on your site and would love to inquire about available Bengal kittens.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat on WhatsApp ({CONTACT.whatsapp})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOMEPAGE FAQ (40-60 words answers, matching FAQPage Schema) */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E6E0D6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1B18] mt-1">
              Adoption, Delivery & Care Answers
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#E6E0D6] bg-[#FAF7F2] hover:border-[#8B5A2B]/40 transition-colors"
              >
                <h3 className="font-serif text-base font-bold text-[#1E1B18] mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B5A2B] hover:underline"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#141210] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            Ready for Wild Companionship?
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F2]">
            Reserve Your Purebred Bengal Kitten Today
          </h2>
          <p className="text-sm sm:text-base text-[#D5CEBF] max-w-2xl mx-auto">
            Discover daily photos and videos on TikTok @elitebengalcatter, review genetic documentation, or contact our nursery concierge for adoption guidance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop/"
              className="px-8 py-3.5 bg-[#8B5A2B] hover:bg-[#A06933] text-white font-bold rounded-xl text-sm transition-all shadow-lg"
            >
              View Available Kittens
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to speak with someone about adopting an Elite Bengal kitten.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
