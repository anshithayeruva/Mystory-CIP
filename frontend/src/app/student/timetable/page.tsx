"use client";

import React, { useState } from "react";
import { Clock, Download, Bell, MapPin, User } from "lucide-react";
import styles from "../student.module.css";

const TIMETABLE_DATA = [
  { day: "Monday", slots: [
    { time: "09:00 AM - 10:30 AM", code: "CSE 301", name: "Advanced Data Structures", room: "AB2 - Hall 301", faculty: "Dr. Aris Thorne", type: "Lecture" },
    { time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Management Systems", room: "AB2 - Hall 405", faculty: "Dr. Sarah Jenkins", type: "Lecture" },
    { time: "02:00 PM - 04:00 PM", code: "CSE 304", name: "Computer Networks Lab", room: "CS Lab 3", faculty: "Dr. Lisa Muller", type: "Lab" }
  ]},
  { day: "Tuesday", slots: [
    { time: "09:00 AM - 10:30 AM", code: "CSE 303", name: "Operating Systems", room: "AB1 - Hall 102", faculty: "Prof. Kevin Ellis", type: "Lecture" },
    { time: "11:00 AM - 12:30 PM", code: "CSE 306", name: "Software Engineering", room: "AB2 - Hall 201", faculty: "Prof. Anita Desai", type: "Lecture" },
    { time: "02:00 PM - 03:30 PM", code: "CSE 305", name: "Machine Learning", room: "AB1 - Hall 204", faculty: "Dr. Robert Vance", type: "Lecture" }
  ]},
  { day: "Wednesday", slots: [
    { time: "09:00 AM - 10:30 AM", code: "CSE 301", name: "Advanced Data Structures", room: "AB2 - Hall 301", faculty: "Dr. Aris Thorne", type: "Lecture" },
    { time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Management Systems", room: "AB2 - Hall 405", faculty: "Dr. Sarah Jenkins", type: "Lecture" },
    { time: "02:00 PM - 05:00 PM", code: "CSE 302", name: "DBMS Lab", room: "CS Lab 1", faculty: "Dr. Sarah Jenkins", type: "Lab" }
  ]},
  { day: "Thursday", slots: [
    { time: "09:00 AM - 10:30 AM", code: "CSE 304", name: "Computer Networks", room: "AB2 - Hall 405", faculty: "Dr. Lisa Muller", type: "Lecture" },
    { time: "11:00 AM - 12:30 PM", code: "CSE 303", name: "Operating Systems", room: "AB1 - Hall 102", faculty: "Prof. Kevin Ellis", type: "Lecture" },
    { time: "04:15 PM - 05:15 PM", code: "CSE 305", name: "Machine Learning Tutorial", room: "AB1 - Room 204", faculty: "Dr. Robert Vance", type: "Tutorial" }
  ]},
  { day: "Friday", slots: [
    { time: "09:00 AM - 10:30 AM", code: "CSE 306", name: "Software Engineering", room: "AB2 - Hall 201", faculty: "Prof. Anita Desai", type: "Lecture" },
    { time: "11:00 AM - 01:00 PM", code: "CSE 303", name: "OS Lab & System Programming", room: "CS Lab 2", faculty: "Prof. Kevin Ellis", type: "Lab" }
  ]}
];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const currentDaySchedule = TIMETABLE_DATA.find(t => t.day === selectedDay) || TIMETABLE_DATA[0];

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Class & Exam Timetable</h1>
          <p className={styles.welcomeSubtitle}>
            Semester 6 Weekly Schedule • Lecture Halls, Computer Labs & Reminders.
          </p>
        </div>
        <div>
          <button className={styles.btnSecondary}>
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Day Picker Buttons */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {TIMETABLE_DATA.map((t) => (
          <button
            key={t.day}
            onClick={() => setSelectedDay(t.day)}
            className={`${styles.btnSecondary} ${selectedDay === t.day ? styles.btnPrimary : ""}`}
            style={{
              padding: "8px 16px",
              fontSize: "0.85rem",
              backgroundColor: selectedDay === t.day ? "#00522E" : "#ffffff",
              color: selectedDay === t.day ? "#ffffff" : "#334155"
            }}
          >
            {t.day}
          </button>
        ))}
      </div>

      {/* Selected Day Schedule Cards */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Clock size={16} color="#00522E" /> {selectedDay}'s Class Schedule
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {currentDaySchedule.slots.map((slot, idx) => (
            <div key={idx} className={styles.classItem} style={{ borderLeft: "4px solid #00522E" }}>
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "2px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#00522E" }}>{slot.code}</span>
                  <span style={{ fontSize: "0.7rem", padding: "2px 6px", backgroundColor: "#e2e8f0", borderRadius: "4px", fontWeight: 600 }}>{slot.type}</span>
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>{slot.name}</h3>
                <div style={{ display: "flex", gap: "14px", fontSize: "0.78rem", color: "#64748b" }}>
                  <span><User size={12} style={{ marginRight: 4 }} /> {slot.faculty}</span>
                  <span><MapPin size={12} style={{ marginRight: 4 }} /> {slot.room}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", padding: "4px 10px", borderRadius: "6px" }}>
                  {slot.time}
                </div>
                <button className={styles.btnSecondary} style={{ padding: "6px", borderRadius: "4px" }} title="Set Reminder">
                  <Bell size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
