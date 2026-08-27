'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Flame, Calendar, Tag, Layers, ArrowRight } from 'lucide-react';
import { PromotionCampaign, GradientTheme } from '@/types/admin';
import { CATEGORIES } from '@/data/products';

interface CampaignFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: Omit<PromotionCampaign, 'id'>, existingId?: string) => void;
  campaignToEdit?: PromotionCampaign | null;
}

const GRADIENT_PREVIEWS: { id: GradientTheme; name: string; gradient: string; textColor: string }[] = [
  { id: 'blue-purple', name: 'Neon Cyber Blue', gradient: 'linear-gradient(135deg, #0B1E3D 0%, #1E3A8A 50%, #4F46E5 100%)', textColor: '#fff' },
  { id: 'violet-magsafe', name: 'MagSafe Titanium Violet', gradient: 'linear-gradient(135deg, #2E1065 0%, #581C87 50%, #7C3AED 100%)', textColor: '#fff' },
  { id: 'orange-pink', name: 'Solar Sunset Neon', gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)', textColor: '#fff' },
  { id: 'emerald-teal', name: 'Emerald Power GaN', gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)', textColor: '#fff' },
  { id: 'cyber-dark', name: 'Stealth Carbon Matrix', gradient: 'linear-gradient(135deg, #090D16 0%, #1E293B 50%, #334155 100%)', textColor: '#fff' },
  { id: 'crimson-fire', name: 'Flash Deal Crimson Fire', gradient: 'linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)', textColor: '#fff' }
];

export const CampaignFormModal: React.FC<CampaignFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  campaignToEdit
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badgeText, setBadgeText] = useState('SPECIAL EVENT · 25% OFF');
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [gradientTheme, setGradientTheme] = useState<GradientTheme>('blue-purple');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [isActive, setIsActive] = useState(true);
  const [targetCategory, setTargetCategory] = useState<string>('all');
  const [linkUrl, setLinkUrl] = useState('/shop');

  useEffect(() => {
    if (campaignToEdit) {
      setName(campaignToEdit.name || '');
      setTitle(campaignToEdit.title || '');
      setSubtitle(campaignToEdit.subtitle || '');
      setBadgeText(campaignToEdit.badgeText || 'SALE');
      setDiscountPercent(campaignToEdit.discountPercent || 20);
      setGradientTheme(campaignToEdit.gradientTheme || 'blue-purple');
      setStartDate(campaignToEdit.startDate || new Date().toISOString().slice(0, 10));
      setEndDate(campaignToEdit.endDate || new Date().toISOString().slice(0, 10));
      setIsActive(campaignToEdit.isActive ?? true);
      setTargetCategory(campaignToEdit.targetCategory || 'all');
      setLinkUrl(campaignToEdit.linkUrl || '/shop');
    } else {
      setName('Spring Fast Charging Promo');
      setTitle('SUPERCHARGE YOUR EVERYDAY TECH');
      setSubtitle('Save up to 25% on GaN III fast chargers, MagSafe portable power, and braided cords.');
      setBadgeText('SPRING SALE · 25% OFF');
      setDiscountPercent(25);
      setGradientTheme('blue-purple');
      setStartDate(new Date().toISOString().slice(0, 10));
      setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
      setIsActive(true);
      setTargetCategory('chargers');
      setLinkUrl('/shop/chargers');
    }
  }, [campaignToEdit, isOpen]);

  if (!isOpen) return null;

  const currentTheme = GRADIENT_PREVIEWS.find((g) => g.id === gradientTheme) || GRADIENT_PREVIEWS[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;

    const data: Omit<PromotionCampaign, 'id'> = {
      name: name.trim(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      badgeText: badgeText.trim(),
      discountPercent: Number(discountPercent),
      gradientTheme,
      startDate,
      endDate,
      isActive,
      targetCategory: targetCategory === 'all' ? undefined : targetCategory,
      linkUrl: linkUrl.trim() || '/shop'
    };

    onSave(data, campaignToEdit?.id);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11,30,61,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(11,30,61,0.25)',
          overflow: 'hidden',
          animation: 'modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0B1E3D 0%, #132A52 100%)',
            color: '#fff'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#FF7A1A', textTransform: 'uppercase' }}>
              MARKETING &amp; PROMOTIONS
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
              {campaignToEdit ? 'Edit Promotional Campaign' : 'Create New Campaign'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Live Banner Preview Card */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Live Promotional Banner Preview
              </label>
              <div
                style={{
                  background: currentTheme.gradient,
                  borderRadius: '18px',
                  padding: '28px 24px',
                  color: '#fff',
                  boxShadow: '0 10px 30px rgba(11,30,61,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '10px' }}>
                  <Sparkles size={13} color="#FF7A1A" />
                  <span>{badgeText || 'SPECIAL CAMPAIGN'}</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  {title || 'Campaign Title Headline'}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', margin: '0 0 16px', maxWidth: '600px', lineHeight: 1.4 }}>
                  {subtitle || 'Campaign promotional description text highlights.'}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>
                  <span>Shop Featured Deals</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Campaign Name & Target Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Internal Campaign Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Black Friday 2026 GaN Sale"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--navy)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Target Category
                </label>
                <select
                  value={targetCategory}
                  onChange={(e) => {
                    setTargetCategory(e.target.value);
                    if (e.target.value !== 'all') {
                      setLinkUrl(`/shop/${e.target.value}`);
                    } else {
                      setLinkUrl('/shop');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--navy)',
                    background: '#fff'
                  }}
                >
                  <option value="all">All Categories (Store-Wide)</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Banner Text Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Banner Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SUPERCHARGE YOUR WORKFLOW"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '14px',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Ribbon Pill Badge Text
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. FLASH DEAL · 30% OFF"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Banner Subtitle &amp; Value Proposition
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Highlight key products, savings, or perks..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--gray-200)',
                  fontSize: '13.5px',
                  color: 'var(--navy)'
                }}
              />
            </div>

            {/* Gradient Theme Selector */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Banner Visual Gradient Theme
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {GRADIENT_PREVIEWS.map((g) => {
                  const isSel = gradientTheme === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setGradientTheme(g.id)}
                      style={{
                        background: g.gradient,
                        padding: '14px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: isSel ? '2.5px solid #fff' : '2px solid transparent',
                        outline: isSel ? '2px solid var(--blue)' : 'none',
                        color: g.textColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <span style={{ fontSize: '12.5px', fontWeight: 700 }}>{g.name}</span>
                      {isSel && <Check size={16} color="#fff" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date Range & Active Switch */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--gray-200)',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '22px' }}>
                <input
                  type="checkbox"
                  id="campActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <label htmlFor="campActiveCheck" style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>
                  Campaign Active &amp; Live
                </label>
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div
            style={{
              padding: '18px 32px',
              borderTop: '1px solid var(--gray-200)',
              background: 'var(--gray-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1.5px solid var(--gray-300)',
                background: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--gray-700)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: '11px 28px',
                borderRadius: '10px',
                background: 'var(--grad-brand)',
                color: '#fff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 800,
                boxShadow: '0 4px 16px rgba(11,99,246,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Check size={16} />
              {campaignToEdit ? 'Update Campaign' : 'Publish Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
