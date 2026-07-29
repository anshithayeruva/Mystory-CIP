"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, GraduationCap, FileText, Calendar, Activity, 
  Building2, Users, BookOpen, CheckCircle, BarChart, 
  List, Download, Info, X, FileSpreadsheet, FileJson,
  ChevronDown, Award, UserCheck, MoreVertical, Minus, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import styles from "./reports.module.css";

const reportsData = [
  { id: 1, name: "Institution Performance Report", desc: "Overall academic performance across the institution.", date: "Oct 12, 2023", icon: FileText },
  { id: 2, name: "Attendance Report", desc: "Student attendance and participation records.", date: "Oct 11, 2023", icon: Calendar },
  { id: 3, name: "Understanding Report", desc: "Student understanding and learning performance.", date: "Oct 10, 2023", icon: Activity },
  { id: 4, name: "Department Report", desc: "Department-wise academic performance.", date: "Oct 09, 2023", icon: Building2 },
  { id: 5, name: "Faculty Report", desc: "Faculty assessment and teaching performance.", date: "Oct 08, 2023", icon: Users },
  { id: 6, name: "Student Report", desc: "Individual student academic performance.", date: "Oct 07, 2023", icon: GraduationCap },
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
        <div className={styles.titleRow}>
          <div className={styles.titleArea}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <h1 className={styles.title} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)' }}>Reports & Analytics</h1>
            </div>
            <p className={styles.subtitle}>
              {activeTab === "overview" 
                ? "Gain institution-wide insights into academic performance, student understanding, attendance, and departmental health."
                : "Download institution reports for academic review, compliance, and record keeping."}
            </p>
          </div>
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
        <div className={styles.overviewContainer}>
          
          <div className={styles.topMetricsGrid}>
            <div className={styles.metricCardNew}>
              <div className={styles.metricHeaderNew}>
                <span className={styles.metricTitleNew}>Overall Understanding</span>
                <Award size={18} className={styles.metricIconNew} />
              </div>
              <div className={styles.metricValueRow}>
                <span className={styles.metricValueNew}>84%</span>
                <span className={styles.trendUp}><TrendingUp size={12}/> +2.4%</span>
              </div>
            </div>

            <div className={styles.metricCardNew}>
              <div className={styles.metricHeaderNew}>
                <span className={styles.metricTitleNew}>Students Assessed</span>
                <UserCheck size={18} className={styles.metricIconNew} />
              </div>
              <div className={styles.metricValueRow}>
                <span className={styles.metricValueNew}>12,480</span>
                <span className={styles.metricSubtext}>Total Population</span>
              </div>
            </div>

            <div className={styles.metricCardNew}>
              <div className={styles.metricHeaderNew}>
                <span className={styles.metricTitleNew}>Overall Attendance</span>
                <Calendar size={18} className={styles.metricIconNew} />
              </div>
              <div className={styles.metricValueRow}>
                <span className={styles.metricValueNew}>89%</span>
                <span className={styles.trendDown}><TrendingDown size={12}/> -0.8%</span>
              </div>
            </div>

            <div className={styles.metricCardNew}>
              <div className={styles.metricHeaderNew}>
                <span className={styles.metricTitleNew}>Departments</span>
                <Building2 size={18} className={styles.metricIconNew} />
              </div>
              <div className={styles.metricValueRow}>
                <span className={styles.metricValueNew}>18</span>
                <span className={styles.metricSubtext}>Active Faculties</span>
              </div>
            </div>
          </div>

          <div className={styles.chartsRow}>
            <div className={styles.chartPanel}>
              <div className={styles.chartPanelHeader}>
                <div className={styles.chartPanelTitle}>Learning Mastery Distribution</div>
                <div className={styles.chartPanelSub}>Breakdown of student proficiency levels across all assessments.</div>
              </div>
              
              <div className={styles.masteryList}>
                <div className={styles.masteryItem}>
                  <div className={styles.masteryTop}>
                    <span className={styles.masteryLabel} style={{color: "#005233"}}>Mastered</span>
                    <span className={styles.masteryStats}><strong>32%</strong> (3,994 Students)</span>
                  </div>
                  <div className={styles.masteryBarBg}>
                    <div className={styles.masteryBarFill} style={{width: "32%", backgroundColor: "#005233"}}></div>
                  </div>
                </div>

                <div className={styles.masteryItem}>
                  <div className={styles.masteryTop}>
                    <span className={styles.masteryLabel} style={{color: "#143155"}}>Proficient</span>
                    <span className={styles.masteryStats}><strong>42%</strong> (5,242 Students)</span>
                  </div>
                  <div className={styles.masteryBarBg}>
                    <div className={styles.masteryBarFill} style={{width: "42%", backgroundColor: "#143155"}}></div>
                  </div>
                </div>

                <div className={styles.masteryItem}>
                  <div className={styles.masteryTop}>
                    <span className={styles.masteryLabel} style={{color: "#2D476D"}}>Developing</span>
                    <span className={styles.masteryStats}><strong>18%</strong> (2,246 Students)</span>
                  </div>
                  <div className={styles.masteryBarBg}>
                    <div className={styles.masteryBarFill} style={{width: "18%", backgroundColor: "#2D476D"}}></div>
                  </div>
                </div>

                <div className={styles.masteryItem}>
                  <div className={styles.masteryTop}>
                    <span className={styles.masteryLabel} style={{color: "#C4C8C2"}}>Needs Support</span>
                    <span className={styles.masteryStats}><strong style={{color: "#C4C8C2"}}>8%</strong> (998 Students)</span>
                  </div>
                  <div className={styles.masteryBarBg}>
                    <div className={styles.masteryBarFill} style={{width: "8%", backgroundColor: "#C4C8C2"}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.chartPanel}>
              <div className={styles.chartPanelHeaderRow}>
                <div>
                  <div className={styles.chartPanelTitle}>Understanding Trend</div>
                  <div className={styles.chartPanelSub}>Institutional performance tracking from August to Current.</div>
                </div>
                <div className={styles.trendScore}>
                  <div className={styles.trendScoreVal}>84%</div>
                  <div className={styles.trendScoreSub}>Current Avg</div>
                </div>
              </div>
              
              <div className={styles.trendChartArea}>
                <svg className={styles.trendSvg} viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00522E" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00522E" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 160 C 150 160, 200 165, 300 150 C 400 120, 500 110, 600 105 C 700 100, 750 60, 790 20 L 790 200 L 10 200 Z"
                    fill="url(#trendGradient)"
                  />
                  <path
                    d="M 10 160 C 150 160, 200 165, 300 150 C 400 120, 500 110, 600 105 C 700 100, 750 60, 790 20"
                    fill="none"
                    stroke="#00522E"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={styles.trendXAxis}>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Current</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tablePanel}>
            <div className={styles.tablePanelHeader}>
              <div className={styles.chartPanelTitle}>Department Academic Performance</div>
              <div className={styles.chartPanelSub}>Comparative analysis of departmental outcomes and engagement metrics.</div>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.perfTable}>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Understanding</th>
                    <th>Attendance</th>
                    <th>Students</th>
                    <th>Overall Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdDept}>Computer Science</td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFill} style={{width: "91%"}}></div></div>
                        <span className={styles.miniBarVal}>91%</span>
                        <TrendingUp size={14} className={styles.iconGreen} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFill} style={{width: "93%"}}></div></div>
                        <span className={styles.miniBarVal}>93%</span>
                        <ArrowRight size={14} className={styles.iconGrey} />
                      </div>
                    </td>
                    <td>820</td>
                    <td><span className={styles.badgeExcellent}>Excellent</span></td>
                    <td className={styles.tdAction}><MoreVertical size={16}/></td>
                  </tr>
                  
                  <tr>
                    <td className={styles.tdDept}>Business Administration</td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillLight} style={{width: "88%"}}></div></div>
                        <span className={styles.miniBarVal}>88%</span>
                        <ArrowRight size={14} className={styles.iconGrey} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillLight} style={{width: "90%"}}></div></div>
                        <span className={styles.miniBarVal}>90%</span>
                        <TrendingUp size={14} className={styles.iconGreen} />
                      </div>
                    </td>
                    <td>540</td>
                    <td><span className={styles.badgeGood}>Good</span></td>
                    <td className={styles.tdAction}><MoreVertical size={16}/></td>
                  </tr>
                  
                  <tr>
                    <td className={styles.tdDept}>Mechanical Engineering</td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillLight} style={{width: "82%"}}></div></div>
                        <span className={styles.miniBarVal}>82%</span>
                        <TrendingDown size={14} className={styles.iconRed} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillLight} style={{width: "86%"}}></div></div>
                        <span className={styles.miniBarVal}>86%</span>
                        <ArrowRight size={14} className={styles.iconGrey} />
                      </div>
                    </td>
                    <td>610</td>
                    <td><span className={styles.badgeGood}>Good</span></td>
                    <td className={styles.tdAction}><MoreVertical size={16}/></td>
                  </tr>

                  <tr>
                    <td className={styles.tdDept}>Civil Engineering</td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillRed} style={{width: "74%"}}></div></div>
                        <span className={styles.miniBarVal}>74%</span>
                        <TrendingDown size={14} className={styles.iconRed} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFillLight} style={{width: "78%"}}></div></div>
                        <span className={styles.miniBarVal}>78%</span>
                        <ArrowRight size={14} className={styles.iconGrey} />
                      </div>
                    </td>
                    <td>430</td>
                    <td><span className={styles.badgeNeedsAttention}>Needs Attention</span></td>
                    <td className={styles.tdAction}><MoreVertical size={16}/></td>
                  </tr>

                  <tr>
                    <td className={styles.tdDept}>Electronics</td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFill} style={{width: "89%"}}></div></div>
                        <span className={styles.miniBarVal}>89%</span>
                        <TrendingUp size={14} className={styles.iconGreen} />
                      </div>
                    </td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.miniBarBg}><div className={styles.miniBarFill} style={{width: "91%"}}></div></div>
                        <span className={styles.miniBarVal}>91%</span>
                        <TrendingUp size={14} className={styles.iconGreen} />
                      </div>
                    </td>
                    <td>590</td>
                    <td><span className={styles.badgeExcellent}>Excellent</span></td>
                    <td className={styles.tdAction}><MoreVertical size={16}/></td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.tableFooter}>
                <span className={styles.footerText}>Showing 1 to 5 of 18 departments</span>
                <div className={styles.footerNav}>
                  <button className={styles.navBtn}><ChevronLeft size={16}/></button>
                  <button className={styles.navBtn}><ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
