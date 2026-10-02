'use client';

import { useState } from 'react';
import Link from 'next/link';
import SmartImage from '@/components/SmartImage';
import { useCart } from '@/components/CartContext';
import { CONTACT } from '@/src/config/site.js';
import { Sparkles, MessageSquare, ShoppingBag, Filter, Check } from 'lucide-react';

interface Category {
  slug: string;
  name: string;
  tagline: string;
}

interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  shortDescription: string;
  badge?: string;
  images: string[];
  colorPattern: string;
  gender: string;
}

export default function ShopClient({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const filtered = products
    .filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (p: Product) => {
    addItem({
      slug: p.slug,
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.images[0],
      badge: p.badge,
    });
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: EXACTLY ONE H1 */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            TICA Registered Litters
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] mt-2 mb-3">
            Available Purebred Bengal Kittens
          </h1>
          <p className="text-sm text-gray-600">
            Each kitten comes with complete veterinary records, microchip, 2-year genetic warranty, and nationwide white-glove flight courier delivery.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-[#E6E0D6] shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#8B5A2B] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#FAF7F2]'
              }`}
            >
              All Kittens ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === c.slug
                    ? 'bg-[#8B5A2B] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-[#FAF7F2]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              aria-label="Sort kittens by price or featured"
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E6E0D6] rounded-lg px-2.5 py-1.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#8B5A2B]"
            >
              <option value="featured">Featured Bloodlines</option>
              <option value="price-low">Adoption Price: Low to High</option>
              <option value="price-high">Adoption Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Kittens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((kitten) => (
            <div
              key={kitten.slug}
              className="bg-white rounded-2xl border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
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

                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(kitten)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        addedSlug === kitten.slug
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1E1B18] hover:bg-[#332E29] text-white'
                      }`}
                    >
                      {addedSlug === kitten.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Basket</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(`Hello! I want to inquire about reserving ${kitten.name} ($${kitten.price.toLocaleString()} USD).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg transition-colors shadow-sm"
                      aria-label={`Reserve ${kitten.name} on WhatsApp`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-center">
                    <Link
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="text-[11px] font-semibold text-gray-500 hover:text-[#8B5A2B] transition-colors"
                    >
                      View Full Kitten Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
