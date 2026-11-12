import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const orderId = body.orderId;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const result = await capturePayPalOrder(orderId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}

