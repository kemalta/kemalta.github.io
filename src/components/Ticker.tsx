interface TickerProps {
  items: string[]
  reverse?: boolean
  className?: string
}

/**
 * A continuous band of labels. Purely decorative — the same list is already
 * readable in the section it belongs to — so it is hidden from assistive tech
 * and never holds focus.
 */
export function Ticker({ items, reverse = false, className = '' }: TickerProps) {
  const run = [...items, ...items]

  return (
    <div className={`ticker-band pointer-events-none ${className}`} aria-hidden="true">
      <div className={`ticker ${reverse ? 'ticker-reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="ticker-group">
            {run.map((item, index) => (
              <span key={`${copy}-${index}`} className="ticker-item">
                {item}
                <span className="ticker-sep">{index % 2 === 0 ? '✦' : '·'}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
