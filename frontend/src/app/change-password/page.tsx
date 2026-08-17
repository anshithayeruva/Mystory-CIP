'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './change-password.module.css';
import { changePassword } from '@/services/auth.client';

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(currentPassword, newPassword, confirmPassword);

      setIsSuccess(true);

      // Read role from localStorage to redirect to the right portal
      let targetPath = '/signin';
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('currentUser');
          if (stored) {
            const { role } = JSON.parse(stored);
            if (role) targetPath = `/${String(role).toLowerCase()}`;
          }
        } catch {
          // ignore
        }
      }

      setTimeout(() => {
        router.push(targetPath);
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <ShieldCheck size={28} />
        </div>

        <h1 className={styles.title}>Set New Password</h1>
        <p className={styles.subtitle}>
          Your account requires a password change before you can continue.
          Please choose a strong, unique password.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Error Banner */}
          {errorMessage && !isSuccess && (
            <div className={styles.errorBanner}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {isSuccess && (
            <div className={styles.successBanner}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>Password changed! Redirecting to your portal...</span>
            </div>
          )}

          {/* Current Password */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="current-password">
              Current Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                id="current-password"
                type={showCurrent ? 'text' : 'password'}
                className={styles.input}
                placeholder="Enter your temporary password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowCurrent((v) => !v)}
                tabIndex={-1}
              >
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="new-password">
              New Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                id="new-password"
                type={showNew ? 'text' : 'password'}
                className={styles.input}
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowNew((v) => !v)}
                tabIndex={-1}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirm-password">
              Confirm New Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                className={styles.input}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Requirements hint */}
          <div className={styles.requirements}>
            <strong>Password requirements</strong>
            Minimum 8 characters. Choose something unique that you haven&apos;t used before.
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Updating...
              </>
            ) : (
              'Set New Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
