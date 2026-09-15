'use client';

import React from 'react';
import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { AdminOrder, OrderStatus } from '@/types/admin';

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  if (!isOpen || !order) return null;

  const getStatusColor = (st: OrderStatus) => {
    switch (st) {
      case 'delivered':
        return { bg: 'rgba(30,166,114,0.12)', text: '#1EA672', border: 'rgba(30,166,114,0.3)' };
      case 'shipped':
        return { bg: 'rgba(11,99,246,0.12)', text: '#0B63F6', border: 'rgba(11,99,246,0.3)' };
      case 'processing':
        return { bg: 'rgba(255,122,26,0.12)', text: '#FF7A1A', border: 'rgba(255,122,26,0.3)' };
      case 'cancelled':
        return { bg: 'rgba(255,61,90,0.12)', text: '#FF3D5A', border: 'rgba(255,61,90,0.3)' };
      default:
        return { bg: 'rgba(100,116,139,0.12)', text: '#64748B', border: 'rgba(100,116,139,0.3)' };
    }
  };

  const statusStyle = getStatusColor(order.status);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 30, 61, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--gray-50)',
            borderRadius: '24px 24px 0 0'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                Order #{order.orderNumber}
              </h2>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: statusStyle.bg,
                  color: statusStyle.text,
                  border: `1px solid ${statusStyle.border}`,
                  textTransform: 'uppercase'
                }}
              >
                {order.status}
              </span>
            </div>
            <span style={{ fontSize: '12.5px', color: 'var(--gray-500)', marginTop: '2px', display: 'block' }}>
              Placed on {new Date(order.createdAt).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: '#fff',
                border: '1px solid var(--gray-300)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--navy)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              title="Print Order Receipt"
            >
              <Printer size={15} /> Print
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gray-500)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Status Workflow Selector Bar */}
        <div
          style={{
            padding: '14px 28px',
            background: '#F1F5F9',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--blue)" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)' }}>Update Fulfillment Status:</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => onUpdateStatus(order.id, st)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: order.status === st ? '1.5px solid var(--blue)' : '1px solid var(--gray-300)',
                  background: order.status === st ? '#0B63F6' : '#fff',
                  color: order.status === st ? '#fff' : 'var(--navy)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of Customer & Shipping Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Customer Box */}
            <div
              style={{
                padding: '18px',
                borderRadius: '16px',
                background: 'var(--gray-50)',
                border: '1px solid var(--gray-200)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <User size={16} color="var(--blue)" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                  Customer Details
                </span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--navy)' }}>{order.customerName}</div>
              <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '2px' }}>{order.customerEmail}</div>
              {order.customerPhone && (
                <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '2px' }}>{order.customerPhone}</div>
              )}
              <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--blue)', fontWeight: 700 }}>
                Payment: {order.paymentMethod.toUpperCase()}
              </div>
            </div>

            {/* Shipping Box */}
            <div
              style={{
                padding: '18px',
                borderRadius: '16px',
                background: 'var(--gray-50)',
                border: '1px solid var(--gray-200)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <MapPin size={16} color="#FF7A1A" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase' }}>
                  Shipping Destination
                </span>
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--navy)', fontWeight: 600, lineHeight: 1.5 }}>
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
                Canada 🇨🇦
              </div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#1EA672', fontWeight: 700 }}>
                <Truck size={14} /> Canada Post Expedited Parcel
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Order Line Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </h4>

            <div style={{ border: '1px solid var(--gray-200)', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--gray-100)', color: 'var(--navy)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 16px' }}>Item Description</th>
                    <th style={{ padding: '12px 14px' }}>Unit Price</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} style={{ borderBottom: index === order.items.length - 1 ? 'none' : '1px solid var(--gray-100)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.name}</div>
                        {(item.color || item.model) && (
                          <div style={{ fontSize: '11.5px', color: 'var(--gray-500)', marginTop: '2px' }}>
                            {item.color && <span>Variant: {item.color} </span>}
                            {item.model && <span>· Device: {item.model}</span>}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 14px', fontWeight: 600, color: 'var(--navy)' }}>
                        ${item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px 14px', textAlign: 'center', fontWeight: 800, color: 'var(--blue)' }}>
                        &times;{item.quantity}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 800, color: 'var(--navy)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Calculation Breakdown */}
          <div
            style={{
              alignSelf: 'flex-end',
              width: '100%',
              maxWidth: '340px',
              background: 'var(--gray-50)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid var(--gray-200)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray-600)' }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>${order.subtotal.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1EA672', fontWeight: 600 }}>
                <span>Discount {order.promoCode ? `(${order.promoCode})` : ''}:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray-600)' }}>
              <span>Shipping:</span>
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>
                {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray-600)' }}>
              <span>Estimated Tax (HST/GST):</span>
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>${order.tax.toFixed(2)}</span>
            </div>

            <div
              style={{
                borderTop: '1.5px solid var(--gray-200)',
                paddingTop: '8px',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: 900,
                color: 'var(--navy)'
              }}
            >
              <span>Total Paid:</span>
              <span style={{ color: 'var(--blue)' }}>${order.total.toFixed(2)} CAD</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: '18px 28px',
            background: 'var(--gray-50)',
            borderTop: '1px solid var(--gray-200)',
            borderRadius: '0 0 24px 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid var(--gray-300)',
              background: '#fff',
              fontSize: '13.5px',
              fontWeight: 700,
              color: 'var(--navy)',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
