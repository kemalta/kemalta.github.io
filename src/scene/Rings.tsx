import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Accent } from '../content'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { ringFragment, ringVertex } from './shaders'

interface RingsProps {
  visible: boolean
}

const RADII = [2.05, 2.55, 3.15]
const ACCENTS: Accent[] = ['signal', 'phosphor', 'violet']
const OPACITY = [0.8, 0.65, 0.5]
const SPEED = [0.14, -0.1, 0.07]

function buildUniforms() {
  return RADII.map((_, index) => ({
    uBase: { value: accentColor(ACCENTS[index]).clone().multiplyScalar(0.4) },
    uAccent: { value: accentColor(ACCENTS[index]).clone() },
    uPhase: { value: index * 0.33 },
    uOpacity: { value: OPACITY[index] },
  }))
}

/**
 * Three orbital rings — the instrument bezel around the core. Each ring is a
 * shader surface: a dim base line, tick marks around the circumference and a
 * comet head chasing along it. The heads alternate direction and pace so the
 * assembly never resolves into a single rotating object.
 */
export function Rings({ visible }: RingsProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])
  const materialRefs = useRef<(THREE.ShaderMaterial | null)[]>([])

  const uniforms = useMemo(() => buildUniforms(), [])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    const { progress } = getState()

    group.rotation.y = t * 0.07 + progress * 1.4
    group.rotation.z = Math.sin(t * 0.11) * 0.22

    ringRefs.current[0]?.rotation.set(Math.PI / 2.4, 0, 0)
    ringRefs.current[1]?.rotation.set(0, Math.PI / 2.2, t * 0.25)
    ringRefs.current[2]?.rotation.set(Math.PI / 3.6, t * 0.16, Math.PI / 5)

    for (let i = 0; i < SPEED.length; i += 1) {
      const material = materialRefs.current[i]
      if (!material) continue
      const phase = (t * SPEED[i] + i * 0.33 + progress * 0.8) % 1
      material.uniforms.uPhase.value = phase < 0 ? phase + 1 : phase
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef}>
      {RADII.map((radius, index) => (
        <mesh
          key={radius}
          ref={(node) => {
            ringRefs.current[index] = node
          }}
        >
          <torusGeometry args={[radius, 0.011, 3, 240]} />
          <shaderMaterial
            ref={(node) => {
              materialRefs.current[index] = node
            }}
            vertexShader={ringVertex}
            fragmentShader={ringFragment}
            uniforms={uniforms[index]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
