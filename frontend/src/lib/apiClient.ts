const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * A centralized API client for the frontend to communicate with the standalone backend.
 */
export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
        // Ensure the endpoint starts with a slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${NEXT_PUBLIC_API_URL}${path}`;

    // Automatically include credentials (cookies) for cross-origin requests to the backend
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'include',
    };

    return fetch(url, fetchOptions);
  }
};
