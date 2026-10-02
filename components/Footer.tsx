import Link from 'next/link';
import Image from 'next/image';
import { SITE, CONTACT, BRAND, CATEGORIES, SHOP } from '@/src/config/site.js';
import { ShieldCheck, MessageCircle, Heart, Award, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141210] text-[#E6E0D6] border-t border-[#292420] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Value Promise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#292420]">
          {/* Column 1 & 2: Brand Authority Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-[#C59B27]/40 flex-shrink-0 bg-[#141210]">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.name} Official Emblem`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2]">
                {SITE.name}
              </span>
            </div>

            <p className="text-sm text-[#A69E94] leading-relaxed max-w-sm">
              {BRAND.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292420] text-[#D4AF37] border border-[#3E3730]">
                <Award className="w-3.5 h-3.5" />
                TICA Registered
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292420] text-[#D4AF37] border border-[#3E3730]">
                <ShieldCheck className="w-3.5 h-3.5" />
                PK-Def & PRA-b Clear
              </span>
            </div>

            {/* Entity Encoded Email */}
            <div className="pt-3 text-sm space-y-1.5 text-[#C4BDB3]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A8175] block">Adoption Inquiries:</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[#D4AF37] transition-colors font-mono text-xs"
                  dangerouslySetInnerHTML={{ __html: CONTACT.emailEncoded }}
                />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A8175] block">WhatsApp Concierge:</span>
                <a
                  href={`https://wa.me/${CONTACT.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors text-xs flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{CONTACT.whatsapp}</span>
                </a>
              </div>
              <div className="text-xs text-[#8A8175]">
                {CONTACT.hq}
              </div>
            </div>
          </div>

          {/* Column 3: Kitten Categories */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF7F2] mb-4">
              Available Kittens
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A69E94]">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}/`}
                    className="hover:text-[#D4AF37] transition-colors block"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/shop/"
                  className="text-[#D4AF37] hover:underline flex items-center gap-1 text-xs font-semibold"
                >
                  All Available Kittens <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Adoption Info */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF7F2] mb-4">
              Adoption & Care
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A69E94]">
              <li>
                <Link href="/about/" className="hover:text-[#D4AF37] transition-colors">
                  About Our Cattery
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#D4AF37] transition-colors">
                  Adopter Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="hover:text-[#D4AF37] transition-colors">
                  Adoption FAQ & Warranty
                </Link>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@elitebengalcatter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <span>TikTok Nursery Videos</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-[#D4AF37] transition-colors">
                  Bengal Care & Genetics
                </Link>
              </li>
              <li>
                <Link href="/wholesale/" className="hover:text-[#D4AF37] transition-colors">
                  Breeding & Show Rights
                </Link>
              </li>
              <li>
                <Link href="/search/" className="hover:text-[#D4AF37] transition-colors">
                  Search Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Payment & Courier */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#FAF7F2] mb-4">
              Accepted Methods
            </h3>
            <p className="text-xs text-[#8A8175] mb-3 leading-relaxed">
              Safe reservation with 10% instant discount on Bitcoin or USDT.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-[#C4BDB3]">
              {SHOP.paymentMethods.map((pm) => (
                <span key={pm} className="px-2 py-0.5 bg-[#201D1A] rounded border border-[#2D2824]">
                  {pm}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#1C1916] rounded-lg border border-[#2C2723] text-xs text-[#A69E94]">
              <span className="font-semibold text-[#D4AF37] block mb-0.5">✈️ In-Cabin Flight Delivery</span>
              Complimentary hand-delivery across the continental US.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A8175]">
          <div className="flex items-center gap-1">
            <span>© {currentYear} {SITE.name}. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#A69E94]">TICA Certified Ethical Breeder</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/faq/" className="hover:text-[#D4AF37] transition-colors">
              Health Guarantee
            </Link>
            <Link href="/contact/" className="hover:text-[#D4AF37] transition-colors">
              Contact
            </Link>
            <a
              href="https://www.tiktok.com/@elitebengalcatter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              TikTok: @elitebengalcatter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
