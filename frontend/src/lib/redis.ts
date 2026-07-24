import Redis from 'ioredis';
import { env } from '@/config/env';

declare global {
  var redisGlobal: Redis | undefined;
}

let redis: Redis;

if (env.isProduction) {
  redis = new Redis(env.redisUrl, {
    maxRetriesPerRequest: 3,
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        return true; // Reconnect on readonly error (e.g. failover)
      }
      return false;
    },
  });
} else {
  if (!globalThis.redisGlobal) {
    globalThis.redisGlobal = new Redis(env.redisUrl, {
      maxRetriesPerRequest: 3,
    });
  }
  redis = globalThis.redisGlobal;
}

// Log connection status
redis.on('connect', () => {
  console.log('⚡ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export const cache = redis;
export default cache;
