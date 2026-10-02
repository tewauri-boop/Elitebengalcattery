'use client';

import { useState } from 'react';
import SmartImage from '@/components/SmartImage';
import { useCart } from '@/components/CartContext';
import { CONTACT } from '@/src/config/site.js';
import { ShoppingBag, MessageSquare, Check, ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  description: string;
  badge?: string;
  images: string[];
  colorPattern: string;
  gender: string;
  dob?: string;
  parents?: { sire: string; dam: string };
  genetics?: { pkDef: string; praB: string; hcmStatus: string };
}

export default function ProductClient({ kitten }: { kitten: Product }) {
  const [selectedImage, setSelectedImage] = useState<string>(kitten.images[0]);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const cryptoPrice = Math.round(kitten.price * 0.9);
  const depositAmount = 500;

  const handleAddToCart = () => {
    addItem({
      slug: kitten.slug,
      name: kitten.name,
      price: kitten.price,
      category: kitten.category,
      image: kitten.images[0],
      badge: kitten.badge,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const waMessage = `Hello Elite Bengal Cattery! I am interested in reserving ${kitten.name} (${kitten.colorPattern}, $${kitten.price.toLocaleString()} USD). Please confirm availability and guide me through the reservation deposit.`;
  const waUrl = `https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Photo Gallery with 4:3 ratio */}
      <div className="space-y-4">
        <div className="product-frame rounded-2xl overflow-hidden border border-[#E6E0D6] shadow-lg relative bg-gray-50">
          <SmartImage
            src={selectedImage}
            alt={`${kitten.name} Bengal Kitten`}
            fill
            priority
            className="object-cover"
          />
          {kitten.badge && (
            <span className="absolute top-4 left-4 bg-[#171513]/90 backdrop-blur-md text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {kitten.badge}
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {kitten.images.length > 1 && (
          <div className="flex gap-3">
            {kitten.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`product-frame w-24 rounded-lg overflow-hidden border-2 transition-all relative ${
                  selectedImage === img
                    ? 'border-[#8B5A2B] ring-2 ring-[#8B5A2B]/20'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1} of ${kitten.name}`}
              >
                <SmartImage
                  src={img}
                  alt={`${kitten.name} photo thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* TikTok & Photo Updates Banner */}
        <div className="p-4 bg-white rounded-xl border border-[#E6E0D6] text-xs text-gray-600 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#8B5A2B] rounded-full" />
            <span className="font-semibold text-gray-900">TikTok Playroom Videos & Photos</span>
          </div>
          <a
            href="https://www.tiktok.com/@elitebengalcatter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B5A2B] font-bold hover:underline"
          >
            Watch on TikTok @elitebengalcatter →
          </a>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8B5A2B] font-semibold mb-1">
            <span>{kitten.gender}</span>
            <span>•</span>
            <span>{kitten.colorPattern}</span>
          </div>

          {/* EXACTLY ONE H1 IS IN THE SERVER COMPONENT */}
          <div className="text-3xl font-serif font-bold text-[#1E1B18]">
            ${kitten.price.toLocaleString()} <span className="text-sm font-sans font-normal text-gray-500">USD</span>
          </div>

          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Crypto Price: ${cryptoPrice.toLocaleString()} USD (Save 10% with BTC or USDT)</span>
          </div>
        </div>

        {/* Reservation Terms */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E0D6] space-y-3 shadow-sm">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Reservation Deposit:</span>
            <span className="font-bold text-[#8B5A2B]">${depositAmount} USD</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Delivery:</span>
            <span className="font-bold text-emerald-700">FREE In-Cabin Flight Pet Nanny</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Balance Payment:</span>
            <span className="text-xs text-gray-600">Due upon hand-delivery</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-base shadow-lg transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Reserve via WhatsApp Concierge</span>
          </a>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1E1B18] hover:bg-[#332E29] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Basket</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={openCart}
              className="px-4 py-3 bg-white hover:bg-gray-50 border border-[#E6E0D6] text-gray-800 rounded-xl text-sm font-semibold transition-colors"
            >
              View Basket
            </button>
          </div>
        </div>

        {/* Certified Attributes & Pedigree */}
        <div className="border-t border-[#E6E0D6] pt-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#1E1B18]">
            Lineage & Health Clearances
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
              <span className="text-gray-500 block">Registration</span>
              <span className="font-bold text-gray-900 mt-0.5 block">TICA Litter Registered</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
              <span className="text-gray-500 block">Health Warranty</span>
              <span className="font-bold text-gray-900 mt-0.5 block">2-Year Congenital Guarantee</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
              <span className="text-gray-500 block">PK-Def Genetic Test</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">N/N Normal (Clear)</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
              <span className="text-gray-500 block">PRA-b Vision Test</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">N/N Normal (Clear)</span>
            </div>

            {kitten.parents && (
              <>
                <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
                  <span className="text-gray-500 block">Sire (Father)</span>
                  <span className="font-semibold text-gray-900 mt-0.5 block">{kitten.parents.sire}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E6E0D6]">
                  <span className="text-gray-500 block">Dam (Mother)</span>
                  <span className="font-semibold text-gray-900 mt-0.5 block">{kitten.parents.dam}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#8B5A2B] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-[#1E1B18] block mb-0.5">Ethical Nursery Guarantee</span>
            All kittens are raised in our home with social enrichment, microchipped, dewormed, and inspected by a licensed veterinarian prior to hand-off.
          </div>
        </div>
      </div>
    </div>
  );
}
