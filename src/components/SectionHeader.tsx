import type { ReactNode } from 'react'
import { DecodeText } from './DecodeText'

interface SectionHeaderProps {
  kicker: string
  title: string
  intro?: string
  children?: ReactNode
  className?: string
}

/**
 * Shared section chrome: an index rule, a monospace kicker, a display title
 * and an optional intro column. The kicker decodes into place and the whole
 * header sits inside a four-corner sensor frame.
 */
export function SectionHeader({
  kicker,
  title,
  intro,
  children,
  className = '',
}: SectionHeaderProps) {
  return (
    <header className={`relative ${className}`} data-reveal>
      <span className="brackets" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>

      <div className="relative flex items-center gap-4">
        <span className="label text-signal">
          <DecodeText text={kicker} />
        </span>
        <span className="rule flex-1" />
      </div>

      <div className="relative mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <h2 className="display text-title text-ink lg:col-span-7">{title}</h2>
        {intro ? (
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-dim lg:col-span-5 lg:pt-2">
            {intro}
          </p>
        ) : null}
      </div>

      {children}
    </header>
  )
}
