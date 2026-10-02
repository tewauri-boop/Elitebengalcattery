'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ChevronDown, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { SITE, CATEGORIES, CONTACT } from '@/src/config/site.js';
import { useCart } from './CartContext';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalCount } = useCart();

  const navLinks = [
    { label: 'Available Kittens', href: '/shop/', hasDropdown: true },
    { label: 'About Cattery', href: '/about/' },
    { label: 'Care & Blog', href: '/blog/' },
    { label: 'Adoption FAQ', href: '/faq/' },
    { label: 'Breeding Rights', href: '/wholesale/' },
    { label: 'Contact', href: '/contact/' },
  ];

  return (
    <>
      {/* Skip link for WCAG 2.2 AA accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-[#121214] focus:font-semibold focus:shadow-lg focus:rounded-sm"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6E0D6] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label={`${SITE.name} Homepage`}
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md ring-2 ring-[#C59B27]/70 group-hover:scale-105 transition-transform flex-shrink-0 bg-[#141210]">
                <Image
                  src={SITE.logo}
                  alt={`${SITE.name} Official Emblem`}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1E1B18] group-hover:text-[#8B5A2B] transition-colors leading-tight">
                  {SITE.name}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8B5A2B] font-semibold">
                  TICA Registered • North Carolina
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setShopDropdownOpen(true)}
                      onMouseLeave={() => setShopDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                          isActive
                            ? 'text-[#8B5A2B] font-semibold bg-[#EFE9DF]'
                            : 'text-[#3E3A36] hover:text-[#8B5A2B] hover:bg-[#F3EDE3]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </Link>

                      {/* Shop Dropdown */}
                      {shopDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 bg-white border border-[#E6E0D6] rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider px-3 py-1.5">
                            Browse by Pattern & Color
                          </div>
                          <div className="divide-y divide-gray-100">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/shop/${cat.slug}/`}
                                className="block p-2.5 rounded-lg hover:bg-[#FAF7F2] transition-colors group"
                              >
                                <div className="text-sm font-semibold text-[#1E1B18] group-hover:text-[#8B5A2B]">
                                  {cat.name}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                  {cat.tagline}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <Link
                              href="/shop/"
                              className="block text-center text-xs font-semibold text-[#8B5A2B] hover:underline py-1"
                            >
                              View All Available Kittens →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#8B5A2B] font-semibold bg-[#EFE9DF]'
                        : 'text-[#3E3A36] hover:text-[#8B5A2B] hover:bg-[#F3EDE3]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons (Search, Concierge WhatsApp, Cart Drawer) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/search/"
                className="p-2.5 text-[#3E3A36] hover:text-[#8B5A2B] hover:bg-[#F0EAE0] rounded-full transition-colors"
                aria-label="Search available kittens and guides"
              >
                <Search className="w-5 h-5" />
              </Link>

              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#128C7E]/10 text-[#075E54] hover:bg-[#128C7E]/20 text-xs font-semibold transition-colors border border-[#128C7E]/20"
                aria-label="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 text-[#3E3A36] hover:text-[#8B5A2B] hover:bg-[#F0EAE0] rounded-full transition-colors cursor-pointer"
                aria-label={`Open reservation cart with ${totalCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#8B5A2B] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#3E3A36] hover:text-[#8B5A2B] rounded-md transition-colors"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E6E0D6] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    pathname === link.href
                      ? 'bg-[#8B5A2B] text-white font-semibold'
                      : 'text-[#1E1B18] hover:bg-[#EFE9DF]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E6E0D6] flex flex-col gap-2">
              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg font-semibold text-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp (+1 720 310 0222)
              </a>
              <Link
                href="/shop/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1E1B18] text-white rounded-lg font-semibold text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Browse All Kittens
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
