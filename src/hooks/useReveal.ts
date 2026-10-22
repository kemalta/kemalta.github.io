import { useEffect, useRef } from 'react'

/**
 * Reveal-on-enter using IntersectionObserver. Sets `data-revealed="true"` so
 * the CSS handles the transition, and writes a stagger delay per child.
 *
 * Returns a ref to attach to the container.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(stagger = 70) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
    targets.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * stagger}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    for (const el of targets) observer.observe(el)

    return () => observer.disconnect()
  }, [stagger])

  return ref
}
