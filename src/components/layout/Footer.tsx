import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          {/* Brand Info */}
          <div className="foot-brand">
            <div className="logo">
              <Image
                src="/images/logo-footer.png"
                alt="CellCentral"
                width={180}
                height={40}
                style={{ objectFit: 'contain', width: 'auto', height: '36px' }}
              />
            </div>
            <p>Your premier destination for high-performance mobile accessories and power solutions in Canada.</p>
            <div className="foot-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                  <path d="M13.5 21v-7.5H16l.5-3H13.5V8.2c0-.9.3-1.5 1.6-1.5H16.6V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7v3H10.2V21z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" width="16" height="16">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="1" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
                  <path d="M10 15l6-3-6-3z" />
                  <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" fill="none" stroke="#fff" strokeWidth="1.6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="foot-col">
            <h5>Shop</h5>
            <Link href="/shop/phone-cases">Phone Cases</Link>
            <Link href="/shop/screen-protectors">Screen Protectors</Link>
            <Link href="/shop/chargers">Fast Chargers</Link>
            <Link href="/shop/cables">Braided Cables</Link>
            <Link href="/shop/power-banks">MagSafe Power Banks</Link>
            <Link href="/shop/audio">Wireless Audio</Link>
            <Link href="/deals">Special Deals</Link>
          </div>

          {/* Customer Service */}
          <div className="foot-col">
            <h5>Customer Support</h5>
            <Link href="/shop">Shipping Information</Link>
            <Link href="/shop">Returns &amp; Exchanges</Link>
            <Link href="/shop">1-Year Warranty Claim</Link>
            <Link href="/shop">Track Your Order</Link>
            <Link href="/shop">Frequently Asked Questions</Link>
            <Link href="/shop">Contact Canadian Support</Link>
          </div>

          {/* Company */}
          <div className="foot-col">
            <h5>About Us</h5>
            <Link href="/brands">Our Story</Link>
            <Link href="/brands">Why CellCentral</Link>
            <Link href="/brands">Certified Brand Partners</Link>
            <Link href="/brands">B2B &amp; Bulk Orders</Link>
            <Link href="/brands">Eco &amp; Recycling</Link>
          </div>

          {/* Guarantees */}
          <div className="foot-col">
            <h5>Our Promise</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#AEBEDD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--blue-light)" />
                <span>Free Shipping over $49</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#1EA672" />
                <span>1-Year Peace of Mind</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={16} color="var(--orange)" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="foot-bottom">
          <div>© {new Date().getFullYear()} CellCentral / Celtronics. All rights reserved. Proudly Canadian 🇨🇦</div>
          <div>
            <Link href="/shop">Privacy Policy</Link>
            <Link href="/shop">Terms of Service</Link>
            <Link href="/shop">PCI-DSS Secure Checkout</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
