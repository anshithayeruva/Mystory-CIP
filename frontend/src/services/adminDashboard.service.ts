import { apiClient } from '@/lib/apiClient';

export class AdminDashboardService {
  static async getDashboardData() {
    const response = await apiClient.fetch('/api/admin/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch admin dashboard data');
    }
    const result = await response.json();
    return result.data || result;
  }

  static async getAuditLogs() {
    const response = await apiClient.fetch('/api/admin/audit-logs');
    if (!response.ok) {
      throw new Error('Failed to fetch audit logs');
    }
    const result = await response.json();
    return result.data || result;
  }

  static async getSystemHealth() {
    const response = await apiClient.fetch('/api/admin/system-health');
    if (!response.ok) {
      throw new Error('Failed to fetch system health');
    }
    const result = await response.json();
    return result.data || result;
  }
}
