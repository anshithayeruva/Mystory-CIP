"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Upload, 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle2, 
  FileSpreadsheet, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Send, 
  User, 
  MapPin, 
  Filter, 
  Grid, 
  List, 
  Search, 
  BookOpen, 
  Layers,
  AlertCircle
} from "lucide-react";

type TabMode = "ai" | "excel" | "master";
type ViewMode = "grid" | "list";

interface TimetableSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  time: string;
  code: string;
  name: string;
  faculty: string;
  room: string;
  section: "Sec A" | "Sec B" | "Sec C";
  type: "Lecture" | "Lab" | "Tutorial";
}

// 5-day semester curriculum timetable for all sections
const INITIAL_TIMETABLE: TimetableSlot[] = [
  // SECTION A
  { id: "sa-1", day: "Monday", time: "09:00 AM - 10:30 AM", code: "CSE 301", name: "Advanced Data Structures", faculty: "Dr. Aris Thorne", room: "AB2 - Hall 301", section: "Sec A", type: "Lecture" },
  { id: "sa-2", day: "Monday", time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2 - Hall 405", section: "Sec A", type: "Lecture" },
  { id: "sa-3", day: "Monday", time: "01:30 PM - 04:30 PM", code: "CSE 304L", name: "Networks Lab", faculty: "Dr. Lisa Muller", room: "CS Lab 3", section: "Sec A", type: "Lab" },

  { id: "sa-4", day: "Tuesday", time: "09:00 AM - 10:30 AM", code: "CSE 303", name: "Operating Systems", faculty: "Prof. Kevin Ellis", room: "AB1 - Hall 102", section: "Sec A", type: "Lecture" },
  { id: "sa-5", day: "Tuesday", time: "10:45 AM - 12:15 PM", code: "CSE 306", name: "Software Engineering", faculty: "Prof. Anita Desai", room: "AB2 - Hall 201", section: "Sec A", type: "Lecture" },
  { id: "sa-6", day: "Tuesday", time: "01:30 PM - 03:00 PM", code: "CSE 305", name: "Machine Learning", faculty: "Dr. Robert Vance", room: "AB1 - Hall 204", section: "Sec A", type: "Lecture" },
  { id: "sa-7", day: "Tuesday", time: "03:15 PM - 04:45 PM", code: "CSE 301T", name: "Data Structures Tutorial", faculty: "Dr. Aris Thorne", room: "AB2 - Room 301", section: "Sec A", type: "Tutorial" },

  { id: "sa-8", day: "Wednesday", time: "09:00 AM - 10:30 AM", code: "CSE 301", name: "Advanced Data Structures", faculty: "Dr. Aris Thorne", room: "AB2 - Hall 301", section: "Sec A", type: "Lecture" },
  { id: "sa-9", day: "Wednesday", time: "10:45 AM - 12:15 PM", code: "CSE 302", name: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2 - Hall 405", section: "Sec A", type: "Lecture" },
  { id: "sa-10", day: "Wednesday", time: "01:30 PM - 04:30 PM", code: "CSE 302L", name: "DBMS Lab", faculty: "Dr. Sarah Jenkins", room: "CS Lab 1", section: "Sec A", type: "Lab" },

  { id: "sa-11", day: "Thursday", time: "09:00 AM - 10:30 AM", code: "CSE 304", name: "Computer Networks", faculty: "Dr. Lisa Muller", room: "AB2 - Hall 405", section: "Sec A", type: "Lecture" },
  { id: "sa-12", day: "Thursday", time: "10:45 AM - 12:15 PM", code: "CSE 303", name: "Operating Systems", faculty: "Prof. Kevin Ellis", room: "AB1 - Hall 102", section: "Sec A", type: "Lecture" },
  { id: "sa-13", day: "Thursday", time: "01:30 PM - 03:00 PM", code: "CSE 305", name: "Machine Learning", faculty: "Dr. Robert Vance", room: "AB1 - Hall 204", section: "Sec A", type: "Lecture" },
  { id: "sa-14", day: "Thursday", time: "03:15 PM - 04:45 PM", code: "CSE 306", name: "Software Engineering", faculty: "Prof. Anita Desai", room: "AB2 - Hall 201", section: "Sec A", type: "Lecture" },

  { id: "sa-15", day: "Friday", time: "09:00 AM - 10:30 AM", code: "CSE 304", name: "Computer Networks", faculty: "Dr. Lisa Muller", room: "AB2 - Hall 405", section: "Sec A", type: "Lecture" },
  { id: "sa-16", day: "Friday", time: "10:45 AM - 12:15 PM", code: "CSE 303L", name: "OS Lab", faculty: "Prof. Kevin Ellis", room: "CS Lab 2", section: "Sec A", type: "Lab" },
  { id: "sa-17", day: "Friday", time: "01:30 PM - 03:00 PM", code: "CSE 305T", name: "ML Tutorial", faculty: "Dr. Robert Vance", room: "AB1 - Room 204", section: "Sec A", type: "Tutorial" },

  // SECTION B
  { id: "sb-1", day: "Monday", time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2 - Hall 406", section: "Sec B", type: "Lecture" },
  { id: "sb-2", day: "Monday", time: "10:45 AM - 12:15 PM", code: "CSE 301", name: "Advanced Data Structures", faculty: "Dr. Aris Thorne", room: "AB2 - Hall 302", section: "Sec B", type: "Lecture" },
  { id: "sb-3", day: "Monday", time: "01:30 PM - 04:30 PM", code: "CSE 302L", name: "DBMS Lab", faculty: "Dr. Sarah Jenkins", room: "CS Lab 1", section: "Sec B", type: "Lab" },

  { id: "sb-4", day: "Tuesday", time: "09:00 AM - 10:30 AM", code: "CSE 306", name: "Software Engineering", faculty: "Prof. Anita Desai", room: "AB2 - Hall 202", section: "Sec B", type: "Lecture" },
  { id: "sb-5", day: "Tuesday", time: "10:45 AM - 12:15 PM", code: "CSE 303", name: "Operating Systems", faculty: "Prof. Kevin Ellis", room: "AB1 - Hall 103", section: "Sec B", type: "Lecture" },
  { id: "sb-6", day: "Tuesday", time: "01:30 PM - 04:30 PM", code: "CSE 303L", name: "OS Lab", faculty: "Prof. Kevin Ellis", room: "CS Lab 2", section: "Sec B", type: "Lab" },

  { id: "sb-7", day: "Wednesday", time: "09:00 AM - 10:30 AM", code: "CSE 305", name: "Machine Learning", faculty: "Dr. Robert Vance", room: "AB1 - Hall 205", section: "Sec B", type: "Lecture" },
  { id: "sb-8", day: "Wednesday", time: "10:45 AM - 12:15 PM", code: "CSE 304", name: "Computer Networks", faculty: "Dr. Lisa Muller", room: "AB2 - Hall 406", section: "Sec B", type: "Lecture" },

  { id: "sb-9", day: "Thursday", time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2 - Hall 406", section: "Sec B", type: "Lecture" },
  { id: "sb-10", day: "Thursday", time: "01:30 PM - 04:30 PM", code: "CSE 304L", name: "Networks Lab", faculty: "Dr. Lisa Muller", room: "CS Lab 3", section: "Sec B", type: "Lab" },

  { id: "sb-11", day: "Friday", time: "09:00 AM - 10:30 AM", code: "CSE 303", name: "Operating Systems", faculty: "Prof. Kevin Ellis", room: "AB1 - Hall 103", section: "Sec B", type: "Lecture" },

  // SECTION C
  { id: "sc-1", day: "Monday", time: "09:00 AM - 10:30 AM", code: "CSE 305", name: "Machine Learning", faculty: "Dr. Robert Vance", room: "AB1 - Hall 206", section: "Sec C", type: "Lecture" },
  { id: "sc-2", day: "Monday", time: "10:45 AM - 12:15 PM", code: "CSE 304", name: "Computer Networks", faculty: "Dr. Lisa Muller", room: "AB2 - Hall 407", section: "Sec C", type: "Lecture" },
  { id: "sc-3", day: "Monday", time: "01:30 PM - 04:30 PM", code: "CSE 303L", name: "OS Lab", faculty: "Prof. Kevin Ellis", room: "CS Lab 2", section: "Sec C", type: "Lab" },

  { id: "sc-4", day: "Tuesday", time: "09:00 AM - 10:30 AM", code: "CSE 302", name: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2 - Hall 407", section: "Sec C", type: "Lecture" },
  { id: "sc-5", day: "Tuesday", time: "01:30 PM - 04:30 PM", code: "CSE 304L", name: "Networks Lab", faculty: "Dr. Lisa Muller", room: "CS Lab 3", section: "Sec C", type: "Lab" },

  { id: "sc-6", day: "Wednesday", time: "09:00 AM - 10:30 AM", code: "CSE 303", name: "Operating Systems", faculty: "Prof. Kevin Ellis", room: "AB1 - Hall 104", section: "Sec C", type: "Lecture" },
  { id: "sc-7", day: "Wednesday", time: "01:30 PM - 04:30 PM", code: "CSE 302L", name: "DBMS Lab", faculty: "Dr. Sarah Jenkins", room: "CS Lab 1", section: "Sec C", type: "Lab" },

  { id: "sc-8", day: "Thursday", time: "09:00 AM - 10:30 AM", code: "CSE 301", name: "Advanced Data Structures", faculty: "Dr. Aris Thorne", room: "AB2 - Hall 303", section: "Sec C", type: "Lecture" },
  { id: "sc-9", day: "Friday", time: "09:00 AM - 10:30 AM", code: "CSE 305", name: "Machine Learning", faculty: "Dr. Robert Vance", room: "AB1 - Hall 206", section: "Sec C", type: "Lecture" }
];

const DAYS: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
];

const TIME_SLOTS = [
  "09:00 AM - 10:30 AM",
  "10:45 AM - 12:15 PM",
  "01:30 PM - 03:00 PM",
  "01:30 PM - 04:30 PM",
  "03:15 PM - 04:45 PM"
];

export default function HODTimetablePage() {
  const [activeTab, setActiveTab] = useState<TabMode>("master");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedSection, setSelectedSection] = useState<string>("Sec A");
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Generator States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [aiPreviewSection, setAiPreviewSection] = useState<string>("Sec A");

  // Excel State
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);

  // Master State
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSlotForm, setNewSlotForm] = useState<Partial<TimetableSlot>>({
    day: "Monday",
    time: "09:00 AM - 10:30 AM",
    code: "CSE 302",
    name: "Database Systems",
    faculty: "Dr. Sarah Jenkins",
    room: "AB2 - Hall 405",
    section: "Sec A",
    type: "Lecture"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunAi = () => {
    setIsGenerating(true);
    setAiSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setAiSuccess(true);
      showToast("AI generated conflict-free weekly schedule for Sections A, B & C.");
    }, 1100);
  };

  const handleFileUpload = (filename: string) => {
    setUploadedFile(filename);
    setParsedRows([
      { day: "Monday", time: "09:00 AM - 10:30 AM", section: "Sec A", code: "CSE 301", title: "Advanced Data Structures", faculty: "Dr. Aris Thorne", room: "AB2-301", type: "Lecture" },
      { day: "Monday", time: "10:45 AM - 12:15 PM", section: "Sec A", code: "CSE 302", title: "Database Systems", faculty: "Dr. Sarah Jenkins", room: "AB2-405", type: "Lecture" },
      { day: "Monday", time: "01:30 PM - 04:30 PM", section: "Sec A", code: "CSE 304L", title: "Networks Lab", faculty: "Dr. Lisa Muller", room: "CS Lab 3", type: "Lab" },
      { day: "Tuesday", time: "09:00 AM - 10:30 AM", section: "Sec B", code: "CSE 306", title: "Software Engineering", faculty: "Prof. Anita Desai", room: "AB2-202", type: "Lecture" },
      { day: "Wednesday", time: "01:30 PM - 04:30 PM", section: "Sec C", code: "CSE 302L", title: "DBMS Lab", faculty: "Dr. Sarah Jenkins", room: "CS Lab 1", type: "Lab" },
    ]);
    showToast(`Successfully extracted ${filename}. 5 entries validated.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;
    setTimetableSlots(timetableSlots.map(s => s.id === editingSlot.id ? editingSlot : s));
    setEditingSlot(null);
    showToast("Class slot updated successfully.");
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotForm.name || !newSlotForm.faculty) return;
    const created: TimetableSlot = {
      id: `slot-${Date.now()}`,
      day: (newSlotForm.day as any) || "Monday",
      time: newSlotForm.time || "09:00 AM - 10:30 AM",
      code: newSlotForm.code || "CSE 302",
      name: newSlotForm.name,
      faculty: newSlotForm.faculty,
      room: newSlotForm.room || "AB2 - Hall 405",
      section: (newSlotForm.section as any) || "Sec A",
      type: (newSlotForm.type as any) || "Lecture"
    };
    setTimetableSlots([...timetableSlots, created]);
    setIsAddModalOpen(false);
    showToast("New class slot added to schedule.");
  };

  // Filter slots for Master view
  const filteredSlots = timetableSlots.filter(s => {
    const matchesSection = selectedSection === "ALL" || s.section === selectedSection;
    const matchesDay = selectedDayFilter === "ALL" || s.day === selectedDayFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.faculty.toLowerCase().includes(q) ||
      s.room.toLowerCase().includes(q)
    );
    return matchesSection && matchesDay && matchesSearch;
  });

  // Helper for Type Tag Styles (Slate & Soft Emerald monochrome palette)
  const getTypeBadgeStyle = (type: "Lecture" | "Lab" | "Tutorial") => {
    switch (type) {
      case "Lab":
        return { backgroundColor: "#f0fdf4", color: "#047857", borderColor: "#cbd5e1" };
      case "Tutorial":
        return { backgroundColor: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" };
      default: // Lecture
        return { backgroundColor: "#f1f5f9", color: "#334155", borderColor: "#cbd5e1" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontFamily: "var(--font-sans, sans-serif)", color: "#0f172a" }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#047857",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px -5px rgba(4, 120, 87, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          fontSize: "0.875rem",
          zIndex: 1000,
          animation: "fadeIn 0.2s ease"
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner & Stats */}
      <div style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#047857"
          }}>
            <Calendar size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
              Department Class Timetable
            </h1>
            <p style={{ fontSize: "0.825rem", color: "#64748b", margin: "3px 0 0 0" }}>
              Computer Science & Engineering • Semester 6 Weekly Schedules
            </p>
          </div>
        </div>

        {/* Quick Actions Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 16px",
              backgroundColor: "#ffffff",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
          >
            <Plus size={15} /> Add Slot
          </button>
          
          <button 
            onClick={() => showToast("Published complete weekly timetable to Faculty & Student portals.")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 18px",
              backgroundColor: "#047857",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(4, 120, 87, 0.2)",
              transition: "all 0.15s ease"
            }}
          >
            <Send size={15} /> Publish Timetable
          </button>
        </div>
      </div>

      {/* Top Stats Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", flexShrink: 0 }}>
            <BookOpen size={18} style={{ margin: "auto" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Total Weekly Slots</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>{timetableSlots.length} Classes</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", flexShrink: 0 }}>
            <Layers size={18} style={{ margin: "auto" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Active Sections</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>3 (Sec A, B, C)</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#f0fdf4", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#047857", flexShrink: 0 }}>
            <Clock size={18} style={{ margin: "auto" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Lab Hours / Week</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>18 Practical Hrs</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#f0fdf4", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#047857", flexShrink: 0 }}>
            <CheckCircle2 size={18} style={{ margin: "auto" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Schedule Status</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#047857" }}>0 Conflicts</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div style={{
        display: "flex",
        gap: "6px",
        backgroundColor: "#ffffff",
        padding: "5px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0"
      }}>
        <button
          onClick={() => setActiveTab("master")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "7px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
            backgroundColor: activeTab === "master" ? "#f0fdf4" : "transparent",
            color: activeTab === "master" ? "#047857" : "#64748b",
            transition: "all 0.15s ease"
          }}
        >
          <Calendar size={16} /> Master Department Timetable
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "7px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
            backgroundColor: activeTab === "ai" ? "#f0fdf4" : "transparent",
            color: activeTab === "ai" ? "#047857" : "#64748b",
            transition: "all 0.15s ease"
          }}
        >
          <Sparkles size={16} /> AI Weekly Generator
        </button>

        <button
          onClick={() => setActiveTab("excel")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "7px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
            backgroundColor: activeTab === "excel" ? "#f0fdf4" : "transparent",
            color: activeTab === "excel" ? "#047857" : "#64748b",
            transition: "all 0.15s ease"
          }}
        >
          <FileSpreadsheet size={16} /> Import Excel Schedule
        </button>
      </div>

      {/* ================= TAB 1: MASTER TIMETABLE (GRID & LIST VIEWS) ================= */}
      {activeTab === "master" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* Controls Bar */}
          <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap"
          }}>
            {/* Left: Section Filter Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.03em" }}>Section:</span>
              {["Sec A", "Sec B", "Sec C", "ALL"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "6px",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: selectedSection === sec ? "1px solid #047857" : "1px solid #e2e8f0",
                    backgroundColor: selectedSection === sec ? "#f0fdf4" : "#ffffff",
                    color: selectedSection === sec ? "#047857" : "#475569",
                    transition: "all 0.15s ease"
                  }}
                >
                  {sec === "ALL" ? "All Sections" : sec}
                </button>
              ))}
            </div>

            {/* Right: Search & View Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Search Bar */}
              <div style={{ position: "relative", width: "220px" }}>
                <Search size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="text"
                  placeholder="Search subject, faculty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 10px 6px 32px",
                    fontSize: "0.825rem",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    outline: "none"
                  }}
                />
              </div>

              {/* View Switcher: Grid vs List */}
              <div style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  title="Weekly Grid Matrix View"
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    backgroundColor: viewMode === "grid" ? "#047857" : "#ffffff",
                    color: viewMode === "grid" ? "#ffffff" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    fontWeight: 600
                  }}
                >
                  <Grid size={14} /> Matrix
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List View"
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    backgroundColor: viewMode === "list" ? "#047857" : "#ffffff",
                    color: viewMode === "list" ? "#ffffff" : "#64748b",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    fontWeight: 600
                  }}
                >
                  <List size={14} /> List
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: WEEKLY MATRIX GRID VIEW (Intuitive Calendar Layout) */}
          {viewMode === "grid" && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              
              {/* Day Columns Header */}
              <div style={{ display: "grid", gridTemplateColumns: "130px repeat(5, 1fr)", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ padding: "12px", fontWeight: 700, fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", borderRight: "1px solid #e2e8f0", display: "flex", alignItems: "center" }}>
                  Time Slot
                </div>
                {DAYS.map(day => (
                  <div key={day} style={{ padding: "12px", textAlign: "center", fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", borderRight: "1px solid #e2e8f0" }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots Rows */}
              <div>
                {[
                  "09:00 AM - 10:30 AM",
                  "10:45 AM - 12:15 PM",
                  "01:30 PM - 03:00 PM",
                  "01:30 PM - 04:30 PM",
                  "03:15 PM - 04:45 PM"
                ].map((slotTime, idx) => {
                  return (
                    <div key={slotTime} style={{ display: "grid", gridTemplateColumns: "130px repeat(5, 1fr)", borderBottom: idx < 4 ? "1px solid #f1f5f9" : "none", minHeight: "100px" }}>
                      
                      {/* Time Label Column */}
                      <div style={{ padding: "12px", backgroundColor: "#fafafa", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a" }}>{slotTime.split(" - ")[0]}</span>
                        <span style={{ fontSize: "0.72rem", color: "#64748b" }}>to {slotTime.split(" - ")[1]}</span>
                      </div>

                      {/* Day Grid Cells */}
                      {DAYS.map(day => {
                        // Find matching slot for this section, day, and time
                        const cellSlots = filteredSlots.filter(s => {
                          const sameDay = s.day === day;
                          // Standardize time match
                          const sameTime = s.time === slotTime || (slotTime === "01:30 PM - 03:00 PM" && s.time === "01:30 PM - 04:30 PM");
                          return sameDay && sameTime;
                        });

                        return (
                          <div key={day} style={{ padding: "8px", borderRight: "1px solid #e2e8f0", backgroundColor: cellSlots.length > 0 ? "#ffffff" : "#fdfdfd", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {cellSlots.length === 0 ? (
                              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", fontSize: "0.75rem", fontStyle: "italic" }}>
                                Free Slot
                              </div>
                            ) : (
                              cellSlots.map(slot => {
                                const typeStyle = getTypeBadgeStyle(slot.type);
                                return (
                                  <div
                                    key={slot.id}
                                    style={{
                                      backgroundColor: typeStyle.backgroundColor,
                                      border: `1px solid ${typeStyle.borderColor}`,
                                      borderRadius: "8px",
                                      padding: "8px 10px",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "4px",
                                      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                                      position: "relative"
                                    }}
                                  >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: typeStyle.color }}>{slot.code}</span>
                                      <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "1px 5px", borderRadius: "4px", backgroundColor: "#ffffff", border: `1px solid ${typeStyle.borderColor}`, color: typeStyle.color }}>
                                        {slot.type}
                                      </span>
                                    </div>

                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
                                      {slot.name}
                                    </div>

                                    <div style={{ fontSize: "0.725rem", color: "#475569", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                                      <User size={11} color="#64748b" /> {slot.faculty}
                                    </div>

                                    <div style={{ fontSize: "0.725rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                                      <MapPin size={11} color="#64748b" /> {slot.room}
                                    </div>

                                    {/* Action buttons on card bottom */}
                                    <div style={{ display: "flex", gap: "6px", marginTop: "4px", paddingTop: "4px", borderTop: "1px solid rgba(0,0,0,0.05)", justifyContent: "flex-end" }}>
                                      <button
                                        onClick={() => setEditingSlot(slot)}
                                        style={{ border: "none", background: "none", cursor: "pointer", color: "#475569", padding: "2px", display: "flex", alignItems: "center" }}
                                        title="Edit Slot"
                                      >
                                        <Edit3 size={12} />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setTimetableSlots(timetableSlots.filter(s => s.id !== slot.id));
                                          showToast("Slot deleted.");
                                        }}
                                        style={{ border: "none", background: "none", cursor: "pointer", color: "#dc2626", padding: "2px", display: "flex", alignItems: "center" }}
                                        title="Delete Slot"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        );
                      })}

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* VIEW MODE 2: LIST VIEW */}
          {viewMode === "list" && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              {filteredSlots.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px", color: "#64748b", fontSize: "0.875rem" }}>
                  No timetable slots found matching your filters.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filteredSlots.map(slot => {
                    const typeStyle = getTypeBadgeStyle(slot.type);
                    return (
                      <div
                        key={slot.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "4px 8px", borderRadius: "6px", backgroundColor: typeStyle.backgroundColor, color: typeStyle.color, border: `1px solid ${typeStyle.borderColor}` }}>
                            {slot.section}
                          </span>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>{slot.code}: {slot.name}</span>
                              <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 6px", borderRadius: "4px", backgroundColor: typeStyle.backgroundColor, color: typeStyle.color }}>{slot.type}</span>
                            </div>
                            <div style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "2px", display: "flex", gap: "16px" }}>
                              <span><User size={12} style={{ display: "inline", marginRight: 4 }} /> Faculty: <strong>{slot.faculty}</strong></span>
                              <span><MapPin size={12} style={{ display: "inline", marginRight: 4 }} /> Room: <strong>{slot.room}</strong></span>
                              <span><Clock size={12} style={{ display: "inline", marginRight: 4 }} /> Day: <strong>{slot.day} ({slot.time})</strong></span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => setEditingSlot(slot)}
                            style={{ padding: "6px 12px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: "#334155" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setTimetableSlots(timetableSlots.filter(s => s.id !== slot.id));
                              showToast("Slot deleted.");
                            }}
                            style={{ padding: "6px 12px", backgroundColor: "#ffffff", border: "1px solid #fecaca", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: "#dc2626" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2: AI WEEKLY GENERATOR ================= */}
      {activeTab === "ai" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", backgroundColor: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#047857" }}>
                <Sparkles size={20} style={{ margin: "auto" }} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  Automated AI Timetable Scheduler
                </h2>
                <p style={{ fontSize: "0.825rem", color: "#64748b", margin: "2px 0 0 0" }}>
                  Optimizes course slots across Sections A, B & C without faculty overlaps or room double-booking.
                </p>
              </div>
            </div>

            {/* Parameter Settings */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "20px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>Target Department</label>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", marginTop: "4px" }}>Computer Science & Eng.</div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>Semester & Scope</label>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", marginTop: "4px" }}>Semester 6 (Sec A, B, C)</div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>Optimization Target</label>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#047857", marginTop: "4px" }}>Zero Conflicts • Balanced Labs</div>
              </div>
            </div>

            <button
              onClick={handleRunAi}
              disabled={isGenerating}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 24px",
                backgroundColor: "#047857",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(4, 120, 87, 0.2)",
                transition: "all 0.15s ease"
              }}
            >
              <Sparkles size={16} />
              {isGenerating ? "Analyzing Constraints & Generating..." : "Run AI Timetable Optimization"}
            </button>
          </div>

          {/* AI Generated Preview Matrix */}
          {aiSuccess && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#047857", backgroundColor: "#f0fdf4", padding: "3px 8px", borderRadius: "4px" }}>
                    GENERATION COMPLETE
                  </span>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "4px 0 0 0" }}>
                    Generated Weekly Schedule Matrix
                  </h3>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Section selector for AI Preview */}
                  {["Sec A", "Sec B", "Sec C"].map(sec => (
                    <button
                      key={sec}
                      onClick={() => setAiPreviewSection(sec)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: aiPreviewSection === sec ? "1px solid #047857" : "1px solid #e2e8f0",
                        backgroundColor: aiPreviewSection === sec ? "#f0fdf4" : "#ffffff",
                        color: aiPreviewSection === sec ? "#047857" : "#475569"
                      }}
                    >
                      {sec}
                    </button>
                  ))}

                  <button
                    onClick={() => showToast("Applied generated timetable to master schedule.")}
                    style={{ padding: "8px 16px", backgroundColor: "#047857", color: "#ffffff", border: "none", borderRadius: "7px", fontWeight: 600, fontSize: "0.825rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Check size={14} /> Apply Schedule
                  </button>
                </div>
              </div>

              {/* 5-Day Columns */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                {DAYS.map(day => {
                  const daySlots = timetableSlots.filter(s => s.day === day && s.section === aiPreviewSection);
                  return (
                    <div key={day} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                      <div style={{ backgroundColor: "#047857", color: "#ffffff", padding: "8px", fontWeight: 700, fontSize: "0.8rem", textAlign: "center" }}>
                        {day}
                      </div>
                      <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {daySlots.map(s => {
                          const typeStyle = getTypeBadgeStyle(s.type);
                          return (
                            <div key={s.id} style={{ backgroundColor: "#ffffff", border: `1px solid ${typeStyle.borderColor}`, borderRadius: "6px", padding: "8px", fontSize: "0.75rem" }}>
                              <div style={{ fontWeight: 700, color: typeStyle.color, marginBottom: "2px" }}>{s.code}</div>
                              <div style={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>{s.name}</div>
                              <div style={{ color: "#64748b", fontSize: "0.7rem" }}>{s.faculty}</div>
                              <div style={{ color: "#64748b", fontSize: "0.7rem" }}>{s.room}</div>
                              <div style={{ color: "#047857", fontWeight: 600, fontSize: "0.7rem", marginTop: "3px" }}>{s.time}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 3: IMPORT EXCEL SCHEDULE ================= */}
      {activeTab === "excel" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <FileSpreadsheet size={18} color="#047857" /> Import Department Excel Timetable Sheet
            </h3>

            {/* Process Steps */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
              <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.8rem" }}>
                <strong style={{ color: "#047857" }}>1. Select File:</strong> Upload standard .xlsx timetable
              </div>
              <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.8rem" }}>
                <strong style={{ color: "#047857" }}>2. AI Validation:</strong> Check rooms, labs & faculty slots
              </div>
              <div style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.8rem" }}>
                <strong style={{ color: "#047857" }}>3. Import:</strong> Sync entries directly into Master Grid
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div 
              onClick={() => handleFileUpload("CSE_Semester6_Schedule.xlsx")}
              style={{
                border: "2px dashed #a7f3d0",
                backgroundColor: "#f0fdf4",
                borderRadius: "10px",
                padding: "32px",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease"
              }}
            >
              <Upload size={32} color="#047857" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>
                {uploadedFile ? `File Loaded: ${uploadedFile}` : "Click or drag Excel sheet (.xlsx) to import"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
                Supports multi-section weekly course schedules for Sec A, B & C
              </div>
            </div>

            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button 
                onClick={() => showToast("Downloading standard Timetable Excel template.")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "#334155" }}
              >
                <Download size={14} /> Download Sample Template (.xlsx)
              </button>
            </div>
          </div>

          {/* Parsed Excel Records Preview */}
          {parsedRows.length > 0 && (
            <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  Validated Excel Entries ({parsedRows.length} Records)
                </h4>
                <button
                  onClick={() => showToast("Imported entries to Master Timetable.")}
                  style={{ padding: "7px 16px", backgroundColor: "#047857", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "0.825rem", cursor: "pointer" }}
                >
                  Import Selected Records
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "8px 12px" }}>Section</th>
                    <th style={{ padding: "8px 12px" }}>Day & Slot</th>
                    <th style={{ padding: "8px 12px" }}>Course</th>
                    <th style={{ padding: "8px 12px" }}>Faculty</th>
                    <th style={{ padding: "8px 12px" }}>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedRows.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "8px 12px" }}><span style={{ fontWeight: 700, color: "#047857", backgroundColor: "#ecfdf5", padding: "2px 6px", borderRadius: "4px" }}>{r.section}</span></td>
                      <td style={{ padding: "8px 12px" }}>{r.day} ({r.time})</td>
                      <td style={{ padding: "8px 12px", fontWeight: 600 }}>{r.code}: {r.title}</td>
                      <td style={{ padding: "8px 12px" }}>{r.faculty}</td>
                      <td style={{ padding: "8px 12px" }}>{r.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

      {/* EDIT MODAL */}
      {editingSlot && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", width: "420px", padding: "20px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>Edit Class Slot ({editingSlot.section})</h3>
              <button onClick={() => setEditingSlot(null)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.825rem" }}>
              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Day of Week</label>
                <select value={editingSlot.day} onChange={(e) => setEditingSlot({...editingSlot, day: e.target.value as any})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Course Name</label>
                <input type="text" value={editingSlot.name} onChange={(e) => setEditingSlot({...editingSlot, name: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Faculty Lead</label>
                <input type="text" value={editingSlot.faculty} onChange={(e) => setEditingSlot({...editingSlot, faculty: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Room Allocation</label>
                <input type="text" value={editingSlot.room} onChange={(e) => setEditingSlot({...editingSlot, room: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Time Slot</label>
                <input type="text" value={editingSlot.time} onChange={(e) => setEditingSlot({...editingSlot, time: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" onClick={() => setEditingSlot(null)} style={{ padding: "7px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "7px 14px", backgroundColor: "#047857", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", width: "420px", padding: "20px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#0f172a" }}>Add Class Slot</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateSlot} style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.825rem" }}>
              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Section</label>
                <select value={newSlotForm.section} onChange={(e) => setNewSlotForm({...newSlotForm, section: e.target.value as any})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }}>
                  <option value="Sec A">Sec A</option>
                  <option value="Sec B">Sec B</option>
                  <option value="Sec C">Sec C</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Day of Week</label>
                <select value={newSlotForm.day} onChange={(e) => setNewSlotForm({...newSlotForm, day: e.target.value as any})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Class Type</label>
                <select value={newSlotForm.type} onChange={(e) => setNewSlotForm({...newSlotForm, type: e.target.value as any})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }}>
                  <option value="Lecture">Lecture</option>
                  <option value="Lab">Lab</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Course Name</label>
                <input type="text" placeholder="e.g. Database Systems" value={newSlotForm.name} onChange={(e) => setNewSlotForm({...newSlotForm, name: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Faculty Lead</label>
                <input type="text" placeholder="e.g. Dr. Sarah Jenkins" value={newSlotForm.faculty} onChange={(e) => setNewSlotForm({...newSlotForm, faculty: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#475569" }}>Room Allocation</label>
                <input type="text" placeholder="e.g. AB2 - Hall 405" value={newSlotForm.room} onChange={(e) => setNewSlotForm({...newSlotForm, room: e.target.value})} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", marginTop: "3px" }} />
              </div>

              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: "7px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "7px 14px", backgroundColor: "#047857", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}>Add Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
