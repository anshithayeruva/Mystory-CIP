import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import styles from "../settings.module.css";
import { AdminSettingsService } from "../../../../services/admin.settings.service";

export default function AcademicTab() {
  const [data, setData] = useState({
    attendanceModel: "Activity Based (Auto-tracked)", minQuestionAttempt: 75, minSessionTime: 45, 
    allowLateSubmission: true, deviceVerification: false, passingPercentage: 40, defaultDuration: 120, 
    maxAttempts: 2, allowRetests: true, randomizeQuestions: true, marksPerQuestion: 1, 
    partialMarking: false, negativeMarking: false, difficultyBasedMarks: true, staffOverride: true,
    visScore: true, visCorrectAnswers: true, visExplanations: false, visClassAverage: false, visRank: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AdminSettingsService.getAcademic();
      if (res.data) setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await AdminSettingsService.updateAcademic(data);
      alert("Settings saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;
    if (type === 'number') finalValue = parseInt(value, 10);
    setData(prev => ({ ...prev, [name]: finalValue }));
  };

  if (loading) {
    return <div className={styles.tabContent}>Loading...</div>;
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Attendance Rules</div>
          <div className={styles.sectionDesc}>Define how student participation is tracked and verified across digital classroom environments.</div>
        </div>
        <div className={styles.sectionCard}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Attendance Model</label>
              <select className={styles.select} name="attendanceModel" value={data.attendanceModel} onChange={handleChange}>
                <option value="Activity Based (Auto-tracked)">Activity Based (Auto-tracked)</option>
                <option value="Manual (Staff)">Manual (Staff)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Minimum Question Attempt (%)</label>
              <input className={styles.input} type="number" name="minQuestionAttempt" value={data.minQuestionAttempt} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Minimum Session Time (Mins)</label>
              <input className={styles.input} type="number" name="minSessionTime" value={data.minSessionTime} onChange={handleChange} />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Allow Late Submission</div>
                <div className={styles.toggleDesc}>Enable grace periods for connectivity issues.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="allowLateSubmission" checked={data.allowLateSubmission} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Device Verification</div>
                <div className={styles.toggleDesc}>Enforce single-device sign-in during sessions.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="deviceVerification" checked={data.deviceVerification} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Assessment Rules</div>
          <div className={styles.sectionDesc}>Set global defaults for examinations and quizzes across the academic board.</div>
        </div>
        <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: "20px" }}>
            <div className={styles.formGrid} style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Passing Percentage</label>
                <div style={{ position: 'relative' }}>
                  <input className={styles.input} type="number" name="passingPercentage" value={data.passingPercentage} onChange={handleChange} style={{ width: '100%' }} />
                  <span style={{ position: 'absolute', right: 12, top: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}>%</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Default Duration</label>
                <div style={{ position: 'relative' }}>
                  <input className={styles.input} type="number" name="defaultDuration" value={data.defaultDuration} onChange={handleChange} style={{ width: '100%' }} />
                  <span style={{ position: 'absolute', right: 12, top: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}>min</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Max Attempts</label>
                <input className={styles.input} type="number" name="maxAttempts" value={data.maxAttempts} onChange={handleChange} />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <div className={styles.toggleTitle}>Allow Retests</div>
                  <div className={styles.toggleDesc}>Permit students to request a re-examination attempt.</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="allowRetests" checked={data.allowRetests} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.toggleRow}>
                <div className={styles.toggleInfo}>
                  <div className={styles.toggleTitle}>Randomize Questions</div>
                  <div className={styles.toggleDesc}>Shuffle question order for each individual student session.</div>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" name="randomizeQuestions" checked={data.randomizeQuestions} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Info size={14} /> Changes will apply to all future academic sessions immediately.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={styles.btnCancel} onClick={fetchData}>Discard Changes</button>
          <button className={styles.btnSave} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Evaluation Rules</div>
          <div className={styles.sectionDesc}>Configure point allocation, penalty logic, and administrative override capabilities.</div>
        </div>
        <div className={styles.sectionCard}>
          <div className={styles.formGroup} style={{ maxWidth: '50%' }}>
            <label className={styles.label}>Marks per Question (Base)</label>
            <input className={styles.input} type="number" name="marksPerQuestion" value={data.marksPerQuestion} onChange={handleChange} />
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.toggleRow} style={{ borderBottom: 'none', padding: '12px 0 0' }}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Partial Marking</div>
                <div className={styles.toggleDesc}>Award marks for partially correct multiple-choice answers.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="partialMarking" checked={data.partialMarking} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.toggleRow} style={{ borderBottom: 'none', padding: '12px 0 0' }}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Negative Marking</div>
                <div className={styles.toggleDesc}>Deduct points for incorrect responses.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="negativeMarking" checked={data.negativeMarking} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.toggleRow} style={{ borderBottom: 'none', padding: '12px 0 0' }}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Difficulty Based Marks</div>
                <div className={styles.toggleDesc}>Scale marks automatically based on question complexity.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="difficultyBasedMarks" checked={data.difficultyBasedMarks} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.toggleRow} style={{ borderBottom: 'none', padding: '12px 0 0' }}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>Staff Override</div>
                <div className={styles.toggleDesc}>Allow teachers to manually adjust finalized scores.</div>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" name="staffOverride" checked={data.staffOverride} onChange={handleChange} />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Student Result Visibility</div>
          <div className={styles.sectionDesc}>Control exactly what data is disclosed to students upon submission of their work.</div>
        </div>
        <div className={styles.sectionCard}>
          <label className={styles.checkboxRow}>
            <input type="checkbox" className={styles.customCheckbox} name="visScore" checked={data.visScore} onChange={handleChange} />
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Score</div>
              <div className={styles.toggleDesc}>Displays total achieved points vs maximum possible marks.</div>
            </div>
          </label>
          <label className={styles.checkboxRow}>
            <input type="checkbox" className={styles.customCheckbox} name="visCorrectAnswers" checked={data.visCorrectAnswers} onChange={handleChange} />
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Correct Answers</div>
              <div className={styles.toggleDesc}>Highlights which options were right for each attempted question.</div>
            </div>
          </label>
          <label className={styles.checkboxRow}>
            <input type="checkbox" className={styles.customCheckbox} name="visExplanations" checked={data.visExplanations} onChange={handleChange} />
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Explanations</div>
              <div className={styles.toggleDesc}>Show reasoning and metadata for correct/incorrect answers.</div>
            </div>
          </label>
          <label className={styles.checkboxRow}>
            <input type="checkbox" className={styles.customCheckbox} name="visClassAverage" checked={data.visClassAverage} onChange={handleChange} />
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Class Average</div>
              <div className={styles.toggleDesc}>Show anonymous comparison with overall cohort performance.</div>
            </div>
          </label>
          <label className={styles.checkboxRow}>
            <input type="checkbox" className={styles.customCheckbox} name="visRank" checked={data.visRank} onChange={handleChange} />
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Rank</div>
              <div className={styles.toggleDesc}>Displays student's percentile position in the classroom.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
