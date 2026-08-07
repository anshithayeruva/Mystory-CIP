"use client";

import React from "react";
import Link from "next/link";
import styles from "../../styles/faculty-dashboard.module.css";
import { mockUpcomingEvents } from "../../constants/mockData";

interface FacultyUpcomingEventsProps {
  events?: any[];
}

export default function FacultyUpcomingEvents({ events }: FacultyUpcomingEventsProps) {
  const displayEvents = events && events.length > 0 ? events : mockUpcomingEvents;

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <Link href="#" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#10633B', textDecoration: 'none' }}>
          VIEW ALL
        </Link>
      </div>
      
      <div className={styles.eventsList}>
        {displayEvents.map((event) => (
          <div key={event.id} className={styles.eventItem}>
            <div className={event.theme === 'dark' ? styles.dateBoxDark : styles.dateBoxLight}>
              <span className={styles.dateNum}>{event.day}</span>
              <span className={styles.dateMonth}>{event.month}</span>
            </div>
            
            <div className={styles.eventContent}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventMeta}>
                {event.location} • {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
