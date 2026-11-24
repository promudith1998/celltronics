import {
  Client,
  Environment,
  OrdersController,
  PaymentsController,
  CheckoutPaymentIntent,
  PaypalWalletContextShippingPreference,
  PaypalExperienceUserAction,
} from '@paypal/paypal-server-sdk';

function isLiveEnvironment(env?: string): boolean {
  const normalized = (env || '').trim().toLowerCase();
  return normalized === 'production' || normalized === 'live';
}

export function getPayPalEnvironmentName(): 'live' | 'sandbox' {
  return isLiveEnvironment(process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT) ? 'live' : 'sandbox';
}

/**
 * Extracts human-readable error details from PayPal Server SDK ApiError responses.
 */
export function formatPayPalError(error: any, fallback: string): string {
  if (!error) return fallback;

  let parsed: any = error?.result;
  if (!parsed && typeof error?.body === 'string') {
    try {
      parsed = JSON.parse(error.body);
    } catch {
      parsed = null;
    }
  }

  if (parsed) {
    const firstDetail = Array.isArray(parsed.details) ? parsed.details[0] : null;
    const issue = firstDetail?.issue ? `[${firstDetail.issue}] ` : '';
    const desc =
      firstDetail?.description ||
      parsed.error_description ||
      parsed.message ||
      error.message ||
      fallback;
    const debug = parsed.debug_id ? ` (debug_id: ${parsed.debug_id})` : '';
    return `${issue}${desc}${debug}`;
  }

  return error?.message || fallback;
}

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
    environment: isLiveEnvironment(process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT)
      ? Environment.Production
      : Environment.Sandbox,
  });
}

export interface CustomerShippingInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  countryCode?: string;
}

/**
 * Creates a PayPal order using the OrdersController
 * @param amount Total amount formatted as string (e.g. "49.99")
 * @param currency Currency code (default: CAD for Canadian CellCentral store)
 * @param referenceId Optional merchant reference identifier
 * @param customer Optional customer shipping address for automated pre-filling
 */
export async function createPayPalOrder(
  amount: string,
  currency: string = 'CAD',
  referenceId?: string,
  customer?: CustomerShippingInfo
): Promise<string> {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('Invalid payment amount. Amount must be greater than 0.');
  }

  const client = getPayPalClient();

  if (!client) {
    // If credentials are not yet configured in .env.local, return a demo simulated order ID
    console.warn(
      'PayPal credentials missing (NEXT_PUBLIC_PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET). Generating simulated order ID.'
    );
    return `DEMO-ORDER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  const ordersController = new OrdersController(client);

  const fullName = [customer?.firstName, customer?.lastName].filter(Boolean).join(' ');
  const shipping = customer?.address
    ? {
        name: fullName ? { fullName } : undefined,
        address: {
          addressLine1: customer.address,
          adminArea2: customer.city || 'Toronto',
          adminArea1: customer.province || 'ON',
          postalCode: (customer.postalCode || 'M5A 4E5').replace(/\s+/g, ' ').trim(),
          countryCode: customer.countryCode || 'CA',
        },
      }
    : undefined;

  try {
    const { result } = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            referenceId: referenceId || `CC-${Date.now()}`,
            amount: {
              currencyCode: currency,
              value: numericAmount.toFixed(2),
            },
            shipping,
          },
        ],
        paymentSource: {
          paypal: {
            experienceContext: {
              brandName: 'CellCentral Mobile Accessories',
              shippingPreference: PaypalWalletContextShippingPreference.NoShipping,
              userAction: PaypalExperienceUserAction.PayNow,
            },
          },
        },
      },
    });

    if (!result.id) {
      throw new Error('PayPal order creation failed: missing order ID');
    }

    return result.id;
  } catch (error: any) {
    throw new Error(formatPayPalError(error, 'PayPal order creation failed'));
  }
}

/**
 * Captures an approved PayPal order and returns normalized receipt details alongside raw result
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
      environment: 'demo',
      captureId: `CAPTURE-${Date.now()}`,
      captureStatus: 'COMPLETED',
    };
  }

  const ordersController = new OrdersController(client);
  try {
    const { result } = await ordersController.captureOrder({
      id: orderId,
      prefer: 'return=representation',
    });

    const capture = result.purchaseUnits?.[0]?.payments?.captures?.[0];
    const captureStatus = capture?.status || result.status;

    if (captureStatus === 'DECLINED' || captureStatus === 'FAILED') {
      const reason = capture?.statusDetails?.reason || 'Payment was declined by PayPal.';
      throw new Error(`PayPal capture ${captureStatus}: ${reason}`);
    }

    const payerGiven = result.payer?.name?.givenName || '';
    const payerSurname = result.payer?.name?.surname || '';
    const payerName = `${payerGiven} ${payerSurname}`.trim() || undefined;

    return {
      ...result,
      environment: getPayPalEnvironmentName(),
      captureId: capture?.id || null,
      captureStatus: captureStatus || null,
      capturedAmount: capture?.amount?.value || null,
      capturedCurrency: capture?.amount?.currencyCode || 'CAD',
      payerEmail: result.payer?.emailAddress || null,
      payerName: payerName || null,
      createTime: capture?.createTime || result.createTime || new Date().toISOString(),
    };
  } catch (error: any) {
    throw new Error(formatPayPalError(error, 'Failed to capture PayPal order'));
  }
}

/**
 * Issues a full refund for a captured PayPal payment (Admin-only action)
 */
export async function refundPayPalCapture(captureId: string, noteToPayer?: string): Promise<any> {
  const client = getPayPalClient();
  if (!client) {
    throw new Error('PayPal credentials are not configured.');
  }

  const paymentsController = new PaymentsController(client);
  try {
    const { result } = await paymentsController.refundCapturedPayment({
      captureId,
      prefer: 'return=representation',
      body: noteToPayer ? { noteToPayer } : undefined,
    });
    return {
      ...result,
      refundId: result.id,
      status: result.status,
      amount: result.amount?.value || null,
      currency: result.amount?.currencyCode || 'CAD',
      environment: getPayPalEnvironmentName(),
    };
  } catch (error: any) {
    throw new Error(formatPayPalError(error, 'Failed to refund PayPal capture'));
  }
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

  const isLive = isLiveEnvironment(environment);
  const host = isLive
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


