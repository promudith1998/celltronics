import React from 'react';
import { Truck, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="item">
          <Truck />
          <span>
            <span className="accent">FREE SHIPPING</span> on orders over $49 across Canada
          </span>
        </div>
        <div className="item">
          <ShieldCheck />
          <span>
            <span className="accent">1-YEAR WARRANTY</span> on all eligible products
          </span>
        </div>
        <div className="item">
          <span>Proudly Canadian 🇨🇦</span>
        </div>
      </div>
    </div>
  );
};
