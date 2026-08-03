import React, { useState, useEffect } from "react";
import { Search, Download, ShieldCheck, Clock, Shield, RotateCcw } from "lucide-react";
import styles from "../settings.module.css";
import reportsStyles from "../../reports/reports.module.css";
import { AdminSettingsService } from "../../../../services/admin.settings.service";

export default function SecurityTab() {
  const [data, setData] = useState({
    pwdMinLength: 12, pwdRequireUppercase: true, pwdRequireNumbers: true, pwdRequireSpecial: true,
    sessionTimeoutMins: 30, autoLogout: true, concurrentLoginLimit: "3 Devices",
    twoFactorAuth: false, otpLogin: true
  });
  
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAuditLogs(1);
  }, []);

  const fetchData = async () => {
    try {
      const res = await AdminSettingsService.getSecurity();
      if (res.data) setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async (p: number) => {
    try {
      const res = await AdminSettingsService.getAuditLogs(p, 5);
      if (res.data) {
        setAuditLogs(res.data.data);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
        setTotalLogs(res.data.total);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await AdminSettingsService.updateSecurity(data);
      alert("Settings saved successfully!");
      fetchAuditLogs(1); // Refresh logs
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAuditLogs(newPage);
    }
  };

  if (loading) {
    return <div className={styles.tabContent}>Loading...</div>;
  }

  return (
    <div className={styles.tabContent}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* Password Policy */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#ecfdf5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#064e3b' }}>
              <ShieldCheck size={18} />
            </div>
            <div className={styles.sectionTitle}>Password Policy</div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Min Length</label>
            <input className={styles.input} type="number" name="pwdMinLength" value={data.pwdMinLength} onChange={handleChange} />
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Require Uppercase</span>
            <label className={styles.switch}>
              <input type="checkbox" name="pwdRequireUppercase" checked={data.pwdRequireUppercase} onChange={handleChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Require Numbers</span>
            <label className={styles.switch}>
              <input type="checkbox" name="pwdRequireNumbers" checked={data.pwdRequireNumbers} onChange={handleChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Special Characters</span>
            <label className={styles.switch}>
              <input type="checkbox" name="pwdRequireSpecial" checked={data.pwdRequireSpecial} onChange={handleChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* Session Management */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
              <Clock size={18} />
            </div>
            <div className={styles.sectionTitle}>Session Management</div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Timeout (Minutes)</label>
            <input className={styles.input} type="number" name="sessionTimeoutMins" value={data.sessionTimeoutMins} onChange={handleChange} />
          </div>
          <div className={styles.toggleRow} style={{ padding: '8px 0' }}>
            <span className={styles.toggleTitle} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Auto Logout</span>
            <label className={styles.switch}>
              <input type="checkbox" name="autoLogout" checked={data.autoLogout} onChange={handleChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.formGroup} style={{ marginTop: 8 }}>
            <label className={styles.label}>Concurrent Login Limit</label>
            <select className={styles.select} name="concurrentLoginLimit" value={data.concurrentLoginLimit} onChange={handleChange}>
              <option value="1 Device">1 Device</option>
              <option value="3 Devices">3 Devices</option>
              <option value="Unlimited">Unlimited</option>
            </select>
          </div>
        </div>

        {/* Authentication */}
        <div className={styles.sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: '#f0fdf4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
              <Shield size={18} />
            </div>
            <div className={styles.sectionTitle}>Authentication</div>
          </div>
          
          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>Two-Factor Auth (2FA)</div>
              <div className={styles.toggleDesc}>Add an extra layer of security via mobile app.</div>
            </div>
            <button 
              className={data.twoFactorAuth ? styles.btnCancel : styles.btnSave} 
              style={{ padding: '4px 10px', fontSize: '0.7rem' }}
              onClick={() => setData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
            >
              {data.twoFactorAuth ? 'Enabled' : 'Enable'}
            </button>
          </div>

          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitle}>OTP Login</div>
              <div className={styles.toggleDesc}>Require one-time password for every new login.</div>
            </div>
            <button 
              className={data.otpLogin ? styles.btnCancel : styles.btnSave} 
              style={{ padding: '4px 10px', fontSize: '0.7rem' }}
              onClick={() => setData(prev => ({ ...prev, otpLogin: !prev.otpLogin }))}
            >
              {data.otpLogin ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RotateCcw size={20} color="#064e3b" />
            <div className={styles.sectionTitle} style={{ fontSize: '1.05rem' }}>Audit Logs</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
              <input type="text" className={styles.input} placeholder="Filter logs..." style={{ paddingLeft: 32, width: 200 }} />
            </div>
            <button className={styles.btnCancel} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        
        <div className={reportsStyles.tableWrapper}>
          <table className={reportsStyles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length > 0 ? auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#3730a3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600 }}>
                        {log.user?.firstName?.[0]}{log.user?.lastName?.[0]}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{log.user?.firstName} {log.user?.lastName}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.action}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(log.createdAt).toLocaleDateString()} • {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem', color: '#475569' }}>
                      {log.ipAddress || 'Unknown'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                    No recent audit logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Showing {auditLogs.length} of {totalLogs} results</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={styles.btnCancel} style={{ padding: '4px 8px', fontSize: '0.75rem' }} disabled={page === 1} onClick={() => handlePageChange(page - 1)}>&lt;</button>
            <button className={styles.btnCancel} style={{ padding: '4px 8px', fontSize: '0.75rem' }} disabled={page === totalPages || totalPages === 0} onClick={() => handlePageChange(page + 1)}>&gt;</button>
          </div>
        </div>
      </div>
      
      <div className={styles.btnGroupPageLevel}>
        <button className={styles.btnCancel} onClick={fetchData}>Discard</button>
        <button className={styles.btnSave} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </div>
  );
}
