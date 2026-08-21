'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductIcon } from '@/components/product/ProductIcon';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    appliedCoupon,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const [promoCodeInput, setPromoCodeInput] = useState('');

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim()) {
      if (applyCoupon(promoCodeInput)) {
        setPromoCodeInput('');
      }
    }
  };

  const handleSaveForLater = (item: any) => {
    toggleWishlist(item.product);
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--gray-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <ShoppingBag size={40} color="var(--gray-400)" />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Your Shopping Cart is Empty</h1>
        <p style={{ color: 'var(--gray-700)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 28px' }}>
          Looks like you haven&apos;t added any items yet. Explore our curated phone cases, GaN chargers, and MagSafe accessories!
        </p>
        <Link href="/shop" className="btn btn-navy">
          CONTINUE SHOPPING <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: '36px', paddingBottom: '64px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>
        Your Cart <span className="mono" style={{ color: 'var(--gray-400)', fontSize: '20px' }}>({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
      </h1>

      {/* Free Shipping Dynamic Progress */}
      <div className="cart-progress">
        <Truck />
        <p>
          {isFreeShipping ? (
            <span style={{ color: '#1EA672', fontWeight: 700 }}>🎉 You qualified for FREE SHIPPING across Canada!</span>
          ) : (
            <span>Add <b className="mono">${freeShippingRemaining.toFixed(2)}</b> more for <b>FREE SHIPPING</b></span>
          )}
        </p>
        <div className="bar">
          <i style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Cart Layout Grid */}
      <div className="cart-layout">
        {/* Left: Items List */}
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-thumb">
                <ProductIcon type={item.product.iconType} size="56%" />
              </div>

              <div className="cart-info">
                <div className="brand">{item.product.brand}</div>
                <Link href={`/product/${item.product.id}`} className="name">
                  {item.product.name}
                </Link>
                <div className="variant">
                  {item.selectedColor?.name} {item.selectedModel ? `· ${item.selectedModel}` : ''}
                </div>
                <div className="links">
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                  <button onClick={() => handleSaveForLater(item)}>Save for later</button>
                </div>
              </div>

              <div className="cart-qty">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="cart-price">
                <span className="now">${(item.product.price * item.quantity).toFixed(2)}</span>
                {item.product.wasPrice && (
                  <span className="was">
                    ${(item.product.wasPrice * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/shop" className="seeall">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="summary-card">
          <h4>Order Summary</h4>

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="mono">${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row" style={{ color: 'var(--red)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={13} /> Discount ({appliedCoupon?.code})
              </span>
              <span className="mono">−${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping (Canada)</span>
            <span className="mono">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (HST/GST)</span>
            <span className="mono">${tax.toFixed(2)}</span>
          </div>

          {/* Promo Code Input Box */}
          {appliedCoupon ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#E7EFFE',
                padding: '10px 14px',
                borderRadius: '8px',
                margin: '16px 0',
                fontSize: '12.5px',
                color: 'var(--blue)',
                fontWeight: 600
              }}
            >
              <span>Coupon <b>{appliedCoupon.code}</b> applied!</span>
              <button
                onClick={removeCoupon}
                style={{ background: 'none', color: 'var(--gray-700)', cursor: 'pointer', display: 'flex' }}
                aria-label="Remove coupon"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="promo-row">
              <input
                type="text"
                placeholder="Coupon code (e.g. SAVE10)"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
              />
              <button type="submit" className="btn btn-ghost btn-sm">Apply</button>
            </form>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span className="mono">${total.toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="btn btn-grad btn-block" style={{ marginTop: '18px' }}>
            PROCEED TO CHECKOUT <ArrowRight size={16} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--gray-400)', marginTop: '14px' }}>
            <ShieldCheck size={14} color="#1EA672" />
            <span>Secure 256-bit encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
