'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductIcon } from '@/components/product/ProductIcon';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity
  } = useCart();

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`} aria-label="Shopping Cart Drawer">
        {/* Header */}
        <div className="drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--navy)" />
            <h3>Your Cart <span className="mono" style={{ fontSize: '14px', color: 'var(--gray-400)' }}>({itemCount})</span></h3>
          </div>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Close Cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '16px 24px', background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy-2)', marginBottom: '8px' }}>
            <Truck size={16} color="var(--blue)" />
            {isFreeShipping ? (
              <span style={{ color: '#1EA672', fontWeight: 700 }}>🎉 You qualified for FREE SHIPPING!</span>
            ) : (
              <span>Add <b className="mono" style={{ color: 'var(--blue)' }}>${freeShippingRemaining.toFixed(2)}</b> more for <b>FREE SHIPPING</b></span>
            )}
          </div>
          <div style={{ height: '6px', background: 'var(--gray-200)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'var(--grad-brand)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Drawer Body - Items List */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-400)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ShoppingBag size={32} color="var(--gray-400)" />
              </div>
              <h4 style={{ color: 'var(--navy)', marginBottom: '8px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>Discover our premium phone cases, chargers, and accessories.</p>
              <button
                className="btn btn-navy btn-sm"
                onClick={() => {
                  closeDrawer();
                }}
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--gray-100)',
                    alignItems: 'center'
                  }}
                >
                  {/* Thumb */}
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '10px',
                      background: 'var(--gray-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none',
                      border: '1px solid var(--gray-100)'
                    }}
                  >
                    <ProductIcon type={item.product.iconType} size={36} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                      {item.product.brand}
                    </div>
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeDrawer}
                      style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--navy)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {item.product.name}
                    </Link>
                    <div style={{ fontSize: '11.5px', color: 'var(--gray-700)', marginTop: '2px' }}>
                      {item.selectedColor?.name} {item.selectedModel ? `· ${item.selectedModel}` : ''}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <div className="cart-qty" style={{ height: '28px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '12px', width: '22px' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, fontSize: '14px', color: 'var(--navy)' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', padding: '6px', color: 'var(--gray-400)', cursor: 'pointer' }}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Subtotal & Checkout CTA */}
        {items.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: 'var(--gray-700)', fontWeight: 600 }}>Estimated Subtotal</span>
              <span className="mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)' }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="btn btn-grad btn-block"
              style={{ marginBottom: '8px' }}
            >
              CHECKOUT NOW <ArrowRight size={16} />
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="btn btn-outline btn-block btn-sm"
            >
              VIEW FULL CART
            </Link>
            <p style={{ fontSize: '11px', color: 'var(--gray-400)', textAlign: 'center', marginTop: '10px' }}>
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
