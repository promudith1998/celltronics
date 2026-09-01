'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ShieldCheck,
  Truck,
  TrendingUp,
  CreditCard,
  Layers,
  Store,
  CheckCircle2,
  Download,
  Send,
  PhoneCall,
  Mail,
  FileSpreadsheet,
  ArrowRight,
  Package,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function WholesalePage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessNumber: '',
    businessType: 'repair_shop',
    storeCount: '1',
    monthlyVolume: '$1,000 - $5,000',
    city: '',
    province: 'ON',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      showToast('Missing Details', 'Please fill in all required company and contact fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        'Application Submitted! 📋',
        `Thank you ${formData.contactName}. A CellCentral B2B account specialist will review your application and send dealer pricing within 24 hours.`,
        'success'
      );
    }, 900);
  };

  const handleDownloadCatalog = () => {
    showToast('Wholesale Catalog Request Received 📥', 'The 2026 CellCentral Master Dealer Price List & Product Catalog has been sent to your email.', 'info');
  };

  return (
    <div className="wholesale-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07152E 0%, #0B1E3D 50%, #0F274E 100%)',
          color: '#fff',
          padding: '64px 0 72px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,99,246,0.35) 0%, rgba(255,122,26,0.2) 60%, transparent 80%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '20px' }}>
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
                gap: '6px'
              }}
            >
              <Briefcase size={14} /> CELLCENTRAL B2B &amp; WHOLESALE DISTRIBUTION
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '20px'
                }}
              >
                High-Margin Mobile Accessories Direct from Canadian Warehouses.
              </h1>
              <p style={{ fontSize: '16px', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '560px', marginBottom: '28px' }}>
                Join over 250+ independent wireless retailers, repair shops, and regional chains across Canada. Get access to volume dealer pricing, same-day domestic dispatch, free countertop retail displays, and dedicated account support.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="#dealer-application"
                  style={{
                    background: 'linear-gradient(90deg, #0B63F6 0%, #2563EB 100%)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    fontWeight: 800,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(11,99,246,0.35)'
                  }}
                >
                  <span>APPLY FOR DEALER ACCOUNT</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={handleDownloadCatalog}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    padding: '14px 24px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={16} />
                  <span>REQUEST 2026 PRICE LIST</span>
                </button>
              </div>
            </div>

            {/* Hero Summary Badge Grid */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#60A5FA', fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono), monospace' }}>
                  Up to 45%
                </div>
                <div style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                  Retail Dealer Margin
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#FDBA74', fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono), monospace' }}>
                  Same-Day
                </div>
                <div style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                  Canadian Shipping
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#34D399', fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono), monospace' }}>
                  Net 30
                </div>
                <div style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                  Terms for Approved Dealers
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#F472B6', fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-mono), monospace' }}>
                  1-Year
                </div>
                <div style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>
                  Direct Dealer Replacement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER WITH CELLCENTRAL WHOLESALE */}
      <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              WHOLESALE BENEFITS
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0B1E3D', margin: '8px 0 12px' }}>
              Engineered for High Resale Velocity &amp; Repeat Profit
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.5 }}>
              We eliminate the headaches of importing overseas stock. We keep inventory in Canada so you can restock in days, not months.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <TrendingUp size={24} color="#0B63F6" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Protected Margins &amp; Volume Tiers
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Tiered pricing structures ensuring healthy 40% to 55% margins on screen protectors, fast charging bricks, and rugged cases.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Truck size={24} color="#EA580C" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                100% Canadian Stock Dispatch
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Orders placed before 2:00 PM EST ship the same business day via Canada Post Expedited or courier with zero cross-border customs fees.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShieldCheck size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Instant Over-The-Counter Swaps
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                If your customer has an issue, replace it over the counter. We credit your dealer account immediately without demanding back defective units.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Store size={24} color="#7C3AED" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Free Point-of-Sale Displays
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Qualifying opening wholesale orders receive complimentary illuminated or acrylic countertop spinner fixtures ready for retail merchandising.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <CreditCard size={24} color="#DC2626" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Net 30 Invoicing &amp; EFT
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Flexible payment terms for established stores. Pay via corporate credit card, Interac e-Transfer, EFT, or pre-authorized debit.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(11,30,61,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <PhoneCall size={24} color="#0284C7" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Dedicated Canadian Rep
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Direct phone and WhatsApp line to your assigned wholesale account representative for rapid restocks and urgent custom quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VOLUME PRICING TIERS */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              TIER STRUCTURE
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0B1E3D', margin: '8px 0 12px' }}>
              Wholesale Pricing Tiers
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B' }}>
              Transparent discount schedules designed to grow alongside your retail turnover.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {/* Tier 1 */}
            <div style={{ border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '8px' }}>
                TIER 1 — STARTER DEALER
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1E3D', marginBottom: '4px' }}>Independent Stores</h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>For single wireless shops, repair counters &amp; small retail.</p>
              
              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0B1E3D' }}>30% - 35% OFF MSRP</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Minimum order: $250 / order</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155', flex: 1, marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>No long-term contracts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Free shipping on orders $400+</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Full product warranty coverage</span>
                </div>
              </div>

              <a href="#dealer-application" className="btn btn-outline" style={{ textAlign: 'center' }}>
                Apply for Tier 1
              </a>
            </div>

            {/* Tier 2 - Featured */}
            <div
              style={{
                border: '2px solid #0B63F6',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 12px 32px rgba(11,99,246,0.12)',
                background: '#fff'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '24px',
                  background: '#0B63F6',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  letterSpacing: '0.04em'
                }}
              >
                MOST POPULAR
              </div>

              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '8px' }}>
                TIER 2 — PRO RETAILER
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1E3D', marginBottom: '4px' }}>Multi-Store Chains</h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>For 2-10 locations, busy telecom dealers &amp; high volume repair.</p>
              
              <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0B63F6' }}>40% - 45% OFF MSRP</div>
                <div style={{ fontSize: '12px', color: '#1E40AF', marginTop: '2px' }}>Minimum monthly: $1,500</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155', flex: 1, marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Free acrylic countertop displays</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Net 30 Terms upon approval</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Free Express Shipping across Canada</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0B63F6" />
                  <span>Dedicated B2B Account Manager</span>
                </div>
              </div>

              <a href="#dealer-application" className="btn btn-navy" style={{ textAlign: 'center' }}>
                Apply for Tier 2 Pro
              </a>
            </div>

            {/* Tier 3 */}
            <div style={{ border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#FF7A1A', textTransform: 'uppercase', marginBottom: '8px' }}>
                TIER 3 — MASTER DISTRIBUTOR
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1E3D', marginBottom: '4px' }}>Enterprise &amp; Regional</h3>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>For large retail chains, school boards, corporate IT &amp; sub-distributors.</p>
              
              <div style={{ padding: '16px', background: '#FFF7ED', borderRadius: '10px', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#C2410C' }}>Custom Contract Pricing</div>
                <div style={{ fontSize: '12px', color: '#9A3412', marginTop: '2px' }}>Volume master case packaging</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155', flex: 1, marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#FF7A1A" />
                  <span>Floor display fixtures included</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#FF7A1A" />
                  <span>Custom SKU bundling &amp; barcodes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#FF7A1A" />
                  <span>Direct EDI &amp; automated PO fulfillment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#FF7A1A" />
                  <span>Priority access to new device release stock</span>
                </div>
              </div>

              <a href="#dealer-application" className="btn btn-outline" style={{ textAlign: 'center' }}>
                Contact Enterprise Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEALER REGISTRATION & CONTACT FORM */}
      <section id="dealer-application" style={{ padding: '72px 0', background: '#0B1E3D', color: '#fff' }}>
        <div className="wrap">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#3FA9FF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                DEALER ONBOARDING
              </span>
              <h2 style={{ fontSize: '34px', fontWeight: 900, color: '#fff', margin: '8px 0 12px' }}>
                Apply for a CellCentral Wholesale Account
              </h2>
              <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: 1.5 }}>
                Complete the application below. Accounts are usually verified and unlocked with full dealer portal access within 1 business day.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '48px 32px',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} color="#fff" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Application Received!</h3>
                <p style={{ fontSize: '15px', color: '#E2E8F0', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                  Thank you, <b>{formData.contactName}</b>. We have recorded your dealer profile for <b>{formData.businessName}</b>. Our wholesale account manager will contact you at <b>{formData.email}</b> with your tier pricing and initial wholesale catalog.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-grad"
                  style={{ borderRadius: '100px', padding: '12px 32px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '36px',
                  color: '#0B1E3D',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Business / Store Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Wireless & Repairs Inc."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Contact Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Chen"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@apexwireless.ca"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(416) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="repair_shop">Device Repair Shop</option>
                      <option value="wireless_store">Independent Wireless Store</option>
                      <option value="carrier_dealer">Carrier Authorized Retailer</option>
                      <option value="multi_chain">Regional Multi-Store Chain</option>
                      <option value="online_seller">Online / E-Commerce Retailer</option>
                      <option value="corporate">Corporate / Educational IT</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Number of Locations
                    </label>
                    <select
                      value={formData.storeCount}
                      onChange={(e) => setFormData({ ...formData, storeCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="1">1 Store</option>
                      <option value="2-4">2 - 4 Stores</option>
                      <option value="5-10">5 - 10 Stores</option>
                      <option value="10+">10+ Stores</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Est. Monthly Spend
                    </label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="< $1,000">&lt; $1,000 / mo</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000 / mo</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000 / mo</option>
                      <option value="$15,000+">$15,000+ / mo</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      City / Region
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mississauga"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                      <option value="OTHER">Territories / Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Specific Product Lines of Interest or Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what accessory categories you carry (e.g. MagSafe cases for iPhone 16, 45W PPS chargers, 9H tempered glass, POS spinners)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-navy btn-block"
                  style={{ padding: '16px', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'VERIFYING APPLICATION...' : 'SUBMIT WHOLESALE DEALER APPLICATION'}</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: '#64748B' }}>
                  🔒 Your business information is strictly confidential and protected. Backed by Canadian logistics.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
