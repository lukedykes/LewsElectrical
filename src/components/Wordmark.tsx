import { motion } from 'framer-motion'
import { css, cx } from '../../styled-system/css'

// "LEWS" drawn as a bundle of three cables in UK core colours (brown, blue,
// green-and-yellow earth) with stripped copper ends, after the client's logo.
const LETTERS = [
  'M16 14 V84 H62',
  'M124 14 H80 V84 H124 M80 49 H116',
  'M138 14 L154 84 L170 34 L186 84 L202 14',
  'M282 24 C276 17 266 13 252 13 C235 13 222 21 222 33 C222 46 234 50 251 52 C269 54 284 59 284 72 C284 84 270 88 252 88 C237 88 226 84 218 76',
]

const WIRES = [
  { color: '#C2733F', dx: -4.6, dy: 4.6 },
  { color: '#3B82F6', dx: 0, dy: 0 },
  { color: '#2BB673', dx: 4.6, dy: -4.6, stripe: '#F2D13A' },
]

const COPPER = ['M16 14 V5', 'M218 76 L211 69']

export function Wordmark({ className, animate = false, play = true, strokeWidth = 5.2, title = 'Lews Electrical' }: {
  className?: string
  /** Draw the cables in rather than rendering them static. */
  animate?: boolean
  /** With `animate`, holds the drawing until this turns true (e.g. when scrolled into view). */
  play?: boolean
  strokeWidth?: number
  title?: string
}) {
  const on = !animate || play
  return (
    <svg viewBox="-6 -6 312 112" className={cx(css({ display: 'block', overflow: 'visible' }), className)} role="img" aria-label={title}>
      {WIRES.map((wire, w) => (
        <g key={wire.color} transform={`translate(${wire.dx} ${wire.dy})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {COPPER.map((d) => (
            <motion.path
              key={d}
              d={d}
              stroke="#E8A15C"
              strokeWidth={strokeWidth * 0.5}
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ delay: animate ? 1.3 + w * 0.08 : 0, duration: 0.4 }}
            />
          ))}
          {LETTERS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={wire.color}
              strokeWidth={strokeWidth}
              initial={animate ? { pathLength: 0 } : false}
              animate={{ pathLength: on ? 1 : 0 }}
              transition={{ duration: 1.1, delay: animate ? 0.15 + i * 0.12 + w * 0.1 : 0, ease: [0.65, 0, 0.35, 1] }}
            />
          ))}
          {wire.stripe &&
            LETTERS.map((d) => (
              <motion.path
                key={`stripe-${d}`}
                d={d}
                stroke={wire.stripe}
                strokeWidth={strokeWidth * 0.62}
                strokeDasharray="5 7"
                strokeLinecap="butt"
                initial={animate ? { opacity: 0 } : false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ delay: animate ? 1.4 : 0, duration: 0.6 }}
              />
            ))}
        </g>
      ))}
    </svg>
  )
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx(css({ display: 'inline-flex', alignItems: 'center', gap: '3' }), className)}>
      <Wordmark className={css({ h: compact ? '7' : '8', w: 'auto' })} strokeWidth={7} />
      <span
        className={css({
          display: { base: compact ? 'none' : 'flex', sm: 'flex' },
          flexDir: 'column',
          lineHeight: '1',
          pl: '3',
          borderLeft: '1px solid {colors.line.default}',
        })}
      >
        <span className={css({ fontFamily: 'display', fontWeight: '700', fontSize: '0.95rem', letterSpacing: '-0.01em' })}>Electrical Ltd</span>
        <span className={css({ fontFamily: 'mono', fontSize: '0.56rem', letterSpacing: '0.18em', color: 'fg.subtle', mt: '1', textTransform: 'uppercase' })}>
          Essex &amp; London
        </span>
      </span>
    </span>
  )
}
