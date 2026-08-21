import React from 'react';

interface ProductIconProps {
  type: 'case' | 'charger' | 'cable' | 'power' | 'audio' | 'screen' | 'mount';
  size?: number | string;
  strokeUrl?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({
  type,
  size = '100%',
  strokeUrl = 'url(#brandGrad)'
}) => {
  switch (type) {
    case 'case':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <rect x="6" y="1.4" width="12" height="21.2" rx="2.6" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      );
    case 'charger':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <rect x="3" y="7" width="14" height="10" rx="2" />
          <path d="M17 10h1.6a2 2 0 0 1 2 2v.4a2 2 0 0 1-2 2H17" />
        </svg>
      );
    case 'cable':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <path d="M3 8c4.4 3.4 13.6 3.4 18 0M3 8v3.4c4.4 3.4 13.6 3.4 18 0V8" />
        </svg>
      );
    case 'power':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <rect x="5" y="3" width="14" height="18" rx="2.6" />
          <path d="M10 9l3 3-3 3" />
        </svg>
      );
    case 'audio':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <path d="M4 14a8 8 0 0 1 16 0" />
          <rect x="2" y="14" width="5" height="7" rx="1.5" />
          <rect x="17" y="14" width="5" height="7" rx="1.5" />
        </svg>
      );
    case 'screen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <rect x="7" y="1.6" width="10" height="20.8" rx="2" />
          <path d="M9.5 5h5" />
        </svg>
      );
    case 'mount':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <path d="M4 17l2-7a3 3 0 0 1 3-2h6a3 3 0 0 1 3 2l2 7" />
          <circle cx="7.5" cy="17.5" r="1.6" />
          <circle cx="16.5" cy="17.5" r="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeUrl} strokeWidth="1.4" style={{ width: size, height: size }}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
  }
};
