'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Store,
  Sparkles,
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
  DollarSign,
  Users,
  Briefcase,
  GraduationCap,
  Wrench,
  Smartphone,
  Package,
  Boxes,
  Compass,
  FileText,
  Maximize2,
  X
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function RetailPartnersPage() {
  const { showToast } = useToast();

  // Franchise Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    province: 'ON',
    currentOccupation: '',
    currentlyOwnBusiness: 'No',
    retailExperience: 'No',
    experienceDescription: '',
    preferredFormat: 'Open to Both',
    preferredCity: '',
    hasLocation: 'No',
    timeline: 'Within 3–6 Months',
    investmentCapital: '$50,000–$100,000',
    comments: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>('/images/storefront-dusk.png');
  const [lightboxCaption, setLightboxCaption] = useState<string>('CellCentral Flagship Storefront Concept at Dusk');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const galleryImages = [
    {
      src: '/images/storefront-dusk.png',
      alt: 'CellCentral Flagship Storefront Concept at Dusk',
      caption: 'CellCentral Flagship Storefront at Dusk',
      description: 'Modern storefront presentation featuring 3D illuminated CellCentral branding, full-height glass architecture, and category-organized window merchandising displays.'
    },
    {
      src: '/images/city-mobile-store.png',
      alt: 'City Mobile Accessories Store Concept',
      caption: 'Urban High-Street & Shopping District Retail Concept',
      description: 'Optimized high-traffic footprint designed for commercial plazas and shopping centers with high-visibility branded canopy signage.'
    },
    {
      src: '/images/store-interior.png',
      alt: 'Panoramic CellCentral Electronics Store Interior',
      caption: 'Panoramic Interior Retail Concept',
      description: 'Contemporary interior with organized accessory walls, central fixture islands, and dedicated customer service counter.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.city) {
      showToast('Required Fields', 'Please complete your full name, email, phone, and city.', 'warning');
      return;
    }
    if (!formData.consent) {
      showToast('Consent Required', 'Please confirm your consent to process your franchise inquiry.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        'Franchise Inquiry Submitted! 🚀',
        'Thank you for your interest. Our franchise development team will review your application.',
        'success'
      );
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: '1. What is a CellCentral franchise?',
      a: 'A CellCentral franchise is a proposed business opportunity through which an approved entrepreneur would operate a CellCentral-branded mobile accessories retail location under an applicable franchise agreement.'
    },
    {
      q: '2. Do I need previous retail experience?',
      a: 'Previous retail or business management experience may be helpful. However, applicants from different professional backgrounds may be considered based on their qualifications, financial capacity and commitment to the business.'
    },
    {
      q: '3. How much does a CellCentral franchise cost?',
      a: 'The total investment will depend on the store format, location, lease requirements, construction costs, equipment and initial inventory. Detailed investment information will be provided through the appropriate franchise disclosure process when available.'
    },
    {
      q: '4. Can I choose my franchise location?',
      a: 'Applicants may indicate their preferred city or commercial area. All proposed locations will be subject to CellCentral approval, market assessment and applicable franchise requirements.'
    },
    {
      q: '5. Will CellCentral provide products?',
      a: 'The proposed franchise system includes access to CellCentral-approved mobile accessories and coordinated product sourcing arrangements, subject to the final franchise agreement.'
    },
    {
      q: '6. Will CellCentral help with store design?',
      a: 'The proposed program includes store design standards and guidance relating to approved signage, fixtures, layouts and product merchandising.'
    },
    {
      q: '7. Will training be provided?',
      a: 'CellCentral intends to establish training covering product knowledge, customer service, merchandising, ordering and retail operating procedures. The final training obligations will be specified in the franchise documentation.'
    },
    {
      q: '8. Can I operate more than one CellCentral location?',
      a: 'Multi-location opportunities may be considered for qualified applicants, depending on market availability, financial qualifications and the terms of the franchise program.'
    },
    {
      q: '9. Will I receive an exclusive territory?',
      a: 'Any territorial rights or restrictions will depend on the applicable franchise agreement. Exclusive territories are not automatically guaranteed.'
    },
    {
      q: '10. Can I sell products from other brands?',
      a: 'Product sourcing and merchandising requirements will be governed by CellCentral\'s approved product policies and the franchise agreement.'
    },
    {
      q: '11. Does CellCentral guarantee profits?',
      a: 'No. Business performance depends on factors including location, operating expenses, customer demand, management and market conditions. CellCentral does not guarantee revenue, profits or investment returns.'
    },
    {
      q: '12. How do I apply?',
      a: 'Complete the online franchise enquiry form below. CellCentral will review your information and contact you if a suitable opportunity is available.'
    }
  ];

  return (
    <div style={{ background: '#FAFBFD', color: '#1E293B' }}>
      {/* Breadcrumbs */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '12px 20px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Own a CellCentral Store' }]} />
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          color: '#0F172A',
          padding: '52px 20px 64px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Top Intro & Content */}
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                color: '#EA580C',
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '18px'
              }}
            >
              <Sparkles size={14} color="#EA580C" />
              <span>OWN A CELLCENTRAL STORE • CANADA-WIDE EXPANSION</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 4.8vw, 54px)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#0F172A',
                marginBottom: '0'
              }}
            >
              Own Your Business.{' '}
              <span style={{ color: '#0B63F6' }}>
                Build Your Future
              </span>{' '}
              <span style={{ color: '#FF7A1A' }}>
                With CellCentral
              </span>.
            </h1>
          </div>

          {/* FULL SCREEN STORE CONCEPT VISUAL */}
          <div style={{ position: 'relative', marginTop: '24px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #CBD5E1',
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.14)',
                background: '#0F172A',
                cursor: 'pointer'
              }}
              onClick={() => {
                setLightboxImage('/images/storefront-dusk.png');
                setLightboxCaption('CellCentral Flagship Storefront Concept at Dusk');
                setIsLightboxOpen(true);
              }}
              title="Click to view full screen"
            >
              <Image
                src="/images/storefront-dusk.png"
                alt="CellCentral Flagship Storefront Concept at Dusk"
                width={1774}
                height={887}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '700px',
                  display: 'block',
                  objectFit: 'cover'
                }}
                priority
              />

              {/* Bottom Caption Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 28px',
                  background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 70%, transparent 100%)',
                  color: '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                      CellCentral Flagship Storefront Concept at Dusk
                    </div>
                    <div style={{ fontSize: '13px', color: '#CBD5E1', maxWidth: '820px' }}>
                      Modern storefront presentation featuring 3D illuminated CellCentral branding, full-height glass architecture, and category-organized window merchandising displays.
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        background: '#FF7A1A',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '5px 12px',
                        borderRadius: '100px'
                      }}
                    >
                      Flagship Concept
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage('/images/storefront-dusk.png');
                        setLightboxCaption('CellCentral Flagship Storefront Concept at Dusk');
                        setIsLightboxOpen(true);
                      }}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Maximize2 size={13} /> Full Screen
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Benefit Card 1 (Clean White Theme) */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
                  zIndex: 3
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FF7A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Store size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Flagship Architecture</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>3D illuminated branding &amp; glass front</div>
                </div>
              </div>

              {/* Floating Benefit Card 2 (Clean White Theme) */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
                  zIndex: 3
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#0B63F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Turnkey Store Design</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Approved fixtures, layouts &amp; displays</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with Close Button */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Close Full Screen (Esc)"
            >
              <X size={22} />
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              maxWidth: '94vw',
              maxHeight: '88vh',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt={lightboxCaption}
              width={1774}
              height={887}
              style={{
                maxWidth: '100%',
                maxHeight: '88vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '13px',
              textAlign: 'center'
            }}
          >
            {lightboxCaption} (Press Esc or click anywhere to exit)
          </div>
        </div>
      )}

      {/* IMPORTANT PROGRAM DISTINCTION CALLOUT BANNER */}
      <section style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: '#F59E0B', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
              PROGRAM NOTICE
            </span>
            <div style={{ fontSize: '13px', color: '#92400E' }}>
              <strong>Looking for Independent Wholesale Reselling?</strong> If you already operate an independent store and want to purchase CellCentral products under your own business name without franchise obligations, see{' '}
              <Link href="/wholesale" style={{ color: '#B45309', fontWeight: 800, textDecoration: 'underline' }}>
                Become a Retail Partner (/wholesale)
              </Link>.
            </div>
          </div>
          <Link
            href="/wholesale"
            style={{
              fontSize: '12.5px',
              fontWeight: 800,
              color: '#B45309',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none'
            }}
          >
            <span>Become a Retail Partner</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* SECTION 01: WHY CHOOSE A CELLCENTRAL FRANCHISE? */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#0B63F6',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              01. WHY CHOOSE A CELLCENTRAL FRANCHISE?
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              A Modern Retail Business Built Around Everyday Technology
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              Smartphones and connected devices have become essential parts of everyday life. Consumers regularly purchase
              accessories to protect, charge, personalize and enhance their devices. CellCentral aims to serve this market
              through a specialized retail experience combining quality mobile accessories, attractive merchandising,
              convenient shopping and competitive product offerings.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                icon: ShieldCheck,
                color: '#0B63F6',
                title: 'Premium Product Positioning',
                desc: 'Our retail concept focuses on carefully selected mobile accessories, including protective cases, screen protectors, charging solutions and essential mobile accessories designed for durability and performance.'
              },
              {
                icon: Store,
                color: '#FF7A1A',
                title: 'Recognizable Brand Identity',
                desc: 'CellCentral franchise locations will operate under a consistent brand identity, with coordinated signage, modern store presentation, retail packaging and customer experience standards across Canada.'
              },
              {
                icon: Smartphone,
                color: '#10B981',
                title: 'Specialized Retail Concept',
                desc: 'Unlike general electronics retailers, CellCentral focuses on mobile accessories, creating a straightforward shopping experience centered on products customers frequently need.'
              },
              {
                icon: Boxes,
                color: '#8B5CF6',
                title: 'Centralized Product Sourcing',
                desc: 'Our proposed franchise system is designed to simplify purchasing through coordinated product selection, approved Canadian suppliers, and consistent inventory standards.'
              },
              {
                icon: Building2,
                color: '#EC4899',
                title: 'Scalable Business Model',
                desc: 'The CellCentral concept is being developed to accommodate different retail environments, including shopping malls, commercial plazas and high-traffic shopping districts.'
              },
              {
                icon: Users,
                color: '#0284C7',
                title: 'Long-Term Partnership',
                desc: 'Our goal is to establish lasting relationships with franchise operators through clear operating standards, ongoing product development, continuous communication and business support.'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFBFD',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: `${card.color}15`,
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <card.icon size={26} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B1E3D', marginBottom: '10px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#64748B', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Vision Callout */}
          <div
            style={{
              marginTop: '48px',
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              border: '1.5px solid #BFDBFE',
              borderRadius: '18px',
              padding: '32px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '820px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase', marginBottom: '6px' }}>
                OUR FRANCHISE VISION
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#1E3A8A', lineHeight: 1.45 }}>
                To develop CellCentral into a recognized Canadian retail destination for premium mobile accessories, supported by a growing network of independently operated, CellCentral-branded locations.
              </div>
            </div>
            <a
              href="#store-concept"
              style={{
                background: '#0B63F6',
                color: '#fff',
                padding: '12px 22px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Discover Our Store Concept
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 02: OUR RETAIL STORE CONCEPT & CONCEPT RENDERINGS */}
      <section id="store-concept" style={{ padding: '72px 20px 80px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
            <span
              style={{
                color: '#FF7A1A',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              02. OUR RETAIL STORE CONCEPT
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '0 0 16px',
                letterSpacing: '-0.02em',
                lineHeight: 1.22,
                textWrap: 'balance'
              }}
            >
              A Premium Shopping Experience Designed for Modern Consumers
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: '#475569', maxWidth: '760px', margin: '0 auto' }}>
              The CellCentral retail concept combines clean, contemporary store design with organized product displays and an
              easy-to-navigate shopping environment. Our goal is to create retail spaces that are visually appealing,
              commercially practical and designed to showcase mobile accessories effectively.
            </p>
          </div>

          {/* Store Design Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            {[
              {
                title: 'Modern Storefront Branding',
                desc: 'Professional 3D illuminated CellCentral signage and coordinated storefront presentation create a consistent, recognizable identity across locations.'
              },
              {
                title: 'Organized Product Displays',
                desc: 'Dedicated category walls (Cases, Screen Protectors, Chargers, Audio) help customers browse compatible accessories effortlessly.'
              },
              {
                title: 'Contemporary Interior Design',
                desc: 'Clean architectural finishes, high-CRI retail spotlighting, modern service counters and thoughtfully planned layouts create an inviting atmosphere.'
              },
              {
                title: 'Efficient Use of Space',
                desc: 'Merchandising fixtures are engineered to maximize product density and visibility while maintaining spacious, comfortable customer walkways.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '24px 20px'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '16px', color: '#0B1E3D', marginBottom: '8px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#64748B' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Concept Renderings Gallery */}
          <div
            style={{
              background: '#fff',
              border: '1.5px solid #E2E8F0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                  Proposed Store Design Gallery
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
                  Concept renderings of proposed CellCentral storefronts, display fixtures, and retail interiors.
                </p>
              </div>
              <span
                style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: '#1D4ED8',
                  padding: '5px 12px',
                  borderRadius: '100px',
                  fontSize: '11.5px',
                  fontWeight: 700
                }}
              >
                Proposed Architectural Concepts
              </span>
            </div>

            {/* Featured Big Preview */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 45vw, 540px)',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#0F172A',
                marginBottom: '18px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setLightboxImage(galleryImages[selectedGalleryImage].src);
                setLightboxCaption(galleryImages[selectedGalleryImage].caption);
                setIsLightboxOpen(true);
              }}
              title="Click to view full screen"
            >
              <Image
                src={galleryImages[selectedGalleryImage].src}
                alt={galleryImages[selectedGalleryImage].alt}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 28px',
                  background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.5) 70%, transparent 100%)',
                  color: '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                      {galleryImages[selectedGalleryImage].caption}
                    </div>
                    <div style={{ fontSize: '13.5px', color: '#CBD5E1', maxWidth: '850px', lineHeight: 1.5 }}>
                      {galleryImages[selectedGalleryImage].description}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImage(galleryImages[selectedGalleryImage].src);
                      setLightboxCaption(galleryImages[selectedGalleryImage].caption);
                      setIsLightboxOpen(true);
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Maximize2 size={13} /> Full Screen
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryImage(idx)}
                  style={{
                    position: 'relative',
                    height: '110px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedGalleryImage === idx ? '3px solid #0B63F6' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    padding: 0,
                    background: '#0B1E3D',
                    boxShadow: selectedGalleryImage === idx ? '0 4px 16px rgba(11,99,246,0.35)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: selectedGalleryImage === idx ? 'rgba(11,99,246,0.15)' : 'rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '8px',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{img.caption}</span>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '16px', textAlign: 'center', fontStyle: 'italic' }}>
              * Developer Note: Concept renderings shown for proposed CellCentral locations. Individual store layouts will be customized based on site specifications and lease requirements.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: WHAT CELLCENTRAL PROVIDES */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#0B63F6',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              03. WHAT CELLCENTRAL PROVIDES
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              The Brand, Products and Support to Help You Get Started
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              CellCentral’s proposed franchise program is designed to provide franchise partners with a structured foundation
              for establishing and operating a branded mobile accessories retail business.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { num: '01', title: 'CellCentral Brand Licensing', desc: 'Authorized use of the CellCentral name, logo, approved branding materials and retail identity in accordance with the franchise agreement.' },
              { num: '02', title: 'Store Design & Setup Guidance', desc: 'Guidance on store layout, storefront signage, fixtures, product presentation and merchandising standards.' },
              { num: '03', title: 'Initial Product Selection', desc: 'Assistance with selecting an opening inventory assortment appropriate for the store format, location and target customer base.' },
              { num: '04', title: 'Centralized Product Supply', desc: 'Access to CellCentral-approved products and coordinated procurement arrangements, subject to supply availability and commercial terms.' },
              { num: '05', title: 'Retail Display Solutions', desc: 'Access to approved merchandising concepts, including wall displays, countertop fixtures and other retail presentation systems.' },
              { num: '06', title: 'Product Knowledge Training', desc: 'Training resources covering product categories, device compatibility, product features, customer service and basic retail selling practices.' },
              { num: '07', title: 'Marketing & Brand Resources', desc: 'Access to approved promotional designs, product information, brand guidelines and marketing materials.' },
              { num: '08', title: 'Operational Guidance', desc: 'Support resources covering inventory planning, store presentation, ordering procedures and daily retail operations.' },
              { num: '09', title: 'Technology & Ordering Systems', desc: 'Guidance on approved point-of-sale solutions, inventory systems and the CellCentral product ordering process.' },
              { num: '10', title: 'Ongoing Product Development', desc: 'Updates on new product categories, compatible device models, seasonal merchandise and product assortment opportunities.' }
            ].map((comp, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFBFD',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#E2E8F0',
                    lineHeight: 1,
                    marginBottom: '10px'
                  }}
                >
                  {comp.num}
                </div>
                <h4 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  {comp.title}
                </h4>
                <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#64748B', margin: 0 }}>
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center', fontSize: '12px', color: '#64748B', fontStyle: 'italic' }}>
            * The final scope of services, included items, fees and support obligations will be specified in the applicable franchise documentation.
          </div>
        </div>
      </section>

      {/* SECTION 04: AVAILABLE FRANCHISE FORMATS */}
      <section style={{ padding: '80px 20px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#FF7A1A',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              04. AVAILABLE FRANCHISE FORMATS
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Flexible Retail Concepts for Different Business Locations
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              CellCentral is developing retail formats intended to accommodate different commercial environments, customer traffic
              patterns and investment levels.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {/* OPTION A: CELLCENTRAL EXPRESS */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #BFDBFE',
                borderRadius: '20px',
                padding: '36px 32px',
                boxShadow: '0 8px 28px rgba(11,99,246,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: '#EFF6FF', color: '#1D4ED8', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, marginBottom: '16px' }}>
                OPTION A
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', marginBottom: '6px' }}>
                CellCentral Express
              </h3>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B63F6', marginBottom: '16px' }}>
                Compact Retail Kiosk Concept
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#64748B', marginBottom: '24px' }}>
                A proposed compact retail format designed for shopping malls, commercial concourses and other high-traffic retail locations.
              </p>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#0B1E3D', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Concept Features:
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                  <li>Compact retail footprint</li>
                  <li>Professional branded kiosk structure</li>
                  <li>Focused assortment of high-turnover accessories</li>
                  <li>Integrated product display walls</li>
                  <li>Convenient customer access and quick service</li>
                  <li>Streamlined single-operator retail operations</li>
                </ul>
              </div>

              <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '24px', fontSize: '13.5px' }}>
                <div style={{ color: '#0B1E3D', marginBottom: '6px' }}>
                  <strong>Ideal Locations:</strong> Shopping malls, transportation concourses, and enclosed commercial retail hubs.
                </div>
                <div style={{ color: '#64748B' }}>
                  <strong>Suitable For:</strong> Entrepreneurs seeking a smaller-format branded retail business.
                </div>
              </div>

              <a
                href="#franchise-application"
                onClick={() => setFormData({ ...formData, preferredFormat: 'CellCentral Express Kiosk' })}
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#0B63F6',
                  color: '#fff',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                <span>Inquire About Express Kiosk</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* OPTION B: CELLCENTRAL STORE */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #FED7AA',
                borderRadius: '20px',
                padding: '36px 32px',
                boxShadow: '0 8px 28px rgba(255,122,26,0.08)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: '#FFF7ED', color: '#C2410C', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, marginBottom: '16px' }}>
                OPTION B • FLAGSHIP
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', marginBottom: '6px' }}>
                CellCentral Store
              </h3>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#FF7A1A', marginBottom: '16px' }}>
                Full Retail Store Concept
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#64748B', marginBottom: '24px' }}>
                A proposed dedicated retail location offering a comprehensive selection of premium mobile accessories in a professionally designed environment.
              </p>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', marginBottom: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#0B1E3D', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Concept Features:
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                  <li>Dedicated CellCentral full-store storefront</li>
                  <li>Expanded product selection across all device categories</li>
                  <li>Professional wall-mounted perimeter merchandising</li>
                  <li>Dedicated customer service &amp; device test counter</li>
                  <li>Greater inventory storage &amp; display capacity</li>
                  <li>High brand impact in prime commercial districts</li>
                </ul>
              </div>

              <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginBottom: '24px', fontSize: '13.5px' }}>
                <div style={{ color: '#0B1E3D', marginBottom: '6px' }}>
                  <strong>Ideal Locations:</strong> Shopping plazas, commercial streets, power centers and premier retail districts.
                </div>
                <div style={{ color: '#64748B' }}>
                  <strong>Suitable For:</strong> Entrepreneurs and experienced retailers seeking a full CellCentral-branded retail operation.
                </div>
              </div>

              <a
                href="#franchise-application"
                onClick={() => setFormData({ ...formData, preferredFormat: 'CellCentral Retail Store' })}
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#FF7A1A',
                  color: '#fff',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                <span>Inquire About Full Store</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: INVESTMENT & BUSINESS REQUIREMENTS */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#0B63F6',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              05. INVESTMENT &amp; BUSINESS REQUIREMENTS
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Plan Your Investment With Confidence
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              Opening a CellCentral franchise will require an investment appropriate to the selected store format, location and
              operating requirements. Our goal is to provide qualified applicants with clear information about expected startup
              expenses, ongoing obligations and franchise requirements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Startup Investment Components */}
            <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <DollarSign size={22} color="#0B63F6" />
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                  Potential Startup Investment Components
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14.5px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Franchise Fee:</strong> Right to operate under the CellCentral brand and access the franchise system.</li>
                <li><strong>Store Lease &amp; Security Deposit:</strong> Costs associated with securing an approved retail location.</li>
                <li><strong>Store Design &amp; Construction:</strong> Interior improvements, counters, lighting, signage, and fixtures.</li>
                <li><strong>Initial Inventory:</strong> Opening stock of CellCentral mobile accessories based on store format.</li>
                <li><strong>Equipment &amp; Technology:</strong> Point-of-sale systems, computers, payment terminals, and inventory tools.</li>
                <li><strong>Licences &amp; Insurance:</strong> Business registrations, municipal approvals, insurance and permits.</li>
                <li><strong>Working Capital:</strong> Operating funds for rent, utilities, staffing, and initial inventory replenishment.</li>
              </ul>
            </div>

            {/* Ongoing Obligations & Candidate Qualifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', marginBottom: '12px' }}>
                  Ongoing Business Obligations
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                  Depending on the finalized franchise model, ongoing obligations may include inventory purchases, rent, employee wages, insurance, utilities, technology software costs, marketing contributions, and franchise royalties.
                </p>
              </div>

              <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1E3D', marginBottom: '12px' }}>
                  Franchise Candidate Qualifications
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#475569', lineHeight: 1.7 }}>
                  <li>A genuine passion for retail business ownership &amp; technology</li>
                  <li>Dedication to outstanding customer service</li>
                  <li>Financial capacity appropriate to the proposed business</li>
                  <li>Commitment to established brand and operating standards</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '32px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '12px',
              padding: '16px 20px',
              fontSize: '12.5px',
              color: '#475569',
              textAlign: 'center'
            }}
          >
            <strong>Investment Disclosure:</strong> Investment amounts, franchise fees, royalties, expected expenses and contractual commitments have not yet been published and will be communicated through the appropriate franchise qualification and disclosure process.
          </div>
        </div>
      </section>

      {/* SECTION 06: TRAINING & ONGOING SUPPORT */}
      <section style={{ padding: '80px 20px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#FF7A1A',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              06. TRAINING &amp; ONGOING SUPPORT
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Support for Every Stage of Your Retail Journey
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              CellCentral’s proposed franchise support system is intended to help approved franchise operators prepare for opening
              and manage their stores using consistent retail practices.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Pre-Opening Support */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Compass size={22} color="#0B63F6" />
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                  Pre-Opening Support
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Business Orientation:</strong> Introduction to brand, retail concept and expectations.</li>
                <li><strong>Store Planning:</strong> Guidance on approved layouts, signage, and fixtures.</li>
                <li><strong>Opening Inventory:</strong> Assistance choosing initial assortment for your market.</li>
                <li><strong>System Orientation:</strong> Introduction to ordering, inventory and POS processes.</li>
              </ul>
            </div>

            {/* Initial Training */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <GraduationCap size={22} color="#FF7A1A" />
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                  Initial Training
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Product Knowledge:</strong> Cases, screen protectors, chargers, and cables.</li>
                <li><strong>Customer Service:</strong> Device compatibility guidance and sales best practices.</li>
                <li><strong>Retail Merchandising:</strong> Product organization, display maintenance, and restocking.</li>
                <li><strong>Inventory Controls:</strong> Stock monitoring, reorder points, and shrinkage management.</li>
              </ul>
            </div>

            {/* Ongoing Support */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Wrench size={22} color="#10B981" />
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B1E3D', margin: 0 }}>
                  Ongoing Support
                </h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                <li><strong>Store Operations:</strong> Daily procedures, brand standards, and customer feedback.</li>
                <li><strong>Product Announcements:</strong> Immediate access to newly released phone model accessories.</li>
                <li><strong>Marketing Materials:</strong> Seasonal point-of-sale graphics and campaign updates.</li>
                <li><strong>Dedicated Assistance:</strong> Centralized communication and ordering assistance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: HOW TO BECOME A CELLCENTRAL FRANCHISE PARTNER (8 STEPS) */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <span
              style={{
                color: '#0B63F6',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              07. HOW TO BECOME A CELLCENTRAL FRANCHISE PARTNER
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Your Journey to CellCentral Business Ownership
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
              Our franchise recruitment process is designed to help both CellCentral and prospective partners evaluate the
              opportunity before making a commitment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              { step: '1', title: 'Submit Your Application', desc: 'Complete the online franchise inquiry form with contact details, preferred location, and business background.' },
              { step: '2', title: 'Initial Qualification', desc: 'Our team reviews your submission to assess whether your interests and background align with the opportunity.' },
              { step: '3', title: 'Discovery Meeting', desc: 'Qualified applicants are invited to discuss the retail concept, preferred store format, and potential locations.' },
              { step: '4', title: 'Due Diligence', desc: 'Applicants receive franchise information and disclosure materials for independent legal and financial review.' },
              { step: '5', title: 'Franchise Agreement', desc: 'Following mutual evaluation and legal disclosure completion, eligible applicants proceed to signing.' },
              { step: '6', title: 'Store Planning & Setup', desc: 'Work through location approval, store architectural design, fixture installation, and initial inventory setup.' },
              { step: '7', title: 'Training & Preparation', desc: 'Complete comprehensive pre-opening training covering product knowledge, POS, and operations.' },
              { step: '8', title: 'Grand Opening', desc: 'Welcome customers to your new CellCentral-branded mobile accessories store with ongoing brand support.' }
            ].map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFBFD',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '100px',
                    background: '#0B63F6',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '15px',
                    marginBottom: '14px'
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B1E3D', marginBottom: '8px' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#64748B' }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08: STORE APPLICATION FORM */}
      <section
        id="franchise-application"
        style={{
          padding: '80px 20px',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          color: '#0F172A'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                color: '#EA580C',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              08. STORE APPLICATION
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 900,
                color: '#0F172A',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Take the First Step Toward Owning a CellCentral Store
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#475569', maxWidth: '720px', margin: '0 auto' }}>
              Interested in becoming part of the CellCentral retail network? Complete the form below to introduce yourself
              and express your interest in a CellCentral store opportunity. Our team will review your inquiry and contact
              you if an appropriate opportunity is available.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              color: '#1E293B',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 48px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: '#ECFDF5',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0B1E3D', marginBottom: '12px' }}>
                  Franchise Inquiry Received!
                </h3>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 24px' }}>
                  Thank you for your interest in CellCentral Franchise Opportunities. Your inquiry has been received and will be reviewed by our franchise development team. We will contact you regarding potential next steps, where appropriate.
                </p>
                <div style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic', marginBottom: '28px' }}>
                  * Submitting an inquiry does not guarantee franchise approval or availability.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      city: '',
                      province: 'ON',
                      currentOccupation: '',
                      currentlyOwnBusiness: 'No',
                      retailExperience: 'No',
                      experienceDescription: '',
                      preferredFormat: 'Open to Both',
                      preferredCity: '',
                      hasLocation: 'No',
                      timeline: 'Within 3–6 Months',
                      investmentCapital: '$50,000–$100,000',
                      comments: '',
                      consent: false
                    });
                  }}
                  style={{
                    background: '#0B63F6',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* 1. PERSONAL INFORMATION */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    1. PERSONAL INFORMATION
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(416) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Toronto"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Province / Territory *
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. BUSINESS BACKGROUND */}
                <div style={{ marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    2. BUSINESS BACKGROUND
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Current Occupation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Retail Store Manager"
                        value={formData.currentOccupation}
                        onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Do You Currently Own a Business?
                      </label>
                      <select
                        value={formData.currentlyOwnBusiness}
                        onChange={(e) => setFormData({ ...formData, currentlyOwnBusiness: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Do You Have Retail Experience?
                      </label>
                      <select
                        value={formData.retailExperience}
                        onChange={(e) => setFormData({ ...formData, retailExperience: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                      Brief Description of Business Experience
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe your career background, management experience, or commercial interests..."
                      value={formData.experienceDescription}
                      onChange={(e) => setFormData({ ...formData, experienceDescription: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                {/* 3. FRANCHISE PREFERENCES */}
                <div style={{ marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    3. FRANCHISE PREFERENCES
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Preferred Franchise Format
                      </label>
                      <select
                        value={formData.preferredFormat}
                        onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="CellCentral Express Kiosk">CellCentral Express Kiosk</option>
                        <option value="CellCentral Retail Store">CellCentral Retail Store</option>
                        <option value="Open to Both">Open to Both</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Preferred City / Area for Franchise
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Calgary, AB / Mississauga, ON"
                        value={formData.preferredCity}
                        onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Do You Already Have a Suitable Location?
                      </label>
                      <select
                        value={formData.hasLocation}
                        onChange={(e) => setFormData({ ...formData, hasLocation: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Preferred Opening Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="Within 3–6 Months">Within 3–6 Months</option>
                        <option value="Within 6–12 Months">Within 6–12 Months</option>
                        <option value="More Than 12 Months">More Than 12 Months</option>
                        <option value="Exploring Opportunities">Exploring Opportunities</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. FINANCIAL QUALIFICATION */}
                <div style={{ marginBottom: '32px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B63F6', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    4. FINANCIAL QUALIFICATION
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Estimated Available Investment Capital (CAD)
                      </label>
                      <select
                        value={formData.investmentCapital}
                        onChange={(e) => setFormData({ ...formData, investmentCapital: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px', background: '#fff' }}
                      >
                        <option value="Under $50,000">Under $50,000</option>
                        <option value="$50,000–$100,000">$50,000–$100,000</option>
                        <option value="$100,000–$200,000">$100,000–$200,000</option>
                        <option value="Over $200,000">Over $200,000</option>
                        <option value="Prefer to Discuss">Prefer to Discuss</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0B1E3D', marginBottom: '6px' }}>
                        Questions or Special Comments
                      </label>
                      <input
                        type="text"
                        placeholder="Any additional details or questions..."
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* CONSENT & SUBMIT */}
                <div style={{ paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#475569',
                      cursor: 'pointer',
                      marginBottom: '24px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      style={{ marginTop: '3px', width: '17px', height: '17px', accentColor: '#0B63F6' }}
                    />
                    <span>
                      I consent to CellCentral collecting and using my submitted information to evaluate and respond to my franchise enquiry, in accordance with its Privacy Policy.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      background: isSubmitting ? '#94A3B8' : '#FF7A1A',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 24px rgba(255, 122, 26, 0.4)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>APPLY FOR FRANCHISE OPPORTUNITY</span>
                      </>
                    )}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#94A3B8', marginTop: '14px', margin: '14px 0 0' }}>
                    * Submitting an inquiry introduces your profile and initiates preliminary discussions. It does not constitute a franchise offering or contract.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 09: FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                color: '#0B63F6',
                fontSize: '12.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              09. FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 900,
                color: '#0B1E3D',
                margin: '10px 0 16px',
                letterSpacing: '-0.02em'
              }}
            >
              Everything You Need to Know About CellCentral Franchising
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.6, color: '#475569' }}>
              Have questions about becoming a CellCentral franchise partner? Here are common questions from prospective operators.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFBFD',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#0B1E3D' }}>
                    {faq.q}
                  </span>
                  <span style={{ color: '#0B63F6' }}>
                    {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div
                    style={{
                      padding: '0 22px 18px',
                      fontSize: '14.5px',
                      lineHeight: 1.6,
                      color: '#475569',
                      borderTop: '1px solid #F1F5F9'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CALL TO ACTION */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #0B63F6 0%, #004ECC 100%)',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            <span>JOIN THE CELLCENTRAL NETWORK</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              color: '#fff',
              margin: '0 0 16px',
              letterSpacing: '-0.02em'
            }}
          >
            Your Business Journey Starts Here.
          </h2>

          <p style={{ fontSize: '16.5px', lineHeight: 1.6, color: '#DBEAFE', marginBottom: '32px' }}>
            CellCentral is working toward a modern Canadian retail network built around premium mobile accessories, consistent
            branding, professional store presentation and strong retail partnerships. If you are passionate about
            entrepreneurship, customer service and retail business ownership, we invite you to explore our concept.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
            <a
              href="#franchise-application"
              style={{
                background: '#FF7A1A',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
              }}
            >
              APPLY TO OWN A CELLCENTRAL STORE
            </a>
            <Link
              href="/wholesale"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none'
              }}
            >
              Become a Retail Partner
            </Link>
          </div>

          <p style={{ fontSize: '11.5px', color: '#BFDBFE', margin: 0, fontStyle: 'italic' }}>
            Store opportunities are subject to availability, approval, applicable laws and execution of appropriate agreements.
          </p>
        </div>
      </section>
    </div>
  );
}
