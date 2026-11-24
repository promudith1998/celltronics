'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  RotateCcw,
  Zap,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { createOrderInDb } from '@/lib/supabaseService';
import { useToast } from '@/context/ToastContext';

const PayPalCheckoutButton = dynamic(
  () => import('@/components/checkout/PayPalCheckoutButton').then((mod) => mod.PayPalCheckoutButton),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          background: '#F8FAFC',
          border: '1px dashed #CBD5E1',
          textAlign: 'center',
          color: '#64748B',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Loading live PayPal checkout button...
      </div>
    ),
  }
);

interface LiveReceipt {
  orderId: string;
  captureId: string | null;
  status: string;
  amount: string;
  currency: string;
  payerEmail: string | null;
  payerName: string | null;
  environment: string;
  timestamp: string;
  dbSynced: boolean;
  refund?: {
    refundId: string;
    status: string;
    amount: string | null;
  } | null;
}

interface LiveTransactionTesterProps {
  onOrderCreated?: () => void;
}

export const LiveTransactionTester: React.FC<LiveTransactionTesterProps> = ({ onOrderCreated }) => {
  const { showToast } = useToast();
  const envRaw = (process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || 'sandbox').toLowerCase();
  const isLive = envRaw === 'live' || envRaw === 'production';
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'CAD';

  const [amountInput, setAmountInput] = useState<string>('1.00');
  const [logToSupabase, setLogToSupabase] = useState<boolean>(true);
  const [isDryRunning, setIsDryRunning] = useState<boolean>(false);
  const [dryRunResult, setDryRunResult] = useState<{
    ok: boolean;
    orderId?: string;
    error?: string;
    amount?: string;
  } | null>(null);
  const [receipts, setReceipts] = useState<LiveReceipt[]>([]);
  const [refundingId, setRefundingId] = useState<string | null>(null);

  const parsedAmount = Number(amountInput);
  const isValidAmount = Number.isFinite(parsedAmount) && parsedAmount >= 0.5 && parsedAmount <= 500;
  const effectiveAmount = isValidAmount ? Number(parsedAmount.toFixed(2)) : 1.0;

  const copyText = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    showToast('Copied', `${label} copied to clipboard.`, 'info');
  };

  const handleDryRun = async () => {
    if (!isValidAmount) {
      showToast('Invalid Amount', 'Enter an amount between $0.50 and $500.00 CAD.', 'error');
      return;
    }
    setIsDryRunning(true);
    setDryRunResult(null);
    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount.toFixed(2),
          currency,
          referenceId: `CC-DRYRUN-${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.id) {
        throw new Error(data.error || 'Order creation failed');
      }
      setDryRunResult({ ok: true, orderId: data.id, amount: effectiveAmount.toFixed(2) });
      showToast('Order Created (Dry-Run)', `PayPal Order ID: ${data.id} (unapproved, no charge)`, 'success');
    } catch (err: any) {
      setDryRunResult({ ok: false, error: err.message });
      showToast('Dry-Run Failed', err.message, 'error');
    } finally {
      setIsDryRunning(false);
    }
  };

  const handleLiveSuccess = async (orderId: string, details?: any) => {
    const captureId =
      details?.captureId ||
      details?.purchaseUnits?.[0]?.payments?.captures?.[0]?.id ||
      details?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
      null;

    const capturedAmount = details?.capturedAmount || effectiveAmount.toFixed(2);
    const capturedCurrency = details?.capturedCurrency || currency;
    const payerEmail =
      details?.payerEmail ||
      details?.payer?.emailAddress ||
      details?.payer?.email_address ||
      null;
    const payerName =
      details?.payerName ||
      [details?.payer?.name?.givenName, details?.payer?.name?.surname].filter(Boolean).join(' ') ||
      null;

    let dbSynced = false;
    if (logToSupabase) {
      const dbRes = await createOrderInDb({
        orderNumber: orderId,
        customerEmail: payerEmail || 'live-test@cellcentral.ca',
        customerName: payerName || 'Live Test Buyer',
        shippingAddress: {
          address: 'Live PayPal Verification Test',
          city: 'Toronto',
          province: 'ON',
          postalCode: 'M5V 2T6',
        },
        items: [
          {
            id: 'live-paypal-test',
            name: `Live PayPal Transaction Test (${capturedCurrency} $${capturedAmount})`,
            price: Number(capturedAmount),
            quantity: 1,
          },
        ],
        subtotal: Number(capturedAmount),
        discount: 0,
        shipping: 0,
        tax: 0,
        total: Number(capturedAmount),
        paymentMethod: 'paypal',
      });
      dbSynced = dbRes.success;
      if (dbSynced && onOrderCreated) {
        onOrderCreated();
      }
    }

    const receipt: LiveReceipt = {
      orderId,
      captureId,
      status: details?.captureStatus || details?.status || 'COMPLETED',
      amount: capturedAmount,
      currency: capturedCurrency,
      payerEmail,
      payerName,
      environment: details?.environment || (isLive ? 'live' : 'sandbox'),
      timestamp: details?.createTime || new Date().toISOString(),
      dbSynced,
      refund: null,
    };

    setReceipts((prev) => [receipt, ...prev]);
    showToast(
      'Live Payment Captured!',
      `Captured $${capturedAmount} ${capturedCurrency} (Capture ID: ${captureId || orderId})`,
      'success'
    );
  };

  const handleRefundCapture = async (captureId: string) => {
    if (
      !confirm(
        `Issue a FULL refund on PayPal for Capture ID ${captureId}? This will immediately refund the buyer via PayPal.`
      )
    ) {
      return;
    }
    setRefundingId(captureId);
    try {
      const res = await fetch('/api/paypal/refund-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          captureId,
          noteToPayer: 'Refund for CellCentral live PayPal transaction test',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Refund failed');
      }
      setReceipts((prev) =>
        prev.map((r) =>
          r.captureId === captureId
            ? {
                ...r,
                refund: {
                  refundId: data.refundId || data.id,
                  status: data.status || 'COMPLETED',
                  amount: data.amount || r.amount,
                },
              }
            : r
        )
      );
      showToast('Refund Issued!', `PayPal Refund ID: ${data.refundId || data.id}`, 'success');
    } catch (err: any) {
      showToast('Refund Error', err.message, 'error');
    } finally {
      setRefundingId(null);
    }
  };

  return (
    <div
      style={{
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px solid var(--gray-200)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Actual Live Transaction Tester
            </h4>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 800,
                padding: '2px 9px',
                borderRadius: '100px',
                background: isLive ? 'rgba(255, 61, 90, 0.14)' : 'rgba(11, 99, 246, 0.12)',
                color: isLive ? '#D92D4B' : '#0B63F6',
                letterSpacing: '0.04em',
              }}
            >
              {isLive ? '● LIVE PRODUCTION (REAL FUNDS)' : '● SANDBOX MODE'}
            </span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', margin: '4px 0 0' }}>
            Run an end-to-end checkout test for a small amount (e.g. $1.00 {currency}) through the exact production API routes, then inspect the Capture ID or issue an instant refund.
          </p>
        </div>
      </div>

      {isLive && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: '10px',
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            color: '#9A3412',
            fontSize: '12.5px',
            lineHeight: 1.5,
            marginBottom: '16px',
          }}
        >
          <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#FF7A1A' }} />
          <div>
            <strong>Important for Live PayPal Tests:</strong> PayPal blocks paying your own merchant account from the same PayPal account. Log in with a <strong>separate personal PayPal account</strong> when testing. Charges are real money and can be refunded below with one click.
          </div>
        </div>
      )}

      {/* Amount & Options Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1fr) minmax(260px, 1fr)',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* Left: Amount Picker + Dry Run */}
        <div
          style={{
            background: 'var(--gray-50)',
            border: '1px solid var(--gray-200)',
            borderRadius: '14px',
            padding: '16px',
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '11.5px',
              fontWeight: 800,
              color: 'var(--navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            Test Charge Amount ({currency})
          </label>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {['0.50', '1.00', '2.00', '5.00'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmountInput(preset)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 800,
                  border:
                    amountInput === preset
                      ? '1.5px solid var(--blue)'
                      : '1.5px solid var(--gray-200)',
                  background: amountInput === preset ? 'var(--blue)' : '#fff',
                  color: amountInput === preset ? '#fff' : 'var(--navy)',
                  cursor: 'pointer',
                }}
              >
                ${preset}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <input
              type="number"
              min="0.50"
              max="500"
              step="0.50"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                border: `1.5px solid ${isValidAmount ? 'var(--gray-200)' : '#FF3D5A'}`,
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--navy)',
                background: '#fff',
                fontFamily: 'var(--font-mono), monospace',
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gray-700)' }}>
              {currency}
            </span>
          </div>

          {!isValidAmount && (
            <div style={{ fontSize: '11.5px', color: '#FF3D5A', fontWeight: 600, marginBottom: '10px' }}>
              Enter an amount between $0.50 and $500.00.
            </div>
          )}

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--navy)',
              cursor: 'pointer',
              marginBottom: '14px',
            }}
          >
            <input
              type="checkbox"
              checked={logToSupabase}
              onChange={(e) => setLogToSupabase(e.target.checked)}
            />
            <span>Also save test order to Supabase Orders tab</span>
          </label>

          <button
            type="button"
            onClick={handleDryRun}
            disabled={isDryRunning || !isValidAmount}
            style={{
              width: '100%',
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1.5px solid var(--gray-300)',
              background: '#fff',
              color: 'var(--navy)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: isDryRunning || !isValidAmount ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {isDryRunning ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} color="#0B63F6" />}
            <span>{isDryRunning ? 'Creating Order...' : 'Step 1: Verify Create-Order API (No Charge)'}</span>
          </button>

          {dryRunResult && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                background: dryRunResult.ok ? '#F0FDF4' : '#FEF2F2',
                border: `1px solid ${dryRunResult.ok ? '#BBF7D0' : '#FECACA'}`,
                color: dryRunResult.ok ? '#166534' : '#991B1B',
              }}
            >
              {dryRunResult.ok ? (
                <>
                  <strong>API Verified (${dryRunResult.amount} {currency}):</strong> Created unapproved PayPal Order{' '}
                  <code style={{ fontWeight: 700 }}>{dryRunResult.orderId}</code> (no money charged).
                </>
              ) : (
                <>
                  <strong>Create-Order Failed:</strong> {dryRunResult.error}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Actual Live PayPal Checkout Button */}
        <div
          style={{
            background: '#fff',
            border: '1.5px solid rgba(11, 99, 246, 0.25)',
            borderRadius: '14px',
            padding: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--navy)' }}>
              Step 2: Authorize &amp; Capture ${effectiveAmount.toFixed(2)} {currency}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#16A34A',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ShieldCheck size={13} /> Live SDK
            </span>
          </div>

          <PayPalCheckoutButton
            amount={effectiveAmount}
            currency={currency}
            referenceId={`CC-LIVE-TEST-${Date.now()}`}
            disabled={!isValidAmount}
            onSuccess={handleLiveSuccess}
            onError={(err) => {
              showToast('PayPal Checkout Error', err?.message || 'Transaction was not completed.', 'error');
            }}
          />
        </div>
      </div>

      {/* Live Captured Receipts & One-Click Refund */}
      {receipts.length > 0 && (
        <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: 'var(--navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Completed Test Transactions ({receipts.length})
          </div>

          {receipts.map((r) => (
            <div
              key={`${r.orderId}-${r.timestamp}`}
              style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#16A34A" />
                  <strong style={{ fontSize: '14px', color: '#14532D' }}>
                    ${r.amount} {r.currency} — {r.status}
                  </strong>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '100px',
                      background: '#DCFCE7',
                      color: '#166534',
                      textTransform: 'uppercase',
                    }}
                  >
                    {r.environment}
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: '#166534' }}>
                  {new Date(r.timestamp).toLocaleString()}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#14532D',
                }}
              >
                <div>
                  Order ID:{' '}
                  <code style={{ fontWeight: 700 }}>{r.orderId}</code>
                  <button
                    type="button"
                    onClick={() => copyText(r.orderId, 'Order ID')}
                    style={{ marginLeft: '6px', background: 'none', color: '#0B63F6', cursor: 'pointer' }}
                    title="Copy Order ID"
                  >
                    <Copy size={12} style={{ display: 'inline' }} />
                  </button>
                </div>

                {r.captureId && (
                  <div>
                    Capture ID:{' '}
                    <code style={{ fontWeight: 700 }}>{r.captureId}</code>
                    <button
                      type="button"
                      onClick={() => copyText(r.captureId!, 'Capture ID')}
                      style={{ marginLeft: '6px', background: 'none', color: '#0B63F6', cursor: 'pointer' }}
                      title="Copy Capture ID"
                    >
                      <Copy size={12} style={{ display: 'inline' }} />
                    </button>
                  </div>
                )}

                {r.payerEmail && (
                  <div>
                    Payer: <strong>{r.payerName ? `${r.payerName} (${r.payerEmail})` : r.payerEmail}</strong>
                  </div>
                )}

                <div>
                  Supabase Order Log: <strong>{r.dbSynced ? 'Saved ✓' : 'Not logged'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                {r.captureId && !r.refund && (
                  <button
                    type="button"
                    onClick={() => handleRefundCapture(r.captureId!)}
                    disabled={refundingId === r.captureId}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: '#fff',
                      border: '1.5px solid #FF7A1A',
                      color: '#C2410C',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: refundingId === r.captureId ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {refundingId === r.captureId ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <RotateCcw size={13} />
                    )}
                    <span>{refundingId === r.captureId ? 'Refunding...' : 'Issue Full Refund on PayPal'}</span>
                  </button>
                )}

                {r.refund && (
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0B63F6',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    Refunded ✓ · Refund ID: <code>{r.refund.refundId}</code> ({r.refund.status})
                  </span>
                )}

                {r.captureId && isLive && (
                  <a
                    href={`https://www.paypal.com/activity/payment/${r.captureId}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0B63F6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    View in PayPal Dashboard <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
