'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '64px' }}>
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />

      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
        My Wishlist <span className="mono" style={{ color: 'var(--gray-400)', fontSize: '20px' }}>({favoriteProducts.length})</span>
      </h1>
      <p style={{ color: 'var(--gray-700)', fontSize: '15px', marginBottom: '32px' }}>
        Saved products for your upcoming setup upgrades.
      </p>

      {favoriteProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--gray-50)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-100)' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 14px rgba(11,30,61,0.06)' }}>
            <Heart size={36} color="var(--gray-400)" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Your Wishlist is Empty</h3>
          <p style={{ color: 'var(--gray-700)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Tap the heart icon on any product to save it to your wishlist and revisit it later.
          </p>
          <Link href="/shop" className="btn btn-navy">
            EXPLORE PRODUCTS <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
