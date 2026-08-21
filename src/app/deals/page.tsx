'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS, PROMO_CODES } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function DealsPage() {
  const dealProducts = PRODUCTS.filter((p) => p.badge === 'sale' || (p.wasPrice && p.wasPrice > p.price));

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      <Breadcrumbs items={[{ label: 'Deals & Clearance' }]} />

      {/* Hero Banner for Deals */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF3D5A 0%, #FF2E93 50%, #FF7A1A 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          color: '#fff',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(255,61,90,0.25)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={14} /> LIMITED TIME PROMOTIONS
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Exclusive Canadian Deals &amp; Discounts
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.95, maxWidth: '540px', margin: '0 0 24px' }}>
          Save up to 40% on select MagSafe phone cases, multi-port GaN fast chargers, and ultra-durable braided cables.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {PROMO_CODES.map((promo) => (
            <div
              key={promo.code}
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px'
              }}
            >
              <Tag size={15} />
              <span>Use code <b className="mono" style={{ color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{promo.code}</b> — {promo.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-head">
        <div>
          <h2>Discounted Products ({dealProducts.length})</h2>
          <p>Hand-picked bargains while supplies last.</p>
        </div>
      </div>

      <div className="product-grid">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
