export type Tier = 'high' | 'medium' | 'low' | 'static'

export interface TierSettings {
  dpr: [number, number]
  /** Tessellation of the core icosahedron. */
  coreDetail: number
  /** Particle count of the orbiting motes field. */
  motes: number
  /** Uniform intensity of the volumetric core. */
  intensity: number
  /** Whether the orbital rings are drawn. */
  rings: boolean
}

export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    const lose = gl.getExtension('WEBGL_lose_context')
    lose?.loseContext()
    return true
  } catch {
    return false
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function detectTier(): Tier {
  if (!supportsWebGL()) return 'static'
  if (prefersReducedMotion()) return 'static'

  const nav = navigator as Navigator & { deviceMemory?: number }
  const cores = nav.hardwareConcurrency ?? 4
  const memory = nav.deviceMemory ?? 8
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.matchMedia('(max-width: 768px)').matches

  if (narrow || coarse || cores <= 4 || memory <= 4) return 'low'
  if (cores <= 8 || memory <= 8) return 'medium'
  return 'high'
}

export const TIER_SETTINGS: Record<Exclude<Tier, 'static'>, TierSettings> = {
  high: { dpr: [1, 2], coreDetail: 6, motes: 2200, intensity: 1, rings: true },
  medium: { dpr: [1, 1.5], coreDetail: 5, motes: 1100, intensity: 0.88, rings: true },
  low: { dpr: [1, 1], coreDetail: 4, motes: 380, intensity: 0.7, rings: false },
}
