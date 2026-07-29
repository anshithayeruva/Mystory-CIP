'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Square, BarChart3, Users, Clock, Activity } from 'lucide-react';
import commonStyles from '@/modules/faculty/styles/faculty.module.css';
import styles from '@/modules/faculty/styles/live-pulse.module.css';

export default function LivePulseSessionPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handleEndSession = () => {
    router.push('/faculty/pulse-sessions/summary');
  };

  const mockParticipants = [
    { id: 1, name: 'Alex Johnson', online: true },
    { id: 2, name: 'Sarah Williams', online: true },
    { id: 3, name: 'Michael Chen', online: true },
    { id: 4, name: 'Emily Davis', online: false },
    { id: 5, name: 'James Wilson', online: true },
    { id: 6, name: 'Jessica Taylor', online: true },
  ];

  const mockActivity = [
    { id: 1, text: 'Sarah Williams submitted answer for Q1', time: 'Just now' },
    { id: 2, text: 'Michael Chen joined the session', time: '1m ago' },
    { id: 3, text: 'Alex Johnson submitted answer for Q1', time: '2m ago' },
    { id: 4, text: 'Session started by Dr. Aris', time: '5m ago' },
  ];

  return (
    <div className={commonStyles.pageContainer} style={{ paddingBottom: 0 }}>
      {/* Live Header */}
      <div className={styles.liveHeader}>
        <div className={styles.liveHeaderLeft}>
          <div className={styles.liveBadge}>
            <div className={styles.pulseDot}></div>
            LIVE SESSION
          </div>
          <div className={styles.sessionTitle}>Tree Traversal Check (CS201)</div>
        </div>
        <div className={styles.liveHeaderRight}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}><Clock size={14} style={{ display: 'inline', marginRight: 4 }} /> Elapsed Time</span>
            <span className={styles.statValue}>{formatTime(timer)}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}><Users size={14} style={{ display: 'inline', marginRight: 4 }} /> Joined</span>
            <span className={styles.statValue}>42 / 45</span>
          </div>
        </div>
      </div>

      <div className={styles.layoutContainer}>
        {/* Main Stage */}
        <div className={styles.mainStage}>
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <div className={styles.questionNumber}>Question {currentQuestion}</div>
              <div className={styles.questionProgress}>{currentQuestion} of {totalQuestions}</div>
            </div>
            
            <div className={styles.questionText}>
              {currentQuestion === 1 && "What is the time complexity of searching for an element in a balanced binary search tree?"}
              {currentQuestion === 2 && "Which traversal method visits the root node first, then the left subtree, and finally the right subtree?"}
              {currentQuestion === 3 && "True or False: A post-order traversal of a binary search tree visits nodes in ascending order."}
              {currentQuestion === 4 && "What data structure is typically used to implement level-order traversal (BFS)?"}
              {currentQuestion === 5 && "Explain the main difference between DFS and BFS in terms of memory usage."}
            </div>

            {/* Chart Placeholder */}
            <div className={styles.chartPlaceholder}>
              <BarChart3 size={48} strokeWidth={1.5} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#4B5563' }}>Live Responses</div>
              <div style={{ fontSize: 14 }}>Waiting for students to answer...</div>
            </div>

            {/* Controls */}
            <div className={styles.controlsRow}>
              <button className={styles.btnDanger} onClick={handleEndSession}>
                <Square size={16} fill="currentColor" /> End Session
              </button>
              <div className={styles.navGroup}>
                <button className={styles.btnSecondary} onClick={handlePrev} disabled={currentQuestion === 1}>
                  <ArrowLeft size={16} /> Previous
                </button>
                <button className={styles.btnSecondary} onClick={handleNext} disabled={currentQuestion === totalQuestions}>
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          
          {/* Participant Panel */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>
              Students
              <span style={{ fontSize: 13, fontWeight: 600, color: '#10633B', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: 9999 }}>
                42 Online
              </span>
            </div>
            <div className={styles.participantList}>
              {mockParticipants.map((p) => (
                <div key={p.id} className={styles.participantItem}>
                  <div className={styles.avatar}>{p.name.charAt(0)}</div>
                  <div className={styles.participantName}>{p.name}</div>
                  <div className={`${styles.statusDot} ${p.online ? styles.statusOnline : styles.statusOffline}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>Recent Activity</div>
            <div className={styles.activityList}>
              {mockActivity.map((act) => (
                <div key={act.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Activity size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityText}>{act.text}</div>
                    <div className={styles.activityTime}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
