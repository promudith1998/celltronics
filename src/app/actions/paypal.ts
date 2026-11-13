'use server';

import { createPayPalOrder, capturePayPalOrder, checkPayPalConnectivity } from '@/lib/paypal';

/**
 * Server action to check PayPal API connectivity, credentials & token validity.
 */
export async function testPayPalConnection() {
  return checkPayPalConnectivity();
}


/**
 * Server action to create a PayPal checkout order.
 * Accepts order amount and optional custom identifier.
 */
export async function createOrder(
  amount: string = '0.00',
  currency: string = 'CAD',
  referenceId?: string
): Promise<{ id: string }> {
  try {
    const orderId = await createPayPalOrder(amount, currency, referenceId);
    return { id: orderId };
  } catch (error: any) {
    console.error('Error creating PayPal order:', error);
    throw new Error(error.message || 'Failed to create PayPal order');
  }
}

/**
 * Server action to capture an approved PayPal order.
 */
export async function captureOrder(orderId: string): Promise<any> {
  try {
    const result = await capturePayPalOrder(orderId);
    return result;
  } catch (error: any) {
    console.error('Error capturing PayPal order:', error);
    throw new Error(error.message || 'Failed to capture PayPal order');
  }
}

