import { z } from 'zod';
import { Role } from '@prisma/client';

export const createUserSchema = z.object({
  userType: z.enum(['student', 'faculty', 'hod']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  sendWelcomeEmail: z.boolean().optional(),
  forcePasswordChange: z.boolean().optional(),
  isActive: z.boolean().optional().default(true),
  
  // Student specific
  program: z.string().optional(),
  semester: z.string().optional(), // We'll extract number or map to ID
  section: z.string().optional(),
  rollNumber: z.string().optional(),
  admissionYear: z.string().optional(),
  
  // Faculty / HoD specific
  designation: z.string().optional(),
  employmentType: z.string().optional(),
  employeeId: z.string().optional(),
  joiningDate: z.string().optional(),
  officeExtension: z.string().optional(),
}).refine((data) => {
  if (data.userType === 'student') {
    return !!data.program && !!data.semester && !!data.section && !!data.admissionYear && !!data.rollNumber;
  }
  return true;
}, {
  message: "Student specific fields (program, semester, section, rollNumber, admissionYear) are required for student users.",
}).refine((data) => {
  if (data.userType === 'faculty') {
    return !!data.designation && !!data.employeeId;
  }
  return true;
}, {
  message: "Faculty specific fields (designation, employeeId) are required for faculty users."
});
