'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, POSTS, CATEGORIES } from '@/src/config/site.js';
import SmartImage from '@/components/SmartImage';
import { Search as SearchIcon, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [prevInitial, setPrevInitial] = useState(initialQuery);

  if (initialQuery !== prevInitial) {
    setPrevInitial(initialQuery);
    setQuery(initialQuery);
  }

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = PRODUCTS.filter((p) => {
    if (!cleanQuery) return true;
    return (
      p.name.toLowerCase().includes(cleanQuery) ||
      p.colorPattern.toLowerCase().includes(cleanQuery) ||
      p.shortDescription.toLowerCase().includes(cleanQuery) ||
      p.category.toLowerCase().includes(cleanQuery)
    );
  });

  const matchingPosts = POSTS.filter((post) => {
    if (!cleanQuery) return true;
    return (
      post.title.toLowerCase().includes(cleanQuery) ||
      post.excerpt.toLowerCase().includes(cleanQuery) ||
      post.category.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Search</span>
        </nav>

        {/* Search Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Find Your Kitten
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Search Kittens & Care Guides
          </h1>
          <p className="text-sm text-gray-600">
            Search our current litters by name, coat pattern (Brown Rosetted, Snow, Silver), or read our genetics and care articles.
          </p>

          {/* Search Input Field */}
          <div className="relative max-w-xl mx-auto mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by kitten name, coat pattern, color, or topic..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E6E0D6] rounded-2xl text-sm focus:outline-none focus:border-[#8B5A2B] shadow-sm text-gray-900"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Matching Kittens Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D6] pb-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1B18]">
              Available Kittens ({matchingProducts.length})
            </h2>
            {query && (
              <span className="text-xs text-gray-500">
                Matches for &quot;{query}&quot;
              </span>
            )}
          </div>

          {matchingProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E6E0D6] p-6 space-y-3">
              <p className="text-sm text-gray-500">No available kittens matched your search query.</p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs font-bold text-[#8B5A2B] hover:underline"
              >
                Clear search to view all kittens
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingProducts.map((kitten) => (
                <div
                  key={kitten.slug}
                  className="bg-white rounded-2xl border border-[#E6E0D6] shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group"
                >
                  <div className="product-frame relative bg-gray-100">
                    <SmartImage
                      src={kitten.images[0]}
                      alt={kitten.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-3 right-3 bg-white/95 text-xs font-bold px-2 py-1 rounded shadow-sm">
                      ${kitten.price.toLocaleString()} USD
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#8B5A2B] font-semibold block">
                        {kitten.colorPattern}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#1E1B18] group-hover:text-[#8B5A2B] transition-colors mt-0.5">
                        <Link href={`/shop/${kitten.category}/${kitten.slug}/`}>
                          {kitten.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {kitten.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                      <Link
                        href={`/shop/${kitten.category}/${kitten.slug}/`}
                        className="text-xs font-bold text-[#8B5A2B] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Matching Blog Articles */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D6] pb-3">
            <h2 className="font-serif text-xl font-bold text-[#1E1B18]">
              Care & Genetics Guides ({matchingPosts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-2xl border border-[#E6E0D6] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8B5A2B] font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1E1B18] mt-1 hover:text-[#8B5A2B]">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-xs font-bold text-[#8B5A2B] hover:underline flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
