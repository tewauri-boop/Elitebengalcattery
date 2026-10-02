import Link from 'next/link';
import { SITE, CONTACT } from '@/src/config/site.js';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Plane } from 'lucide-react';

export const metadata = {
  title: 'Reservation Request Received | Elite Bengal Cattery',
  description: 'Your kitten reservation request has been placed. Next steps for photos, health documentation, and pet nanny flight scheduling.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouOrderPage() {
  return (
    <main id="main" className="py-20 bg-[#FAF7F2] min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
          Reservation Application Logged
        </span>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18]">
          Thank You! Your Kitten Reservation Request Is In Motion
        </h1>

        <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
          We have received your kitten reservation details. A nursery concierge has placed a temporary hold on your selected kitten and will contact you shortly to share updated photos, health records, and coordinate flight delivery logistics.
        </p>

        {/* Next Steps Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E0D6] shadow-sm text-left space-y-4 max-w-lg mx-auto">
          <h2 className="font-serif text-base font-bold text-[#1E1B18] border-b border-gray-100 pb-2">
            What Happens Next:
          </h2>

          <div className="space-y-3 text-xs text-gray-600">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E6E0D6] flex items-center justify-center font-bold text-gray-800 shrink-0">1</span>
              <span><strong>Photo & Video Confirmation:</strong> We share fresh high-resolution photos, genetic documentation, and nursery updates of your kitten.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E6E0D6] flex items-center justify-center font-bold text-gray-800 shrink-0">2</span>
              <span><strong>Deposit Processing:</strong> Secure your formal adoption with a $500 deposit (enjoy 10% discount on Bitcoin or USDT).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-[#E6E0D6] flex items-center justify-center font-bold text-gray-800 shrink-0">3</span>
              <span><strong>Flight Courier Booking:</strong> Our in-cabin flight nanny reserves travel to your local airport and keeps you updated in real-time.</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I just submitted my kitten reservation request on the site and would like to confirm availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect with Concierge on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/shop/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5A2B] hover:bg-[#A06933] text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <span>View More Kittens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-[#E6E0D6] text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
