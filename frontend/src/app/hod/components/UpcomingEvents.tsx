"use client";

import React from "react";
import Link from "next/link";
import styles from "../dashboard.module.css";

const events = [
  {
    id: 1,
    day: "14",
    month: "OCT",
    title: "HOD Senate Meeting",
    meta: "Conference Hall • 14:00 PM",
    isDarkDate: true,
  },
  {
    id: 2,
    day: "18",
    month: "OCT",
    title: "End-Term Prep Review",
    meta: "Administrative Office • 11:30 AM",
    isDarkDate: false,
  },
];

export default function UpcomingEvents() {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <Link href="/hod/events" className={styles.viewAllLink}>
          VIEW ALL
        </Link>
      </div>

      <div className={styles.eventsList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventItem}>
            <div className={event.isDarkDate ? styles.dateBoxDark : styles.dateBoxLight}>
              <span className={styles.dateNum}>{event.day}</span>
              <span className={styles.dateMonth}>{event.month}</span>
            </div>
            <div className={styles.eventContent}>
              <div className={styles.eventTitle}>{event.title}</div>
              <div className={styles.eventMeta}>{event.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
