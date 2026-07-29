"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  CheckCircle, 
  Activity, 
  Clock, 
  Copy,
  Download,
  Share2,
  AlertCircle
} from 'lucide-react';
import styles from './live-pulse.module.css';

interface LiveSessionPageProps {
  params: Promise<{ id: string }>;
}

export default function LiveSessionPage({ params }: LiveSessionPageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [ending, setEnding] = useState(false);

  const fetchLiveData = async () => {
    try {
      const res = await fetch(`/api/faculty/pulse-sessions/${id}/live`, { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        setSessionData(json.data);
      } else {
        const json = await res.json();
        if (res.status === 404 || res.status === 403) {
          setError(json.error || 'Failed to load session');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(() => {
      fetchLiveData();
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleEndSession = async () => {
    setEnding(true);
    try {
      const res = await fetch(`/api/faculty/pulse-sessions/${id}/close`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        router.push(`/faculty/pulse-sessions/${id}/summary`);
      } else {
        const json = await res.json();
        alert(json.error || 'Failed to end session');
        setEnding(false);
      }
    } catch (e) {
      console.error(e);
      alert('Network error while ending session.');
      setEnding(false);
    }
  };

  if (loading && !sessionData) {
    return (
      <div className={`dashboard-scroll ${styles.container}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3DB', borderTopColor: '#10633B', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#667085' }}>Connecting to Live Session...</p>
        </div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className={`dashboard-scroll ${styles.container}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <AlertCircle size={48} color="#D97706" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.25rem', color: '#17223B', marginBottom: '8px' }}>Session Unavailable</h2>
          <p style={{ color: '#667085', marginBottom: '24px' }}>{error || 'The requested session could not be found or you do not have permission to view it.'}</p>
          <Link href="/faculty/pulse-sessions" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Return to Pulse Sessions
          </Link>
        </div>
      </div>
    );
  }

  const { session, kpis, questionProgress, students } = sessionData;

  const elapsedTimeString = session.timerActualStartTime 
    ? Math.floor((Date.now() - new Date(session.timerActualStartTime).getTime()) / 60000)
    : 0;

  return (
    <div className={`dashboard-scroll ${styles.container}`}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div className="page-title-section">
          <div style={{ fontSize: '0.85rem', color: '#667085', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/faculty" style={{ color: 'inherit', textDecoration: 'none' }}>Faculty</Link> &gt; 
            <Link href="/faculty/pulse-sessions" style={{ color: 'inherit', textDecoration: 'none' }}>Pulse Sessions</Link> &gt; 
            <span style={{ color: '#17223B', fontWeight: 500 }}>Live Session</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="page-title" style={{ margin: 0 }}>{session.title}</h1>
            <div className={styles.badge} style={{ backgroundColor: '#EEF7F1', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#166534', animation: 'pulse 2s infinite' }}></div>
              LIVE
            </div>
          </div>
          <div className="page-tags" style={{ marginTop: '8px' }}>
            <span style={{ color: '#667085', fontSize: '0.9rem' }}>
              {session.courseName} • Elapsed Time: {elapsedTimeString} min • Code: <strong style={{ letterSpacing: '1px' }}>{session.sessionCode || 'N/A'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.blue}`}>
            <Users size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{kpis.studentsJoined}</div>
            <div className={styles.kpiLabel}>Students Joined</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.green}`}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{kpis.responsesSubmitted}</div>
            <div className={styles.kpiLabel}>Responses Submitted</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.purple}`}>
            <Activity size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{kpis.averageScore}%</div>
            <div className={styles.kpiLabel}>Average Score</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.orange}`}>
            <Clock size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{Math.max(0, session.durationMinutes - elapsedTimeString)}m</div>
            <div className={styles.kpiLabel}>Time Remaining</div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Live Student Table */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Live Participants</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Joined Time</th>
                  <th>Score</th>
                  <th>Time Taken</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? students.map((student: any) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: 500 }}>{student.studentName}</td>
                    <td>{student.rollNumber}</td>
                    <td>{new Date(student.joinedAt).toLocaleTimeString()}</td>
                    <td>{student.percentage !== null ? `${student.percentage}%` : '-'}</td>
                    <td>{student.timeTakenSeconds ? `${Math.floor(student.timeTakenSeconds / 60)}m ${student.timeTakenSeconds % 60}s` : '-'}</td>
                    <td>
                      <span className={`${styles.badge} ${student.hasAttempted ? styles.submitted : styles.joined}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#667085' }}>
                      Waiting for students to join...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Analytics Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Session Analytics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Participation Rate</span>
                <span className={styles.statValue}>{kpis.participationPercentage}%</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Students Remaining</span>
                <span className={styles.statValue}>{kpis.studentsRemaining}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#667085', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Question Progress</h4>
              
              {questionProgress.map((qp: any) => {
                const fillPercent = kpis.studentsJoined > 0 ? (qp.totalAnswers / kpis.studentsJoined) * 100 : 0;
                return (
                  <div key={qp.questionId} className={styles.questionItem}>
                    <div className={styles.questionHeader}>
                      <span style={{ fontWeight: 500 }}>Q{qp.questionNumber}</span>
                      <span style={{ color: '#667085' }}>{qp.totalAnswers} answers</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBarFill} style={{ width: `${fillPercent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Join Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Join Information</h3>
            <div className={styles.codeBox}>
              <div style={{ fontSize: '0.85rem', color: '#667085', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Session Code</div>
              <div className={styles.sessionCode}>{session.sessionCode || 'PENDING'}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <Copy size={16} />
              </button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <Download size={16} />
              </button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <Share2 size={16} />
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className={styles.stickyActionBar}>
        <div className={styles.actionLeft}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: '#667085', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Since</span>
            <span style={{ fontWeight: 600, color: '#17223B' }}>{new Date(session.timerActualStartTime || session.createdAt).toLocaleTimeString()}</span>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#E7E3DB' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: '#667085', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Participants</span>
            <span style={{ fontWeight: 600, color: '#17223B' }}>{kpis.studentsJoined} Active</span>
          </div>
        </div>
        <div className={styles.actionRight}>
          <button className="btn btn-secondary" style={{ padding: '10px 24px' }}>
            Pause Session
          </button>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px 24px', backgroundColor: '#DC2626', borderColor: '#DC2626' }}
            onClick={() => setShowEndDialog(true)}
          >
            End Session
          </button>
        </div>
      </div>

      {/* End Session Confirmation Dialog */}
      {showEndDialog && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#17223B' }}>End Session?</h3>
            <p style={{ color: '#667085', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to end this session? Students will no longer be able to submit answers. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowEndDialog(false)}
                disabled={ending}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
                onClick={handleEndSession}
                disabled={ending}
              >
                {ending ? 'Ending...' : 'End Session'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Global CSS for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
