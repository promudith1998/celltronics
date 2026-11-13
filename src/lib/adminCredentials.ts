import crypto from 'crypto';

const MAX_INPUT_LENGTH = 256;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds

interface RateLimitEntry {
  attempts: number;
  lockedUntil: number;
}

const loginAttemptsMap = new Map<string, RateLimitEntry>();

/**
 * Constant-time string comparison by hashing both inputs with SHA-256 first
 * so buffer lengths are always identical (prevents length-oracle timing leaks).
 */
function timingSafeStringEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a, 'utf8').digest();
  const hashB = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Verifies a password against a stored `scrypt:<saltHex>:<hashHex>` string.
 */
function verifyScryptHash(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;

  const [, saltHex, expectedHex] = parts;
  if (!saltHex || !expectedHex) return false;

  try {
    const expectedBuf = Buffer.from(expectedHex, 'hex');
    const derivedBuf = crypto.scryptSync(password, saltHex, expectedBuf.length);
    if (derivedBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(derivedBuf, expectedBuf);
  } catch {
    return false;
  }
}

export function isAdminAuthConfigured(): boolean {
  const hasUser = Boolean(process.env.ADMIN_USERNAME?.trim());
  const hasPass = Boolean(
    process.env.ADMIN_PASSWORD_HASH?.trim() || process.env.ADMIN_PASSWORD?.trim()
  );
  const hasSecret = Boolean(
    process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 16
  );
  return hasUser && hasPass && hasSecret;
}

/**
 * Validates admin username and password against server-side environment variables.
 * Uses strict type/length checks and constant-time comparisons (zero SQL, zero client exposure).
 */
export function verifyAdminCredentials(username: unknown, password: unknown): boolean {
  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const trimmedUser = username.trim().toLowerCase();
  if (
    !trimmedUser ||
    !password ||
    trimmedUser.length > MAX_INPUT_LENGTH ||
    password.length > MAX_INPUT_LENGTH
  ) {
    return false;
  }

  const expectedUser = process.env.ADMIN_USERNAME?.trim().toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const expectedPlain = process.env.ADMIN_PASSWORD;

  if (!expectedUser || (!expectedHash && !expectedPlain)) {
    return false;
  }

  const userMatches = timingSafeStringEqual(trimmedUser, expectedUser);

  let passwordMatches = false;
  if (expectedHash) {
    passwordMatches = verifyScryptHash(password, expectedHash);
  } else if (expectedPlain) {
    passwordMatches = timingSafeStringEqual(password, expectedPlain);
  }

  return userMatches && passwordMatches;
}

export function checkRateLimit(clientKey: string): {
  allowed: boolean;
  retryAfterSeconds: number;
  remainingAttempts: number;
} {
  const now = Date.now();
  const entry = loginAttemptsMap.get(clientKey);

  if (!entry) {
    return { allowed: true, retryAfterSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  if (entry.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds, remainingAttempts: 0 };
  }

  // Lockout expired; reset if it was previously locked
  if (entry.lockedUntil > 0 && entry.lockedUntil <= now) {
    loginAttemptsMap.delete(clientKey);
    return { allowed: true, retryAfterSeconds: 0, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - entry.attempts)
  };
}

export function recordFailedAttempt(clientKey: string): {
  locked: boolean;
  retryAfterSeconds: number;
  remainingAttempts: number;
} {
  const now = Date.now();
  const entry = loginAttemptsMap.get(clientKey) || { attempts: 0, lockedUntil: 0 };
  entry.attempts += 1;

  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttemptsMap.set(clientKey, entry);
    return {
      locked: true,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      remainingAttempts: 0
    };
  }

  loginAttemptsMap.set(clientKey, entry);
  return {
    locked: false,
    retryAfterSeconds: 0,
    remainingAttempts: MAX_FAILED_ATTEMPTS - entry.attempts
  };
}

export function clearRateLimit(clientKey: string): void {
  loginAttemptsMap.delete(clientKey);
}
