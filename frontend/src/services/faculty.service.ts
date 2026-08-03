import { apiClient } from '@/lib/apiClient';

export class FacultyService {
  /**
   * Dashboard API
   */
  static async getDashboard() {
    const response = await apiClient.fetch('/api/faculty/dashboard');
    if (!response.ok) throw new Error('Failed to fetch faculty dashboard data');
    return response.json();
  }

  /**
   * Subjects API
   */
  static async getSubjects() {
    const response = await apiClient.fetch('/api/faculty/subjects');
    if (!response.ok) throw new Error('Failed to fetch faculty subjects');
    return response.json();
  }

  static async getSubjectById(id: string) {
    const response = await apiClient.fetch(`/api/faculty/subjects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch subject details');
    return response.json();
  }

  static async createSubject(data: any) {
    const response = await apiClient.fetch('/api/faculty/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create subject');
    return response.json();
  }

  static async updateSubject(id: string, data: any) {
    const response = await apiClient.fetch(`/api/faculty/subjects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update subject');
    return response.json();
  }

  static async deleteSubject(id: string) {
    const response = await apiClient.fetch(`/api/faculty/subjects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete subject');
    return response.json();
  }

  /**
   * Pulse Sessions API
   */
  static async getPulseSessions() {
    const response = await apiClient.fetch('/api/faculty/pulse-sessions');
    if (!response.ok) throw new Error('Failed to fetch pulse sessions');
    return response.json();
  }

  static async createPulseSession(data: any) {
    const response = await apiClient.fetch('/api/faculty/pulse-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create pulse session');
    return response.json();
  }

  static async getPulseSessionById(id: string) {
    const response = await apiClient.fetch(`/api/faculty/pulse-sessions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch pulse session');
    return response.json();
  }

  static async updatePulseSession(id: string, data: any) {
    const response = await apiClient.fetch(`/api/faculty/pulse-sessions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update pulse session');
    return response.json();
  }

  static async deletePulseSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/pulse-sessions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete pulse session');
    return response.json();
  }

  /**
   * Live Session Controls API
   */
  static async startLiveSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/live-session/${id}/start`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to start live session');
    return response.json();
  }

  static async pauseLiveSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/live-session/${id}/pause`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to pause live session');
    return response.json();
  }

  static async resumeLiveSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/live-session/${id}/resume`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to resume live session');
    return response.json();
  }

  static async endLiveSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/live-session/${id}/end`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to end live session');
    return response.json();
  }

  static async getLiveSession(id: string) {
    const response = await apiClient.fetch(`/api/faculty/live-session/${id}`);
    if (!response.ok) throw new Error('Failed to fetch live session state');
    return response.json();
  }

  /**
   * Concept Gap Analysis API
   */
  static async getAllConceptGaps() {
    const response = await apiClient.fetch('/api/faculty/concept-gap');
    if (!response.ok) throw new Error('Failed to fetch concept gaps');
    return response.json();
  }

  static async getConceptGapAnalysis(subjectId: string) {
    const response = await apiClient.fetch(`/api/faculty/concept-gap/${subjectId}`);
    if (!response.ok) throw new Error('Failed to fetch subject concept gap analysis');
    return response.json();
  }

  /**
   * Reports API
   */
  static async getReports() {
    const response = await apiClient.fetch('/api/faculty/reports');
    if (!response.ok) throw new Error('Failed to fetch faculty reports');
    return response.json();
  }

  static async exportReport(data: { title?: string; format?: string }) {
    const response = await apiClient.fetch('/api/faculty/reports/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to export report');
    return response.json();
  }

  /**
   * Settings API
   */
  static async getSettings() {
    const response = await apiClient.fetch('/api/faculty/settings');
    if (!response.ok) throw new Error('Failed to fetch faculty settings');
    return response.json();
  }

  static async updateSettings(data: any) {
    const response = await apiClient.fetch('/api/faculty/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update faculty settings');
    return response.json();
  }
}
