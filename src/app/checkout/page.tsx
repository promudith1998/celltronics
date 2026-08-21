'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductIcon } from '@/components/product/ProductIcon';

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, tax, total, clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('ON');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'interac'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const expressFee = shippingMethod === 'express' ? 9.99 : 0;
  const grandTotal = total + expressFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="wrap" style={{ padding: '64px 20px', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#E7F9F0',
            color: '#1EA672',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}
        >
          <CheckCircle2 size={42} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
          Thank you for your order!
        </h1>
        <p style={{ color: 'var(--gray-700)', fontSize: '15px', marginBottom: '20px' }}>
          Order confirmation has been sent to <b>{email || 'your email'}</b>.
        </p>

        <div
          style={{
            background: 'var(--gray-50)',
            padding: '24px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--gray-100)',
            textAlign: 'left',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-200)', paddingBottom: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-400)', fontWeight: 600 }}>Order Number:</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--navy)' }}>{orderNumber}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-200)', paddingBottom: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-400)', fontWeight: 600 }}>Shipping to:</span>
            <span style={{ fontWeight: 600, color: 'var(--navy)', textAlign: 'right' }}>
              {firstName} {lastName}<br />
              {address}, {city}, {province} {postalCode}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-400)', fontWeight: 600 }}>Estimated Delivery:</span>
            <span style={{ fontWeight: 700, color: '#1EA672' }}>
              {shippingMethod === 'express' ? '1-2 Business Days (Express)' : '2-4 Business Days'}
            </span>
          </div>
        </div>

        <Link href="/shop" className="btn btn-navy">
          CONTINUE SHOPPING <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <ShoppingBag size={40} color="var(--gray-400)" />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Your Cart is Empty</h1>
        <p style={{ color: 'var(--gray-700)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 28px' }}>
          Add items to your cart before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn btn-navy">
          SHOP NOW <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ paddingTop: '36px', paddingBottom: '64px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '28px' }}>Secure Checkout 🇨🇦</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start' }}>
        {/* Left Form */}
        <form onSubmit={handlePlaceOrder}>
          {/* 1. Contact Information */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>1. Contact Information</h3>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--navy-2)', marginBottom: '6px' }}>
                Email Address for Order Confirmation &amp; Tracking
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)', fontSize: '14px' }}
              />
            </div>
          </div>

          {/* 2. Canadian Shipping Address */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>2. Shipping Address</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Street Address</label>
              <input
                type="text"
                placeholder="123 Queen Street West, Apt 4B"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>City</label>
                <input
                  type="text"
                  placeholder="Toronto"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Province</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)', background: '#fff' }}
                >
                  <option value="ON">Ontario (ON)</option>
                  <option value="BC">British Columbia (BC)</option>
                  <option value="QC">Quebec (QC)</option>
                  <option value="AB">Alberta (AB)</option>
                  <option value="MB">Manitoba (MB)</option>
                  <option value="SK">Saskatchewan (SK)</option>
                  <option value="NS">Nova Scotia (NS)</option>
                  <option value="NB">New Brunswick (NB)</option>
                  <option value="NL">Newfoundland (NL)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Postal Code</label>
                <input
                  type="text"
                  placeholder="M5V 2T6"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                />
              </div>
            </div>
          </div>

          {/* 3. Shipping Method */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>3. Delivery Method</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${shippingMethod === 'standard' ? 'var(--blue)' : 'var(--gray-200)'}`,
                  background: shippingMethod === 'standard' ? '#F6F9FE' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Standard Tracked Shipping</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-700)' }}>Estimated 2-4 business days</div>
                  </div>
                </div>
                <div className="mono" style={{ fontWeight: 700 }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${shippingMethod === 'express' ? 'var(--blue)' : 'var(--gray-200)'}`,
                  background: shippingMethod === 'express' ? '#F6F9FE' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Canada Post Express / Expedited</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-700)' }}>Guaranteed 1-2 business days with priority tracking</div>
                  </div>
                </div>
                <div className="mono" style={{ fontWeight: 700 }}>$9.99</div>
              </label>
            </div>
          </div>

          {/* 4. Payment Simulation */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-100)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>4. Payment Details</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                className={`btn btn-sm ${paymentMethod === 'card' ? 'btn-navy' : 'btn-ghost'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={14} /> Credit Card
              </button>
              <button
                type="button"
                className={`btn btn-sm ${paymentMethod === 'apple' ? 'btn-navy' : 'btn-ghost'}`}
                onClick={() => setPaymentMethod('apple')}
              >
                Apple Pay / Google Pay
              </button>
              <button
                type="button"
                className={`btn btn-sm ${paymentMethod === 'interac' ? 'btn-navy' : 'btn-ghost'}`}
                onClick={() => setPaymentMethod('interac')}
              >
                Interac e-Transfer
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Card Number</label>
                  <input
                    type="text"
                    placeholder="4500 •••• •••• 1234"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)', fontFamily: 'var(--font-mono), monospace' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>CVC / CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      required
                      maxLength={4}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid var(--gray-200)' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-grad btn-block" style={{ padding: '16px', fontSize: '16px' }}>
            PLACE ORDER (${grandTotal.toFixed(2)} CAD)
          </button>
        </form>

        {/* Right Summary Sidebar */}
        <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius)', padding: '24px', border: '1px solid var(--gray-100)' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
            Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', border: '1px solid var(--gray-200)' }}>
                  <ProductIcon type={item.product.iconType} size="60%" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
                    Qty: {item.quantity} · {item.selectedColor?.name}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: '13px', fontWeight: 700 }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--gray-700)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span className="mono">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--red)' }}>
                <span>Discount</span>
                <span className="mono">−${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <span className="mono">
                {shippingMethod === 'express'
                  ? '$9.99'
                  : shipping === 0
                  ? 'FREE'
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Taxes (HST/GST)</span>
              <span className="mono">${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid var(--gray-200)', paddingTop: '12px', marginTop: '4px', fontSize: '18px', fontWeight: 700, color: 'var(--navy)' }}>
              <span>Total CAD</span>
              <span className="mono">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
