import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import styles from '../../styles/faculty.module.css';
import { mockFacultyProfile } from '../../constants/mockData';

export const Topbar: React.FC = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.breadcrumb}>
        <span>Dashboard</span>
        <span>{'>'}</span>
        <span>Faculty</span>
        <span>{'>'}</span>
        <span className={styles.breadcrumbCurrent} style={{ color: '#10633B' }}>Faculty Dashboard</span>
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.topbarIcons}>
          <button className={styles.iconButton}>
            <Bell size={20} color="#4B5563" />
          </button>
          <button className={styles.iconButton}>
            <HelpCircle size={20} color="#4B5563" />
          </button>
        </div>

        <div className={styles.topbarDivider}></div>

        <div className={styles.facultyProfileBadge}>
          <div className={styles.profileInfo} style={{ textAlign: 'right' }}>
            <span className={styles.profileName}>{mockFacultyProfile.name}</span>
            <span className={styles.profileRole}>{mockFacultyProfile.designation}</span>
          </div>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aris&backgroundColor=e2e8f0" 
            alt="Profile Avatar" 
            className={styles.profileAvatarImage} 
          />
        </div>
      </div>
    </header>
  );
};
