"use client";

import { Calendar, Users, FileText, Settings, Video } from "lucide-react";
import styles from "../dashboard.module.css";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Mid-Term Examination for Computer Science",
    meta: "Academic Operations • Tomorrow, 10:00 AM",
    icon: FileText,
    iconStyle: styles.iconGreen
  },
  {
    id: 2,
    title: "Faculty Senate Meeting",
    meta: "Administration • Oct 15, 2:00 PM",
    icon: Users,
    iconStyle: styles.iconBlue
  },
  {
    id: 3,
    title: "System Maintenance & Upgrades",
    meta: "IT Department • Oct 18, 12:00 AM",
    icon: Settings,
    iconStyle: styles.iconGray
  },
  {
    id: 4,
    title: "Guest Lecture: Artificial Intelligence",
    meta: "Computer Science • Oct 20, 11:00 AM",
    icon: Video,
    iconStyle: styles.iconBlue
  },
  {
    id: 5,
    title: "Annual Budget Review Deadline",
    meta: "Finance • Oct 25, 5:00 PM",
    icon: Calendar,
    iconStyle: styles.iconGray
  }
];

export default function UpcomingEvents() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Upcoming Events</h3>
        <Link href="#" className={styles.viewAllLink}>View All</Link>
      </div>
      <div className={styles.activityList}>
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className={styles.activityItem}>
              <div className={`${styles.activityIcon} ${event.iconStyle}`}>
                <Icon size={20} />
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  {event.title}
                </div>
                <div className={styles.activityMeta}>{event.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
