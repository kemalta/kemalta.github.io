import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { detectTier, prefersReducedMotion, TIER_SETTINGS } from '../lib/quality'
import { Scene } from './Scene'
import { StaticPoster } from './StaticPoster'

interface SceneCanvasProps {
  onReady: () => void
}

/**
 * Mounts the WebGL scene when the device can afford it, and falls back to the
 * static poster otherwise. Context loss is treated as a first-class failure:
 * the poster takes over instead of leaving a black rectangle behind.
 */
export function SceneCanvas({ onReady }: SceneCanvasProps) {
  const [tier] = useState(() => detectTier())
  const [lost, setLost] = useState(false)

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor(0x07090c, 0)
      const canvas = gl.domElement
      const onLost = (event: Event) => {
        event.preventDefault()
        setLost(true)
      }
      canvas.addEventListener('webglcontextlost', onLost)
    },
    [],
  )

  useEffect(() => {
    if (tier === 'static' || lost) onReady()
  }, [tier, lost, onReady])

  if (tier === 'static' || lost) return <StaticPoster />

  const settings = TIER_SETTINGS[tier]

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={settings.dpr}
        gl={{
          antialias: tier === 'high',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0.2, 0.35, 8.6], fov: 42, near: 0.1, far: 120 }}
        onCreated={handleCreated}
        frameloop={prefersReducedMotion() ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Scene
            detail={settings.coreDetail}
            motes={settings.motes}
            intensity={settings.intensity}
            rings={settings.rings}
            onFirstFrame={onReady}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
