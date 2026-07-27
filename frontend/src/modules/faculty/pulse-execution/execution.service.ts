import db from '@/lib/db';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '@/lib/errors';
import {
  PulseSessionStatus,
  PulseTimerStatus,
  SessionCodeResponse,
  QrCodeResponse,
  TimerStatusResponse,
  SessionStatusResponse,
} from './execution.types';
import { Prisma, PulseSession } from '@prisma/client';
import { GenerateCodeInput } from './execution.validation';
import {
  generateAlphanumericCode,
  generateQrCodeDataUrl,
} from './execution.utils';

export class ExecutionService {
  /**
   * Helper: Resolves authenticated user ID and verifies faculty ownership of the session.
   */
  static async verifySessionOwnership(userId: string, sessionId: string) {
    const facultyProfile = await db.facultyProfile.findUnique({
      where: { userId },
    });

    if (!facultyProfile) {
      throw new ForbiddenError('Faculty profile not found for the current user.');
    }

    const session = await db.pulseSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundError('Pulse session not found.');
    }

    if (session.facultyId !== facultyProfile.id) {
      throw new ForbiddenError('You are not authorized to manage this pulse session.');
    }

    return { session, facultyProfile };
  }

  // ==========================================
  // 1. SESSION CODE GENERATION
  // ==========================================

  static async generateCode(
    userId: string,
    sessionId: string,
    input: GenerateCodeInput = { length: 6, expiresInHours: 24 }
  ): Promise<SessionCodeResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (
      session.status === PulseSessionStatus.LIVE ||
      session.status === PulseSessionStatus.PAUSED ||
      session.status === PulseSessionStatus.COMPLETED ||
      session.status === PulseSessionStatus.CLOSED ||
      session.status === PulseSessionStatus.ARCHIVED
    ) {
      throw new ConflictError('Cannot generate or regenerate session code after the session has started.');
    }

    let code = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      code = generateAlphanumericCode(input.length);
      const existing = await db.pulseSession.findUnique({
        where: { sessionCode: code },
      });
      if (!existing || existing.id === sessionId) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new ConflictError('Failed to generate a unique session code after multiple attempts. Please try again.');
    }

    const now = new Date();
    const codeExpiresAt = new Date(now.getTime() + input.expiresInHours * 3600 * 1000);
    const qrCodeUrl = await generateQrCodeDataUrl(code);

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        sessionCode: code,
        codeCreatedAt: now,
        codeExpiresAt,
        isCodeActive: true,
        qrCodeUrl,
      },
    });

    return {
      sessionId: updated.id,
      sessionCode: updated.sessionCode!,
      isCodeActive: updated.isCodeActive,
      codeCreatedAt: updated.codeCreatedAt,
      codeExpiresAt: updated.codeExpiresAt,
      qrCodeUrl: updated.qrCodeUrl,
    };
  }

  static async regenerateCode(
    userId: string,
    sessionId: string,
    input?: GenerateCodeInput
  ): Promise<SessionCodeResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (
      session.status === PulseSessionStatus.LIVE ||
      session.status === PulseSessionStatus.PAUSED ||
      session.status === PulseSessionStatus.COMPLETED ||
      session.status === PulseSessionStatus.CLOSED ||
      session.status === PulseSessionStatus.ARCHIVED
    ) {
      throw new ConflictError('Cannot regenerate session code once the session has started.');
    }

    return this.generateCode(userId, sessionId, input);
  }

  static async getCode(userId: string, sessionId: string): Promise<SessionCodeResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (!session.sessionCode) {
      throw new NotFoundError('Session code has not been generated for this session.');
    }

    return {
      sessionId: session.id,
      sessionCode: session.sessionCode,
      isCodeActive: session.isCodeActive,
      codeCreatedAt: session.codeCreatedAt,
      codeExpiresAt: session.codeExpiresAt,
      qrCodeUrl: session.qrCodeUrl,
    };
  }

  // ==========================================
  // 2. QR CODE GENERATION
  // ==========================================

  static async generateQrCode(userId: string, sessionId: string): Promise<QrCodeResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (!session.sessionCode) {
      throw new ConflictError('Session code must be generated before generating a QR code.');
    }

    const qrCodeUrl = await generateQrCodeDataUrl(session.sessionCode);

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: { qrCodeUrl },
    });

    return {
      sessionId: updated.id,
      sessionCode: updated.sessionCode!,
      qrCodeUrl: updated.qrCodeUrl!,
      isCodeActive: updated.isCodeActive,
    };
  }

  static async getQrCode(userId: string, sessionId: string): Promise<QrCodeResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (!session.qrCodeUrl || !session.sessionCode) {
      throw new NotFoundError('QR code has not been generated for this session.');
    }

    return {
      sessionId: session.id,
      sessionCode: session.sessionCode,
      qrCodeUrl: session.qrCodeUrl,
      isCodeActive: session.isCodeActive,
    };
  }

  // ==========================================
  // 3. SESSION TIMER
  // ==========================================

  private static formatTimerStatus(session: PulseSession, dynamicRemaining?: number): TimerStatusResponse {
    const duration = session.timerDurationMinutes || session.durationMinutes;
    const remaining = dynamicRemaining !== undefined ? dynamicRemaining : (session.timerRemainingSeconds ?? (duration * 60));

    return {
      sessionId: session.id,
      timerStatus: session.timerStatus,
      durationMinutes: duration,
      actualStartTime: session.timerActualStartTime || null,
      actualEndTime: session.timerActualEndTime || null,
      remainingSeconds: remaining,
    };
  }

  static async startTimer(
    userId: string,
    sessionId: string,
    durationMinutes?: number
  ): Promise<TimerStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (session.status !== PulseSessionStatus.LIVE) {
      throw new ConflictError('Timer can only be started when the session is Live.');
    }

    if (session.timerStatus === PulseTimerStatus.RUNNING) {
      throw new ConflictError('Timer is already running.');
    }

    const duration = durationMinutes || session.timerDurationMinutes || session.durationMinutes;
    const remaining = duration * 60;
    const now = new Date();

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        timerStatus: PulseTimerStatus.RUNNING,
        timerDurationMinutes: duration,
        timerActualStartTime: now,
        timerActualEndTime: null,
        timerRemainingSeconds: remaining,
      },
    });

    return this.formatTimerStatus(updated);
  }

  static async pauseTimer(userId: string, sessionId: string): Promise<TimerStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (session.timerStatus !== PulseTimerStatus.RUNNING) {
      throw new ConflictError('Timer can only be paused when it is currently running.');
    }

    const now = new Date();
    const startTime = session.timerActualStartTime || now;
    const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const initialRemaining = session.timerRemainingSeconds ?? (session.durationMinutes * 60);
    const remaining = Math.max(0, initialRemaining - elapsedSeconds);

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        timerStatus: PulseTimerStatus.PAUSED,
        timerRemainingSeconds: remaining,
      },
    });

    return this.formatTimerStatus(updated);
  }

  static async resumeTimer(userId: string, sessionId: string): Promise<TimerStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    if (session.timerStatus !== PulseTimerStatus.PAUSED) {
      throw new ConflictError('Timer can only be resumed when it is paused.');
    }

    if (session.status !== PulseSessionStatus.LIVE) {
      throw new ConflictError('Timer can only be resumed when the session is Live.');
    }

    const now = new Date();

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        timerStatus: PulseTimerStatus.RUNNING,
        timerActualStartTime: now, // Reference timestamp for next pause/end calculation
      },
    });

    return this.formatTimerStatus(updated);
  }

  static async endTimer(userId: string, sessionId: string): Promise<TimerStatusResponse> {
    await this.verifySessionOwnership(userId, sessionId);

    const now = new Date();

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: {
        timerStatus: PulseTimerStatus.COMPLETED,
        timerActualEndTime: now,
        timerRemainingSeconds: 0,
      },
    });

    return this.formatTimerStatus(updated);
  }

  static async getTimerStatus(userId: string, sessionId: string): Promise<TimerStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    let status = session.timerStatus;
    let endTime = session.timerActualEndTime;
    const duration = session.timerDurationMinutes || session.durationMinutes;
    let remaining = session.timerRemainingSeconds ?? (duration * 60);

    if (status === PulseTimerStatus.RUNNING && session.timerActualStartTime) {
      const elapsed = Math.floor((Date.now() - session.timerActualStartTime.getTime()) / 1000);
      remaining = Math.max(0, remaining - elapsed);

      if (remaining === 0) {
        status = PulseTimerStatus.COMPLETED;
        endTime = new Date();
        await db.pulseSession.update({
          where: { id: sessionId },
          data: {
            timerStatus: PulseTimerStatus.COMPLETED,
            timerRemainingSeconds: 0,
            timerActualEndTime: endTime,
          },
        });
      }
    }

    return {
      sessionId: session.id,
      timerStatus: status,
      durationMinutes: duration,
      actualStartTime: session.timerActualStartTime || null,
      actualEndTime: endTime || null,
      remainingSeconds: remaining,
    };
  }

  // ==========================================
  // 4. SESSION STATUS (STATE MACHINE)
  // ==========================================

  static async getStatus(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);

    return {
      sessionId: session.id,
      status: session.status,
      updatedAt: session.updatedAt,
    };
  }

  static async transitionStatus(
    userId: string,
    sessionId: string,
    targetStatus: PulseSessionStatus
  ): Promise<SessionStatusResponse> {
    const { session } = await this.verifySessionOwnership(userId, sessionId);
    const current = session.status;

    // Validate transition
    const validTransitions: Record<PulseSessionStatus, PulseSessionStatus[]> = {
      [PulseSessionStatus.DRAFT]: [PulseSessionStatus.PUBLISHED, PulseSessionStatus.ARCHIVED],
      [PulseSessionStatus.PUBLISHED]: [PulseSessionStatus.LIVE, PulseSessionStatus.DRAFT, PulseSessionStatus.ARCHIVED],
      [PulseSessionStatus.LIVE]: [PulseSessionStatus.PAUSED, PulseSessionStatus.COMPLETED],
      [PulseSessionStatus.PAUSED]: [PulseSessionStatus.LIVE, PulseSessionStatus.COMPLETED],
      [PulseSessionStatus.COMPLETED]: [PulseSessionStatus.CLOSED],
      [PulseSessionStatus.CLOSED]: [PulseSessionStatus.ARCHIVED],
      [PulseSessionStatus.ARCHIVED]: [],
    };

    if (!validTransitions[current]?.includes(targetStatus)) {
      if (targetStatus === PulseSessionStatus.LIVE && (current === PulseSessionStatus.COMPLETED || current === PulseSessionStatus.CLOSED || current === PulseSessionStatus.ARCHIVED)) {
        throw new ConflictError('Session cannot start twice.');
      }
      throw new ConflictError(`Invalid session status transition from ${current} to ${targetStatus}.`);
    }

    // Additional validations for specific targets
    if (targetStatus === PulseSessionStatus.PUBLISHED) {
      if (!session.title || !session.courseId || !session.topicId || session.questionCount <= 0 || session.durationMinutes <= 0) {
        throw new ConflictError('Session cannot be published without required fields (title, course, topic, questions, duration).');
      }
    }

    const updateData: Prisma.PulseSessionUpdateInput = { status: targetStatus };

    // When starting session (transitioning to LIVE for the first time from PUBLISHED)
    if (targetStatus === PulseSessionStatus.LIVE && current === PulseSessionStatus.PUBLISHED) {
      if (!session.sessionCode) {
        const code = generateAlphanumericCode(6);
        const qrCodeUrl = await generateQrCodeDataUrl(code);
        updateData.sessionCode = code;
        updateData.codeCreatedAt = new Date();
        updateData.codeExpiresAt = new Date(Date.now() + 24 * 3600 * 1000);
        updateData.isCodeActive = true;
        updateData.qrCodeUrl = qrCodeUrl;
      } else if (!session.isCodeActive) {
        updateData.isCodeActive = true;
      }
    }

    // If session is completed or closed, deactivate code
    if (targetStatus === PulseSessionStatus.COMPLETED || targetStatus === PulseSessionStatus.CLOSED || targetStatus === PulseSessionStatus.ARCHIVED) {
      updateData.isCodeActive = false;
    }

    const updated = await db.pulseSession.update({
      where: { id: sessionId },
      data: updateData,
    });

    return {
      sessionId: updated.id,
      status: updated.status,
      updatedAt: updated.updatedAt,
    };
  }

  static async publishSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.PUBLISHED);
  }

  static async startSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.LIVE);
  }

  static async pauseSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.PAUSED);
  }

  static async resumeSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.LIVE);
  }

  static async endSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.COMPLETED);
  }

  static async closeSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.CLOSED);
  }

  static async archiveSession(userId: string, sessionId: string): Promise<SessionStatusResponse> {
    return this.transitionStatus(userId, sessionId, PulseSessionStatus.ARCHIVED);
  }
}
