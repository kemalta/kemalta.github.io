import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { copy } from './content'
import type { Locale, SiteCopy } from './content'

const STORAGE_KEY = 'kte.locale'

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggle: () => void
  /** Copy for the active locale. */
  c: SiteCopy
}

const I18nContext = createContext<I18nValue | null>(null)

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'tr'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'tr' || stored === 'en') return stored
  } catch {
    /* storage blocked — fall through to the browser default */
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

/** Keeps the document head in sync with the active locale. */
function applyMeta({ meta }: SiteCopy, locale: Locale) {
  document.title = meta.title

  const write = (selector: string, value: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector)
    if (el) el.setAttribute('content', value)
  }

  write('meta[name="description"]', meta.description)
  write('meta[property="og:title"]', meta.title)
  write('meta[property="og:description"]', meta.description)
  write('meta[name="twitter:title"]', meta.title)
  write('meta[name="twitter:description"]', meta.description)
  write('meta[property="og:locale"]', locale === 'tr' ? 'tr_TR' : 'en_US')
  write('meta[property="og:locale:alternate"]', locale === 'tr' ? 'en_US' : 'tr_TR')
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    applyMeta(copy[locale], locale)
    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* storage blocked — the choice simply will not persist */
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggle = useCallback(
    () => setLocaleState((prev) => (prev === 'tr' ? 'en' : 'tr')),
    [],
  )

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, toggle, c: copy[locale] }),
    [locale, setLocale, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
