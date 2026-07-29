"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Info,
  Download,
  Calendar,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  ArrowLeft,
  Users
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
  LineChart, Line, Legend
} from 'recharts';
import styles from './concept-gap-analysis.module.css';

export default function ConceptGapAnalysisPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any>(null);
  const [insightsData, setInsightsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [subjectId, setSubjectId] = useState('');
  
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (subjectId) queryParams.append('courseId', subjectId);
      
      const qs = queryParams.toString();
      
      const [dashRes, trendRes, insRes] = await Promise.all([
        fetch(`/api/faculty/analytics/concept-gap?${qs}`),
        fetch(`/api/faculty/analytics/concept-gap/trend?${qs}`),
        fetch(`/api/faculty/analytics/concept-gap/insights?${qs}`)
      ]);
      
      if (dashRes.ok && trendRes.ok && insRes.ok) {
        const dashJson = await dashRes.json();
        const trendJson = await trendRes.json();
        const insJson = await insRes.json();
        
        setDashboardData(dashJson.data);
        setTrendData(trendJson.data);
        setInsightsData(insJson.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [subjectId]);

  const handleExportCSV = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (subjectId) queryParams.append('courseId', subjectId);
      const url = `/api/faculty/analytics/concept-gap/export?${queryParams.toString()}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to export CSV', err);
    }
  };

  const getRingColor = (pct: number) => {
    if (pct >= 70) return '#16A34A';
    if (pct >= 50) return '#F59E0B';
    return '#EF4444';
  };

  // Build line chart data
  // We need a uniform dataset where each object represents a date, and keys are concept names
  const lineChartData: any[] = [];
  if (trendData?.trends) {
    const dateSet = new Set<string>();
    trendData.trends.forEach((t: any) => t.dataPoints.forEach((dp: any) => dateSet.add(dp.date)));
    
    Array.from(dateSet).sort().forEach(date => {
      const obj: any = { date };
      trendData.trends.forEach((t: any) => {
        const dp = t.dataPoints.find((d: any) => d.date === date);
        if (dp) obj[t.conceptName] = dp.masteryPercentage;
      });
      lineChartData.push(obj);
    });
  }

  const lineColors = ['#16A34A', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'];

  return (
    <div className={`dashboard-scroll ${styles.container}`}>
      {/* Header & Filters */}
      <div className={styles.headerRow}>
        <div className={styles.titleSection}>
          <h1>Concept Gap Analysis</h1>
          <p>Identify learning gaps and track concept-wise performance.</p>
        </div>
        <div className={styles.filterSection}>
          <select 
            className={styles.filterInput}
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">All Subjects</option>
            {/* Real subjects could be fetched and mapped here */}
          </select>
          <button className={styles.applyButton} onClick={fetchAnalytics}>
            Apply Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #E7E3DB', borderTopColor: '#10633B', animation: 'spin 1s linear infinite' }} />
          <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
        </div>
      ) : !dashboardData ? (
        <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '12px' }}>
          <AlertCircle size={48} color="#D97706" style={{ margin: '0 auto 16px' }} />
          <h3>No Data Available</h3>
          <p>Complete at least one pulse session to view analytics.</p>
        </div>
      ) : (
        <>
          {/* Row 1: KPIs */}
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiInfo}>
                <div className={styles.kpiTitle}>Overall Class Mastery <Info size={14} color="#98A2B3" /></div>
                <div className={styles.kpiValue}>{dashboardData.overallClassMastery}%</div>
                <div className={styles.kpiSubtitle}>Average Mastery</div>
              </div>
              <div className={styles.kpiRingContainer}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E7E3DB" strokeWidth="6" />
                  <circle 
                    cx="30" cy="30" r="26" fill="none" stroke={getRingColor(dashboardData.overallClassMastery)} strokeWidth="6"
                    strokeDasharray={`${(dashboardData.overallClassMastery / 100) * 163.36} 163.36`}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className={styles.kpiRingText}>{dashboardData.overallClassMastery}%</span>
              </div>
            </div>
            
            <div className={styles.kpiCard}>
              <div className={styles.kpiInfo}>
                <div className={styles.kpiTitle}>Strong Concepts <Info size={14} color="#98A2B3" /></div>
                <div className={styles.kpiValue}>{dashboardData.strongConceptsCount}</div>
                <div className={styles.kpiSubtitle}>Concepts</div>
              </div>
              <div className={styles.kpiRingContainer}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E7E3DB" strokeWidth="6" />
                  <circle 
                    cx="30" cy="30" r="26" fill="none" stroke="#16A34A" strokeWidth="6"
                    strokeDasharray={`${(dashboardData.strongConceptsCount / Math.max(1, dashboardData.conceptMasteryOverview.length)) * 163.36} 163.36`}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiInfo}>
                <div className={styles.kpiTitle}>Needs Improvement <Info size={14} color="#98A2B3" /></div>
                <div className={styles.kpiValue}>{dashboardData.needsImprovementCount}</div>
                <div className={styles.kpiSubtitle}>Concepts</div>
              </div>
              <div className={styles.kpiRingContainer}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E7E3DB" strokeWidth="6" />
                  <circle 
                    cx="30" cy="30" r="26" fill="none" stroke="#F59E0B" strokeWidth="6"
                    strokeDasharray={`${(dashboardData.needsImprovementCount / Math.max(1, dashboardData.conceptMasteryOverview.length)) * 163.36} 163.36`}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiInfo}>
                <div className={styles.kpiTitle}>Critical Gaps <Info size={14} color="#98A2B3" /></div>
                <div className={styles.kpiValue}>{dashboardData.criticalGapsCount}</div>
                <div className={styles.kpiSubtitle}>Concepts</div>
              </div>
              <div className={styles.kpiRingContainer}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="#E7E3DB" strokeWidth="6" />
                  <circle 
                    cx="30" cy="30" r="26" fill="none" stroke="#EF4444" strokeWidth="6"
                    strokeDasharray={`${(dashboardData.criticalGapsCount / Math.max(1, dashboardData.conceptMasteryOverview.length)) * 163.36} 163.36`}
                    transform="rotate(-90 30 30)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2: Charts */}
          <div className={styles.splitGrid}>
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Concept Mastery Overview <Info size={14} color="#98A2B3" /></div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.8rem', color: '#667085' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '12px', height: '12px', background: '#16A34A', borderRadius: '2px' }}/> Strong (≥ 70%)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '12px', height: '12px', background: '#F59E0B', borderRadius: '2px' }}/> Needs Improvement (50-69%)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '12px', height: '12px', background: '#EF4444', borderRadius: '2px' }}/> Critical (&lt; 50%)</span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.conceptMasteryOverview} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E3DB" />
                    <XAxis dataKey="conceptName" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#667085' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#667085' }} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="masteryPercentage" radius={[4, 4, 0, 0]} maxBarSize={40}>
                      {dashboardData.conceptMasteryOverview.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={getRingColor(entry.masteryPercentage)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Performance Distribution <Info size={14} color="#98A2B3" /></div>
              <div className={styles.chartContainer} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '100%', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.studentPerformanceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {dashboardData.studentPerformanceDistribution.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div className={styles.doughnutCenterText}>
                      <span className={styles.doughnutValue}>{dashboardData.totalStudents}</span>
                      <span className={styles.doughnutLabel}>Students</span>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dashboardData.studentPerformanceDistribution.map((d: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#667085' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }} />
                        {d.category}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#17223B' }}>{d.count} <span style={{ color: '#98A2B3' }}>({d.percentage}%)</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Trend */}
          <div className={styles.chartCard} style={{ marginBottom: '24px' }}>
            <div className={styles.chartTitle}>Concept Mastery Trend <Info size={14} color="#98A2B3" /></div>
            <div className={styles.chartContainer} style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E3DB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#667085' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#667085' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#667085' }} />
                  {trendData?.trends.map((t: any, i: number) => (
                    <Line 
                      key={t.conceptName} 
                      type="monotone" 
                      dataKey={t.conceptName} 
                      stroke={lineColors[i % lineColors.length]} 
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 4: Insights */}
          <div className={styles.splitGrid} style={{ gridTemplateColumns: '1fr' }}>
            <div className={styles.insightsCard}>
              <div className={styles.chartTitle}>Top Insights</div>
              <div className={styles.insightsList}>
                {insightsData?.insights.map((insight: string, i: number) => {
                  let icon = <BrainCircuit size={18} />;
                  let iconClass = styles.blue;
                  
                  if (insight.includes('lowest') || insight.includes('struggling')) {
                    icon = <AlertCircle size={18} />;
                    iconClass = styles.red;
                  } else if (insight.includes('strong')) {
                    icon = <TrendingUp size={18} />;
                    iconClass = styles.green;
                  } else if (insight.includes('Overall')) {
                    icon = <Users size={18} />;
                    iconClass = styles.orange;
                  }

                  return (
                    <div key={i} className={styles.insightItem}>
                      <div className={`${styles.insightIcon} ${iconClass}`}>{icon}</div>
                      <div className={styles.insightContent}>
                        {insight}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.bottomActions}>
            <Link href="/faculty/pulse-sessions" className="btn btn-secondary">
              <ArrowLeft size={16} style={{ marginRight: '8px' }}/> Back to Pulse Sessions
            </Link>
            <div className={styles.actionRight}>
              <button className="btn btn-secondary" onClick={handleExportCSV}>
                <Download size={16} style={{ marginRight: '8px' }}/> Export CSV
              </button>
              <button className="btn btn-primary" style={{ display: 'none' }}>
                Download Full Report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
