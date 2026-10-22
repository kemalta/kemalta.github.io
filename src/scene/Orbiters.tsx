import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Accent } from '../content'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { trailFragment, ringVertex } from './shaders'

interface OrbitersProps {
  visible: boolean
}

const ORBITS: {
  radius: number
  tilt: [number, number, number]
  speed: number
  accent: Accent
  tail: number
}[] = [
  { radius: 2.05, tilt: [Math.PI / 2.4, 0, 0], speed: 0.55, accent: 'signal', tail: 0.7 },
  { radius: 2.55, tilt: [0, Math.PI / 2.2, 0], speed: -0.38, accent: 'phosphor', tail: 0.55 },
  {
    radius: 3.15,
    tilt: [Math.PI / 3.6, 0, Math.PI / 5],
    speed: 0.27,
    accent: 'violet',
    tail: 0.45,
  },
]

const COLORS = ORBITS.map((orbit) => accentColor(orbit.accent))

function buildUniforms() {
  return ORBITS.map((orbit, index) => ({
    uColor: { value: COLORS[index].clone() },
    uOpacity: { value: orbit.tail },
  }))
}

/**
 * Three packets of light travelling the orbital rings, each with a short
 * additive tail. It is the cheapest "live system" cue in the scene: three
 * meshes and three thin arcs, no extra draw passes.
 */
export function Orbiters({ visible }: OrbitersProps) {
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const headRefs = useRef<(THREE.Mesh | null)[]>([])
  const materialRefs = useRef<(THREE.ShaderMaterial | null)[]>([])

  const uniforms = useMemo(() => buildUniforms(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const { progress, velocity } = getState()
    const boost = 1 + Math.min(1, Math.abs(velocity)) * 0.9

    for (let i = 0; i < ORBITS.length; i += 1) {
      const spin = spinRefs.current[i]
      if (!spin) continue

      spin.rotation.z = t * ORBITS[i].speed * boost + i * 2.1 + progress * 1.6

      const head = headRefs.current[i]
      if (head) {
        const pulse = 1 + Math.sin(t * 3.4 + i * 1.7) * 0.18
        head.scale.setScalar(pulse * boost)
      }

      const material = materialRefs.current[i]
      if (material) material.uniforms.uOpacity.value = ORBITS[i].tail * Math.min(1.6, boost)
    }
  })

  if (!visible) return null

  return (
    <group>
      {ORBITS.map((orbit, index) => (
        <group key={orbit.radius} rotation={orbit.tilt}>
          <group
            ref={(node) => {
              spinRefs.current[index] = node
            }}
          >
            <mesh
              ref={(node) => {
                headRefs.current[index] = node
              }}
              position={[orbit.radius, 0, 0]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color={COLORS[index]} toneMapped={false} />
            </mesh>

            <group rotation={[0, 0, -orbit.tail]}>
              <mesh>
                <torusGeometry args={[orbit.radius, 0.0075, 3, 26, orbit.tail]} />
                <shaderMaterial
                  ref={(node) => {
                    materialRefs.current[index] = node
                  }}
                  vertexShader={ringVertex}
                  fragmentShader={trailFragment}
                  uniforms={uniforms[index]}
                  transparent
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          </group>
        </group>
      ))}
    </group>
  )
}
