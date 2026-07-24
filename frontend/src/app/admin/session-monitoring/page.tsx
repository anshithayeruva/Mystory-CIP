import React from 'react';
import { Download, Calendar, Activity, CheckCircle, Filter, ChevronLeft, ChevronRight, MousePointerClick, BarChart3 } from 'lucide-react';
import './session-monitoring.css';

export default function SessionMonitoringPage() {
  const sessions = [
    {
      subject: 'Data Structures & Algorithms',
      room: 'CS302 • Room 402B',
      facultyInitials: 'DA',
      facultyColor: 'blue',
      facultyName: 'Dr. Aris Thorne',
      section: 'Section A',
      status: 'LIVE',
      statusClass: 'live',
      time: '09:00 - 11:00',
    },
    {
      subject: 'Advanced Macroeconomics',
      room: 'EC401 • Main Hall',
      facultyInitials: 'MP',
      facultyColor: 'red',
      facultyName: 'Prof. Sarah Jenkins',
      section: 'Section D',
      status: 'SCHEDULED',
      statusClass: 'scheduled',
      time: '11:30 - 13:00',
    },
    {
      subject: 'Microbiology Fundamentals',
      room: 'BIO204 • Lab 01',
      facultyInitials: 'LM',
      facultyColor: 'green',
      facultyName: 'Dr. Lisa Muller',
      section: 'Section B',
      status: 'COMPLETED',
      statusClass: 'completed',
      time: '07:00 - 09:00',
    },
    {
      subject: 'Introduction to Ethics',
      room: 'PHI105 • Room 201',
      facultyInitials: 'RJ',
      facultyColor: 'blue',
      facultyName: 'Rev. John Davis',
      section: 'Section C',
      status: 'LIVE',
      statusClass: 'live',
      time: '09:30 - 11:30',
    },
    {
      subject: 'Digital Marketing Trends',
      room: 'MKT412 • Seminar B',
      facultyInitials: 'KE',
      facultyColor: 'orange',
      facultyName: 'Prof. Kevin Ellis',
      section: 'Section E',
      status: 'SCHEDULED',
      statusClass: 'scheduled',
      time: '14:00 - 15:30',
    },
  ];

  return (
    <div className="page-session-monitoring">
      <div className="page-header">
        <div className="title-section">
          <h1 className="page-title">Session Monitoring</h1>
          <p className="page-subtitle">Track ongoing, upcoming, and finalized academic sessions across all departments.</p>
        </div>
        <div className="header-actions">
          <div className="badge-live">
            <span className="dot-live"></span>
            Live: 14 Sessions
          </div>
          <button className="btn-export">
            <Download size={16} />
            Export List
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="card-label">SCHEDULED</span>
          <span className="card-value">22</span>
          <div className="card-subtext">
            <Calendar size={14} />
            Next in 15m
          </div>
        </div>
        <div className="summary-card live">
          <span className="card-label">LIVE NOW</span>
          <span className="card-value">14</span>
          <div className="card-subtext">
            <Activity size={14} />
            Active Rooms
          </div>
        </div>
        <div className="summary-card">
          <span className="card-label">COMPLETED</span>
          <span className="card-value">12</span>
          <div className="card-subtext">
            <CheckCircle size={14} />
            Sync pending: 2
          </div>
        </div>
      </div>

      <div className="table-controls">
        <div className="tabs">
          <button className="tab active">Scheduled</button>
          <button className="tab">Completed</button>
        </div>
        <div className="filters">
          <select className="filter-select">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Business</option>
          </select>
          <button className="btn-filter-icon">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>SUBJECT / COURSE</th>
              <th>FACULTY</th>
              <th>SECTION</th>
              <th>STATUS</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, idx) => (
              <tr key={idx}>
                <td>
                  <div className="subject-info">
                    <span className="subject-name">{session.subject}</span>
                    <span className="subject-room">{session.room}</span>
                  </div>
                </td>
                <td>
                  <div className="faculty-info">
                    <div className={`avatar-small ${session.facultyColor}`}>{session.facultyInitials}</div>
                    <span className="faculty-name">{session.facultyName}</span>
                  </div>
                </td>
                <td>
                  <span className="section-text">{session.section}</span>
                </td>
                <td>
                  <span className={`status-badge ${session.statusClass}`}>
                    {session.status === 'LIVE' && <span className="dot"></span>}
                    {session.status}
                  </span>
                </td>
                <td>
                  <span className="time-text">{session.time}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper">
          <div className="pagination">
            <button className="page-item" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="page-item active">1</button>
            <button className="page-item">2</button>
            <button className="page-item">3</button>
            <button className="page-item">4</button>
            <button className="page-item">5</button>
            <button className="page-item">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-panels">
        <div className="panel-empty">
          <div className="panel-empty-icon">
            <MousePointerClick size={24} />
          </div>
          <div>
            <h3>Select a Session</h3>
            <p>Click on any session in the table above to view detailed attendance metrics, room utilization, and faculty feedback logs.</p>
          </div>
        </div>
        <div className="panel-insight">
          <div>
            <div className="insight-header">
              <h3 className="insight-title">Monitoring Insight</h3>
              <span className="insight-sync">Live monitoring data synchronized.</span>
            </div>
            <p className="insight-text">
              Peak activity currently detected in the North Wing Academic Labs. Average occupancy is 82% across all 14 live sessions.
            </p>
          </div>
          <div className="insight-footer">
            <div>
              <div className="score-label">EFFICIENCY SCORE</div>
              <div className="score-value">94%</div>
            </div>
            <div className="insight-icon">
              <BarChart3 size={32} color="rgba(255,255,255,0.8)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
