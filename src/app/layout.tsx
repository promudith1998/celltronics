import type { Metadata } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Toast } from '@/components/layout/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CellCentral — Premium Mobile Accessories & Fast Charging Canada',
  description: 'Canada’s premier destination for high-performance phone cases, GaN fast chargers, MagSafe power banks, screen protectors, and ultra-durable braided cables. Free shipping over $49.',
  keywords: ['mobile accessories', 'phone cases', 'fast chargers', 'magsafe', 'screen protectors', 'canada electronics', 'celtronics', 'cellcentral'],
  authors: [{ name: 'CellCentral' }],
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0B1E3D" />
      </head>
      <body>
        {/* Global SVG Definitions for Brand Gradient */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B63F6" />
              <stop offset="55%" stopColor="#FF2E93" />
              <stop offset="100%" stopColor="#FF7A1A" />
            </linearGradient>
          </defs>
        </svg>

        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <TopBar />
                <Header />
                <main>{children}</main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
                <Toast />
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
