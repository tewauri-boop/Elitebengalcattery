'use client';

import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useCart } from './CartContext';
import { SITE, CONTACT, SHOP } from '@/src/config/site.js';
import SmartImage from './SmartImage';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalCount,
    subtotal,
    cryptoDiscountAmount,
    cryptoTotal,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  // WhatsApp checkout message formulation
  const kittenSummary = items.map((i) => `• ${i.name} (Qty: ${i.quantity}, $${i.price.toLocaleString()})`).join('\n');
  const waMessage = `Hello Elite Bengal Cattery! I would like to reserve the following Bengal kitten(s):\n\n${kittenSummary}\n\nEstimated Subtotal: $${subtotal.toLocaleString()} USD\n(Crypto total with 10% discount: $${cryptoTotal.toLocaleString()} USD)\n\nPlease advise on the $500 reservation deposit and delivery schedule. Thank you!`;
  const waUrl = `https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Kitten Reservation Cart"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E6E0D6]">
          {/* Header */}
          <div className="p-5 border-b border-[#E6E0D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">
                Adoption Basket
              </h2>
              {totalCount > 0 && (
                <span className="px-2 py-0.5 bg-[#8B5A2B]/10 text-[#8B5A2B] text-xs font-semibold rounded-full">
                  {totalCount} {totalCount === 1 ? 'Kitten' : 'Kittens'}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close adoption basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery & Health Notice Banner */}
          <div className="bg-[#171513] text-[#FAF7F2] p-3 text-xs flex items-center justify-between gap-2 px-5">
            <span className="flex items-center gap-1.5 font-medium text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              Free In-Cabin Flight Courier Included
            </span>
            <span className="text-[#A69E94]">2-Yr Guarantee</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#EFE9DF] rounded-full flex items-center justify-center mx-auto text-[#8B5A2B]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1E1B18]">
                  Your basket is empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Browse our available purebred Bengal kittens and reserve your new family companion today.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop/"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B5A2B] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#724822] transition-colors"
                  >
                    View Available Kittens
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E6E0D6] shadow-sm relative group"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1E1B18] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.name} from basket`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs font-semibold text-[#8B5A2B] mt-0.5">
                        ${item.price.toLocaleString()} USD
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, -1)}
                          className="p-1 hover:bg-gray-200 text-gray-700 transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, 1)}
                          className="p-1 hover:bg-gray-200 text-gray-700 transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E6E0D6] space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Adoption Total</span>
                  <span className="font-semibold text-gray-900">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-xs text-[#0F6B38] font-medium bg-[#E8F5E9] px-2.5 py-1.5 rounded-md">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    10% Crypto Discount (BTC / USDT)
                  </span>
                  <span>-${cryptoDiscountAmount.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Flight Pet Nanny Delivery</span>
                  <span className="text-[#0F6B38] font-bold">FREE ($0)</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-semibold text-[#1E1B18]">Reservation Deposit</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#8B5A2B]">
                      $500 <span className="text-xs font-normal text-gray-500">deposit/kitten</span>
                    </span>
                    <div className="text-[11px] text-gray-500">
                      Balance due upon pet nanny hand-delivery
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reserve via WhatsApp Concierge</span>
                </a>

                <Link
                  href={`/contact/?reserve=${encodeURIComponent(items.map((i) => i.name).join(', '))}`}
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1E1B18] hover:bg-[#332E29] text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  <span>Submit Online Reservation Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-gray-400 hover:text-red-500 transition-colors underline"
                >
                  Clear basket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
