'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Radio, Clock, CheckCircle2, Activity } from 'lucide-react';
import commonStyles from '@/modules/faculty/styles/faculty.module.css';
import styles from '@/modules/faculty/styles/pulse-sessions.module.css';

export default function PulseSessionsPage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [status, setStatus] = useState('');
  const [semester, setSemester] = useState('');

  // Mock sessions state, initially empty to match the wireframe
  const sessions: any[] = []; 

  const handleReset = () => {
    setSearch('');
    setSubject('');
    setSessionType('');
    setStatus('');
    setSemester('');
  };

  return (
    <div className={commonStyles.pageContainer}>
      {/* Breadcrumb */}
      <div className={commonStyles.breadcrumb} style={{ marginBottom: 24 }}>
        <span>Dashboard</span>
        <span>{'>'}</span>
        <span>Faculty</span>
        <span>{'>'}</span>
        <span className={commonStyles.breadcrumbCurrent} style={{ color: '#10633B' }}>Pulse Sessions</span>
      </div>

      {/* Page Header */}
      <div className={commonStyles.pageHeader}>
        <div className={commonStyles.pageHeaderLeft}>
          <h1 className={commonStyles.pageTitle}>Pulse Sessions</h1>
          <p className={commonStyles.pageSubtitle}>
            Create, manage and monitor classroom pulse assessment sessions.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions/create" style={{ textDecoration: 'none' }}>
          <button className={commonStyles.primaryButton}>
            <Plus size={18} />
            <span>Create Pulse Session</span>
          </button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={`${styles.statIconWrapper} ${styles.statIconGreen}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Total Sessions</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={`${styles.statIconWrapper} ${styles.statIconBlue}`}>
            <Radio size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Live Sessions</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardYellow}`}>
          <div className={`${styles.statIconWrapper} ${styles.statIconYellow}`}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Upcoming</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardPurple}`}>
          <div className={`${styles.statIconWrapper} ${styles.statIconPurple}`}>
            <CheckCircle2 size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Completed</span>
            <span className={styles.statValue}>0</span>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={commonStyles.filterCard}>
        <div className={styles.filterContainer} style={{ width: '100%' }}>
          <div className={`${styles.filterGroup} ${styles.filterSearch}`}>
            <label className={styles.filterLabel}>Search Session</label>
            <input 
              type="text" 
              placeholder="Search by name or code..." 
              className={styles.filterInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Subject</label>
            <select 
              className={styles.filterSelect}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="CS201">CS201</option>
              <option value="CS301">CS301</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Session Type</label>
            <select 
              className={styles.filterSelect}
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Lecture">Lecture</option>
              <option value="Lab">Lab</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select 
              className={styles.filterSelect}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Semester</label>
            <select 
              className={styles.filterSelect}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Sessions Table */}
      <div className={commonStyles.card} style={{ padding: 0 }}>
        <div className={commonStyles.cardHeader} style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid #E5E7EB' }}>
          <h2 className={commonStyles.cardTitle}>Recent Pulse Sessions</h2>
        </div>

        {sessions.length > 0 ? (
          <table className={commonStyles.table} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ padding: '16px 24px' }}>Session Name</th>
                <th style={{ padding: '16px 24px' }}>Subject</th>
                <th style={{ padding: '16px 24px' }}>Session Type</th>
                <th style={{ padding: '16px 24px' }}>Session Code</th>
                <th style={{ padding: '16px 24px' }}>Date</th>
                <th style={{ padding: '16px 24px' }}>Time</th>
                <th style={{ padding: '16px 24px' }}>Status</th>
                <th style={{ padding: '16px 24px' }}>Participants</th>
                <th style={{ padding: '16px 24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows would render here */}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyStateContainer}>
            <Activity size={48} className={styles.emptyStateIcon} strokeWidth={1.5} />
            <h3 className={styles.emptyStateTitle}>No Pulse Sessions Yet</h3>
            <p className={styles.emptyStateSubtitle}>
              Create your first classroom pulse session to begin collecting student understanding and live feedback.
            </p>
            <Link href="/faculty/pulse-sessions/create" style={{ textDecoration: 'none' }}>
              <button className={commonStyles.primaryButton}>
                <Plus size={18} />
                <span>Create Pulse Session</span>
              </button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
