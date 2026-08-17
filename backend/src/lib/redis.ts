import Redis from 'ioredis';
import { env } from '@/config/env';

declare global {
  var redisGlobal: Redis | undefined;
}

let redis: Redis;

const redisOptions = {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  retryStrategy(times: number) {
    if (times > 3) {
      return null; // Stop retrying after 3 attempts if Redis server is not running
    }
    return Math.min(times * 500, 2000);
  },
};

if (env.isProduction) {
  redis = new Redis(env.redisUrl, {
    ...redisOptions,
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        return true;
      }
      return false;
    },
  });
} else {
  if (!globalThis.redisGlobal) {
    globalThis.redisGlobal = new Redis(env.redisUrl, redisOptions);
  }
  redis = globalThis.redisGlobal;
}

let hasLoggedError = false;

// Log connection status
redis.on('connect', () => {
  console.log('⚡ Redis connected successfully');
  hasLoggedError = false;
});

redis.on('error', (err) => {
  if (!hasLoggedError) {
    console.warn('⚠️ Redis local server not active - running in resilient offline mode.');
    hasLoggedError = true;
  }
});

export const cache = redis;
export default cache;

