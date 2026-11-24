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
  Check,
  Tag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAdminProducts } from '@/context/AdminProductContext';
import { PRODUCTS, DEVICE_FAMILIES, CATEGORIES, BRANDS, PROMO_CODES } from '@/data/products';
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverOpenedRef = useRef<string | null>(null);

  const handleMenuEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    hoverOpenedRef.current = menuKey;
    setActiveDropdown(menuKey);
  };

  const handleMenuLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      hoverOpenedRef.current = null;
      setActiveDropdown(null);
    }, 180);
  };

  const handleMenuToggle = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (hoverOpenedRef.current === menuKey) {
      hoverOpenedRef.current = null;
      setActiveDropdown(menuKey);
      return;
    }
    hoverOpenedRef.current = null;
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  const closeAllMenus = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    hoverOpenedRef.current = null;
    setActiveDropdown(null);
  };

  // Close menus and drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setIsSearchOpen(false);
    closeAllMenus();
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
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.compatibleDevices?.some((d) => d.toLowerCase().includes(q)) ||
          p.models?.some((m) => m.toLowerCase().includes(q))
      ).slice(0, 5);
      setSearchResults(matched);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Close search and menus on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inDesktopSearch = searchRef.current?.contains(target);
      const inMobileSearch = mobileSearchRef.current?.contains(target);
      if (!inDesktopSearch && !inMobileSearch) {
        setIsSearchOpen(false);
      }
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(target)
      ) {
        closeAllMenus();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      closeAllMenus();
    }
  };

  const navLinks = [
    { name: 'Phone Cases', href: '/shop/phone-cases', icon: Smartphone },
    { name: 'Screen Protectors', href: '/shop/screen-protectors', icon: Layers },
    { name: 'Chargers', href: '/shop/chargers', icon: Zap, hideClass: 'nav-hide-1080' },
    { name: 'Cables', href: '/shop/cables', icon: Cable, hideClass: 'nav-hide-1160' },
    { name: 'Power Banks', href: '/shop/power-banks', icon: BatteryCharging, hideClass: 'nav-hide-1260', alignRight: true },
    { name: 'Audio', href: '/shop/audio', icon: Headphones, hideClass: 'nav-hide-1380', alignRight: true },
    { name: 'Deals', href: '/deals', isDeals: true, icon: Flame, alignRight: true }
  ];

  const categorySubmenus: Record<string, {
    title: string;
    description: string;
    allHref: string;
    allLabel: string;
    subItems: { label: string; href: string; badge?: string }[];
    popularBrands: string[];
    featuredCallout: { title: string; desc: string; icon: any };
  }> = {
    'Phone Cases': {
      title: 'Phone Cases & Covers',
      description: 'Military drop-tested cases with ultra-strong MagSafe magnets.',
      allHref: '/shop/phone-cases',
      allLabel: 'View All Phone Cases',
      subItems: [
        { label: 'MagGo Clear MagSafe Cases', href: '/shop?q=magsafe%20clear', badge: 'POPULAR' },
        { label: 'Camera Guard Kickstand Cases', href: '/shop?q=kickstand', badge: 'TOP RATED' },
        { label: 'Ultra Hybrid Frosted Matte Armor', href: '/shop?q=matte' },
        { label: 'Guardian Slim Drop-Proof Cases', href: '/shop?q=slim', badge: 'SALE' }
      ],
      popularBrands: ['Anker', 'ESR', 'Spigen', 'TORRAS'],
      featuredCallout: {
        title: 'MagSafe Compatible',
        desc: 'Up to 15N magnetic hold calibrated for Apple & Qi2 wireless chargers.',
        icon: Smartphone
      }
    },
    'Screen Protectors': {
      title: 'Screen & Lens Protection',
      description: 'Aerospace 9H+ tempered glass and 28° micro-louver privacy shields.',
      allHref: '/shop/screen-protectors',
      allLabel: 'View All Screen Protectors',
      subItems: [
        { label: 'UltraGlass 9H+ Dual-Ion Glass (2-Pk)', href: '/shop?q=ultraglass', badge: 'BEST SELLER' },
        { label: 'GlasTR EZ FIT 28° Privacy Glass', href: '/shop?q=privacy', badge: '-17%' },
        { label: 'Armorite Shatterproof Glass', href: '/shop?q=armorite', badge: 'NEW' },
        { label: 'UltraGlass 2 Anti-Microbial Shield', href: '/shop?q=antimicrobial' }
      ],
      popularBrands: ['TORRAS', 'Spigen', 'ESR', 'Belkin'],
      featuredCallout: {
        title: 'Zero-Bubble Alignment Tray',
        desc: 'Every protector includes a precision auto-alignment frame for foolproof installation.',
        icon: Layers
      }
    },
    'Chargers': {
      title: 'Fast Chargers & Power Docks',
      description: 'Next-gen GaN III wall chargers, multi-port blocks & 3-in-1 stands.',
      allHref: '/shop/chargers',
      allLabel: 'View All Chargers',
      subItems: [
        { label: 'Nexode 65W GaN III Fast Charger (3-Port)', href: '/shop?q=65w', badge: 'BEST SELLER' },
        { label: 'Prime 100W GaN Wall Charger', href: '/shop?q=100w', badge: '-18%' },
        { label: '140W PD 3.1 Multi-Port Station', href: '/shop?q=140w', badge: 'NEW PD 3.1' },
        { label: 'BoostCharge Pro 3-in-1 MagSafe Dock', href: '/shop?q=3-in-1', badge: 'PREMIUM' }
      ],
      popularBrands: ['UGREEN', 'Anker', 'Baseus', 'Belkin'],
      featuredCallout: {
        title: 'GaNFast III Cool Tech',
        desc: 'Delivers maximum power in a 50% smaller block running 30% cooler.',
        icon: Zap
      }
    },
    'Cables': {
      title: 'Ultra-Durable Charging Cables',
      description: '100W & 240W braided cables engineered to withstand 30,000+ bends.',
      allHref: '/shop/cables',
      allLabel: 'View All Cables',
      subItems: [
        { label: '100W PD Braided USB-C Cable (2m)', href: '/shop?q=100w%20cable', badge: 'BEST SELLER' },
        { label: 'Bio-Braided 240W Silicone USB-C (1.8m)', href: '/shop?q=240w', badge: 'NEW' },
        { label: '90° Right Angle Fast Charge Gaming Cable', href: '/shop?q=90-degree' },
        { label: 'MagSafe 2-in-1 Foldable Travel Cord', href: '/shop?q=2-in-1', badge: '-18%' }
      ],
      popularBrands: ['Baseus', 'Anker', 'UGREEN', 'ESR'],
      featuredCallout: {
        title: 'Reinforced E-Marker Chips',
        desc: 'Dynamic power handshake safeguards your phone and laptop batteries against voltage spikes.',
        icon: Cable
      }
    },
    'Power Banks': {
      title: 'Portable Batteries & MagSafe Packs',
      description: 'High-density lithium battery packs for mobile travel & daily backups.',
      allHref: '/shop/power-banks',
      allLabel: 'View All Power Banks',
      subItems: [
        { label: '10,000mAh MagSafe Bank with Stand', href: '/shop?q=10000mah', badge: 'LIMITED' },
        { label: 'Prime 20,000mAh 200W Smart Display Bank', href: '/shop?q=200w', badge: 'FLAGSHIP' },
        { label: 'Blade 100W Ultra-Thin Laptop Power Bank', href: '/shop?q=blade', badge: '-18%' },
        { label: 'MiniMag 5,000mAh Snap-On Battery', href: '/shop?q=minimag', badge: 'NEW SLIM' }
      ],
      popularBrands: ['ESR', 'Anker', 'Baseus', 'TORRAS'],
      featuredCallout: {
        title: 'Flight Approved Power',
        desc: 'All models strictly adhere to Transport Canada and TSA carry-on airline safety regulations.',
        icon: BatteryCharging
      }
    },
    'Audio': {
      title: 'Headphones & ANC Earbuds',
      description: 'Active Noise Cancelling audio with deep bass and crystal-clear calls.',
      allHref: '/shop/audio',
      allLabel: 'View All Audio',
      subItems: [
        { label: 'ArcField Wireless ANC Earbuds Pro', href: '/shop?q=arcfield', badge: '-25%' },
        { label: 'Soundcore Space Q45 Wireless ANC Headphones', href: '/shop?q=space%20q45', badge: 'BEST SELLER' },
        { label: 'SoundForm Flow True Wireless ANC Earbuds', href: '/shop?q=soundform', badge: '-28%' }
      ],
      popularBrands: ['Spigen', 'Anker Soundcore', 'Belkin'],
      featuredCallout: {
        title: 'Hybrid -38dB Noise Cancellation',
        desc: 'Block city transit rumble or switch seamlessly to ambient awareness mode with a tap.',
        icon: Headphones
      }
    },
    'Deals': {
      title: 'Clearance & Promotional Deals',
      description: 'Exclusive Canadian savings on premium phone accessories.',
      allHref: '/deals',
      allLabel: 'Browse All Deal Products',
      subItems: [
        { label: 'Promo Code: SAVE10 — $10 OFF over $40', href: '/deals', badge: 'CODE' },
        { label: 'Promo Code: WELCOME15 — 15% OFF VIP', href: '/deals', badge: 'CODE' },
        { label: 'Promo Code: FREESHIP — Free Express Shipping', href: '/deals', badge: 'CODE' },
        { label: 'Up to 28% OFF MagSafe Power Banks & Docks', href: '/deals', badge: 'SALE' }
      ],
      popularBrands: ['Anker', 'ESR', 'Belkin', 'Spigen'],
      featuredCallout: {
        title: 'Limited-Time Discounts',
        desc: 'Stack promo codes with automated checkout discounts for maximum savings.',
        icon: Flame
      }
    }
  };

  return (
    <>
      <header className="site">
        {/* Top Signature Brand Gradient Accent */}
        <div className="header-accent-bar" aria-hidden="true" />

        <div className="header-row wrap">
          {/* Left: Mobile Hamburger + Brand Logo */}
          <div className="header-left">
            <button
              type="button"
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="logo">
              <div className="logo-mark-frame">
                <Image
                  src="/images/logo.png"
                  alt="CellCentral Logo"
                  width={120}
                  height={40}
                  className="logo-mark"
                  priority
                />
              </div>
              <div className="logo-text-group">
                <div className="logo-word">
                  <span className="c1">CELL</span>
                  <span className="c2">CENTRAL</span>
                </div>
                <div className="logo-sub">MOBILE ACCESSORIES</div>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Search Bar */}
          <div className="search-bar" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <Search size={16} color="#0B63F6" style={{ flexShrink: 0, opacity: 0.75 }} />
              <input
                type="text"
                placeholder="Search cases, 65W GaN chargers, MagSafe, screen protectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
                aria-label="Search mobile accessories"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
              <button type="submit" className="search-btn" aria-label="Search">
                <Search size={16} color="#fff" />
              </button>
            </form>

            {/* Autocomplete Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(11,30,61,0.2)',
                  border: '1px solid var(--gray-200)',
                  padding: '12px',
                  zIndex: 80
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', padding: '0 8px' }}>
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
                      gap: '12px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gray-50)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 700 }}>{item.brand}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: 'var(--blue)', fontSize: '13px', flexShrink: 0 }}>
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

          {/* Right: Header Action Buttons */}
          <div className="header-actions">
            {/* Mobile Search Button Toggle */}
            <button
              type="button"
              className={`mobile-search-toggle ${isMobileSearchOpen ? 'active' : ''}`}
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Toggle Search"
              aria-expanded={isMobileSearchOpen}
            >
              {isMobileSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Warranty */}
            <Link
              href="/warranty-registration"
              className="h-action h-action-warranty"
              title="Register Product Warranty"
            >
              <FileCheck2 size={18} />
              <span className="action-label">Warranty</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="h-action h-action-wishlist"
              title="My Wishlist"
            >
              <Heart size={18} />
              <span className="action-label">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="h-badge-inline pink">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openDrawer}
              className="h-action h-action-cart"
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span className="action-label">Cart</span>
              <span className="h-badge-inline">{itemCount}</span>
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
                  border: '1.5px solid var(--blue)',
                  borderRadius: '100px',
                  padding: '4px 5px 4px 14px',
                  boxShadow: '0 0 0 3px rgba(11,99,246,0.1)'
                }}
              >
                <input
                  type="text"
                  placeholder="Search cases, chargers, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    padding: '6px 0',
                    outline: 'none',
                    color: 'var(--navy)',
                    minWidth: 0
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)',
                    color: '#fff',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  aria-label="Submit search"
                >
                  <Search size={15} />
                </button>
              </div>
            </form>

            {/* Autocomplete for Mobile Search */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                style={{
                  marginTop: '10px',
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid var(--gray-200)',
                  padding: '8px 10px',
                  boxShadow: '0 10px 26px rgba(11,30,61,0.14)'
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
                      gap: '10px',
                      padding: '8px 6px',
                      borderBottom: '1px solid var(--gray-100)',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '11px', color: 'var(--gray-400)', fontWeight: 700 }}>{item.brand}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: 'var(--blue)', fontSize: '13px', flexShrink: 0 }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Desktop Navigation Bar (Vibrant Deep Navy) */}
        <nav className="mainnav" aria-label="Primary Navigation">
          <div className="navrow wrap">
            <div className="nav-links-track" ref={navContainerRef}>
              {/* SHOP BY CATEGORY BUTTON & MEGA DROPDOWN */}
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => handleMenuEnter('categories')}
                onMouseLeave={handleMenuLeave}
                style={{ position: 'relative', flexShrink: 0 }}
              >
                <button
                  type="button"
                  onClick={() => handleMenuToggle('categories')}
                  className={`navcat ${activeDropdown === 'categories' ? 'open' : ''}`}
                  aria-expanded={activeDropdown === 'categories'}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <Menu size={14} />
                    <span>CATEGORIES</span>
                  </span>
                  <ChevronDown
                    size={13}
                    style={{
                      transform: activeDropdown === 'categories' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {/* Mega Dropdown for All Categories */}
                {activeDropdown === 'categories' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      paddingTop: '10px',
                      zIndex: 100,
                      width: 'min(900px, calc(100vw - 48px))'
                    }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: '0 22px 54px rgba(11,30,61,0.26)',
                        border: '1px solid var(--gray-200)',
                        padding: '24px'
                      }}
                    >
                    {/* Header bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '14px',
                        marginBottom: '18px',
                        borderBottom: '1px solid var(--gray-100)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: '#EFF6FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0B63F6'
                          }}
                        >
                          <Layers size={15} />
                        </div>
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)', letterSpacing: '0.02em' }}>
                            ALL PRODUCT CATEGORIES
                          </span>
                          <span style={{ fontSize: '11.5px', color: 'var(--gray-400)', marginLeft: '8px' }}>
                            Canadian certified phone protection, GaN charging &amp; audio
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/shop"
                        onClick={closeAllMenus}
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--blue)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Browse Full Catalog (26+) <ArrowRight size={13} />
                      </Link>
                    </div>

                    {/* Category Columns */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px'
                      }}
                    >
                      {/* Column 1: Protection */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <Link
                            href="/shop/phone-cases"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Smartphone size={15} color="#8B3FE0" />
                            <span>Phone Cases</span>
                            <span style={{ fontSize: '10px', background: '#F3E8FF', color: '#8B3FE0', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              4+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=magsafe%20clear" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Clear MagSafe Cases
                            </Link>
                            <Link href="/shop?q=kickstand" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Camera Guard Kickstand
                            </Link>
                            <Link href="/shop?q=matte" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Ultra Hybrid Matte Armor
                            </Link>
                            <Link href="/shop?q=slim" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Military Slim Drop-Tested
                            </Link>
                          </div>
                        </div>

                        <div>
                          <Link
                            href="/shop/screen-protectors"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Layers size={15} color="#FF3D9A" />
                            <span>Screen Protectors</span>
                            <span style={{ fontSize: '10px', background: '#FCE7F3', color: '#DB2777', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              4+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=ultraglass" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              9H+ UltraGlass (2-Pack)
                            </Link>
                            <Link href="/shop?q=privacy" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              28° Anti-Spy Privacy Glass
                            </Link>
                            <Link href="/shop?q=armorite" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Armorite Shatterproof
                            </Link>
                            <Link href="/shop?q=antimicrobial" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              UltraGlass 2 Anti-Microbial
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Power & Cables */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <Link
                            href="/shop/chargers"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Zap size={15} color="#16A34A" />
                            <span>Fast Chargers</span>
                            <span style={{ fontSize: '10px', background: '#DCFCE7', color: '#16A34A', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              4+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=65w" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Nexode 65W GaN III (3-Port)
                            </Link>
                            <Link href="/shop?q=100w" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Prime 100W GaN Wall Block
                            </Link>
                            <Link href="/shop?q=140w" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              140W PD 3.1 Workstation
                            </Link>
                            <Link href="/shop?q=3-in-1" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              BoostCharge Pro 3-in-1 Dock
                            </Link>
                          </div>
                        </div>

                        <div>
                          <Link
                            href="/shop/cables"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Cable size={15} color="#0B63F6" />
                            <span>Durable Cables</span>
                            <span style={{ fontSize: '10px', background: '#DBEAFE', color: '#1E40AF', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              4+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=100w%20cable" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              100W PD Braided (2m)
                            </Link>
                            <Link href="/shop?q=240w" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Bio-Braided 240W Silicone
                            </Link>
                            <Link href="/shop?q=90-degree" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              90° Right Angle Gaming
                            </Link>
                            <Link href="/shop?q=2-in-1" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              MagSafe 2-in-1 Travel Cord
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Batteries, Audio & Car */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <Link
                            href="/shop/power-banks"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <BatteryCharging size={15} color="#0B1E3D" />
                            <span>Power Banks</span>
                            <span style={{ fontSize: '10px', background: '#E2E8F0', color: '#0B1E3D', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              4+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=10000mah" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              10,000mAh MagSafe Kickstand
                            </Link>
                            <Link href="/shop?q=200w" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Prime 200W Smart Display
                            </Link>
                            <Link href="/shop?q=blade" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Blade 100W Ultra-Thin Bank
                            </Link>
                          </div>
                        </div>

                        <div>
                          <Link
                            href="/shop/audio"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Headphones size={15} color="#FF7A1A" />
                            <span>Audio &amp; ANC</span>
                            <span style={{ fontSize: '10px', background: '#FFEDD5', color: '#C2410C', padding: '1px 6px', borderRadius: '100px', fontWeight: 800 }}>
                              3+
                            </span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=arcfield" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              ArcField ANC Earbuds Pro
                            </Link>
                            <Link href="/shop?q=space%20q45" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              Soundcore Space Q45 ANC
                            </Link>
                          </div>
                        </div>

                        <div>
                          <Link
                            href="/shop/car-accessories"
                            onClick={closeAllMenus}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 800,
                              fontSize: '13px',
                              color: 'var(--navy)',
                              marginBottom: '8px',
                              textDecoration: 'none'
                            }}
                          >
                            <Car size={15} color="#0D9488" />
                            <span>Car Mounts &amp; Power</span>
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Link href="/shop?q=mount" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              15W Auto-Clamp Mount
                            </Link>
                            <Link href="/shop?q=cryoboost" onClick={closeAllMenus} style={{ fontSize: '12px', color: 'var(--gray-700)', padding: '2px 0' }}>
                              CryoBoost MagSafe Mount
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Column 4: Value Callout Card */}
                      <div
                        style={{
                          background: 'linear-gradient(145deg, #0B1E3D 0%, #132A52 65%, #1A3660 100%)',
                          borderRadius: '12px',
                          padding: '18px',
                          color: '#fff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: 'rgba(255,255,255,0.12)',
                              padding: '3px 8px',
                              borderRadius: '100px',
                              fontSize: '10.5px',
                              fontWeight: 700,
                              marginBottom: '10px'
                            }}
                          >
                            <span>🍁 CANADIAN STANDARD</span>
                          </div>
                          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                            Premium Mobile Accessories
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', color: '#CBD5E1' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Truck size={13} color="#3FA9FF" /> Free Express Shipping over $49
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Shield size={13} color="#FF7A1A" /> 1-Year Comprehensive Warranty
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Check size={13} color="#10B981" /> 100% Genuine Certified Brands
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
                          <Link
                            href="/shop"
                            onClick={closeAllMenus}
                            style={{
                              background: '#0B63F6',
                              color: '#fff',
                              textAlign: 'center',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            View All Products (26+)
                          </Link>
                          <Link
                            href="/deals"
                            onClick={closeAllMenus}
                            style={{
                              background: 'rgba(255,61,90,0.2)',
                              border: '1px solid rgba(255,61,90,0.4)',
                              color: '#FFA1AD',
                              textAlign: 'center',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            Hot Clearance Deals 🔥
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Strip: Popular Brands */}
                    <div
                      style={{
                        marginTop: '20px',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--gray-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                        Shop by Brand:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        {BRANDS.map((brand) => (
                          <Link
                            key={brand}
                            href={`/shop?brand=${encodeURIComponent(brand)}`}
                            onClick={closeAllMenus}
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--navy)',
                              background: 'var(--gray-100)',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              textDecoration: 'none'
                            }}
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

              {/* SHOP BY DEVICE DROPDOWN */}
              <div
                className="nav-item-wrapper"
                onMouseEnter={() => handleMenuEnter('devices')}
                onMouseLeave={handleMenuLeave}
                style={{ position: 'relative', flexShrink: 0 }}
              >
                <button
                  type="button"
                  onClick={() => handleMenuToggle('devices')}
                  className={`nav-device-btn ${activeDropdown === 'devices' ? 'open' : ''}`}
                  aria-expanded={activeDropdown === 'devices'}
                >
                  <Smartphone size={14} color="#3FA9FF" style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap' }}>
                    <span className="nav-long-word">ACCESSORIES </span>
                    <span>BY DEVICE</span>
                  </span>
                  <ChevronDown
                    size={13}
                    style={{
                      transform: activeDropdown === 'devices' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {/* Mega Dropdown for Device Families */}
                {activeDropdown === 'devices' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      paddingTop: '10px',
                      zIndex: 100,
                      width: 'min(740px, calc(100vw - 48px))'
                    }}
                  >
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      boxShadow: '0 20px 50px rgba(11,30,61,0.22)',
                      border: '1px solid var(--gray-200)',
                      padding: '22px 24px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'var(--gray-50)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--gray-700)',
                        border: '1px solid var(--gray-200)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📱</span>
                        <span>Select your phone model to instantly view compatible cases, screen protectors &amp; fast chargers:</span>
                      </span>
                      <Link
                        href="/shop"
                        onClick={closeAllMenus}
                        style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--blue)', whiteSpace: 'nowrap' }}
                      >
                        All Universal &rarr;
                      </Link>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px'
                      }}
                    >
                      {DEVICE_FAMILIES.map((family) => (
                        <div
                          key={family.id}
                          style={{
                            background: 'var(--gray-50)',
                            padding: '14px',
                            borderRadius: '10px',
                            border: '1px solid var(--gray-200)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <Link
                              href={`/shop/device/${family.id}`}
                              onClick={closeAllMenus}
                              style={{
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                                borderBottom: '1.5px solid var(--gray-200)',
                                paddingBottom: '8px'
                              }}
                            >
                              <span style={{ fontWeight: 800, fontSize: '13px', color: family.color }}>
                                {family.name}
                              </span>
                              <ArrowRight size={13} color={family.color} />
                            </Link>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              {family.models.slice(0, 5).map((model) => (
                                <Link
                                  key={model}
                                  href={`/shop?model=${encodeURIComponent(model)}&q=${encodeURIComponent(model)}`}
                                  onClick={closeAllMenus}
                                  style={{
                                    fontSize: '12px',
                                    color: 'var(--navy)',
                                    textDecoration: 'none',
                                    padding: '4px 6px',
                                    borderRadius: '4px',
                                    fontWeight: 500,
                                    transition: 'all 0.1s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.color = family.color;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--navy)';
                                  }}
                                >
                                  <span>{model}</span>
                                  <ChevronRight size={11} style={{ opacity: 0.3 }} />
                                </Link>
                              ))}
                            </div>
                          </div>

                          <Link
                            href={`/shop/device/${family.id}`}
                            onClick={closeAllMenus}
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: 'var(--blue)',
                              marginTop: '10px',
                              paddingTop: '8px',
                              borderTop: '1px solid var(--gray-200)',
                              textDecoration: 'none',
                              display: 'block'
                            }}
                          >
                            View all {family.shortName} accessories &rarr;
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

              {/* Standard Category Navigation Links with Interactive Hover Submenus */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isMenuOpen = activeDropdown === link.name;
                const submenu = categorySubmenus[link.name];

                return (
                  <div
                    key={link.name}
                    className={`nav-item-wrapper ${link.hideClass || ''}`}
                    onMouseEnter={() => handleMenuEnter(link.name)}
                    onMouseLeave={handleMenuLeave}
                    style={{ position: 'relative', flexShrink: 0 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`navlink ${link.isDeals ? 'deals' : ''} ${isActive ? 'active' : ''} ${isMenuOpen ? 'open' : ''}`}
                    >
                      <span>{link.name}</span>
                      {link.isDeals ? (
                        <span className="nav-hot-badge">HOT</span>
                      ) : (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleMenuToggle(link.name);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1px',
                            cursor: 'pointer'
                          }}
                          title={`Browse ${link.name} subcategories`}
                        >
                          <ChevronDown
                            size={12}
                            style={{
                              opacity: 0.72,
                              transform: isMenuOpen ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.18s ease'
                            }}
                          />
                        </span>
                      )}
                    </Link>

                    {/* Flyout Submenu for this Category */}
                    {isMenuOpen && submenu && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: link.alignRight ? 'auto' : '0',
                          right: link.alignRight ? 0 : 'auto',
                          paddingTop: '10px',
                          zIndex: 100,
                          width: 'min(380px, calc(100vw - 48px))'
                        }}
                      >
                      <div
                        style={{
                          background: '#ffffff',
                          borderRadius: '14px',
                          boxShadow: '0 18px 45px rgba(11,30,61,0.20)',
                          border: '1px solid var(--gray-200)',
                          padding: '18px 20px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)' }}>
                            {submenu.title}
                          </span>
                          <Link
                            href={submenu.allHref}
                            onClick={closeAllMenus}
                            style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--blue)' }}
                          >
                            {submenu.allLabel} &rarr;
                          </Link>
                        </div>
                        <p style={{ fontSize: '11.5px', color: 'var(--gray-400)', margin: '0 0 12px', lineHeight: 1.4 }}>
                          {submenu.description}
                        </p>

                        {/* Sub items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
                          {submenu.subItems.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={closeAllMenus}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 8px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '12.5px',
                                fontWeight: 600,
                                color: 'var(--navy)',
                                transition: 'background 0.12s'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gray-50)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <span>{item.label}</span>
                              {item.badge && (
                                <span
                                  style={{
                                    fontSize: '9.5px',
                                    fontWeight: 800,
                                    background: item.badge === 'HOT' || item.badge === 'SALE' || item.badge.startsWith('-') ? 'rgba(255,61,90,0.12)' : 'rgba(11,99,246,0.10)',
                                    color: item.badge === 'HOT' || item.badge === 'SALE' || item.badge.startsWith('-') ? '#FF3D5A' : '#0B63F6',
                                    padding: '2px 6px',
                                    borderRadius: '100px'
                                  }}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        {/* Top Brands Pill Strip */}
                        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                            Top Brands:
                          </span>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            {submenu.popularBrands.map((b) => (
                              <Link
                                key={b}
                                href={`/shop?brand=${encodeURIComponent(b)}`}
                                onClick={closeAllMenus}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  color: 'var(--navy)',
                                  background: 'var(--gray-100)',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  textDecoration: 'none'
                                }}
                              >
                                {b}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

            {/* Prominent Wholesale & Retail Partner Buttons */}
            <div className="nav-b2b-group">
              <Link
                href="/wholesale"
                className={`nav-b2b-btn partner ${pathname === '/wholesale' ? 'active' : ''}`}
              >
                <Briefcase size={13} style={{ flexShrink: 0 }} />
                <span className="nav-cta-full">BECOME A RETAIL PARTNER</span>
                <span className="nav-cta-short">RETAIL PARTNER</span>
              </Link>

              <Link
                href="/retail-partners"
                className={`nav-b2b-btn store ${pathname === '/retail-partners' ? 'active' : ''}`}
              >
                <Store size={13} style={{ flexShrink: 0 }} />
                <span className="nav-cta-full">OWN A CELLCENTRAL STORE</span>
                <span className="nav-cta-short">OWN A STORE</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile / Tablet Vibrant Quick-Category Strip (<= 979px) */}
        <div className="mobile-cat-strip" aria-label="Quick Categories">
          <div className="mobile-cat-scroll">
            <Link
              href="/deals"
              className="mobile-cat-pill deals"
            >
              <Flame size={13} />
              <span>Deals</span>
              <span style={{ background: 'rgba(255,255,255,0.22)', padding: '1px 5px', borderRadius: '100px', fontSize: '9px', fontWeight: 800 }}>HOT</span>
            </Link>

            {navLinks
              .filter((l) => !l.isDeals)
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`mobile-cat-pill ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={13} color={isActive ? '#fff' : '#3FA9FF'} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

            <Link
              href="/warranty-registration"
              className={`mobile-cat-pill ${pathname === '/warranty-registration' ? 'active' : ''}`}
            >
              <FileCheck2 size={13} color="#3FA9FF" />
              <span>Warranty</span>
            </Link>

            <Link href="/wholesale" className="mobile-cat-pill partner">
              <Briefcase size={13} />
              <span>Retail Partner</span>
            </Link>

            <Link href="/retail-partners" className="mobile-cat-pill store">
              <Store size={13} />
              <span>Own a Store</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Backdrop & Drawer (Rendered outside sticky header stacking context) */}
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
            {/* Vibrant Branded Navy Drawer Header */}
            <div style={{ height: '3.5px', background: 'var(--grad-brand)', flexShrink: 0 }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 18px',
                background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                flexShrink: 0
              }}
            >
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '30px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '2px 3px'
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="CellCentral Logo"
                    width={90}
                    height={30}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '49% center' }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <span style={{ color: '#3FA9FF' }}>CELL</span>
                    <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
                  </div>
                  <div style={{ fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', marginTop: '3px' }}>
                    MOBILE ACCESSORIES
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Drawer Search */}
            <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--gray-100)', background: '#fff', flexShrink: 0 }}>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--gray-50)',
                    border: '1.5px solid rgba(11,99,246,0.25)',
                    borderRadius: '100px',
                    padding: '3px 4px 3px 14px'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search cases, chargers, models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      padding: '6px 0',
                      fontSize: '13.5px',
                      outline: 'none',
                      color: 'var(--navy)',
                      minWidth: 0
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    style={{
                      background: 'linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)',
                      border: 'none',
                      color: '#fff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Search size={14} />
                  </button>
                </div>
              </form>
            </div>

            {/* B2B & Wholesale Quick Action Banners */}
            <div style={{ padding: '12px 18px', background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              <Link
                href="/wholesale"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'var(--blue)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 3px 10px rgba(11,99,246,0.28)'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={15} /> Become a Retail Partner
                </span>
                <ChevronRight size={15} />
              </Link>
              <Link
                href="/retail-partners"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'var(--orange)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 3px 10px rgba(255,122,26,0.28)'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Store size={15} /> Own a CellCentral Store
                </span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Scrollable Body: Shop by Device, Categories & Support */}
            <div style={{ padding: '16px 18px', flex: 1, overflowY: 'auto' }}>
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
                ACCESSORIES BY DEVICE
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
                      padding: '11px 12px',
                      borderRadius: '10px',
                      background: 'var(--gray-50)',
                      border: '1px solid var(--gray-100)',
                      textDecoration: 'none',
                      color: 'var(--navy)',
                      fontWeight: 700,
                      fontSize: '13.5px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={16} color={family.color} />
                      <span>{family.name}</span>
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
                        padding: '11px 12px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(11,99,246,0.08)' : 'transparent',
                        color: link.isDeals ? '#FF3D5A' : isActive ? 'var(--blue)' : 'var(--navy)',
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
                            background: 'linear-gradient(90deg, var(--red), var(--pink))',
                            color: '#fff',
                            fontSize: '9.5px',
                            fontWeight: 800,
                            padding: '2px 7px',
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
                    padding: '11px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 700,
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
                    padding: '11px 12px',
                    borderRadius: '10px',
                    color: 'var(--navy)',
                    fontWeight: 700,
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

            {/* Branded Navy Drawer Footer */}
            <div
              style={{
                padding: '14px 18px',
                background: 'var(--navy)',
                borderTop: '2px solid var(--blue)',
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                <Truck size={14} color="#3FA9FF" />
                <span>Free Canadian Shipping over $49</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                <Shield size={14} color="#FF7A1A" />
                <span>1-Year Canadian Warranty on all products</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
