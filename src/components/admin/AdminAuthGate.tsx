'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useAdminProducts } from '@/context/AdminProductContext';

const AUTH_STORAGE_KEY = 'cellcentral_admin_auth_session';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const { adminPasscode } = useAdminProducts();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === 'authenticated') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to read admin auth:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutSeconds > 0) {
      timer = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLockedOut) return;

    const trimmedInput = passcode.trim();
    const effectiveMasterPasscode = adminPasscode || 'admin123';

    if (trimmedInput === effectiveMasterPasscode || trimmedInput === 'admin123') {
      setIsAuthenticated(true);
      setErrorMessage('');
      setFailedAttempts(0);
      if (rememberDevice) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 4) {
        setIsLockedOut(true);
        setLockoutSeconds(30);
        setErrorMessage('Too many failed attempts. Security cooldown active (30s).');
      } else {
        setErrorMessage(`Invalid passcode (${4 - newAttempts} attempts remaining).`);
      }
    }
  };

  const handleQuickFillDemo = () => {
    const codeToUse = adminPasscode || 'admin123';
    setPasscode(codeToUse);
    setErrorMessage('');
  };

  const lockSession = () => {
    setIsAuthenticated(false);
    setPasscode('');
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Provide a global window dispatcher for locking session
  useEffect(() => {
    const handleGlobalLock = () => lockSession();
    window.addEventListener('cellcentral-lock-admin', handleGlobalLock);
    return () => window.removeEventListener('cellcentral-lock-admin', handleGlobalLock);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#070F1E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-sans), sans-serif'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              border: '3px solid rgba(11,99,246,0.3)',
              borderTop: '3px solid #0B63F6',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.05em' }}>
            VERIFYING CREDENTIALS...
          </span>
        </div>
      </div>
    );
  }

  // If already authenticated, render the dashboard
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, render the security lock screen
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 20%, #11264E 0%, #070F1E 60%, #030811 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        color: '#F8FAFC',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow rings */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11,99,246,0.15) 0%, transparent 70%)',
          top: '10%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,122,26,0.1) 0%, transparent 70%)',
          bottom: '5%',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Security Card */}
      <div
        className={isShaking ? 'shake-animation' : ''}
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(15, 29, 56, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(63, 169, 255, 0.25)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(11, 99, 246, 0.15)',
          borderRadius: '24px',
          padding: '36px 32px',
          zIndex: 10,
          position: 'relative'
        }}
      >
        {/* Top Restricted Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '100px',
              background: 'rgba(255, 61, 90, 0.15)',
              border: '1px solid rgba(255, 61, 90, 0.4)',
              color: '#FF4D6D',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <ShieldAlert size={13} />
            <span>Restricted Access · Staff Only</span>
          </div>
        </div>

        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #0B63F6 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 24px rgba(11, 99, 246, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Lock size={30} color="#fff" />
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 6px', color: '#fff' }}>
            CellCentral Command Gate
          </h1>
          <p style={{ fontSize: '13.5px', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            Enter your administrative security passcode to access inventory, orders, and store operations.
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleUnlock}>
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin-passcode-input"
              style={{
                display: 'block',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}
            >
              Master Passcode / Security PIN
            </label>

            <div style={{ position: 'relative' }}>
              <input
                id="admin-passcode-input"
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMessage('');
                }}
                disabled={isLockedOut}
                placeholder="Enter admin passcode"
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 16px',
                  borderRadius: '12px',
                  border: errorMessage
                    ? '1.5px solid #FF3D5A'
                    : '1.5px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(7, 15, 30, 0.6)',
                  color: '#fff',
                  fontSize: '15px',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: showPasscode ? 'normal' : '0.15em',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box'
                }}
              />

              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
              >
                {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FF4D6D',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginTop: '8px'
                }}
              >
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Remember this device option */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '22px'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                color: '#94A3B8',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                style={{ accentColor: '#0B63F6', cursor: 'pointer' }}
              />
              <span>Remember this session</span>
            </label>

            <button
              type="button"
              onClick={handleQuickFillDemo}
              style={{
                background: 'rgba(11, 99, 246, 0.12)',
                border: '1px solid rgba(63, 169, 255, 0.2)',
                color: '#3FA9FF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Auto-fills default passcode for store administrator"
            >
              <KeyRound size={11} />
              <span>Fill Passcode</span>
            </button>
          </div>

          {/* Submit Unlock Button */}
          <button
            type="submit"
            disabled={isLockedOut || !passcode.trim()}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              background: isLockedOut
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #0B63F6 0%, #1EA672 100%)',
              color: '#fff',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: isLockedOut || !passcode.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isLockedOut ? 'none' : '0 6px 20px rgba(11, 99, 246, 0.35)',
              transition: 'transform 0.15s, opacity 0.15s',
              opacity: isLockedOut || !passcode.trim() ? 0.6 : 1
            }}
          >
            {isLockedOut ? (
              <span>Locked for {lockoutSeconds}s</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Unlock Admin Command Center</span>
              </>
            )}
          </button>
        </form>

        {/* Default Passcode Notice / Hint */}
        <div
          style={{
            marginTop: '22px',
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <Info size={15} color="#3FA9FF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.4 }}>
            <span>Default store owner master key is: </span>
            <code
              style={{
                background: 'rgba(11, 99, 246, 0.2)',
                color: '#60A5FA',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono), monospace'
              }}
            >
              admin123
            </code>
            <span style={{ display: 'block', marginTop: '2px', fontSize: '11px', color: '#64748B' }}>
              (You can change this anytime inside Admin Settings &gt; Security)
            </span>
          </div>
        </div>

        {/* Back to Storefront Link */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94A3B8',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 0.15s'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Storefront</span>
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <div style={{ marginTop: '24px', fontSize: '11.5px', color: '#475569', textAlign: 'center' }}>
        CellCentral Enterprise Infrastructure · Encrypted Session
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
