import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { I18nProvider, useI18n } from './i18n'
import { useScrollEngine } from './hooks/useScrollEngine'
import { usePointerTracking } from './hooks/usePointerTracking'
import { useFpsMeter } from './components/HUD'
import { Boot } from './components/Boot'
import { Cursor } from './components/Cursor'
import { PointerFX } from './components/PointerFX'
import { HUD } from './components/HUD'
import { Nav } from './components/Nav'
import { SectionRail } from './components/SectionRail'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { Profile } from './components/Profile'
import { Capabilities } from './components/Capabilities'
import { Timeline } from './components/Timeline'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Toolkit } from './components/Toolkit'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { StaticPoster } from './scene/StaticPoster'

/* The 3D chunk is isolated: it never blocks first paint and it can fail
   without taking the whole page down. */
const SceneCanvas = lazy(() =>
  import('./scene/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

/** Hard ceiling so the boot sequence can never hang on a failed chunk. */
const SCENE_TIMEOUT = 6000

function Shell() {
  const { c } = useI18n()
  const [booted, setBooted] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  useScrollEngine()
  usePointerTracking()
  useFpsMeter()

  useEffect(() => {
    const id = window.setTimeout(() => setSceneReady(true), SCENE_TIMEOUT)
    return () => window.clearTimeout(id)
  }, [])

  const handleReady = useCallback(() => setSceneReady(true), [])
  const handleBootDone = useCallback(() => setBooted(true), [])

  return (
    <div id="page" className="grain vignette crt relative min-h-screen">
      {/* background layers */}
      <div className="fixed inset-0 z-0 bg-void" aria-hidden="true" />
      <div className="ambient" aria-hidden="true" />
      <Suspense fallback={<StaticPoster />}>
        <SceneCanvas onReady={handleReady} />
      </Suspense>
      <div className="scene-scrim" aria-hidden="true" />

      {/* content */}
      <div className="relative z-10">
        <Nav />
        <SectionRail />

        <main id="main">
          <Hero revealed={booted} />
          <Ticker items={c.capabilities.items.map((item) => item.title)} />
          <Profile />
          <Capabilities />
          <Timeline />
          <Services />
          <Projects />
          <Ticker items={c.services.items.map((service) => service.title)} reverse />
          <Toolkit />
          <Contact />
        </main>

        <Footer />
      </div>

      <HUD />
      <Cursor />
      <PointerFX />

      <Boot ready={sceneReady} onDone={handleBootDone} />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  )
}
