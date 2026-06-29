import { PrismaClient } from '@prisma/client';
import { env } from '@/config/env';

declare global {
  // Allow global var declarations in TypeScript for globalThis
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

// Make sure to validate environment variables before trying to instantiate
let prisma: PrismaClient;

if (env.isProduction) {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = globalThis.prismaGlobal;
}

export const db = prisma;
export default db;
