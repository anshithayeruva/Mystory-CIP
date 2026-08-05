import React from 'react';
import { Construction } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ backgroundColor: "#e2e8f0", padding: "20px", borderRadius: "50%" }}>
          <Construction size={48} color="#64748b" />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Learning Resources</h2>
        <p style={{ color: "#64748b", maxWidth: "400px" }}>The file and repository management interface for course resources is under construction.</p>
      </div>
    </div>
  );
}
