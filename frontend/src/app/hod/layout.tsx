import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./hod-layout.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HoD Portal | MyStory CIP",
  description: "Head of Department Dashboard",
};

export default function HodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.hodContainer}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
