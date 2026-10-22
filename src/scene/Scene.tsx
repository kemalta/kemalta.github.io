import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { Core } from './Core'
import { Halo } from './Halo'
import { Rings } from './Rings'
import { Orbiters } from './Orbiters'
import { Motes } from './Motes'
import { GridFloor } from './GridFloor'
import { CameraRig } from './CameraRig'

interface SceneProps {
  detail: number
  motes: number
  intensity: number
  rings: boolean
  onFirstFrame: () => void
}

/**
 * The scene graph. Everything below the core reacts to the same two inputs:
 * the scroll position and the currently highlighted capability.
 */
export function Scene({ detail, motes, intensity, rings, onFirstFrame }: SceneProps) {
  const lightRef = useRef<THREE.PointLight>(null)
  const firedRef = useRef(false)

  useFrame((_, delta) => {
    const light = lightRef.current
    if (light) {
      const { accent } = getState()
      light.color.lerp(accentColor(accent), Math.min(1, delta * 4))
    }

    if (!firedRef.current) {
      firedRef.current = true
      onFirstFrame()
    }
  })

  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={0.55} color="#cfe0ff" />
      <pointLight ref={lightRef} position={[0, 0, 1.4]} intensity={18} distance={14} decay={2} />

      <Halo intensity={intensity} />
      <Core detail={detail} intensity={intensity} />
      <Rings visible={rings} />
      <Orbiters visible={rings} />
      <Motes count={motes} />
      <GridFloor />
    </>
  )
}
