import Link from 'next/link';
import { SITE, CONTACT, BRAND } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { ShieldCheck, Award, Heart, Sparkles, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Our Cattery — Ethical Bengal Breeder in North Carolina',
  description: 'Learn about Elite Bengal Cattery, our 2019 founding in North Carolina, TICA ethical standards, comprehensive genetic testing, and home-raised nursery philosophy.',
  openGraph: {
    title: 'About Our Cattery — Ethical Bengal Breeder in North Carolina',
    description: 'Learn about Elite Bengal Cattery, our 2019 founding in North Carolina, TICA ethical standards, comprehensive genetic testing, and home-raised nursery philosophy.',
    url: `https://${SITE.domain}/about/`,
    images: [{ url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80' }],
  },
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function AboutPage() {
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['AboutPage', 'Organization'],
      '@id': `https://${SITE.domain}/about/#organization`,
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
      url: `https://${SITE.domain}/about/`,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: BRAND.sameAs,
      areaServed: ['United States'],
      knowsAbout: [
        'Bengal Cat Breed Standards',
        'Ethical Feline Husbandry',
        'Feline HCM Echocardiogram Screening',
        'Early Neurological Stimulation in Kittens',
        'TICA Show Conformation',
      ],
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
          name: 'About Cattery',
          item: `https://${SITE.domain}/about/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={aboutSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumbs">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">About Cattery</span>
        </nav>

        {/* Section Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Preserving Wild Heritage & Gentle Temperament
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            About Elite Bengal Cattery
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Founded in 2019 in North Carolina, Elite Bengal Cattery is dedicated to raising exceptional domestic Bengal cats distinguished by high-contrast rosettes, glittered silk coats, and an affectionate, family-centered disposition.
          </p>
        </div>

        {/* Nursery Showcase Image */}
        <div className="product-frame rounded-3xl overflow-hidden border border-[#E6E0D6] shadow-xl relative bg-gray-100">
          <SmartImage
            src="/images/health-guarantee-kitten.jpg"
            alt="Elite Bengal Cattery Home Environment in North Carolina"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article: Over 700 Words of Entity-Rich Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E6E0D6] shadow-sm space-y-12 text-gray-700 leading-relaxed">
          {/* Section 1: The Founding Narrative */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Our Founding Vision & Philosophy
            </h2>
            <p>
              Elite Bengal Cattery was founded in 2019 in the heart of North Carolina out of an enduring fascination with the Bengal cat—a magnificent hybrid breed created through the careful crossing of the Asian Leopard Cat (<em>Prionailurus bengalensis</em>) with domestic felines. Our founders recognized that while the Bengal cat possesses the breathtaking visual signature of an untamed jungle predator, its true triumph is a loving, intelligent, and deeply devoted domestic soul.
            </p>
            <p>
              From day one, our objective has remained firm: we never operate as a commercial facility or high-volume breeding kennel. Instead, our cats live directly inside our home as cherished family members. Every breeding queen and stud has access to expansive, sunlit living rooms, climbing walls, interactive exercise wheels, and human affection from the moment they are born. We firmly believe that the emotional stability and gentleness of adult Bengal cats begins with early socialization, gentle daily handling, and a stress-free environment during the critical first twelve weeks of life.
            </p>
          </section>

          {/* Section 2: Four Core Differentiators */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Our Four Pillars of Breeding Excellence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BRAND.differentiation.map((diffText, idx) => (
                <div key={idx} className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {diffText}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Health Testing Protocol */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Rigorous Genetic Clearances & Veterinary Oversight
            </h2>
            <p>
              Health and longevity are the foundational prerequisites of ethical cat breeding. Every adult breeding cat at Elite Bengal Cattery undergoes exhaustive DNA screening through certified veterinary laboratories prior to entering our breeding program.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-emerald-900 block">Pyruvate Kinase Deficiency (PK-Def):</strong>
                  Every parent is tested N/N normal. This guarantees your kitten cannot develop this hereditary hemolytic anemia that affects red blood cells.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-emerald-900 block">Progressive Retinal Atrophy (PRA-b):</strong>
                  Screened N/N negative across all pedigree bloodlines to ensure normal retinal photoreceptor health and prevent early blindness.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-emerald-900 block">Hypertrophic Cardiomyopathy (HCM) Screening:</strong>
                  Our studs and queens receive periodic echocardiograms performed by board-certified veterinary cardiologists to ensure optimal cardiac wall thickness and function.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Milestones Timeline */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Milestones in Our Journey
            </h2>
            <div className="border-l-2 border-[#8B5A2B]/30 pl-6 space-y-6">
              {BRAND.milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 bg-[#8B5A2B] rounded-full border-2 border-white" />
                  <span className="font-serif text-base font-bold text-[#8B5A2B] block">
                    {m.year}
                  </span>
                  <p className="text-sm text-gray-700 mt-1">
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Delivery & Geographic Footprint */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Nationwide In-Cabin Flight Pet Nanny Delivery
            </h2>
            <p>
              While our cattery is based in North Carolina, we proudly place kittens with loving families across all fifty United States. We strictly reject cargo shipping for our kittens. Instead, we provide complimentary in-cabin flight courier delivery.
            </p>
            <p>
              A licensed, experienced pet nanny accompanies your kitten inside the airplane cabin, monitoring temperature, hydration, and comfort during the entire voyage. Upon landing at your nearest major airport, the pet nanny greets you personally and transfers the kitten, health portfolio, vaccination records, and starter kit directly into your arms.
            </p>
          </section>

          {/* CTA Box */}
          <div className="mt-8 p-8 bg-[#141210] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">
                Ready to Meet Our Kittens?
              </h3>
              <p className="text-xs text-[#C4BDB3]">
                Watch daily nursery updates on TikTok @elitebengalcatter or view current available litters.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/shop/"
                className="px-5 py-2.5 bg-[#8B5A2B] hover:bg-[#A06933] text-white rounded-xl text-xs font-semibold"
              >
                Browse Kittens
              </Link>
              <Link
                href="/contact/"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 rounded-xl text-xs font-semibold"
              >
                Contact Nursery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
