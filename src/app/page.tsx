'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  Award,
  ShieldCheck,
  Mail,
  Flame,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { subscribeNewsletterInDb } from '@/lib/supabaseService';
import { PRODUCTS } from '@/data/products';
import { useAdminProducts } from '@/context/AdminProductContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const { showToast } = useToast();
  const { products: adminProducts } = useAdminProducts();
  const ALL_PRODUCTS = adminProducts.length > 0 ? adminProducts : PRODUCTS;
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Curated Best Sellers across diverse categories (Charger, Glass, Power Bank, Audio, Case, Cable, Mount, Dock)
  const bestSellerPreferredIds = [
    'ugreen-65w-gan-fast-charger',
    'torras-ultraglass-screen-protector',
    'esr-10000mah-magsafe-power-bank',
    'anker-soundcore-space-q45-headphones',
    'esr-halolock-kickstand-case',
    'baseus-usb-c-braided-cable-2m',
    'samsung-wireless-car-mount-charger-15w',
    'belkin-boostcharge-pro-3in1-magsafe'
  ];

  const bestSellers = bestSellerPreferredIds
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Fallback if admin deleted any preferred ID
  if (bestSellers.length < 4) {
    const existingIds = new Set(bestSellers.map((p) => p.id));
    ALL_PRODUCTS.filter((p) => !existingIds.has(p.id) && (p.badge === 'best' || p.rating >= 4.7))
      .slice(0, 8 - bestSellers.length)
      .forEach((p) => bestSellers.push(p));
  }

  const bestSellerIds = new Set(bestSellers.map((p) => p.id));

  // Latest Device Accessories: strictly excludes any product shown in Best Sellers (zero duplication)
  const latestDeviceAccessories = ALL_PRODUCTS.filter(
    (p) =>
      !bestSellerIds.has(p.id) &&
      p.compatibleDevices.some(
        (d) =>
          d.includes('iPhone 17') ||
          d.includes('iPhone 16') ||
          d.includes('Galaxy S26') ||
          d.includes('Galaxy S25') ||
          d.includes('Pixel 10') ||
          d.includes('Pixel 9')
      )
  ).slice(0, 8);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      subscribeNewsletterInDb(newsletterEmail.trim()).catch(() => {});
      showToast('Welcome to the VIP Club! 🎉', 'You have been subscribed. Check your inbox for your 15% discount code!', 'success');
      setNewsletterEmail('');
    } else {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* ======================================================== */}
      {/* 1. HERO BANNER (Responsive: 2048x790 for Desktop, 1080x1350 for Mobile) */}
      {/* ======================================================== */}
      <section style={{ padding: 0, background: '#061128', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <picture style={{ display: 'block', width: '100%' }}>
            <source media="(max-width: 768px)" srcSet="/images/CellCentral_Mobile_Homepage_Banner_1080x1350.png" />
            <img
              src="/images/CellCentral_Final_Home_Banner_2048x790.png"
              alt="CellCentral - Power. Protect. Connect."
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </picture>

          {/* Interactive hotspot over the desktop banner SHOP NOW button */}
          <Link
            href="/shop"
            style={{
              position: 'absolute',
              left: '5.2%',
              top: '73%',
              width: '16%',
              height: '9%',
              borderRadius: '100px',
              zIndex: 10,
              cursor: 'pointer'
            }}
            title="Shop Now"
            aria-label="Shop Now"
          />

          {/* 4 dots centered at bottom of banner matching Home Page (1).png */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 10
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. YOUR CENTRAL SOURCE FOR MOBILE ACCESSORIES           */}
      {/* ======================================================== */}
      <section style={{ paddingTop: '42px', paddingBottom: '20px' }}>
        <div className="wrap">
          {/* Centered Heading with blue and pink accent lines */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              marginBottom: '32px',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '64px', height: '3.5px', borderRadius: '3px', background: '#0B63F6', flexShrink: 0 }} />
            <h2
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(16px, 2.2vw, 23px)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0B1E3D',
                margin: 0
              }}
            >
              YOUR <span style={{ color: '#FF7A1A' }}>CENTRAL</span> SOURCE FOR MOBILE ACCESSORIES
            </h2>
            <div style={{ width: '64px', height: '3.5px', borderRadius: '3px', background: '#FF2E93', flexShrink: 0 }} />
          </div>

          {/* 7 Circle Category Icons with dividers */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              borderTop: '1px solid #F3F4F6',
              paddingTop: '16px'
            }}
          >
            {[
              {
                name: 'CHARGERS',
                color: '#22C55E',
                href: '/shop?cat=chargers',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <path d="M12 2v6M9 2v4M15 2v4M8 8h8a2 2 0 0 1 2 2v3a6 6 0 0 1-12 0v-3a2 2 0 0 1 2-2zM12 19v3" />
                  </svg>
                )
              },
              {
                name: 'CABLES',
                color: '#2563EB',
                href: '/shop?cat=cables',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <rect x="5" y="4" width="4" height="7" rx="1.5" />
                    <rect x="15" y="4" width="4" height="7" rx="1.5" />
                    <path d="M7 11v4a5 5 0 0 0 10 0v-4M12 20v2" />
                  </svg>
                )
              },
              {
                name: 'CASES',
                color: '#8B5CF6',
                href: '/shop?cat=cases',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <rect x="6" y="2" width="12" height="20" rx="3.5" fill="none" />
                    <rect x="8.5" y="4.5" width="7" height="15" rx="2" fill="#8B5CF6" />
                  </svg>
                )
              },
              {
                name: 'SCREEN PROTECTORS',
                color: '#EC4899',
                href: '/shop?cat=screen-protectors',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
                    <circle cx="12" cy="18" r="1" fill="#EC4899" />
                  </svg>
                )
              },
              {
                name: 'AUDIO',
                color: '#F97316',
                href: '/shop?cat=audio',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <circle cx="8" cy="9" r="3" fill="#F97316" />
                    <circle cx="16" cy="9" r="3" fill="#F97316" />
                    <path d="M8 12v9M16 12v9" />
                  </svg>
                )
              },
              {
                name: 'WIRELESS',
                color: '#06B6D4',
                href: '/shop?cat=wireless',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <circle cx="12" cy="12" r="2.5" fill="#06B6D4" />
                    <path d="M7.8 7.8a6 6 0 0 1 8.4 0M4.9 4.9a10 10 0 0 1 14.2 0M10.2 16.2a6 6 0 0 0-3.6-2M13.8 16.2a6 6 0 0 1 3.6-2" />
                  </svg>
                )
              },
              {
                name: 'POWER BANKS',
                color: '#1E3A8A',
                href: '/shop?cat=power-banks',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                    <rect x="7" y="3" width="10" height="18" rx="2" />
                    <circle cx="12" cy="17" r="1" fill="#1E3A8A" />
                    <path d="M10 7h4" />
                  </svg>
                )
              }
            ].map((cat, idx, arr) => (
              <Link
                key={cat.name}
                href={cat.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 26px',
                  textDecoration: 'none',
                  position: 'relative',
                  borderRight: idx < arr.length - 1 ? '1px solid #E5E7EB' : 'none'
                }}
              >
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    border: `2.2px solid ${cat.color}`,
                    boxShadow: '0 4px 12px rgba(11,30,61,0.05)',
                    transition: 'transform 0.18s, box-shadow 0.18s'
                  }}
                >
                  {cat.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#0B1E3D',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}
                >
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. POPULAR CATEGORIES GRID (6 Cards with Photos)        */}
      {/* ======================================================== */}
      <section style={{ paddingTop: '16px', paddingBottom: '32px' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px'
            }}
          >
            {[
              { title: 'PHONE CASES', img: '/images/device-iphone.jpg', href: '/shop?cat=cases' },
              { title: 'SCREEN PROTECTORS', img: '/images/products/screen-protector-tray.jpg', href: '/shop?cat=screen-protectors' },
              { title: 'CHARGERS', img: '/images/products/charger-gan-65w.jpg', href: '/shop?cat=chargers' },
              { title: 'CABLES', img: '/images/products/cable-braided-100w.jpg', href: '/shop?cat=cables' },
              { title: 'POWER BANKS', img: '/images/products/powerbank-magsafe.jpg', href: '/shop?cat=power-banks' },
              { title: 'CAR ACCESSORIES', img: '/images/products/car-mount-magsafe.jpg', href: '/shop?cat=car-accessories' }
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  border: '1px solid #EEF1F6',
                  borderRadius: '16px',
                  padding: '20px 14px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.18s, box-shadow 0.18s'
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: '#F4F6F9',
                    marginBottom: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <b
                  style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0B1E3D',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    marginBottom: '4px'
                  }}
                >
                  {item.title}
                </b>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#0B63F6',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Shop now →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. VALUE PROPOSITION / TRUST BAND                       */}
      {/* ======================================================== */}
      <section style={{ padding: '8px 0 32px 0' }}>
        <div className="wrap">
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '26px',
              padding: '30px 36px',
              border: '1px solid #EEF2F6'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px'
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(11,99,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={22} color="#0B63F6" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0B1E3D', margin: '0 0 3px 0' }}>
                    QUALITY YOU CAN TRUST
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, lineHeight: 1.4 }}>Carefully selected premium accessories.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(11,99,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={22} color="#0B63F6" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0B1E3D', margin: '0 0 3px 0' }}>
                    WARRANTY COVERAGE
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, lineHeight: 1.4 }}>1-year warranty on all eligible products.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(11,99,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RotateCcw size={22} color="#0B63F6" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0B1E3D', margin: '0 0 3px 0' }}>
                    EASY RETURNS
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, lineHeight: 1.4 }}>30-day hassle-free returns.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(11,99,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Headphones size={22} color="#0B63F6" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#0B1E3D', margin: '0 0 3px 0' }}>
                    CUSTOMER SUPPORT
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, lineHeight: 1.4 }}>Local support when you need it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FEATURED COLLECTIONS (4 Cards)                       */}
      {/* ======================================================== */}
      <section style={{ padding: '8px 0 32px 0' }}>
        <div className="wrap">
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '22px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em', margin: 0, textTransform: 'uppercase' }}>
              FEATURED COLLECTIONS
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px'
            }}
          >
            {/* Card 1: New Arrivals */}
            <div
              style={{
                background: '#EBF1F9',
                borderRadius: '16px',
                padding: '24px 20px',
                minHeight: '190px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '16px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  NEW ARRIVALS
                </h4>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: '5px 0 0', maxWidth: '160px', lineHeight: 1.4 }}>
                  The latest accessories for the newest devices.
                </p>
              </div>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '120px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src="/images/device-iphone.jpg" alt="New Arrivals" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <Link
                href="/shop?sort=new"
                style={{
                  background: '#0B63F6',
                  color: '#fff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  marginTop: '16px',
                  textDecoration: 'none'
                }}
              >
                SHOP NOW
              </Link>
            </div>

            {/* Card 2: MagSafe Collection */}
            <div
              style={{
                background: '#F3EDFB',
                borderRadius: '16px',
                padding: '24px 20px',
                minHeight: '190px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '16px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  MAGSAFE COLLECTION
                </h4>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: '5px 0 0', maxWidth: '160px', lineHeight: 1.4 }}>
                  Snap on. Power up. Stay connected.
                </p>
              </div>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '120px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src="/images/products/case-clear-magsafe.jpg" alt="MagSafe Collection" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <Link
                href="/shop?q=magsafe"
                style={{
                  background: '#7C3AED',
                  color: '#fff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  marginTop: '16px',
                  textDecoration: 'none'
                }}
              >
                SHOP NOW
              </Link>
            </div>

            {/* Card 3: Fast Charging Essentials */}
            <div
              style={{
                background: '#EBF1F9',
                borderRadius: '16px',
                padding: '24px 20px',
                minHeight: '190px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '16px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  FAST CHARGING ESSENTIALS
                </h4>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: '5px 0 0', maxWidth: '160px', lineHeight: 1.4 }}>
                  Charge smarter. Save time.
                </p>
              </div>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '120px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src="/images/products/charger-gan-65w.jpg" alt="Fast Charging Essentials" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <Link
                href="/shop?cat=chargers"
                style={{
                  background: '#0B63F6',
                  color: '#fff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  marginTop: '16px',
                  textDecoration: 'none'
                }}
              >
                SHOP NOW
              </Link>
            </div>

            {/* Card 4: Clearance Deals */}
            <div
              style={{
                background: '#FDEEE7',
                borderRadius: '16px',
                padding: '24px 20px',
                minHeight: '190px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '16px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  CLEARANCE DEALS
                </h4>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: '5px 0 0', maxWidth: '160px', lineHeight: 1.4 }}>
                  Top products. Unbeatable prices.
                </p>
              </div>
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', width: '90px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <svg viewBox="0 0 100 120" style={{ width: '85px', height: '105px', filter: 'drop-shadow(0 10px 14px rgba(220,38,38,0.28))' }}>
                  <g transform="rotate(12 50 60)">
                    <path d="M22 15 L68 15 C74 15 78 19 78 25 L78 95 C78 101 74 105 68 105 L22 105 C16 105 12 101 12 95 L12 25 C12 19 16 15 22 15 Z" fill="#EF4444" />
                    <circle cx="45" cy="28" r="4.5" fill="#FFFFFF" />
                    <text x="45" y="76" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="36" fontWeight="900" fill="#FFFFFF">%</text>
                  </g>
                </svg>
              </div>
              <Link
                href="/deals"
                style={{
                  background: '#FF5722',
                  color: '#fff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  marginTop: '16px',
                  textDecoration: 'none'
                }}
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5B. BEST SELLERS PRODUCT GRID                            */}
      {/* ======================================================== */}
      <section style={{ padding: '36px 0 40px', background: '#F8FAFC', borderTop: '1px solid #EEF2F6', borderBottom: '1px solid #EEF2F6' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FF3D5A', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Flame size={14} color="#FF3D5A" /> TOP RATED BY CANADIANS
              </span>
              <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '22px', fontWeight: 800, color: '#0B1E3D', margin: '4px 0 0', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                BEST SELLERS
              </h2>
            </div>
            <Link href="/shop" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View All Best Sellers <ArrowRight size={14} />
            </Link>
          </div>

          <div className="product-grid">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5C. LATEST DEVICE ACCESSORIES (Zero Duplication)         */}
      {/* ======================================================== */}
      <section style={{ padding: '40px 0 36px', background: '#FFFFFF' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={14} color="#0B63F6" /> NEW FLAGSHIP GEAR
              </span>
              <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '22px', fontWeight: 800, color: '#0B1E3D', margin: '4px 0 0', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                LATEST DEVICE ACCESSORIES
              </h2>
            </div>
            <Link href="/shop?sort=new" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Explore Flagship Collection <ArrowRight size={14} />
            </Link>
          </div>

          <div className="product-grid">
            {latestDeviceAccessories.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TOP BRANDS WE CARRY                                  */}
      {/* ======================================================== */}
      <section style={{ padding: '8px 0 28px 0' }}>
        <div className="wrap">
          <div style={{ marginBottom: '14px' }}>
            <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '20px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em', margin: 0, textTransform: 'uppercase' }}>
              TOP BRANDS WE CARRY
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              padding: '24px 0'
            }}
          >
            <span style={{ color: '#00A6E0', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '23px', letterSpacing: '0.04em' }}>ANKER</span>
            <span style={{ color: '#00B578', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '23px', letterSpacing: '0.04em' }}>UGREEN</span>
            <span style={{ color: '#1F2937', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '23px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1F2937', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900 }}>B</span>
              BASEUS
            </span>
            <span style={{ color: '#00A3A6', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '25px', letterSpacing: '0.06em' }}>ESR</span>
            <span style={{ color: '#1F2937', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '22px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#FF7A1A', fontWeight: 900, fontSize: '17px' }}>❖</span>spigen
            </span>
            <span style={{ color: '#FF5E00', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '22px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#FF5E00', fontSize: '15px' }}>▼</span>TORRAS
            </span>
            <span style={{ color: '#0C2340', fontFamily: 'var(--font-space), sans-serif', fontWeight: 900, fontSize: '23px', letterSpacing: '0.08em' }}>SAMSUNG</span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <Link
              href="/brands"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0B63F6',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              VIEW ALL BRANDS →
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. STAY IN THE LOOP (Newsletter)                        */}
      {/* ======================================================== */}
      <section style={{ padding: '16px 0 48px 0' }}>
        <div className="wrap">
          <div
            style={{
              background: 'linear-gradient(90deg, #0B63F6 0%, #FF2E93 60%, #FF7A1A 100%)',
              borderRadius: '24px',
              padding: '30px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              color: '#fff',
              boxShadow: '0 8px 30px rgba(255,46,147,0.22)'
            }}
          >
            {/* Left: Icon & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Mail size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '19px', fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                  STAY IN THE LOOP
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.95, margin: '3px 0 0 0', color: '#fff' }}>
                  Get exclusive deals, new arrivals and special offers.
                </p>
              </div>
            </div>

            {/* Center: Email Form */}
            <form onSubmit={handleNewsletterSubmit} style={{ flex: '1 1 320px', maxWidth: '440px' }}>
              <div
                style={{
                  display: 'flex',
                  background: '#FFFFFF',
                  borderRadius: '100px',
                  padding: '3.5px 4px 3.5px 18px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    color: '#0B1E3D',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(90deg, #5925DC 0%, #FF5722 100%)',
                    color: '#fff',
                    fontFamily: 'var(--font-space), sans-serif',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    letterSpacing: '0.04em',
                    padding: '9px 22px',
                    borderRadius: '100px',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>

            {/* Right: Follow Us */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>
                FOLLOW US
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a href="#" aria-label="Facebook" style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok" style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
