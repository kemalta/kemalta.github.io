import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { LOCALES, profile } from '../content'
import { scrollToId } from '../lib/scrollTo'
import { useStoreSnapshot } from '../hooks/useStoreSnapshot'

export function Nav() {
  const { c, locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useStoreSnapshot((s) => s.activeSection)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), open ? 260 : 0)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-void"
      >
        {c.nav.skip}
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(7,9,12,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(30,36,46,0.9)' : 'transparent'}`,
        }}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 sm:h-20">
          {/* brand */}
          <button
            type="button"
            onClick={() => go('hero')}
            className="group flex items-center gap-3"
            aria-label={profile.name}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel font-mono text-[11px] font-medium tracking-wider text-ink transition-colors duration-300 group-hover:border-signal/60">
              KT
              <span className="absolute inset-0 rounded-lg bg-signal/0 transition-colors duration-300 group-hover:bg-signal/10" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-medium tracking-tight text-ink">
                {profile.name}
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-faint uppercase">
                ICT &amp; Technology
              </span>
            </span>
          </button>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {c.nav.items.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`group relative px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    className={`mr-1.5 transition-colors duration-300 ${
                      active ? 'text-signal' : 'text-faint group-hover:text-signal'
                    }`}
                  >
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={`absolute inset-x-3 bottom-0 h-px origin-left bg-signal transition-transform duration-500 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* language switch */}
            <div
              className="flex items-center rounded-lg border border-line bg-panel/80 p-0.5"
              role="group"
              aria-label={c.nav.language}
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocale(loc.id)}
                  aria-pressed={locale === loc.id}
                  className={`rounded-md px-2 py-1 font-mono text-[10px] font-medium tracking-[0.12em] transition-colors duration-300 ${
                    locale === loc.id
                      ? 'bg-signal/15 text-signal'
                      : 'text-faint hover:text-ink-dim'
                  }`}
                >
                  {loc.short}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go('contact')}
              className="hidden rounded-lg border border-line bg-panel px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:border-signal/60 hover:text-signal sm:block"
            >
              {c.nav.cta}
            </button>

            {/* mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? c.nav.closeMenu : c.nav.openMenu}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className="absolute left-0 block h-px w-4 bg-ink transition-all duration-300"
                  style={{
                    top: open ? '6px' : '0px',
                    transform: open ? 'rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 block h-px w-4 bg-ink transition-all duration-300"
                  style={{ top: '6px', opacity: open ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 block h-px w-4 bg-ink transition-all duration-300"
                  style={{
                    top: open ? '6px' : '12px',
                    transform: open ? 'rotate(-45deg)' : 'none',
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* reading progress — driven by a CSS variable, no re-render */}
        <div className="nav-progress absolute inset-x-0 bottom-0" aria-hidden="true" />
      </header>


      {/* mobile drawer */}
      <div
        className="drawer fixed inset-0 z-40 bg-void/97 backdrop-blur-xl lg:hidden"
        data-open={open}
        aria-hidden={!open}
      >
        <nav className="shell flex h-full flex-col justify-center gap-1 pt-16" aria-label="Mobile">
          {c.nav.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => go(item.id)}
              className="group flex items-baseline gap-4 border-b border-line/70 py-4 text-left"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(14px)',
                transition:
                  'opacity 520ms cubic-bezier(0.16,1,0.3,1), transform 520ms cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: `${open ? 90 + index * 55 : 0}ms`,
              }}
            >
              <span className="font-mono text-[11px] text-signal">{item.index}</span>
              <span className="display text-3xl text-ink">{item.label}</span>
            </button>
          ))}

          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => go('contact')}
              className="rounded-xl bg-signal px-5 py-3.5 font-mono text-[12px] tracking-[0.14em] text-void uppercase"
            >
              {c.nav.cta}
            </button>
            <a
              href={`mailto:${profile.email}`}
              tabIndex={open ? 0 : -1}
              className="font-mono text-[12px] tracking-[0.06em] text-ink-dim underline decoration-line underline-offset-4"
            >
              {profile.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
