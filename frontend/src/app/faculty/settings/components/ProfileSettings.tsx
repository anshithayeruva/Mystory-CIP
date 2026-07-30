import React from "react";
import { Info, Camera } from "lucide-react";
import styles from "../settings.module.css";

interface ProfileSettingsProps {
  formData: {
    profilePhoto: string;
    fullName: string;
    email: string;
    facultyId: string;
    department: string;
    designation: string;
    phone: string;
    officeRoom: string;
    officeHours: string;
    biography: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProfileSettings({ formData, onChange }: ProfileSettingsProps) {
  return (
    <div className={styles.contentBody}>
      {/* Profile Photo Area */}
      <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
        <label className={styles.formLabel}>Profile Photo</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {formData.profilePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={formData.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '2rem', color: '#64748b' }}>{formData.fullName.charAt(0)}</span>
            )}
          </div>
          <button type="button" className={styles.secondaryButton}>
            <Camera size={16} style={{ marginRight: '8px' }} />
            Change Photo
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Full Name *</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            className={styles.formInput} 
            required
          />
          {!formData.fullName && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>Full Name is required.</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Employee ID *</label>
          <input 
            type="text" 
            value={formData.facultyId}
            disabled
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Faculty Email *</label>
          <input 
            type="email" 
            value={formData.email}
            disabled
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Department</label>
          <input 
            type="text" 
            name="department"
            value={formData.department}
            onChange={onChange}
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Designation</label>
          <input 
            type="text" 
            name="designation"
            value={formData.designation}
            onChange={onChange}
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Office Room Number</label>
          <input 
            type="text" 
            name="officeRoom"
            value={formData.officeRoom}
            onChange={onChange}
            className={styles.formInput} 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Office Hours</label>
          <input 
            type="text" 
            name="officeHours"
            value={formData.officeHours}
            onChange={onChange}
            className={styles.formInput} 
            placeholder="e.g. Mon/Wed 2:00 PM - 4:00 PM"
          />
        </div>
        <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
          <label className={styles.formLabel}>Biography / About Me</label>
          <textarea 
            name="biography"
            value={formData.biography}
            onChange={onChange}
            className={styles.formInput} 
            style={{ resize: 'vertical', minHeight: '100px' }}
          />
        </div>
      </div>
      
      <div className={styles.infoAlert}>
        <Info size={16} />
        <span>Updating your Department or Designation will affect all generated reports across the system.</span>
      </div>
    </div>
  );
}
