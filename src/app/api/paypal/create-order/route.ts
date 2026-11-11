import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = body.amount || '0.00';
    const currency = body.currency || 'CAD';
    const referenceId = body.referenceId;
    const customer = body.customer;

    const orderId = await createPayPalOrder(amount, currency, referenceId, customer);
    return NextResponse.json({ id: orderId });
  } catch (error: any) {
    console.error('API Error creating PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}

