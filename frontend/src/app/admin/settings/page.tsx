"use client";

import React, { useState } from "react";
import styles from "./settings.module.css";
import InstitutionTab from "./components/InstitutionTab";
import AcademicTab from "./components/AcademicTab";
import SecurityTab from "./components/SecurityTab";
import IntegrationsTab from "./components/IntegrationsTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Institution");

  const tabs = ["Institution", "Academic", "Security", "Integrations"];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <h1 className={styles.title} style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)' }}>Settings</h1>
          </div>
          <p className={styles.subtitle}>
            {activeTab === "Institution" && "Manage your institution settings and platform configuration."}
            {activeTab === "Academic" && "Manage your institution's global academic parameters and evaluation rules."}
            {activeTab === "Security" && "Configure platform security, authentication policies, and monitor system activity."}
            {activeTab === "Integrations" && "Configure your institutional workspace and connected services."}
          </p>
        </div>
        
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {activeTab === "Institution" && <InstitutionTab />}
        {activeTab === "Academic" && <AcademicTab />}
        {activeTab === "Security" && <SecurityTab />}
        {activeTab === "Integrations" && <IntegrationsTab />}
      </div>
    </div>
  );
}
