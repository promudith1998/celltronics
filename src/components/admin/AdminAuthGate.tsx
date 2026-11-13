'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Mail,
  ArrowRight
} from 'lucide-react';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Credentials
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberDevice, setRememberDevice] = useState<boolean>(false);

  // Security & Error Feedback
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Verify HttpOnly session cookie with server on mount
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/session', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Lockout countdown timer (synced from server 429 retryAfterSeconds)
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  // Server-side logout / lock session handler
  const lockSession = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
    } catch (e) {
      console.error('Failed to clear admin session:', e);
    } finally {
      setIsAuthenticated(false);
      setPassword('');
      setErrorMessage('');
      router.push('/admin/login');
    }
  }, [router]);

  // Global window listener for session lock
  useEffect(() => {
    const handleGlobalLock = () => {
      lockSession();
    };
    window.addEventListener('cellcentral-lock-admin', handleGlobalLock);
    return () => window.removeEventListener('cellcentral-lock-admin', handleGlobalLock);
  }, [lockSession]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0 || isSubmitting) return;

    setErrorMessage('');
    const trimmedUser = username.trim();

    if (!trimmedUser) {
      setErrorMessage('Please enter your username.');
      triggerShake();
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          username: trimmedUser,
          password,
          rememberDevice
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.authenticated) {
        setPassword('');
        setErrorMessage('');
        setIsAuthenticated(true);
        router.refresh();
        return;
      }

      triggerShake();
      if (res.status === 429 && typeof data.retryAfterSeconds === 'number') {
        setLockoutSeconds(data.retryAfterSeconds);
      }
      setErrorMessage(data.error || 'Invalid username or password.');
    } catch {
      triggerShake();
      setErrorMessage('Unable to reach authentication server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0F172A',
          fontFamily: 'var(--font-sans), sans-serif'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: '#0B63F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#64748B' }}>
            Verifying Secure Session...
          </span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const isLockedOut = lockoutSeconds > 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0B1E3D 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'var(--font-sans), sans-serif'
      }}
    >
      <div
        className={isShaking ? 'shake-animation' : ''}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 36px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #0B63F6 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#FFFFFF',
              boxShadow: '0 10px 24px rgba(11, 99, 246, 0.3)'
            }}
          >
            <Lock size={28} />
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
            CellCentral Admin Gate
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
            Sign in with your authorized administrator credentials to access the Command Center.
          </p>
        </div>

        {/* Error / Lockout Alert */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: isLockedOut ? '#FEF2F2' : '#FFF1F2',
              border: '1px solid #FECDD3',
              color: '#BE123C',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            {isLockedOut ? <ShieldAlert size={18} style={{ flexShrink: 0 }} /> : <AlertCircle size={18} style={{ flexShrink: 0 }} />}
            <span>
              {errorMessage}
              {isLockedOut ? ` (${lockoutSeconds}s remaining)` : ''}
            </span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Username / Email */}
          <div>
            <label
              htmlFor="admin-username"
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#334155',
                marginBottom: '6px'
              }}
            >
              Administrator Username
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="#94A3B8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLockedOut || isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: isLockedOut ? '#F1F5F9' : '#FFFFFF'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#334155',
                marginBottom: '6px'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound
                size={16}
                color="#94A3B8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLockedOut || isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 42px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: isLockedOut ? '#F1F5F9' : '#FFFFFF'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember Device */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#475569',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              disabled={isLockedOut || isSubmitting}
              style={{ width: '16px', height: '16px', accentColor: '#0B63F6', cursor: 'pointer' }}
            />
            <span>Keep signed in on this device (7 days)</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLockedOut || isSubmitting}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              background: isLockedOut || isSubmitting ? '#94A3B8' : '#0B63F6',
              color: '#FFFFFF',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: isLockedOut || isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isLockedOut ? 'none' : '0 8px 20px rgba(11, 99, 246, 0.25)',
              marginTop: '4px'
            }}
          >
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}</span>
            {!isSubmitting && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Back to Public Storefront */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Storefront</span>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '24px', fontSize: '12px', color: '#94A3B8', textAlign: 'center', fontWeight: 600 }}>
        CellCentral Command Infrastructure · Server-Verified HttpOnly Session
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake-animation {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
};
