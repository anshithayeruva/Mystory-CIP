"use client";
import { apiClient } from '@/lib/apiClient';


import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefreshCw, Download, Book, Target, Clock, Hash, Activity, CheckCircle, Eye, AlignLeft, Calendar, AlertTriangle, Building, GraduationCap, Layers, Users } from 'lucide-react';
import styles from './create-pulse.module.css';

interface Subject {
  id: string;
  name: string;
  department: { id: string, name: string };
  program: { id: string, name: string } | null;
  units: {
    id: string;
    topics: { id: string, topicName: string }[];
  }[];
}

export default function CreatePulseSessionPage() {
  const router = useRouter();
  
  // Data State
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [profile, setProfile] = useState<any>(null);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    topicId: '',
    departmentId: '',
    programId: '',
    semester: 1,
    section: 'A',
    sessionType: 'MID_CLASS_CHECK',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    durationMinutes: 10,
    questionType: 'MCQ',
    difficultyLevel: 'MEDIUM',
    questionCount: 5,
    attendanceRule: 'ATTEMPT_REQUIRED',
    resultVisibility: 'STUDENTS_AFTER_SESSION',
  });

  const [sessionCode, setSessionCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, subjectsRes] = await Promise.all([
          apiClient.fetch('/api/faculty/profile', { credentials: 'include' }),
          apiClient.fetch('/api/faculty/subjects?limit=100', { credentials: 'include' })
        ]);
        
        if (profileRes.ok) {
          const profileJson = await profileRes.json();
          setProfile(profileJson.data);
          setFormData(prev => ({ ...prev, departmentId: profileJson.data.department?.id || '' }));
        }

        if (subjectsRes.ok) {
          const subjectsJson = await subjectsRes.json();
          setSubjects(subjectsJson.data?.subjects || []);
        }
      } catch (err) {
        console.error('Failed to fetch initial data', err);
        setError('Failed to load required data. Please refresh.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const selectedSubject = useMemo(() => 
    subjects.find(s => s.id === formData.courseId), 
  [subjects, formData.courseId]);

  const allTopics = useMemo(() => {
    if (!selectedSubject) return [];
    return selectedSubject.units.flatMap(u => u.topics) || [];
  }, [selectedSubject]);

  // Sync program when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setFormData(prev => ({
        ...prev,
        programId: selectedSubject.program?.id || prev.programId,
      }));
    }
  }, [selectedSubject]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateLocalCode = () => {
    const code = 'PULSE-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setSessionCode(code);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mysession_${code}`);
  };

  const validateForm = () => {
    if (!formData.title) return 'Session Name is required.';
    if (!formData.courseId) return 'Subject is required.';
    if (!formData.topicId) return 'Topic is required.';
    if (!formData.departmentId) return 'Department is required.';
    if (!formData.date) return 'Date is required.';
    if (!formData.startTime) return 'Start Time is required.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    setError('');

    try {
      // 1. Create Session
      const payload = { ...formData };
      
      const res = await apiClient.fetch('/api/faculty/pulse-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.message || 'Failed to create session');
      }

      const sessionData = await res.json();
      const newSessionId = sessionData.data.id;

      // 2. Generate Code if requested
      if (sessionCode) {
        await apiClient.fetch(`/api/faculty/pulse-sessions/${newSessionId}/generate-code`, {
          method: 'POST', credentials: 'include'
        });
        await apiClient.fetch(`/api/faculty/pulse-sessions/${newSessionId}/generate-qr`, {
          method: 'POST', credentials: 'include'
        });
      }

      // 3. Publish if requested (and not saving as pure draft)
      if (!asDraft && publishImmediately) {
        await apiClient.fetch(`/api/faculty/pulse-sessions/${newSessionId}/publish`, {
          method: 'POST', credentials: 'include'
        });
      }

      // 4. Redirect
      router.push('/faculty/pulse-sessions');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const missingFields = useMemo(() => {
    const missing = [];
    if (!formData.title) missing.push('Session Name');
    if (!formData.courseId) missing.push('Subject');
    if (!formData.topicId) missing.push('Topic');
    if (!formData.departmentId) missing.push('Department');
    if (!formData.date) missing.push('Date');
    if (!formData.startTime) missing.push('Start Time');
    return missing;
  }, [formData]);

  const isReady = missingFields.length === 0;

  if (loading) {
    return <div className={styles.container} style={{ alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <div className={`dashboard-scroll ${styles.container}`}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title" style={{ marginTop: '4px' }}>Create Pulse Session</h1>
          <div className="page-tags">
            <span style={{ color: '#667085', fontSize: '0.85rem' }}>
              Configure and launch a live pulse assessment for your class.
            </span>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => router.push('/faculty/pulse-sessions')}>
            &larr; View All Sessions
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
          {error}
        </div>
      )}

      <div className={styles.layout}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          
          {/* Section 1: Session Information */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.stepNumber}>1</div>
              <div>
                <h3 className={styles.cardTitle}>Session Information</h3>
                <p className={styles.cardSubtitle}>Basic details about this pulse session</p>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Name <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="e.g. Tree Traversal Check"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subject <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.courseId}
                  onChange={(e) => handleChange('courseId', e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Topic <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.topicId}
                  onChange={(e) => handleChange('topicId', e.target.value)}
                  disabled={!formData.courseId}
                >
                  <option value="">Select Topic</option>
                  {allTopics.map(t => <option key={t.id} value={t.id}>{t.topicName}</option>)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Department <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.departmentId}
                  onChange={(e) => handleChange('departmentId', e.target.value)}
                >
                  <option value="">Select Department</option>
                  {profile?.department && <option value={profile.department.id}>{profile.department.name}</option>}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Program <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.programId}
                  onChange={(e) => handleChange('programId', e.target.value)}
                >
                  <option value="">Select Program</option>
                  {selectedSubject?.program && <option value={selectedSubject.program.id}>{selectedSubject.program.name}</option>}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Semester <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.semester}
                  onChange={(e) => handleChange('semester', parseInt(e.target.value))}
                >
                  {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Section</label>
                <select 
                  className={styles.select}
                  value={formData.section}
                  onChange={(e) => handleChange('section', e.target.value)}
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Type <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.sessionType}
                  onChange={(e) => handleChange('sessionType', e.target.value)}
                >
                  <option value="MID_CLASS_CHECK">Mid-Class Check</option>
                  <option value="END_OF_CLASS_CHECK">End-of-Class Check</option>
                  <option value="WEEKLY_REVISION">Weekly Revision</option>
                  <option value="LAB_UNDERSTANDING_CHECK">Lab Assessment</option>
                  <option value="PLACEMENT_TRAINING_SESSION">Placement Practice</option>
                  <option value="TUTORIAL_SESSION">Tutorial Session</option>
                  <option value="REMEDIAL_SESSION">Remedial Session</option>
                  <option value="CONTEST_PREPARATION_SESSION">Contest Practice</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date <span className={styles.required}>*</span></label>
                <input 
                  type="date" 
                  className={styles.input} 
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Time <span className={styles.required}>*</span></label>
                <input 
                  type="time" 
                  className={styles.input} 
                  value={formData.startTime}
                  onChange={(e) => handleChange('startTime', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Duration <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.durationMinutes}
                  onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value))}
                >
                  <option value={5}>5 Minutes</option>
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={60}>60 Minutes</option>
                </select>
                <span className={styles.hintText}>Duration should be between 5 to 60 minutes.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Assessment Configuration */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <h3 className={styles.cardTitle}>Assessment Configuration</h3>
                <p className={styles.cardSubtitle}>Define the assessment parameters</p>
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
              <label className={styles.formLabel}>Question Type <span className={styles.required}>*</span></label>
              <div className={styles.radioGroup}>
                <div 
                  className={`${styles.radioCard} ${formData.questionType === 'MCQ' ? styles.active : ''}`}
                  onClick={() => handleChange('questionType', 'MCQ')}
                >
                  <div className={styles.radioCircle}></div>
                  <CheckCircle size={16} color={formData.questionType === 'MCQ' ? '#10633B' : '#667085'} />
                  <span>MCQ</span>
                </div>
                <div 
                  className={`${styles.radioCard} ${formData.questionType === 'TRUE_FALSE' ? styles.active : ''}`}
                  onClick={() => handleChange('questionType', 'TRUE_FALSE')}
                >
                  <div className={styles.radioCircle}></div>
                  <span>True / False</span>
                </div>
                <div 
                  className={`${styles.radioCard} ${formData.questionType === 'SHORT_ANSWER' ? styles.active : ''}`}
                  onClick={() => handleChange('questionType', 'SHORT_ANSWER')}
                >
                  <div className={styles.radioCircle}></div>
                  <span>Short Answer</span>
                </div>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Difficulty Level <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.difficultyLevel}
                  onChange={(e) => handleChange('difficultyLevel', e.target.value)}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                  <option value="MIXED">Mixed</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Number of Questions <span className={styles.required}>*</span></label>
                <input 
                  type="number" 
                  className={styles.input} 
                  min={1} 
                  max={50}
                  value={formData.questionCount}
                  onChange={(e) => handleChange('questionCount', parseInt(e.target.value))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Attendance Rule <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.attendanceRule}
                  onChange={(e) => handleChange('attendanceRule', e.target.value)}
                >
                  <option value="ATTEMPT_REQUIRED">Mandatory</option>
                  <option value="BOTH">Optional</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Result Visibility <span className={styles.required}>*</span></label>
                <select 
                  className={styles.select}
                  value={formData.resultVisibility}
                  onChange={(e) => handleChange('resultVisibility', e.target.value)}
                >
                  <option value="IMMEDIATE">Immediately</option>
                  <option value="STUDENTS_AFTER_SESSION">After Session Ends</option>
                  <option value="FACULTY_ONLY">Faculty Only</option>
                </select>
                <span className={styles.hintText}>Control when students can see their results.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Session Settings */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.stepNumber}>3</div>
              <div>
                <h3 className={styles.cardTitle}>Session Settings</h3>
                <p className={styles.cardSubtitle}>Additional settings and publishing options</p>
              </div>
            </div>

            <div className={styles.settingsGrid}>
              {/* Column 1 */}
              <div className={styles.settingsColumn}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Session Code</label>
                  <div className={styles.flexRow}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={sessionCode} 
                      placeholder="Auto generated"
                      disabled 
                      style={{ flex: 1, fontFamily: 'monospace', letterSpacing: '1px' }}
                    />
                    <button type="button" className={styles.iconButton} onClick={generateLocalCode} title="Generate Code">
                      <RefreshCw size={18} />
                    </button>
                  </div>
                  <span className={styles.hintText}>A unique code generated for students to join.</span>
                </div>
              </div>

              {/* Column 2 */}
              <div className={styles.settingsCard}>
                <h4 className={styles.settingsCardTitle}>QR Code</h4>
                <div className={styles.qrContainer}>
                  <div className={styles.qrBox}>
                    {qrCodeUrl ? (
                      <img src={qrCodeUrl} alt="QR Code" width={100} height={100} />
                    ) : (
                      <span style={{ color: '#ccc', fontSize: '12px' }}>No QR generated</span>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    disabled={!qrCodeUrl} 
                    style={{ width: '120px', justifyContent: 'center' }}
                  >
                    <Download size={16} /> Download
                  </button>
                  <span className={styles.hintText} style={{ textAlign: 'center', marginTop: '4px' }}>
                    Students can scan this QR code to join.
                  </span>
                </div>
              </div>

              {/* Column 3 */}
              <div className={styles.settingsCard}>
                <h4 className={styles.settingsCardTitle}>Publishing Options</h4>
                <div className={styles.toggleList}>
                  <div className={styles.toggleItem}>
                    <div className={styles.toggleRow}>
                      <div 
                        className={`${styles.toggleSwitch} ${publishImmediately ? styles.active : ''}`}
                        onClick={() => setPublishImmediately(true)}
                      >
                        <div className={styles.toggleKnob}></div>
                      </div>
                      Publish Immediately
                    </div>
                    <span className={styles.hintText}>Students can join as soon as the session is published.</span>
                  </div>
                  
                  <div className={styles.toggleDivider}></div>

                  <div className={styles.toggleItem}>
                    <div className={styles.toggleRow}>
                      <div 
                        className={`${styles.toggleSwitch} ${!publishImmediately ? styles.active : ''}`}
                        onClick={() => setPublishImmediately(false)}
                      >
                        <div className={styles.toggleKnob}></div>
                      </div>
                      Save as Draft
                    </div>
                    <span className={styles.hintText}>Save now and publish later.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

        {/* Right Sidebar */}
        <div className={styles.sideColumn}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>What happens next?</h3>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>1</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Publish Session</div>
                  <div className={styles.timelineDesc}>Once published, students can see the session and join using the code or QR.</div>
                </div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>2</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Students Join</div>
                  <div className={styles.timelineDesc}>Students enter the session code or scan the QR to join.</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>3</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Start Session</div>
                  <div className={styles.timelineDesc}>You start the session when all students are ready.</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>4</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Live Assessment</div>
                  <div className={styles.timelineDesc}>Students answer questions in real-time.</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>5</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Session Summary</div>
                  <div className={styles.timelineDesc}>View summary and concept gap analysis after completion.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className={styles.stickyActionBar}>
        <div className={styles.actionBarLeft}>
          <span className={styles.hintText} style={{ fontWeight: 600, color: '#475569' }}>
            Review the information above before publishing. You can save this session as a draft and continue editing later.
          </span>
        </div>
        <div className={styles.actionBarRight}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => router.push('/faculty/pulse-sessions')}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={(e) => handleSubmit(e, true)}
            disabled={saving}
          >
            Save Draft
          </button>
          <div style={{ position: 'relative' }} title={!isReady ? "Complete all required fields before publishing" : ""}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={saving || !isReady}
              onClick={(e) => {
                if (isReady) handleSubmit(e, false);
              }}
              style={!isReady ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              {saving ? 'Publishing...' : 'Publish Session'}
            </button>
          </div>
        </div>
      </div>
      
      {saving && (
        <div className={styles.loadingOverlay}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Activity size={32} color="#10633B" style={{ animation: 'pulse 1.5s infinite' }} />
            <h3 style={{ color: '#17223B' }}>Saving Pulse Session...</h3>
          </div>
        </div>
      )}
    </div>
  );
}
