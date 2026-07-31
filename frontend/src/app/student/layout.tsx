import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./student-layout.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal | MyStory CIP",
  description: "University Academic Management Student Portal",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.studentContainer}>
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
