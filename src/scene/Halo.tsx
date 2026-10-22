import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { haloFragment, haloVertex } from './shaders'

interface HaloProps {
  intensity: number
}

/**
 * An additive glow billboard sitting behind the core. It gives the scene its
 * bloom without paying for a post-processing pass.
 */
export function Halo({ intensity }: HaloProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uAccent: { value: accentColor('signal').clone() },
    }),
    [intensity],
  )

  useFrame((state, delta) => {
    const material = materialRef.current
    const group = groupRef.current
    if (!material || !group) return

    const { accent, progress } = getState()
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uAccent.value.lerp(accentColor(accent), Math.min(1, delta * 4))

    group.rotation.z = progress * Math.PI * 2
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04
    group.scale.setScalar(pulse)
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -1.4]}>
        <planeGeometry args={[8.4, 8.4]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
