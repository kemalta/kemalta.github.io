import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { mulberry32 } from '../lib/random'
import { motesFragment, motesVertex } from './shaders'

interface MotesProps {
  count: number
}

/**
 * A GPU-animated particle field. Positions never leave the GPU: the vertex
 * shader rotates and bobs every point from a per-particle seed.
 */
export function Motes({ count }: MotesProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const random = mulberry32(0x5eed)
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      // A flattened torus: dense around the core, thinning outward.
      const radius = 1.7 + Math.pow(random(), 0.6) * 6.4
      const angle = random() * Math.PI * 2
      const height = (random() - 0.5) * (1.4 + radius * 0.55)

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      seeds[i] = random()
      scales[i] = random()
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12)

    return geo
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0.26 },
      uScroll: { value: 0 },
      uAccent: { value: accentColor('signal').clone() },
    }),
    [],
  )

  useFrame((state, delta) => {
    const material = materialRef.current
    if (!material) return
    const { progress, accent } = getState()
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uScroll.value = progress
    material.uniforms.uAccent.value.lerp(accentColor(accent), Math.min(1, delta * 3))
  })

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={motesVertex}
        fragmentShader={motesFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
