import { NextResponse } from 'next/server';
import { checkPayPalConnectivity } from '@/lib/paypal';

export async function GET() {
  const result = await checkPayPalConnectivity();
  return NextResponse.json(result);
}
