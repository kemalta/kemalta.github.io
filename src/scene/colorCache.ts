import * as THREE from 'three'
import { ACCENT_HEX } from '../lib/palette'
import type { Accent } from '../content'

/**
 * One reusable `THREE.Color` per accent. Reused every frame so the render
 * loop never allocates.
 */
const cache = new Map<Accent, THREE.Color>()

export function accentColor(accent: Accent): THREE.Color {
  let color = cache.get(accent)
  if (!color) {
    color = new THREE.Color(ACCENT_HEX[accent])
    cache.set(accent, color)
  }
  return color
}
