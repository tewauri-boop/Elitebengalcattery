'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: '✈️ Complimentary In-Cabin Pet Nanny Flight Delivery Nationwide Included',
    href: '/faq/',
  },
  {
    icon: Sparkles,
    text: '💎 Save 10% Instantly When Reserving with Bitcoin or USDT Cryptocurrency',
    href: '/shop/',
  },
  {
    icon: ShieldCheck,
    text: '🛡️ 100% TICA Registered & 2-Year Congenital Genetic Health Guarantee',
    href: '/about/',
  },
  {
    icon: Sparkles,
    text: '🎬 Watch Our Kittens on TikTok: @elitebengalcatter — Daily Playroom Updates!',
    href: 'https://www.tiktok.com/@elitebengalcatter',
    external: true,
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[index];
  const Icon = current.icon;

  return (
    <div className="bg-[#171513] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#2C2723] overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {current.external ? (
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors truncate text-center"
          >
            <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate tracking-wide">{current.text}</span>
          </a>
        ) : (
          <Link
            href={current.href}
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors truncate text-center"
          >
            <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate tracking-wide">{current.text}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
