import React from 'react';

interface ProductIconProps {
  type?: 'case' | 'charger' | 'cable' | 'power' | 'audio' | 'screen' | 'mount';
  iconType?: 'case' | 'charger' | 'cable' | 'power' | 'audio' | 'screen' | 'mount';
  size?: number | string;
  strokeUrl?: string;
  color?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({
  type,
  iconType,
  size = '100%',
  strokeUrl = 'url(#brandGrad)',
  color,
}) => {
  const finalType = type || iconType || 'case';
  switch (finalType) {
    case 'screen':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 10px 20px rgba(11,99,246,0.18))' }}
        >
          <defs>
            <linearGradient id="screenGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#3FA9FF" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#FF2E93" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="phoneBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B1E3D" />
            </linearGradient>
            <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3FA9FF" />
              <stop offset="50%" stopColor="#FF2E93" />
              <stop offset="100%" stopColor="#FF7A1A" />
            </linearGradient>
            <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Device Shadow & Base */}
          <rect x="52" y="24" width="96" height="152" rx="20" fill="url(#phoneBody)" stroke="#334155" strokeWidth="2.5" />
          
          {/* Inner OLED Screen with vibrant wallpaper */}
          <rect x="56" y="28" width="88" height="144" rx="16" fill="#070D18" />
          <rect x="56" y="28" width="88" height="144" rx="16" fill="url(#screenGlass)" opacity="0.35" />

          {/* 9H Tempered Glass Protector floating slightly above with Rainbow Bevel */}
          <rect
            x="50"
            y="22"
            width="100"
            height="156"
            rx="22"
            fill="none"
            stroke="url(#borderGlow)"
            strokeWidth="3.5"
            strokeDasharray="none"
          />

          {/* Glass Diagonal Reflection */}
          <path
            d="M 52 38 L 138 24 L 148 50 L 52 130 Z"
            fill="url(#glassShine)"
            opacity="0.75"
          />

          {/* Speaker Cutout & Dynamic Island */}
          <rect x="85" y="32" width="30" height="7" rx="3.5" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <circle cx="107" cy="35.5" r="1.8" fill="#1E293B" />

          {/* 9H+ Diamond Hardness Shield Badge in center */}
          <g transform="translate(100, 102) scale(0.9)">
            <circle cx="0" cy="0" r="22" fill="#0B1E3D" fillOpacity="0.85" stroke="url(#borderGlow)" strokeWidth="2" />
            <path d="M -8 -4 L 0 -11 L 8 -4 L 0 11 Z" fill="url(#brandGrad)" />
            <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="var(--font-mono)">9H+</text>
          </g>

          {/* Alignment guide corner markers */}
          <path d="M 44 32 L 44 20 L 56 20" fill="none" stroke="#3FA9FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M 156 32 L 156 20 L 144 20" fill="none" stroke="#3FA9FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M 44 168 L 44 180 L 56 180" fill="none" stroke="#FF2E93" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M 156 168 L 156 180 L 144 180" fill="none" stroke="#FF7A1A" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case 'case':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 12px 24px rgba(11,30,61,0.2))' }}
        >
          <defs>
            <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0B1E3D" />
            </linearGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B63F6" />
              <stop offset="50%" stopColor="#FF2E93" />
              <stop offset="100%" stopColor="#FF7A1A" />
            </linearGradient>
          </defs>

          {/* Case Outer Armor with reinforced shock corners */}
          <rect x="50" y="20" width="100" height="160" rx="24" fill="url(#caseGradient)" stroke="url(#ringGrad)" strokeWidth="3" />

          {/* Corner Bumper Air Cushions */}
          <path d="M 48 40 Q 46 20 66 18" fill="none" stroke="#3FA9FF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 152 40 Q 154 20 134 18" fill="none" stroke="#3FA9FF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 48 160 Q 46 180 66 182" fill="none" stroke="#FF2E93" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 152 160 Q 154 180 134 182" fill="none" stroke="#FF7A1A" strokeWidth="3.5" strokeLinecap="round" />

          {/* Camera Island Bezel */}
          <rect x="58" y="28" width="42" height="46" rx="12" fill="#0B132B" stroke="url(#ringGrad)" strokeWidth="1.8" />
          {/* 3 Camera Lenses with Sapphire Reflections */}
          <circle cx="69" cy="40" r="7" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="69" cy="40" r="3.5" fill="#0B63F6" />
          <circle cx="89" cy="40" r="7" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="89" cy="40" r="3.5" fill="#FF2E93" />
          <circle cx="69" cy="61" r="7" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="69" cy="61" r="3.5" fill="#FF7A1A" />
          <circle cx="89" cy="61" r="3" fill="#E2E8F0" opacity="0.9" /> {/* Flash */}

          {/* MagSafe Magnetic Ring System */}
          <circle cx="100" cy="115" r="26" fill="none" stroke="url(#ringGrad)" strokeWidth="3.5" strokeDasharray="5,2" />
          <line x1="100" y1="144" x2="100" y2="158" stroke="url(#ringGrad)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Tactile Side Buttons */}
          <rect x="47" y="55" width="2" height="12" rx="1" fill="#94A3B8" />
          <rect x="47" y="73" width="2" height="12" rx="1" fill="#94A3B8" />
          <rect x="151" y="60" width="2" height="20" rx="1" fill="#94A3B8" />
        </svg>
      );

    case 'charger':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 12px 24px rgba(11,30,61,0.2))' }}
        >
          <defs>
            <linearGradient id="chargerBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B1E3D" />
            </linearGradient>
            <linearGradient id="portGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B63F6" />
              <stop offset="100%" stopColor="#3FA9FF" />
            </linearGradient>
          </defs>

          {/* Foldable Prongs (Top) */}
          <rect x="82" y="20" width="8" height="22" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          <rect x="110" y="20" width="8" height="22" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />

          {/* Charger Main Block */}
          <rect x="52" y="38" width="96" height="124" rx="18" fill="url(#chargerBody)" stroke="url(#brandGrad)" strokeWidth="2.5" />

          {/* Silkscreen GaN III Brand Label */}
          <text x="100" y="68" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="var(--font-mono)">65W GaN</text>
          <text x="100" y="80" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.08em">FAST CHARGE</text>

          {/* Port 1: USB-C PD */}
          <rect x="74" y="92" width="52" height="14" rx="7" fill="#0A0F1D" stroke="url(#brandGrad)" strokeWidth="1.5" />
          <rect x="85" y="97" width="30" height="4" rx="2" fill="url(#portGrad)" />

          {/* Port 2: USB-C PD */}
          <rect x="74" y="114" width="52" height="14" rx="7" fill="#0A0F1D" stroke="url(#brandGrad)" strokeWidth="1.5" />
          <rect x="85" y="119" width="30" height="4" rx="2" fill="url(#portGrad)" />

          {/* Port 3: USB-A QC */}
          <rect x="74" y="136" width="52" height="14" rx="3" fill="#0A0F1D" stroke="#FF7A1A" strokeWidth="1.5" />
          <rect x="80" y="141" width="40" height="4" rx="1" fill="#FF7A1A" />

          {/* LED Active Glow Indicator */}
          <circle cx="100" cy="158" r="2.5" fill="#3FA9FF" />
          <circle cx="100" cy="158" r="5" fill="#3FA9FF" opacity="0.4" />
        </svg>
      );

    case 'cable':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 10px 20px rgba(11,99,246,0.2))' }}
        >
          {/* Braided Cable S-Loop Body */}
          <path
            d="M 40 140 C 40 60, 160 60, 160 140 C 160 180, 70 180, 70 120 C 70 80, 130 80, 130 110"
            fill="none"
            stroke="url(#brandGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Cable Braiding Over-stitch Effect */}
          <path
            d="M 40 140 C 40 60, 160 60, 160 140 C 160 180, 70 180, 70 120 C 70 80, 130 80, 130 110"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="4,6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Aluminum USB-C Connector Housing (Left) */}
          <g transform="translate(26, 125)">
            <rect x="0" y="0" width="28" height="30" rx="6" fill="#0F172A" stroke="url(#brandGrad)" strokeWidth="2" />
            <rect x="6" y="-12" width="16" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <rect x="9" y="-9" width="10" height="3" rx="1.5" fill="#0B63F6" />
            <text x="14" y="19" fill="#94A3B8" fontSize="6.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">100W</text>
          </g>

          {/* Aluminum USB-C Connector Housing (Right) */}
          <g transform="translate(116, 95)">
            <rect x="0" y="0" width="28" height="30" rx="6" fill="#0F172A" stroke="url(#brandGrad)" strokeWidth="2" />
            <rect x="6" y="28" width="16" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <rect x="9" y="34" width="10" height="3" rx="1.5" fill="#FF2E93" />
            <text x="14" y="19" fill="#94A3B8" fontSize="6.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">PD</text>
          </g>

          {/* Silicone Cable Strap Tie */}
          <rect x="92" y="90" width="16" height="36" rx="6" fill="#FF7A1A" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
          <circle cx="100" cy="116" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'power':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 12px 24px rgba(11,30,61,0.22))' }}
        >
          <defs>
            <linearGradient id="pbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0B1E3D" />
            </linearGradient>
          </defs>

          {/* Power Bank Enclosure */}
          <rect x="52" y="30" width="96" height="140" rx="20" fill="url(#pbGradient)" stroke="url(#brandGrad)" strokeWidth="3" />

          {/* LED Digital Display Glass Window */}
          <rect x="66" y="44" width="68" height="26" rx="8" fill="#050B14" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="100" y="62" fill="#3FA9FF" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="var(--font-mono)">100%</text>
          <circle cx="123" cy="57" r="2" fill="#1EA672" />

          {/* Magnetic Alignment Ring */}
          <circle cx="100" cy="115" r="26" fill="none" stroke="url(#brandGrad)" strokeWidth="3" strokeDasharray="6,3" />
          <circle cx="100" cy="115" r="8" fill="rgba(255,46,147,0.15)" stroke="url(#brandGrad)" strokeWidth="1.5" />
          <path d="M 100 109 L 100 121 M 94 115 L 106 115" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          {/* Foldable Kickstand Hinge on Back */}
          <rect x="70" y="148" width="60" height="10" rx="5" fill="#334155" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <circle cx="78" cy="153" r="2.5" fill="#94A3B8" />
          <circle cx="122" cy="153" r="2.5" fill="#94A3B8" />
        </svg>
      );

    case 'audio':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 12px 24px rgba(11,30,61,0.2))' }}
        >
          {/* Wireless Charging Case Base */}
          <rect x="46" y="70" width="108" height="88" rx="34" fill="#0F172A" stroke="url(#brandGrad)" strokeWidth="3" />
          {/* Case Lid Seam Line */}
          <path d="M 47 98 L 153 98" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          {/* LED Battery Status Bar */}
          <rect x="92" y="108" width="16" height="4" rx="2" fill="#1EA672" />

          {/* Left Earbud in Dock */}
          <g transform="translate(68, 42)">
            <ellipse cx="14" cy="22" rx="14" ry="18" fill="#1E293B" stroke="url(#brandGrad)" strokeWidth="2" />
            <rect x="9" y="32" width="10" height="24" rx="5" fill="#0B1E3D" stroke="#3FA9FF" strokeWidth="1.5" />
            <circle cx="14" cy="20" r="5" fill="#FF2E93" />
          </g>

          {/* Right Earbud in Dock */}
          <g transform="translate(104, 42)">
            <ellipse cx="14" cy="22" rx="14" ry="18" fill="#1E293B" stroke="url(#brandGrad)" strokeWidth="2" />
            <rect x="9" y="32" width="10" height="24" rx="5" fill="#0B1E3D" stroke="#FF7A1A" strokeWidth="1.5" />
            <circle cx="14" cy="20" r="5" fill="#3FA9FF" />
          </g>
        </svg>
      );

    case 'mount':
      return (
        <svg
          viewBox="0 0 200 200"
          style={{ width: size, height: size, filter: 'drop-shadow(0 12px 24px rgba(11,30,61,0.22))' }}
        >
          {/* Dash/Vent Support Arm & Suction Cup */}
          <ellipse cx="100" cy="170" rx="36" ry="12" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
          <path d="M 94 135 L 94 165 M 106 135 L 106 165" stroke="#334155" strokeWidth="4" />
          <circle cx="100" cy="130" r="12" fill="#0F172A" stroke="url(#brandGrad)" strokeWidth="2" />

          {/* Main Charging Cradle */}
          <rect x="62" y="38" width="76" height="96" rx="16" fill="#0B1E3D" stroke="url(#brandGrad)" strokeWidth="3" />
          
          {/* Glowing Qi Wireless Coil */}
          <circle cx="100" cy="80" r="22" fill="none" stroke="url(#brandGrad)" strokeWidth="2.5" strokeDasharray="4,2" />
          <path d="M 100 70 L 100 90 M 90 80 L 110 80" stroke="#3FA9FF" strokeWidth="2" strokeLinecap="round" />

          {/* Motorized Auto-Clamping Left & Right Arms */}
          <path d="M 62 70 L 46 72 Q 44 86 52 92 L 62 90" fill="#1E293B" stroke="#3FA9FF" strokeWidth="2" />
          <path d="M 138 70 L 154 72 Q 156 86 148 92 L 138 90" fill="#1E293B" stroke="#FF7A1A" strokeWidth="2" />

          {/* Bottom Foot Rest */}
          <rect x="80" y="130" width="40" height="8" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
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
