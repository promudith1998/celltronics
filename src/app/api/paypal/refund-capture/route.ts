import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/adminSession';
import { refundPayPalCapture } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);

    if (!session) {
      return NextResponse.json(
        { error: 'Admin authentication required to issue refunds.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const captureId = typeof body.captureId === 'string' ? body.captureId.trim() : '';
    const noteToPayer =
      typeof body.noteToPayer === 'string' && body.noteToPayer.trim()
        ? body.noteToPayer.trim()
        : 'Refund for CellCentral live transaction test';

    if (!captureId) {
      return NextResponse.json({ error: 'Capture ID is required.' }, { status: 400 });
    }

    const result = await refundPayPalCapture(captureId, noteToPayer);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error refunding PayPal capture:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to refund PayPal capture' },
      { status: 500 }
    );
  }
}
