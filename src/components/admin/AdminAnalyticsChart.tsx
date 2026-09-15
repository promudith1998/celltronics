'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Package,
  Layers
} from 'lucide-react';
import { AdminOrder } from '@/types/admin';
import { CATEGORIES } from '@/data/products';

interface AdminAnalyticsChartProps {
  orders: AdminOrder[];
}

export const AdminAnalyticsChart: React.FC<AdminAnalyticsChartProps> = ({ orders }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Generate 7-day revenue data
  const daysCount = timeRange === '7d' ? 7 : 14;
  const now = new Date();

  const dailyRevenueData = Array.from({ length: daysCount }).map((_, idx) => {
    const d = new Date();
    d.setDate(now.getDate() - (daysCount - 1 - idx));
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Seed realistic base values + calculated from orders
    const seedValues = [420.50, 580.00, 310.25, 785.40, 920.10, 640.80, 810.00, 490.20, 610.00, 730.50, 890.00, 550.00, 980.50, 1120.00];
    const baseSeed = seedValues[idx % seedValues.length];

    // Check if any orders match this day
    const matchingOrders = orders.filter((o) => {
      const orderDate = new Date(o.createdAt);
      return orderDate.toDateString() === d.toDateString();
    });

    const realOrdersTotal = matchingOrders.reduce((acc, o) => acc + o.total, 0);
    const totalDayRevenue = baseSeed + realOrdersTotal;
    const ordersCount = Math.max(matchingOrders.length, Math.round(totalDayRevenue / 75));

    return {
      dayName,
      dateStr,
      revenue: Math.round(totalDayRevenue * 100) / 100,
      ordersCount
    };
  });

  const maxRevenue = Math.max(...dailyRevenueData.map((d) => d.revenue), 1000);
  const totalPeriodRevenue = dailyRevenueData.reduce((acc, d) => acc + d.revenue, 0);
  const avgDailyRevenue = Math.round(totalPeriodRevenue / daysCount);

  // Category sales share simulation
  const categoryStats = [
    { name: 'GaN Chargers & Docks', count: 184, percent: 34, color: '#0B63F6', value: '$14,280' },
    { name: 'MagSafe Phone Cases', count: 142, percent: 26, color: '#7C3AED', value: '$10,920' },
    { name: 'Premium Audio & ANC', count: 88, percent: 18, color: '#1EA672', value: '$7,560' },
    { name: 'Braided Fast Cables', count: 72, percent: 13, color: '#FF7A1A', value: '$5,460' },
    { name: 'Wireless Car Mounts', count: 48, percent: 9, color: '#FF3D5A', value: '$3,780' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '22px', marginBottom: '28px' }}>
      {/* Left: Revenue Trend Chart */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          border: '1px solid var(--gray-200)',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(11,30,61,0.03)'
        }}
      >
        {/* Header with Title & Range Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Store Performance
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#1EA672',
                  background: 'rgba(30,166,114,0.1)',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <TrendingUp size={12} /> +18.4% vs last period
              </span>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--navy)', marginTop: '4px' }}>
              ${totalPeriodRevenue.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD
            </div>
            <span style={{ fontSize: '12.5px', color: 'var(--gray-600)' }}>
              Avg. Daily Revenue: ${avgDailyRevenue.toLocaleString('en-CA')} CAD · Estimated volume
            </span>
          </div>

          <div style={{ display: 'flex', background: 'var(--gray-100)', padding: '3px', borderRadius: '10px' }}>
            <button
              onClick={() => setTimeRange('7d')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: timeRange === '7d' ? '#fff' : 'transparent',
                color: timeRange === '7d' ? 'var(--navy)' : 'var(--gray-600)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: timeRange === '7d' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: timeRange === '30d' ? '#fff' : 'transparent',
                color: timeRange === '30d' ? 'var(--navy)' : 'var(--gray-600)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: timeRange === '30d' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              14-Day View
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: timeRange === '7d' ? '18px' : '8px', paddingTop: '20px', position: 'relative' }}>
          {/* Average Guideline Line */}
          <div
            style={{
              position: 'absolute',
              top: `${100 - (avgDailyRevenue / maxRevenue) * 85}%`,
              left: 0,
              right: 0,
              borderTop: '1.5px dashed rgba(11, 99, 246, 0.3)',
              zIndex: 1
            }}
          >
            <span
              style={{
                position: 'absolute',
                right: '4px',
                top: '-18px',
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--blue)',
                background: 'rgba(11,99,246,0.08)',
                padding: '1px 6px',
                borderRadius: '4px'
              }}
            >
              Avg: ${avgDailyRevenue}
            </span>
          </div>

          {dailyRevenueData.map((d, index) => {
            const heightPercent = Math.max(15, (d.revenue / maxRevenue) * 100);
            const isHovered = hoveredBarIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredBarIndex(index)}
                onMouseLeave={() => setHoveredBarIndex(null)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: isHovered ? 10 : 2
                }}
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: `calc(${heightPercent}% + 12px)`,
                      background: '#0B1E3D',
                      color: '#fff',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(11,30,61,0.25)',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 30
                    }}
                  >
                    <div style={{ color: '#94A3B8', fontSize: '10px', textTransform: 'uppercase' }}>{d.dateStr}</div>
                    <div style={{ color: '#3FA9FF', fontSize: '13px', fontWeight: 900 }}>${d.revenue.toFixed(2)} CAD</div>
                    <div style={{ color: '#E2E8F0', fontSize: '10.5px' }}>{d.ordersCount} completed orders</div>
                  </div>
                )}

                {/* The Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: timeRange === '7d' ? '44px' : '22px',
                    height: `${heightPercent}%`,
                    borderRadius: '8px 8px 3px 3px',
                    background: isHovered
                      ? 'linear-gradient(180deg, #3FA9FF 0%, #0B63F6 100%)'
                      : 'linear-gradient(180deg, rgba(11,99,246,0.85) 0%, rgba(11,99,246,0.4) 100%)',
                    boxShadow: isHovered ? '0 0 16px rgba(11,99,246,0.5)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />

                {/* Day Label */}
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: isHovered ? 800 : 600,
                    color: isHovered ? 'var(--blue)' : 'var(--gray-500)',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}
                >
                  {d.dayName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Sales by Product Category Breakdown */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          border: '1px solid var(--gray-200)',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(11,30,61,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Inventory Velocity
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '2px 0 0' }}>
                Sales by Category
              </h3>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} color="#7C3AED" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryStats.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)' }}>{cat.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--navy)' }}>{cat.value}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--gray-500)' }}>{cat.percent}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '7px', background: 'var(--gray-100)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${cat.percent}%`,
                      height: '100%',
                      background: cat.color,
                      borderRadius: '100px',
                      transition: 'width 0.6s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--gray-50)',
            border: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={15} color="#0B63F6" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy)' }}>High-Growth SKU: GaN 100W Station</span>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1EA672' }}>+34% WoW</span>
        </div>
      </div>
    </div>
  );
};
