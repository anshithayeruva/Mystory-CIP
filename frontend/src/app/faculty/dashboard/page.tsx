"use client";

import React from 'react';
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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- MOCK DATA ---

const distributionData = [
  { name: 'Algorithms', value: 45, color: '#10633B' },
  { name: 'OS', value: 30, color: '#059669' },
  { name: 'Databases', value: 25, color: '#064E3B' },
];

const recentSessions = [
  { id: 'ALG-CS401-B', subject: 'Advanced Algorithms', date: 'Oct 24, 2023', attendance: '54/62', score: '82%', status: 'LIVE', isLive: true },
  { id: 'DBS-CS302-A', subject: 'Database Systems', date: 'Oct 23, 2023', attendance: '58/60', score: '75%', status: 'COMPLETED', isLive: false },
  { id: 'OPS-CS305-C', subject: 'Operating Systems', date: 'Oct 22, 2023', attendance: '60/60', score: '88%', status: 'COMPLETED', isLive: false },
];

export default function FacultyDashboard() {
  return (
    <div className="dashboard-scroll">
      
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Faculty Dashboard</h1>
          <div className="page-tags">
            <span className="tag"><Settings size={14}/> Department: Computer Science Engineering</span>
            <span className="tag"><BookOpen size={14}/> Assigned Subjects: 04</span>
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
            <span className="kpi-value">124</span>
            <span className="kpi-badge kpi-badge-green">+12%</span>
          </div>
        </div>
        
        <div className="kpi-card">
          <span className="kpi-title">Active Sessions</span>
          <div className="kpi-value-row">
            <span className="kpi-value">02</span>
            <span className="kpi-indicator"></span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Completed</span>
          <div className="kpi-value-row">
            <span className="kpi-value">118</span>
            <span className="kpi-subtitle">Total</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Assigned Subjects</span>
          <div className="kpi-value-row">
            <span className="kpi-value">04</span>
            <BookOpen size={20} color="#64748b" />
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Attendance Rate</span>
          <div className="kpi-value-row">
            <span className="kpi-value">92.4%</span>
            <span className="kpi-subtitle" style={{ fontSize: '0.65rem' }}>Above<br/>Avg</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Understanding</span>
          <div className="kpi-value-row">
            <span className="kpi-value">78%</span>
            <span className="kpi-subtitle" style={{ fontSize: '0.65rem', color: '#2563eb' }}>Moderate</span>
          </div>
        </div>
      </div>



      {/* Live Session Card */}
      <div className="live-session-card">
        <div className="live-left">
          <div className="live-badge-row">
            <span className="badge-live">LIVE</span>
            <span className="live-time">Active for 17m</span>
          </div>
          
          <h2 className="live-title">Advanced Algorithms (CS401-B)</h2>
          <p className="live-topic">
            Topic: Graph Traversals - Depth First Search (DFS) vs Breadth First Search (BFS) performance benchmarks.
          </p>

          <div className="live-stats">
            <div className="live-stat-group">
              <span className="live-stat-label">Remaining Time</span>
              <span className="live-stat-value green">42 : 09</span>
            </div>
            <div className="live-stat-group">
              <span className="live-stat-label" style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '24px' }}>Current Participants</span>
              <span className="live-stat-value" style={{ paddingLeft: '24px' }}>54 / 62</span>
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
          <span className="qr-text">Join: 402-192</span>
        </div>
      </div>

      {/* Gap Section */}
      <div className="gap-section">
        
        {/* Distribution Donut */}
        <div className="gap-card">
          <div className="gap-header">
            <span className="gap-title">Distribution by Subject</span>
          </div>
          
          <div className="donut-container" style={{ height: '200px' }}>
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
            <div className="donut-center-text">
              <span className="donut-val">124</span>
              <span className="donut-sub">Total</span>
            </div>
          </div>

          <div className="donut-legend">
            {distributionData.map((item, i) => (
              <div className="legend-item" key={i}>
                <div className="legend-left">
                  <div className={`legend-dot c${i+1}`}></div>
                  <span>{item.name}</span>
                </div>
                <span className="legend-val">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Gap Summary */}
        <div className="gap-card">
          <div className="gap-header">
            <span className="gap-title">Concept Gap Summary</span>
            <span className="badge-attention">Attention Needed</span>
          </div>

          <div className="progress-list">
            
            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Dynamic Programming</span>
                <span className="progress-val red">42% Understanding</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill red" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Process Synchronization</span>
                <span className="progress-val blue">58% Understanding</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill blue" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Transaction Isolation Levels</span>
                <span className="progress-val green">72% Understanding</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill green" style={{ width: '72%' }}></div>
              </div>
            </div>

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
              <th>Session ID</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Attendance</th>
              <th>Avg Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentSessions.map((session, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{session.id}</td>
                <td>{session.subject}</td>
                <td>{session.date}</td>
                <td>{session.attendance}</td>
                <td className={`score ${parseInt(session.score) > 80 ? 'green' : 'blue'}`}>{session.score}</td>
                <td>
                  <span className={`status-badge ${session.isLive ? 'live' : 'completed'}`}>
                    {session.status}
                  </span>
                </td>
                <td>
                  <Eye className="action-icon" size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assigned Subjects Grid */}
      <h3 className="subjects-section-title">Assigned Subjects</h3>
      <div className="subjects-grid">
        
        <div className="subject-card">
          <div className="subject-icon-box green">
            <BookOpen size={20} />
          </div>
          <span className="subject-name">Advanced Algorithms</span>
          <span className="subject-meta">CS401-B | 62 Students</span>
          <div className="subject-footer">
            <span className="subject-badge">32 Sessions</span>
            <a href="#" className="subject-link">View Subject</a>
          </div>
        </div>

        <div className="subject-card">
          <div className="subject-icon-box blue">
            <Server size={20} />
          </div>
          <span className="subject-name">Database Systems</span>
          <span className="subject-meta">CS302-A | 60 Students</span>
          <div className="subject-footer">
            <span className="subject-badge">28 Sessions</span>
            <a href="#" className="subject-link">View Subject</a>
          </div>
        </div>

        <div className="subject-card">
          <div className="subject-icon-box red">
            <Settings size={20} />
          </div>
          <span className="subject-name">Operating Systems</span>
          <span className="subject-meta">CS305-C | 60 Students</span>
          <div className="subject-footer">
            <span className="subject-badge">35 Sessions</span>
            <a href="#" className="subject-link">View Subject</a>
          </div>
        </div>

        <div className="subject-card">
          <div className="subject-icon-box green">
            <ShieldCheck size={20} />
          </div>
          <span className="subject-name">Network Security</span>
          <span className="subject-meta">CS405-D | 45 Students</span>
          <div className="subject-footer">
            <span className="subject-badge">20 Sessions</span>
            <a href="#" className="subject-link">View Subject</a>
          </div>
        </div>

      </div>

    </div>
  );
}
