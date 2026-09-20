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
  ChevronRight,
  Mail,
  Zap,
  Smartphone,
  Layers,
  Sparkles,
  Flame,
  Store,
  Briefcase,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { subscribeNewsletterInDb } from '@/lib/supabaseService';
import { PRODUCTS, DEVICE_FAMILIES } from '@/data/products';
import { useAdminProducts } from '@/context/AdminProductContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const { showToast } = useToast();
  const { products: adminProducts } = useAdminProducts();
  const ALL_PRODUCTS = adminProducts.length > 0 ? adminProducts : PRODUCTS;

  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Best Sellers (Highest reviews & best seller tags)
  const bestSellers = ALL_PRODUCTS.filter((p) => p.badge === 'best' || p.rating >= 4.8).slice(0, 8);

  // Latest Device Accessories (Targeting iPhone 16, S25/S24, Pixel 9)
  const latestDeviceAccessories = ALL_PRODUCTS.filter((p) =>
    p.compatibleDevices.some((d) => d.includes('iPhone 17') || d.includes('iPhone 16') || d.includes('Galaxy S26') || d.includes('Galaxy S25') || d.includes('Pixel 10') || d.includes('Pixel 9'))
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
    <div>
      {/* ======================================================== */}
      {/* 1. HERO SECTION (With Dual CTAs: Retail + Wholesale)     */}
      {/* ======================================================== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07152E 0%, #0B1E3D 50%, #0F274E 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '52px 0 64px'
        }}
      >
        {/* Neon Lighting Glow Arcs */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,26,0.4) 0%, rgba(255,46,147,0.3) 45%, rgba(11,99,246,0.3) 70%, transparent 85%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1.25fr 0.9fr',
              gap: '24px',
              alignItems: 'center'
            }}
            className="hero-grid-custom"
          >
            {/* Left Hero Text */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#93C5FD',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  🍁 CANADIAN RETAIL &amp; WHOLESALE DISTRIBUTION
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(34px, 4.6vw, 56px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: '16px'
                }}
              >
                <span style={{ display: 'block', color: '#0B63F6' }}>POWER.</span>
                <span style={{ display: 'block', color: '#8B5CF6' }}>PROTECT.</span>
                <span style={{ display: 'block', color: '#FF7A1A' }}>CONNECT.</span>
              </h1>

              <p
                style={{
                  fontSize: '15.5px',
                  color: '#E2E8F0',
                  lineHeight: 1.5,
                  marginBottom: '28px',
                  maxWidth: '400px',
                  fontWeight: 500
                }}
              >
                Engineered for extreme durability, ultra-fast charging, and seamless daily protection. Available direct to consumer and wholesale to retailers.
              </p>

              {/* Dual Calls to Action */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px' }}>
                {/* CTA 1: SHOP ACCESSORIES */}
                <Link
                  href="/shop"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    background: 'linear-gradient(90deg, #0B63F6 0%, #FF2E93 50%, #FF7A1A 100%)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '14.5px',
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(255,46,147,0.32)',
                    transition: 'transform 0.18s ease'
                  }}
                >
                  <span>SHOP ACCESSORIES</span>
                  <ChevronRight size={18} strokeWidth={3} />
                </Link>

                {/* CTA 2: WHOLESALE / BECOME A DEALER */}
                <Link
                  href="/wholesale"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={15} color="#60A5FA" />
                    <span>WHOLESALE / BECOME A DEALER</span>
                  </span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Center 3D Hardware Showcase Podium */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '460px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px -10px rgba(11, 99, 246, 0.5), 0 0 35px rgba(255, 46, 147, 0.25)',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(11, 30, 61, 0.6)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <img
                  src="/images/hero-showcase.jpg"
                  alt="Celtronics Premium Hardware & Accessories"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    aspectRatio: '4/3',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(7, 21, 46, 0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#93C5FD', display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.04em' }}>
                    <Zap size={14} color="#FF7A1A" />
                    NEXT-GEN FLAGSHIP ACCESSORIES
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#F1F5F9', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 8px', borderRadius: '100px' }}>
                    MagSafe + GaN III
                  </span>
                </div>
              </div>
            </div>

            {/* Right Value Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF7A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <ShieldCheck size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '13.5px', fontWeight: 800 }}>1-YEAR WARRANTY</div>
                  <div style={{ color: '#CBD5E1', fontSize: '12px' }}>Comprehensive on all products</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <Truck size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '13.5px', fontWeight: 800 }}>SAME-DAY DISPATCH</div>
                  <div style={{ color: '#CBD5E1', fontSize: '12px' }}>Shipped from Canadian warehouse</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <Store size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '13.5px', fontWeight: 800 }}>RETAIL PARTNER PROGRAM</div>
                  <div style={{ color: '#CBD5E1', fontSize: '12px' }}>Free POP display stands for stores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SHOP BY DEVICE (iPhone, Samsung Galaxy, Google Pixel) */}
      {/* ======================================================== */}
      <section style={{ padding: '56px 0 48px', background: '#FFFFFF' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                COMPATIBILITY HUB
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', margin: '4px 0 0', letterSpacing: '-0.01em' }}>
                SHOP BY DEVICE
              </h2>
            </div>
            <Link href="/shop" style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View all models <ArrowRight size={14} />
            </Link>
          </div>

          <div className="device-families-grid">
            {DEVICE_FAMILIES.map((family) => (
              <div
                key={family.id}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  border: '1.5px solid #E2E8F0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {family.imageUrl ? (
                    <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', background: '#F1F5F9' }}>
                      <img
                        src={family.imageUrl}
                        alt={family.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '11px', fontWeight: 800, color: family.color, background: 'rgba(255, 255, 255, 0.95)', border: `1px solid ${family.color}`, padding: '3px 10px', borderRadius: '100px', backdropFilter: 'blur(6px)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        {family.shortName} Series
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: family.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Smartphone size={22} color={family.color} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: family.color, background: '#fff', border: `1px solid ${family.color}`, padding: '2px 8px', borderRadius: '100px' }}>
                        {family.shortName} Series
                      </span>
                    </div>
                  )}

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '6px' }}>
                    {family.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.4, marginBottom: '16px' }}>
                    {family.tagline}
                  </p>

                  {/* Popular Model Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {family.models.slice(0, 4).map((m) => (
                      <Link
                        key={m}
                        href={`/shop?q=${encodeURIComponent(m)}`}
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#334155',
                          background: '#fff',
                          border: '1px solid #CBD5E1',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none'
                        }}
                      >
                        {m}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/shop/device/${family.id}`}
                  style={{
                    background: family.color,
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Explore {family.shortName} Accessories</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. BEST SELLERS SECTION                                  */}
      {/* ======================================================== */}
      <section style={{ padding: '48px 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#FF3D5A', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} color="#FF3D5A" /> TOP RATED BY CANADIANS
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', margin: '4px 0 0', letterSpacing: '-0.01em' }}>
                BEST SELLERS
              </h2>
            </div>
            <Link href="/shop" style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View All Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div className="products-responsive-grid">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. LATEST DEVICE ACCESSORIES SHOWCASE                    */}
      {/* ======================================================== */}
      <section style={{ padding: '56px 0', background: '#FFFFFF' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={14} color="#0B63F6" /> NEW FLAGSHIPS
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', margin: '4px 0 0', letterSpacing: '-0.01em' }}>
                LATEST DEVICE ACCESSORIES
              </h2>
            </div>
            <Link href="/shop" style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Shop New Releases <ArrowRight size={14} />
            </Link>
          </div>

          <div className="products-responsive-grid">
            {latestDeviceAccessories.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. STRONGER "WHY CELLCENTRAL" SECTION                    */}
      {/* ======================================================== */}
      <section style={{ padding: '64px 0', background: '#0B1E3D', color: '#fff' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#3FA9FF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              THE CELLCENTRAL ADVANTAGE
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
              Why Choose CellCentral?
            </h2>
            <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: 1.5 }}>
              Engineered with pro-grade materials, stored in Canadian warehouses, and backed by comprehensive warranty replacement.
            </p>
          </div>

          <div className="advantage-pillars-grid">
            {/* Pillar 1: Canadian Logistics */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Truck size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                100% Canadian Stock
              </h3>
              <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Dispatched directly from domestic fulfillment hubs in Ontario. Zero customs delays, duty charges, or surprise fees.
              </p>
            </div>

            {/* Pillar 2: Pro Build Quality */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Award size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Pro-Grade Engineering
              </h3>
              <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Next-gen GaN III fast charging semiconductors, dual-ion exchange 9H+ tempered glass, and military drop-tested casing.
              </p>
            </div>

            {/* Pillar 3: 1-Year Full Warranty */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FF7A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShieldCheck size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                1-Year Canadian Warranty
              </h3>
              <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Hassle-free 1-Year warranty on all products. Easy online product registration with instant digital certification.
              </p>
            </div>

            {/* Pillar 4: Direct Value & Wholesale */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px', borderRadius: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Briefcase size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Direct &amp; Wholesale Value
              </h3>
              <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Fair direct-to-consumer prices and high-margin wholesale dealer tiers without traditional retail middlemen markups.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/wholesale"
              style={{
                background: 'linear-gradient(90deg, #0B63F6 0%, #2563EB 100%)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '100px',
                fontWeight: 800,
                fontSize: '13.5px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Briefcase size={15} />
              <span>Explore Wholesale Dealer Tiers</span>
            </Link>

            <Link
              href="/warranty-registration"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '13.5px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileCheck2 size={15} />
              <span>Register Product Warranty</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TRUST / BENEFIT CARDS BAR                             */}
      {/* ======================================================== */}
      <section style={{ padding: '32px 0', background: '#FFFFFF' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
              background: '#F8FAFC',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--gray-200)'
            }}
            className="trust-strip-custom"
          >
            {/* Card 1: Quality You Can Trust */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Award size={22} color="#0B1E3D" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  QUALITY YOU CAN TRUST
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  Lab-tested premium accessories.
                </p>
              </div>
            </div>

            {/* Card 2: Warranty Coverage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <ShieldCheck size={22} color="#0B63F6" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  WARRANTY COVERAGE
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  1-year Canadian warranty on all products.
                </p>
              </div>
            </div>

            {/* Card 3: Easy Returns */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <RotateCcw size={22} color="#0284C7" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  EASY RETURNS
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  30-day hassle-free Canadian returns.
                </p>
              </div>
            </div>

            {/* Card 4: Customer Support */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Headphones size={22} color="#0B1E3D" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  CANADIAN SUPPORT
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  Dedicated domestic support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. TOP BRANDS & ECOSYSTEMS CRAWLER                       */}
      {/* ======================================================== */}
      <section style={{ padding: '24px 0 56px', background: '#FFFFFF' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', marginBottom: '28px', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
            ENGINEERED FOR LEADING DEVICE ECOSYSTEMS
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '28px 40px',
              padding: '0 20px',
              marginBottom: '28px'
            }}
            className="brand-logos-row"
          >
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0B63F6', letterSpacing: '0.04em', fontFamily: 'var(--font-space)' }}>
              ANKER
            </span>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#16A34A', letterSpacing: '0.04em', fontFamily: 'var(--font-space)' }}>
              UGREEN
            </span>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#111827', letterSpacing: '0.05em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ border: '2.5px solid #111827', borderRadius: '5px', padding: '0 4px', fontSize: '18px' }}>B</span>
              <span>BASEUS</span>
            </span>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0EA5E9', letterSpacing: '0.08em', fontFamily: 'var(--font-space)' }}>
              ESR
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#111827', letterSpacing: '0.02em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#FF7A1A' }}>❖</span>
              <span>spigen</span>
            </span>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#FF7A1A', letterSpacing: '0.04em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>⊤</span>
              <span>TORRAS</span>
            </span>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#1E3A8A', letterSpacing: '0.08em', fontFamily: 'var(--font-space)' }}>
              SAMSUNG
            </span>
          </div>

          <Link
            href="/brands"
            style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#0B63F6',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em'
            }}
          >
            <span>VIEW ALL COMPATIBLE BRANDS</span>
            <span>➔</span>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. NEWSLETTER / "STAY IN THE LOOP" BANNER                */}
      {/* ======================================================== */}
      <section
        style={{
          background: 'linear-gradient(90deg, #0B63F6 0%, #7C3AED 35%, #FF2E93 70%, #FF7A1A 100%)',
          padding: '36px 0',
          color: '#fff'
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
            className="nl-strip-custom"
          >
            {/* Left: Mail Icon & Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none'
                }}
              >
                <Mail size={26} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  STAY IN THE LOOP
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.95, margin: '2px 0 0', color: '#fff' }}>
                  Get exclusive dealer drops, wholesale promotions, and new flagship alerts.
                </p>
              </div>
            </div>

            {/* Center: Email Subscription Form */}
            <form onSubmit={handleNewsletterSubmit} className="nl-form-custom" style={{ display: 'flex', gap: '8px', flex: '1 1 300px', maxWidth: '460px', width: '100%' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#0B1E3D',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#6366F1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
