"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, GraduationCap, FileText, Calendar, Activity, 
  Building2, Users, BookOpen, CheckCircle, BarChart, 
  List, Download, Info, X, FileSpreadsheet, FileJson
} from "lucide-react";
import styles from "./reports.module.css";

const reportsData = [
  { id: 1, name: "Institution Performance Report", desc: "Overall academic performance across the institution.", date: "Oct 12, 2023", icon: FileText },
  { id: 2, name: "Attendance Report", desc: "Student attendance and participation records.", date: "Oct 11, 2023", icon: Calendar },
  { id: 3, name: "Understanding Report", desc: "Student understanding and learning performance.", date: "Oct 10, 2023", icon: Activity },
  { id: 4, name: "Department Report", desc: "Department-wise academic performance.", date: "Oct 09, 2023", icon: Building2 },
  { id: 5, name: "Faculty Report", desc: "Faculty assessment and teaching performance.", date: "Oct 08, 2023", icon: Users },
  { id: 6, name: "Student Report", desc: "Individual student academic performance.", date: "Oct 07, 2023", icon: GraduationCap },
  { id: 7, name: "Subject Report", desc: "Subject-wise understanding and assessment results.", date: "Oct 06, 2023", icon: BookOpen },
  { id: 8, name: "Topic Mastery Report", desc: "Topic-wise mastery and learning progress.", date: "Oct 05, 2023", icon: CheckCircle },
  { id: 9, name: "Academic Score Report", desc: "Overall assessment scores and academic metrics.", date: "Oct 04, 2023", icon: BarChart },
  { id: 10, name: "CO/PO Report", desc: "Course Outcome and Program Outcome attainment.", date: "Oct 03, 2023", icon: List },
];

export default function ReportsAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Modal State
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const openDownloadModal = (report: any) => {
    setSelectedReport(report);
    setDownloadModalOpen(true);
    setSelectedFormat("pdf"); // Reset to default
  };

  const closeDownloadModal = () => {
    setDownloadModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          Dashboard &gt; <span>Reports & Analytics</span>
        </div>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Reports & Analytics</h1>
          <p className={styles.subtitle}>
            {activeTab === "overview" 
              ? "View institution-wide academic performance and assessment reports."
              : "Download institution reports for academic review, compliance, and record keeping."}
          </p>
        </div>
        <div className={styles.tabs}>
          <div 
            className={`${styles.tab} ${activeTab === "overview" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>
          <div 
            className={`${styles.tab} ${activeTab === "reports" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </div>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          <div className={styles.topRow}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Institutional Understanding Breakdown</div>
              <div className={styles.breakdownSection}>
                <div className={styles.breakdownBarContainer}>
                  <div className={styles.marker}>84%</div>
                  <div className={styles.markerPoint}></div>
                  <div className={styles.breakdownBar}>
                    <div className={styles.barRed}></div>
                    <div className={styles.barGrey}></div>
                    <div className={styles.barGreen}></div>
                    <div className={styles.barDarkGreen}></div>
                  </div>
                </div>
                <div className={styles.breakdownLabels}>
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <div className={styles.performanceLevel}>
                  Performance Level: <span>Excellent</span>
                </div>
              </div>
            </div>

            <div className={styles.metricsCol}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <TrendingUp size={20} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Overall Score</span>
                  <span className={styles.metricValue}>84%</span>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <GraduationCap size={20} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Students Assessed</span>
                  <span className={styles.metricValue}>12.4k</span>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <FileText size={20} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Assessments Conducted</span>
                  <span className={styles.metricValue}>1,240</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Learning Understanding Trend
              <div className={styles.legend}>
                <div className={styles.legendLine}></div> Understanding Score %
              </div>
            </div>
            <div className={styles.chartContainer}>
              <svg className={styles.chartSvg} viewBox="0 0 800 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#115e59" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#115e59" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 110 L 160 90 L 310 105 L 460 70 L 610 50 L 790 30 L 790 150 L 10 150 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M 10 110 L 160 90 L 310 105 L 460 70 L 610 50 L 790 30"
                  fill="none"
                  stroke="#115e59"
                  strokeWidth="2"
                />
                <circle cx="10" cy="110" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
                <circle cx="160" cy="90" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
                <circle cx="310" cy="105" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
                <circle cx="460" cy="70" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
                <circle cx="610" cy="50" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
                <circle cx="790" cy="30" r="4" fill="white" stroke="#115e59" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.chartXAxis}>
              <span>AUG</span>
              <span>SEP</span>
              <span>OCT</span>
              <span>NOV</span>
              <span>DEC</span>
              <span>CURRENT</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Department Performance Ranking</div>
            <div className={styles.rankingList}>
              <div className={styles.rankingItem}>
                <div className={styles.rankingHeader}>
                  <span>Computer Science</span>
                  <span>88%</span>
                </div>
                <div className={styles.rankingTrack}>
                  <div className={styles.rankingFill} style={{ width: "88%" }}></div>
                </div>
              </div>
              <div className={styles.rankingItem}>
                <div className={styles.rankingHeader}>
                  <span>Mathematics</span>
                  <span>82%</span>
                </div>
                <div className={styles.rankingTrack}>
                  <div className={styles.rankingFill} style={{ width: "82%" }}></div>
                </div>
              </div>
              <div className={styles.rankingItem}>
                <div className={styles.rankingHeader}>
                  <span>Engineering</span>
                  <span>74%</span>
                </div>
                <div className={styles.rankingTrack}>
                  <div className={styles.rankingFill} style={{ width: "74%" }}></div>
                </div>
              </div>
              <div className={styles.rankingItem}>
                <div className={styles.rankingHeader}>
                  <span>Management</span>
                  <span>68%</span>
                </div>
                <div className={styles.rankingTrack}>
                  <div className={`${styles.rankingFill} ${styles.grey}`} style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
            <div className={styles.cardTitle} style={{ padding: "16px 16px 0", marginBottom: "12px" }}>
              Subject Performance Matrix
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Avg Understanding</th>
                    <th>Assessments Conducted</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Algorithms</td>
                    <td className={styles.muted}>89%</td>
                    <td className={styles.muted}>45</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeOptimal}`}>
                        <span className={styles.badgeDot}></span> Optimal
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Database Systems</td>
                    <td className={styles.muted}>81%</td>
                    <td className={styles.muted}>32</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeStable}`}>
                        <span className={styles.badgeDot}></span> Stable
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Neural Networks</td>
                    <td className={styles.muted}>76%</td>
                    <td className={styles.muted}>28</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeNeedsReview}`}>
                        <span className={styles.badgeDot}></span> Needs Review
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
            <div className={styles.cardTitle} style={{ padding: "16px 16px 0", marginBottom: "12px" }}>
              Recent Assessments Log
              <Link href="#" className={styles.viewAll}>View All Assessments</Link>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Assessment Name</th>
                    <th>Department</th>
                    <th>Avg Score</th>
                    <th>Understanding</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data Structures Midterm</td>
                    <td className={styles.muted}>CS</td>
                    <td className={styles.muted}>78/100</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeExcellent}`} style={{ padding: "4px 8px", fontSize: "0.7rem", borderRadius: "4px" }}>
                        Excellent
                      </span>
                    </td>
                    <td className={styles.muted}>Oct 24, 2024</td>
                  </tr>
                  <tr>
                    <td>SQL Query Lab</td>
                    <td className={styles.muted}>CS</td>
                    <td className={styles.muted}>82/100</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeGood}`} style={{ padding: "4px 8px", fontSize: "0.7rem", borderRadius: "4px" }}>
                        Good
                      </span>
                    </td>
                    <td className={styles.muted}>Oct 22, 2024</td>
                  </tr>
                  <tr>
                    <td>AI Ethics Quiz</td>
                    <td className={styles.muted}>AI Lab</td>
                    <td className={styles.muted}>85/100</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeGood}`} style={{ padding: "4px 8px", fontSize: "0.7rem", borderRadius: "4px" }}>
                        Good
                      </span>
                    </td>
                    <td className={styles.muted}>Oct 20, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.reportsCard}>
            <div className={styles.reportsHeader}>
              <span className={styles.reportsTitle}>Available Reports</span>
              <span className={styles.totalBadge}>10 TOTAL FILES</span>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Description</th>
                    <th>Last Updated</th>
                    <th style={{ width: "80px", textAlign: "center" }}>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsData.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <div className={styles.reportNameContainer}>
                          <div className={styles.reportIconBox}>
                            <report.icon size={16} />
                          </div>
                          <span className={styles.reportName}>{report.name}</span>
                        </div>
                      </td>
                      <td className={styles.muted}>{report.desc}</td>
                      <td className={styles.muted}>{report.date}</td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <button 
                          className={styles.downloadButton} 
                          onClick={() => openDownloadModal(report)}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>
              <Info size={20} />
            </div>
            <div className={styles.infoContent}>
              <span className={styles.infoTitle}>Looking for a specific format?</span>
              <span className={styles.infoText}>
                All reports are exported in standardized PDF or Excel formats suitable for accreditation bodies like NAAC and NBA. If you require custom data views, please contact the system administrator.
              </span>
            </div>
          </div>
        </>
      )}

      {/* Download Modal */}
      {downloadModalOpen && selectedReport && (
        <div className={styles.modalOverlay} onClick={closeDownloadModal}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Download Report</span>
              <button className={styles.modalClose} onClick={closeDownloadModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalReportName}>{selectedReport.name}</div>
              
              <div>
                <div className={styles.formatSectionTitle}>CHOOSE FORMAT</div>
                <div className={styles.formatOptions}>
                  <div 
                    className={`${styles.formatOption} ${selectedFormat === 'pdf' ? styles.formatOptionSelected : ''}`}
                    onClick={() => setSelectedFormat('pdf')}
                  >
                    <div className={styles.radioCircle}>
                      {selectedFormat === 'pdf' && <div className={styles.radioInner} />}
                    </div>
                    <div className={`${styles.formatIcon} ${styles.iconPdf}`}>
                      <FileText size={20} />
                    </div>
                    <div className={styles.formatDetails}>
                      <span className={styles.formatName}>PDF Document</span>
                      <span className={styles.formatDesc}>Best for printing and sharing.</span>
                    </div>
                  </div>

                  <div 
                    className={`${styles.formatOption} ${selectedFormat === 'excel' ? styles.formatOptionSelected : ''}`}
                    onClick={() => setSelectedFormat('excel')}
                  >
                    <div className={styles.radioCircle}>
                      {selectedFormat === 'excel' && <div className={styles.radioInner} />}
                    </div>
                    <div className={`${styles.formatIcon} ${styles.iconExcel}`}>
                      <FileSpreadsheet size={20} />
                    </div>
                    <div className={styles.formatDetails}>
                      <span className={styles.formatName}>Excel Spreadsheet</span>
                      <span className={styles.formatDesc}>Best for data manipulation and pivot tables.</span>
                    </div>
                  </div>

                  <div 
                    className={`${styles.formatOption} ${selectedFormat === 'csv' ? styles.formatOptionSelected : ''}`}
                    onClick={() => setSelectedFormat('csv')}
                  >
                    <div className={styles.radioCircle}>
                      {selectedFormat === 'csv' && <div className={styles.radioInner} />}
                    </div>
                    <div className={`${styles.formatIcon} ${styles.iconCsv}`}>
                      <FileJson size={20} />
                    </div>
                    <div className={styles.formatDetails}>
                      <span className={styles.formatName}>CSV File</span>
                      <span className={styles.formatDesc}>Best for importing into other software systems.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalInfoBox}>
                <Info size={16} className={styles.modalInfoIcon} />
                <span>The latest available report will be generated and downloaded. This process may take a few seconds depending on the file size.</span>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={closeDownloadModal}>Cancel</button>
              <button className={styles.downloadConfirmBtn}>
                <Download size={16} /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
