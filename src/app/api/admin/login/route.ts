import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  clearRateLimit,
  isAdminAuthConfigured,
  recordFailedAttempt,
  verifyAdminCredentials
} from '@/lib/adminCredentials';
import { ADMIN_SESSION_COOKIE, signSessionToken } from '@/lib/adminSession';

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'local-client';
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          'Server admin authentication is not configured. Please set ADMIN_USERNAME, ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD), and ADMIN_SESSION_SECRET in .env.local.'
      },
      { status: 503 }
    );
  }

  const clientKey = getClientKey(request);
  const rateStatus = checkRateLimit(clientKey);
  if (!rateStatus.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Please wait ${rateStatus.retryAfterSeconds}s before trying again.`,
        locked: true,
        retryAfterSeconds: rateStatus.retryAfterSeconds
      },
      { status: 429 }
    );
  }

  let body: { username?: unknown; password?: unknown; rememberDevice?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const { username, password, rememberDevice } = body;
  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json(
      { error: 'Username and password must be valid text.' },
      { status: 400 }
    );
  }

  const isValid = verifyAdminCredentials(username, password);
  if (!isValid) {
    const failed = recordFailedAttempt(clientKey);
    if (failed.locked) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Security lockout active for ${failed.retryAfterSeconds}s.`,
          locked: true,
          retryAfterSeconds: failed.retryAfterSeconds
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: `Invalid username or password (${failed.remainingAttempts} attempts remaining).`,
        remainingAttempts: failed.remainingAttempts
      },
      { status: 401 }
    );
  }

  clearRateLimit(clientKey);

  const sessionSecret = process.env.ADMIN_SESSION_SECRET!;
  const maxAgeSeconds = rememberDevice === true ? 60 * 60 * 24 * 7 : 60 * 60 * 8; // 7 days or 8 hours
  const now = Date.now();
  const token = await signSessionToken(
    {
      username: username.trim(),
      role: 'Store Administrator',
      iat: now,
      exp: now + maxAgeSeconds * 1000
    },
    sessionSecret
  );

  const response = NextResponse.json({
    authenticated: true,
    user: {
      username: username.trim(),
      role: 'Store Administrator'
    }
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds
  });

  return response;
}
