'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Flame,
  Shield,
  Truck,
  Phone,
  Layers,
  Zap,
  Cable,
  Smartphone,
  Headphones,
  BatteryCharging,
  Car
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAdminProducts } from '@/context/AdminProductContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { products: adminProducts } = useAdminProducts();
  const ALL_PRODUCTS = adminProducts.length > 0 ? adminProducts : PRODUCTS;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Filter search results
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = ALL_PRODUCTS.filter(
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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
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
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Phone Cases', href: '/shop/phone-cases', icon: Smartphone },
    { name: 'Screen Protectors', href: '/shop/screen-protectors', icon: Layers },
    { name: 'Chargers', href: '/shop/chargers', icon: Zap },
    { name: 'Cables', href: '/shop/cables', icon: Cable },
    { name: 'Power Banks', href: '/shop/power-banks', icon: BatteryCharging },
    { name: 'Audio', href: '/shop/audio', icon: Headphones },
    { name: 'More Accessories', href: '/shop/car-accessories', icon: Car },
    { name: 'Deals', href: '/deals', isDeals: true, icon: Flame }
  ];

  return (
    <header className="site">
      <div className="header-row wrap">
        {/* Mobile Menu Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo matching Home Page (1).png */}
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
          <Image
            src="/images/logo.png"
            alt="CellCentral Logo"
            width={140}
            height={38}
            className="logo-mark"
            priority
          />
          <div>
            <div className="logo-word" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#0B63F6' }}>CELL</span>
              <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
            </div>
            <div className="logo-sub" style={{ fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.14em', color: '#0B1E3D' }}>
              MOBILE ACCESSORIES
            </div>
          </div>
        </Link>

        {/* Desktop Search Bar matching Home Page (1).png */}
        <div className="search-bar" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search for products, brands or devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <Search size={15} color="#fff" />
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
                border: '1px solid var(--gray-200)',
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

        {/* Header Action Buttons (Mobile Search Toggle, Account, Wishlist, Cart) */}
        <div className="header-actions">
          {/* Mobile Search Button Toggle */}
          <button
            className="mobile-search-toggle"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={20} />
          </button>

          {/* Admin Portal Shortcut */}
          <Link
            href="/admin"
            className="h-action"
            title="Admin Dashboard"
            style={{ color: '#0B63F6' }}
          >
            <Shield size={18} color="#0B63F6" />
            <span className="action-label" style={{ color: '#0B63F6', fontWeight: 800 }}>Admin</span>
          </Link>

          {/* Account */}
          <Link
            href="/shop"
            className="h-action"
            title="My Account"
          >
            <User size={19} />
            <span className="action-label">Account</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="h-action"
            title="My Wishlist"
          >
            <Heart size={19} />
            <span className="action-label">Wishlist</span>
            {wishlistCount > 0 && <span className="cart-count" style={{ background: 'var(--pink)' }}>{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <button
            onClick={openDrawer}
            className="h-action"
            aria-label="View Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingBag size={19} />
            <span className="action-label">Cart</span>
            <span className="cart-count" style={{ background: '#FF3D5A' }}>{itemCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="mobile-search-bar active" ref={mobileSearchRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: 'var(--gray-50)',
                border: '1.5px solid var(--blue-light)',
                borderRadius: '100px',
                padding: '4px 6px 4px 14px'
              }}
            >
              <input
                type="text"
                placeholder="Search products, brands, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13.5px',
                  padding: '6px 0',
                  outline: 'none',
                  color: 'var(--navy)'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--navy)',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Search size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gray-400)',
                padding: '6px',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </form>

          {/* Autocomplete for Mobile Search */}
          {isSearchOpen && searchResults.length > 0 && (
            <div
              style={{
                marginTop: '10px',
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid var(--gray-200)',
                padding: '10px',
                boxShadow: '0 8px 24px rgba(11,30,61,0.12)'
              }}
            >
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  onClick={() => {
                    setIsMobileSearchOpen(false);
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 6px',
                    borderBottom: '1px solid var(--gray-100)',
                    textDecoration: 'none'
                  }}
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
            </div>
          )}
        </div>
      )}

      {/* Main Desktop Navigation Bar matching Home Page (1).png */}
      <nav className="mainnav" style={{ borderTop: '1px solid var(--gray-200)', background: '#fff' }}>
        <div className="navrow wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* SHOP BY CATEGORY BUTTON */}
          <Link
            href="/shop"
            className="navcat"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              background: '#0B1E3D',
              color: '#fff',
              padding: '11px 18px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginRight: '8px'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Menu size={15} />
              <span>SHOP BY CATEGORY</span>
            </span>
            <ChevronRight size={14} />
          </Link>

          {/* Navigation Links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`navlink ${link.isDeals ? 'deals' : ''} ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: link.isDeals ? '#FF3D5A' : '#0B1E3D',
                  padding: '12px 14px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Navigation Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="mobile-menu-drawer">
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderBottom: '1px solid var(--gray-100)',
                background: '#fff'
              }}
            >
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Image
                  src="/images/logo.png"
                  alt="CellCentral Logo"
                  width={120}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <span style={{ color: '#0B63F6' }}>CELL</span>
                    <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'var(--gray-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={18} color="var(--navy)" />
              </button>
            </div>

            {/* Quick Drawer Search */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', background: 'var(--gray-50)' }}>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#fff',
                    border: '1.5px solid var(--gray-200)',
                    borderRadius: '100px',
                    padding: '8px 36px 8px 14px',
                    fontSize: '13px',
                    outline: 'none',
                    color: 'var(--navy)'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--gray-400)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Categories Section */}
            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--gray-400)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                CATEGORIES
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        background: isActive ? 'var(--gray-100)' : 'transparent',
                        color: link.isDeals ? '#FF3D5A' : 'var(--navy)',
                        fontWeight: 700,
                        fontSize: '14.5px',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon size={18} color={link.isDeals ? '#FF3D5A' : '#0B63F6'} />
                        <span>{link.name}</span>
                      </span>
                      {link.isDeals ? (
                        <span
                          style={{
                            background: '#FF3D5A',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '100px',
                            textTransform: 'uppercase'
                          }}
                        >
                          HOT
                        </span>
                      ) : (
                        <ChevronRight size={15} color="var(--gray-300)" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Quick Store Links */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--gray-400)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '24px',
                  marginBottom: '12px'
                }}
              >
                EXPLORE &amp; ACCOUNT
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  <span>All Accessories</span>
                  <ChevronRight size={15} color="var(--gray-300)" />
                </Link>

                <Link
                  href="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  <span>Top Brands (Anker, Spigen, ESR)</span>
                  <ChevronRight size={15} color="var(--gray-300)" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={16} color="var(--pink)" />
                    <span>My Wishlist</span>
                  </span>
                  {wishlistCount > 0 && (
                    <span style={{ background: 'var(--pink)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px' }}>
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openDrawer();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingBag size={16} color="var(--blue)" />
                    <span>Shopping Cart</span>
                  </span>
                  {itemCount > 0 && (
                    <span style={{ background: 'var(--red)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px' }}>
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer (Canadian Support info) */}
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid var(--gray-100)',
                background: 'var(--gray-50)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--navy)' }}>
                <Truck size={14} color="#0B63F6" />
                <span>Free Canadian Shipping over $49</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--navy)' }}>
                <Shield size={14} color="#FF7A1A" />
                <span>1-Year Warranty on All Orders</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
