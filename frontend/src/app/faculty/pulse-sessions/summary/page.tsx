'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, BarChart3, LineChart, TrendingUp, AlertTriangle } from 'lucide-react';
import commonStyles from '@/modules/faculty/styles/faculty.module.css';
import styles from '@/modules/faculty/styles/summary-pulse.module.css';

export default function SessionSummaryPage() {
  return (
    <div className={commonStyles.pageContainer}>
      {/* Page Header */}
      <div className={commonStyles.pageHeader} style={{ marginBottom: 32 }}>
        <div className={commonStyles.pageHeaderLeft}>
          <h1 className={commonStyles.pageTitle}>Session Summary</h1>
          <p className={commonStyles.pageSubtitle}>
            Tree Traversal Check (CS201) • Completed on 29 Jul 2026
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>
            <Download size={16} /> Export Report
          </button>
          <Link href="/faculty/pulse-sessions" style={{ textDecoration: 'none' }}>
            <button className={commonStyles.primaryButton} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} />
              <span>Return to Sessions</span>
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.layoutContainer}>
        
        {/* KPI Row */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Overall Attendance</div>
            <div className={styles.kpiValue}>93%</div>
            <div className={styles.kpiSub}><TrendingUp size={14} /> 42 of 45 Students</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Participation Rate</div>
            <div className={styles.kpiValue}>98%</div>
            <div className={styles.kpiSub}><TrendingUp size={14} /> High Engagement</div>
          </div>
          <div className={styles.kpiCard} style={{ borderLeftColor: '#F59E0B' }}>
            <div className={styles.kpiLabel}>Avg. Understanding</div>
            <div className={styles.kpiValue}>76%</div>
            <div className={styles.kpiSub} style={{ color: '#F59E0B' }}>Needs Review</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Completion</div>
            <div className={styles.kpiValue}>100%</div>
            <div className={styles.kpiSub}><TrendingUp size={14} /> 5 of 5 Questions</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>Overall Response Distribution</div>
            </div>
            <div className={styles.chartPlaceholder}>
              <BarChart3 size={48} strokeWidth={1.5} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Performance Distribution</div>
              <div style={{ fontSize: 14 }}>Most students scored between 60-80%</div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>Student Engagement Timeline</div>
            </div>
            <div className={styles.chartPlaceholder}>
              <LineChart size={48} strokeWidth={1.5} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Engagement Trend</div>
              <div style={{ fontSize: 14 }}>Slight drop in engagement during Question 4</div>
            </div>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className={styles.analysisGrid}>
          <div className={styles.analysisCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>Top Difficult Questions</div>
            </div>
            <div className={styles.questionList}>
              <div className={styles.questionItem}>
                <div className={styles.qNumber}>Q4</div>
                <div className={styles.qContent}>
                  <div className={styles.qText}>What data structure is typically used to implement level-order traversal (BFS)?</div>
                  <div className={styles.qStats}>Incorrectly answered by <span className={styles.qHighlight}>42%</span> of students</div>
                </div>
              </div>
              <div className={styles.questionItem}>
                <div className={styles.qNumber}>Q5</div>
                <div className={styles.qContent}>
                  <div className={styles.qText}>Explain the main difference between DFS and BFS in terms of memory usage.</div>
                  <div className={styles.qStats}>Incorrectly answered by <span className={styles.qHighlight}>35%</span> of students</div>
                </div>
              </div>
              <div className={styles.questionItem} style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className={styles.qNumber} style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>Q2</div>
                <div className={styles.qContent}>
                  <div className={styles.qText}>Which traversal method visits the root node first, then left, then right?</div>
                  <div className={styles.qStats}>Incorrectly answered by <span style={{ color: '#D97706', fontWeight: 600 }}>20%</span> of students</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.analysisCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>Concept Gap Overview</div>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: '#FEF2F2', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <AlertTriangle size={20} color="#DC2626" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#991B1B' }}>BFS Implementation Alert</div>
                <div style={{ fontSize: 13, color: '#B91C1C' }}>Significant conceptual gap identified in Breadth-First Search structures.</div>
              </div>
            </div>

            <div className={styles.gapList}>
              <div className={styles.gapItem}>
                <div className={styles.gapName}>BFS vs DFS Memory Usage</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.gapBarContainer}>
                    <div className={styles.gapBar} style={{ width: '45%' }}></div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', width: '30px' }}>45%</div>
                </div>
              </div>
              <div className={styles.gapItem}>
                <div className={styles.gapName}>Queue Data Structure</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.gapBarContainer}>
                    <div className={styles.gapBar} style={{ width: '60%' }}></div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', width: '30px' }}>60%</div>
                </div>
              </div>
              <div className={styles.gapItem}>
                <div className={styles.gapName}>Post-Order Traversal</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.gapBarContainer}>
                    <div className={styles.gapBar} style={{ width: '85%', backgroundColor: '#10B981' }}></div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', width: '30px' }}>85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
