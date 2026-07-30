"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";
import HeaderArea from "./components/HeaderArea";
import FormFields from "./components/FormFields";
import ActionBar from "./components/ActionBar";

export default function CreateUserPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "faculty" | "hod">("student");
  const [formData, setFormData] = useState<any>({
    firstName: "", lastName: "", phoneNumber: "", department: "Computer Science",
    sendWelcomeEmail: true, forcePasswordChange: true, isActive: true,
    program: "B.Sc Computer Science", semester: "Semester 1", section: "", rollNumber: "", admissionYear: "2024",
    designation: "", employmentType: "Full-time", employeeId: "", joiningDate: "", officeExtension: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const payload = { ...formData, userType };
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('createdUser', JSON.stringify(data.data));
        router.push("/admin/user-management/success");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create user");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.scrollArea}>
        <HeaderArea userType={userType} />
        
        <div className={styles.contentGrid}>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <FormFields userType={userType} setUserType={setUserType} formData={formData} setFormData={setFormData} />
        </div>
      </div>
      
      <ActionBar onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
