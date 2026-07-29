'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, Download, CheckCircle2 } from 'lucide-react';
import commonStyles from '@/modules/faculty/styles/faculty.module.css';
import styles from '@/modules/faculty/styles/create-pulse.module.css';

export default function CreatePulseSessionPage() {
  const router = useRouter();
  const [questionType, setQuestionType] = useState('MCQ');
  const [publishImmediately, setPublishImmediately] = useState(false);
  const [saveDraft, setSaveDraft] = useState(true);
  const [sessionCode, setSessionCode] = useState('Auto generated');

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSessionCode(code);
  };

  return (
    <div className={commonStyles.pageContainer} style={{ paddingBottom: 0 }}>
      {/* Page Header */}
      <div className={commonStyles.pageHeader} style={{ marginBottom: 40 }}>
        <div className={commonStyles.pageHeaderLeft}>
          <h1 className={commonStyles.pageTitle}>Create Pulse Session</h1>
          <p className={commonStyles.pageSubtitle}>
            Configure and launch a live pulse assessment for your class.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions" style={{ textDecoration: 'none' }}>
          <button className={styles.btnCancel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} />
            <span>View All Sessions</span>
          </button>
        </Link>
      </div>

      <div className={styles.layoutContainer}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          
          {/* SECTION 1 */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionNumber}>1</div>
              <div>
                <div className={styles.sectionTitle}>Session Information</div>
                <div className={styles.sectionDesc}>Basic details about this pulse session</div>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Name <span className={styles.required}>*</span></label>
                <input type="text" placeholder="e.g. Tree Traversal Check" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Select Subject</option>
                  <option value="CS201">CS201 - Data Structures</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Topic <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="" disabled style={{ backgroundColor: '#F9FAFB' }}>
                  <option value="" disabled>Select Topic</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Department <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Select Department</option>
                  <option value="CSE">CSE</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Program <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="">
                  <option value="" disabled>Select Program</option>
                  <option value="BTECH">B.Tech</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Semester <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="1">
                  <option value="1">Semester 1</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Section</label>
                <select className={styles.formSelect} defaultValue="A">
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Type <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="Mid-Class Check">
                  <option value="Mid-Class Check">Mid-Class Check</option>
                  <option value="End-Class Quiz">End-Class Quiz</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date <span className={styles.required}>*</span></label>
                <input type="date" defaultValue="2026-07-29" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Time <span className={styles.required}>*</span></label>
                <input type="time" defaultValue="10:00" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Duration <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="10">
                  <option value="5">5 Minutes</option>
                  <option value="10">10 Minutes</option>
                  <option value="15">15 Minutes</option>
                </select>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Duration should be between 5 to 60 minutes.</div>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionNumber}>2</div>
              <div>
                <div className={styles.sectionTitle}>Assessment Configuration</div>
                <div className={styles.sectionDesc}>Define the assessment parameters</div>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.formLabel} style={{ marginBottom: 8 }}>Question Type <span className={styles.required}>*</span></label>
                <div className={styles.radioCardsGrid}>
                  <div className={`${styles.radioCard} ${questionType === 'MCQ' ? styles.active : ''}`} onClick={() => setQuestionType('MCQ')}>
                    <div className={styles.radioCircle}>
                      <div className={styles.radioInner}></div>
                    </div>
                    {questionType === 'MCQ' && <CheckCircle2 size={18} color="#10633B" />}
                    <span className={styles.radioLabel}>MCQ</span>
                  </div>
                  <div className={`${styles.radioCard} ${questionType === 'TF' ? styles.active : ''}`} onClick={() => setQuestionType('TF')}>
                    <div className={styles.radioCircle}>
                      <div className={styles.radioInner}></div>
                    </div>
                    <span className={styles.radioLabel}>True / False</span>
                  </div>
                  <div className={`${styles.radioCard} ${questionType === 'SA' ? styles.active : ''}`} onClick={() => setQuestionType('SA')}>
                    <div className={styles.radioCircle}>
                      <div className={styles.radioInner}></div>
                    </div>
                    <span className={styles.radioLabel}>Short Answer</span>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Difficulty Level <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="Medium">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Number of Questions <span className={styles.required}>*</span></label>
                <input type="number" defaultValue="5" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Attendance Rule <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="Mandatory">
                  <option value="Mandatory">Mandatory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Result Visibility <span className={styles.required}>*</span></label>
                <select className={styles.formSelect} defaultValue="After">
                  <option value="After">After Session Ends</option>
                  <option value="Immediate">Immediate</option>
                </select>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Control when students can see their results.</div>
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionNumber}>3</div>
              <div>
                <div className={styles.sectionTitle}>Session Settings</div>
                <div className={styles.sectionDesc}>Additional settings and publishing options</div>
              </div>
            </div>

            <div className={styles.settingsGrid}>
              <div className={styles.settingsCard}>
                <div className={styles.settingsCardTitle}>Session Code</div>
                <div className={styles.codeBox}>
                  <input type="text" readOnly value={sessionCode} className={styles.codeInput} />
                  <button className={styles.iconButton} onClick={generateCode}>
                    <RefreshCw size={20} />
                  </button>
                </div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>A unique code generated for students to join.</div>
              </div>

              <div className={styles.settingsCard}>
                <div className={styles.settingsCardTitle}>QR Code</div>
                <div className={styles.qrPlaceholder}>
                  No QR generated
                </div>
                <button className={styles.downloadButton}>
                  <Download size={16} /> Download
                </button>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 12, textAlign: 'center' }}>
                  Students can scan this QR code to join.
                </div>
              </div>

              <div className={styles.settingsCard} style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
                <div className={styles.settingsCardTitle}>Publishing Options</div>
                
                <div className={styles.toggleRow}>
                  <div className={`${styles.toggleSwitch} ${publishImmediately ? styles.active : ''}`} onClick={() => { setPublishImmediately(!publishImmediately); setSaveDraft(publishImmediately); }}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                  <div className={styles.toggleContent}>
                    <div className={styles.toggleTitle}>Publish Immediately</div>
                    <div className={styles.toggleDesc}>Students can join as soon as the session is published.</div>
                  </div>
                </div>

                <div className={styles.toggleRow}>
                  <div className={`${styles.toggleSwitch} ${saveDraft ? styles.active : ''}`} onClick={() => { setSaveDraft(!saveDraft); setPublishImmediately(saveDraft); }}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                  <div className={styles.toggleContent}>
                    <div className={styles.toggleTitle}>Save as Draft</div>
                    <div className={styles.toggleDesc}>Save now and publish later.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Side Panel */}
        <div className={styles.sidePanel}>
          <div className={styles.sidePanelTitle}>What happens next?</div>
          <div className={styles.stepList}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Publish Session</div>
                <div className={styles.stepDesc}>Once published, students can see the session and join using the code or QR.</div>
              </div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Students Join</div>
                <div className={styles.stepDesc}>Students enter the session code or scan the QR to join.</div>
              </div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Start Session</div>
                <div className={styles.stepDesc}>You start the session when all students are ready.</div>
              </div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Live Assessment</div>
                <div className={styles.stepDesc}>Students answer questions in real-time.</div>
              </div>
            </div>
            <div className={styles.stepItem} style={{ '&::after': { display: 'none' } } as any}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Session Summary</div>
                <div className={styles.stepDesc}>View summary and concept gap analysis after completion.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className={styles.stickyFooter}>
        <div className={styles.footerNote}>
          Review the information above before publishing. You can save this session as a draft and continue editing later.
        </div>
        <div className={styles.footerActions}>
          <Link href="/faculty/pulse-sessions" style={{ textDecoration: 'none' }}>
            <button className={styles.btnCancel}>Cancel</button>
          </Link>
          <button className={styles.btnDraft}>Save Draft</button>
          <button className={commonStyles.primaryButton} onClick={() => router.push('/faculty/pulse-sessions/live')}>
            Publish Session
          </button>
        </div>
      </div>
    </div>
  );
}
