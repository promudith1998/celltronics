'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Store,
  Globe,
  Printer,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { CATEGORIES } from '@/data/products';

export default function WarrantyRegistrationPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    province: 'ON',
    postalCode: '',
    purchaseChannel: 'online', // 'online' | 'retail_partner' | 'other'
    retailerName: '',
    orderOrReceiptNumber: '',
    productCategory: 'phone-cases',
    productName: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    serialNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredCert, setRegisteredCert] = useState<{
    id: string;
    date: string;
    expiryDate: string;
    product: string;
    customer: string;
    channel: string;
  } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.orderOrReceiptNumber || !formData.productName) {
      showToast('Missing Fields', 'Please complete all required fields including receipt number.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const regId = `CC-WARR-${Math.floor(100000 + Math.random() * 900000)}`;
      const pDate = new Date(formData.purchaseDate || Date.now());
      const expDate = new Date(pDate);
      expDate.setFullYear(pDate.getFullYear() + 1);

      setRegisteredCert({
        id: regId,
        date: pDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }),
        expiryDate: expDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }),
        product: formData.productName,
        customer: formData.fullName,
        channel: formData.purchaseChannel === 'retail_partner' ? (formData.retailerName || 'Authorized Retail Store') : 'CellCentral.ca Online Store'
      });

      showToast(
        'Warranty Registered! 🛡️',
        `Your 1-Year Canadian Warranty Certificate (${regId}) is now active.`,
        'success'
      );
    }, 850);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="warranty-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07152E 0%, #0B1E3D 50%, #0F274E 100%)',
          color: '#fff',
          padding: '56px 0 64px',
          position: 'relative'
        }}
      >
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            <span
              style={{
                background: 'rgba(11, 99, 246, 0.25)',
                border: '1px solid rgba(11, 99, 246, 0.5)',
                color: '#93C5FD',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px'
              }}
            >
              <FileCheck2 size={14} /> CANADIAN PRODUCT &amp; WARRANTY PROTECTION
            </span>

            <h1
              style={{
                fontSize: 'clamp(30px, 3.8vw, 46px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '16px'
              }}
            >
              Register Your CellCentral Product
            </h1>

            <p style={{ fontSize: '15.5px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Whether you bought your accessory directly on CellCentral.ca or through one of our authorized Canadian retail store partners, register here to activate your comprehensive 1-Year Replacement Warranty and priority customer support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REGISTRATION FORM OR DIGITAL CERTIFICATE */}
      <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
        <div className="wrap">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {registeredCert ? (
              /* DIGITAL WARRANTY CERTIFICATE */
              <div
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  border: '2px solid #0B63F6',
                  padding: '36px',
                  boxShadow: '0 20px 50px rgba(11,99,246,0.15)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed #E2E8F0', paddingBottom: '20px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      OFFICIAL DIGITAL CERTIFICATE
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0B1E3D', margin: '4px 0' }}>
                      1-Year Canadian Warranty Certificate
                    </h2>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      Registration ID: <b style={{ fontFamily: 'var(--font-mono), monospace', color: '#0B63F6' }}>{registeredCert.id}</b>
                    </div>
                  </div>

                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={32} color="#0B63F6" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', background: '#F8FAFC', padding: '20px', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Registered Owner</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B1E3D', marginTop: '2px' }}>{registeredCert.customer}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Purchase Source</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0B1E3D', marginTop: '2px' }}>{registeredCert.channel}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Covered Product</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0B1E3D', marginTop: '2px' }}>{registeredCert.product}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Warranty Expiration</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{registeredCert.expiryDate}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.6, marginBottom: '28px' }}>
                  <b>Coverage Details:</b> Covers all manufacturing defects, premature material degradation, charging circuit failures, and connector issues for 365 days from original purchase. To claim replacement support, contact Canadian customer care with your Registration ID.
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn btn-navy"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Printer size={16} />
                    <span>Print / Save PDF Certificate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisteredCert(null)}
                    className="btn btn-outline"
                  >
                    Register Another Product
                  </button>
                </div>
              </div>
            ) : (
              /* REGISTRATION FORM */
              <form
                onSubmit={handleRegister}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '36px',
                  boxShadow: '0 8px 30px rgba(11,30,61,0.06)',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                    1-Year Product Registration Form
                  </h2>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
                    Takes less than 1 minute. Free automatic activation for all Canadian customers.
                  </p>
                </div>

                {/* Purchase Channel Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                    Where did you purchase this item? *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, purchaseChannel: 'online' })}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: formData.purchaseChannel === 'online' ? '2px solid #0B63F6' : '1.5px solid #E2E8F0',
                        background: formData.purchaseChannel === 'online' ? '#EFF6FF' : '#fff',
                        color: formData.purchaseChannel === 'online' ? '#0B63F6' : '#0B1E3D',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Globe size={18} />
                      <span>CellCentral.ca Online</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, purchaseChannel: 'retail_partner' })}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: formData.purchaseChannel === 'retail_partner' ? '2px solid #0B63F6' : '1.5px solid #E2E8F0',
                        background: formData.purchaseChannel === 'retail_partner' ? '#EFF6FF' : '#fff',
                        color: formData.purchaseChannel === 'retail_partner' ? '#0B63F6' : '#0B1E3D',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Store size={18} />
                      <span>Retail Store Partner</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, purchaseChannel: 'other' })}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: formData.purchaseChannel === 'other' ? '2px solid #0B63F6' : '1.5px solid #E2E8F0',
                        background: formData.purchaseChannel === 'other' ? '#EFF6FF' : '#fff',
                        color: formData.purchaseChannel === 'other' ? '#0B63F6' : '#0B1E3D',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={18} />
                      <span>Other Canadian Retailer</span>
                    </button>
                  </div>
                </div>

                {/* Retailer Name (if in-store) */}
                {formData.purchaseChannel !== 'online' && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Retailer / Store Name &amp; Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wireless Plus Toronto or The Tech Counter Vancouver"
                      value={formData.retailerName}
                      onChange={(e) => setFormData({ ...formData, retailerName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                )}

                {/* Customer Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.ca"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(416) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Province
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="ON">Ontario (ON)</option>
                      <option value="BC">British Columbia (BC)</option>
                      <option value="AB">Alberta (AB)</option>
                      <option value="QC">Quebec (QC)</option>
                      <option value="MB">Manitoba (MB)</option>
                      <option value="SK">Saskatchewan (SK)</option>
                      <option value="NS">Nova Scotia (NS)</option>
                      <option value="NB">New Brunswick (NB)</option>
                      <option value="NL">Newfoundland (NL)</option>
                      <option value="PE">Prince Edward Island (PE)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="M5V 2T6"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Product Category *
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Product Name / Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UltraGlass 9H Screen Protector for iPhone 16 Pro"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Order # or Store Receipt # *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CC-98421 or Store Rec #1049"
                      value={formData.orderOrReceiptNumber}
                      onChange={(e) => setFormData({ ...formData, orderOrReceiptNumber: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Purchase Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-navy btn-block"
                  style={{ padding: '16px', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <ShieldCheck size={18} />
                  <span>{isSubmitting ? 'ACTIVATING CANADIAN WARRANTY...' : 'ACTIVATE 1-YEAR CANADIAN WARRANTY'}</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: '#64748B' }}>
                  🍁 Backed by CellCentral Canadian Distribution. Free replacement on manufacturing defects.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
