/**
 * Client-side auth service — talks to the backend REST API.
 * All requests include credentials: 'include' so the httpOnly JWT cookie
 * is sent/received automatically.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface LoginResponse {
  success: boolean;
  mustChangePassword: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  message?: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Authenticate with email + password.
 * On success the backend sets an httpOnly JWT cookie automatically.
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data as LoginResponse;
}

/**
 * Change the current user's password.
 * Does NOT accept an email field by design.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<ChangePasswordResponse> {
  const res = await fetch(`${API_URL}/api/users/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Password change failed');
  }

  return data as ChangePasswordResponse;
}

/**
 * Clear the JWT cookie server-side and log out.
 */
export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
