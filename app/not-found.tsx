import Link from 'next/link';
import { SITE } from '@/src/config/site.js';
import { ArrowRight, Compass } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Elite Bengal Cattery',
  description: 'The requested page could not be located. Explore our available Bengal kittens.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main" className="py-24 bg-[#FAF7F2] min-h-[70vh] flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-[#EFE9DF] text-[#8B5A2B] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
          404 Error
        </span>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18]">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          The page or kitten profile you are looking for may have moved or been reserved. Discover our currently available purebred Bengal kittens below.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/shop/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5A2B] hover:bg-[#A06933] text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <span>Browse Available Kittens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-[#E6E0D6] text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
