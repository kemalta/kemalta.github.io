import type { CSSProperties } from 'react'
import { ACCENT_HEX } from './palette'
import type { Accent } from '../content'

/**
 * Exposes the accent colour as a CSS custom property so the same value can
 * drive borders, glows and gradients from a single place.
 */
export function accentStyle(accent: Accent): CSSProperties {
  return { '--accent': ACCENT_HEX[accent] } as CSSProperties
}
