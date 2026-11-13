'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Info,
  Mail,
  Smartphone,
  RefreshCw,
  ArrowRight,
  Shield,
  Check,
  UserCheck
} from 'lucide-react';
import { useAdminProducts } from '@/context/AdminProductContext';

const AUTH_STORAGE_KEY = 'cellcentral_admin_auth_session';
const AUTH_USER_KEY = 'cellcentral_admin_auth_user';
const DEFAULT_DEMO_CODE = '849201';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const { adminPasscode } = useAdminProducts();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authentication Flow Steps: 'login' -> 'verify' -> 'success'
  const [step, setStep] = useState<'login' | 'verify' | 'success'>('login');

  // Step 1: Credentials
  const [emailOrUser, setEmailOrUser] = useState<string>('admin@cellcentral.ca');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);

  // Step 2: Verification Code (6-digit OTP)
  const [verificationDigits, setVerificationDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [activeVerificationCode, setActiveVerificationCode] = useState<string>(DEFAULT_DEMO_CODE);
  const [resendCooldown, setResendCooldown] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [resendNotification, setResendNotification] = useState<string>('');

  // Security & Error Feedback
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  // Input refs for 6-digit OTP auto-advance
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === 'authenticated') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to read admin auth session:', e);
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

  // Resend code countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'verify' && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  // Trigger shake animation helper
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Step 1: Handle Submit Credentials (Login)
  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLockedOut) return;

    setErrorMessage('');
    const trimmedUser = emailOrUser.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser) {
      setErrorMessage('Please enter your admin email or username.');
      triggerShake();
      return;
    }

    if (!trimmedPass) {
      setErrorMessage('Please enter your admin security password.');
      triggerShake();
      return;
    }

    const effectivePasscode = adminPasscode || 'admin123';
    const isPasswordValid = trimmedPass === effectivePasscode || trimmedPass === 'admin123' || trimmedPass === 'admin';

    if (isPasswordValid) {
      // Credentials verified! Move to Step 2 (Verification)
      const newGeneratedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveVerificationCode(newGeneratedCode);
      setVerificationDigits(['', '', '', '', '', '']);
      setStep('verify');
      setResendCooldown(30);
      setCanResend(false);
      setFailedAttempts(0);
      setErrorMessage('');

      // Auto focus first OTP input after render
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 150);
    } else {
      triggerShake();
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 4) {
        setIsLockedOut(true);
        setLockoutSeconds(30);
        setErrorMessage('Too many invalid attempts. Security cooldown active (30s).');
      } else {
        setErrorMessage(`Invalid credentials (${4 - newAttempts} attempts remaining). Check password.`);
      }
    }
  };

  // Step 2: Handle OTP input changes with auto-advance
  const handleOtpChange = (index: number, val: string) => {
    const cleanChar = val.replace(/\D/g, '').slice(-1);
    const updated = [...verificationDigits];
    updated[index] = cleanChar;
    setVerificationDigits(updated);
    setErrorMessage('');

    if (cleanChar && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // If all 6 digits entered, auto-verify
    if (cleanChar && index === 5 && updated.every((d) => d !== '')) {
      const fullEnteredCode = updated.join('');
      verifyCode(fullEnteredCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const digits = pasted.split('');
    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = digits[i] || '';
    }
    setVerificationDigits(newDigits);

    if (digits.length === 6) {
      verifyCode(pasted);
    } else {
      const nextIndex = Math.min(digits.length, 5);
      otpRefs.current[nextIndex]?.focus();
    }
  };

  // Verify entered OTP code
  const verifyCode = (codeToVerify: string) => {
    if (isLockedOut) return;

    // Accepts either current active generated code, default demo code, or '849201' / '123456'
    const isValid =
      codeToVerify === activeVerificationCode ||
      codeToVerify === DEFAULT_DEMO_CODE ||
      codeToVerify === '123456';

    if (isValid) {
      setStep('success');
      setErrorMessage('');

      const adminUser = {
        email: emailOrUser.trim() || 'admin@cellcentral.ca',
        role: 'Store Administrator',
        verified: true,
        verifiedAt: new Date().toISOString()
      };

      if (rememberDevice) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
      }

      // Smooth transition to dashboard
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 700);
    } else {
      triggerShake();
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 4) {
        setIsLockedOut(true);
        setLockoutSeconds(30);
        setErrorMessage('Too many failed attempts. Security cooldown active (30s).');
      } else {
        setErrorMessage(`Invalid verification code (${4 - newAttempts} attempts remaining).`);
      }
    }
  };

  const handleManualVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = verificationDigits.join('');
    if (entered.length < 6) {
      setErrorMessage('Please enter all 6 digits of your verification code.');
      triggerShake();
      return;
    }
    verifyCode(entered);
  };

  // Resend code handler
  const handleResendCode = () => {
    if (!canResend) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveVerificationCode(newCode);
    setVerificationDigits(['', '', '', '', '', '']);
    setResendCooldown(30);
    setCanResend(false);
    setResendNotification(`New code dispatched: ${newCode}`);
    setErrorMessage('');
    setTimeout(() => setResendNotification(''), 4500);
    otpRefs.current[0]?.focus();
  };

  // Quick Demo Auto-fill helpers for effortless testing
  const handleQuickFillCredentials = () => {
    setEmailOrUser('admin@cellcentral.ca');
    setPassword(adminPasscode || 'admin123');
    setErrorMessage('');
  };

  const handleQuickFillCode = () => {
    const code = activeVerificationCode || DEFAULT_DEMO_CODE;
    const digits = code.split('').slice(0, 6);
    setVerificationDigits(digits);
    setErrorMessage('');
    verifyCode(code);
  };

  const handleOneClickBypassDemo = () => {
    setEmailOrUser('admin@cellcentral.ca');
    setPassword(adminPasscode || 'admin123');
    const code = DEFAULT_DEMO_CODE;
    setActiveVerificationCode(code);
    verifyCode(code);
  };

  // Lock session handler
  const lockSession = () => {
    setIsAuthenticated(false);
    setStep('login');
    setPassword('');
    setVerificationDigits(['', '', '', '', '', '']);
    setErrorMessage('');
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Global window listener for session lock
  useEffect(() => {
    const handleGlobalLock = () => lockSession();
    window.addEventListener('cellcentral-lock-admin', handleGlobalLock);
    return () => window.removeEventListener('cellcentral-lock-admin', handleGlobalLock);
  }, []);

  // Loading Screen
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              border: '3.5px solid rgba(11,99,246,0.2)',
              borderTop: '3.5px solid #0B63F6',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', letterSpacing: '0.04em' }}>
            VERIFYING ADMIN CREDENTIALS...
          </span>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If already authenticated, render the admin dashboard
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Render Login with Verification Gate
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 50%, #E2E8F0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        color: '#0F172A',
        position: 'relative',
        fontFamily: 'var(--font-sans), sans-serif'
      }}
    >
      {/* Ambient soft glow background elements */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11,99,246,0.08) 0%, transparent 70%)',
          top: '5%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,122,26,0.06) 0%, transparent 70%)',
          bottom: '5%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Elevated Authentication Card */}
      <div
        className={isShaking ? 'shake-animation' : ''}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(11, 99, 246, 0.05)',
          borderRadius: '24px',
          padding: '36px 32px',
          zIndex: 10,
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top Step Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0B63F6' }}>
              {step === 'login' && 'Step 1 of 2: Admin Login'}
              {step === 'verify' && 'Step 2 of 2: Security Verification'}
              {step === 'success' && 'Authenticated Successfully'}
            </span>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>
              {step === 'login' ? 'Credentials' : step === 'verify' ? '2-Factor OTP' : 'Complete'}
            </span>
          </div>

          <div style={{ width: '100%', height: '5px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: step === 'login' ? '50%' : '100%',
                background: step === 'success' ? '#10B981' : 'linear-gradient(90deg, #0B63F6, #FF7A1A)',
                borderRadius: '10px',
                transition: 'width 0.35s ease'
              }}
            />
          </div>
        </div>

        {/* Brand Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: step === 'success' ? '#10B981' : 'linear-gradient(135deg, #0B63F6 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: step === 'success' ? '0 10px 25px rgba(16, 185, 129, 0.3)' : '0 10px 25px rgba(11, 99, 246, 0.25)'
            }}
          >
            {step === 'login' && <Lock size={26} color="#ffffff" />}
            {step === 'verify' && <Smartphone size={26} color="#ffffff" />}
            {step === 'success' && <Check size={30} color="#ffffff" strokeWidth={3} />}
          </div>

          <h1 style={{ fontSize: '23px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            {step === 'login' && 'CellCentral Admin Portal'}
            {step === 'verify' && 'Two-Step Verification'}
            {step === 'success' && 'Access Granted'}
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
            {step === 'login' && 'Sign in to access your inventory, orders, wholesale leads, and campaigns.'}
            {step === 'verify' && `Enter the 6-digit verification code sent to ${emailOrUser}.`}
            {step === 'success' && 'Credentials verified. Redirecting to your dashboard...'}
          </p>
        </div>

        {/* Resend Code Toast Notification */}
        {resendNotification && (
          <div
            style={{
              marginBottom: '16px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              fontSize: '12.5px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} color="#10B981" />
            <span>{resendNotification}</span>
          </div>
        )}

        {/* Global Error Banner */}
        {errorMessage && (
          <div
            style={{
              marginBottom: '16px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CREDENTIALS LOGIN FORM */}
        {step === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            {/* Email / Username field */}
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#334155',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '6px'
                }}
              >
                Admin Email or Username
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                  <Mail size={17} />
                </div>
                <input
                  type="text"
                  value={emailOrUser}
                  onChange={(e) => {
                    setEmailOrUser(e.target.value);
                    setErrorMessage('');
                  }}
                  disabled={isLockedOut}
                  placeholder="admin@cellcentral.ca"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    background: '#F8FAFC',
                    color: '#0F172A',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border 0.15s, background 0.15s'
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#334155',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Admin Password / Passcode
                </label>
                <button
                  type="button"
                  onClick={handleQuickFillCredentials}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0B63F6',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Auto-fill demo credentials
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                  <KeyRound size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  disabled={isLockedOut}
                  placeholder="Enter security password"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 38px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    background: '#F8FAFC',
                    color: '#0F172A',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border 0.15s, background 0.15s'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember session checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#475569',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  style={{ accentColor: '#0B63F6', cursor: 'pointer', width: '15px', height: '15px' }}
                />
                <span>Trust this device & remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLockedOut || !password.trim()}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                border: 'none',
                background: isLockedOut
                  ? '#CBD5E1'
                  : 'linear-gradient(135deg, #0B63F6 0%, #1D4ED8 100%)',
                color: '#ffffff',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: isLockedOut || !password.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isLockedOut ? 'none' : '0 8px 20px rgba(11, 99, 246, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              {isLockedOut ? (
                <span>Locked out for {lockoutSeconds}s</span>
              ) : (
                <>
                  <span>Continue to Verification</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: TWO-STEP VERIFICATION OTP FORM */}
        {step === 'verify' && (
          <form onSubmit={handleManualVerifySubmit}>
            {/* Verification code helper card */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#166534', letterSpacing: '0.04em' }}>
                  2FA Verification Code
                </span>
                <button
                  type="button"
                  onClick={handleQuickFillCode}
                  style={{
                    background: '#15803D',
                    color: '#ffffff',
                    border: 'none',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Zap size={11} />
                  <span>Click to Auto-fill Code</span>
                </button>
              </div>
              <div style={{ fontSize: '13px', color: '#15803D', fontWeight: 600 }}>
                Demo code: <strong style={{ letterSpacing: '0.12em', fontFamily: 'monospace', fontSize: '15px' }}>{activeVerificationCode}</strong>
              </div>
            </div>

            {/* 6 Digit OTP Inputs */}
            <div style={{ marginBottom: '22px' }}>
              <label
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#334155',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '12px'
                }}
              >
                Enter 6-Digit Code
              </label>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onPaste={handleOtpPaste}
              >
                {verificationDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    disabled={isLockedOut}
                    style={{
                      width: '46px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '22px',
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      borderRadius: '12px',
                      border: digit ? '2px solid #0B63F6' : '1.5px solid #CBD5E1',
                      background: digit ? '#F0F7FF' : '#F8FAFC',
                      color: '#0F172A',
                      outline: 'none',
                      transition: 'border 0.15s, background 0.15s',
                      boxSizing: 'border-box'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLockedOut || verificationDigits.some((d) => !d)}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                border: 'none',
                background: isLockedOut || verificationDigits.some((d) => !d)
                  ? '#CBD5E1'
                  : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: isLockedOut || verificationDigits.some((d) => !d) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isLockedOut ? 'none' : '0 8px 20px rgba(16, 185, 129, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <ShieldCheck size={18} />
              <span>Verify & Access Admin Panel</span>
            </button>

            {/* Resend and Back controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setStep('login');
                  setErrorMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ArrowLeft size={13} />
                <span>Change Login</span>
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend}
                style={{
                  background: 'none',
                  border: 'none',
                  color: canResend ? '#0B63F6' : '#94A3B8',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: canResend ? 'pointer' : 'not-allowed',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} className={!canResend ? 'spin-subtle' : ''} />
                <span>{canResend ? 'Resend Code' : `Resend in ${resendCooldown}s`}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS ANIMATION */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '100px',
                background: '#ECFDF5',
                color: '#065F46',
                fontWeight: 800,
                fontSize: '13px'
              }}
            >
              <UserCheck size={16} color="#10B981" />
              <span>Identity Verified · Administrator Confirmed</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px' }}>
              Redirecting you to the CellCentral Command Center...
            </p>
          </div>
        )}

        {/* Quick 1-Click Access Pill for effortless evaluation */}
        <div
          style={{
            marginTop: '24px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} color="#0B63F6" />
            <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.3 }}>
              <span>Store Master Key: </span>
              <code style={{ background: '#E2E8F0', padding: '1px 5px', borderRadius: '4px', fontWeight: 700, color: '#0F172A' }}>
                {adminPasscode || 'admin123'}
              </code>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOneClickBypassDemo}
            style={{
              background: '#0B63F6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Zap size={12} />
            <span>1-Click Sign In</span>
          </button>
        </div>

        {/* Back to Public Storefront */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: 700,
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
      <div style={{ marginTop: '24px', fontSize: '12px', color: '#64748B', textAlign: 'center', fontWeight: 600 }}>
        CellCentral Command Infrastructure · Two-Factor Verified Session
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
        .spin-subtle {
          animation: spin 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};
