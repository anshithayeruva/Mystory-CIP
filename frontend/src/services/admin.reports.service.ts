import { apiClient } from '../lib/apiClient';

export const AdminReportsService = {
  getOverviewMetrics: async () => {
    const response = await apiClient.fetch('/api/admin/reports/overview/metrics');
    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch metrics');
    return data.data;
  },

  getMasteryDistribution: async () => {
    const response = await apiClient.fetch('/api/admin/reports/overview/mastery');
    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch mastery distribution');
    return data.data;
  },

  getUnderstandingTrend: async () => {
    const response = await apiClient.fetch('/api/admin/reports/overview/trend');
    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch understanding trend');
    return data.data;
  },

  getDepartmentPerformance: async (page = 1, limit = 5) => {
    const response = await apiClient.fetch(`/api/admin/reports/overview/departments?page=${page}&limit=${limit}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch department performance');
    return data.data;
  },

  getAvailableReports: async () => {
    const response = await apiClient.fetch('/api/admin/reports/available');
    const data = await response.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch reports');
    return data.data;
  },

  downloadReportUrl: (reportId: string, format: string) => {
    // Instead of using fetch to download a blob, it's often easier to return the direct URL
    // so the browser can handle the download prompt natively.
    // However, if authorization headers are required, fetch is needed.
    // For this implementation, we will assume standard fetch with blob generation in the UI,
    // or just return the constructed URL and let the UI open it.
    
    // In our apiClient structure, NEXT_PUBLIC_API_URL is used.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return `${baseUrl}/api/admin/reports/download/${reportId}?format=${format}`;
  }
};
