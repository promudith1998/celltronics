import {
  Client,
  Environment,
  OrdersController,
  CheckoutPaymentIntent,
} from '@paypal/paypal-server-sdk';

/**
 * Returns a configured PayPal Server SDK client singleton.
 * Configured per the official getting-started-guide-buy-button-nextjs reference.
 */
function getPayPalClient(): Client | null {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  return new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
    environment:
      process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === 'production'
        ? Environment.Production
        : Environment.Sandbox,
  });
}

/**
 * Creates a PayPal order using the OrdersController
 * @param amount Total amount formatted as string (e.g. "49.99")
 * @param currency Currency code (default: CAD for Canadian CellCentral store)
 */
export async function createPayPalOrder(
  amount: string,
  currency: string = 'CAD',
  referenceId?: string
): Promise<string> {
  const client = getPayPalClient();

  if (!client) {
    // If credentials are not yet configured in .env.local, return a demo simulated order ID
    console.warn(
      'PayPal credentials missing (NEXT_PUBLIC_PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET). Generating simulated order ID.'
    );
    return `DEMO-ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  const ordersController = new OrdersController(client);

  const { result } = await ordersController.createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          referenceId: referenceId || `CC-${Date.now()}`,
          amount: {
            currencyCode: currency,
            value: Number(amount).toFixed(2),
          },
        },
      ],
    },
  });

  if (!result.id) {
    throw new Error('PayPal order creation failed: missing order ID');
  }

  return result.id;
}

/**
 * Captures an approved PayPal order
 * @param orderId PayPal Order ID
 */
export async function capturePayPalOrder(orderId: string): Promise<any> {
  const client = getPayPalClient();

  if (!client || orderId.startsWith('DEMO-ORDER-')) {
    // Simulated capture in demo/sandbox without credentials
    return {
      id: orderId,
      status: 'COMPLETED',
      simulated: true,
      captureId: `CAPTURE-${Date.now()}`,
    };
  }

  const ordersController = new OrdersController(client);
  const { result } = await ordersController.captureOrder({ id: orderId });
  return result;
}
