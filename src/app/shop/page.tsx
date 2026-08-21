import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/shop/ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Mobile Accessories — CellCentral Canada',
  description: 'Explore high quality cases, chargers, cables, and power banks. Built for Canadian durability and fast performance.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '64px 0', textAlign: 'center' }}>Loading Catalog...</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
