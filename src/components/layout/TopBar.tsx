import React from 'react';
import { Truck, Shield } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '36px', flexWrap: 'wrap' }}>
        {/* Left: Free Shipping */}
        <div className="item" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Truck size={14} color="#3FA9FF" />
          <span>
            <strong style={{ color: '#3FA9FF', fontWeight: 800 }}>FREE SHIPPING</strong> on orders over $49 across Canada
          </span>
        </div>

        {/* Center: 1-Year Warranty */}
        <div className="item" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Shield size={14} color="#FF7A1A" />
          <span>
            <strong style={{ color: '#FF7A1A', fontWeight: 800 }}>1-YEAR WARRANTY</strong> on all products
          </span>
        </div>

        {/* Right: Proudly Canadian */}
        <div className="item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <span style={{ color: '#FF3D5A', fontSize: '13px' }}>🍁</span>
          <span>Proudly Canadian 🇨🇦</span>
        </div>
      </div>
    </div>
  );
};
