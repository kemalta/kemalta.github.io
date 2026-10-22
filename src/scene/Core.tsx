import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getState } from '../lib/store'
import { accentColor } from './colorCache'
import { coreFragment, coreVertex } from './shaders'

const phaseTarget = { value: 0 }

interface CoreProps {
  detail: number
  intensity: number
}

/**
 * The centrepiece: an icosahedron displaced by 3D simplex noise, lit by a
 * fresnel rim and emissive bands. Its accent colour follows the capability
 * card the visitor is hovering; its noise phase follows the scroll.
 */
export function Core({ detail, intensity }: CoreProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.15, detail), [detail])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 1 },
      uPhase: { value: 0 },
      uScroll: { value: 0 },
      uIntensity: { value: intensity },
      uPulse: { value: 0 },
      uAccent: { value: accentColor('signal').clone() },
      uAccent2: { value: accentColor('phosphor').clone() },
    }),
    [intensity],
  )

  useFrame((state, delta) => {
    const material = materialRef.current
    const mesh = meshRef.current
    if (!material || !mesh) return

    const { progress, velocity, accent } = getState()
    const step = Math.min(1, delta * 4)

    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uScroll.value = progress
    material.uniforms.uPulse.value = Math.abs(velocity)
    /* Fast scrolling energises the surface: the displacement spikes, then
       settles back to its resting amplitude. */
    const ampTarget = 1 + Math.min(1, Math.abs(velocity)) * 0.55
    material.uniforms.uAmp.value +=
      (ampTarget - material.uniforms.uAmp.value) * Math.min(1, delta * 5)

    phaseTarget.value = progress * 6
    material.uniforms.uPhase.value +=
      (phaseTarget.value - material.uniforms.uPhase.value) * Math.min(1, delta * 1.6)

    const primary = accentColor(accent)
    material.uniforms.uAccent.value.lerp(primary, step)
    material.uniforms.uAccent2.value.lerp(accentColor(accent === 'signal' ? 'phosphor' : 'signal'), step)

    mesh.rotation.y = state.clock.elapsedTime * 0.12
    mesh.rotation.x = 0.18 + Math.sin(state.clock.elapsedTime * 0.17) * 0.06
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={coreVertex}
        fragmentShader={coreFragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}
