'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Check, Truck } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { ProductIcon } from './ProductIcon';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const outOfStock = !product.inStock || product.badge === 'out';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!outOfStock) {
      addItem(product, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const getProductImage = (p: Product) => {
    if (p.imageUrl) return p.imageUrl;
    switch (p.iconType) {
      case 'case': return '/images/products/case-clear-magsafe.jpg';
      case 'screen': return '/images/products/screen-protector-tray.jpg';
      case 'charger': return '/images/products/charger-gan-65w.jpg';
      case 'cable': return '/images/products/cable-braided-100w.jpg';
      case 'power': return '/images/products/powerbank-magsafe.jpg';
      case 'audio': return '/images/products/earbuds-anc.jpg';
      case 'mount': return '/images/products/car-mount-magsafe.jpg';
      default: return '/images/products/case-clear-magsafe.jpg';
    }
  };

  return (
    <div className="pcard">
      {/* Product Media Area */}
      <div className="pcard-media">
        <Link
          href={`/product/${product.id}`}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <img
            src={getProductImage(product)}
            alt={product.name}
            style={{ width: '100%', height: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '12px' }}
          />
        </Link>

        {/* Badges */}
        <div className="pcard-badges">
          {product.badge && (
            <span className={`badge badge-${product.badge}`}>
              {product.badgeText || product.badge.toUpperCase()}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`pcard-wish ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isFavorite ? '#fff' : 'none'} color={isFavorite ? '#fff' : 'var(--navy)'} />
        </button>

        {/* Quick View Button */}
        {!outOfStock && (
          <button className="pcard-quick" onClick={handleQuickView}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={13} /> QUICK VIEW
            </span>
          </button>
        )}
      </div>

      {/* Product Card Details */}
      <div className="pcard-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="pcard-brand">{product.brand}</span>
          {/* Color variant dots preview */}
          {product.colors && product.colors.length > 1 && (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  title={col.name}
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: col.colorHex || '#CBD5E1',
                    border: '1px solid rgba(0,0,0,0.15)',
                    display: 'inline-block'
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span style={{ fontSize: '9px', color: 'var(--gray-400)', fontWeight: 600 }}>
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="pcard-name">{product.name}</h3>
        </Link>

        <StarRating rating={product.rating} reviews={product.reviewCount} size={11} />

        <div className="pcard-price">
          {outOfStock ? (
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray-400)' }}>Currently Unavailable</span>
          ) : (
            <>
              <span className="price-now">${product.price.toFixed(2)}</span>
              {product.wasPrice && (
                <>
                  <span className="price-was">${product.wasPrice.toFixed(2)}</span>
                  {product.badge === 'sale' && (
                    <span className="price-off">
                      Save ${(product.wasPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Add to Cart CTA with feedback */}
        <button
          className={`pcard-add ${justAdded ? 'added' : ''}`}
          disabled={outOfStock}
          onClick={handleAddToCart}
          style={
            outOfStock
              ? { opacity: 0.6, cursor: 'not-allowed' }
              : justAdded
              ? { background: '#1EA672', color: '#fff' }
              : undefined
          }
        >
          {outOfStock ? (
            'OUT OF STOCK'
          ) : justAdded ? (
            <>
              <Check size={14} /> ADDED TO CART
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
};
