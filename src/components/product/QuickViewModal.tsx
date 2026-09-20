'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Check, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { ProductIcon } from './ProductIcon';
import { StarRating } from './StarRating';
import { ProductVariant } from '@/types/product';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState<ProductVariant | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedModel(quickViewProduct.models[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addItem(quickViewProduct, quantity, selectedColor, selectedModel);
    closeQuickView();
  };

  return (
    <div className="modal-backdrop" onClick={closeQuickView}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeQuickView} aria-label="Close preview">
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          {/* Left media */}
          <div
            style={{
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1/1',
              border: '1px solid var(--gray-100)',
              position: 'relative'
            }}
          >
            <img
              src={
                quickViewProduct.imageUrl ||
                (quickViewProduct.iconType === 'case' ? '/images/products/case-clear-magsafe.jpg' :
                 quickViewProduct.iconType === 'screen' ? '/images/products/screen-protector-tray.jpg' :
                 quickViewProduct.iconType === 'charger' ? '/images/products/charger-gan-65w.jpg' :
                 quickViewProduct.iconType === 'cable' ? '/images/products/cable-braided-100w.jpg' :
                 quickViewProduct.iconType === 'power' ? '/images/products/powerbank-magsafe.jpg' :
                 quickViewProduct.iconType === 'audio' ? '/images/products/earbuds-anc.jpg' :
                 quickViewProduct.iconType === 'mount' ? '/images/products/car-mount-magsafe.jpg' :
                 '/images/products/case-clear-magsafe.jpg')
              }
              alt={quickViewProduct.name}
              style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '12px' }}
            />
            {quickViewProduct.badge && (
              <span
                className={`badge badge-${quickViewProduct.badge}`}
                style={{ position: 'absolute', top: '16px', left: '16px' }}
              >
                {quickViewProduct.badgeText || quickViewProduct.badge.toUpperCase()}
              </span>
            )}
          </div>

          {/* Right info */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase' }}>
              {quickViewProduct.brand}
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginTop: '4px', marginBottom: '8px' }}>
              {quickViewProduct.name}
            </h2>

            <StarRating rating={quickViewProduct.rating} reviews={quickViewProduct.reviewCount} />

            <div className="pdp-price" style={{ marginTop: '12px', marginBottom: '14px' }}>
              <span className="now" style={{ fontSize: '24px' }}>${quickViewProduct.price.toFixed(2)}</span>
              {quickViewProduct.wasPrice && (
                <span className="was">${quickViewProduct.wasPrice.toFixed(2)}</span>
              )}
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--gray-700)', lineHeight: 1.4, margin: '0 0 16px' }}>
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            {quickViewProduct.colors.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>
                  Color: <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{selectedColor?.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`opt-swatch ${selectedColor?.name === c.name ? 'active' : ''}`}
                      style={{ background: c.colorHex }}
                      title={c.name}
                      aria-label={`Select ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Model Pills */}
            {quickViewProduct.models.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>
                  Device Model: <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{selectedModel}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {quickViewProduct.models.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      className={`opt-pill ${selectedModel === m ? 'active' : ''}`}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <div className="qty-box" style={{ height: '44px' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '14px' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              <button
                className="btn btn-navy"
                style={{ flex: 1, padding: '12px' }}
                onClick={handleAddToCart}
                disabled={!quickViewProduct.inStock}
              >
                <ShoppingBag size={16} /> ADD TO CART
              </button>
            </div>

            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={closeQuickView}
                style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                View Full Product Details &amp; Specifications <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
