import type { ReactNode } from 'react'

interface SectionHeaderProps {
  kicker: string
  title: string
  intro?: string
  children?: ReactNode
  className?: string
}

/**
 * Shared section chrome: an index rule, a monospace kicker, a display title
 * and an optional intro column.
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
      <div className="flex items-center gap-4">
        <span className="label text-signal">{kicker}</span>
        <span className="rule flex-1" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
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
