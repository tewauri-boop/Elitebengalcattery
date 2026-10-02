import Link from 'next/link';
import { SITE, CONTACT } from '@/src/config/site.js';
import { CheckCircle2, MessageSquare, ArrowRight, Heart } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Contacting Us | Elite Bengal Cattery',
  description: 'Your inquiry has been received. Our nursery team will reach out to you shortly.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouContactPage() {
  return (
    <main id="main" className="py-20 bg-[#FAF7F2] min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
          Inquiry Successfully Received
        </span>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18]">
          Thank You for Reaching Out to Elite Bengal Cattery
        </h1>

        <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
          We have received your message regarding our Bengal kittens. A dedicated nursery coordinator will review your inquiry and reply via email or phone within 12 to 24 hours.
        </p>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E0D6] shadow-sm max-w-md mx-auto text-left space-y-3">
          <span className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block">
            Need Immediate Assistance?
          </span>
          <p className="text-xs text-gray-500">
            For urgent availability questions or to receive individual kitten photo sets today, connect directly with our WhatsApp concierge:
          </p>
          <a
            href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I just submitted an inquiry on the website and would like to connect.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp ({CONTACT.whatsapp})</span>
          </a>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/shop/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5A2B] hover:bg-[#A06933] text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <span>Return to Available Kittens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-[#E6E0D6] text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
