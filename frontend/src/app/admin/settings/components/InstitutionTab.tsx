import React, { useState, useEffect } from "react";
import { Upload, Info, RotateCcw, Database, ArrowRight } from "lucide-react";
import styles from "../settings.module.css";
import Link from "next/link";
import { AdminSettingsService } from "../../../../services/admin.settings.service";

export default function InstitutionTab() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState({
    name: "", code: "", type: "", address: "", country: "", status: true,
    contactPerson: "", contactEmail: "", contactNumber: "", academicYear: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await AdminSettingsService.getInstitution();
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
      await AdminSettingsService.updateInstitution(data);
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
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!mounted || loading) {
    return <div className={styles.tabContent}>Loading...</div>;
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Institution Profile</div>
          <div className={styles.sectionDesc}>Public information and primary identifiers for your organization.</div>
        </div>
        <div className={styles.sectionCard} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: "20px" }}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                <label className={styles.label}>Institution Name</label>
                <input className={styles.input} type="text" name="name" value={data.name || ''} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Institution Code</label>
                <input className={styles.input} type="text" name="code" value={data.code || ''} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Institution Type</label>
                <select className={styles.select} name="type" value={data.type || ''} onChange={handleChange}>
                  <option value="K-12 Academy">K-12 Academy</option>
                  <option value="University">University</option>
                </select>
              </div>
              <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                <label className={styles.label}>Address</label>
                <textarea className={styles.input} style={{ resize: "none", height: "60px" }} name="address" value={data.address || ''} onChange={handleChange}></textarea>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Country</label>
                <select className={styles.select} name="country" value={data.country || ''} onChange={handleChange}>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <label className={styles.switch}>
                    <input type="checkbox" name="status" checked={data.status} onChange={handleChange} />
                    <span className={styles.slider}></span>
                  </label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{data.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Person</label>
                <input className={styles.input} type="text" name="contactPerson" value={data.contactPerson || ''} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Email</label>
                <input className={styles.input} type="email" name="contactEmail" value={data.contactEmail || ''} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Number</label>
                <input className={styles.input} type="text" name="contactNumber" value={data.contactNumber || ''} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Current Academic Year</label>
                <input className={styles.input} type="text" name="academicYear" value={data.academicYear || ''} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.btnCancel} onClick={fetchData}>Cancel</button>
            <button className={styles.btnSave} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </div>
      </div>

      <div className={styles.sectionGroup}>
        <div className={styles.sectionInfo}>
          <div className={styles.sectionTitle}>Branding</div>
          <div className={styles.sectionDesc}>Customize the visual appearance of your institution's portal and documents.</div>
        </div>
        <div className={styles.sectionCard}>
          <div className={styles.label}>Institution Logo</div>
          <div className={styles.logoUploadRow}>
            <div className={styles.logoUploadBox}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 24, height: 24, backgroundColor: '#064e3b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 'bold' }}>SAIA</span>
                </div>
              </div>
            </div>
            <div className={styles.logoUploadActions}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className={styles.btnUpload}>
                  <Upload size={14} /> Upload New Logo
                </button>
                <button className={styles.btnRemove}>Remove</button>
              </div>
              <div className={styles.logoHint}>
                Recommended size: 512x512px. Supported formats: PNG, JPG, or SVG (max 2MB).
              </div>
              <div className={styles.logoHint} style={{ color: '#064e3b', fontWeight: 600 }}>
                <Info size={12} />
                This logo will appear on all student transcripts and portal headers.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.quickActionGrid}>
        <div className={styles.quickActionCard}>
          <RotateCcw className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>Audit Log</div>
            <div className={styles.quickActionDesc}>View a comprehensive history of changes made to institution settings by all administrators.</div>
          </div>
          <Link href="#" className={styles.quickActionLink}>View Logs <ArrowRight size={14} /></Link>
        </div>
        <div className={styles.quickActionCard}>
          <Database className={styles.quickActionIcon} size={24} />
          <div>
            <div className={styles.quickActionTitle}>Data Management</div>
            <div className={styles.quickActionDesc}>Export your entire institutional data set or manage student record retention policies.</div>
          </div>
          <Link href="#" className={styles.quickActionLink}>Manage Data <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
