import {
  PulseSessionStatus,
  PulseTimerStatus,
} from '@prisma/client';

export { PulseSessionStatus, PulseTimerStatus };

export interface SessionCodeResponse {
  sessionId: string;
  sessionCode: string;
  isCodeActive: boolean;
  codeCreatedAt: Date | null;
  codeExpiresAt: Date | null;
  qrCodeUrl: string | null;
}

export interface QrCodeResponse {
  sessionId: string;
  sessionCode: string;
  qrCodeUrl: string;
  isCodeActive: boolean;
}

export interface TimerStatusResponse {
  sessionId: string;
  timerStatus: PulseTimerStatus;
  durationMinutes: number;
  actualStartTime: Date | null;
  actualEndTime: Date | null;
  remainingSeconds: number;
}

export interface SessionStatusResponse {
  sessionId: string;
  status: PulseSessionStatus;
  updatedAt: Date;
}
