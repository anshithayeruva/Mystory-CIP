"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  CheckCircle, 
  Activity, 
  Clock, 
  Download,
  Share2,
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Eye
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './summary-pulse.module.css';

interface SummaryPageProps {
  params: Promise<{ id: string }>;
}

export default function SessionSummaryPage({ params }: SummaryPageProps) {
  const { id } = React.use(params);
  
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const res = await fetch(`/api/faculty/pulse-sessions/${id}/summary`, { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          setSessionData(json.data);
        } else {
          const json = await res.json();
          setError(json.error || 'Failed to load session summary');
        }
      } catch (e) {
        console.error(e);
        setError('Network error while loading summary.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, [id]);

  if (loading) {
    return (
      <div className={`dashboard-scroll ${styles.container}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3DB', borderTopColor: '#10633B', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#667085' }}>Generating Session Summary...</p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className={`dashboard-scroll ${styles.container}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <AlertCircle size={48} color="#D97706" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.25rem', color: '#17223B', margin: '0 0 8px 0' }}>Summary Unavailable</h2>
          <p style={{ color: '#667085', margin: '0 0 24px 0' }}>{error}</p>
          <Link href="/faculty/pulse-sessions" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Return to Pulse Sessions
          </Link>
        </div>
      </div>
    );
  }

  const { session, kpis, questionProgress, students } = sessionData;

  // Compute Score Distribution for Doughnut Chart
  let needsRemedial = 0; // < 40%
  let reviewTopic = 0;   // 40% - 75%
  let excellent = 0;     // > 75%

  const studentsWithScore = students.filter((s: any) => s.hasAttempted);
  
  studentsWithScore.forEach((s: any) => {
    const p = s.percentage || 0;
    if (p < 40) needsRemedial++;
    else if (p <= 75) reviewTopic++;
    else excellent++;
  });

  const chartData = [
    { name: 'Needs Remedial (<40%)', value: needsRemedial, color: '#DC2626' },
    { name: 'Review Topic (40-75%)', value: reviewTopic, color: '#D97706' },
    { name: 'Excellent (>75%)', value: excellent, color: '#166534' },
  ].filter(d => d.value > 0);

  // Computed Insights
  let lowestQuestion: any = null;
  let lowestAccuracy = 100;
  
  questionProgress.forEach((qp: any) => {
    const accuracy = qp.totalAnswers > 0 ? (qp.correctAnswers / qp.totalAnswers) * 100 : 0;
    if (accuracy < lowestAccuracy) {
      lowestAccuracy = accuracy;
      lowestQuestion = qp;
    }
  });

  const durationMin = session.durationMinutes || 0;
  
  return (
    <div className={`dashboard-scroll ${styles.container}`}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div className="page-title-section">
          <div style={{ fontSize: '0.85rem', color: '#667085', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/faculty" style={{ color: 'inherit', textDecoration: 'none' }}>Faculty</Link> <ChevronRight size={14} /> 
            <Link href="/faculty/pulse-sessions" style={{ color: 'inherit', textDecoration: 'none' }}>Pulse Sessions</Link> <ChevronRight size={14} /> 
            <span style={{ color: '#17223B', fontWeight: 500 }}>Session Summary</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="page-title" style={{ margin: 0 }}>{session.title}</h1>
            <div className={`${styles.badge} ${styles.blue}`}>COMPLETED</div>
          </div>
          <div className="page-tags" style={{ marginTop: '8px' }}>
            <span style={{ color: '#667085', fontSize: '0.9rem' }}>
              Completed on {new Date(session.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={18} /> Download Report
          </button>
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
            <div className={styles.kpiLabel}>Enrolled</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.green}`}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{kpis.responsesSubmitted}</div>
            <div className={styles.kpiLabel}>Participated</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.teal}`}>
            <Activity size={24} />
          </div>
          <div>
            <div className={styles.kpiValue}>{kpis.participationPercentage}%</div>
            <div className={styles.kpiLabel}>Participation Rate</div>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.purple}`}>
            <TrendingUp size={24} />
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
            <div className={styles.kpiValue}>{durationMin}m</div>
            <div className={styles.kpiLabel}>Duration</div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Overview */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Session Overview</h3>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Subject</span>
                <span className={styles.overviewValue}>{session.courseName}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Status</span>
                <span className={styles.overviewValue}>{session.status}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Session Code</span>
                <span className={styles.overviewValue} style={{ fontFamily: 'monospace' }}>{session.sessionCode || 'N/A'}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.overviewLabel}>Total Questions</span>
                <span className={styles.overviewValue}>{session.questionCount}</span>
              </div>
            </div>
          </div>

          {/* Score Distribution Chart */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Score Distribution</h3>
            {chartData.length > 0 ? (
              <div style={{ height: '240px', width: '100%', display: 'flex', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any, name: any) => [`${value} Students`, name]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {chartData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: d.color }}></div>
                      <span style={{ fontSize: '0.85rem', color: '#667085' }}>{d.name}: <strong>{d.value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', color: '#667085' }}>No score data available.</div>
            )}
          </div>

          {/* Question Performance */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Question Performance</h3>
            <div style={{ marginTop: '16px' }}>
              {questionProgress.map((qp: any) => {
                const accuracy = qp.totalAnswers > 0 ? (qp.correctAnswers / qp.totalAnswers) * 100 : 0;
                let barClass = '';
                if (accuracy < 40) barClass = styles.danger;
                else if (accuracy <= 70) barClass = styles.warning;

                return (
                  <div key={qp.questionId} className={styles.questionItem}>
                    <div className={styles.questionHeader}>
                      <span style={{ fontWeight: 500, color: '#17223B' }}>Question {qp.questionNumber}</span>
                      <span style={{ color: '#667085', fontSize: '0.8rem' }}>Accuracy: <strong style={{ color: '#17223B' }}>{accuracy.toFixed(0)}%</strong> ({qp.correctAnswers}/{qp.totalAnswers})</span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div className={`${styles.progressBarFill} ${barClass}`} style={{ width: `${accuracy}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Insights */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}><BrainCircuit size={20} color="#10633B" /> Session Insights</h3>
            
            <div className={styles.insightBox}>
              <div className={styles.insightTitle}>Overall Performance</div>
              <div className={styles.insightDesc}>
                The class achieved an average score of <strong>{kpis.averageScore}%</strong> with a participation rate of <strong>{kpis.participationPercentage}%</strong>.
              </div>
            </div>

            {lowestQuestion && lowestAccuracy < 60 && (
              <div className={styles.insightBox} style={{ borderLeftColor: '#DC2626' }}>
                <div className={styles.insightTitle} style={{ color: '#DC2626' }}>Critical Concept Gap</div>
                <div className={styles.insightDesc}>
                  <strong>Question {lowestQuestion.questionNumber}</strong> had the lowest accuracy ({lowestAccuracy.toFixed(0)}%). It is highly recommended to reteach or review the concepts associated with this question.
                </div>
              </div>
            )}

            {needsRemedial > 0 && (
              <div className={styles.insightBox} style={{ borderLeftColor: '#D97706' }}>
                <div className={styles.insightTitle}>Students Requiring Attention</div>
                <div className={styles.insightDesc}>
                  <strong>{needsRemedial}</strong> students scored below 40% and may require remedial support or direct intervention.
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Full Width Table for Students */}
      <div className={styles.card} style={{ marginTop: '24px' }}>
        <h3 className={styles.cardTitle}>Students Requiring Attention</h3>
        <p style={{ color: '#667085', fontSize: '0.85rem', marginBottom: '16px' }}>Showing students who scored below 75% or missed the session.</p>
        
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Score</th>
                <th>Time Taken</th>
                <th>Recommendation</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.filter((s: any) => !s.hasAttempted || (s.percentage !== null && s.percentage <= 75)).length > 0 ? (
                students.filter((s: any) => !s.hasAttempted || (s.percentage !== null && s.percentage <= 75)).map((student: any) => {
                  
                  let rec = 'Review Topic';
                  let recClass = styles.yellow;
                  
                  if (!student.hasAttempted) {
                    rec = 'Missed Session';
                    recClass = styles.blue;
                  } else if (student.percentage < 40) {
                    rec = 'Needs Remedial';
                    recClass = styles.red;
                  }

                  return (
                    <tr key={student.id}>
                      <td style={{ fontWeight: 500 }}>{student.studentName}</td>
                      <td>{student.rollNumber}</td>
                      <td>{student.percentage !== null ? `${student.percentage}%` : '-'}</td>
                      <td>{student.timeTakenSeconds ? `${Math.floor(student.timeTakenSeconds / 60)}m ${student.timeTakenSeconds % 60}s` : '-'}</td>
                      <td>
                        <span className={`${styles.badge} ${recClass}`}>{rec}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Eye size={14} /> View Student
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#667085' }}>
                    Great job! No students scored below 75%.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className={styles.stickyActionBar}>
        <div className={styles.actionLeft}>
          <Link href="/faculty/pulse-sessions" className="btn btn-secondary">
            Back to Pulse Sessions
          </Link>
        </div>
        <div className={styles.actionRight}>
          <button className="btn btn-secondary">
            <Share2 size={18} style={{ marginRight: '8px' }} /> Share Report
          </button>
          <button className="btn btn-primary">
            <FileText size={18} style={{ marginRight: '8px' }} /> View Concept Gap Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
