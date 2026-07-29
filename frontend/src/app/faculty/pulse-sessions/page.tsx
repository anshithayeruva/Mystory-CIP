"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Activity,
  FileText,
  Download,
  Users
} from 'lucide-react';
import styles from './pulse-sessions.module.css';

export default function PulseSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total: 0, live: 0, upcoming: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeLiveSession, setActiveLiveSession] = useState<any | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [showStartDialog, setShowStartDialog] = useState<string | null>(null);
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [semester, setSemester] = useState('');

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/faculty/pulse-sessions/summary', { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        setSummary(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.append('page', page.toString());
      query.append('limit', '10');
      if (search) query.append('search', search);
      if (subject) query.append('courseId', subject);
      if (type) query.append('sessionType', type);
      if (status) query.append('status', status.toUpperCase());
      if (semester) query.append('semester', semester);

      const res = await fetch(`/api/faculty/pulse-sessions?${query.toString()}`, { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        setSessions(json.data?.sessions || []);
        setTotalPages(json.data?.pagination?.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, search, subject, type, status, semester]);

  const fetchActiveLiveSession = async () => {
    try {
      const res = await fetch('/api/faculty/pulse-sessions?status=LIVE&limit=1', { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.sessions && json.data.sessions.length > 0) {
          setActiveLiveSession(json.data.sessions[0]);
        } else {
          setActiveLiveSession(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchActiveLiveSession();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeLiveSession) {
      const startTime = new Date(activeLiveSession.timerActualStartTime || activeLiveSession.createdAt).getTime();
      interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const m = Math.floor(diff / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        setElapsedTime(`${m}:${s}`);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    }
  }, [activeLiveSession]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

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
    setPage(1);
  };

  const handleAction = async (id: string, action: string) => {
    try {
      if (action === 'DELETE') {
        if (!confirm('Are you sure you want to delete this session?')) return;
        await fetch(`/api/faculty/pulse-sessions/${id}`, { method: 'DELETE', credentials: 'include' });
      } else {
        await fetch(`/api/faculty/pulse-sessions/${id}/${action}`, { method: 'POST', credentials: 'include' });
      }
      if (action === 'start') {
        setShowStartDialog(null);
        router.push(`/faculty/pulse-sessions/${id}/live`);
        return;
      }
      if (action === 'end') {
        if (!confirm('End Session?')) return;
        router.push(`/faculty/pulse-sessions/${id}/summary`);
        return; // Redirecting, no need to refetch
      }
      fetchSessions();
      fetchSummary();
      setActiveMenu(null);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (statusStr: string) => {
    const s = statusStr?.toUpperCase() || 'DRAFT';
    switch (s) {
      case 'DRAFT': return <span className={`${styles.badge} ${styles.badgeDraft}`}>Draft</span>;
      case 'PUBLISHED': return <span className={`${styles.badge} ${styles.badgePublished}`}>Published</span>;
      case 'LIVE': return <span className={`${styles.badge} ${styles.badgeLive}`}><span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534', marginRight: '4px'}}></span> Live</span>;
      case 'UPCOMING': return <span className={`${styles.badge} ${styles.badgePublished}`}>Upcoming</span>;
      case 'CLOSED': return <span className={`${styles.badge} ${styles.badgeClosed}`}>Closed</span>;
      case 'EVALUATED': return <span className={`${styles.badge} ${styles.badgeEvaluated}`}>Evaluated</span>;
      case 'ARCHIVED': return <span className={`${styles.badge} ${styles.badgeArchived}`}>Archived</span>;
      default: return <span className={`${styles.badge} ${styles.badgeDraft}`}>{statusStr}</span>;
    }
  };

  const formatType = (t: string) => {
    if (!t) return 'Unknown';
    return t.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="dashboard-scroll" onClick={() => setActiveMenu(null)}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">

          <h1 className="page-title" style={{ marginTop: '4px' }}>Pulse Sessions</h1>
          <div className="page-tags">
            <span style={{ color: '#667085', fontSize: '0.85rem' }}>
              Create, manage and monitor classroom pulse assessment sessions.
            </span>
          </div>
        </div>
        <div className="page-actions">
          <Link href="/faculty/pulse-sessions/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <PlusCircle size={18} /> Create Pulse Session
          </Link>
        </div>
      </div>

      {activeLiveSession && (
        <div style={{
          backgroundColor: '#EEF7F1',
          border: '1px solid #166534',
          borderRadius: '12px',
          padding: '20px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#166534', animation: 'pulse 2s infinite' }}></div>
              <span style={{ color: '#166534', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Session In Progress</span>
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#17223B' }}>{activeLiveSession.title}</h3>
            <div style={{ display: 'flex', gap: '24px', color: '#667085', fontSize: '0.95rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> {activeLiveSession.participations?.length || 0} Students Joined</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Elapsed Time: {elapsedTime}</span>
            </div>
          </div>
          <Link href={`/faculty/pulse-sessions/${activeLiveSession.id}/live`} className="btn btn-primary" style={{ textDecoration: 'none', backgroundColor: '#10633B', padding: '12px 24px', fontSize: '1rem' }}>
            Monitor Session
          </Link>
        </div>
      )}

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
              <div className={styles.kpiValue}>{summary.total}</div>
            </div>
          </div>

          {/* Card 2: Live */}
          <div className={`${styles.kpiCard} ${styles.cardLive}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconLive}`}>
              <Radio size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Live Sessions</div>
              <div className={styles.kpiValue}>{summary.live}</div>
            </div>
          </div>

          {/* Card 3: Upcoming */}
          <div className={`${styles.kpiCard} ${styles.cardUpcoming}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconUpcoming}`}>
              <Clock size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Upcoming</div>
              <div className={styles.kpiValue}>{summary.upcoming}</div>
            </div>
          </div>

          {/* Card 4: Completed */}
          <div className={`${styles.kpiCard} ${styles.cardCompleted}`}>
            <div className={`${styles.kpiIconWrapper} ${styles.iconCompleted}`}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.kpiContent}>
              <div className={styles.kpiLabel}>Completed</div>
              <div className={styles.kpiValue}>{summary.completed}</div>
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
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className={styles.filterGroup}>
            <label>Subject</label>
            <select className={styles.select} value={subject} onChange={(e) => { setSubject(e.target.value); setPage(1); }}>
              <option value="">All Subjects</option>
              <option value="CS201">Data Structures (CS201)</option>
              <option value="CS305">Database Systems (CS305)</option>
              <option value="CS401">Web Development (CS401)</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Session Type</label>
            <select className={styles.select} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
              <option value="">All Types</option>
              <option value="START_OF_CLASS_CHECK">Start-of-Class Check</option>
              <option value="MID_CLASS_CHECK">Mid-Class Check</option>
              <option value="END_OF_CLASS_CHECK">End-of-Class Check</option>
              <option value="FEEDBACK">Feedback</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select className={styles.select} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="LIVE">Live</option>
              <option value="CLOSED">Closed</option>
              <option value="EVALUATED">Evaluated</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Semester</label>
            <select className={styles.select} value={semester} onChange={(e) => { setSemester(e.target.value); setPage(1); }}>
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
              {loading ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px' }}>Loading sessions...</td></tr>
              ) : sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id}>
                    <td style={{ fontWeight: 600 }}>{session.title}</td>
                    <td>{session.course?.name || 'Unknown Subject'}</td>
                    <td>{formatType(session.sessionType)}</td>
                    <td style={{ fontFamily: 'monospace' }}>{session.sessionCode || '-'}</td>
                    <td>{new Date(session.date).toLocaleDateString()}</td>
                    <td>{session.startTime}</td>
                    <td>{getStatusBadge(session.status)}</td>
                    <td>-</td>
                    <td>
                      {session.status === 'LIVE' ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <Link 
                            href={`/faculty/pulse-sessions/${session.id}/live`}
                            className="btn btn-primary"
                            style={{ textDecoration: 'none', backgroundColor: '#10633B', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '6px 12px' }}
                          >
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80', animation: 'pulse 2s infinite' }}></div>
                            Monitor Live
                          </Link>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleAction(session.id, 'end')}
                            style={{ fontSize: '0.85rem', padding: '6px 12px', color: '#DC2626', borderColor: '#DC2626' }}
                          >
                            End Session
                          </button>
                        </div>
                      ) : (
                        <div className={styles.actionMenu}>
                          <button 
                            className={styles.actionButton} 
                            onClick={(e) => { e.stopPropagation(); toggleMenu(session.id); }}
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {activeMenu === session.id && (
                            <div className={styles.dropdownMenu}>
                              {session.status === 'DRAFT' && (
                                <>
                                  <button className={styles.dropdownItem}>
                                    <Edit size={16} /> Edit
                                  </button>
                                  <button className={styles.dropdownItem}>
                                    <Copy size={16} /> Duplicate
                                  </button>
                                  <div style={{ height: '1px', backgroundColor: '#E7E3DB', margin: '4px 0' }}></div>
                                  <button className={styles.dropdownItem} onClick={() => handleAction(session.id, 'publish')}>
                                    <CheckCircle size={16} /> Publish
                                  </button>
                                  <button className={`${styles.dropdownItem} ${styles.danger}`} onClick={() => handleAction(session.id, 'DELETE')}>
                                    <Trash2 size={16} /> Delete
                                  </button>
                                </>
                              )}
                              
                              {session.status === 'PUBLISHED' && (
                                <>
                                  <button className={styles.dropdownItem}>
                                    <Eye size={16} /> View
                                  </button>
                                  <button className={styles.dropdownItem} onClick={() => handleAction(session.id, 'generate-qr')}>
                                    <QrCode size={16} /> Generate QR
                                  </button>
                                  <button className={styles.dropdownItem} onClick={() => handleAction(session.id, 'generate-code')}>
                                    <Hash size={16} /> Copy Session Code
                                  </button>
                                  <div style={{ height: '1px', backgroundColor: '#E7E3DB', margin: '4px 0' }}></div>
                                  <button className={styles.dropdownItem} style={{ color: '#166534' }} onClick={() => setShowStartDialog(session.id)}>
                                    <PlayCircle size={16} /> Start Session
                                  </button>
                                </>
                              )}
                              
                              {['CLOSED', 'COMPLETED', 'ARCHIVED'].includes(session.status) && (
                                <>
                                  <Link href={`/faculty/pulse-sessions/${session.id}/summary`} className={styles.dropdownItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Activity size={16} /> View Summary
                                  </Link>
                                  <button className={styles.dropdownItem}>
                                    <Download size={16} /> Download Report
                                  </button>
                                  <Link href={`/faculty/concept-gap-analysis`} className={styles.dropdownItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <FileText size={16} /> View Concept Gap Analysis
                                  </Link>
                                  <button className={styles.dropdownItem}>
                                    <Copy size={16} /> Duplicate Session
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}
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
                      <Link href="/faculty/pulse-sessions/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                        <PlusCircle size={18} /> Create Pulse Session
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {!loading && sessions.length > 0 && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn} 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={styles.pageBtn}
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Start Session Dialog */}
      {showStartDialog && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#17223B' }}>Start Session</h3>
            <p style={{ color: '#667085', marginBottom: '24px', lineHeight: '1.5' }}>
              Start this session now? Students will be able to join and submit answers.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowStartDialog(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: '#10633B', borderColor: '#10633B' }}
                onClick={() => handleAction(showStartDialog, 'start')}
              >
                Start Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
