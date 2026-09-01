import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, Sparkles, Building2, Store, FileCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#FFFFFF', color: '#47506B', borderTop: '1px solid var(--gray-200)', paddingTop: '56px', paddingBottom: '32px' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 1fr',
            gap: '32px',
            paddingBottom: '48px',
            borderBottom: '1px solid var(--gray-200)'
          }}
          className="foot-grid-custom"
        >
          {/* Brand Info */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/images/logo.png"
                alt="CellCentral Logo"
                width={190}
                height={54}
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  <span style={{ color: '#0B63F6' }}>CELL</span>
                  <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
                </div>
                <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', color: '#0B1E3D', marginTop: '3px' }}>
                  MOBILE ACCESSORIES &amp; DISTRIBUTION
                </div>
              </div>
            </Link>
            <p style={{ fontSize: '13.5px', color: '#47506B', lineHeight: 1.5, marginTop: '12px', maxWidth: '280px' }}>
              Canada’s premier destination for high-durability mobile accessories, wholesale dealer supply, and retail partner merchandising.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px', fontSize: '12px', color: '#0B1E3D', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#1EA672" />
                <span>1-Year Canadian Warranty on all products</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#0B63F6" />
                <span>Fast Canadian Warehouse Dispatch</span>
              </div>
            </div>
          </div>

          {/* SHOP CATEGORIES Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SHOP ACCESSORIES
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/shop/phone-cases" style={{ color: '#47506B', textDecoration: 'none' }}>Phone Cases</Link>
              <Link href="/shop/screen-protectors" style={{ color: '#47506B', textDecoration: 'none' }}>Screen Protectors</Link>
              <Link href="/shop/chargers" style={{ color: '#47506B', textDecoration: 'none' }}>GaN Fast Chargers</Link>
              <Link href="/shop/cables" style={{ color: '#47506B', textDecoration: 'none' }}>Braided Cables</Link>
              <Link href="/shop/power-banks" style={{ color: '#47506B', textDecoration: 'none' }}>Power Banks</Link>
              <Link href="/shop/audio" style={{ color: '#47506B', textDecoration: 'none' }}>Wireless Audio</Link>
              <Link href="/shop/car-accessories" style={{ color: '#47506B', textDecoration: 'none' }}>Car Mounts &amp; Power</Link>
              <Link href="/deals" style={{ color: '#FF3D5A', fontWeight: 700, textDecoration: 'none' }}>Special Deals</Link>
            </div>
          </div>

          {/* SHOP BY DEVICE Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SHOP BY DEVICE
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/shop/device/iphone" style={{ color: '#47506B', textDecoration: 'none', fontWeight: 600 }}>Apple iPhone Series</Link>
              <Link href="/shop?q=iPhone+16" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '12.5px' }}>• iPhone 16 Pro / Max</Link>
              <Link href="/shop?q=iPhone+15" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '12.5px' }}>• iPhone 15 Series</Link>
              <Link href="/shop/device/samsung-galaxy" style={{ color: '#47506B', textDecoration: 'none', fontWeight: 600, marginTop: '4px' }}>Samsung Galaxy</Link>
              <Link href="/shop?q=Galaxy+S25" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '12.5px' }}>• Galaxy S25 / Ultra</Link>
              <Link href="/shop?q=Galaxy+S24" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '12.5px' }}>• Galaxy S24 Series</Link>
              <Link href="/shop/device/google-pixel" style={{ color: '#47506B', textDecoration: 'none', fontWeight: 600, marginTop: '4px' }}>Google Pixel</Link>
              <Link href="/shop?q=Pixel+9" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '12.5px' }}>• Pixel 9 / Pro / XL</Link>
            </div>
          </div>

          {/* WHOLESALE & PARTNERS Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              B2B &amp; DISTRIBUTION
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/wholesale" style={{ color: '#0B63F6', fontWeight: 700, textDecoration: 'none' }}>
                Wholesale Portal
              </Link>
              <Link href="/wholesale" style={{ color: '#47506B', textDecoration: 'none' }}>Dealer Registration</Link>
              <Link href="/wholesale" style={{ color: '#47506B', textDecoration: 'none' }}>Volume Pricing &amp; Net-30</Link>
              <Link href="/retail-partners" style={{ color: '#FF7A1A', fontWeight: 700, textDecoration: 'none', marginTop: '4px' }}>
                Retail Partner Program
              </Link>
              <Link href="/retail-partners" style={{ color: '#47506B', textDecoration: 'none' }}>In-Store POP Displays</Link>
              <Link href="/retail-partners" style={{ color: '#47506B', textDecoration: 'none' }}>Find a Retailer (Coming Soon)</Link>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Ecosystem Compatibility</Link>
            </div>
          </div>

          {/* CUSTOMER CARE & WARRANTY Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SUPPORT &amp; CARE
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/warranty-registration" style={{ color: '#0B63F6', fontWeight: 700, textDecoration: 'none' }}>
                Register Warranty
              </Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Track Your Order</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Shipping &amp; Delivery</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Returns Policy</Link>
              <Link href="/wishlist" style={{ color: '#47506B', textDecoration: 'none' }}>My Wishlist</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Contact Canadian Support</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Privacy & Terms */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '20px',
            fontSize: '12px',
            color: '#8891A5'
          }}
        >
          <div>© 2026 CellCentral Canada. Built for fast performance, high durability &amp; wholesale distribution.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/shop" style={{ color: '#8891A5', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/shop" style={{ color: '#8891A5', textDecoration: 'none' }}>Terms of Wholesale &amp; Service</Link>
            <Link href="/warranty-registration" style={{ color: '#8891A5', textDecoration: 'none' }}>Warranty Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
