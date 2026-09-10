/**
 * Simple in-memory sliding-window rate limiter for server actions & route handlers.
 * Keyed by identifier (e.g. client IP address or user email).
 */

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitTracker>();

// Cleanup stale entries every 10 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, tracker] of rateLimitStore.entries()) {
      if (now > tracker.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitOptions {
  /**
   * Maximum number of allowed attempts within the time window
   */
  limit: number;
  /**
   * Window duration in seconds
   */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Check and record a rate limit attempt for a given key.
 * 
 * @example
 * const result = rateLimit(`auth:signup:${ip}`, { limit: 5, windowSeconds: 900 });
 * if (!result.success) {
 *   return { error: `Too many attempts. Please try again in ${result.resetInSeconds} seconds.` };
 * }
 */
export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const tracker = rateLimitStore.get(key);

  if (!tracker || now > tracker.resetTime) {
    // Window expired or new key
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      resetInSeconds: options.windowSeconds,
    };
  }

  if (tracker.count >= options.limit) {
    const resetInSeconds = Math.ceil((tracker.resetTime - now) / 1000);
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  tracker.count += 1;
  const resetInSeconds = Math.ceil((tracker.resetTime - now) / 1000);
  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - tracker.count,
    resetInSeconds,
  };
}
