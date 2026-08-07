"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Settings2, Check, Edit2, Trash2, RefreshCw, Save, Send } from "lucide-react";
import styles from "../pulse-sessions.module.css";
import { FacultyService } from "@/services/faculty.service";

interface GeneratedQuestion {
  id: string;
  text: string;
  type: string;
  difficulty: "Easy" | "Medium" | "Hard";
  options?: string[];
  correctAnswer: string;
}

const MOCK_GENERATED_QUESTIONS: GeneratedQuestion[] = [
  {
    id: "q1",
    text: "What is the primary characteristic of an Array data structure?",
    type: "MCQ",
    difficulty: "Easy",
    options: ["Dynamic size", "Contiguous memory allocation", "LIFO access", "Key-value pairs"],
    correctAnswer: "Contiguous memory allocation"
  },
  {
    id: "q2",
    text: "A linked list allows constant-time random access to any element.",
    type: "True/False",
    difficulty: "Medium",
    options: ["True", "False"],
    correctAnswer: "False"
  },
  {
    id: "q3",
    text: "Explain the main difference between a Stack and a Queue.",
    type: "Short Answer",
    difficulty: "Medium",
    correctAnswer: "A Stack follows Last-In-First-Out (LIFO) while a Queue follows First-In-First-Out (FIFO) principle."
  }
];

export default function CreatePulseSessionPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "generating" | "questions">("form");

  // Form states
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState("5");
  const [duration, setDuration] = useState("10");
  const [questionTypes, setQuestionTypes] = useState<string[]>(["MCQ"]);

  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);

  const handleToggleType = (type: string) => {
    setQuestionTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !section || !topic) return alert("Please fill in required fields.");
    
    setStep("generating");
    
    // Simulate AI Generation
    setTimeout(() => {
      setQuestions([...MOCK_GENERATED_QUESTIONS]);
      setStep("questions");
    }, 2000);
  };

  const handlePublish = async () => {
    try {
      const res = await FacultyService.createPulseSession({
        title: topic || "AI Assessment",
        questionCount: parseInt(numQuestions) || 5,
        durationMinutes: parseInt(duration) || 10,
        difficultyLevel: difficulty.toUpperCase(),
        questionType: questionTypes[0] || "MCQ",
        section: section || "A",
        date: new Date().toISOString()
      });
      if (res && res.data && res.data.id) {
        router.push(`/faculty/pulse-sessions/${res.data.id}/live`);
        return;
      }
    } catch (err) {
      console.warn("Pulse session creation warning, redirecting to list:", err);
    }
    router.push(`/faculty/pulse-sessions`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Create AI Assessment</h1>
          <p className={styles.subtitle}>
            Configure the assessment details and let AI generate questions based on the topic taught.
          </p>
        </div>
        <Link href="/faculty/pulse-sessions" className={styles.secondaryButton}>
          <ArrowLeft size={16} />
          Back to Assessments
        </Link>
      </div>

      <div className={styles.mainCard} style={{ overflow: "hidden" }}>
        {step === "form" && (
          <form onSubmit={handleGenerate} style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Subject *</label>
                <select 
                  className={styles.selectInput} 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Database Management">Database Management</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Section *</label>
                <select 
                  className={styles.selectInput} 
                  value={section} 
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="">Select Section</option>
                  <option value="CSE-A">CSE-A</option>
                  <option value="CSE-B">CSE-B</option>
                  <option value="IT-A">IT-A</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Topic Covered *</label>
              <input 
                type="text"
                className={styles.searchInput}
                style={{ paddingLeft: "12px" }}
                placeholder="e.g., Arrays, Linked Lists, Normalization"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Difficulty</label>
                <select 
                  className={styles.selectInput} 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Number of Questions</label>
                <input 
                  type="number"
                  className={styles.searchInput}
                  style={{ paddingLeft: "12px" }}
                  min="1" max="50"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Duration (minutes)</label>
                <input 
                  type="number"
                  className={styles.searchInput}
                  style={{ paddingLeft: "12px" }}
                  min="1" max="120"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>Question Types</label>
              <div style={{ display: "flex", gap: "16px" }}>
                {["MCQ", "True/False", "Short Answer"].map(type => (
                  <label key={type} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.875rem" }}>
                    <input 
                      type="checkbox"
                      checked={questionTypes.includes(type)}
                      onChange={() => handleToggleType(type)}
                      style={{ width: "16px", height: "16px", accentColor: "#10633b" }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              <button type="submit" className={styles.primaryButton} style={{ padding: "12px 24px", fontSize: "1rem" }}>
                <Sparkles size={20} />
                Generate Questions
              </button>
            </div>
          </form>
        )}

        {step === "generating" && (
          <div style={{ padding: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ animation: "spin 2s linear infinite" }}>
              <Settings2 size={48} color="#94a3b8" />
            </div>
            <h2 style={{ color: "var(--text-main)" }}>Generating Assessment...</h2>
            <p style={{ color: "var(--text-muted)" }}>Analyzing {topic} curriculum and crafting questions.</p>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin { 100% { transform: rotate(360deg); } }
            `}} />
          </div>
        )}

        {step === "questions" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", color: "var(--text-main)", marginBottom: "4px" }}>AI Generated Questions</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Review, edit, or regenerate the questions below before publishing.</p>
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "0.875rem" }}>
                <span style={{ backgroundColor: "#e2e8f0", padding: "4px 12px", borderRadius: "99px", fontWeight: 600 }}>{numQuestions} Questions</span>
                <span style={{ backgroundColor: "#e2e8f0", padding: "4px 12px", borderRadius: "99px", fontWeight: 600 }}>{duration} mins</span>
              </div>
            </div>

            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {questions.map((q, index) => (
                <div key={q.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                  <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-main)" }}>Q{index + 1}</span>
                      <div>
                        <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-main)", marginBottom: "8px" }}>{q.text}</p>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span style={{ fontSize: "0.75rem", padding: "2px 8px", backgroundColor: "#f1f5f9", borderRadius: "4px", color: "#475569" }}>{q.type}</span>
                          <span style={{ fontSize: "0.75rem", padding: "2px 8px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px", color: "#475569", fontWeight: 600 }}>{q.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ padding: "8px", background: "none", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600, transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button style={{ padding: "8px", background: "none", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600, transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <RefreshCw size={14} /> Regenerate
                      </button>
                      <button style={{ padding: "8px", background: "none", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", color: "var(--text-muted)", transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    {q.options && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                        {q.options.map((opt, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "var(--text-main)" }}>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: opt === q.correctAnswer ? "5px solid #10633b" : "1px solid #cbd5e1" }} />
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", padding: "12px", backgroundColor: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", color: "var(--text-main)" }}>
                      <Check size={16} color="#10633b" />
                      <strong>Correct Answer:</strong> {q.correctAnswer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "24px 32px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: "16px", backgroundColor: "#f8fafc" }}>
              <button 
                onClick={() => alert("Assessment saved as draft.")}
                className={styles.primaryButton} 
                style={{ backgroundColor: "#ffffff", color: "#475569", border: "1px solid #cbd5e1" }}
              >
                <Save size={16} />
                Save as Draft
              </button>
              <button onClick={handlePublish} className={styles.primaryButton}>
                <Send size={16} />
                Publish Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
