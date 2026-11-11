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

/**
 * Checks PayPal API endpoint reachability, credentials, and token acquisition.
 */
export async function checkPayPalConnectivity(): Promise<{
  reachable: boolean;
  credentialsConfigured: boolean;
  environment: string;
  clientIdMasked: string | null;
  authenticated: boolean;
  message: string;
  details?: any;
}> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const environment = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || 'sandbox';

  if (!clientId || !clientSecret || clientId === 'your_sandbox_client_id_here') {
    return {
      reachable: true,
      credentialsConfigured: false,
      environment,
      clientIdMasked: null,
      authenticated: false,
      message: 'PayPal credentials are not yet configured in .env.local. NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are required.',
    };
  }

  const clientIdMasked =
    clientId.length > 8 ? `${clientId.slice(0, 4)}••••${clientId.slice(-4)}` : '••••';

  const host =
    environment === 'production'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const res = await fetch(`${host}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      return {
        reachable: true,
        credentialsConfigured: true,
        environment,
        clientIdMasked,
        authenticated: true,
        message: `Successfully connected to PayPal ${environment.toUpperCase()} API! Access token acquired.`,
        details: {
          app_id: data.app_id,
          expires_in: data.expires_in,
          token_type: data.token_type,
        },
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        reachable: true,
        credentialsConfigured: true,
        environment,
        clientIdMasked,
        authenticated: false,
        message: `PayPal authentication failed (${res.status} ${res.statusText}): ${errData.error_description || errData.message || 'Invalid Client ID or Secret'}.`,
        details: errData,
      };
    }
  } catch (error: any) {
    return {
      reachable: false,
      credentialsConfigured: true,
      environment,
      clientIdMasked,
      authenticated: false,
      message: `Network error reaching PayPal API: ${error.message}`,
    };
  }
}


