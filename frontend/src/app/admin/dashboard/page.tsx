import { DashboardService } from '@/modules/admin/dashboard/dashboard.service';
import { Filter, Plus, UserSquare2, ShieldCheck, Network, BookMarked, Zap, Eye, MoreVertical, History, Activity } from 'lucide-react';
import Link from 'next/link';
import './dashboard.css';

export default async function DashboardPage() {
  const stats = await DashboardService.getDashboardStats();
  const enrollments = await DashboardService.getRecentEnrollments();
  const sessions = await DashboardService.getActiveSessions();

  // Mock sessions if DB is empty
  const activeSessions = sessions.length > 0 ? sessions : [
    { code: '#SC-9021', subject: 'Deep Learning', facultyName: 'Prof. Alan Turing', sectionName: 'AI-8A', status: 'LIVE' },
    { code: '#SC-9044', subject: 'Thermodynamics', facultyName: 'Dr. Kelvin Lord', sectionName: 'ME-3C', status: 'SCHEDULED' },
    { code: '#SC-8912', subject: 'Legal Ethics', facultyName: 'Adv. Jane Doe', sectionName: 'L-21B', status: 'COMPLETED' },
    { code: '#SC-9050', subject: 'Organic Chemistry', facultyName: 'Prof. Marie S.', sectionName: 'CH-2A', status: 'LIVE' },
  ];

  const recentEnrollments = enrollments.length > 0 ? enrollments : [
    { subject: 'Data Structures', section: 'CS-4A', sem: 'IV' },
    { subject: 'Quantum Physics', section: 'PH-2B', sem: 'II' },
    { subject: 'Macro Economics', section: 'EC-6C', sem: 'VI' },
    { subject: 'Fluid Mechanics', section: 'CE-4A', sem: 'IV' },
  ];

  return (
    <div>
      <div className="dashboard-header flex-row justify-between align-center">
        <div>
          <h1>Campus Overview</h1>
          <p>Monitor live and active academic cycles across the campus.</p>
        </div>
        <div className="flex-row gap-md">
          <button className="btn btn-outline">
            <Filter size={16} />
            Filters
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            New Record
          </button>
        </div>
      </div>

      <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', marginBottom: '24px' }}>
        <div className="kpi-card">
          <div className="kpi-icon-container">
            <UserSquare2 size={20} />
          </div>
          <div>
            <div className="kpi-title">Total Faculty</div>
            <div className="kpi-value">{stats.facultyCount || 842}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-container">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="kpi-title">Total HODs</div>
            <div className="kpi-value">{stats.hodCount || 24}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-container">
            <Network size={20} />
          </div>
          <div>
            <div className="kpi-title">Departments</div>
            <div className="kpi-value">{stats.departmentCount || 18}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-container">
            <BookMarked size={20} />
          </div>
          <div>
            <div className="kpi-title">Total Subjects</div>
            <div className="kpi-value">{stats.courseCount || 156}</div>
          </div>
        </div>

        <div className="kpi-card live-sessions">
          <div className="live-indicator"></div>
          <div className="kpi-icon-container">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <div className="kpi-title">Live Sessions</div>
            <div className="kpi-value">42</div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        {/* Recent Enrollments */}
        <div className="table-container">
          <div className="table-header">
            <div className="table-title">Recent Enrollments</div>
            <Link href="#" className="table-action">View All</Link>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Section</th>
                <th>Sem</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((enrollment: any, index: number) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{enrollment.course ? enrollment.course.name : enrollment.subject}</div>
                  </td>
                  <td>
                    <span className="section-tag">{enrollment.student?.section?.name || enrollment.section}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      {enrollment.student?.semester?.semesterNumber 
                        ? (enrollment.student.semester.semesterNumber === 1 ? 'I' : 
                           enrollment.student.semester.semesterNumber === 2 ? 'II' : 
                           enrollment.student.semester.semesterNumber === 3 ? 'III' : 
                           enrollment.student.semester.semesterNumber === 4 ? 'IV' : 
                           enrollment.student.semester.semesterNumber === 5 ? 'V' : 
                           enrollment.student.semester.semesterNumber === 6 ? 'VI' : 
                           enrollment.student.semester.semesterNumber === 7 ? 'VII' : 'VIII')
                        : enrollment.sem}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Sessions */}
        <div className="table-container">
          <div className="table-header">
            <div className="flex-row align-center gap-sm">
              <div className="table-title">Active Sessions (Live Now)</div>
            </div>
            <div className="flex-row align-center gap-md">
              <div className="flex-row align-center gap-sm text-sm" style={{ color: 'var(--success)' }}>
                <span className="status-dot live"></span>
                12 Online
              </div>
              <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--surface-border)' }}></div>
              <Link href="#" className="table-action">Session Hub</Link>
            </div>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject & Faculty</th>
                <th>Section</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeSessions.map((session: any, index: number) => {
                const statusStr = session.status || 'LIVE'; // mock status
                const statusClass = statusStr.toLowerCase();
                const isLive = statusStr === 'LIVE';
                const isScheduled = statusStr === 'SCHEDULED';
                
                return (
                  <tr key={index}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#3b82f6' }}>{session.course?.code || session.code}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{session.course?.name || session.subject}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {session.faculty ? `Prof. ${session.faculty.user?.lastName || 'Unknown'}` : session.facultyName}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{session.section || session.sectionName}</div>
                    </td>
                    <td>
                      <span className={`badge badge-${statusClass}`}>
                        <span className={`status-dot ${statusClass}`}></span>
                        {statusStr}
                      </span>
                    </td>
                    <td>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        {isLive ? <Eye size={18} /> : isScheduled ? <MoreVertical size={18} /> : <History size={18} />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sync-footer">
        <div className="sync-info">
          <Activity size={18} color="#94a3b8" />
          <span>Next scheduled student attendance records will sync in 12 minutes (UTC+5).</span>
        </div>
        <button className="btn btn-dark">Force Manual Sync</button>
      </div>
    </div>
  );
}
