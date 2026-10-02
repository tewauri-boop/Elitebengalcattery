import Link from 'next/link';
import { SITE, FAQ, CONTACT } from '@/src/config/site.js';
import JsonLd from '@/components/JsonLd';
import { MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Adoption FAQ & Health Warranty | Elite Bengal Cattery',
  description: 'Answers to frequently asked questions regarding Bengal kitten adoptions, in-cabin flight delivery, 2-year genetic health warranty, and care requirements.',
  openGraph: {
    title: 'Adoption FAQ & Health Warranty | Elite Bengal Cattery',
    description: 'Answers to frequently asked questions regarding Bengal kitten adoptions, in-cabin flight delivery, 2-year genetic health warranty, and care requirements.',
    url: `https://${SITE.domain}/faq/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function FAQPage() {
  const faqSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
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
          name: 'FAQ',
          item: `https://${SITE.domain}/faq/`,
        },
      ],
    },
  ];

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={faqSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Adoption FAQ</span>
        </nav>

        {/* Page Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Clear & Transparent Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Everything you need to know about reserving an Elite Bengal kitten, health testing, flight courier delivery, and our 2-year congenital guarantee.
          </p>
        </div>

        {/* Questions List (40-60 words answers) */}
        <div className="space-y-6">
          {FAQ.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E0D6] shadow-sm hover:border-[#8B5A2B]/40 transition-colors space-y-3"
            >
              <h2 className="font-serif text-lg font-bold text-[#1E1B18] flex items-start gap-3">
                <span className="text-sm font-sans font-bold text-[#8B5A2B] bg-[#FAF7F2] border border-[#E6E0D6] px-2.5 py-0.5 rounded-md shrink-0 mt-0.5">
                  Q{index + 1}
                </span>
                <span>{item.question}</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed pl-10">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Live Support Help Box */}
        <div className="bg-[#141210] text-white p-8 rounded-3xl border border-[#292420] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">
              Still have questions about our kittens?
            </h3>
            <p className="text-xs text-[#A69E94]">
              Our concierge team is available on WhatsApp or email to discuss pedigrees, flight nanny delivery, or send individual HD photos.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I have a question regarding adopting a Bengal kitten from Elite Bengal Cattery.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact/"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 font-semibold rounded-xl text-xs"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
