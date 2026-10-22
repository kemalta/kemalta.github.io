import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { PALETTE } from '../lib/palette'
import { gridFragment, gridVertex } from './shaders'

/**
 * A perspective grid that reads as a virtual floor. Line intensity fades with
 * distance; a pulse ring travels outward as the page scrolls.
 */
export function GridFloor() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color(PALETTE.line).multiplyScalar(2.2) },
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
    material.uniforms.uAccent.value.lerp(accentColor(accent), Math.min(1, delta * 4))
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.1, -2]}>
      <planeGeometry args={[90, 90]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
