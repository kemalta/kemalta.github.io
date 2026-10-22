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
 * and an optional intro. The kicker decodes into place, the whole header sits
 * inside a four-corner sensor frame and a ghost numeral is parked in the
 * right margin as a section anchor.
 */
export function SectionHeader({
  kicker,
  title,
  intro,
  children,
  className = '',
}: SectionHeaderProps) {
  const index = kicker.split('/')[0]?.trim() ?? ''

  return (
    <header className={`relative ${className}`} data-reveal>
      <span className="brackets" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>

      {index ? (
        <span className="ghost-index hidden lg:block" aria-hidden="true">
          {index}
        </span>
      ) : null}

      <div className="relative flex items-center gap-4">
        <span className="label text-signal">
          <DecodeText text={kicker} />
        </span>
        <span className="rule flex-1" />
      </div>

      <div className="relative mt-6">
        <h2 className="display max-w-4xl text-title text-ink">{title}</h2>
        {intro ? (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-dim">
            {intro}
          </p>
        ) : null}
      </div>

      {children}
    </header>
  )
}
