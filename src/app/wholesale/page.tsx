'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  Store,
  ShieldCheck,
  Truck,
  Layers,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  Award,
  Building2,
  ChevronDown,
  ChevronUp,
  MapPin,
  TrendingUp,
  CreditCard,
  Phone,
  Mail,
  FileCheck2,
  Package,
  Zap,
  Cable,
  Smartphone,
  Sparkles,
  ShoppingBag,
  Clock,
  ExternalLink,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function WholesaleRetailProgramPage() {
  const { showToast } = useToast();

  // Application Form State
  const [formData, setFormData] = useState({
    businessName: '',
    operatingName: '',
    businessType: 'Cellphone Retail Store',
    locationCount: '1',
    website: '',
    address: '',
    city: '',
    province: 'ON',
    postalCode: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    purchasingBudget: '$1,000-$5,000',
    productsOfInterest: ['Phone Cases', 'Screen Protectors'] as string[],
    displayInterest: 'Need More Information',
    preferredCategory: 'Starter Retail Partner',
    questions: '',
    referralSource: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Accordion state for 16 FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const handleProductInterestToggle = (product: string) => {
    setFormData(prev => {
      const exists = prev.productsOfInterest.includes(product);
      if (product === 'All Available Categories') {
        return {
          ...prev,
          productsOfInterest: exists ? [] : ['All Available Categories', 'Phone Cases', 'Screen Protectors', 'USB-C Chargers', 'Charging Cables']
        };
      }
      const updated = exists
        ? prev.productsOfInterest.filter(p => p !== product && p !== 'All Available Categories')
        : [...prev.productsOfInterest.filter(p => p !== 'All Available Categories'), product];
      return { ...prev, productsOfInterest: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.businessName ||
      !formData.businessType ||
      !formData.locationCount ||
      !formData.address ||
      !formData.city ||
      !formData.province ||
      !formData.postalCode ||
      !formData.contactName ||
      !formData.email ||
      !formData.phone
    ) {
      showToast('Required Information Missing', 'Please complete all required fields (*).', 'warning');
      return;
    }

    if (!formData.consent) {
      showToast('Consent Required', 'Please confirm your consent to process your application in accordance with our Privacy Policy.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        'Application Submitted Successfully! 📋',
        `Thank you ${formData.contactName}. Your CellCentral Retail Program application has been received and will be reviewed by our wholesale account team within 24–48 hours.`,
        'success'
      );
    }, 1100);
  };

  const scrollToApply = (tier?: string) => {
    if (tier) {
      setFormData(prev => ({ ...prev, preferredCategory: tier }));
    }
    const el = document.getElementById('retail-partner-application');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('product-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDisplays = () => {
    setFormData(prev => ({ ...prev, displayInterest: 'Yes' }));
    const el = document.getElementById('retail-display-program');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 16 FAQs from Developer Brief
  const faqs = [
    {
      q: '1. Who can apply for the CellCentral Retail Program?',
      a: 'Registered Canadian businesses involved in retail, mobile accessories, electronics, device repair, convenience retail, online commerce, or regional distribution may apply. All applications are subject to business verification and approval.'
    },
    {
      q: '2. Do I need to open a CellCentral-branded store?',
      a: 'No. The CellCentral Retail Program is designed specifically for independently operated businesses. You continue selling under your own existing store name, branding, and identity.'
    },
    {
      q: '3. Is there a franchise fee?',
      a: 'No. Standard independent retail partner accounts do not require any CellCentral franchise fee or ongoing royalty fees under the wholesale purchasing model.'
    },
    {
      q: '4. Is there a minimum opening order?',
      a: 'Minimum order requirements may vary depending on the products and partner category. Approved applicants will receive the applicable purchasing terms and order thresholds during onboarding.'
    },
    {
      q: '5. Can I order different product categories together?',
      a: 'Yes. Mixed-product orders are supported across phone cases, screen protectors, USB-C chargers, and cables, subject to product packaging, master pack multiples, and stock availability.'
    },
    {
      q: '6. How do I access wholesale pricing?',
      a: 'Approved retail partners will receive access to their assigned wholesale pricing and dealer portal through the designated retail ordering system once their account is verified.'
    },
    {
      q: '7. Do you ship across Canada?',
      a: 'Yes. CellCentral serves approved retail partners across all Canadian provinces and territories. Shipping options, carriers, freight subsidies, and delivery estimates depend on destination and order volume.'
    },
    {
      q: '8. Can I purchase for multiple retail locations?',
      a: 'Yes. Multi-location retailers and dealer groups may apply for accounts appropriate to their collective purchasing volume, with coordinated billing and centralized or branch-level drop-shipping.'
    },
    {
      q: '9. Are retail display stands available?',
      a: 'Yes. Selected countertop and freestanding floor display solutions may be offered to qualifying retail partners under approved purchasing commitments and commercial arrangements.'
    },
    {
      q: '10. Do you offer payment terms?',
      a: 'Approved business customers may be considered for Net credit terms (e.g., Net-30) following a formal business and credit review. Credit approval, credit limits, and payment deadlines are determined separately.'
    },
    {
      q: '11. What happens if a product is defective?',
      a: 'Defective-product claims are handled promptly according to applicable CellCentral manufacturer warranties and our streamlined Canadian B2B return/replacement policy.'
    },
    {
      q: '12. Can I sell CellCentral products online?',
      a: 'Online retailers with verified e-commerce stores may apply. Approved sales channels, pricing integrity guidelines, and marketplace policies will be detailed in your partner terms.'
    },
    {
      q: '13. Can I become a regional distributor?',
      a: 'Yes. Established distribution businesses with larger volume commitments may enquire about Tier 3 Distribution Partner terms, bulk master-carton pricing, and regional supply arrangements.'
    },
    {
      q: '14. Can I sell other brands alongside CellCentral?',
      a: 'Yes. The independent retail partner model does not require exclusive brand stocking. You have full discretion to merchandise other complementary brands alongside CellCentral in your store.'
    },
    {
      q: '15. How long does account approval take?',
      a: 'Account approval typically takes 1 to 2 business days, depending on the completeness of your submitted business information, tax verification, and order requirements.'
    },
    {
      q: '16. How do I get started?',
      a: 'Simply complete the online Retail Partner Application form below. Our B2B commercial team will review your application, verify your business credentials, and reach out with your dealer account access.'
    }
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'inherit' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#071328', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Retail Program (Wholesale)' }
            ]}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#94A3B8' }}>
            <span>🇨🇦 Canadian Supplier &amp; Nationwide Fulfillment</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <Link
              href="/retail-partners"
              style={{ color: '#FF7A1A', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              Looking for Turnkey Franchise Stores? <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* IMPORTANT PROGRAM DISTINCTION BANNER */}
      <div
        style={{
          background: 'linear-gradient(90deg, #091E42 0%, #0B326B 100%)',
          borderBottom: '1px solid #1E40AF',
          color: '#fff',
          padding: '12px 0'
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                background: '#0B63F6',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}
            >
              PROGRAM GUIDE
            </span>
            <span style={{ fontSize: '13px', color: '#E2E8F0' }}>
              <strong>CellCentral Retail Program:</strong> For independent store owners selling premium accessories under your own business name. Zero franchise fees.
            </span>
          </div>
          <Link
            href="/retail-partners"
            style={{
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#FFD8A8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              background: 'rgba(255,122,26,0.18)',
              border: '1px solid rgba(255,122,26,0.4)',
              borderRadius: '6px'
            }}
          >
            Want to open a CellCentral-branded Franchise store? View Franchise Program <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #061124 0%, #0B1E3D 50%, #0E2954 100%)',
          color: '#fff',
          padding: '64px 0 80px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,99,246,0.25) 0%, rgba(255,122,26,0.15) 50%, transparent 75%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(11,99,246,0.2)',
                  border: '1px solid rgba(147,197,253,0.3)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#93C5FD',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '18px'
                }}
              >
                <Store size={14} color="#60A5FA" />
                CellCentral Retail Program | Wholesale Canada
              </div>

              <h1
                style={{
                  fontSize: 'clamp(28px, 3.8vw, 44px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                  color: '#fff'
                }}
              >
                Grow Your Retail Business with <span style={{ color: '#0B63F6' }}>Cell</span><span style={{ color: '#FF7A1A' }}>Central</span>
              </h1>

              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#FDBA74',
                  marginBottom: '16px'
                }}
              >
                Your Store. Your Business. Our Premium Products.
              </div>

              <p
                style={{
                  fontSize: '15.5px',
                  lineHeight: 1.6,
                  color: '#CBD5E1',
                  marginBottom: '14px',
                  fontWeight: 500
                }}
              >
                <strong>Premium Mobile Accessories. Competitive Wholesale Pricing. Nationwide Opportunities.</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.55, marginBottom: '28px' }}>
                <p>
                  CellCentral is building a nationwide network of independent retail partners, providing Canadian businesses with access to premium-quality mobile accessories at competitive wholesale prices.
                </p>
                <p>
                  The CellCentral Retail Program is designed for cellphone retailers, repair shops, electronics stores, convenience stores, online retailers, and regional distributors looking to expand their product offerings and create additional sales opportunities.
                </p>
                <p>
                  As an authorized CellCentral retail partner, you continue operating under your own business name, maintaining complete ownership and independence while purchasing CellCentral products at approved wholesale prices.
                </p>
                <p>
                  Whether you operate a single retail store or manage multiple locations, CellCentral aims to make product sourcing, inventory replenishment, and wholesale purchasing more convenient.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
                <button
                  onClick={() => scrollToApply()}
                  style={{
                    background: 'linear-gradient(135deg, #0B63F6 0%, #004ecc 100%)',
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(11,99,246,0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Briefcase size={17} /> BECOME A RETAIL PARTNER
                </button>

                <button
                  onClick={scrollToProducts}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    padding: '14px 26px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Package size={17} /> EXPLORE OUR PRODUCTS
                </button>
              </div>

              {/* Program Highlights Pill Row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  color: '#CBD5E1'
                }}
              >
                <span style={{ fontWeight: 700, color: '#38BDF8' }}>Program Highlights:</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} color="#22C55E" /> Independent Ownership
                </span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} color="#22C55E" /> Competitive Wholesale Pricing
                </span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} color="#22C55E" /> Premium Products
                </span>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} color="#22C55E" /> Canada-Wide Opportunities
                </span>
              </div>

              <p style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '10px', fontStyle: 'italic' }}>
                * Retail partner accounts, pricing, and benefits are subject to business verification and approval.
              </p>
            </div>

            {/* Right Concept Visual (City Mobile Accessories Store) */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  background: '#07152E'
                }}
              >
                <Image
                  src="/images/city-mobile-store.png"
                  alt="City Mobile Accessories Store - Authorized CellCentral Retail Partner Concept"
                  width={800}
                  height={500}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  priority
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 20px',
                    background: 'linear-gradient(to top, rgba(7,21,46,0.95) 0%, rgba(7,21,46,0.4) 70%, transparent 100%)',
                    color: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                        Independent Storefront Merchandising
                      </div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                        Keep your store name while stocking high-margin CellCentral products
                      </div>
                    </div>
                    <span
                      style={{
                        background: '#0B63F6',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      B2B Partner Concept
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Benefit Card 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '-20px',
                  background: '#0B1E3D',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
                  zIndex: 3
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FF7A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>100% Independent</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>No franchise fee or royalties</div>
                </div>
              </div>

              {/* Floating Benefit Card 2 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '-16px',
                  background: '#0B1E3D',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
                  zIndex: 3
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>Canadian Fulfillment</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Fast dispatch across provinces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01. WHY JOIN THE CELLCENTRAL RETAIL PROGRAM? */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              01. WHY JOIN THE CELLCENTRAL RETAIL PROGRAM?
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              A Reliable Supply Partner for Your Retail Business
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
              Your retail success depends on having the right products, dependable suppliers, and competitive purchasing costs. The CellCentral Retail Program is designed to help independent businesses source quality mobile accessories without the complications of managing international suppliers, overseas purchasing, and large import commitments.
            </p>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
              Our objective is to develop long-term retail partnerships based on product quality, transparent commercial terms, reliable communication, and convenient ordering.
            </p>
          </div>

          {/* 7 Advantage Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}
          >
            {[
              {
                icon: ShieldCheck,
                color: '#0B63F6',
                title: 'Premium Product Quality',
                desc: 'Our product strategy focuses on carefully selected mobile accessories designed to meet customer expectations for functionality, compatibility, appearance, and durability.'
              },
              {
                icon: DollarSign,
                color: '#FF7A1A',
                title: 'Competitive Wholesale Pricing',
                desc: 'Approved retail partners receive access to wholesale pricing structures intended to support attractive resale opportunities and sustainable business relationships.'
              },
              {
                icon: Building2,
                color: '#0B63F6',
                title: 'Canadian-Based Business Support',
                desc: 'Work with a Canadian supplier that understands the operational requirements, consumer preferences, and logistics of independent retailers operating across Canada.'
              },
              {
                icon: Package,
                color: '#10B981',
                title: 'Convenient Inventory Replenishment',
                desc: 'Our goal is to simplify restocking through an organized product catalogue, streamlined retail partner ordering portal, and coordinated Canadian fulfillment.'
              },
              {
                icon: Sliders,
                color: '#8B5CF6',
                title: 'Flexible Product Selection',
                desc: 'Retail partners can select products appropriate for their customers, store size, and purchasing requirements, subject to available inventory and minimum order quantities.'
              },
              {
                icon: Store,
                color: '#EC4899',
                title: 'Independent Business Ownership',
                desc: 'CellCentral retail partners maintain their own store name, branding, customer ownership, customer relationships, and daily retail operations without interference.'
              },
              {
                icon: TrendingUp,
                color: '#0B63F6',
                title: 'Long-Term Partnership',
                desc: 'We aim to support retail partner growth through product updates, new device launch assortments, purchasing opportunities, and dedicated account services.'
              }
            ].map((adv, idx) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: `${adv.color}15`,
                      color: adv.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D' }}>{adv.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>{adv.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Vision Callout & CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0B1E3D 0%, #173663 100%)',
              color: '#fff',
              borderRadius: '16px',
              padding: '36px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#93C5FD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                OUR VISION
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', lineHeight: 1.4 }}>
                &ldquo;To establish CellCentral as a trusted Canadian supplier of premium mobile accessories, serving independent retailers and distributors across the country.&rdquo;
              </div>
            </div>
            <button
              onClick={() => scrollToApply()}
              style={{
                background: '#FF7A1A',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              BECOME A CELLCENTRAL RETAIL PARTNER <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 02. OUR PRODUCT CATEGORIES */}
      <section id="product-categories" style={{ padding: '80px 0', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              02. OUR PRODUCT CATEGORIES
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Premium Mobile Accessories for Everyday Consumer Demand
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>
              CellCentral focuses on mobile accessories that customers regularly purchase to protect, charge, and enhance their smartphones and connected devices.
            </p>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
              Our product catalogue is designed to offer retailers a practical selection of essential accessories ready for display and resale.
            </p>
          </div>

          {/* 4 Category Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}
          >
            {/* 1. Protective Phone Cases */}
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                <Image
                  src="/images/products/case-clear-magsafe.jpg"
                  alt="Protective Phone Cases"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#0B63F6',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  CATEGORY 01
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  1. Protective Phone Cases
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
                  A selection of protective and stylish phone cases designed for popular smartphone models.
                </p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                  Product Selection Includes:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Apple iPhone cases (16, 15, 14, 13)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Samsung Galaxy cases (S25, S24, A-series)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Protective heavy-duty cases
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Slim and transparent crystal cases
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Premium finish and textured cases
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> MagSafe-compatible magnetic rings
                  </li>
                </ul>
                <div
                  style={{
                    marginTop: 'auto',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '12.5px',
                    color: '#1E40AF'
                  }}
                >
                  <strong>Retail Opportunity:</strong> Phone cases offer opportunities for customers to personalize their devices while providing protection against everyday wear.
                </div>
              </div>
            </div>

            {/* 2. Screen Protectors */}
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                <Image
                  src="/images/products/screen-protector-tray.jpg"
                  alt="Screen Protectors"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#0B63F6',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  CATEGORY 02
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  2. Screen Protectors
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
                  Protective screen accessories for popular smartphone models with high-margin attachment rates.
                </p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                  Product Selection Includes:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Tempered glass screen protectors (9H)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Privacy 28° filter screen protectors
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Edge-to-edge curved screen protection
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Easy-align installation trays included
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Selected device-specific protection
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Retail-ready hang-tab packaged products
                  </li>
                </ul>
                <div
                  style={{
                    marginTop: 'auto',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '12.5px',
                    color: '#1E40AF'
                  }}
                >
                  <strong>Retail Opportunity:</strong> Screen protectors are a practical accessory purchase for customers looking to protect their smartphone displays against costly breaks.
                </div>
              </div>
            </div>

            {/* 3. USB-C Fast Chargers */}
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                <Image
                  src="/images/products/charger-gan-65w.jpg"
                  alt="USB-C Fast Chargers"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#0B63F6',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  CATEGORY 03
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  3. USB-C Fast Chargers
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
                  Modern charging accessories designed for compatible smartphones and electronic devices.
                </p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                  Product Selection Includes:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> 20W USB-C PD compact wall chargers
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> 30W USB-C fast charging cubes
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> 45W PPS fast charging solutions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> 65W GaN III high-power chargers
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Multi-port USB-C + USB-A chargers
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Folding prongs for Canadian outlets
                  </li>
                </ul>
                <div
                  style={{
                    marginTop: 'auto',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '12.5px',
                    color: '#166534'
                  }}
                >
                  <strong>Quality Commitment:</strong> CellCentral prioritizes appropriately certified charging products suitable for the Canadian market. Safety certifications and product specifications are available for applicable items.
                </div>
              </div>
            </div>

            {/* 4. Charging Cables */}
            <div
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '200px', background: '#F8FAFC' }}>
                <Image
                  src="/images/products/cable-braided-100w.jpg"
                  alt="Charging Cables"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#0B63F6',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}
                >
                  CATEGORY 04
                </span>
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  4. Charging Cables
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
                  A range of charging and connectivity cables designed for everyday consumer and commercial needs.
                </p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                  Product Selection Includes:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> USB-C to USB-C 100W PD cables
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> USB-A to USB-C durable cables
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Fast-charging compatible braided cords
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Reinforced stress-relief collar joints
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Cable lengths: 1m (3.3ft) and 2m (6.6ft)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#0B63F6" /> Premium peggable consumer packaging
                  </li>
                </ul>
                <div
                  style={{
                    marginTop: 'auto',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '12.5px',
                    color: '#1E40AF'
                  }}
                >
                  <strong>Everyday Turnover:</strong> Replacement charging cables represent consistent repeat foot traffic and high sales velocity across retail store types.
                </div>
              </div>
            </div>
          </div>

          {/* Product Catalogue Access Bar */}
          <div
            style={{
              background: '#fff',
              border: '1.5px solid #0B63F6',
              borderRadius: '14px',
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ maxWidth: '750px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B1E3D', marginBottom: '4px' }}>
                Product Catalogue Access
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                Approved retail partners will be able to access available product specifications, wholesale pricing, ordering quantities, and inventory information through the designated ordering process. Product selection and availability may change based on demand, new device releases, and supplier availability.
              </p>
            </div>
            <Link
              href="/shop"
              style={{
                background: '#0B63F6',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Package size={16} /> VIEW PRODUCT CATALOGUE
            </Link>
          </div>
        </div>
      </section>

      {/* 03. RETAIL PARTNER PRICING & BENEFITS (3 TIERS) */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              03. RETAIL PARTNER PRICING &amp; BENEFITS
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Wholesale Pricing Designed to Support Business Growth
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>
              CellCentral recognizes that retailers have different purchasing requirements depending on their business size, sales volume, and customer base.
            </p>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
              Our pricing structure is intended to accommodate independent stores, growing retail businesses, and larger distribution partners.
            </p>
          </div>

          {/* 3 Tier Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              alignItems: 'stretch',
              marginBottom: '40px'
            }}
          >
            {/* TIER 1 - STARTER RETAIL PARTNER */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#64748B',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                TIER 1
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0B1E3D', marginBottom: '4px' }}>
                Starter Retail Partner
              </h3>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B63F6', marginBottom: '14px' }}>
                For Independent Retail Stores
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                Designed for individual cellphone stores, repair shops, convenience stores, electronics retailers, and smaller businesses.
              </p>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '18px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                  Program Features:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Access to approved wholesale pricing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Flexible product assortment
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Mixed-product ordering where available
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Standard retail partner account support
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Access to product specs &amp; marketing info
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> No franchise requirement
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Independent retail ownership
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Standard wholesale payment terms
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ background: '#EFF6FF', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#1E40AF', marginBottom: '18px' }}>
                  <strong>Ideal For:</strong> Businesses beginning their relationship with CellCentral or purchasing smaller wholesale quantities.
                </div>

                <button
                  onClick={() => scrollToApply('Starter Retail Partner')}
                  style={{
                    width: '100%',
                    background: '#0B1E3D',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  APPLY AS A STARTER RETAIL PARTNER <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* TIER 2 - GROWTH RETAIL PARTNER (FEATURED) */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #FF7A1A',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 12px 30px rgba(255,122,26,0.12)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FF7A1A',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 14px',
                  borderRadius: '100px',
                  boxShadow: '0 4px 10px rgba(255,122,26,0.3)'
                }}
              >
                MOST POPULAR FOR STORES
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#FF7A1A',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                TIER 2
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0B1E3D', marginBottom: '4px' }}>
                Growth Retail Partner
              </h3>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FF7A1A', marginBottom: '14px' }}>
                For Established Retailers &amp; Multi-Location Businesses
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                Designed for established retailers with regular purchasing requirements and businesses operating multiple store locations.
              </p>

              <div style={{ borderTop: '1px solid #FED7AA', paddingTop: '18px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                  Program Features:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Enhanced volume-based pricing opportunities
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Access to larger wholesale quantities
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> <strong>Retail display program eligibility</strong>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Priority account assistance
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Coordinated inventory replenishment
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Early product launch updates
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Consideration for approved business credit terms
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#FF7A1A" /> Additional purchasing incentives where available
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ background: '#FFF7ED', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#9A3412', marginBottom: '18px' }}>
                  <strong>Ideal For:</strong> Retailers seeking a long-term commercial relationship and regular high-velocity product supply.
                </div>

                <button
                  onClick={() => scrollToApply('Growth Retail Partner')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #FF7A1A 0%, #EA580C 100%)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255,122,26,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  APPLY AS A GROWTH RETAIL PARTNER <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* TIER 3 - DISTRIBUTION PARTNER */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#64748B',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                TIER 3
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0B1E3D', marginBottom: '4px' }}>
                Distribution Partner
              </h3>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B63F6', marginBottom: '14px' }}>
                For Regional Distributors &amp; High-Volume Buyers
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                Designed for established distributors, retail chains, and organizations requiring larger purchasing quantities and pallet-scale logistics.
              </p>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '18px', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                  Program Features:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', color: '#475569' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Negotiated wholesale contract pricing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Bulk and master-carton purchasing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Larger-volume order coordination
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Dedicated commercial account director
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Custom product assortment discussions
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Regional supply opportunities
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Approved commercial payment arrangements
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="#0B63F6" /> Distribution planning &amp; forecasting support
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ background: '#EFF6FF', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#1E40AF', marginBottom: '18px' }}>
                  <strong>Ideal For:</strong> Businesses purchasing larger wholesale volumes or supplying multiple retail locations.
                </div>

                <button
                  onClick={() => scrollToApply('Distribution Partner')}
                  style={{
                    width: '100%',
                    background: '#0B1E3D',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  ENQUIRE ABOUT DISTRIBUTION <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Policy Box */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <ShieldCheck size={24} color="#0B63F6" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
              <strong style={{ color: '#0B1E3D' }}>Pricing Policy Notice:</strong> Actual wholesale prices, volume discounts, minimum order requirements, and account benefits are determined according to the approved partner category, product selection, and commercial arrangements. <em>Retail selling prices and profit margins are not guaranteed.</em>
            </div>
          </div>
        </div>
      </section>

      {/* 04. CELLCENTRAL RETAIL DISPLAY PROGRAM */}
      <section id="retail-display-program" style={{ padding: '80px 0', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              04. CELLCENTRAL RETAIL DISPLAY PROGRAM
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Professional Product Displays That Help Your Store Stand Out
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>
              An attractive and organized product presentation can improve the shopping experience and help customers discover accessories more easily.
            </p>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
              CellCentral intends to support eligible retail partners with branded display solutions designed for different store environments.
            </p>
          </div>

          {/* Panoramic Store Interior Visual */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.08)',
              border: '1px solid #CBD5E1',
              marginBottom: '48px',
              background: '#07152E'
            }}
          >
            <Image
              src="/images/store-interior.png"
              alt="CellCentral Retail Display Concept & In-Store Merchandising"
              width={1200}
              height={500}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 32px',
                background: 'linear-gradient(to top, rgba(7,21,46,0.92) 0%, rgba(7,21,46,0.5) 70%, transparent 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                  Organized Retail Presentation Fixtures
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>
                  Modular wall slatting, countertop units, and floor merchandising designed to maximize sales per square foot
                </div>
              </div>
              <button
                onClick={scrollToDisplays}
                style={{
                  background: '#0B63F6',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                EXPLORE RETAIL DISPLAY OPTIONS <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Display Solutions Grid: Countertop vs Floor */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginBottom: '44px'
            }}
          >
            {/* Countertop Display Solutions */}
            <div
              style={{
                background: '#fff',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#EFF6FF',
                  color: '#0B63F6',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '100px',
                  marginBottom: '16px'
                }}
              >
                <Store size={14} /> COMPACT SPACES
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                Countertop Display Solutions
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.55, marginBottom: '20px' }}>
                Compact display fixtures suitable for checkout counters, POS stations, service desks, and smaller retail spaces.
              </p>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                Potential Features:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#0B63F6" /> Space-efficient, small footprint design
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#0B63F6" /> Organized accessory and grab-and-go presentation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#0B63F6" /> Professional CellCentral premium branding
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#0B63F6" /> Easy customer access next to register
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#0B63F6" /> Suitable for chargers, cables, and fast-moving SKUs
                </li>
              </ul>
            </div>

            {/* Floor Display Solutions */}
            <div
              style={{
                background: '#fff',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFF7ED',
                  color: '#EA580C',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '100px',
                  marginBottom: '16px'
                }}
              >
                <Layers size={14} /> HIGH CAPACITY
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                Floor Display Solutions
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.55, marginBottom: '20px' }}>
                Freestanding merchandising fixtures designed for stores with additional floor space or dedicated accessory aisles.
              </p>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>
                Potential Features:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#FF7A1A" /> Expanded multi-tier product capacity
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#FF7A1A" /> Organized category presentation (Cases, Glass, Power)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#FF7A1A" /> Professional high-end branded appearance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#FF7A1A" /> Convenient eye-level 360° customer access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#FF7A1A" /> Selected rotating or movable casters fixture options
                </li>
              </ul>
            </div>
          </div>

          {/* Retail Display Benefits & Eligibility Bar */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #CBD5E1',
              borderRadius: '16px',
              padding: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B1E3D', marginBottom: '12px' }}>
                Retail Display Benefits:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Professional accessory presentation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> More organized product merchandising
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Improved product visibility &amp; impulse buys
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Efficient use of precious retail floor space
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Coordinated product assortments
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Potential for easier restocking &amp; inventory control
                </li>
              </ul>
            </div>

            <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '24px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B1E3D', marginBottom: '10px' }}>
                Display Program Eligibility:
              </div>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.55, marginBottom: '12px' }}>
                Retail display fixtures may be available to qualifying partners based on purchasing commitments, order volumes, availability, and approved commercial terms.
              </p>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.55, marginBottom: '14px' }}>
                Fixtures may be supplied through purchase, loan, deposit, or promotional arrangements depending on the applicable program tier.
              </p>
              <div
                style={{
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#92400E',
                  fontWeight: 600
                }}
              >
                * Notice: Participation in the CellCentral Retail Program does not make the retailer a CellCentral franchisee.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. FLEXIBLE ORDERING & CANADIAN SHIPPING */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              05. FLEXIBLE ORDERING &amp; CANADIAN SHIPPING
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Convenient Ordering for Businesses Across Canada
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>
              CellCentral aims to make wholesale purchasing straightforward and efficient for approved Canadian retail partners.
            </p>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.6 }}>
              Our ordering model is being developed to support convenient product selection, order management, and repeat purchasing.
            </p>
          </div>

          {/* 6 Ordering Features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            {[
              {
                title: 'Approved Partner Pricing',
                desc: 'Access wholesale pricing tiers assigned specifically to your verified business account.'
              },
              {
                title: 'Mixed-Product Purchasing',
                desc: 'Order eligible products from different accessory categories in a single purchase, subject to applicable quantities and stock.'
              },
              {
                title: 'Volume Purchasing',
                desc: 'Request tailored quotes and contract pricing for larger carton quantities and recurring supply arrangements.'
              },
              {
                title: 'Secure Ordering',
                desc: 'Use the designated retail partner purchasing process to place orders securely and manage company account details.'
              },
              {
                title: 'Order Tracking',
                desc: 'Receive automated order confirmations, dispatch notices, and tracking info directly to your purchasing team.'
              },
              {
                title: 'Easy Reordering',
                desc: 'Review historical purchases and quickly replenish popular SKUs with 1-click reorder workflows.'
              }
            ].map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#0B63F6" />
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0B1E3D' }}>{feat.title}</h4>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.55, margin: 0 }}>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Logistics & Payment Policies */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '36px'
            }}
          >
            {/* Canadian Shipping */}
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Truck size={22} color="#0B63F6" />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#1E40AF' }}>Canadian Shipping</h4>
              </div>
              <p style={{ fontSize: '13.5px', color: '#1E3A8A', lineHeight: 1.55, marginBottom: '12px' }}>
                CellCentral intends to serve approved retail partners across all Canadian provinces and territories.
              </p>
              <p style={{ fontSize: '12.5px', color: '#3B82F6', lineHeight: 1.5, margin: 0 }}>
                Shipping availability, designated commercial carriers, freight charges, and delivery estimates will depend on order size, inventory warehouse location, and destination.
              </p>
            </div>

            {/* Payment Options */}
            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <CreditCard size={22} color="#FF7A1A" />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D' }}>Payment Options</h4>
              </div>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, marginBottom: '10px' }}>
                Depending on account eligibility and available checkout services, payment arrangements include:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#64748B' }}>
                <li>• Major Business Credit Cards (Visa, Mastercard, Amex)</li>
                <li>• Electronic Funds Transfer (EFT / Direct Bank Wire)</li>
                <li>• Interac e-Transfer for fast Canadian settlement</li>
                <li>• Approved commercial payment arrangements (Net terms)</li>
              </ul>
            </div>

            {/* Business Credit Terms */}
            <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <FileCheck2 size={22} color="#10B981" />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D' }}>Business Credit Terms</h4>
              </div>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, marginBottom: '10px' }}>
                Established retail partners may be considered for trade credit terms following appropriate business history and credit verification.
              </p>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                Credit approval, credit limits, and payment deadlines will be determined separately on a partner-by-partner basis.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => scrollToApply()}
              style={{
                background: '#0B63F6',
                color: '#fff',
                padding: '14px 30px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              OPEN YOUR RETAIL PARTNER ACCOUNT <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 06. YOUR BUSINESS REMAINS INDEPENDENT */}
      <section style={{ padding: '80px 0', background: '#0B1E3D', color: '#fff' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#60A5FA',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              06. YOUR BUSINESS REMAINS INDEPENDENT
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#fff',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Your Store. Your Brand. Your Customers.
            </h2>
            <p style={{ fontSize: '16px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '12px' }}>
              The CellCentral Retail Program is designed specifically for businesses that want to sell CellCentral products while maintaining their independent business identity.
            </p>
            <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.6 }}>
              Unlike the CellCentral Franchise Program, retail partners do not operate as CellCentral-branded franchise locations.
            </p>
          </div>

          {/* Independence Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}
          >
            {[
              {
                title: 'You Keep Your Business Name',
                desc: 'Continue operating under your existing registered business name, logo, storefront signage, and retail branding.'
              },
              {
                title: 'You Control Your Store Operations',
                desc: 'Manage your own staffing, business hours, merchandising arrangements, and customer service practices freely.'
              },
              {
                title: 'You Maintain Your Customer Relationships',
                desc: 'Your retail customers remain direct customers of your independently operated business.'
              },
              {
                title: 'You Choose Your Product Assortment',
                desc: 'Select from available CellCentral products according to your specific local customer preferences.'
              },
              {
                title: 'You Determine Your Retail Strategy',
                desc: 'Manage your own in-store retail marketing and pricing strategy, subject to applicable Canadian laws.'
              },
              {
                title: 'No Franchise Fee',
                desc: 'The standard independent retail partner relationship does not require any upfront CellCentral franchise fee.'
              },
              {
                title: 'No Franchise Royalty',
                desc: 'Independent retail partners do not pay ongoing CellCentral franchise royalties under the standard wholesale purchasing model.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#22C55E" />
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{item.title}</h4>
                </div>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Partnership Philosophy Banner */}
          <div
            style={{
              background: 'rgba(11,99,246,0.15)',
              border: '1.5px solid rgba(147,197,253,0.3)',
              borderRadius: '16px',
              padding: '32px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#93C5FD', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                OUR PARTNERSHIP PHILOSOPHY
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                &ldquo;CellCentral supplies the products. You operate your business.&rdquo;
              </div>
              <p style={{ fontSize: '14px', color: '#CBD5E1', margin: 0 }}>
                Our objective is to become a dependable wholesale supplier while respecting the full commercial independence of our retail partners.
              </p>
            </div>
            <button
              onClick={() => scrollToApply()}
              style={{
                background: '#FF7A1A',
                color: '#fff',
                padding: '13px 26px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              JOIN OUR RETAIL PARTNER NETWORK <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 07. HOW TO BECOME A CELLCENTRAL RETAIL PARTNER (4 STEPS) */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              07. HOW TO BECOME A CELLCENTRAL RETAIL PARTNER
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Start Your Partnership in Four Simple Steps
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              We have designed a streamlined dealer onboarding process so you can get approved and start ordering quickly.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '44px'
            }}
          >
            {[
              {
                step: '01',
                title: 'Submit Your Application',
                desc: 'Complete the online CellCentral Retail Program application with your business details, contact information, and purchasing interests.'
              },
              {
                step: '02',
                title: 'Business Verification',
                desc: 'Our team reviews your application to confirm business eligibility and determine the appropriate account category. Additional registration or tax info may be requested where necessary.'
              },
              {
                step: '03',
                title: 'Receive Account Access',
                desc: 'Once approved, you will receive information about your account, applicable wholesale pricing, ordering procedures, and commercial terms.'
              },
              {
                step: '04',
                title: 'Place Your First Order',
                desc: 'Browse available products, select quantities, and submit your order according to your approved purchasing arrangements. Then continue regular replenishment.'
              }
            ].map((st, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '28px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#0B63F6',
                    opacity: 0.85,
                    marginBottom: '12px'
                  }}
                >
                  STEP {st.step}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.55, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Growth footnote */}
          <div
            style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <strong style={{ color: '#1E40AF', fontSize: '14px' }}>A Partnership Built for Growth:</strong>
              <span style={{ fontSize: '13.5px', color: '#1E3A8A', marginLeft: '6px' }}>
                As your business develops and order volumes expand, CellCentral may review your purchasing requirements and eligibility for higher volume discounts, credit terms, and display fixtures.
              </span>
            </div>
            <button
              onClick={() => scrollToApply()}
              style={{
                background: '#0B63F6',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              START YOUR RETAIL PARTNER APPLICATION
            </button>
          </div>
        </div>
      </section>

      {/* 08. CELLCENTRAL RETAIL PARTNER APPLICATION FORM */}
      <section
        id="retail-partner-application"
        style={{ padding: '80px 0', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              08. CELLCENTRAL RETAIL PARTNER APPLICATION
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Apply to Join the CellCentral Retail Program
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>
              Interested in stocking CellCentral products in your store? Complete the following application to request access to our wholesale purchasing program.
            </p>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Our commercial team will review your information and contact you regarding account eligibility and next steps.
            </p>
          </div>

          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              background: '#fff',
              border: '1.5px solid #CBD5E1',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              overflow: 'hidden'
            }}
          >
            {/* Form Top Accent */}
            <div style={{ height: '6px', background: 'linear-gradient(90deg, #0B63F6 0%, #FF7A1A 100%)' }} />

            {submitted ? (
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#DCFCE7',
                    color: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', marginBottom: '12px' }}>
                  Thank you for applying to join the CellCentral Retail Program!
                </h3>
                <p style={{ fontSize: '16px', color: '#475569', maxWidth: '600px', margin: '0 auto 16px', lineHeight: 1.6 }}>
                  Your application has been received and will be reviewed by our wholesale account team. We will contact you regarding account verification and the next steps in the approval process.
                </p>
                <div
                  style={{
                    background: '#F1F5F9',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    maxWidth: '520px',
                    margin: '0 auto 32px',
                    fontSize: '13px',
                    color: '#64748B'
                  }}
                >
                  * Submission of an application does not guarantee retail partner account approval.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#0B63F6',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: '40px 44px' }}>
                {/* PART 1: BUSINESS INFORMATION */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                    <Building2 size={18} color="#0B63F6" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      1. Business Information
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Registered Business Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Mobile Services Ltd."
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Operating / Store Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. City Tech & Repair"
                        value={formData.operatingName}
                        onChange={e => setFormData({ ...formData, operatingName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Business Type <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Cellphone Retail Store">Cellphone Retail Store</option>
                        <option value="Mobile Phone Repair Shop">Mobile Phone Repair Shop</option>
                        <option value="Electronics Retailer">Electronics Retailer</option>
                        <option value="Convenience Store">Convenience Store</option>
                        <option value="Online Retailer">Online Retailer</option>
                        <option value="Multi-Location Retailer">Multi-Location Retailer</option>
                        <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Number of Retail Locations <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        value={formData.locationCount}
                        onChange={e => setFormData({ ...formData, locationCount: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          background: '#fff',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="1">1 Location</option>
                        <option value="2-3">2 – 3 Locations</option>
                        <option value="4-10">4 – 10 Locations</option>
                        <option value="11+">11+ Locations</option>
                        <option value="Online / E-commerce Only">Online / E-commerce Only</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Business Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Street address of primary store or headquarters"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        City <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Toronto"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                          Province <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                          value={formData.province}
                          onChange={e => setFormData({ ...formData, province: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '14px',
                            background: '#fff',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="AB">Alberta</option>
                          <option value="BC">British Columbia</option>
                          <option value="MB">Manitoba</option>
                          <option value="NB">New Brunswick</option>
                          <option value="NL">Newfoundland &amp; Labrador</option>
                          <option value="NS">Nova Scotia</option>
                          <option value="NT">Northwest Territories</option>
                          <option value="NU">Nunavut</option>
                          <option value="ON">Ontario</option>
                          <option value="PE">Prince Edward Island</option>
                          <option value="QC">Quebec</option>
                          <option value="SK">Saskatchewan</option>
                          <option value="YT">Yukon</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                          Postal Code <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="M5V 2T6"
                          value={formData.postalCode}
                          onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Business Website (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://yourstore.ca"
                        value={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* PART 2: CONTACT INFORMATION */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                    <Briefcase size={18} color="#0B63F6" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      2. Contact Information
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Contact Person&apos;s Full Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.contactName}
                        onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Position / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Store Owner / General Manager"
                        value={formData.position}
                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Business Email Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="orders@yourbusiness.ca"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Business Phone Number <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(416) 555-0199"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* PART 3: PURCHASING INFORMATION */}
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                    <DollarSign size={18} color="#0B63F6" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      3. Purchasing Information
                    </h3>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                      Estimated Monthly Wholesale Purchasing Budget (CAD):
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {['Under $1,000', '$1,000-$5,000', '$5,000-$10,000', 'Over $10,000', 'Prefer to Discuss'].map(b => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, purchasingBudget: b })}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: formData.purchasingBudget === b ? '2px solid #0B63F6' : '1px solid #CBD5E1',
                            background: formData.purchasingBudget === b ? '#EFF6FF' : '#fff',
                            color: formData.purchasingBudget === b ? '#0B63F6' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Products of Interest Checkboxes */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                      Products of Interest:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      {[
                        'Phone Cases',
                        'Screen Protectors',
                        'USB-C Chargers',
                        'Charging Cables',
                        'All Available Categories'
                      ].map(prod => {
                        const checked = formData.productsOfInterest.includes(prod);
                        return (
                          <label
                            key={prod}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 12px',
                              background: checked ? '#EFF6FF' : '#F8FAFC',
                              border: checked ? '1px solid #93C5FD' : '1px solid #E2E8F0',
                              borderRadius: '8px',
                              fontSize: '13px',
                              color: checked ? '#1E40AF' : '#475569',
                              cursor: 'pointer'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleProductInterestToggle(prod)}
                              style={{ width: '16px', height: '16px', accentColor: '#0B63F6' }}
                            />
                            <span style={{ fontWeight: checked ? 700 : 500 }}>{prod}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Display Interest Radio */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                      Are You Interested in Retail Display Fixtures?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {['Yes', 'No', 'Need More Information'].map(opt => (
                        <label
                          key={opt}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 14px',
                            background: formData.displayInterest === opt ? '#EFF6FF' : '#F8FAFC',
                            border: formData.displayInterest === opt ? '1.5px solid #0B63F6' : '1px solid #CBD5E1',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: formData.displayInterest === opt ? '#0B63F6' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            type="radio"
                            name="displayInterest"
                            checked={formData.displayInterest === opt}
                            onChange={() => setFormData({ ...formData, displayInterest: opt })}
                            style={{ accentColor: '#0B63F6' }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Retail Partner Category */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>
                      Preferred Retail Partner Category:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      {[
                        'Starter Retail Partner',
                        'Growth Retail Partner',
                        'Distribution Partner',
                        'Please Recommend'
                      ].map(cat => (
                        <label
                          key={cat}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 12px',
                            background: formData.preferredCategory === cat ? '#EFF6FF' : '#F8FAFC',
                            border: formData.preferredCategory === cat ? '1.5px solid #0B63F6' : '1px solid #CBD5E1',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: formData.preferredCategory === cat ? '#0B63F6' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            type="radio"
                            name="preferredCategory"
                            checked={formData.preferredCategory === cat}
                            onChange={() => setFormData({ ...formData, preferredCategory: cat })}
                            style={{ accentColor: '#0B63F6' }}
                          />
                          <span style={{ fontWeight: formData.preferredCategory === cat ? 700 : 500 }}>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PART 4: ADDITIONAL INFORMATION */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                    <HelpCircle size={18} color="#0B63F6" />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1E3D', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      4. Additional Information
                    </h3>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      Questions or Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about specific smartphone models you cater to, current suppliers, or timeline requirements..."
                      value={formData.questions}
                      onChange={e => setFormData({ ...formData, questions: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                      How Did You Hear About CellCentral? (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Industry Trade Show, Referral, Online Search, Social Media"
                      value={formData.referralSource}
                      onChange={e => setFormData({ ...formData, referralSource: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* REQUIRED CONSENT */}
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    marginBottom: '28px'
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                      style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: '#0B63F6' }}
                    />
                    <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                      <strong>Required Consent:</strong> I consent to CellCentral collecting and using the information provided to review and respond to my retail partner application, in accordance with its Privacy Policy.
                    </span>
                  </label>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting ? '#94A3B8' : 'linear-gradient(135deg, #0B63F6 0%, #004ecc 100%)',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(11,99,246,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSubmitting ? (
                    'PROCESSING APPLICATION...'
                  ) : (
                    <>
                      <Send size={18} /> APPLY TO BECOME A RETAIL PARTNER
                    </>
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#94A3B8', marginTop: '12px', margin: '12px 0 0' }}>
                  Submission of an application does not guarantee retail partner account approval. All applications are subject to business verification.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 09. FREQUENTLY ASKED QUESTIONS (16 FAQS) */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B63F6',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              09. FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                marginTop: '8px',
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}
            >
              Everything You Need to Know About the CellCentral Retail Program
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B' }}>
              Clear answers to the most common questions from Canadian store owners and wholesalers.
            </p>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    border: isOpen ? '1.5px solid #0B63F6' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: isOpen ? '#F8FAFC' : '#fff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 800, color: isOpen ? '#0B63F6' : '#0B1E3D' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} color="#0B63F6" /> : <ChevronDown size={18} color="#94A3B8" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section
        style={{
          background: 'linear-gradient(135deg, #07152E 0%, #0B1E3D 50%, #0D2852 100%)',
          color: '#fff',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,122,26,0.18)',
              border: '1px solid rgba(255,122,26,0.4)',
              color: '#FFD8A8',
              fontSize: '12px',
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: '100px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            NATIONWIDE B2B OPPORTUNITIES
          </span>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#fff'
            }}
          >
            Ready to Grow Your Business with CellCentral?
          </h2>

          <div style={{ fontSize: '18px', fontWeight: 700, color: '#93C5FD', marginBottom: '20px' }}>
            Premium Products. Competitive Wholesale Opportunities. Independent Business Ownership.
          </div>

          <p style={{ fontSize: '15.5px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '16px' }}>
            Whether you operate a cellphone store, repair shop, electronics business, or regional distribution company, CellCentral invites you to explore a retail partnership.
          </p>

          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
            Expand your product selection, access approved wholesale pricing, and build a lasting relationship with a Canadian mobile accessories supplier.
          </p>

          <div style={{ fontSize: '19px', fontWeight: 800, color: '#FDBA74', marginBottom: '36px' }}>
            Your Store. Your Business. Our Premium Products.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <button
              onClick={() => scrollToApply()}
              style={{
                background: '#FF7A1A',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(255,122,26,0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Briefcase size={18} /> BECOME A RETAIL PARTNER
            </button>

            <Link
              href="/shop"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                padding: '16px 30px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 700,
                border: '1.5px solid rgba(255,255,255,0.25)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Package size={18} /> EXPLORE OUR PRODUCTS
            </Link>
          </div>

          {/* Legal policy note */}
          <p style={{ fontSize: '11.5px', color: '#94A3B8', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
            * Retail partner account approval, pricing, availability, and purchasing terms are subject to CellCentral&apos;s applicable policies. Do not publish unverified claims about guaranteed profit margins, retail partner counts, shipping times, free fixtures, or automatic credit approval.
          </p>
        </div>
      </section>

      {/* FOOTER CROSS-LINK BANNER TO FRANCHISE */}
      <section style={{ background: '#071120', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Looking for Turnkey Franchise Opportunities instead?</span>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>
              Explore our turnkey CellCentral Express Kiosk and Full Store franchise models with comprehensive branding, operations, and territory support.
            </p>
          </div>
          <Link
            href="/retail-partners"
            style={{
              background: 'transparent',
              color: '#FF7A1A',
              border: '1.5px solid #FF7A1A',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            View Franchise Program <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
