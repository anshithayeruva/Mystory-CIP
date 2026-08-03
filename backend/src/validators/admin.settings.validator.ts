import { z } from 'zod';

export const updateInstitutionSchema = z.object({
  name: z.string().min(1, 'Institution name is required'),
  code: z.string().optional(),
  type: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  status: z.boolean().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  contactNumber: z.string().optional(),
  academicYear: z.string().optional(),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
});

export const updateAcademicSchema = z.object({
  attendanceModel: z.string().optional(),
  minQuestionAttempt: z.number().min(0).max(100).optional(),
  minSessionTime: z.number().min(0).optional(),
  allowLateSubmission: z.boolean().optional(),
  deviceVerification: z.boolean().optional(),
  
  passingPercentage: z.number().min(0).max(100).optional(),
  defaultDuration: z.number().min(1).optional(),
  maxAttempts: z.number().min(1).optional(),
  allowRetests: z.boolean().optional(),
  randomizeQuestions: z.boolean().optional(),
  
  marksPerQuestion: z.number().min(0).optional(),
  partialMarking: z.boolean().optional(),
  negativeMarking: z.boolean().optional(),
  difficultyBasedMarks: z.boolean().optional(),
  staffOverride: z.boolean().optional(),
  
  visScore: z.boolean().optional(),
  visCorrectAnswers: z.boolean().optional(),
  visExplanations: z.boolean().optional(),
  visClassAverage: z.boolean().optional(),
  visRank: z.boolean().optional(),
});

export const updateSecuritySchema = z.object({
  pwdMinLength: z.number().min(6).optional(),
  pwdRequireUppercase: z.boolean().optional(),
  pwdRequireNumbers: z.boolean().optional(),
  pwdRequireSpecial: z.boolean().optional(),
  
  sessionTimeoutMins: z.number().min(1).max(1440).optional(),
  autoLogout: z.boolean().optional(),
  concurrentLoginLimit: z.string().optional(),
  
  twoFactorAuth: z.boolean().optional(),
  otpLogin: z.boolean().optional(),
});

export const updateIntegrationSchema = z.object({
  erpSystem: z.boolean().optional(),
  moodle: z.boolean().optional(),
  googleClassroom: z.boolean().optional(),
  microsoftTeams: z.boolean().optional(),
  canvas: z.boolean().optional(),
});
