export const ADMIN_SESSION_COOKIE = 'cellcentral_admin_session';

export interface AdminSessionPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array | null {
  try {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Signs an admin session payload using HMAC-SHA256 (Web Crypto API, Edge & Node compatible).
 */
export async function signSessionToken(
  payload: AdminSessionPayload,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const payloadBytes = encoder.encode(JSON.stringify(payload));
  const payloadB64 = toBase64Url(payloadBytes);
  const key = await getHmacKey(secret);
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadB64)
  );
  const sigB64 = toBase64Url(new Uint8Array(signatureBuffer));
  return `${payloadB64}.${sigB64}`;
}

/**
 * Verifies an HMAC-SHA256 signed admin session token and checks expiration.
 * Returns the decoded payload if valid, or null otherwise.
 */
export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined
): Promise<AdminSessionPayload | null> {
  if (!token || !secret || secret.length < 16) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return null;

  const sigBytes = fromBase64Url(sigB64);
  if (!sigBytes) return null;

  try {
    const encoder = new TextEncoder();
    const key = await getHmacKey(secret);
    const isValid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      encoder.encode(payloadB64)
    );
    if (!isValid) return null;

    const payloadBytes = fromBase64Url(payloadB64);
    if (!payloadBytes) return null;

    const decoded = JSON.parse(new TextDecoder().decode(payloadBytes)) as AdminSessionPayload;
    if (
      typeof decoded.username !== 'string' ||
      typeof decoded.exp !== 'number' ||
      decoded.exp <= Date.now()
    ) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
