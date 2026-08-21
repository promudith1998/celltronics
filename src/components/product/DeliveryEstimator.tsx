'use client';

import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock } from 'lucide-react';

export const DeliveryEstimator: React.FC = () => {
  const [postalCode, setPostalCode] = useState('');
  const [estimate, setEstimate] = useState<{ standard: string; express: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode.trim()) return;

    setLoading(true);
    setTimeout(() => {
      // Calculate realistic delivery dates
      const now = new Date();
      const stdDate = new Date(now.setDate(now.getDate() + 3));
      const expDate = new Date(now.setDate(now.getDate() - 1));

      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      setEstimate({
        standard: stdDate.toLocaleDateString('en-CA', options),
        express: expDate.toLocaleDateString('en-CA', options)
      });
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ marginTop: '24px', background: 'var(--gray-50)', padding: '16px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--gray-100)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>
        <Truck size={16} color="var(--blue)" />
        <span>Check Delivery Time across Canada</span>
      </div>

      <form onSubmit={handleCheck} className="delivery-box" style={{ marginTop: 0 }}>
        <input
          type="text"
          placeholder="Enter postal code (e.g. M5V 2T6, V6B 1A1)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
          maxLength={7}
        />
        <button type="submit" className="btn btn-ghost btn-sm" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {estimate && (
        <div style={{ marginTop: '12px', fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1EA672', fontWeight: 600 }}>
            <CheckCircle2 size={14} />
            <span>Standard Shipping: Estimated by <b>{estimate.standard}</b> (FREE over $49)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--navy)', fontWeight: 500 }}>
            <Clock size={14} color="var(--blue)" />
            <span>Canada Post Express: Estimated by <b>{estimate.express}</b> ($9.99)</span>
          </div>
        </div>
      )}
    </div>
  );
};
