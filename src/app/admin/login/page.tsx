'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { LayoutDashboard } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <AdminAuthGate>
      <div
        style={{
          minHeight: '100vh',
          background: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'var(--font-sans), sans-serif'
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '36px',
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#10B981'
            }}
          >
            <LayoutDashboard size={28} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
            Administrator Verified
          </h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 24px', lineHeight: 1.5 }}>
            Your 2-factor authentication session is active. You can proceed directly to the dashboard.
          </p>

          <button
            onClick={() => router.push('/admin')}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              background: '#0B63F6',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(11, 99, 246, 0.25)'
            }}
          >
            Open Admin Command Center →
          </button>
        </div>
      </div>
    </AdminAuthGate>
  );
}
