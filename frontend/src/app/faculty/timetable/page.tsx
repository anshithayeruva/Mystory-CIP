"use client";

import React, { useState } from "react";
import { Clock, Download, Bell, MapPin, Users, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import styles from "../pulse-sessions/pulse-sessions.module.css";

const FACULTY_TIMETABLE = [
  {
    day: "Monday",
    slots: [
      { time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Management Systems", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "COMPLETED" },
      { time: "11:00 AM - 12:30 PM", code: "CSE 302", name: "DBMS Advanced SQL & Query Tuning", room: "AB2 - Hall 405", type: "Tutorial", students: 30, status: "LIVE" },
      { time: "02:00 PM - 05:00 PM", code: "CSE 302", name: "Distributed Databases Lab", room: "CS Lab 1", type: "Lab", students: 30, status: "UPCOMING" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Management Systems", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "UPCOMING" },
      { time: "02:00 PM - 04:00 PM", code: "CSE 305", name: "Machine Learning (Guest Joint Lecture)", room: "AB1 - Hall 204", type: "Lecture", students: 55, status: "UPCOMING" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Management Systems", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "UPCOMING" },
      { time: "02:00 PM - 05:00 PM", code: "CSE 302", name: "Database Systems Lab Group B", room: "CS Lab 1", type: "Lab", students: 30, status: "UPCOMING" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "11:00 AM - 12:30 PM", code: "CSE 302", name: "Relational Algebra & Normalization", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "UPCOMING" },
      { time: "03:00 PM - 04:30 PM", code: "FAC-OFFICE", name: "Faculty Office Hours & Student Consultation", room: "Building B - Room 402", type: "Office Hours", students: 15, status: "UPCOMING" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "10:00 AM - 11:30 AM", code: "CSE 302", name: "Transaction Processing & Concurrency", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "UPCOMING" },
      { time: "02:00 PM - 04:00 PM", code: "RESEARCH", name: "Departmental Curriculum & Academic Review", room: "Conference Hall 2", type: "Meeting", students: 12, status: "UPCOMING" }
    ]
  }
];

export default function FacultyTimetablePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentDaySchedule = FACULTY_TIMETABLE.find(t => t.day === selectedDay) || FACULTY_TIMETABLE[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportPDF = () => {
    triggerToast("Downloading Faculty Teaching Timetable PDF...");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#00522E",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          zIndex: 1000
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Area */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Faculty Teaching Schedule</h1>
          <p className={styles.subtitle}>
            Semester 6 Weekly Schedule • Assigned Lecture Halls, Computer Labs & Office Hours.
          </p>
        </div>
        <button className={styles.primaryButton} onClick={handleExportPDF}>
          <Download size={16} /> Export Schedule PDF
        </button>
      </div>

      {/* Day Selector Buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {FACULTY_TIMETABLE.map((t) => (
          <button
            key={t.day}
            onClick={() => setSelectedDay(t.day)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
              border: selectedDay === t.day ? "none" : "1px solid #cbd5e1",
              backgroundColor: selectedDay === t.day ? "#00522E" : "#ffffff",
              color: selectedDay === t.day ? "#ffffff" : "#334155",
              transition: "all 0.2s ease"
            }}
          >
            {t.day}
          </button>
        ))}
      </div>

      {/* Schedule Table / List Card */}
      <div className={styles.mainCard}>
        <div className={styles.tableHeaderRow} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={20} color="#00522E" />
            <h2 className={styles.tableTitle}>{selectedDay}'s Assigned Teaching Slots</h2>
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", padding: "4px 10px", borderRadius: "20px" }}>
            {currentDaySchedule.slots.length} Sessions Assigned
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "20px", backgroundColor: "#ffffff", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
          {currentDaySchedule.slots.map((slot, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderLeft: "4px solid #00522E",
                borderRadius: "8px"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#00522E", backgroundColor: "#e9f2ee", padding: "2px 8px", borderRadius: "4px" }}>
                    {slot.code}
                  </span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: "#e2e8f0", color: "#334155", padding: "2px 8px", borderRadius: "4px" }}>
                    {slot.type}
                  </span>
                  {slot.status === "LIVE" && (
                    <span className={styles.badgeLive} style={{ fontSize: "0.65rem" }}>
                      LIVE NOW
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  {slot.name}
                </h3>

                <div style={{ display: "flex", gap: "16px", fontSize: "0.8rem", color: "#64748b" }}>
                  <span><MapPin size={13} style={{ display: "inline", marginRight: 4 }} /> {slot.room}</span>
                  <span><Users size={13} style={{ display: "inline", marginRight: 4 }} /> {slot.students} Enrolled Students</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", padding: "6px 14px", borderRadius: "6px" }}>
                  {slot.time}
                </div>
                <button
                  onClick={() => triggerToast(`Reminder scheduled for ${slot.name}`)}
                  className={styles.resetButton}
                  style={{ padding: "8px", borderRadius: "6px" }}
                  title="Schedule Class Reminder"
                >
                  <Bell size={16} color="#64748b" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
