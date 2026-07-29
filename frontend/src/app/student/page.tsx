'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  CheckCircle,
  LogOut,
  Radio,
  Clock,
} from 'lucide-react';
import styles from './student.module.css';

export default function StudentDashboard() {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    router.push('/signin');
  };

  return (
    <div className={styles.container}>
      {/* Student Top Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <GraduationCap size={22} />
          </div>
          <span className={styles.brandTitle}>Student Analytics Portal</span>
        </div>

        <div className={styles.userBadge}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Student User</div>
            <div className={styles.userRole}>Computer Science Dept</div>
          </div>
          <button onClick={handleSignOut} className={styles.signOutBtn}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.welcomeBanner}>
          <div>
            <h1 className={styles.welcomeTitle}>Welcome, Student!</h1>
            <p className={styles.welcomeSubtitle}>
              Semester 6 • Computer Science & Engineering • Batch 2023-2027
            </p>
          </div>
        </div>

        {/* Top 4 Metrics Cards */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div className={styles.metricValue}>94.2%</div>
              <div className={styles.metricLabel}>Overall Attendance</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <BookOpen size={24} />
            </div>
            <div>
              <div className={styles.metricValue}>6</div>
              <div className={styles.metricLabel}>Enrolled Courses</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <Radio size={24} />
            </div>
            <div>
              <div className={styles.metricValue}>2</div>
              <div className={styles.metricLabel}>Live Pulse Sessions</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <Award size={24} />
            </div>
            <div>
              <div className={styles.metricValue}>8.95</div>
              <div className={styles.metricLabel}>Current CGPA</div>
            </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className={styles.sectionsGrid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Radio size={20} color="#00522E" />
              Active & Upcoming Live Pulse Sessions
            </h2>

            <div className={styles.pulseItem}>
              <div>
                <div className={styles.pulseTitle}>CS601 - Advanced Data Structures</div>
                <div className={styles.pulseSubtext}>Prof. Alex Johnson • Live Feedback Active</div>
              </div>
              <button
                className={styles.joinBtn}
                onClick={() => alert('Demo Mode: Live Pulse session active.')}
              >
                Join Pulse
              </button>
            </div>

            <div className={styles.pulseItem}>
              <div>
                <div className={styles.pulseTitle}>CS603 - Database Management Systems</div>
                <div className={styles.pulseSubtext}>Dr. Sarah Smith • Starts in 45 minutes</div>
              </div>
              <span className={styles.pulseSubtext} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={14} /> Scheduled
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Calendar size={20} color="#00522E" />
              Recent Updates
            </h2>
            <p className={styles.pulseSubtext} style={{ marginBottom: 12 }}>
              • Internal Assessment 2 Timetable released.
            </p>
            <p className={styles.pulseSubtext} style={{ marginBottom: 12 }}>
              • Pulse session feedback for Machine Learning submitted successfully.
            </p>
            <p className={styles.pulseSubtext}>
              • Department attendance report updated for July 2026.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
