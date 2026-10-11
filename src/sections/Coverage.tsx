import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { css, cx } from '../../styled-system/css'
import { Button, container, easeOut, Eyebrow, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { business, coverage } from '../data/site'
import { useQuote } from '../lib/quote'

// A rail-map style schematic of the patch. Lines loosely follow the real routes
// out of London (Great Eastern, c2c and West Anglia), drawn as cables.
const LINES = [
  { id: 'blue', colour: '#3B82F6', d: 'M50 300 H330 L400 230 H480 L570 140' },
  { id: 'brown', colour: '#C2733F', d: 'M50 300 L90 340 H570' },
  { id: 'earth', colour: '#2BB673', d: 'M120 300 V170', stripe: '#F2D13A' },
]

const STOPS: { name: string; x: number; y: number; label: 'above' | 'below' | 'between' | 'right'; major?: boolean }[] = [
  { name: 'London', x: 50, y: 300, label: 'above', major: true },
  { name: 'Stratford', x: 120, y: 300, label: 'between' },
  { name: 'Ilford', x: 190, y: 300, label: 'above' },
  { name: 'Romford', x: 260, y: 300, label: 'above' },
  { name: 'Brentwood', x: 330, y: 300, label: 'between' },
  { name: 'Chelmsford', x: 400, y: 230, label: 'above', major: true },
  { name: 'Witham', x: 480, y: 230, label: 'below' },
  { name: 'Colchester', x: 570, y: 140, label: 'above', major: true },
  { name: 'Barking', x: 150, y: 340, label: 'below' },
  { name: 'Upminster', x: 260, y: 340, label: 'below' },
  { name: 'Basildon', x: 380, y: 340, label: 'below' },
  { name: 'Leigh-on-Sea', x: 480, y: 340, label: 'below' },
  { name: 'Southend', x: 570, y: 340, label: 'below', major: true },
  { name: 'Harlow', x: 120, y: 170, label: 'right' },
]

const towns = ['Southend-on-Sea', 'Basildon', 'Chelmsford', 'Brentwood', 'Romford', 'Colchester', 'Harlow', 'East London', 'Central London']

type Result = { kind: 'yes' | 'maybe' | 'invalid'; area?: string }

export function Coverage() {
  const { startQuote } = useQuote()
  const [postcode, setPostcode] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const check = (e: FormEvent) => {
    e.preventDefault()
    const match = postcode.trim().toUpperCase().match(/^([A-Z]{1,2})(\d[A-Z\d]?)/)
    if (!match) return setResult({ kind: 'invalid' })
    const covered = [...coverage.essex, ...coverage.london].includes(match[1])
    setResult({ kind: covered ? 'yes' : 'maybe', area: match[1] + match[2] })
  }

  return (
    <section id="coverage" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.950', overflow: 'hidden' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' }, gap: { base: '12', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Reveal>
            <Eyebrow index="07">Where we work</Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="Across Essex" /> <RevealWords text="& London." delay={0.15} className={css({ color: 'ink.300' })} />
          </h2>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.muted', mt: '6', maxW: '32rem' })}>
              Local electricians for homes and businesses right across the county and the capital, and on the rail network that
              connects them.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={check} className={css({ mt: '8', maxW: '30rem' })}>
              <label htmlFor="postcode" className={css({ textStyle: 'eyebrow', color: 'fg.subtle', display: 'block', mb: '3' })}>
                Do you cover me?
              </label>
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  p: '1.5',
                  pl: '4',
                  rounded: 'full',
                  bg: 'rgba(255,255,255,0.05)',
                  border: '1px solid',
                  borderColor: 'line.default',
                  _focusWithin: { borderColor: 'spark.400', boxShadow: '0 0 0 4px rgba(255,181,71,0.12)' },
                })}
              >
                <MapPin size={18} className={css({ color: 'fg.subtle', flexShrink: '0' })} aria-hidden />
                <input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter your postcode, e.g. SS1"
                  autoComplete="postal-code"
                  className={css({ flex: '1', w: '0', minW: '0', bg: 'transparent', outline: 'none', fontSize: 'md', textTransform: 'uppercase', _placeholder: { textTransform: 'none', color: 'ink.400' } })}
                />
                <Button type="submit" size="sm" aria-label="Check postcode">
                  <Search size={16} aria-hidden /> Check
                </Button>
              </div>
              <div aria-live="polite" className={css({ minH: '16' })}>
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.p
                      key={`${result.kind}-${result.area}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={css({ mt: '4', fontSize: 'sm', color: 'ink.100' })}
                    >
                      {result.kind === 'yes' && (
                        <>
                          <strong className={css({ color: '#2FC26B' })}>Good news, {result.area} is in our patch.</strong>{' '}
                          <button type="button" onClick={() => startQuote()} className={css({ textDecoration: 'underline', textUnderlineOffset: '3px', color: 'white' })}>
                            Get your free quote
                          </button>
                        </>
                      )}
                      {result.kind === 'maybe' && (
                        <>
                          <strong className={css({ color: 'spark.300' })}>{result.area} is outside our usual patch,</strong> but call{' '}
                          <a href={business.phoneHref} className={css({ textDecoration: 'underline', textUnderlineOffset: '3px', color: 'white' })}>
                            {business.phone}
                          </a>{' '}
                          and we will always try to help.
                        </>
                      )}
                      {result.kind === 'invalid' && <>Pop in the start of your postcode, like SS1 or E14.</>}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', mt: '2' })}>
              {towns.map((town) => (
                <li key={town} className={css({ fontSize: 'xs', px: '3', py: '1.5', rounded: 'full', border: '1px solid', borderColor: 'line.default', color: 'ink.200' })}>
                  {town}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <NetworkMap />
        </Reveal>
      </div>
    </section>
  )
}

function NetworkMap() {
  const reduceMotion = useReducedMotion()
  return (
    <figure
      className={css({
        position: 'relative',
        rounded: 'card',
        overflow: 'hidden',
        bg: 'navy.900',
        border: '1px solid',
        borderColor: 'line.default',
        bgImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        bgSize: '32px 32px',
        boxShadow: '0 50px 100px -40px rgba(0,0,0,0.9)',
      })}
    >
      <svg viewBox="0 0 640 440" className={css({ display: 'block', w: '100%', h: 'auto' })} role="img" aria-label="Map of the areas we cover, from London out to Colchester and Southend-on-Sea">
        <text x="612" y="78" textAnchor="end" fontSize="64" fontWeight="800" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" fontFamily="Archivo Variable, sans-serif" letterSpacing="-2">
          ESSEX
        </text>
        <path d="M0 384 C80 372 120 402 200 394 S320 370 400 386 S520 418 640 400" fill="none" stroke="rgba(59,130,246,0.14)" strokeWidth="20" strokeLinecap="round" />
        <text x="214" y="418" fontSize="10" fill="rgba(147,180,255,0.55)" fontStyle="italic" fontFamily="Inter Variable, sans-serif">
          River Thames
        </text>

        {LINES.map((line, i) => (
          <g key={line.id}>
            <motion.path
              d={line.d}
              fill="none"
              stroke={line.colour}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, delay: 0.2 + i * 0.25, ease: [0.65, 0, 0.35, 1] }}
            />
            {line.stripe && (
              <motion.path
                d={line.d}
                fill="none"
                stroke={line.stripe}
                strokeWidth="3.5"
                strokeDasharray="7 7"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6 }}
              />
            )}
            {!reduceMotion &&
              [0, 0.5].map((offset) => (
                <circle key={offset} r="4" fill="#FFE7C2" style={{ filter: 'drop-shadow(0 0 6px #FFB547)' }}>
                  <animateMotion dur={`${5 + i}s`} begin={`${2 + offset * (5 + i)}s`} repeatCount="indefinite" path={line.d} />
                </circle>
              ))}
          </g>
        ))}

        {STOPS.map((stop, i) => {
          const labelPos = {
            above: { x: stop.x, y: stop.y - 17, anchor: 'middle' as const },
            below: { x: stop.x, y: stop.y + 27, anchor: 'middle' as const },
            between: { x: stop.x, y: stop.y + 24, anchor: 'middle' as const },
            right: { x: stop.x + 16, y: stop.y + 4, anchor: 'start' as const },
          }[stop.label]
          return (
            <motion.g
              key={stop.name}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.5, ease: easeOut }}
              style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
            >
              <circle cx={stop.x} cy={stop.y} r={stop.major ? 9 : 6} fill="#070E22" stroke="white" strokeWidth={stop.major ? 3 : 2.5} />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor={labelPos.anchor}
                fontSize={stop.major ? 12 : 10}
                fontWeight={stop.major ? 700 : 500}
                fill={stop.major ? '#FFFFFF' : 'rgba(220,227,242,0.8)'}
                fontFamily="JetBrains Mono Variable, monospace"
                letterSpacing="0.5"
              >
                {stop.name.toUpperCase()}
              </text>
            </motion.g>
          )
        })}
      </svg>
      <figcaption
        className={css({
          position: 'absolute',
          left: '5',
          top: '5',
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          fontFamily: 'mono',
          fontSize: '0.66rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'ink.200',
        })}
      >
        <span className={css({ w: '2', h: '2', rounded: 'full', bg: '#2FC26B', boxShadow: '0 0 10px #2FC26B' })} />
        Our patch · Essex &amp; London
      </figcaption>
    </figure>
  )
}
