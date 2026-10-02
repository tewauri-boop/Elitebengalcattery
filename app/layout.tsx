import type { Metadata } from 'next';
import './globals.css';
import { SITE, BRAND } from '@/src/config/site.js';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ChatHub from '@/components/ChatHub';
import { CartProvider } from '@/components/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} — Purebred Bengal Kittens for Sale`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} offers ethically bred, purebred Bengal kittens in North Carolina with wild rosettes, certified genetic clearances, and nationwide white-glove delivery.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — Purebred Bengal Kittens for Sale`,
    description: `${SITE.name} specializes in champion bloodline Bengal kittens with striking rosettes and certified DNA clearances. Nationwide courier included.`,
    url: `https://${SITE.domain}/`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513360309081-38f0762daed1?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 800,
        alt: 'Elite Bengal Kittens with Vivid Rosettes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Purebred Bengal Kittens`,
    description: `${SITE.name} specializes in champion bloodline Bengal kittens with striking rosettes and certified DNA clearances.`,
    images: ['https://images.unsplash.com/photo-1513360309081-38f0762daed1?auto=format&fit=crop&w=1200&q=80'],
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: SITE.gscVerification || undefined,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/js/webmcp.js" defer></script>
      </head>
      <body className="bg-[#FAF7F2] text-[#1E1B18] min-h-screen flex flex-col antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <CartDrawer />
          <ChatHub />
        </CartProvider>
      </body>
    </html>
  );
}
