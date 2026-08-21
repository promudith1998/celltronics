'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
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

  const isFavorite = isInWishlist(product.id);
  const outOfStock = !product.inStock || product.badge === 'out';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!outOfStock) {
      addItem(product, 1);
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

  return (
    <div className="pcard">
      {/* Product Media Area */}
      <div className="pcard-media">
        <Link href={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProductIcon type={product.iconType} size="56%" />
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
        <span className="pcard-brand">{product.brand}</span>
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

        {/* Add to Cart CTA */}
        <button
          className="pcard-add"
          disabled={outOfStock}
          onClick={handleAddToCart}
          style={outOfStock ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
        >
          {outOfStock ? (
            'OUT OF STOCK'
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
