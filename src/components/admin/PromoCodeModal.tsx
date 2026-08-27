'use client';

import React, { useState, useEffect } from 'react';
import { X, Tag, Check, DollarSign, Percent } from 'lucide-react';
import { PromoCode } from '@/types/admin';

interface PromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (promo: PromoCode) => void;
  promoToEdit?: PromoCode | null;
}

export const PromoCodeModal: React.FC<PromoCodeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  promoToEdit
}) => {
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState<number>(15);
  const [minSpend, setMinSpend] = useState<number | ''>(0);
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (promoToEdit) {
      setCode(promoToEdit.code);
      if (promoToEdit.discountPercent) {
        setDiscountType('percent');
        setDiscountValue(promoToEdit.discountPercent);
      } else if (promoToEdit.discountAmount) {
        setDiscountType('fixed');
        setDiscountValue(promoToEdit.discountAmount);
      }
      setMinSpend(promoToEdit.minSpend ?? 0);
      setDescription(promoToEdit.description || '');
      setIsActive(promoToEdit.isActive);
    } else {
      setCode('');
      setDiscountType('percent');
      setDiscountValue(15);
      setMinSpend(0);
      setDescription('15% OFF VIP promo code discount');
      setIsActive(true);
    }
  }, [promoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const promo: PromoCode = {
      code: code.trim().toUpperCase(),
      discountPercent: discountType === 'percent' ? Number(discountValue) : undefined,
      discountAmount: discountType === 'fixed' ? Number(discountValue) : undefined,
      minSpend: minSpend ? Number(minSpend) : 0,
      description: description.trim() || `${discountValue}${discountType === 'percent' ? '%' : '$'} OFF discount`,
      isActive,
      usedCount: promoToEdit?.usedCount || 0
    };

    onSave(promo);
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
          maxWidth: '540px',
          boxShadow: '0 25px 60px rgba(11,30,61,0.25)',
          overflow: 'hidden',
          animation: 'modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0B1E3D 0%, #132A52 100%)',
            color: '#fff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(11,99,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag size={18} color="#3FA9FF" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                {promoToEdit ? 'Edit Promo Code' : 'Create New Promo Code'}
              </h3>
              <span style={{ fontSize: '11px', color: '#3FA9FF', fontWeight: 700 }}>DISCOUNT MANAGEMENT</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Coupon Code String *
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
              placeholder="e.g. SUMMER25 or SAVE15"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--blue)',
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                fontFamily: 'monospace',
                color: 'var(--navy)',
                textTransform: 'uppercase'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Discount Type
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setDiscountType('percent')}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: '8px',
                    border: discountType === 'percent' ? '1.5px solid var(--blue)' : '1px solid var(--gray-200)',
                    background: discountType === 'percent' ? 'rgba(11,99,246,0.08)' : '#fff',
                    color: discountType === 'percent' ? 'var(--blue)' : 'var(--gray-700)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Percent size={14} /> Percentage
                </button>
                <button
                  type="button"
                  onClick={() => setDiscountType('fixed')}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: '8px',
                    border: discountType === 'fixed' ? '1.5px solid var(--blue)' : '1px solid var(--gray-200)',
                    background: discountType === 'fixed' ? 'rgba(11,99,246,0.08)' : '#fff',
                    color: discountType === 'fixed' ? 'var(--blue)' : 'var(--gray-700)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <DollarSign size={14} /> Fixed $
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Discount Value ({discountType === 'percent' ? '%' : '$ CAD'}) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--gray-200)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--navy)'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Minimum Order Subtotal ($ CAD)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={minSpend}
              onChange={(e) => setMinSpend(e.target.value ? parseFloat(e.target.value) : '')}
              placeholder="0 (No minimum spend required)"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--gray-200)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Customer Description / Explanation
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 20% OFF on all phone accessories over $40"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--gray-200)',
                fontSize: '13.5px'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--gray-50)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--gray-200)' }}>
            <input
              type="checkbox"
              id="promoActiveCheck"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="promoActiveCheck" style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--navy)', cursor: 'pointer' }}>
              Code Active &amp; Redeemable at Checkout
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: '1.5px solid var(--gray-300)',
                background: '#fff',
                fontSize: '13.5px',
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
                padding: '10px 24px',
                borderRadius: '10px',
                background: 'var(--grad-brand)',
                color: '#fff',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(11,99,246,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={16} /> Save Promo Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
