const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class AdminSettingsService {
  // Institution
  static async getInstitution() {
    const res = await fetch(`${API_URL}/admin/settings/institution`);
    if (!res.ok) throw new Error('Failed to fetch institution settings');
    return res.json();
  }

  static async updateInstitution(data: any) {
    const res = await fetch(`${API_URL}/admin/settings/institution`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update institution settings');
    return res.json();
  }

  // Academic
  static async getAcademic() {
    const res = await fetch(`${API_URL}/admin/settings/academic`);
    if (!res.ok) throw new Error('Failed to fetch academic settings');
    return res.json();
  }

  static async updateAcademic(data: any) {
    const res = await fetch(`${API_URL}/admin/settings/academic`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update academic settings');
    return res.json();
  }

  // Security
  static async getSecurity() {
    const res = await fetch(`${API_URL}/admin/settings/security`);
    if (!res.ok) throw new Error('Failed to fetch security settings');
    return res.json();
  }

  static async updateSecurity(data: any) {
    const res = await fetch(`${API_URL}/admin/settings/security`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update security settings');
    return res.json();
  }

  // Integrations
  static async getIntegrations() {
    const res = await fetch(`${API_URL}/admin/settings/integrations`);
    if (!res.ok) throw new Error('Failed to fetch integration settings');
    return res.json();
  }

  static async updateIntegrations(data: any) {
    const res = await fetch(`${API_URL}/admin/settings/integrations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update integration settings');
    return res.json();
  }

  // Audit Logs
  static async getAuditLogs(page = 1, limit = 10) {
    const res = await fetch(`${API_URL}/admin/settings/audit-logs?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  }
}
