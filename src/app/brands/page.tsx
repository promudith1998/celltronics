'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { BRANDS, PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function BrandsPage() {
  const brandDescriptions: { [key: string]: string } = {
    Anker: 'Global leader in mobile charging technology and high-grade MagSafe audio and power accessories.',
    UGREEN: 'Pioneering GaN III fast chargers, multi-port USB hubs, and high-speed data cables.',
    Baseus: 'Innovative consumer electronics, braided 100W cables, and sleek automotive accessories.',
    ESR: 'Patented HaloLock kickstand cases, MagSafe ecosystem, and ultra-tough protection.',
    Spigen: 'World-renowned precision phone cases, screen protectors, and audio solutions.',
    TORRAS: 'UltraGlass aerospace-grade shatterproof screen protection and slim magnetic cases.',
    Samsung: 'Official and certified Qi wireless car mounts, adaptive fast chargers, and accessories.',
    Belkin: 'Apple-certified MagSafe charging stands, robust surge protectors, and connectivity gear.'
  };

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      <Breadcrumbs items={[{ label: 'Brands' }]} />

      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
        Certified Brand Partners
      </h1>
      <p style={{ color: 'var(--gray-700)', fontSize: '15px', marginBottom: '36px', maxWidth: '640px' }}>
        We only source 100% authentic, certified mobile accessories from the industry’s most respected manufacturers.
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1EA672', fontWeight: 700, background: '#E7F9F0', padding: '3px 8px', borderRadius: '4px' }}>
                    <ShieldCheck size={13} /> Certified
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
                <span>Shop {brand}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
