'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search results
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 5);
      setSearchResults(matched);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Phone Cases', href: '/shop/phone-cases' },
    { name: 'Screen Protectors', href: '/shop/screen-protectors' },
    { name: 'Chargers', href: '/shop/chargers' },
    { name: 'Cables', href: '/shop/cables' },
    { name: 'Power Banks', href: '/shop/power-banks' },
    { name: 'Audio', href: '/shop/audio' },
    { name: 'Car Accessories', href: '/shop/car-accessories' },
    { name: 'Deals', href: '/deals', isDeals: true }
  ];

  return (
    <header className="site">
      <div className="header-row wrap" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{ display: 'none', background: 'none', padding: 0 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="CellCentral Logo"
            width={160}
            height={40}
            className="logo-mark"
            priority
          />
          <div>
            <div className="logo-word">
              <span className="c1">Cell</span>
              <span className="c2">Central</span>
            </div>
            <div className="logo-sub">MOBILE ACCESSORIES</div>
          </div>
        </Link>

        {/* Live Search Bar */}
        <div className="search-bar" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search for products, brands or devices…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <Search size={16} />
            </button>
          </form>

          {/* Autocomplete Search Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(11,30,61,0.18)',
                border: '1px solid var(--gray-100)',
                padding: '12px',
                zIndex: 50
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>
                Suggested Products
              </div>
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gray-50)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 600 }}>{item.brand}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>{item.name}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: 'var(--blue)', fontSize: '13px' }}>
                    ${item.price.toFixed(2)}
                  </div>
                </Link>
              ))}
              <div style={{ borderTop: '1px solid var(--gray-100)', marginTop: '8px', paddingTop: '8px', textAlign: 'center' }}>
                <Link
                  href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                  onClick={() => setIsSearchOpen(false)}
                  style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  View all results for &quot;{searchQuery}&quot; <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Header Action Buttons */}
        <div className="header-actions">
          <Link href="/wishlist" className="h-action">
            <Heart size={21} />
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="cart-count" style={{ background: 'var(--pink)' }}>{wishlistCount}</span>}
          </Link>
          <button onClick={openDrawer} className="h-action" aria-label="View Shopping Cart">
            <ShoppingBag size={21} />
            <span>Cart</span>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="mainnav">
        <div className="navrow wrap" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Link href="/shop" className="navcat">
            <Menu size={15} />
            Shop All
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`navlink ${link.isDeals ? 'deals' : ''} ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            background: '#fff',
            zIndex: 90,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--navy)' }}>Categories</div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: link.isDeals ? 'var(--red)' : 'var(--navy-2)',
                padding: '8px 0',
                borderBottom: '1px solid var(--gray-100)'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/brands"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: '16px', fontWeight: 600, color: 'var(--navy)', padding: '8px 0' }}
          >
            All Brands
          </Link>
        </div>
      )}
    </header>
  );
};
