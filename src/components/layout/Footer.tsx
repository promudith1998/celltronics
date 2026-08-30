import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#FFFFFF', color: '#47506B', borderTop: '1px solid var(--gray-200)', paddingTop: '56px', paddingBottom: '32px' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr repeat(4, 1fr)',
            gap: '36px',
            paddingBottom: '48px',
            borderBottom: '1px solid var(--gray-200)'
          }}
          className="foot-grid-custom"
        >
          {/* Brand Info */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', marginBottom: '18px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/images/logo.png"
                alt="CellCentral Logo"
                width={190}
                height={54}
                style={{ height: '54px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  <span style={{ color: '#0B63F6' }}>CELL</span>
                  <span style={{ color: '#FF7A1A' }}>CENTRAL</span>
                </div>
                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', color: '#0B1E3D', marginTop: '3px' }}>
                  MOBILE ACCESSORIES
                </div>
              </div>
            </Link>
            <p style={{ fontSize: '13.5px', color: '#47506B', lineHeight: 1.5, marginTop: '14px', maxWidth: '280px' }}>
              Your one-stop shop for premium mobile accessories in Canada.
            </p>
            <div style={{ fontSize: '12px', color: '#8891A5', marginTop: '20px' }}>
              © 2026 CellCentral.ca | All rights reserved.
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SHOP
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/shop/phone-cases" style={{ color: '#47506B', textDecoration: 'none' }}>Phone Cases</Link>
              <Link href="/shop/screen-protectors" style={{ color: '#47506B', textDecoration: 'none' }}>Screen Protectors</Link>
              <Link href="/shop/chargers" style={{ color: '#47506B', textDecoration: 'none' }}>Chargers</Link>
              <Link href="/shop/cables" style={{ color: '#47506B', textDecoration: 'none' }}>Cables</Link>
              <Link href="/shop/power-banks" style={{ color: '#47506B', textDecoration: 'none' }}>Power Banks</Link>
              <Link href="/shop/audio" style={{ color: '#47506B', textDecoration: 'none' }}>Audio</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>All Accessories</Link>
              <Link href="/deals" style={{ color: '#FF3D5A', fontWeight: 700, textDecoration: 'none' }}>Deals</Link>
            </div>
          </div>

          {/* CUSTOMER SERVICE Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              CUSTOMER SERVICE
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Contact Us</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Shipping Information</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Returns &amp; Exchanges</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Warranty</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>FAQs</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Track Your Order</Link>
            </div>
          </div>

          {/* ABOUT US Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              ABOUT US
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Our Story</Link>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Why CellCentral</Link>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Become a Retail Partner</Link>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Bulk Orders</Link>
              <Link href="/brands" style={{ color: '#47506B', textDecoration: 'none' }}>Careers</Link>
            </div>
          </div>

          {/* ACCOUNT Column */}
          <div>
            <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              ACCOUNT
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>My Account</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Order History</Link>
              <Link href="/wishlist" style={{ color: '#47506B', textDecoration: 'none' }}>Wishlist</Link>
              <Link href="/shop" style={{ color: '#47506B', textDecoration: 'none' }}>Newsletter</Link>
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
          <div>© 2026 CellCentral Canada. Built for fast performance &amp; high durability.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/shop" style={{ color: '#8891A5', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/shop" style={{ color: '#8891A5', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/shop" style={{ color: '#8891A5', textDecoration: 'none' }}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
