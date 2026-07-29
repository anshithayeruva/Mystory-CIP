"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  PlusCircle, 
  BookOpen, 
  Settings, 
  Server, 
  ShieldCheck, 
  Pause, 
  Play, 
  Square,
  QrCode,
  Eye,
  ChevronDown
} from 'lucide-react';
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

export default function FacultyDashboard() {
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);
  const [liveSession, setLiveSession] = useState<any>(null);
  const [distributionData, setDistributionData] = useState<any[]>([]);
  const [conceptGaps, setConceptGaps] = useState<any>(null);
  const [assignedSubjects, setAssignedSubjects] = useState<any[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          summaryRes, 
          pulseSessionsRes, 
          distributionRes, 
          gapsRes, 
          subjectsRes, 
          sessionsRes
        ] = await Promise.all([
          fetch('/api/faculty/analytics/dashboard-summary'),
          fetch('/api/faculty/pulse-sessions?limit=10'),
          fetch('/api/faculty/analytics/charts/session-count-per-subject'),
          fetch('/api/faculty/analytics/concept-gaps'),
          fetch('/api/faculty/profile/subjects?limit=4'),
          fetch('/api/faculty/analytics/sessions?limit=5')
        ]);

        if (summaryRes.ok) {
          const json = await summaryRes.json();
          setDashboardSummary(json.data);
        }
        
        if (pulseSessionsRes.ok) {
          const json = await pulseSessionsRes.json();
          const sessions = json.data?.sessions || [];
          if (sessions.length > 0) {
             setLiveSession(sessions[0]);
          }
        }

        if (distributionRes.ok) {
          const json = await distributionRes.json();
          const colors = ['#10633B', '#059669', '#064E3B', '#166534', '#047857'];
          const distData = (json.data || []).map((item: any, idx: number) => ({
            name: item.subject,
            value: item.sessionCount,
            color: colors[idx % colors.length]
          }));
          setDistributionData(distData);
        }

        if (gapsRes.ok) {
          const json = await gapsRes.json();
          setConceptGaps(json.data);
        }

        if (subjectsRes.ok) {
          const json = await subjectsRes.json();
          setAssignedSubjects(json.data?.data || []);
        }

        if (sessionsRes.ok) {
          const json = await sessionsRes.json();
          setRecentSessions(json.data?.data || []);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div style={{ padding: '24px' }}>Loading dashboard...</div>;
  }

  const totalDonutValue = distributionData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="dashboard-scroll">
      
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Faculty Dashboard</h1>
          <div className="page-tags">
            <span className="tag"><Settings size={14}/> Department: Computer Science Engineering</span>
            <span className="tag"><BookOpen size={14}/> Assigned Subjects: {(dashboardSummary?.totalAssignedSubjects || 0) < 10 ? '0' + (dashboardSummary?.totalAssignedSubjects || 0) : dashboardSummary?.totalAssignedSubjects || 0}</span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <FileText size={18} /> View Reports
          </button>
          <button className="btn btn-primary">
            <PlusCircle size={18} /> Create Pulse Session
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">Total Sessions</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{dashboardSummary?.totalSessionsCreated || 0}</span>
          </div>
        </div>
        
        <div className="kpi-card">
          <span className="kpi-title">Active Sessions</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{(dashboardSummary?.activeSessions || 0) < 10 ? '0'+(dashboardSummary?.activeSessions || 0) : dashboardSummary?.activeSessions || 0}</span>
            {dashboardSummary?.activeSessions > 0 && <span className="kpi-indicator"></span>}
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Completed</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{dashboardSummary?.completedSessions || 0}</span>
            <span className="kpi-subtitle">Total</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Assigned Subjects</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{(dashboardSummary?.totalAssignedSubjects || 0) < 10 ? '0'+(dashboardSummary?.totalAssignedSubjects || 0) : dashboardSummary?.totalAssignedSubjects || 0}</span>
            <BookOpen size={20} color="#64748b" />
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Attendance Rate</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{dashboardSummary?.overallAttendancePercentage || 0}%</span>
            <span className="kpi-subtitle" style={{ fontSize: '0.65rem' }}>Overall</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Understanding</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{dashboardSummary?.overallTopicUnderstandingPercentage || 0}%</span>
            <span className="kpi-subtitle" style={{ fontSize: '0.65rem', color: '#2563eb' }}>Avg</span>
          </div>
        </div>
      </div>

      {/* Live Session Card */}
      {liveSession && (
        <div className="live-session-card">
          <div className="live-left">
            <div className="live-badge-row">
              <span className="badge-live">{liveSession.status || 'ACTIVE'}</span>
              <span className="live-time">Started: {new Date(liveSession.date).toLocaleDateString()}</span>
            </div>
            
            <h2 className="live-title">{liveSession.course?.name} ({liveSession.course?.code})</h2>
            <p className="live-topic">
              Topic: {liveSession.topic?.topicName}
            </p>

            <div className="live-stats">
              <div className="live-stat-group">
                <span className="live-stat-label">Duration</span>
                <span className="live-stat-value green">{liveSession.durationMinutes} min</span>
              </div>
              <div className="live-stat-group">
                <span className="live-stat-label" style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '24px' }}>Questions</span>
                <span className="live-stat-value" style={{ paddingLeft: '24px' }}>{liveSession.questionCount}</span>
              </div>
            </div>

            <div className="live-actions">
              <button className="btn btn-outline">
                <Pause size={16} /> Pause
              </button>
              <button className="btn btn-primary">
                <Play size={16} /> Resume
              </button>
              <button className="btn btn-danger">
                <Square size={16} /> End Session
              </button>
            </div>
          </div>

          <div className="live-right">
            <div className="qr-box">
              <QrCode size={64} color="#64748b" />
            </div>
            <span className="qr-text">Join: {liveSession.id.substring(0,6).toUpperCase()}</span>
          </div>
        </div>
      )}

      {/* Gap Section */}
      <div className="gap-section">
        
        {/* Distribution Donut */}
        <div className="gap-card">
          <div className="gap-header">
            <span className="gap-title">Distribution by Subject</span>
          </div>
          
          <div className="donut-container" style={{ height: '200px' }}>
            {distributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b' }}>No data</div>
            )}
            {distributionData.length > 0 && (
              <div className="donut-center-text">
                <span className="donut-val">{totalDonutValue}</span>
                <span className="donut-sub">Total</span>
              </div>
            )}
          </div>

          <div className="donut-legend">
            {distributionData.map((item, i) => (
              <div className="legend-item" key={i}>
                <div className="legend-left">
                  <div className={`legend-dot`} style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="legend-val">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Gap Summary */}
        <div className="gap-card">
          <div className="gap-header">
            <span className="gap-title">Concept Gap Summary</span>
            {conceptGaps?.weaklyUnderstoodTopics?.length > 0 && (
              <span className="badge-attention">Attention Needed</span>
            )}
          </div>

          <div className="progress-list">
            {/* Weakly Understood Topics (Red/Blue) */}
            {conceptGaps?.weaklyUnderstoodTopics?.slice(0, 3).map((topic: any, idx: number) => (
              <div className="progress-item" key={topic.topicId}>
                <div className="progress-header">
                  <span className="progress-label">{topic.topicName}</span>
                  <span className={`progress-val ${idx === 0 ? 'red' : 'blue'}`}>{topic.averageScorePercentage}% Understanding</span>
                </div>
                <div className="progress-track">
                  <div className={`progress-fill ${idx === 0 ? 'red' : 'blue'}`} style={{ width: `${topic.averageScorePercentage}%` }}></div>
                </div>
              </div>
            ))}

            {/* Strongly Understood Topics (Green) */}
            {conceptGaps?.stronglyUnderstoodTopics?.slice(0, 1).map((topic: any) => (
              <div className="progress-item" key={topic.topicId}>
                <div className="progress-header">
                  <span className="progress-label">{topic.topicName}</span>
                  <span className="progress-val green">{topic.averageScorePercentage}% Understanding</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill green" style={{ width: `${topic.averageScorePercentage}%` }}></div>
                </div>
              </div>
            ))}

            {(!conceptGaps?.weaklyUnderstoodTopics?.length && !conceptGaps?.stronglyUnderstoodTopics?.length) && (
              <div style={{ color: '#64748b', fontSize: '14px', marginTop: '10px' }}>No concept gap data available.</div>
            )}
          </div>

          <button className="link-btn">
            View detailed gap report &rarr;
          </button>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="recent-sessions-card">
        <div className="table-header">
          <span className="table-title">Recent Sessions</span>
          <a href="#" className="table-link">View All</a>
        </div>
        
        <table className="table-container">
          <thead>
            <tr>
              <th>Session Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Attendance</th>
              <th>Avg Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentSessions.length > 0 ? recentSessions.map((session, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{session.sessionName}</td>
                <td>{session.subject}</td>
                <td>{new Date(session.date).toLocaleDateString()}</td>
                <td>{session.attendanceCount} / {session.totalStudents}</td>
                <td className={`score ${session.averageScore && session.averageScore > 80 ? 'green' : 'blue'}`}>
                  {session.averageScore !== null ? `${session.averageScore}%` : '-'}
                </td>
                <td>
                  <span className={`status-badge completed`}>
                    COMPLETED
                  </span>
                </td>
                <td>
                  <Eye className="action-icon" size={18} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No recent sessions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assigned Subjects Grid */}
      <h3 className="subjects-section-title">Assigned Subjects</h3>
      <div className="subjects-grid">
        
        {assignedSubjects.length > 0 ? assignedSubjects.map((subject, i) => {
          const colors = ['green', 'blue', 'red', 'green'];
          const colorClass = colors[i % colors.length];
          const icons = [BookOpen, Server, Settings, ShieldCheck];
          const Icon = icons[i % icons.length];
          
          return (
            <div className="subject-card" key={subject.id}>
              <div className={`subject-icon-box ${colorClass}`}>
                <Icon size={20} />
              </div>
              <span className="subject-name">{subject.subjectName}</span>
              <span className="subject-meta">{subject.subjectCode} | Dept: {subject.department}</span>
              <div className="subject-footer">
                <span className="subject-badge">{subject.totalSessionsCreated} Sessions</span>
                <a href="#" className="subject-link">View Subject</a>
              </div>
            </div>
          );
        }) : (
          <div style={{ color: '#64748b', gridColumn: '1 / -1' }}>No subjects assigned.</div>
        )}

      </div>

    </div>
  );
}
