import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./admin-layout.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | MyStory CIP",
  description: "Institution Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
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
