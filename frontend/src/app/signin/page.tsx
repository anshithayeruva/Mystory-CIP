'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import styles from './signin.module.css';
import { login } from '@/services/auth.client';


// Removed demo role configurations

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await login(email, password);

      // Store minimal user info for UI (role display, etc.)
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
            name: `${result.user.firstName} ${result.user.lastName}`,
            loginTime: new Date().toISOString(),
          })
        );
      }

      // Artificial delay to let the spinner spin before showing success
      await new Promise(resolve => setTimeout(resolve, 800));

      setIsSuccess(true);

      // Wait 1.5 seconds so the checkmark animation finishes before redirect
      setTimeout(() => {
        if (result.mustChangePassword) {
          router.push('/change-password');
        } else {
          router.push(`/${result.user.role.toLowerCase()}`);
        }
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign in failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Full Page Lazy Loading Overlay */}
      {(isLoading || isSuccess) && (
        <div className={styles.fullPageLoader}>
          <div className={styles.loaderContent}>
            
            {!isSuccess ? (
              <svg className={styles.professionalSpinner} viewBox="0 0 50 50">
                <circle className={styles.spinnerPath} cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
              </svg>
            ) : (
              <svg className={styles.successCheckmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" strokeWidth="4" stroke="#115e59" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}

            <div className={styles.loaderTextGroup}>
              <div className={styles.loaderText}>
                {isSuccess ? 'Authentication Successful' : 'Authenticating...'}
              </div>
              <div className={styles.loaderSubtext}>
                {isSuccess ? 'Redirecting to your dashboard' : 'Establishing secure connection'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <GraduationCap size={22} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Academic Analytics</span>
            <span className={styles.brandSubtitle}>Mystory CIP Portal</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.authWrapper}>
          {/* Header Title Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Sign in to access your Academic Analytics Portal
            </p>
          </div>

          {/* Sign In Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <span className={styles.formHeaderTitle}>Sign In Credentials</span>
            </div>

            {isSuccess && (
              <div className={styles.successBanner}>
                <CheckCircle2 size={20} />
                <span>
                  Authenticated successfully! Redirecting...
                </span>
              </div>
            )}

            {errorMessage && !isSuccess && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 16px', borderRadius: '8px',
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#dc2626', fontSize: '13px', fontWeight: 500,
                marginBottom: '8px',
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} suppressHydrationWarning>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email-input">
                  Institutional Email or ID
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={18} />
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="Enter email address"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password-input">
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} size={18} />
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Enter password"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    className={styles.togglePasswordBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    suppressHydrationWarning
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>Remember this session</span>
                </label>

                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => alert('Demo Mode: Click "Sign In" to proceed to the portal.')}
                  suppressHydrationWarning
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading || isSuccess}
                suppressHydrationWarning
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Mystory CIP Academic Analytics Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}


