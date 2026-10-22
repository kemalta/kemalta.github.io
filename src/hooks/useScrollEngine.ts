import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefersReducedMotion } from '../lib/quality'
import { getState, setState } from '../lib/store'
import { registerLenis } from '../lib/scrollTo'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * One scroll engine for the whole page:
 *  - Lenis for inertial scrolling (desktop only, never on touch)
 *  - a single ScrollTrigger that publishes document progress to the store
 *  - a section observer that publishes the section currently in view
 */
export function useScrollEngine() {
  useEffect(() => {
    const reduced = prefersReducedMotion()

    let lenis: Lenis | undefined
    let raf: ((time: number) => void) | undefined
    let last = 0

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
      })

      lenis.on('scroll', ScrollTrigger.update)
      raf = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      registerLenis(lenis)
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const delta = self.progress - last
        last = self.progress
        setState({
          progress: self.progress,
          velocity: Math.max(-1, Math.min(1, delta * 18)),
        })
        document.documentElement.style.setProperty(
          '--scroll-progress',
          self.progress.toFixed(4),
        )
      },
    })

    /* Velocity is published on scroll events only, so it would stay pinned at
       its last value. Bleed it back to zero on the ticker — the scene uses it
       for momentum, and momentum has to end. */
    const settle = () => {
      const { velocity } = getState()
      if (velocity === 0) return
      const next = Math.abs(velocity) < 0.004 ? 0 : velocity * 0.92
      setState({ velocity: next })
    }
    gsap.ticker.add(settle)

    /* ---------------------------------------------------------- *
     * Active section — IntersectionObserver is cheaper and more
     * predictable than a ScrollTrigger per section.
     * ---------------------------------------------------------- */
    const sections = [...document.querySelectorAll<HTMLElement>('section[data-section]')]
    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-section')
          if (!id) continue
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio)
          else visible.delete(id)
        }
        let best = 'hero'
        let bestRatio = -1
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setState({ activeSection: best as never })
      },
      { threshold: [0.05, 0.25, 0.5, 0.75], rootMargin: '-15% 0px -35% 0px' },
    )

    for (const section of sections) observer.observe(section)

    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts) void document.fonts.ready.then(refresh)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      trigger.kill()
      gsap.ticker.remove(settle)
      if (raf) gsap.ticker.remove(raf)
      registerLenis(null)
      lenis?.destroy()
    }
  }, [])
}
