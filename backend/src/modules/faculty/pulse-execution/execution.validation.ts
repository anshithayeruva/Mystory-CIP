import { z } from 'zod';

export const GenerateCodeSchema = z.object({
  length: z.number().int().min(4).max(12).optional().default(6),
  expiresInHours: z.number().int().min(1).max(168).optional().default(24),
});

export type GenerateCodeInput = z.infer<typeof GenerateCodeSchema>;

export const StartTimerSchema = z.object({
  durationMinutes: z.number().int().min(1).max(180).optional(),
});

export type StartTimerInput = z.infer<typeof StartTimerSchema>;

export const TimerActionParamSchema = z.object({
  action: z.enum(['start', 'pause', 'resume', 'end']),
});

export const StatusActionParamSchema = z.object({
  action: z.enum(['publish', 'start', 'pause', 'resume', 'end', 'close', 'archive']),
});
