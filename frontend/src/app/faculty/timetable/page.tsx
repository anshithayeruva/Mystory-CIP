"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Download, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Edit3, 
  ArrowLeftRight, 
  Plus, 
  X, 
  User,
  Calendar,
  Filter
} from "lucide-react";
import styles from "../pulse-sessions/pulse-sessions.module.css";
import { FacultyService } from "@/services/faculty.service";

interface FacultySlot {
  id: string;
  day: string;
  time: string;
  code: string;
  name: string;
  section: string;
  room: string;
  type: "Lecture" | "Tutorial" | "Lab" | "Office Hours";
  students: number;
  status: "COMPLETED" | "LIVE" | "UPCOMING";
  notes?: string;
}

// Multi-section timetable data for faculty teaching across multiple sections
const INITIAL_FACULTY_TIMETABLE: { day: string; slots: FacultySlot[] }[] = [
  {
    day: "Monday",
    slots: [
      { id: "f-1", day: "Monday", time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Management Systems", section: "Sec A", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "COMPLETED" },
      { id: "f-2", day: "Monday", time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Management Systems", section: "Sec B", room: "AB2 - Hall 406", type: "Lecture", students: 58, status: "LIVE" },
      { id: "f-3", day: "Monday", time: "02:00 PM - 05:00 PM", code: "CSE 302L", name: "DBMS Lab Group A", section: "Sec A", room: "CS Lab 1", type: "Lab", students: 30, status: "UPCOMING" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { id: "f-4", day: "Tuesday", time: "10:45 AM - 12:15 PM", code: "CSE 302T", name: "DBMS Query Tuning Tutorial", section: "Sec A", room: "AB2 - Hall 405", type: "Tutorial", students: 30, status: "UPCOMING" },
      { id: "f-5", day: "Tuesday", time: "02:00 PM - 05:00 PM", code: "CSE 302L", name: "DBMS Lab Group B", section: "Sec B", room: "CS Lab 1", type: "Lab", students: 28, status: "UPCOMING" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { id: "f-6", day: "Wednesday", time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Management Systems", section: "Sec C", room: "AB2 - Hall 407", type: "Lecture", students: 60, status: "UPCOMING" },
      { id: "f-7", day: "Wednesday", time: "01:30 PM - 04:30 PM", code: "CSE 302L", name: "DBMS Lab Group C", section: "Sec C", room: "CS Lab 1", type: "Lab", students: 30, status: "UPCOMING" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { id: "f-8", day: "Thursday", time: "11:00 AM - 12:30 PM", code: "CSE 302", name: "Relational Algebra & Normalization", section: "Sec A", room: "AB2 - Hall 405", type: "Lecture", students: 60, status: "UPCOMING" },
      { id: "f-9", day: "Thursday", time: "03:00 PM - 04:30 PM", code: "FAC-OFFICE", name: "Student Office Hours", section: "All Sec", room: "Room 402", type: "Office Hours", students: 15, status: "UPCOMING" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { id: "f-10", day: "Friday", time: "10:00 AM - 11:30 AM", code: "CSE 302", name: "Transaction Processing & Concurrency", section: "Sec B", room: "AB2 - Hall 406", type: "Lecture", students: 58, status: "UPCOMING" }
    ]
  }
];

export default function FacultyTimetablePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedSectionFilter, setSelectedSectionFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timetable State
  const [timetableData, setTimetableData] = useState(INITIAL_FACULTY_TIMETABLE);
  
  // Modals
  const [editingSlot, setEditingSlot] = useState<FacultySlot | null>(null);
  const [swappingSlot, setSwappingSlot] = useState<FacultySlot | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form States
  const [swapTargetFaculty, setSwapTargetFaculty] = useState("Dr. Aris Thorne (Sec A Data Structures)");
  const [newExtraSlot, setNewExtraSlot] = useState({
    code: "CSE 302",
    name: "Extra Practice Session",
    section: "Sec A",
    time: "04:30 PM - 05:30 PM",
    room: "AB2 - Hall 405",
    type: "Tutorial" as any,
    notes: "Optional review session"
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadTimetable() {
      try {
        const res = await FacultyService.getTimetable();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setTimetableData(res.data);
        }
      } catch (err) {
        console.warn("Timetable API offline, using fallback state:", err);
      }
    }
    loadTimetable();
  }, []);

  const currentDayObj = timetableData.find(t => t.day === selectedDay) || timetableData[0];
  
  const displayedSlots = currentDayObj.slots.filter(s => 
    selectedSectionFilter === "ALL" || s.section === selectedSectionFilter
  );

  const handleSaveSlotEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    try {
      await FacultyService.updateTimetableSlot(editingSlot.id, {
        name: editingSlot.name,
        room: editingSlot.room,
        time: editingSlot.time
      });
    } catch (err) {
      console.warn("Update timetable slot API warning:", err);
    }

    setTimetableData(prevData =>
      prevData.map(dayObj => {
        if (dayObj.day !== editingSlot.day) return dayObj;
        return {
          ...dayObj,
          slots: dayObj.slots.map(s => s.id === editingSlot.id ? editingSlot : s)
        };
      })
    );

    setEditingSlot(null);
    triggerToast("Session details updated successfully.");
  };

  const handleConfirmSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!swappingSlot) return;

    try {
      await FacultyService.rescheduleTimetableSlot(swappingSlot.id, {
        targetFaculty: swapTargetFaculty
      });
    } catch (err) {
      console.warn("Reschedule slot API warning:", err);
    }

    triggerToast(`Reschedule request sent to ${swapTargetFaculty}.`);
    setSwappingSlot(null);
  };

  const handleAddExtraSession = async (e: React.FormEvent) => {
    e.preventDefault();

    let created: FacultySlot = {
      id: `f-${Date.now()}`,
      day: selectedDay,
      time: newExtraSlot.time,
      code: newExtraSlot.code,
      name: newExtraSlot.name,
      section: newExtraSlot.section,
      room: newExtraSlot.room,
      type: newExtraSlot.type,
      students: 60,
      status: "UPCOMING",
      notes: newExtraSlot.notes
    };

    try {
      const res = await FacultyService.addExtraSession({
        day: selectedDay,
        code: newExtraSlot.code,
        name: newExtraSlot.name,
        section: newExtraSlot.section,
        time: newExtraSlot.time,
        room: newExtraSlot.room,
        type: newExtraSlot.type,
        notes: newExtraSlot.notes
      });
      if (res && res.data) {
        created = res.data;
      }
    } catch (err) {
      console.warn("Add extra session API warning:", err);
    }

    setTimetableData(prevData =>
      prevData.map(dayObj => {
        if (dayObj.day !== selectedDay) return dayObj;
        return {
          ...dayObj,
          slots: [...dayObj.slots, created]
        };
      })
    );

    setIsAddModalOpen(false);
    triggerToast(`Extra session added for ${newExtraSlot.section}.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-sans, sans-serif)" }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#00522E",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px -5px rgba(0, 82, 46, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          fontSize: "0.88rem",
          zIndex: 1000
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Premium Banner Area */}
      <div style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
      }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0" }}>
            Faculty Teaching Schedule & Slot Editor
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            Weekly Teaching Schedule • Sections A, B & C • Direct Session Editing & Rescheduling.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              backgroundColor: "#00522E",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            <Plus size={16} /> Add Extra Session
          </button>
          
          <button 
            onClick={() => triggerToast("Downloading Faculty Teaching Schedule PDF.")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Day & Section Selector Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        {/* Day Picker */}
        <div style={{ display: "flex", gap: "8px" }}>
          {timetableData.map((t) => (
            <button
              key={t.day}
              onClick={() => setSelectedDay(t.day)}
              style={{
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                border: selectedDay === t.day ? "none" : "1px solid #cbd5e1",
                backgroundColor: selectedDay === t.day ? "#00522E" : "#ffffff",
                color: selectedDay === t.day ? "#ffffff" : "#334155",
                transition: "all 0.15s ease"
              }}
            >
              {t.day}
            </button>
          ))}
        </div>

        {/* Section Filter Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ffffff", padding: "6px 12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <Filter size={15} color="#64748b" />
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginRight: "4px" }}>SECTION:</span>
          {["ALL", "Sec A", "Sec B", "Sec C"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSectionFilter(sec)}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                backgroundColor: selectedSectionFilter === sec ? "#00522E" : "transparent",
                color: selectedSectionFilter === sec ? "#ffffff" : "#475569",
                transition: "all 0.15s ease"
              }}
            >
              {sec === "ALL" ? "All Sections" : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table / List Card */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={18} color="#00522E" />
            <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{selectedDay}'s Assigned Teaching Slots</h2>
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", padding: "4px 12px", borderRadius: "20px" }}>
            {displayedSlots.length} Sessions Scheduled
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {displayedSlots.map((slot) => (
            <div
              key={slot.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderLeft: "4px solid #00522E",
                borderRadius: "8px"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#00522E", backgroundColor: "#e9f2ee", padding: "3px 8px", borderRadius: "4px" }}>
                    {slot.section}
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>
                    {slot.code}
                  </span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, backgroundColor: "#e2e8f0", color: "#334155", padding: "2px 6px", borderRadius: "4px" }}>
                    {slot.type}
                  </span>
                </div>

                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  {slot.name}
                </h3>

                <div style={{ display: "flex", gap: "16px", fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>
                  <span><MapPin size={13} style={{ display: "inline", marginRight: 4 }} /> {slot.room}</span>
                  <span><Users size={13} style={{ display: "inline", marginRight: 4 }} /> {slot.students} Enrolled Students</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00522E", backgroundColor: "#e9f2ee", padding: "6px 14px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={13} /> {slot.time}
                </div>

                <button
                  onClick={() => setEditingSlot(slot)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "7px 14px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}
                >
                  <Edit3 size={13} /> Edit Topic/Room
                </button>

                <button
                  onClick={() => setSwappingSlot(slot)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "7px 14px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}
                >
                  <ArrowLeftRight size={13} /> Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingSlot && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", width: "440px", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>Edit Session ({editingSlot.section})</h3>
              <button onClick={() => setEditingSlot(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveSlotEdit} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Topic / Title</label>
                <input type="text" value={editingSlot.name} onChange={(e) => setEditingSlot({...editingSlot, name: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Assigned Room / Hall</label>
                <input type="text" value={editingSlot.room} onChange={(e) => setEditingSlot({...editingSlot, room: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Time Slot</label>
                <input type="text" value={editingSlot.time} onChange={(e) => setEditingSlot({...editingSlot, time: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" }}>
                <button type="button" onClick={() => setEditingSlot(null)} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#00522E", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}>Save Session</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SWAP MODAL */}
      {swappingSlot && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", width: "440px", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>Reschedule / Swap Slot</h3>
              <button onClick={() => setSwappingSlot(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>

            <form onSubmit={handleConfirmSwap} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#00522E" }}>{swappingSlot.section} • {swappingSlot.code}: {swappingSlot.name}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>Current Slot: {swappingSlot.day} ({swappingSlot.time})</div>
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Target Faculty to Swap With</label>
                <select value={swapTargetFaculty} onChange={(e) => setSwapTargetFaculty(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }}>
                  <option>Dr. Aris Thorne (Sec A Data Structures)</option>
                  <option>Prof. Kevin Ellis (Sec B Operating Systems)</option>
                  <option>Dr. Lisa Muller (Sec C Networks)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" }}>
                <button type="button" onClick={() => setSwappingSlot(null)} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#00522E", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}>Request Swap</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EXTRA MODAL */}
      {isAddModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", width: "440px", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>Add Extra Session</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddExtraSession} style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Target Section</label>
                <select value={newExtraSlot.section} onChange={(e) => setNewExtraSlot({...newExtraSlot, section: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }}>
                  <option value="Sec A">Sec A</option>
                  <option value="Sec B">Sec B</option>
                  <option value="Sec C">Sec C</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Session Name / Topic</label>
                <input type="text" value={newExtraSlot.name} onChange={(e) => setNewExtraSlot({...newExtraSlot, name: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Time Slot</label>
                <input type="text" value={newExtraSlot.time} onChange={(e) => setNewExtraSlot({...newExtraSlot, time: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 700, color: "#334155" }}>Room Allocation</label>
                <input type="text" value={newExtraSlot.room} onChange={(e) => setNewExtraSlot({...newExtraSlot, room: e.target.value})} style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "4px" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: "8px 16px", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#00522E", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}>Add Session</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
