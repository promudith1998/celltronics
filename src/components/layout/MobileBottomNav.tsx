'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, Heart, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop') || pathname.startsWith('/product');
  const isWishlist = pathname === '/wishlist';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
      setShowSearchModal(false);
    }
  };

  return (
    <>
      {/* Search Overlay Sheet for Mobile */}
      {showSearchModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 30, 61, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '16px'
          }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 12px 32px rgba(11, 30, 61, 0.25)',
              marginTop: '40px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Search CellCentral
              </span>
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--gray-400)', padding: '4px', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search accessories, cases, GaN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--gray-50)',
                  border: '1.5px solid var(--blue)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  color: 'var(--navy)'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(90deg, #0B63F6 0%, #2563EB 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0 18px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Go
              </button>
            </form>

            <div style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray-400)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['iPhone 16 Pro Case', '65W GaN Charger', 'MagSafe Bank', 'Privacy Glass', 'S25 Ultra Case'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/shop?q=${encodeURIComponent(tag)}`}
                    onClick={() => setShowSearchModal(false)}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      background: 'var(--gray-100)',
                      color: 'var(--navy)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      textDecoration: 'none'
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating / Fixed Frosted Bottom Nav Bar */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '62px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(11, 30, 61, 0.08)',
          boxShadow: '0 -4px 20px rgba(11, 30, 61, 0.07)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
        aria-label="Mobile Navigation Bar"
      >
        {/* 1. Home */}
        <Link
          href="/"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isHome ? '#0B63F6' : '#64748B',
            transition: 'transform 0.15s ease'
          }}
        >
          <Home size={20} strokeWidth={isHome ? 2.5 : 1.8} />
          <span style={{ fontSize: '10px', fontWeight: isHome ? 800 : 600, letterSpacing: '0.02em' }}>Home</span>
        </Link>

        {/* 2. Categories / Shop */}
        <Link
          href="/shop"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isShop ? '#0B63F6' : '#64748B',
            transition: 'transform 0.15s ease'
          }}
        >
          <Grid size={20} strokeWidth={isShop ? 2.5 : 1.8} />
          <span style={{ fontSize: '10px', fontWeight: isShop ? 800 : 600, letterSpacing: '0.02em' }}>Shop</span>
        </Link>

        {/* 3. Search */}
        <button
          type="button"
          onClick={() => setShowSearchModal(true)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Search size={20} strokeWidth={1.8} />
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.02em' }}>Search</span>
        </button>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isWishlist ? '#FF2E93' : '#64748B',
            position: 'relative',
            transition: 'transform 0.15s ease'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Heart size={20} strokeWidth={isWishlist ? 2.5 : 1.8} fill={isWishlist ? '#FF2E93' : 'none'} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  background: '#FF2E93',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '100px',
                  lineHeight: 1.2
                }}
              >
                {wishlistCount}
              </span>
            )}
          </div>
          <span style={{ fontSize: '10px', fontWeight: isWishlist ? 800 : 600, letterSpacing: '0.02em' }}>Wishlist</span>
        </Link>

        {/* 5. Cart */}
        <button
          type="button"
          onClick={openDrawer}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            color: itemCount > 0 ? '#0B63F6' : '#64748B',
            cursor: 'pointer',
            position: 'relative',
            padding: 0
          }}
        >
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={20} strokeWidth={itemCount > 0 ? 2.5 : 1.8} />
            {itemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  background: '#FF3D5A',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '100px',
                  lineHeight: 1.2
                }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <span style={{ fontSize: '10px', fontWeight: itemCount > 0 ? 800 : 600, letterSpacing: '0.02em' }}>Cart</span>
        </button>
      </nav>
    </>
  );
};
