export interface RateLimiter {
  hit: (key: string, now?: number) => boolean
}

/**
 * Fixed-window, in-memory limiter. Per serverless instance only, so it is a
 * speed bump against bursts, not a global guarantee.
 */
export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>()

  return {
    hit(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((ts) => now - ts < windowMs)
      if (recent.length >= limit) {
        hits.set(key, recent)
        return false
      }
      hits.set(key, [...recent, now])
      return true
    },
  }
}
