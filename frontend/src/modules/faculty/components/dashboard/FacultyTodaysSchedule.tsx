"use client";

import React from "react";
import styles from "../../styles/faculty-dashboard.module.css";

interface TimelineItemData {
  id: string;
  time: string;
  title: string;
  subtext: string;
  type: "green" | "slate" | "blue" | "gray";
}

const scheduleActivities: TimelineItemData[] = [
  {
    id: "1",
    time: "09:15 AM",
    title: "Dr. Kumar started a session",
    subtext: "Data Structures - CSE B (Live now)",
    type: "green",
  },
  {
    id: "2",
    time: "10:45 AM",
    title: "Assessment Completed",
    subtext: "120 students completed Neural Nets Quiz",
    type: "slate",
  },
  {
    id: "3",
    time: "11:30 AM",
    title: "New Resource Added",
    subtext: 'Prof. Mehra uploaded "Backpropagation.pdf"',
    type: "blue",
  },
  {
    id: "4",
    time: "12:05 PM",
    title: "System Backup Success",
    subtext: "Academic data synced to secure cloud",
    type: "gray",
  },
];

export default function FacultyTodaysSchedule() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Today's Timetable</h2>
      </div>

      <div className={styles.timelineList}>
        {scheduleActivities.map((item, index) => {
          const isLast = index === scheduleActivities.length - 1;
          const dotClass =
            item.type === "green"
              ? styles.dotGreen
              : item.type === "slate"
              ? styles.dotSlate
              : item.type === "blue"
              ? styles.dotBlue
              : styles.dotGray;

          const timeClass =
            item.type === "green"
              ? styles.timelineTimeGreen
              : item.type === "slate"
              ? styles.timelineTimeSlate
              : item.type === "blue"
              ? styles.timelineTimeBlue
              : styles.timelineTimeGray;

          return (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelineTrack}>
                <div className={`${styles.timelineDot} ${dotClass}`} />
                {!isLast && <div className={styles.timelineLine} />}
              </div>
              <div className={styles.timelineContent}>
                <span className={timeClass}>{item.time}</span>
                <h4 className={styles.timelineTitle}>{item.title}</h4>
                <p className={styles.timelineSubtext}>{item.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
