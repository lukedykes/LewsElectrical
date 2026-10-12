import { css, cx } from '../../styled-system/css'

// "LEWS" drawn as three cables in UK core colours (brown, blue, green-and-yellow
// earth), after the client's logo. Swap for their artwork before launch.
const LETTERS = [
  'M16 14 V84 H62',
  'M124 14 H80 V84 H124 M80 49 H116',
  'M138 14 L154 84 L170 34 L186 84 L202 14',
  'M282 24 C276 17 266 13 252 13 C235 13 222 21 222 33 C222 46 234 50 251 52 C269 54 284 59 284 72 C284 84 270 88 252 88 C237 88 226 84 218 76',
]

const WIRES = [
  { colour: '#9C5A33', dx: -4.6, dy: 4.6 },
  { colour: '#2563EB', dx: 0, dy: 0 },
  { colour: '#1F9D55', dx: 4.6, dy: -4.6, stripe: '#F2C200' },
]

export function Wordmark({ className, strokeWidth = 7 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="-6 -6 312 112" className={cx(css({ display: 'block', overflow: 'visible' }), className)} aria-hidden>
      {WIRES.map((wire) => (
        <g key={wire.colour} transform={`translate(${wire.dx} ${wire.dy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 14 V5 M218 76 L211 69" stroke="#D9883F" strokeWidth={strokeWidth * 0.5} />
          {LETTERS.map((d) => (
            <path key={d} d={d} stroke={wire.colour} strokeWidth={strokeWidth} />
          ))}
          {wire.stripe &&
            LETTERS.map((d) => <path key={`s${d}`} d={d} stroke={wire.stripe} strokeWidth={strokeWidth * 0.55} strokeDasharray="5 7" strokeLinecap="butt" />)}
        </g>
      ))}
    </svg>
  )
}

export function Logo({ onNavy, tagline, className }: { onNavy?: boolean; tagline?: boolean; className?: string }) {
  return (
    <span className={cx(css({ display: 'inline-flex', alignItems: 'center', gap: { base: '2.5', sm: '3' } }), className)} aria-label="Lews Electrical Ltd">
      <Wordmark className={css({ h: { base: '7', sm: '8', md: '9' }, w: 'auto' })} />
      <span
        className={cx(
          css({ display: 'flex', flexDir: 'column', pl: { base: '2.5', sm: '3' }, borderLeft: '2px solid', lineHeight: '1' }),
          onNavy ? css({ borderColor: 'rgba(255,255,255,0.3)' }) : css({ borderColor: 'paper.300' }),
        )}
      >
        <span
          className={cx(
            css({ fontFamily: 'heading', fontWeight: '700', fontSize: { base: '1rem', sm: '1.25rem' }, textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap', '@media (max-width: 359px)': { fontSize: '0.86rem' } }),
            onNavy ? css({ color: 'white' }) : css({ color: 'navy.900' }),
          )}
        >
          Electrical Ltd
        </span>
        {tagline && (
          <span
            className={cx(
              css({ fontFamily: 'heading', fontWeight: '600', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: { base: 'normal', sm: 'nowrap' }, mt: '1' }),
              onNavy ? css({ color: 'navy.200' }) : css({ color: 'ink.500' }),
            )}
          >
            Powering people, places &amp; possibilities
          </span>
        )}
      </span>
    </span>
  )
}
