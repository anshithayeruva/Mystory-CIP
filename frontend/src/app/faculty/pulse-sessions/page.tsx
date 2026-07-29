"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Calendar, 
  Radio, 
  Clock, 
  CheckCircle,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  QrCode,
  Hash,
  PlayCircle,
  StopCircle,
  Trash2,
  Activity
} from 'lucide-react';
import styles from './pulse-sessions.module.css';

// Mock Data
const MOCK_SESSIONS = [
  {
    id: '1',
    name: 'Mid-Class Understanding Check',
    subject: 'Data Structures (CS201)',
    type: 'Mid-Class Check',
    code: 'PULSE-X789',
    date: '2026-08-01',
    time: '10:30 AM',
    status: 'Live',
    participants: '45/60'
  },
  {
    id: '2',
    name: 'End of Class Summary Quiz',
    subject: 'Database Systems (CS305)',
    type: 'End-of-Class Check',
    code: 'PULSE-B442',
    date: '2026-08-01',
    time: '02:00 PM',
    status: 'Upcoming',
    participants: '0/55'
  },
  {
    id: '3',
    name: 'Previous Lecture Recap',
    subject: 'Data Structures (CS201)',
    type: 'Start-of-Class Check',
    code: 'PULSE-M121',
    date: '2026-07-28',
    time: '09:00 AM',
    status: 'Evaluated',
    participants: '58/60'
  },
  {
    id: '4',
    name: 'Quick Feedback Survey',
    subject: 'Web Development (CS401)',
    type: 'Feedback',
    code: 'PULSE-F993',
    date: '2026-07-25',
    time: '11:15 AM',
    status: 'Closed',
    participants: '42/45'
  },
  {
    id: '5',
    name: 'Draft Mid-Term Review',
    subject: 'Data Structures (CS201)',
    type: 'Review',
    code: 'PULSE-D334',
    date: '-',
    time: '-',
    status: 'Draft',
    participants: '-'
  }
];

export default function PulseSessionsPage() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [semester, setSemester] = useState('');

  const toggleMenu = (id: string) => {
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSubject('');
    setType('');
    setStatus('');
    setSemester('');
  };

  const getStatusBadge = (statusStr: string) => {
    switch (statusStr) {
      case 'Draft': return <span className={`${styles.badge} ${styles.badgeDraft}`}>Draft</span>;
      case 'Published': return <span className={`${styles.badge} ${styles.badgePublished}`}>Published</span>;
      case 'Live': return <span className={`${styles.badge} ${styles.badgeLive}`}><span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534', marginRight: '4px'}}></span> Live</span>;
      case 'Upcoming': return <span className={`${styles.badge} ${styles.badgePublished}`}>Upcoming</span>;
      case 'Closed': return <span className={`${styles.badge} ${styles.badgeClosed}`}>Closed</span>;
      case 'Evaluated': return <span className={`${styles.badge} ${styles.badgeEvaluated}`}>Evaluated</span>;
      case 'Archived': return <span className={`${styles.badge} ${styles.badgeArchived}`}>Archived</span>;
      default: return <span className={`${styles.badge} ${styles.badgeDraft}`}>{statusStr}</span>;
    }
  };

  return (
    <div className="dashboard-scroll" onClick={() => setActiveMenu(null)}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <div className="breadcrumb">
            Faculty &gt; Pulse Sessions
          </div>
          <h1 className="page-title" style={{ marginTop: '4px' }}>Pulse Sessions</h1>
          <div className="page-tags">
            <span style={{ color: '#667085', fontSize: '0.85rem' }}>
              Create, manage and monitor classroom pulse assessment sessions.
            </span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <PlusCircle size={18} /> Create Pulse Session
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          {/* Card 1: Total */}
          <div className={`${styles.kpiCard} ${styles.cardTotal}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconTotal}`}>
              <Calendar size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Total Sessions</div>
              <div className={styles.kpiValue}>124</div>
            </div>
          </div>

          {/* Card 2: Live */}
          <div className={`${styles.kpiCard} ${styles.cardLive}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconLive}`}>
              <Radio size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Live Sessions</div>
              <div className={styles.kpiValue}>1</div>
            </div>
          </div>

          {/* Card 3: Upcoming */}
          <div className={`${styles.kpiCard} ${styles.cardUpcoming}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconUpcoming}`}>
              <Clock size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Upcoming</div>
              <div className={styles.kpiValue}>3</div>
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className={`${styles.kpiCard} ${styles.cardCompleted}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconCompleted}`}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Completed</div>
              <div className={styles.kpiValue}>120</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={styles.filters}>
          <div className={styles.filterGroup} style={{ flex: 2 }}>
            <label>Search Session</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Subject</label>
            <select className={styles.select} value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">All Subjects</option>
              <option value="CS201">Data Structures (CS201)</option>
              <option value="CS305">Database Systems (CS305)</option>
              <option value="CS401">Web Development (CS401)</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Session Type</label>
            <select className={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Start-of-Class Check">Start-of-Class Check</option>
              <option value="Mid-Class Check">Mid-Class Check</option>
              <option value="End-of-Class Check">End-of-Class Check</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Live">Live</option>
              <option value="Closed">Closed</option>
              <option value="Evaluated">Evaluated</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Semester</label>
            <select className={styles.select} value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="">All Semesters</option>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <div>
            <button className="btn btn-secondary" style={{ height: '40px' }} onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Recent Pulse Sessions</span>
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Session Name</th>
                <th>Subject</th>
                <th>Session Type</th>
                <th>Session Code</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Participants</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id}>
                    <td style={{ fontWeight: 600 }}>{session.name}</td>
                    <td>{session.subject}</td>
                    <td>{session.type}</td>
                    <td style={{ fontFamily: 'monospace' }}>{session.code}</td>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                    <td>{getStatusBadge(session.status)}</td>
                    <td>{session.participants}</td>
                    <td>
                      <div className={styles.actionMenu}>
                        <button 
                          className={styles.actionButton} 
                          onClick={(e) => { e.stopPropagation(); toggleMenu(session.id); }}
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {activeMenu === session.id && (
                          <div className={styles.dropdownMenu}>
                            <button className={styles.dropdownItem}>
                              <Eye size={16} /> View
                            </button>
                            <button className={styles.dropdownItem}>
                              <Edit size={16} /> Edit
                            </button>
                            <button className={styles.dropdownItem}>
                              <Copy size={16} /> Duplicate
                            </button>
                            <button className={styles.dropdownItem}>
                              <QrCode size={16} /> Generate QR
                            </button>
                            <button className={styles.dropdownItem}>
                              <Hash size={16} /> Copy Session Code
                            </button>
                            
                            <div style={{ height: '1px', backgroundColor: '#E7E3DB', margin: '4px 0' }}></div>
                            
                            <button className={styles.dropdownItem} style={{ color: '#166534' }}>
                              <PlayCircle size={16} /> Start Session
                            </button>
                            <button className={styles.dropdownItem} style={{ color: '#d97706' }}>
                              <StopCircle size={16} /> Close Session
                            </button>
                            
                            <div style={{ height: '1px', backgroundColor: '#E7E3DB', margin: '4px 0' }}></div>
                            
                            <button className={`${styles.dropdownItem} ${styles.danger}`}>
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div className={styles.emptyState}>
                      <Activity size={48} className={styles.emptyStateIcon} />
                      <h3 className={styles.emptyStateTitle}>No Pulse Sessions Yet</h3>
                      <p className={styles.emptyStateDesc}>
                        Create your first classroom pulse session to begin collecting student understanding and live feedback.
                      </p>
                      <button className="btn btn-primary">
                        <PlusCircle size={18} /> Create Pulse Session
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {sessions.length > 0 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn}>Previous</button>
              <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
