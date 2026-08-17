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


type RoleType = 'ADMIN' | 'STUDENT' | 'HOD' | 'FACULTY';

interface RoleOption {
  id: RoleType;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  defaultEmail: string;
  targetPath: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'ADMIN',
    title: 'Admin',
    badge: 'System Admin',
    description: 'Full portal access, user management, and system setup',
    icon: Shield,
    defaultEmail: 'admin@mystory.edu',
    targetPath: '/admin',
  },
  {
    id: 'STUDENT',
    title: 'Student',
    badge: 'Student Portal',
    description: 'Track academic progress, attendance, and live pulse feedback',
    icon: GraduationCap,
    defaultEmail: 'student@mystory.edu',
    targetPath: '/student',
  },
  {
    id: 'HOD',
    title: 'HOD',
    badge: 'Dept Head',
    description: 'Department analytics, staff performance, and reporting',
    icon: Building2,
    defaultEmail: 'hod.cs@mystory.edu',
    targetPath: '/hod',
  },
  {
    id: 'FACULTY',
    title: 'Faculty',
    badge: 'Faculty Portal',
    description: 'Manage subjects, monitor pulse sessions, and analyze concept gaps',
    icon: BookOpen,
    defaultEmail: 'faculty@mystory.edu',
    targetPath: '/faculty',
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>('ADMIN');
  const [email, setEmail] = useState<string>(ROLE_OPTIONS[0].defaultEmail);
  const [password, setPassword] = useState<string>('demo123456');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeRoleOption = ROLE_OPTIONS.find((r) => r.id === selectedRole) || ROLE_OPTIONS[0];

  const handleRoleSelect = (role: RoleOption) => {
    setSelectedRole(role.id);
    setEmail(role.defaultEmail);
  };

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

      setIsSuccess(true);

      setTimeout(() => {
        if (result.mustChangePassword) {
          router.push('/change-password');
        } else {
          router.push(`/${result.user.role.toLowerCase()}`);
        }
      }, 600);
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
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

        <div className={styles.demoBadge}>
          <div className={styles.demoDot} />
          <span>Interactive Role Sign In</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.authWrapper}>
          {/* Header Title Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Select your role to explore the Academic Analytics Portal workflow
            </p>
          </div>

          {/* 4 Role Options */}
          <div className={styles.rolesGrid}>
            {ROLE_OPTIONS.map((role) => {
              const IconComp = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  className={`${styles.roleCard} ${isSelected ? styles.roleCardActive : ''}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {isSelected && (
                    <div className={styles.checkIndicator}>
                      <CheckCircle2 size={18} />
                    </div>
                  )}

                  <div className={styles.roleIconWrapper}>
                    <IconComp size={24} />
                  </div>

                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <span className={styles.roleBadge}>{role.badge}</span>
                  <p className={styles.roleDescription}>{role.description}</p>
                </div>
              );
            })}
          </div>

          {/* Sign In Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <span className={styles.formHeaderTitle}>Sign In Credentials</span>
              <div className={styles.selectedRolePill}>
                <Sparkles size={14} />
                <span>{activeRoleOption.title} Mode</span>
              </div>
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
                    <span>Sign In as {activeRoleOption.title}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.quickFillBox}>
              <span className={styles.quickFillNotice}>
                <Check size={14} /> Demo credentials pre-filled automatically
              </span>
              <span>Role: {activeRoleOption.id}</span>
            </div>
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


