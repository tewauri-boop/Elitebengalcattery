'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SITE, CONTACT, FORMS } from '@/src/config/site.js';
import { MessageSquare, Mail, MapPin, Send, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactClient() {
  const searchParams = useSearchParams();
  const reserveParam = searchParams.get('reserve');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const thankYouUrl = reserveParam ? '/thank-you-order/' : '/thank-you-contact/';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const key = (form.querySelector('[name="access_key"]') as HTMLInputElement)?.value;

    // Key-pending fallback — if key is empty/placeholder/pending, skip to thank-you
    if (!key || key.startsWith('YOUR-') || key === 'pending') {
      window.location.href = thankYouUrl;
      return;
    }

    // Web3Forms CORS method is exact: FormData + Accept header ONLY
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then((r) => r.json().then((d) => ({ status: r.status, data: d })))
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          window.location.href = thankYouUrl;
        } else {
          throw new Error((res.data && res.data.message) || 'Submission failed');
        }
      })
      .catch((err) => {
        setSubmitting(false);
        setErrorMessage(
          'We encountered an issue submitting your form. Please reach out to us via direct WhatsApp concierge at +1 720 310 0222 or email.'
        );
      });
  };

  return (
    <div className="py-12 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Contact Cattery</span>
        </nav>

        {/* Section Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Direct Nursery Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Contact Elite Bengal Cattery
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Reach out to our North Carolina nursery to inquire about available kittens, request individual high-resolution photo sets, or arrange flight delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E6E0D6] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">
                Nursery Channels
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block uppercase font-semibold">WhatsApp Concierge</span>
                    <a
                      href={`https://wa.me/${CONTACT.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1E1B18] hover:text-[#25D366] transition-colors"
                    >
                      {CONTACT.whatsapp}
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Available 7 days/week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8B5A2B]/10 text-[#8B5A2B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block uppercase font-semibold">Direct Email</span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-bold text-[#1E1B18] hover:text-[#8B5A2B] transition-colors font-mono text-xs"
                      dangerouslySetInnerHTML={{ __html: CONTACT.emailEncoded }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block uppercase font-semibold">Headquarters</span>
                    <span className="font-bold text-[#1E1B18] block">{CONTACT.hq}</span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Visits scheduled by private appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TikTok & Nursery Updates */}
            <div className="bg-[#141210] text-white p-6 rounded-3xl border border-[#292420] space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>TikTok Nursery Updates</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Follow our kittens playing in our nursery on TikTok <a href="https://www.tiktok.com/@elitebengalcatter" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-bold hover:underline">@elitebengalcatter</a>. You can also message us for individual HD photo sets and health documents.
              </p>
              <a
                href="https://www.tiktok.com/@elitebengalcatter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#141210] font-bold text-xs rounded-xl transition-colors"
              >
                <span>Visit TikTok Profile</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Contact & Reservation Form (Web3Forms CORS method) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-12 border border-[#E6E0D6] shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
                {reserveParam ? `Kitten Reservation Application (${reserveParam})` : 'Send an Adoption Message'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill in your details below and our team will get back to you promptly with availability and next steps.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Web3Forms Hidden Fields */}
              <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
              <input
                type="hidden"
                name="subject"
                value={reserveParam ? `Kitten Reservation Request: ${reserveParam}` : 'New Adoption Contact — Elite Bengal Cattery'}
              />
              <input type="hidden" name="from_name" value={SITE.name} />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_name" className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="name"
                    required
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_phone" className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="user_phone"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label htmlFor="user_city" className="block text-xs font-semibold text-gray-700 mb-1">
                    City & State (for Pet Nanny Flight Delivery)
                  </label>
                  <input
                    type="text"
                    id="user_city"
                    name="location"
                    placeholder="e.g. Atlanta, GA or Charlotte, NC"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="user_interest" className="block text-xs font-semibold text-gray-700 mb-1">
                  Kitten or Preferred Color Pattern
                </label>
                <input
                  type="text"
                  id="user_interest"
                  name="interested_in"
                  defaultValue={reserveParam || ''}
                  placeholder="e.g. Simba, Brown Rosetted, or Snow Lynx"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>

              <div>
                <label htmlFor="user_message" className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Message or Household Pet Experience *
                </label>
                <textarea
                  id="user_message"
                  name="message"
                  rows={4}
                  required
                  defaultValue={
                    reserveParam
                      ? `I would like to place a deposit to reserve ${reserveParam}. Please provide payment options (Zelle, Cash App, PayPal, or 10% Crypto discount) and delivery timing.`
                      : ''
                  }
                  placeholder="Tell us about your home, questions about veterinary records, or timeline..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#8B5A2B] hover:bg-[#A06933] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
