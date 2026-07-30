"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Users, 
  CheckCircle2, 
  Play, 
  Pause, 
  Square,
  QrCode,
  Activity,
  Clock,
  MessageSquare
} from "lucide-react";
import styles from "./live.module.css";

export default function LivePulseSession() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(120); // 2 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndSession = () => {
    router.push(`/faculty/pulse-sessions/${sessionId}/summary`);
  };

  const students = [
    { id: 1, name: "Alice Johnson", roll: "CS-2024-001", joinedAt: "10:00 AM", attendance: "Present", status: "Responded" },
    { id: 2, name: "Bob Smith", roll: "CS-2024-002", joinedAt: "10:01 AM", attendance: "Present", status: "Thinking" },
    { id: 3, name: "Charlie Davis", roll: "CS-2024-003", joinedAt: "10:02 AM", attendance: "Present", status: "Responded" },
  ];

  const activityFeed = [
    { id: 1, text: "Charlie Davis submitted an answer.", time: "1 minute ago", type: "submit" },
    { id: 2, text: "Bob Smith joined the session.", time: "2 minutes ago", type: "join" },
    { id: 3, text: "Assessment started by Faculty.", time: "2 minutes ago", type: "start" },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Mid-Term Review Session</h1>
            <span className={styles.badgeLive}>
              <span className={styles.pulseDot} />
              LIVE
            </span>
          </div>
          <p className={styles.subtitle}>Subject: Data Structures & Algorithms • Code: 489-102</p>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.timeLabel}>Elapsed Time</p>
          <p className={styles.timeValue}>{formatTime(elapsedTime)}</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          
          <div className={styles.qrCodeRow}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <QrCode size={20} />
                Scan to Join
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div style={{ width: '150px', height: '150px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                  <QrCode size={100} color="#64748b" />
                </div>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                Join Code
              </div>
              <p className={styles.joinCodeText}>489 102</p>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Go to cip.university.edu/join</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Live Progress KPIs</div>
            <div className={styles.kpiGrid}>
              <div className={styles.kpiBox}>
                <span className={styles.kpiLabel}>Total Students</span>
                <span className={styles.kpiValue}>45</span>
              </div>
              <div className={styles.kpiBox}>
                <span className={styles.kpiLabel}>Joined</span>
                <span className={styles.kpiValue}>42</span>
              </div>
              <div className={styles.kpiBox}>
                <span className={styles.kpiLabel}>Attendance</span>
                <span className={`${styles.kpiValue} ${styles.kpiHighlight}`}>93%</span>
              </div>
              <div className={styles.kpiBox}>
                <span className={styles.kpiLabel}>Responses</span>
                <span className={styles.kpiValue}>28/42</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Live Student Status</div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Joined Time</th>
                    <th>Attendance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: 600 }}>{student.name}</td>
                      <td>{student.roll}</td>
                      <td>{student.joinedAt}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>
                          {student.attendance}
                        </span>
                      </td>
                      <td>
                        <span className={styles.statusBadge} style={{ backgroundColor: student.status === 'Responded' ? '#dcfce7' : '#fef9c3', color: student.status === 'Responded' ? '#166534' : '#854d0e' }}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Live Activity Feed</div>
            <div className={styles.feedList}>
              {activityFeed.map(feed => (
                <div key={feed.id} className={styles.feedItem}>
                  <div className={styles.feedIcon}>
                    {feed.type === 'submit' && <CheckCircle2 size={16} color="#16a34a" />}
                    {feed.type === 'join' && <Users size={16} color="#0284c7" />}
                    {feed.type === 'start' && <Play size={16} color="#10633B" />}
                  </div>
                  <div className={styles.feedContent}>
                    <span className={styles.feedText}>{feed.text}</span>
                    <span className={styles.feedTime}>{feed.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>Session Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Current Question</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Q3: What is the time complexity of QuickSort in the worst case?</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Session Progress</p>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '30%', height: '100%', backgroundColor: '#10633B' }} />
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>30% Completed (3/10)</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Time Remaining</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>13:00</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>Session Controls</div>
            <div className={styles.controlsBox}>
              <button 
                type="button" 
                className={styles.secondaryButton}
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                {isPaused ? "Resume Session" : "Pause Session"}
              </button>
              <button 
                type="button" 
                className={styles.dangerButton}
                onClick={handleEndSession}
              >
                <Square size={16} />
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
