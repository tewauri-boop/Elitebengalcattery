'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE, CONTACT, FORMS } from '@/src/config/site.js';
import JsonLd from '@/components/JsonLd';
import { Award, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Send } from 'lucide-react';

export default function WholesaleBreedingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const breadcrumbSchema = {
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
        name: 'Breeding Rights',
        item: `https://${SITE.domain}/wholesale/`,
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const thankYouUrl = '/thank-you-wholesale/';

    // Web3Forms CORS compliant submission (FormData + Accept only)
    const key = (form.querySelector('[name="access_key"]') as HTMLInputElement)?.value;
    if (!key || key.startsWith('YOUR-') || key === 'pending') {
      window.location.href = thankYouUrl;
      return;
    }

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
        setErrorMsg('There was an issue sending your application. Please message our WhatsApp concierge directly.');
      });
  };

  return (
    <main id="main" className="py-12 bg-[#FAF7F2]">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#8B5A2B]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Breeding & Show Rights</span>
        </nav>

        {/* Section Header: EXACTLY ONE H1 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B5A2B]">
            Pedigree Preservation & Genetic Foundation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1B18] tracking-tight">
            TICA Bengal Breeding & Show Rights
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            We occasionally place top-conformation breeding kittens with vetted, ethical TICA and CFA registered catteries seeking to strengthen rosetting, contrast, and cardiac health in their foundation programs.
          </p>
        </div>

        {/* Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm space-y-3">
            <Award className="w-8 h-8 text-[#8B5A2B]" />
            <h2 className="font-serif text-lg font-bold text-[#1E1B18]">TICA / CFA Registered Only</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              We exclusively place breeding rights with registered, code-of-ethics breeders. Hobby breeders must provide proof of cattery registration and veterinarian references.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#8B5A2B]" />
            <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Full Genetic Portfolio</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Breeding rights include certified lab reports for PK-Def (N/N), PRA-b (N/N), parental echocardiograms, 5-generation pedigree certificate, and microchip transfer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E0D6] shadow-sm space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#8B5A2B]" />
            <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Mentorship & Pairing Advice</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              We provide direct breeder-to-breeder consultation regarding color genetics (Agouti, Charcoal, Snow alleles) to help you achieve your planned conformation goals.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E6E0D6] shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#1E1B18]">
              Breeder Inquiry Application
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Please provide complete cattery details. All inquiries receive responses within 24 business hours.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms required hidden inputs */}
            <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
            <input type="hidden" name="subject" value="New Breeding Rights Inquiry — Elite Bengal Cattery" />
            <input type="hidden" name="from_name" value={SITE.name} />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="breeder_name" className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="breeder_name"
                  name="name"
                  required
                  placeholder="e.g. Katherine Reynolds"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>

              <div>
                <label htmlFor="cattery_name" className="block text-xs font-semibold text-gray-700 mb-1">
                  Registered Cattery Name & Association *
                </label>
                <input
                  type="text"
                  id="cattery_name"
                  name="cattery_name"
                  required
                  placeholder="e.g. RoyalSpots Bengals (TICA #108422)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="breeder@cattery.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="desired_program" className="block text-xs font-semibold text-gray-700 mb-1">
                Desired Pattern & Bloodline Focus
              </label>
              <select
                id="desired_program"
                name="desired_program"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
              >
                <option value="brown-rosetted">Brown Rosetted (Heavy Acromelanic Contrast)</option>
                <option value="snow-lynx">Snow Bengal (Lynx Point / Mink / Sepia)</option>
                <option value="silver-charcoal">Silver & Charcoal (Clear Silver Background)</option>
                <option value="stud-foundation">Foundation Stud Prospect</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
                Breeding Program Experience & Housing Setup *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us about your breeding goals, cattery setup, and veterinarian reference..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#8B5A2B] bg-[#FAF7F2]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 bg-[#8B5A2B] hover:bg-[#A06933] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Breeding Rights Application'}</span>
              </button>

              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I am a registered TICA breeder inquiring about breeding rights.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct WhatsApp Breeder Line</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
