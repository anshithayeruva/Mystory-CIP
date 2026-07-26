"use client";

import { useState } from "react";
import styles from "./create.module.css";
import HeaderArea from "./components/HeaderArea";
import FormFields from "./components/FormFields";
import ActionBar from "./components/ActionBar";

export default function CreateUserPage() {
  const [userType, setUserType] = useState<"student" | "faculty" | "hod">("student");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.scrollArea}>
        <HeaderArea userType={userType} />
        
        <div className={styles.contentGrid}>
          <FormFields userType={userType} setUserType={setUserType} />
        </div>
      </div>
      
      <ActionBar />
    </div>
  );
}
