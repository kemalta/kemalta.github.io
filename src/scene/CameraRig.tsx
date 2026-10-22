import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { damp3 } from 'maath/easing'
import { getState } from '../lib/store'

interface Keyframe {
  t: number
  pos: [number, number, number]
  look: [number, number, number]
}

/**
 * Scroll choreography. The camera travels a fixed path through the scene:
 * it starts wide and off-axis so the core sits beside the headline, pushes
 * in through the middle of the page, and pulls back out for the contact
 * section. Pointer movement adds a small, damped parallax on top.
 */
const KEYFRAMES: Keyframe[] = [
  { t: 0.0, pos: [0.2, 0.35, 8.6], look: [-1.55, 0.05, 0] },
  { t: 0.14, pos: [1.5, 1.15, 6.6], look: [-0.7, 0.1, 0] },
  { t: 0.3, pos: [-1.9, -0.5, 5.8], look: [0.55, -0.15, 0] },
  { t: 0.48, pos: [1.1, 1.6, 4.9], look: [-0.85, 0.2, 0] },
  { t: 0.66, pos: [-1.0, 0.15, 6.3], look: [0.6, 0.0, 0] },
  { t: 0.84, pos: [0.5, 0.95, 7.6], look: [-0.25, 0.1, 0] },
  { t: 1.0, pos: [0.0, 0.5, 9.4], look: [0.0, 0.0, 0] },
]

const targetPos = new THREE.Vector3()
const targetLook = new THREE.Vector3()
const lookTarget = new THREE.Vector3(0, 0, 0)

export function CameraRig() {
  const parallax = useRef({ x: 0, y: 0 })

  const scratch = useMemo(
    () => ({ pos: new THREE.Vector3(), look: new THREE.Vector3() }),
    [],
  )

  useFrame((state, delta) => {
    const { progress, pointer } = getState()

    /* ---- interpolate the keyframe path ---- */
    let from = KEYFRAMES[0]
    let to = KEYFRAMES[KEYFRAMES.length - 1]

    for (let i = 0; i < KEYFRAMES.length - 1; i += 1) {
      if (progress >= KEYFRAMES[i].t && progress <= KEYFRAMES[i + 1].t) {
        from = KEYFRAMES[i]
        to = KEYFRAMES[i + 1]
        break
      }
    }

    const span = to.t - from.t || 1
    const k = Math.min(1, Math.max(0, (progress - from.t) / span))
    const eased = k * k * (3 - 2 * k)

    scratch.pos.set(
      from.pos[0] + (to.pos[0] - from.pos[0]) * eased,
      from.pos[1] + (to.pos[1] - from.pos[1]) * eased,
      from.pos[2] + (to.pos[2] - from.pos[2]) * eased,
    )
    scratch.look.set(
      from.look[0] + (to.look[0] - from.look[0]) * eased,
      from.look[1] + (to.look[1] - from.look[1]) * eased,
      from.look[2] + (to.look[2] - from.look[2]) * eased,
    )

    /* ---- pointer parallax, damped ---- */
    const p = parallax.current
    p.x += (pointer.x - p.x) * Math.min(1, delta * 2.4)
    p.y += (pointer.y - p.y) * Math.min(1, delta * 2.4)

    targetPos.copy(scratch.pos)
    targetPos.x += p.x * 0.62
    targetPos.y += p.y * 0.38
    targetLook.copy(scratch.look)

    damp3(state.camera.position, targetPos, 0.42, delta)
    damp3(lookTarget, targetLook, 0.42, delta)
    state.camera.lookAt(lookTarget)
  })

  return null
}
