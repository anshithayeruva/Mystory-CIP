"use client";

import React, { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, CheckCheck } from "lucide-react";
import styles from "../student.module.css";
import { MESSAGE_THREADS, MessageThread } from "../mockData";

export default function StudentMessagesPage() {
  const [selectedThread, setSelectedThread] = useState<MessageThread>(MESSAGE_THREADS[0]);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Aris Thorne", text: "Hello Nitya, I reviewed your Dijkstra pathfinding analysis submission.", time: "10:10 AM", isSelf: false },
    { id: 2, sender: "Nitya Nara", text: "Thank you Dr. Thorne! Did the time complexity benchmark match the expected bound?", time: "10:12 AM", isSelf: true },
    { id: 3, sender: "Dr. Aris Thorne", text: "Yes, your graph generator handled sparse vs dense graphs correctly. Good job!", time: "10:15 AM", isSelf: false },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "Nitya Nara", text: inputText, time: "Just now", isSelf: true }
    ]);
    setInputText("");
  };

  return (
    <div className={styles.pageContainer}>
      {/* Admin Clean Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Student & Faculty Messaging</h1>
          <p className={styles.welcomeSubtitle}>
            Direct academic discussions with course professors, faculty advisors, and class project groups.
          </p>
        </div>
        <div className={styles.bannerMeta}>
          <div className={styles.metaPill}>
            Academic Chat
          </div>
        </div>
      </div>

      {/* Messaging Grid */}
      <div className={styles.card} style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "300px 1fr", height: "600px" }}>
        
        {/* Left Thread List */}
        <div style={{ borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
          <div style={{ padding: "14px", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search conversations..."
                className={styles.filterInput}
                style={{ paddingLeft: 32, width: "100%", minWidth: 0, boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {MESSAGE_THREADS.map((thread) => (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid #e2e8f0",
                  cursor: "pointer",
                  backgroundColor: selectedThread.id === thread.id ? "#ffffff" : "transparent",
                  borderLeft: selectedThread.id === thread.id ? "3px solid #00522E" : "3px solid transparent",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center"
                }}
              >
                <img src={thread.avatar} alt={thread.name} style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {thread.name}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{thread.lastTime}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {thread.lastMessage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
          {/* Chat Header */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={selectedThread.avatar} alt={selectedThread.name} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>{selectedThread.name}</div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{selectedThread.role}</div>
              </div>
            </div>
            <MoreVertical size={18} color="#64748b" style={{ cursor: "pointer" }} />
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#f8fafc" }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.isSelf ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                  backgroundColor: m.isSelf ? "#00522E" : "#ffffff",
                  color: m.isSelf ? "#ffffff" : "#0f172a",
                  padding: "10px 14px",
                  borderRadius: m.isSelf ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                  border: m.isSelf ? "none" : "1px solid #e2e8f0"
                }}
              >
                <div style={{ fontSize: "0.68rem", opacity: 0.8, marginBottom: "2px", fontWeight: 600 }}>{m.sender}</div>
                <div style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>{m.text}</div>
                <div style={{ fontSize: "0.65rem", opacity: 0.7, textAlign: "right", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3 }}>
                  {m.time} {m.isSelf && <CheckCheck size={11} />}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} style={{ padding: "14px 16px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", alignItems: "center" }}>
            <Paperclip size={18} color="#64748b" style={{ cursor: "pointer" }} />
            <input
              type="text"
              placeholder="Type your academic query or message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={styles.filterInput}
              style={{ flex: 1 }}
            />
            <button type="submit" className={styles.btnPrimary}>
              <Send size={14} /> Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
