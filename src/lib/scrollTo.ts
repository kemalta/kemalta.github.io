import Lenis from 'lenis'

/**
 * A single place to trigger programmatic scrolling, so the Lenis instance
 * stays in charge of the animation instead of fighting the native smooth
 * scroll.
 */
let lenis: Lenis | null = null

export function registerLenis(instance: Lenis | null): void {
  lenis = instance
}

export function scrollToId(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.15, offset: 0 })
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollToTop(): void {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
