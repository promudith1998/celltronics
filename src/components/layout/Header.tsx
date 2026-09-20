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
  ChevronDown,
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
  Car,
  Briefcase,
  Store,
  FileCheck2,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAdminProducts } from '@/context/AdminProductContext';
import { PRODUCTS, DEVICE_FAMILIES } from '@/data/products';
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
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const deviceMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setIsSearchOpen(false);
    setIsDeviceMenuOpen(false);
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
      if (deviceMenuRef.current && !deviceMenuRef.current.contains(event.target as Node)) {
        setIsDeviceMenuOpen(false);
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
          <div className="logo-text-group">
            <div className="logo-word" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#0B63F6' }}>CELL</span>
              <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
            </div>
            <div className="logo-sub" style={{ fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.14em', color: '#0B1E3D' }}>
              MOBILE ACCESSORIES
            </div>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="search-bar" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search for products, brands or devices (e.g. iPhone 16, 65W GaN)..."
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

        {/* Header Action Buttons (Account, Wishlist, Cart) */}
        <div className="header-actions">
          {/* Mobile Search Button Toggle */}
          <button
            className="mobile-search-toggle"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle Search"
          >
            <Search size={20} />
          </button>

          {/* Account / Warranty */}
          <Link
            href="/warranty-registration"
            className="h-action h-action-warranty"
            title="Register Product Warranty"
          >
            <FileCheck2 size={19} color="#0B63F6" />
            <span className="action-label" style={{ fontWeight: 700 }}>Warranty</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="h-action h-action-wishlist"
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

      {/* Main Desktop Navigation Bar */}
      <nav className="mainnav" style={{ borderTop: '1px solid var(--gray-200)', background: '#fff' }}>
        <div className="navrow wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* SHOP BY CATEGORY BUTTON */}
            <Link
              href="/shop"
              className="navcat"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                background: '#0B1E3D',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '12.5px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Menu size={14} />
                <span>CATEGORIES</span>
              </span>
              <ChevronRight size={13} />
            </Link>

            {/* SHOP BY DEVICE DROPDOWN */}
            <div style={{ position: 'relative' }} ref={deviceMenuRef}>
              <button
                type="button"
                onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
                onMouseEnter={() => setIsDeviceMenuOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isDeviceMenuOpen ? 'var(--blue-light)' : 'transparent',
                  color: isDeviceMenuOpen ? 'var(--blue)' : '#0B1E3D',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Smartphone size={15} color="#0B63F6" />
                <span>SHOP BY DEVICE</span>
                <ChevronDown size={14} style={{ transform: isDeviceMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Mega Dropdown for Device Families */}
              {isDeviceMenuOpen && (
                <div
                  onMouseLeave={() => setIsDeviceMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '680px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 16px 40px rgba(11,30,61,0.18)',
                    border: '1px solid var(--gray-200)',
                    padding: '20px',
                    zIndex: 100,
                    marginTop: '4px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px'
                  }}
                >
                  {DEVICE_FAMILIES.map((family) => (
                    <div key={family.id} style={{ background: 'var(--gray-50)', padding: '14px', borderRadius: '10px' }}>
                      <Link
                        href={`/shop/device/${family.id}`}
                        onClick={() => setIsDeviceMenuOpen(false)}
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                          borderBottom: '1px solid var(--gray-200)',
                          paddingBottom: '8px'
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: '13.5px', color: family.color }}>
                          {family.name}
                        </span>
                        <ArrowRight size={14} color={family.color} />
                      </Link>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {family.models.slice(0, 5).map((model) => (
                          <Link
                            key={model}
                            href={`/shop?q=${encodeURIComponent(model)}`}
                            onClick={() => setIsDeviceMenuOpen(false)}
                            style={{
                              fontSize: '12px',
                              color: 'var(--navy)',
                              textDecoration: 'none',
                              padding: '3px 0',
                              fontWeight: 500
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = family.color)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--navy)')}
                          >
                            {model}
                          </Link>
                        ))}
                        <Link
                          href={`/shop/device/${family.id}`}
                          onClick={() => setIsDeviceMenuOpen(false)}
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: 'var(--blue)',
                            marginTop: '6px',
                            textDecoration: 'none'
                          }}
                        >
                          View all {family.shortName} &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Category Navigation Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`navlink ${link.isDeals ? 'deals' : ''} ${isActive ? 'active' : ''}`}
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: link.isDeals ? '#FF3D5A' : '#0B1E3D',
                    padding: '10px 10px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Prominent Wholesale & Retail Partner Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/wholesale"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: pathname === '/wholesale' ? '#0B63F6' : '#EFF6FF',
                color: pathname === '/wholesale' ? '#fff' : '#0B63F6',
                border: '1.5px solid #BFDBFE',
                padding: '7px 14px',
                borderRadius: '100px',
                fontSize: '12.5px',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Briefcase size={14} />
              <span>WHOLESALE / B2B</span>
            </Link>

            <Link
              href="/retail-partners"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: pathname === '/retail-partners' ? '#FF7A1A' : '#FFF7ED',
                color: pathname === '/retail-partners' ? '#fff' : '#C2410C',
                border: '1.5px solid #FED7AA',
                padding: '7px 14px',
                borderRadius: '100px',
                fontSize: '12.5px',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Store size={14} />
              <span>RETAIL PARTNERS</span>
            </Link>
          </div>
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

            {/* B2B & Wholesale Quick Action Banners */}
            <div style={{ padding: '14px 20px', background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link
                href="/wholesale"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: '#0B63F6',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Briefcase size={14} /> Wholesale
              </Link>
              <Link
                href="/retail-partners"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: '#FF7A1A',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Store size={14} /> Retail Partners
              </Link>
            </div>

            {/* Quick Drawer Search */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)' }}>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--gray-50)',
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

            {/* Shop by Device Section */}
            <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--gray-400)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                SHOP BY DEVICE
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', marginBottom: '20px' }}>
                {DEVICE_FAMILIES.map((family) => (
                  <Link
                    key={family.id}
                    href={`/shop/device/${family.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'var(--gray-50)',
                      textDecoration: 'none',
                      color: 'var(--navy)',
                      fontWeight: 700,
                      fontSize: '13.5px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={16} color={family.color} />
                      <span>{family.name} Accessories</span>
                    </span>
                    <ChevronRight size={14} color="var(--gray-400)" />
                  </Link>
                ))}
              </div>

              {/* Categories Section */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--gray-400)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                PRODUCT CATEGORIES
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
                        padding: '10px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        background: isActive ? 'var(--gray-100)' : 'transparent',
                        color: link.isDeals ? '#FF3D5A' : 'var(--navy)',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={16} color={link.isDeals ? '#FF3D5A' : '#0B63F6'} />
                        <span>{link.name}</span>
                      </span>
                      {link.isDeals ? (
                        <span
                          style={{
                            background: '#FF3D5A',
                            color: '#fff',
                            fontSize: '9.5px',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '100px',
                            textTransform: 'uppercase'
                          }}
                        >
                          HOT
                        </span>
                      ) : (
                        <ChevronRight size={14} color="var(--gray-300)" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Customer Care & Warranty */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--gray-400)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '20px',
                  marginBottom: '10px'
                }}
              >
                SERVICES &amp; SUPPORT
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Link
                  href="/warranty-registration"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCheck2 size={16} color="#0B63F6" />
                    <span>Product / Warranty Registration</span>
                  </span>
                  <ChevronRight size={14} color="var(--gray-300)" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={16} color="var(--pink)" />
                    <span>My Wishlist</span>
                  </span>
                  {wishlistCount > 0 && (
                    <span style={{ background: 'var(--pink)', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '100px' }}>
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
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
                <span>1-Year Canadian Warranty on all products</span>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
