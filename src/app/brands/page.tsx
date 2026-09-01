'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { BRANDS, PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function BrandsPage() {
  const brandDescriptions: { [key: string]: string } = {
    Anker: 'Global leader in high-performance mobile charging, Power Delivery semiconductors, and durable audio.',
    UGREEN: 'Pioneering GaN fast wall blocks, multi-port desktop hubs, and high-speed data cables.',
    Baseus: 'Precision consumer electronics, braided 100W/240W cables, and sleek automotive charging mounts.',
    ESR: 'HaloLock kickstand cases, MagSafe ecosystem accessories, and military drop-tested armor.',
    Spigen: 'World-renowned precision phone cases, screen protectors, and rugged everyday accessories.',
    TORRAS: 'UltraGlass aerospace-grade shatterproof screen protection and slim magnetic cases.',
    Samsung: 'Fast wireless charging stands, adaptive travel adapters, and Galaxy device accessories.',
    Belkin: 'Engineered charging stations, surge protectors, and connectivity gear for modern devices.'
  };

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      <Breadcrumbs items={[{ label: 'Brands' }]} />

      <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
        Featured Brands &amp; Compatible Ecosystems
      </h1>
      <p style={{ color: 'var(--gray-700)', fontSize: '15px', marginBottom: '36px', maxWidth: '640px' }}>
        We source top-tier mobile accessories engineered for Apple, Samsung, Google, and universal USB-C devices. Backed by our Canadian 1-Year Warranty.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {BRANDS.map((brand) => {
          const productCount = PRODUCTS.filter((p) => p.brand === brand).length;
          return (
            <div
              key={brand}
              style={{
                background: '#fff',
                border: '1px solid var(--gray-100)',
                borderRadius: 'var(--radius)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(11,30,61,0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(11,30,61,0.03)';
                e.currentTarget.style.borderColor = 'var(--gray-100)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)' }}>{brand}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#0B63F6', fontWeight: 700, background: '#EFF6FF', padding: '3px 8px', borderRadius: '4px' }}>
                    <ShieldCheck size={13} /> Genuine Stock
                  </div>
                </div>
                <p style={{ color: 'var(--gray-700)', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                  {brandDescriptions[brand] || 'High quality mobile accessories and charging solutions.'}
                </p>
              </div>

              <Link
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                className="btn btn-ghost btn-sm"
                style={{ justifyContent: 'space-between', width: '100%' }}
              >
                <span>Browse {brand} Products</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
