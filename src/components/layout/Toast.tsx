'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center' }}>
            {toast.type === 'success' && <CheckCircle2 size={20} color="#1EA672" />}
            {toast.type === 'info' && <Info size={20} color="var(--blue-light)" />}
            {toast.type === 'warning' && <AlertTriangle size={20} color="var(--orange)" />}
            {toast.type === 'error' && <AlertCircle size={20} color="var(--red)" />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '13.5px', lineHeight: 1.2 }}>{toast.title}</div>
            {toast.message && (
              <div style={{ fontSize: '12px', color: '#C6D2EA', marginTop: '2px' }}>{toast.message}</div>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ background: 'none', color: '#8891A5', padding: '4px', cursor: 'pointer' }}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};
