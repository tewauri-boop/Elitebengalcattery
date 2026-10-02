'use client';

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { SITE } from '@/src/config/site.js';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  cryptoDiscountAmount: number;
  cryptoTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const emptySubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SITE.cartKey || 'mm-cart');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(SITE.cartKey || 'mm-cart', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existingIndex = items.findIndex((i) => i.slug === item.slug);
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += 1;
      saveItems(updated);
    } else {
      saveItems([...items, { ...item, quantity: 1 }]);
    }
    setIsOpen(true);
  };

  const removeItem = (slug: string) => {
    saveItems(items.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.slug === slug) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const activeItems = isClient ? items : [];
  const totalCount = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cryptoDiscountAmount = Math.round(subtotal * 0.1);
  const cryptoTotal = subtotal - cryptoDiscountAmount;

  return (
    <CartContext.Provider
      value={{
        items: activeItems,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        cryptoDiscountAmount,
        cryptoTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
