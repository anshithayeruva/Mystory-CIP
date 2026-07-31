import React from "react";
import { Activity, MoreVertical } from "lucide-react";
import styles from "../pulse-sessions.module.css";

export interface PulseSession {
  id: string;
  name: string;
  subject: string;
  type: string;
  code: string;
  date: string;
  time: string;
  status: "Live" | "Upcoming" | "Completed";
  participants: number;
}

interface PulseSessionTableProps {
  data: PulseSession[];
}

export default function PulseSessionTable({ data }: PulseSessionTableProps) {
  if (data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Activity className={styles.emptyStateIcon} />
        <h3 className={styles.emptyStateTitle}>No Pulse Sessions Yet</h3>
        <p className={styles.emptyStateDesc}>Create your first classroom pulse session to begin collecting student understanding and live feedback.</p>
        <button className={styles.primaryButton}>
          Create Pulse Session
        </button>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Code</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((session) => (
            <tr key={session.id}>
              <td className={styles.primaryText}>{session.name}</td>
              <td>{session.subject}</td>
              <td>{session.type}</td>
              <td>{session.code}</td>
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td>
                <span className={`${styles.badge} ${
                  session.status === "Live" ? styles.badgeLive : 
                  session.status === "Upcoming" ? styles.badgeUpcoming : 
                  styles.badgeCompleted
                }`}>
                  {session.status}
                </span>
              </td>
              <td>{session.participants}</td>
              <td>
                <button className={styles.actionButton} title="Options">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
