'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Sparkles, Truck, Headphones, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useToast } from '@/context/ToastContext';

export default function HomePage() {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroSlides = [
    { l1: 'POWER.', l2: 'PROTECT.', l3: 'CONNECT.', sub: 'Premium mobile accessories for your everyday life.', link: '/shop' },
    { l1: 'NEXT-GEN.', l2: 'MAGSAFE.', l3: 'READY.', sub: 'Engineered for maximum speed and military-grade drop defense.', link: '/shop/phone-cases' },
    { l1: '65W GaN.', l2: 'ULTRA.', l3: 'FAST.', sub: 'Smaller footprint, cooler operation, maximum power delivery.', link: '/shop/chargers' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      showToast('Welcome to the VIP Club! 🎉', 'You have been subscribed. Check your inbox for your 15% discount code!', 'success');
      setNewsletterEmail('');
    } else {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    }
  };

  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero" style={{ padding: 0 }}>
        <div className="wrap">
          {/* Left Hero Text */}
          <div>
            <div className="hero-eyebrow">
              <Zap size={13} color="#FF7A1A" />
              NEW ARRIVALS · IPHONE 17 &amp; GALAXY S26 READY
            </div>
            <h1>
              <span className="l1">{heroSlides[activeHeroIndex].l1}</span>
              <span className="l2">{heroSlides[activeHeroIndex].l2}</span>
              <span className="l3">{heroSlides[activeHeroIndex].l3}</span>
            </h1>
            <p className="sub">{heroSlides[activeHeroIndex].sub}</p>
            <div className="hero-ctas">
              <Link href={heroSlides[activeHeroIndex].link} className="btn btn-grad">
                SHOP NOW <ArrowRight size={16} />
              </Link>
              <Link href="/deals" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                VIEW DEALS
              </Link>
            </div>
            {/* Hero Pagination Dots */}
            <div className="hero-dots">
              {heroSlides.map((_, i) => (
                <span
                  key={i}
                  className={activeHeroIndex === i ? 'on' : ''}
                  onClick={() => setActiveHeroIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Center 3D Hero Art Tech Showcase */}
          <div className="hero-art">
            <svg viewBox="0 0 480 400" style={{ width: '100%', height: '100%' }}>
              <defs>
                <radialGradient id="podium" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B2E7A" />
                  <stop offset="100%" stopColor="#1B2F5C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="245" cy="330" rx="190" ry="34" fill="url(#podium)" />
              <ellipse cx="245" cy="330" rx="150" ry="20" fill="#182548" />

              {/* 65W charger block, left */}
              <g transform="translate(70,175) rotate(-6)">
                <rect x="0" y="0" width="78" height="92" rx="12" fill="#0F1C3A" stroke="url(#brandGrad)" strokeWidth="2.5" />
                <text x="39" y="40" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono), monospace" fontSize="15" fontWeight="600">65W</text>
                <rect x="16" y="52" width="46" height="6" rx="3" fill="url(#brandGrad)" opacity="0.85" />
                <rect x="16" y="64" width="30" height="6" rx="3" fill="#3A4B78" />
              </g>

              {/* braided cable, front */}
              <path d="M60 300c40 26 90 30 140 8" stroke="url(#brandGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
              <rect x="46" y="288" width="20" height="26" rx="5" fill="#0F1C3A" stroke="url(#brandGrad)" strokeWidth="2" />

              {/* phone with clear MagSafe case, center */}
              <g transform="translate(178,60)">
                <rect x="0" y="0" width="128" height="252" rx="26" fill="none" stroke="#fff" strokeWidth="3" opacity="0.9" />
                <rect x="10" y="10" width="108" height="232" rx="18" fill="#0B1E3D" />
                <rect x="44" y="0" width="40" height="10" rx="5" fill="#fff" opacity="0.9" />
                <circle cx="64" cy="200" r="17" fill="none" stroke="url(#brandGrad)" strokeWidth="3" />
                <circle cx="64" cy="200" r="6" fill="none" stroke="url(#brandGrad)" strokeWidth="2" />
              </g>

              {/* wireless car mount, right */}
              <g transform="translate(342,150) rotate(5)">
                <rect x="0" y="34" width="70" height="98" rx="14" fill="#0F1C3A" stroke="url(#brandGrad)" strokeWidth="2.5" />
                <circle cx="35" cy="24" r="20" fill="none" stroke="url(#brandGrad)" strokeWidth="3" />
                <path d="M35 4v10M35 24h0" stroke="url(#brandGrad)" strokeWidth="3" strokeLinecap="round" />
                <rect x="20" y="52" width="30" height="60" rx="6" fill="#182548" />
              </g>
            </svg>
          </div>

          {/* Right Hero Trust Badges */}
          <div className="hero-side">
            <div className="hero-badge">
              <span className="ico">
                <Shield size={17} color="#3FA9FF" />
              </span>
              <div>
                <b>1-YEAR WARRANTY</b>
                <small>Peace of mind guaranteed</small>
              </div>
            </div>
            <div className="hero-badge">
              <span className="ico">
                <Sparkles size={17} color="#FF2E93" />
              </span>
              <div>
                <b>CANADIAN SUPPORT</b>
                <small>Fast &amp; local service</small>
              </div>
            </div>
            <div className="hero-badge">
              <span className="ico">
                <Truck size={17} color="#FF7A1A" />
              </span>
              <div>
                <b>FAST &amp; FREE SHIPPING</b>
                <small>On orders over $49</small>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Animated Cable Trace Motif */}
        <div className="trace" />
      </section>

      {/* CATEGORY ICON STRIP */}
      <section>
        <div className="wrap">
          <div className="eyebrow">
            <span className="dash" />
            BROWSE BY CATEGORY
          </div>
          <div className="section-head" style={{ marginBottom: '26px' }}>
            <h2>Your Central Source for Mobile Accessories</h2>
          </div>
          <div className="cat-strip">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.id}`}
                className="cat-pill"
                style={{ ['--ring' as any]: cat.ringColor }}
              >
                <div className="cat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke={cat.ringColor} strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                    {cat.id === 'chargers' && (
                      <>
                        <rect x="4" y="8" width="12" height="10" rx="2" />
                        <path d="M16 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                        <path d="M8 8V6a3 3 0 0 1 6 0v2" />
                      </>
                    )}
                    {cat.id === 'cables' && (
                      <>
                        <path d="M4 8c4 3 12 3 16 0M4 8v3c4 3 12 3 16 0V8" />
                        <rect x="3" y="16" width="4" height="4" rx="1" />
                        <rect x="17" y="16" width="4" height="4" rx="1" />
                      </>
                    )}
                    {cat.id === 'phone-cases' && <rect x="6" y="2" width="12" height="20" rx="3" />}
                    {cat.id === 'screen-protectors' && (
                      <>
                        <rect x="7" y="2" width="10" height="20" rx="2" />
                        <path d="M9 5h6" />
                      </>
                    )}
                    {cat.id === 'audio' && (
                      <>
                        <path d="M4 14a8 8 0 0 1 16 0" />
                        <rect x="2" y="14" width="5" height="7" rx="1.5" />
                        <rect x="17" y="14" width="5" height="7" rx="1.5" />
                      </>
                    )}
                    {cat.id === 'car-accessories' && (
                      <>
                        <circle cx="12" cy="12" r="2.4" />
                        <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.5 6.5l1.4 1.4M16.1 16.1l1.4 1.4M6.5 17.5l1.4-1.4M16.1 7.9l1.4-1.4" />
                      </>
                    )}
                    {cat.id === 'power-banks' && (
                      <>
                        <rect x="6" y="4" width="12" height="16" rx="2.5" />
                        <path d="M10 9l3 3-3 3" />
                      </>
                    )}
                  </svg>
                </div>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES GRID */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pop-grid">
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><rect x="7" y="1" width="10" height="18" rx="2.4" /></svg>
              </div>
              <b>Phone Cases</b>
              <Link href="/shop/phone-cases" className="pop-link">Shop now →</Link>
            </div>
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><rect x="8" y="1" width="8" height="18" rx="1.6" /><path d="M10 4h4" /></svg>
              </div>
              <b>Screen Protectors</b>
              <Link href="/shop/screen-protectors" className="pop-link">Shop now →</Link>
            </div>
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><rect x="3" y="7" width="14" height="10" rx="2" /><path d="M17 10h1.6a2 2 0 0 1 2 2v.4a2 2 0 0 1-2 2H17" /></svg>
              </div>
              <b>Fast Chargers</b>
              <Link href="/shop/chargers" className="pop-link">Shop now →</Link>
            </div>
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><path d="M3 8c4.4 3.4 13.6 3.4 18 0M3 8v3.4c4.4 3.4 13.6 3.4 18 0V8" /></svg>
              </div>
              <b>Braided Cables</b>
              <Link href="/shop/cables" className="pop-link">Shop now →</Link>
            </div>
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><rect x="5" y="3" width="14" height="18" rx="2.6" /><path d="M10 9l3 3-3 3" /></svg>
              </div>
              <b>Power Banks</b>
              <Link href="/shop/power-banks" className="pop-link">Shop now →</Link>
            </div>
            <div className="pop-card">
              <div className="pop-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8"><path d="M4 17l2-7a3 3 0 0 1 3-2h6a3 3 0 0 1 3 2l2 7" /><circle cx="7.5" cy="17.5" r="1.6" /><circle cx="16.5" cy="17.5" r="1.6" /></svg>
              </div>
              <b>Car Mounts</b>
              <Link href="/shop/car-accessories" className="pop-link">Shop now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST PROPOSITION BAND */}
      <section style={{ paddingTop: '8px' }}>
        <div className="wrap">
          <div className="trust-band">
            <div className="trust-grid">
              <div className="trust-item">
                <div className="trust-icon">
                  <Shield size={20} color="#fff" />
                </div>
                <div>
                  <h4>Quality You Can Trust</h4>
                  <p>Carefully selected, drop-tested premium accessories.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <Sparkles size={20} color="#fff" />
                </div>
                <div>
                  <h4>Warranty Coverage</h4>
                  <p>1-year replacement warranty on all eligible items.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <RotateCcw size={20} color="#fff" />
                </div>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day hassle-free Canadian returns policy.</p>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">
                  <Headphones size={20} color="#fff" />
                </div>
                <div>
                  <h4>Canadian Support</h4>
                  <p>Dedicated local customer service team ready to assist.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CURATED COLLECTIONS */}
      <section>
        <div className="wrap">
          <div className="eyebrow"><span className="dash" />CURATED COLLECTIONS</div>
          <div className="section-head">
            <h2>Hand-picked for Every Lifestyle</h2>
          </div>
          <div className="coll-grid">
            <div className="coll-card coll-1">
              <svg className="coll-art" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.4">
                <rect x="6" y="1.4" width="12" height="21.2" rx="2.6" />
              </svg>
              <div>
                <h4>New Arrivals</h4>
                <p>The latest accessories for iPhone 17 &amp; Galaxy S26.</p>
                <Link href="/shop" className="coll-cta">SHOP NOW</Link>
              </div>
            </div>

            <div className="coll-card coll-2">
              <svg className="coll-art" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.4">
                <rect x="6" y="1.4" width="12" height="21.2" rx="2.6" />
                <circle cx="12" cy="12" r="2.6" />
              </svg>
              <div>
                <h4>MagSafe Ecosystem</h4>
                <p>Snap on. Power up. Seamless magnetic alignment.</p>
                <Link href="/shop/phone-cases" className="coll-cta">SHOP NOW</Link>
              </div>
            </div>

            <div className="coll-card coll-3">
              <svg className="coll-art" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.4">
                <rect x="3" y="7" width="14" height="10" rx="2" />
                <path d="M17 10h1.6a2 2 0 0 1 2 2v.4a2 2 0 0 1-2 2H17" />
              </svg>
              <div>
                <h4>GaN Fast Charging</h4>
                <p>Charge smarter. 65W &amp; 100W laptop-grade speed.</p>
                <Link href="/shop/chargers" className="coll-cta">SHOP NOW</Link>
              </div>
            </div>

            <div className="coll-card coll-4">
              <svg className="coll-art" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.4">
                <path d="M20.6 12.3L12.3 20.6a1.5 1.5 0 0 1-2.1 0L3.4 13.8a1.5 1.5 0 0 1 0-2.1L11.7 3.4a1.5 1.5 0 0 1 1.4-.4l5.3 1a1.5 1.5 0 0 1 1.2 1.2l1 5.3a1.5 1.5 0 0 1-.4 1.4z" />
                <circle cx="15.5" cy="8.5" r="1.6" />
              </svg>
              <div>
                <h4>Clearance Deals</h4>
                <p>Top-rated items at up to 40% off.</p>
                <Link href="/deals" className="coll-cta">SHOP NOW</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS PRODUCT GRID */}
      <section style={{ paddingTop: '8px' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dash" />TRENDING THIS WEEK</div>
              <h2>Best Sellers</h2>
            </div>
            <Link href="/shop" className="seeall">
              See all products <ArrowRight size={14} />
            </Link>
          </div>
          <div className="product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS STRIP */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="eyebrow"><span className="dash" />TOP BRANDS WE CARRY</div>
          <div className="brand-strip">
            {BRANDS.map((brand) => (
              <Link key={brand} href={`/shop?brand=${encodeURIComponent(brand)}`} className="brand-name">
                {brand}
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '22px' }}>
            <Link href="/brands" className="seeall" style={{ justifyContent: 'center' }}>
              VIEW ALL CERTIFIED BRANDS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* VIP NEWSLETTER */}
      <section>
        <div className="wrap">
          <div className="newsletter">
            <div>
              <h3>Stay in the Loop</h3>
              <p>Get exclusive early access to product drops, Canadian deals, and $15 off your first order.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="nl-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
