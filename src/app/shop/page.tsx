import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { PRODUCTS } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop Premium Mobile Accessories & Wholesale — CellCentral Canada',
  description: 'Explore military drop-tested cases, 9H tempered glass, GaN fast chargers, and MagSafe accessories. Shipped fast from Canadian warehouses with 1-Year Warranty.',
  alternates: {
    canonical: 'https://cellcentral.ca/shop'
  }
};

export default function ShopPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Mobile Accessories & Wholesale — CellCentral Canada',
    description: 'Explore military drop-tested cases, 9H tempered glass, GaN fast chargers, and MagSafe accessories.',
    url: 'https://cellcentral.ca/shop',
    itemListElement: PRODUCTS.slice(0, 10).map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `https://cellcentral.ca/product/${prod.id}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="wrap" style={{ padding: '48px 0', minHeight: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>
                Shop All Mobile Accessories
              </h1>
              <p style={{ color: 'var(--gray-500)', maxWidth: '600px', margin: '8px auto 0' }}>
                Discover our full range of premium cases, chargers, screen protection, and cables. Backed by Canadian warranty.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid var(--gray-200)',
                    height: '340px',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              ))}
            </div>
          </div>
        }
      >
        <ShopCatalog />
      </Suspense>
    </>
  );
}
