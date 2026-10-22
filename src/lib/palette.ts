import type { Accent } from '../content'

/**
 * The single source of truth for accent colours. The DOM reads them as CSS
 * custom properties, the 3D scene reads them as `THREE.Color` — one value,
 * two renderers, guaranteed to stay in sync.
 */
export const ACCENT_HEX: Record<Accent, string> = {
  signal: '#f5a524',
  phosphor: '#35d6c3',
  violet: '#8b7cf6',
  alert: '#ff6b6b',
}

export const PALETTE = {
  void: '#07090c',
  panel: '#10141b',
  line: '#1e242e',
  ink: '#e8eef5',
  inkDim: '#a3aebd',
  muted: '#6b7787',
  faint: '#46505e',
  signal: '#f5a524',
  phosphor: '#35d6c3',
  violet: '#8b7cf6',
  alert: '#ff6b6b',
} as const

/** Accent applied when nothing is hovered — the signature amber. */
export const DEFAULT_ACCENT: Accent = 'signal'
