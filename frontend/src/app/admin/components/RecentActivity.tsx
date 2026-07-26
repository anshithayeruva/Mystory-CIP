"use client";

import { UserPlus, BookOpen, Settings, BarChart2, FileText } from "lucide-react";
import styles from "../dashboard.module.css";
import Link from "next/link";

const activities = [
  {
    id: 1,
    title: "Dr. Sarah Wilson published a new assessment",
    meta: "Computer Science • 10 mins ago",
    icon: UserPlus,
    iconStyle: styles.iconGreen
  },
  {
    id: 2,
    title: "Computer Science department added two new subjects",
    meta: "Administration • 25 mins ago",
    icon: BookOpen,
    iconStyle: styles.iconBlue
  },
  {
    id: 3,
    title: "Semester configuration updated for Spring 2025",
    meta: "System • 1 hour ago",
    icon: Settings,
    iconStyle: styles.iconGray
  },
  {
    id: 4,
    title: "42 classroom sessions successfully conducted today",
    meta: "Academic Operations • 2 hours ago",
    icon: BarChart2,
    iconStyle: styles.iconGreen
  },
  {
    id: 5,
    title: "Institution annual report generated successfully",
    meta: "Reporting • 3 hours ago",
    icon: FileText,
    iconStyle: styles.iconRed
  }
];

export default function RecentActivity() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        <Link href="#" className={styles.viewAllLink}>View All</Link>
      </div>
      <div className={styles.activityList}>
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className={styles.activityItem}>
              <div className={`${styles.activityIcon} ${activity.iconStyle}`}>
                <Icon size={20} />
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  {/* Highlight specific parts like "Dr. Sarah Wilson" or numbers to match wireframe exactly would be nice, but simple text works based on wireframe structure. */}
                  {/* Example manual highlight just for visual parity */}
                  {activity.id === 1 ? <><span style={{fontWeight: 600}}>Dr. Sarah Wilson</span> published a new assessment</> : 
                   activity.id === 2 ? <>Computer Science department added <span style={{fontWeight: 600}}>two new subjects</span></> :
                   activity.id === 3 ? <>Semester configuration updated for <span style={{fontWeight: 600}}>Spring 2025</span></> :
                   activity.id === 4 ? <><span style={{fontWeight: 600}}>42 classroom sessions</span> successfully conducted today</> :
                   activity.title}
                </div>
                <div className={styles.activityMeta}>{activity.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
