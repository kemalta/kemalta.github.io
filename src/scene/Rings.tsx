import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'

interface RingsProps {
  visible: boolean
}

/**
 * Three thin orbital rings — the instrument bezel around the core.
 * Built-in materials are used here so three handles tone mapping and colour
 * space exactly as it does everywhere else.
 */
export function Rings({ visible }: RingsProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])

  const materials = [
    new THREE.MeshBasicMaterial({ color: '#f5a524', transparent: true, opacity: 0.55 }),
    new THREE.MeshBasicMaterial({ color: '#35d6c3', transparent: true, opacity: 0.38 }),
    new THREE.MeshBasicMaterial({ color: '#8b7cf6', transparent: true, opacity: 0.26 }),
  ]

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
  })

  if (!visible) return null

  return (
    <group ref={groupRef}>
      {[2.05, 2.55, 3.15].map((radius, index) => (
        <mesh
          key={radius}
          ref={(node) => {
            ringRefs.current[index] = node
          }}
        >
          <torusGeometry args={[radius, 0.0075, 3, 220]} />
          <primitive object={materials[index]} attach="material" />
        </mesh>
      ))}
    </group>
  )
}
