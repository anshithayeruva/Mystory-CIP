// Ensure it points to the Express backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
};

export const studentDashboardService = {
  getStudentInfo: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/dashboard/info`);
  },

  getTodayClasses: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/dashboard/today-classes`);
  },

  getCourses: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/dashboard/courses`);
  },

  getAssignments: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/dashboard/assignments`);
  },

  getInsights: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/dashboard/insights`);
  },

  getAttendanceAnalytics: async (studentId: string, semester: string) => {
    return fetcher(`${API_URL}/student/${studentId}/reports/attendance?semester=${encodeURIComponent(semester)}`);
  },

  getUnderstandingAnalytics: async (studentId: string, semester: string) => {
    return fetcher(`${API_URL}/student/${studentId}/reports/understanding?semester=${encodeURIComponent(semester)}`);
  },

  exportReport: async (studentId: string, title: string, type: string) => {
    const response = await fetch(`${API_URL}/student/${studentId}/reports/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, type })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  },

  getSettings: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/settings`);
  },

  updateProfile: async (studentId: string, payload: any) => {
    const response = await fetch(`${API_URL}/student/${studentId}/settings/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.success;
  },

  updateAcademic: async (studentId: string, payload: any) => {
    const response = await fetch(`${API_URL}/student/${studentId}/settings/academic`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.success;
  },

  updateNotifications: async (studentId: string, payload: any) => {
    const response = await fetch(`${API_URL}/student/${studentId}/settings/notifications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.success;
  },

  updateSecurity: async (studentId: string, payload: any) => {
    const response = await fetch(`${API_URL}/student/${studentId}/settings/security`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.success;
  },

  getDocuments: async (studentId: string) => {
    return fetcher(`${API_URL}/student/${studentId}/documents`);
  }
};
