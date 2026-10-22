/**
 * Deterministic pseudo-random generator (mulberry32).
 *
 * The React Compiler treats `Math.random()` during render as impure, and a
 * seeded generator is better anyway: the particle field is identical on every
 * load, so the composition never changes between visits.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
