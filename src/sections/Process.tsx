import { motion, useMotionValueEvent, useScroll, useSpring, type MotionValue } from 'framer-motion'
import { useId, useRef, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { container, Eyebrow, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { processSteps } from '../data/site'

// Three cables sagging between four "poles" (the step markers), drawn as you scroll.
const WIRES = [
  { color: '#C2733F', d: 'M125 26 Q250 62 375 26 Q500 62 625 26 Q750 62 875 26' },
  { color: '#3B82F6', d: 'M125 30 Q250 74 375 30 Q500 74 625 30 Q750 74 875 30' },
  { color: '#2BB673', d: 'M125 34 Q250 86 375 34 Q500 86 625 34 Q750 86 875 34', stripe: '#F2D13A' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [reached, setReached] = useState(-1)

  useMotionValueEvent(progress, 'change', (p) => {
    const step = Math.min(processSteps.length - 1, Math.floor(p * (processSteps.length - 1) + 0.08))
    setReached(p < 0.02 ? -1 : step)
  })

  return (
    <section id="process" className={cx(sectionPadding, css({ position: 'relative', bg: 'paper.100', color: 'fg.onPaper', overflow: 'hidden' }))}>
      <div className={container}>
        <div className={css({ maxW: '52rem' })}>
          <Reveal>
            <Eyebrow index="05" tone="light">
              How it works
            </Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="From first call to" /> <RevealWords text="final certificate." delay={0.2} className={css({ color: 'crimson.500' })} />
          </h2>
        </div>

        <div ref={ref} className={css({ position: 'relative', mt: { base: '14', md: '20' } })}>
          <svg
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden
            className={css({ display: { base: 'none', md: 'block' }, position: 'absolute', left: '0', right: '0', top: '0', w: '100%', h: '100px', overflow: 'visible' })}
          >
            {WIRES.map((wire) => (
              <g key={wire.color}>
                <path d={wire.d} fill="none" stroke="rgba(7,14,34,0.08)" strokeWidth="5" />
                <WirePath d={wire.d} color={wire.color} progress={progress} />
                {wire.stripe && <WirePath d={wire.d} color={wire.stripe} progress={progress} dashed />}
              </g>
            ))}
          </svg>

          {/* Mobile: a single vertical cable down the left. */}
          <div aria-hidden className={css({ display: { base: 'block', md: 'none' }, position: 'absolute', left: '27px', top: '4', bottom: '4', w: '3px', bg: 'rgba(7,14,34,0.1)', rounded: 'full' })}>
            <motion.div
              style={{ scaleY: progress }}
              className={css({ w: '100%', h: '100%', transformOrigin: 'top', rounded: 'full', bgImage: 'linear-gradient(180deg, #C2733F, #3B82F6 50%, #2BB673)' })}
            />
          </div>

          <ol className={css({ position: 'relative', display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(4, 1fr)' }, gap: { base: '10', md: '6' } })}>
            {processSteps.map((step, i) => {
              const live = reached >= i
              return (
                <li key={step.title} className={css({ display: 'flex', flexDir: { base: 'row', md: 'column' }, alignItems: { base: 'flex-start', md: 'center' }, textAlign: { md: 'center' }, gap: { base: '5', md: '6' } })}>
                  <span
                    className={cx(
                      css({
                        position: 'relative',
                        flexShrink: '0',
                        display: 'grid',
                        placeItems: 'center',
                        w: { base: '14', md: '60px' },
                        h: { base: '14', md: '60px' },
                        rounded: 'full',
                        fontFamily: 'mono',
                        fontWeight: '600',
                        fontSize: 'sm',
                        border: '2px solid',
                        transition: 'background 0.4s, color 0.4s, border-color 0.4s, box-shadow 0.6s',
                      }),
                      live
                        ? css({ bg: 'crimson.500', color: 'white', borderColor: 'crimson.500', boxShadow: '0 0 0 8px rgba(227,23,58,0.12), 0 0 40px rgba(227,23,58,0.45)' })
                        : css({ bg: 'paper.50', color: 'ink.400', borderColor: 'paper.300' }),
                    )}
                  >
                    0{i + 1}
                  </span>
                  <div className={css({ pt: { base: '2', md: '0' } })}>
                    <h3 className={css({ fontFamily: 'display', fontWeight: '750', fontSize: { base: 'xl', md: '2xl' }, letterSpacing: '-0.02em' })}>{step.title}</h3>
                    <p className={css({ color: 'fg.onPaperMuted', mt: '2', maxW: '30ch', mx: { md: 'auto' } })}>{step.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

function WirePath({ d, color, progress, dashed }: { d: string; color: string; progress: MotionValue<number>; dashed?: boolean }) {
  const maskId = useId()
  if (dashed) {
    // pathLength can't animate a dashed stroke, so the earth wire's yellow stripe is
    // masked by a solid copy of the path that draws at the same rate.
    return (
      <>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="100">
          <motion.path d={d} fill="none" stroke="white" strokeWidth="6" style={{ pathLength: progress }} />
        </mask>
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 8" mask={`url(#${maskId})`} />
      </>
    )
  }
  return <motion.path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" style={{ pathLength: progress }} />
}
