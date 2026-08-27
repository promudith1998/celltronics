'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  Award,
  ShieldCheck,
  ChevronRight,
  Mail,
  Zap
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { subscribeNewsletterInDb } from '@/lib/supabaseService';

export default function HomePage() {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      subscribeNewsletterInDb(newsletterEmail.trim()).catch(() => {});
      showToast('Welcome to the VIP Club! 🎉', 'You have been subscribed. Check your inbox for your 15% discount code!', 'success');
      setNewsletterEmail('');
    } else {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
    }
  };

  return (
    <div>
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matching Home Page (1).png) */}
      {/* ======================================================== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07152E 0%, #0B1E3D 50%, #0F274E 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 0 56px'
        }}
      >
        {/* Neon Lighting Glow Arcs (Top Right Glow) */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,26,0.45) 0%, rgba(255,46,147,0.35) 45%, rgba(11,99,246,0.3) 70%, transparent 85%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1.3fr 0.9fr',
              gap: '24px',
              alignItems: 'center'
            }}
            className="hero-grid-custom"
          >
            {/* Left Hero Text */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(34px, 4.8vw, 56px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: '16px'
                }}
              >
                <span style={{ display: 'block', color: '#0B63F6' }}>POWER.</span>
                <span style={{ display: 'block', color: '#8B5CF6' }}>PROTECT.</span>
                <span style={{ display: 'block', color: '#FF7A1A' }}>CONNECT.</span>
              </h1>

              <p
                style={{
                  fontSize: '16px',
                  color: '#E2E8F0',
                  lineHeight: 1.45,
                  marginBottom: '28px',
                  maxWidth: '380px',
                  fontWeight: 500
                }}
              >
                Premium mobile accessories for your everyday life.
              </p>

              {/* Shop Now Gradient CTA Button */}
              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(90deg, #0B63F6 0%, #FF2E93 50%, #FF7A1A 100%)',
                  color: '#fff',
                  padding: '14px 32px',
                  borderRadius: '100px',
                  fontWeight: 800,
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(255,46,147,0.32)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <span>SHOP NOW</span>
                <ChevronRight size={18} strokeWidth={3} />
              </Link>

              {/* Carousel Pagination Dots */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '36px' }}>
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#3FA9FF',
                    cursor: 'pointer'
                  }}
                />
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer'
                  }}
                />
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer'
                  }}
                />
                <span
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            {/* Center 3D Hardware Showcase Podium */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 520 440" style={{ width: '100%', height: 'auto', maxHeight: '420px' }}>
                <defs>
                  {/* Glowing Podium */}
                  <radialGradient id="podiumGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="60%" stopColor="#0B1E3D" />
                    <stop offset="100%" stopColor="#07152E" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="neonRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3FA9FF" />
                    <stop offset="50%" stopColor="#0B63F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="heroScreenGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3FA9FF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Podium Base */}
                <ellipse cx="260" cy="365" rx="220" ry="42" fill="url(#podiumGlow)" />
                <ellipse cx="260" cy="360" rx="190" ry="32" fill="#0E244C" stroke="url(#neonRing)" strokeWidth="3.5" />
                <ellipse cx="260" cy="358" rx="160" ry="24" fill="#0A1A36" />

                {/* 1. Clear MagSafe iPhone Case (Left-Center) */}
                <g transform="translate(180, 50)">
                  {/* Case Outer Rim */}
                  <rect x="0" y="0" width="136" height="276" rx="28" fill="none" stroke="#FFFFFF" strokeWidth="4.5" opacity="0.95" />
                  <rect x="6" y="6" width="124" height="264" rx="22" fill="#07152E" opacity="0.6" />
                  {/* Camera Bump */}
                  <rect x="12" y="12" width="50" height="54" rx="14" fill="#0B1E3D" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="26" cy="27" r="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                  <circle cx="48" cy="27" r="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                  <circle cx="26" cy="49" r="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                  {/* White MagSafe Ring */}
                  <circle cx="68" cy="140" r="30" fill="none" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="68" y1="172" x2="68" y2="188" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* 2. 65W GaN Fast Charger (Center-Right) */}
                <g transform="translate(250, 140)">
                  <rect x="0" y="0" width="86" height="106" rx="14" fill="#0B132B" stroke="#475569" strokeWidth="2" />
                  <text x="32" y="44" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="18" fontWeight="800">65W</text>
                  <text x="32" y="58" fill="#3FA9FF" fontSize="9" fontWeight="700">GaN III</text>
                  {/* USB-C Ports */}
                  <rect x="56" y="24" width="20" height="8" rx="4" fill="#050914" stroke="#3FA9FF" strokeWidth="1.5" />
                  <rect x="56" y="42" width="20" height="8" rx="4" fill="#050914" stroke="#3FA9FF" strokeWidth="1.5" />
                  <rect x="56" y="60" width="20" height="8" rx="4" fill="#050914" stroke="#FF7A1A" strokeWidth="1.5" />
                  <rect x="56" y="80" width="20" height="14" rx="2" fill="#050914" stroke="#FF7A1A" strokeWidth="1.5" />
                </g>

                {/* 3. Screen Protector (Right) */}
                <g transform="translate(305, 120)">
                  <rect x="0" y="0" width="108" height="216" rx="22" fill="url(#heroScreenGlass)" stroke="url(#neonRing)" strokeWidth="3" opacity="0.9" />
                  <path d="M 0 30 L 80 0 L 108 50 L 0 160 Z" fill="#FFFFFF" opacity="0.3" />
                  <rect x="36" y="10" width="36" height="6" rx="3" fill="#000000" />
                </g>

                {/* 4. Braided Cable Loop (Bottom-Center) */}
                <path
                  d="M 255 240 C 240 320, 340 360, 310 260"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 255 240 C 240 320, 340 360, 310 260"
                  fill="none"
                  stroke="#3FA9FF"
                  strokeWidth="2.5"
                  strokeDasharray="4,4"
                  strokeLinecap="round"
                />
                {/* USB-C Head */}
                <rect x="250" y="232" width="12" height="18" rx="3" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />

                {/* 5. Auto-Clamping Car Mount (Front-Right) */}
                <g transform="translate(325, 230)">
                  <rect x="0" y="10" width="68" height="84" rx="14" fill="#0B132B" stroke="#334155" strokeWidth="2.5" />
                  <circle cx="34" cy="48" r="18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4,2" />
                  <text x="34" y="52" fill="#FFFFFF" fontSize="7" fontWeight="800" textAnchor="middle">CELLCENTRAL</text>
                  {/* Grip Clamps */}
                  <rect x="-8" y="32" width="10" height="34" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                  <rect x="66" y="32" width="10" height="34" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                  <rect x="18" y="90" width="32" height="8" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            {/* Right Trust Value Badges (Matching Home Page (1).png) */}
            <div className="hero-badges-row-custom" style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingLeft: '16px' }}>
              {/* Badge 1: 1-Year Warranty */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none'
                  }}
                >
                  <Shield size={22} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
                    1-YEAR WARRANTY
                  </h4>
                  <p style={{ fontSize: '13px', color: '#C6D2EA', margin: '3px 0 0' }}>
                    Peace of mind guaranteed
                  </p>
                </div>
              </div>

              {/* Badge 2: Canadian Support */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none',
                    fontSize: '20px'
                  }}
                >
                  🍁
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
                    CANADIAN SUPPORT
                  </h4>
                  <p style={{ fontSize: '13px', color: '#C6D2EA', margin: '3px 0 0' }}>
                    Here to help
                  </p>
                </div>
              </div>

              {/* Badge 3: Fast & Free Shipping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 'none'
                  }}
                >
                  <Truck size={22} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
                    FAST &amp; FREE SHIPPING
                  </h4>
                  <p style={{ fontSize: '13px', color: '#C6D2EA', margin: '3px 0 0' }}>
                    On orders over $49
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. "YOUR CENTRAL SOURCE FOR MOBILE ACCESSORIES" */}
      {/* ======================================================== */}
      <section style={{ padding: '48px 0 32px', background: '#FFFFFF' }}>
        <div className="wrap">
          {/* Section Header with Accent Lines */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '36px' }}>
            <div style={{ height: '3px', width: '60px', background: '#0B63F6', borderRadius: '2px' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.08em', color: '#0B1E3D', textAlign: 'center', margin: 0, textTransform: 'uppercase' }}>
              YOUR <span style={{ color: '#FF7A1A' }}>CENTRAL</span> SOURCE FOR MOBILE ACCESSORIES
            </h2>
            <div style={{ height: '3px', width: '60px', background: '#FF2E93', borderRadius: '2px' }} />
          </div>

          {/* 7 Circular Category Pills matching Home Page (1).png */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '16px',
              textAlign: 'center'
            }}
            className="cat-icons-grid"
          >
            {/* 1. CHARGERS (Green Circle) */}
            <Link href="/shop/chargers" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(34,197,94,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="#22C55E" width="30" height="30">
                  <path d="M16 7V3h-2v4h-4V3H8v4c-1.1 0-2 .9-2 2v5c0 2.2 1.8 4 4 4h1v4h2v-4h1c2.2 0 4-1.8 4-4V9c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>CHARGERS</span>
            </Link>

            {/* 2. CABLES (Blue Circle) */}
            <Link href="/shop/cables" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="#2563EB" width="30" height="30">
                  <path d="M12 2a5 5 0 0 0-5 5v5a1 1 0 0 0 2 0V7a3 3 0 0 1 6 0v5a1 1 0 0 0 2 0V7a5 5 0 0 0-5-5zM6 14v4a2 2 0 0 0 2 2h2v2h2v-2h2a2 2 0 0 0 2-2v-4H6z" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>CABLES</span>
            </Link>

            {/* 3. CASES (Purple Circle) */}
            <Link href="/shop/phone-cases" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #8B5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(139,92,246,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="#8B5CF6" width="30" height="30">
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <circle cx="12" cy="18" r="1.5" fill="#fff" />
                  <rect x="9" y="4" width="6" height="1.5" rx="0.75" fill="#fff" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>CASES</span>
            </Link>

            {/* 4. SCREEN PROTECTORS (Pink Circle) */}
            <Link href="/shop/screen-protectors" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #EC4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(236,72,153,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" width="30" height="30">
                  <rect x="7" y="2" width="10" height="20" rx="2.5" />
                  <circle cx="12" cy="4" r="1" fill="#EC4899" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em', lineHeight: 1.2 }}>SCREEN PROTECTORS</span>
            </Link>

            {/* 5. AUDIO (Orange Circle) */}
            <Link href="/shop/audio" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #F97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="#F97316" width="30" height="30">
                  <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5v-1a7 7 0 0 1 14 0v1h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>AUDIO</span>
            </Link>

            {/* 6. WIRELESS (Teal Circle) */}
            <Link href="/shop/power-banks" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #06B6D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(6,182,212,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.2" width="30" height="30">
                  <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
                  <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
                  <circle cx="12" cy="12" r="2" fill="#06B6D4" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>WIRELESS</span>
            </Link>

            {/* 7. POWER BANKS (Dark Navy Circle) */}
            <Link href="/shop/power-banks" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                className="cat-circle"
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  border: '2.5px solid #1E293B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 14px rgba(30,41,59,0.12)',
                  transition: 'transform 0.18s ease'
                }}
              >
                <svg viewBox="0 0 24 24" fill="#1E293B" width="30" height="30">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <circle cx="12" cy="8" r="1.5" fill="#3FA9FF" />
                  <circle cx="12" cy="13" r="1.5" fill="#3FA9FF" />
                  <circle cx="12" cy="18" r="1" fill="#fff" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.04em' }}>POWER BANKS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. POPULAR CATEGORIES ROW (6 Visual Product Cards) */}
      {/* ======================================================== */}
      <section style={{ padding: '32px 0 48px', background: '#FFFFFF' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '20px',
              textAlign: 'center'
            }}
            className="pop-thumb-grid"
          >
            {/* Card 1: Phone Cases */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <rect x="20" y="8" width="45" height="84" rx="12" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
                  <rect x="35" y="8" width="45" height="84" rx="12" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="50" cy="24" r="5" fill="#0F172A" />
                  <circle cx="65" cy="24" r="5" fill="#0F172A" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                PHONE CASES
              </h4>
              <Link href="/shop/phone-cases" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>

            {/* Card 2: Screen Protectors */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <rect x="25" y="10" width="50" height="80" rx="10" fill="#1E293B" />
                  <rect x="25" y="10" width="50" height="80" rx="10" fill="linear-gradient(135deg, rgba(63,169,255,0.4), rgba(255,46,147,0.4))" />
                  <rect x="20" y="5" width="55" height="85" rx="12" fill="none" stroke="#3FA9FF" strokeWidth="2.5" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                SCREEN PROTECTORS
              </h4>
              <Link href="/shop/screen-protectors" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>

            {/* Card 3: Chargers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <rect x="24" y="24" width="52" height="56" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                  <text x="32" y="48" fill="#fff" fontSize="12" fontWeight="800">65W</text>
                  <rect x="58" y="36" width="12" height="6" rx="2" fill="#3FA9FF" />
                  <rect x="58" y="48" width="12" height="6" rx="2" fill="#FF7A1A" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                CHARGERS
              </h4>
              <Link href="/shop/chargers" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>

            {/* Card 4: Cables */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <path d="M 30 80 C 30 20, 70 20, 70 80" fill="none" stroke="#1E293B" strokeWidth="8" />
                  <rect x="25" y="70" width="10" height="16" rx="2" fill="#475569" />
                  <rect x="65" y="70" width="10" height="16" rx="2" fill="#475569" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                CABLES
              </h4>
              <Link href="/shop/cables" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>

            {/* Card 5: Power Banks */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <rect x="30" y="15" width="40" height="70" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                POWER BANKS
              </h4>
              <Link href="/shop/power-banks" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>

            {/* Card 6: Car Accessories */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="pop-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  overflow: 'hidden',
                  padding: '12px'
                }}
              >
                <svg viewBox="0 0 100 100" width="75" height="75">
                  <rect x="32" y="24" width="36" height="52" rx="8" fill="#1E293B" />
                  <circle cx="50" cy="50" r="10" fill="none" stroke="#3FA9FF" strokeWidth="2" />
                  <rect x="24" y="36" width="6" height="24" rx="2" fill="#475569" />
                  <rect x="70" y="36" width="6" height="24" rx="2" fill="#475569" />
                </svg>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: '0 0 6px' }}>
                CAR ACCESSORIES
              </h4>
              <Link href="/shop/car-accessories" style={{ fontSize: '13px', fontWeight: 700, color: '#0B63F6', textDecoration: 'none' }}>
                Shop now ➔
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. TRUST / BENEFIT CARDS BAR (4 Cards Matching Mockup) */}
      {/* ======================================================== */}
      <section style={{ padding: '24px 0 48px', background: '#FFFFFF' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
              background: '#F8FAFC',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--gray-200)'
            }}
            className="trust-strip-custom"
          >
            {/* Card 1: Quality You Can Trust */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Award size={22} color="#0B1E3D" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  QUALITY YOU CAN TRUST
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  Carefully selected premium accessories.
                </p>
              </div>
            </div>

            {/* Card 2: Warranty Coverage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <ShieldCheck size={22} color="#0B63F6" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  WARRANTY COVERAGE
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  1-year warranty on all eligible products.
                </p>
              </div>
            </div>

            {/* Card 3: Easy Returns */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <RotateCcw size={22} color="#0284C7" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  EASY RETURNS
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  30-day hassle-free returns.
                </p>
              </div>
            </div>

            {/* Card 4: Customer Support */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #0B1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <Headphones size={22} color="#0B1E3D" strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0B1E3D', textTransform: 'uppercase', margin: 0 }}>
                  CUSTOMER SUPPORT
                </h4>
                <p style={{ fontSize: '12px', color: '#47506B', margin: '3px 0 0', lineHeight: 1.35 }}>
                  Local support when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FEATURED COLLECTIONS (4 Promo Cards Matching Mockup) */}
      {/* ======================================================== */}
      <section style={{ padding: '0 0 56px', background: '#FFFFFF' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0B1E3D', marginBottom: '24px', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
            FEATURED COLLECTIONS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}
            className="coll-grid-custom"
          >
            {/* Banner 1: NEW ARRIVALS */}
            <div
              style={{
                background: '#F1F5F9',
                borderRadius: '16px',
                padding: '26px 22px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', margin: '0 0 6px', textTransform: 'uppercase' }}>
                  NEW ARRIVALS
                </h3>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, maxWidth: '140px', lineHeight: 1.4 }}>
                  The latest accessories for the newest devices.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link
                  href="/shop"
                  style={{
                    display: 'inline-block',
                    background: '#0B63F6',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Side Illustration (Titanium iPhone 17) */}
              <div style={{ position: 'absolute', right: '-15px', bottom: '-20px', width: '130px', height: '170px' }}>
                <svg viewBox="0 0 100 130" width="100%" height="100%">
                  <rect x="15" y="10" width="70" height="120" rx="16" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                  <rect x="22" y="18" width="28" height="32" rx="8" fill="#64748B" />
                  <circle cx="30" cy="27" r="4.5" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="42" cy="27" r="4.5" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="30" cy="41" r="4.5" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Banner 2: MAGSAFE COLLECTION */}
            <div
              style={{
                background: '#FAF5FF',
                borderRadius: '16px',
                padding: '26px 22px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', margin: '0 0 6px', textTransform: 'uppercase' }}>
                  MAGSAFE COLLECTION
                </h3>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, maxWidth: '140px', lineHeight: 1.4 }}>
                  Snap on. Power up. Stay connected.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link
                  href="/shop/phone-cases"
                  style={{
                    display: 'inline-block',
                    background: '#7C3AED',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Side Illustration (MagSafe Clear Case) */}
              <div style={{ position: 'absolute', right: '-15px', bottom: '-20px', width: '130px', height: '170px' }}>
                <svg viewBox="0 0 100 130" width="100%" height="100%">
                  <rect x="15" y="10" width="70" height="120" rx="16" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" opacity="0.9" />
                  <circle cx="50" cy="70" r="18" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
                  <line x1="50" y1="88" x2="50" y2="100" stroke="#7C3AED" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Banner 3: FAST CHARGING ESSENTIALS */}
            <div
              style={{
                background: '#F0F9FF',
                borderRadius: '16px',
                padding: '26px 22px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', margin: '0 0 6px', textTransform: 'uppercase' }}>
                  FAST CHARGING ESSENTIALS
                </h3>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, maxWidth: '140px', lineHeight: 1.4 }}>
                  Charge smarter. Save time.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link
                  href="/shop/chargers"
                  style={{
                    display: 'inline-block',
                    background: '#0B63F6',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Side Illustration (GaN Charger & Cable) */}
              <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', width: '130px', height: '160px' }}>
                <svg viewBox="0 0 100 130" width="100%" height="100%">
                  <rect x="25" y="30" width="60" height="70" rx="10" fill="#0B1E3D" stroke="#3FA9FF" strokeWidth="2" />
                  <path d="M 40 100 C 40 120, 10 110, 10 80" fill="none" stroke="#0B1E3D" strokeWidth="6" />
                </svg>
              </div>
            </div>

            {/* Banner 4: CLEARANCE DEALS */}
            <div
              style={{
                background: '#FFF7ED',
                borderRadius: '16px',
                padding: '26px 22px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', margin: '0 0 6px', textTransform: 'uppercase' }}>
                  CLEARANCE DEALS
                </h3>
                <p style={{ fontSize: '12.5px', color: '#47506B', margin: 0, maxWidth: '140px', lineHeight: 1.4 }}>
                  Top products. Unbeatable prices.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link
                  href="/deals"
                  style={{
                    display: 'inline-block',
                    background: '#FF5722',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Side Illustration (Red Discount Price Tag) */}
              <div style={{ position: 'absolute', right: '5px', bottom: '10px', width: '100px', height: '140px' }}>
                <svg viewBox="0 0 100 130" width="100%" height="100%">
                  <path d="M 25 15 L 75 15 L 90 45 L 90 115 L 10 115 L 10 45 Z" fill="#EF4444" rx="6" />
                  <circle cx="50" cy="30" r="5" fill="#FFF7ED" />
                  <text x="50" y="85" fill="#FFFFFF" fontSize="42" fontWeight="900" textAnchor="middle" fontFamily="var(--font-space)">%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TOP BRANDS WE CARRY */}
      {/* ======================================================== */}
      <section style={{ padding: '0 0 56px', background: '#FFFFFF' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '32px', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
            TOP BRANDS WE CARRY
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '28px 40px',
              padding: '0 20px',
              marginBottom: '32px'
            }}
            className="brand-logos-row"
          >
            {/* ANKER */}
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0B63F6', letterSpacing: '0.04em', fontFamily: 'var(--font-space)' }}>
              ANKER
            </span>

            {/* UGREEN */}
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#16A34A', letterSpacing: '0.04em', fontFamily: 'var(--font-space)' }}>
              UGREEN
            </span>

            {/* BASEUS */}
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#111827', letterSpacing: '0.05em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ border: '2.5px solid #111827', borderRadius: '5px', padding: '0 4px', fontSize: '18px' }}>B</span>
              <span>BASEUS</span>
            </span>

            {/* ESR */}
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0EA5E9', letterSpacing: '0.08em', fontFamily: 'var(--font-space)' }}>
              ESR
            </span>

            {/* SPIGEN */}
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#111827', letterSpacing: '0.02em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#FF7A1A' }}>❖</span>
              <span>spigen</span>
            </span>

            {/* TORRAS */}
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#FF7A1A', letterSpacing: '0.04em', fontFamily: 'var(--font-space)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>⊤</span>
              <span>TORRAS</span>
            </span>

            {/* SAMSUNG */}
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#1E3A8A', letterSpacing: '0.08em', fontFamily: 'var(--font-space)' }}>
              SAMSUNG
            </span>
          </div>

          <Link
            href="/brands"
            style={{
              fontSize: '14px',
              fontWeight: 800,
              color: '#0B63F6',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em'
            }}
          >
            <span>VIEW ALL BRANDS</span>
            <span>➔</span>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. NEWSLETTER / "STAY IN THE LOOP" BANNER */}
      {/* ======================================================== */}
      <section
        style={{
          background: 'linear-gradient(90deg, #0B63F6 0%, #7C3AED 35%, #FF2E93 70%, #FF7A1A 100%)',
          padding: '36px 0',
          color: '#fff'
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
            className="nl-strip-custom"
          >
            {/* Left: Mail Icon & Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none'
                }}
              >
                <Mail size={26} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  STAY IN THE LOOP
                </h3>
                <p style={{ fontSize: '13px', opacity: 0.95, margin: '2px 0 0', color: '#fff' }}>
                  Get exclusive deals, new arrivals and special offers.
                </p>
              </div>
            </div>

            {/* Center: Email Subscription Form */}
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '460px' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: '#0B1E3D',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#6366F1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontWeight: 800,
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Right: Social Media Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                FOLLOW US
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#fff' }}>
                  <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#fff' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="18" height="18">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: '#fff' }}>
                  <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: '#fff' }}>
                  <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
