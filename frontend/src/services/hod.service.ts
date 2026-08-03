import { apiClient } from '@/lib/apiClient';

export class HodService {
  /**
   * Fetch HOD Dashboard Data
   */
  static async getDashboard() {
    const response = await apiClient.fetch('/api/hod/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch HOD dashboard data');
    }
    return response.json();
  }

  /**
   * Faculty Management API
   */
  static async getFacultyList(params: { search?: string; role?: string; page?: number; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.role) query.append('role', params.role);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await apiClient.fetch(`/api/hod/faculty?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch faculty list');
    return response.json();
  }

  static async getFacultyById(id: string) {
    const response = await apiClient.fetch(`/api/hod/faculty/${id}`);
    if (!response.ok) throw new Error('Failed to fetch faculty details');
    return response.json();
  }

  static async createFaculty(data: any) {
    const response = await apiClient.fetch('/api/hod/faculty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create faculty member');
    return response.json();
  }

  static async updateFaculty(id: string, data: any) {
    const response = await apiClient.fetch(`/api/hod/faculty/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update faculty member');
    return response.json();
  }

  static async deleteFaculty(id: string) {
    const response = await apiClient.fetch(`/api/hod/faculty/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete faculty member');
    return response.json();
  }

  /**
   * Students Management API
   */
  static async getStudentsList(params: { search?: string; semester?: number; batch?: string; page?: number; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.semester) query.append('semester', params.semester.toString());
    if (params.batch) query.append('batch', params.batch);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await apiClient.fetch(`/api/hod/students?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch students list');
    return response.json();
  }

  static async getStudentById(id: string) {
    const response = await apiClient.fetch(`/api/hod/students/${id}`);
    if (!response.ok) throw new Error('Failed to fetch student details');
    return response.json();
  }

  static async createStudent(data: any) {
    const response = await apiClient.fetch('/api/hod/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  }

  static async updateStudent(id: string, data: any) {
    const response = await apiClient.fetch(`/api/hod/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  }

  static async deleteStudent(id: string) {
    const response = await apiClient.fetch(`/api/hod/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  }

  /**
   * Subjects / Courses Management API
   */
  static async getSubjectsList(params: { search?: string; semester?: number; page?: number; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.semester) query.append('semester', params.semester.toString());
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await apiClient.fetch(`/api/hod/subjects?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch subjects list');
    return response.json();
  }

  static async getSubjectById(id: string) {
    const response = await apiClient.fetch(`/api/hod/subjects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch subject details');
    return response.json();
  }

  static async createSubject(data: any) {
    const response = await apiClient.fetch('/api/hod/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create subject');
    return response.json();
  }

  static async updateSubject(id: string, data: any) {
    const response = await apiClient.fetch(`/api/hod/subjects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update subject');
    return response.json();
  }

  static async deleteSubject(id: string) {
    const response = await apiClient.fetch(`/api/hod/subjects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete subject');
    return response.json();
  }

  /**
   * Reports API
   */
  static async getDepartmentReports() {
    const response = await apiClient.fetch('/api/hod/reports');
    if (!response.ok) throw new Error('Failed to fetch department reports');
    return response.json();
  }

  static async exportReport(data: { title?: string; type?: string; format?: string }) {
    const response = await apiClient.fetch('/api/hod/reports/export', {
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
    const response = await apiClient.fetch('/api/hod/settings');
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  }

  static async getDepartmentSettings() {
    return this.getSettings();
  }

  static async updateSettings(data: any) {
    const response = await apiClient.fetch('/api/hod/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  }

  static async updateDepartmentSettings(data: any) {
    return this.updateSettings(data);
  }

  /**
   * Account Profile & Security API
   */
  static async getAccountProfile() {
    const response = await apiClient.fetch('/api/hod/account');
    if (!response.ok) throw new Error('Failed to fetch account profile');
    return response.json();
  }

  static async updateAccountProfile(data: any) {
    const response = await apiClient.fetch('/api/hod/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update account profile');
    return response.json();
  }

  static async updateAccountPassword(data: any) {
    const response = await apiClient.fetch('/api/hod/account/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update account password');
    return response.json();
  }
}
