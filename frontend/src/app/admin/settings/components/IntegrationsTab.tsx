import React, { useState, useEffect } from "react";
import { Database, BookOpen, GraduationCap, Users, LayoutDashboard, Info, CheckCircle } from "lucide-react";
import styles from "../settings.module.css";
import { AdminSettingsService } from "../../../../services/admin.settings.service";

export default function IntegrationsTab() {
  const [data, setData] = useState({
    erpSystem: true, moodle: false, googleClassroom: true, microsoftTeams: true, canvas: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AdminSettingsService.getIntegrations();
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
      await AdminSettingsService.updateIntegrations(data);
      alert("Settings saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleIntegration = (key: keyof typeof data) => {
    setData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return <div className={styles.tabContent}>Loading...</div>;
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionCard} style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '12px 20px', borderBottom: '1px solid var(--surface-border)', backgroundColor: '#f8fafc', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Service</div>
          <div>Description</div>
          <div style={{ textAlign: 'center' }}>Status</div>
          <div style={{ textAlign: 'right' }}>Action</div>
        </div>
        
        <div className={styles.integrationList} style={{ padding: '0 20px' }}>
          {/* ERP System */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={styles.integrationIconBox}>
                <Database size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>ERP System</div>
                <div className={styles.integrationDesc}>Enterprise Resource Planning</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Centralized database for institutional resources and student financials.
            </div>
            <div className={styles.integrationStatus}>
              {data.erpSystem ? (
                <span className={`${styles.badge} ${styles.badgeConnected}`}>
                  <span className={styles.badgeDot}></span> Connected
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                  <span className={styles.badgeDot}></span> Not Connected
                </span>
              )}
            </div>
            <div className={styles.integrationAction}>
              <button 
                className={data.erpSystem ? styles.btnDisconnect : styles.btnConnect}
                onClick={() => toggleIntegration('erpSystem')}
              >
                {data.erpSystem ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          {/* Moodle */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.moodle}`}>
                <GraduationCap size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Moodle</div>
                <div className={styles.integrationDesc}>LMS Platform</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Sync course materials and student grades directly with your LMS.
            </div>
            <div className={styles.integrationStatus}>
              {data.moodle ? (
                <span className={`${styles.badge} ${styles.badgeConnected}`}>
                  <span className={styles.badgeDot}></span> Connected
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                  <span className={styles.badgeDot}></span> Not Connected
                </span>
              )}
            </div>
            <div className={styles.integrationAction}>
              <button 
                className={data.moodle ? styles.btnDisconnect : styles.btnConnect}
                onClick={() => toggleIntegration('moodle')}
              >
                {data.moodle ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          {/* Google Classroom */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.google}`}>
                <LayoutDashboard size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Google Classroom</div>
                <div className={styles.integrationDesc}>Education Suite</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Integration with Google Workspace for Education and assignments.
            </div>
            <div className={styles.integrationStatus}>
              {data.googleClassroom ? (
                <span className={`${styles.badge} ${styles.badgeConnected}`}>
                  <span className={styles.badgeDot}></span> Connected
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                  <span className={styles.badgeDot}></span> Not Connected
                </span>
              )}
            </div>
            <div className={styles.integrationAction}>
              <button 
                className={data.googleClassroom ? styles.btnDisconnect : styles.btnConnect}
                onClick={() => toggleIntegration('googleClassroom')}
              >
                {data.googleClassroom ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          {/* Microsoft Teams */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.teams}`}>
                <Users size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Microsoft Teams</div>
                <div className={styles.integrationDesc}>Collaboration Tool</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Enable real-time communication and virtual classroom links.
            </div>
            <div className={styles.integrationStatus}>
              {data.microsoftTeams ? (
                <span className={`${styles.badge} ${styles.badgeConnected}`}>
                  <span className={styles.badgeDot}></span> Connected
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                  <span className={styles.badgeDot}></span> Not Connected
                </span>
              )}
            </div>
            <div className={styles.integrationAction}>
              <button 
                className={data.microsoftTeams ? styles.btnDisconnect : styles.btnConnect}
                onClick={() => toggleIntegration('microsoftTeams')}
              >
                {data.microsoftTeams ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className={styles.integrationItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div className={`${styles.integrationIconBox} ${styles.canvas}`}>
                <BookOpen size={20} />
              </div>
              <div className={styles.integrationInfo}>
                <div className={styles.integrationTitle}>Canvas</div>
                <div className={styles.integrationDesc}>LMS Platform</div>
              </div>
            </div>
            <div style={{ flex: 2, fontSize: '0.75rem', color: 'var(--text-muted)', paddingRight: 20 }}>
              Comprehensive LMS integration for modern higher education workflows.
            </div>
            <div className={styles.integrationStatus}>
              {data.canvas ? (
                <span className={`${styles.badge} ${styles.badgeConnected}`}>
                  <span className={styles.badgeDot}></span> Connected
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotConnected}`}>
                  <span className={styles.badgeDot}></span> Not Connected
                </span>
              )}
            </div>
            <div className={styles.integrationAction}>
              <button 
                className={data.canvas ? styles.btnDisconnect : styles.btnConnect}
                onClick={() => toggleIntegration('canvas')}
              >
                {data.canvas ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          <Info size={16} /> Integration changes may take up to 30 minutes to propagate across all systems.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={styles.btnCancel} onClick={fetchData}>Cancel</button>
          <button className={styles.btnSave} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : <>Save Changes <CheckCircle size={14} style={{ marginLeft: 4 }} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
