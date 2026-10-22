import { useEffect, useState } from 'react'
import { profile } from '../content'

/**
 * Live wall clock in the visitor's timezone, updated once a second.
 * Renders as `HH:MM:SS` plus the UTC offset.
 */
export function useClock(timeZone: string = profile.timezone) {
  const [now, setNow] = useState(() => format(new Date(), timeZone))

  useEffect(() => {
    const id = window.setInterval(() => setNow(format(new Date(), timeZone)), 1000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return now
}

function format(date: Date, timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(date)

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === type)?.value ?? '00'

    const offset = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value

    return `${get('hour')}:${get('minute')}:${get('second')}${offset ? ` ${offset}` : ''}`
  } catch {
    return date.toLocaleTimeString('en-GB', { hour12: false })
  }
}
