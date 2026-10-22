import type { Accent, SectionId } from '../content'

/**
 * A tiny external store for values that change every frame (scroll, pointer)
 * or on hover. React components that need these subscribe; the 3D scene reads
 * them directly inside `useFrame` so no re-render is ever triggered by motion.
 */

export interface SceneState {
  /** 0 → 1 across the whole document. */
  progress: number
  /** Signed scroll velocity, roughly -1 → 1. */
  velocity: number
  /** Section currently in view. */
  activeSection: SectionId
  /** Capability id currently hovered, or `null`. */
  activeDomain: string | null
  /** Accent that follows the hovered capability. */
  accent: Accent
  /** Pointer in normalised device space, -1 → 1. */
  pointer: { x: number; y: number }
  /** Pointer in CSS pixels. */
  pointerPx: { x: number; y: number }
  /** True while the custom cursor is over an interactive element. */
  pointerActive: boolean
  /** Measured frames per second. */
  fps: number
}

const initial: SceneState = {
  progress: 0,
  velocity: 0,
  activeSection: 'hero',
  activeDomain: null,
  accent: 'signal',
  pointer: { x: 0, y: 0 },
  pointerPx: { x: 0, y: 0 },
  pointerActive: false,
  fps: 60,
}

let state: SceneState = initial
const listeners = new Set<(s: SceneState) => void>()

export function getState(): SceneState {
  return state
}

export function setState(patch: Partial<SceneState>): void {
  let changed = false
  for (const key of Object.keys(patch) as (keyof SceneState)[]) {
    if (!Object.is(state[key], patch[key])) {
      changed = true
      break
    }
  }
  if (!changed) return
  state = { ...state, ...patch }
  for (const listener of listeners) listener(state)
}

export function subscribe(listener: (s: SceneState) => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
