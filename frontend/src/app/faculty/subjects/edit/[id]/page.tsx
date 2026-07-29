/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SubjectForm from '../../SubjectForm';

export default function EditSubjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await fetch(`/api/faculty/subjects/${id}`);
        if (res.ok) {
          const json = await res.json();
          setInitialData(json.data);
        } else {
          router.push('/faculty/subjects');
        }
      } catch (error) {
        console.error("Failed to fetch subject", error);
        router.push('/faculty/subjects');
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [id, router]);

  if (loading) {
    return <div style={{ padding: '24px' }}>Loading subject details...</div>;
  }

  if (!initialData) {
    return <div style={{ padding: '24px' }}>Subject not found.</div>;
  }

  return <SubjectForm isEdit={true} initialData={initialData} subjectId={id} />;
}
