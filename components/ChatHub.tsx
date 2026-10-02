'use client';

import { useState } from 'react';
import { MessageCircle, X, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react';
import { CONTACT } from '@/src/config/site.js';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Customer Support Concierge" className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-[#E6E0D6] overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#171513] to-[#2C2723] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#8B5A2B] flex items-center justify-center font-bold text-amber-300 font-serif">
                  EB
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="font-semibold text-sm">Adoption Concierge</div>
                <div className="text-[11px] text-amber-300/90 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Support Available
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded-full"
              aria-label="Close concierge hub"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#FAF7F2]">
            <p className="text-xs text-gray-600 leading-relaxed">
              Have questions about available Bengal kittens, flight delivery, or requesting individual photos and health records?
            </p>

            <div className="space-y-2">
              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent('Hello! I am inquiring about available Bengal kittens at Elite Bengal Cattery.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">WhatsApp Concierge</div>
                    <div className="text-[11px] text-gray-500">{CONTACT.whatsapp}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center justify-between p-3 bg-white hover:bg-amber-50 border border-[#E6E0D6] rounded-xl text-gray-800 transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Direct Email</div>
                    <div className="text-[11px] text-gray-500 font-mono truncate max-w-[170px]" dangerouslySetInnerHTML={{ __html: CONTACT.emailEncoded }} />
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://www.tiktok.com/@elitebengalcatter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-800 transition-colors group text-xs"
              >
                <span className="font-semibold text-gray-700">Follow Our Nursery on TikTok</span>
                <span className="text-[11px] text-[#8B5A2B] font-medium">@elitebengalcatter</span>
              </a>
            </div>
          </div>

          <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-400">
            TICA Certified Breeder • North Carolina, USA
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer font-semibold text-xs border border-white/20 group"
        aria-label="Open live concierge chat"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </button>
    </aside>
  );
}
