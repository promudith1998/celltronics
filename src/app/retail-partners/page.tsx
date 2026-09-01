'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  Sparkles,
  ShieldCheck,
  Truck,
  Layers,
  CheckCircle2,
  MapPin,
  Search,
  ArrowRight,
  Send,
  Boxes,
  HelpCircle,
  Eye,
  Award
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function RetailPartnersPage() {
  const { showToast } = useToast();

  const [partnerForm, setPartnerForm] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'ON',
    postalCode: '',
    currentFootTraffic: '50 - 200 daily',
    displayPreference: 'countertop',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.storeName || !partnerForm.ownerName || !partnerForm.email || !partnerForm.phone) {
      showToast('Required Fields', 'Please complete the store name and contact details.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        'Retail Application Received! 🏪',
        `Thank you ${partnerForm.ownerName}. Our retail merchandising team will contact you within 24 hours regarding POS display units and opening stock packs.`,
        'success'
      );
    }, 900);
  };

  return (
    <div className="retail-partners-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #0F2A4A 60%, #17385E 100%)',
          color: '#fff',
          padding: '64px 0 72px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,26,0.3) 0%, rgba(11,99,246,0.2) 60%, transparent 80%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '780px' }}>
            <span
              style={{
                background: 'rgba(255, 122, 26, 0.2)',
                border: '1px solid rgba(255, 122, 26, 0.5)',
                color: '#FFB26B',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '20px'
              }}
            >
              <Store size={14} /> CELLCENTRAL RETAIL PARTNER PROGRAM
            </span>

            <h1
              style={{
                fontSize: 'clamp(32px, 4.2vw, 50px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '20px'
              }}
            >
              Elevate Your Storefront with Turn-Key Premium Mobile Merchandising.
            </h1>

            <p style={{ fontSize: '16.5px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '32px' }}>
              Turn high-foot-traffic space into recurring accessory profits. We provide eye-catching acrylic and spinner displays, bilingual Canadian retail packaging, guaranteed sell-through, and reliable local restocking.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href="#partner-application"
                style={{
                  background: 'linear-gradient(90deg, #FF7A1A 0%, #EA580C 100%)',
                  color: '#fff',
                  padding: '14px 30px',
                  borderRadius: '100px',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(234,88,12,0.35)'
                }}
              >
                <span>BECOME AN AUTHORIZED RETAILER</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#find-retailer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MapPin size={16} />
                <span>FIND A RETAILER</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RETAIL ADVANTAGES */}
      <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#FF7A1A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              BUILT FOR IN-STORE SUCCESS
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0B1E3D', margin: '8px 0 12px' }}>
              Everything Your Store Needs to Sell
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B' }}>
              We don&apos;t just sell products — we provide a complete in-store merchandising solution that drives impulse purchases.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {/* Box 1 */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Boxes size={24} color="#EA580C" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Complimentary POS Display Units
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Choose from compact countertop acrylic rotators or freestanding 4-sided floor spinners with pre-printed hook tags and illuminated headers.
              </p>
            </div>

            {/* Box 2 */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Award size={24} color="#0B63F6" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Bilingual Canadian Packaging
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                100% compliant English and French luxury hanging packaging with scannable UPC barcodes and clear model compatibility callouts.
              </p>
            </div>

            {/* Box 3 */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <ShieldCheck size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0B1E3D', marginBottom: '10px' }}>
                Store-Backed Warranty Service
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Customers can register purchases online on our portal. If a buyer brings a defect into your store, exchange it immediately and we credit your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FIND A RETAILER SECTION */}
      <section id="find-retailer" style={{ padding: '64px 0', background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0B63F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              STORE LOCATOR
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0B1E3D', margin: '8px 0 12px' }}>
              Find a CellCentral Authorized Retailer
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', marginBottom: '28px' }}>
              Prefer to touch and test accessories in person? Our authorized retail partner network is expanding across Canada.
            </p>

            {/* Locator Search Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#F1F5F9',
                borderRadius: '100px',
                padding: '6px 8px 6px 20px',
                border: '1.5px solid #CBD5E1',
                marginBottom: '24px'
              }}
            >
              <MapPin size={18} color="#64748B" style={{ marginRight: '10px' }} />
              <input
                type="text"
                placeholder="Enter Canadian City, Postal Code, or Province (e.g. Toronto, Vancouver, Calgary)..."
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: '#0B1E3D' }}
              />
              <button
                type="button"
                onClick={() => showToast('Retailer Directory 📍', 'Our interactive store locator map is going live across Canada. Check back soon or apply to become a retailer today!', 'info')}
                className="btn btn-navy"
                style={{ borderRadius: '100px', padding: '10px 20px', fontSize: '13px' }}
              >
                Search Stores
              </button>
            </div>

            {/* Coming Soon Notice Card */}
            <div
              style={{
                background: '#EFF6FF',
                border: '1.5px dashed #93C5FD',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1E40AF', marginBottom: '6px' }}>
                🇨🇦 Interactive Retailer Map Launching Soon
              </h4>
              <p style={{ fontSize: '13px', color: '#3B82F6', maxWidth: '520px', margin: '0 auto 12px' }}>
                We are onboarding independent wireless stores, electronics retailers, and authorized kiosks across Ontario, BC, Alberta, and Quebec.
              </p>
              <a href="#partner-application" style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textDecoration: 'none' }}>
                Want to be the exclusive CellCentral partner in your area? Apply below &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNER APPLICATION FORM */}
      <section id="partner-application" style={{ padding: '72px 0', background: '#0B1E3D', color: '#fff' }}>
        <div className="wrap">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#FF7A1A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                JOIN OUR PROGRAM
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', margin: '8px 0 10px' }}>
                Apply for Retail Partnership &amp; Store Merchandising
              </h2>
              <p style={{ fontSize: '14.5px', color: '#CBD5E1' }}>
                Tell us about your retail location. We will provide our retail display catalog and sample demonstration kits.
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
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Retail Partner Request Received!</h3>
                <p style={{ fontSize: '15px', color: '#E2E8F0', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                  Thank you, <b>{partnerForm.ownerName}</b>. We will evaluate your store location for <b>{partnerForm.storeName}</b> in {partnerForm.city || 'Canada'} and follow up with available display units and wholesale introductory packages.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-grad"
                  style={{ borderRadius: '100px', padding: '12px 32px' }}
                >
                  Submit Another Location
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePartnerSubmit}
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
                      Store / Retail Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metro Mobile & Tech"
                      value={partnerForm.storeName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, storeName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Owner / Manager Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Ross"
                      value={partnerForm.ownerName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, ownerName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@metromobile.ca"
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Store Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(604) 555-0188"
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Storefront Address
                    </label>
                    <input
                      type="text"
                      placeholder="123 Queen Street West"
                      value={partnerForm.address}
                      onChange={(e) => setPartnerForm({ ...partnerForm, address: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Toronto"
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Province
                    </label>
                    <select
                      value={partnerForm.province}
                      onChange={(e) => setPartnerForm({ ...partnerForm, province: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="ON">ON</option>
                      <option value="BC">BC</option>
                      <option value="AB">AB</option>
                      <option value="QC">QC</option>
                      <option value="MB">MB</option>
                      <option value="SK">SK</option>
                      <option value="NS">NS</option>
                      <option value="NB">NB</option>
                      <option value="NL">NL</option>
                      <option value="PE">PE</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Preferred Display Format
                    </label>
                    <select
                      value={partnerForm.displayPreference}
                      onChange={(e) => setPartnerForm({ ...partnerForm, displayPreference: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="countertop">Countertop Acrylic Spinner (24 Hooks)</option>
                      <option value="floor_stand">Freestanding 4-Sided Floor Spinner (64 Hooks)</option>
                      <option value="wall_peg">Wall Slatwall / Pegboard Header Rack</option>
                      <option value="not_sure">Unsure / Need Recommendation</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Estimated Daily Store Traffic
                    </label>
                    <select
                      value={partnerForm.currentFootTraffic}
                      onChange={(e) => setPartnerForm({ ...partnerForm, currentFootTraffic: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                    >
                      <option value="< 50 daily">&lt; 50 customers / day</option>
                      <option value="50 - 200 daily">50 - 200 customers / day</option>
                      <option value="200 - 500 daily">200 - 500 customers / day</option>
                      <option value="500+ daily">500+ customers / day (Mall / Transit)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Additional Store Details or Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what brands or device models your customers frequently ask for..."
                    value={partnerForm.comments}
                    onChange={(e) => setPartnerForm({ ...partnerForm, comments: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-block"
                  style={{
                    background: '#FF7A1A',
                    color: '#fff',
                    padding: '16px',
                    fontSize: '15px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'PROCESSING REQUEST...' : 'SUBMIT RETAIL PARTNER APPLICATION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
