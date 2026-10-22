import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { getState } from '../lib/store'
import { scrollToId } from '../lib/scrollTo'

/**
 * A chapter rail pinned to the right edge: one marker per section, the
 * active one lit, plus a progress line that tracks the document.
 */
export function SectionRail() {
  const { c } = useI18n()
  const [state, setState] = useState(() => getState())

  useEffect(() => {
    const id = window.setInterval(() => setState({ ...getState() }), 125)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <nav
        aria-label="Sections"
        className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
        {c.nav.items.map((item) => {
          const active = state.activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="pointer-events-auto group flex items-center gap-2.5"
              aria-current={active ? 'true' : undefined}
            >
              <span
                className={`font-mono text-[9px] tracking-[0.16em] uppercase transition-all duration-500 ${
                  active
                    ? 'text-signal opacity-100'
                    : 'text-faint opacity-0 group-hover:opacity-100'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`block h-px transition-all duration-500 ${
                  active ? 'w-7 bg-signal' : 'w-3.5 bg-line group-hover:w-5 group-hover:bg-muted'
                }`}
              />
            </button>
          )
        })}

        <span className="mt-2 font-mono text-[9px] tabular-nums text-faint">
          {String(Math.round(state.progress * 100)).padStart(3, '0')}
        </span>
      </nav>

      {/* Document beam: a full-height hairline on the edge with a light that
          tracks the scroll position. It stays visible even while the section
          list itself is hidden below `xl`. */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed right-2 top-0 z-40 hidden h-screen w-px bg-line/50 xl:block"
      >
        <span
          className="absolute left-1/2 block h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-signal to-transparent"
          style={{ top: `${state.progress * 100}%` }}
        />
      </span>
    </>
  )
}
