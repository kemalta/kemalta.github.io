import { useMemo } from 'react'
import type { CSSProperties } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  /** Milliseconds between characters. */
  step?: number
  /** Milliseconds before the first character animates. */
  delay?: number
  as?: 'span' | 'h1' | 'h2' | 'p'
}

/**
 * Splits a string into per-character spans so the headline can be revealed
 * with a stagger. Spaces are preserved as real characters so the text stays
 * selectable and accessible.
 */
export function SplitText({
  text,
  className,
  step = 26,
  delay: delayBase = 0,
  as = 'span',
}: SplitTextProps) {
  const Tag = as

  const characters = useMemo(
    () => Array.from(text).map((char, index) => ({ char, index })),
    [text],
  )

  return (
    <Tag className={className} aria-label={text}>
      {characters.map(({ char, index }) => {
        const delay = `${delayBase + index * step}ms`
        if (char === ' ') {
          return (
            <span key={index} className="split-char" aria-hidden="true">
              <span style={{ '--char-delay': delay } as CSSProperties}>&nbsp;</span>
            </span>
          )
        }
        return (
          <span key={index} className="split-char" aria-hidden="true">
            <span style={{ '--char-delay': delay } as CSSProperties}>{char}</span>
          </span>
        )
      })}
    </Tag>
  )
}
