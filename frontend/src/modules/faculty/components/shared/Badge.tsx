import React from 'react';
import styles from '../../styles/faculty.module.css';

interface BadgeProps {
  status: 'Critical' | 'Warning' | 'On Track' | 'Completed' | 'Live' | 'Scheduled';
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  let badgeClass = styles.badge;
  
  if (status === 'Critical' || status === 'Live') {
    badgeClass += ` ${styles.badgeCritical}`;
  } else if (status === 'Warning' || status === 'Scheduled') {
    badgeClass += ` ${styles.badgeWarning}`;
  } else {
    badgeClass += ` ${styles.badgeSuccess}`;
  }

  return (
    <span className={badgeClass}>{status}</span>
  );
};
