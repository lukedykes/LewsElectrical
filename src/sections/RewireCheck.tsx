import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { Check, Gauge, Home, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, easeOut, Eyebrow, Img, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { rewireSigns } from '../data/site'
import { useQuote } from '../lib/quote'

const benefits = [
  { icon: ShieldCheck, title: 'Improve safety', body: 'Modern protection that trips in a fraction of a second.' },
  { icon: TrendingUp, title: 'Add property value', body: 'Buyers and surveyors look for an up-to-date installation.' },
  { icon: Sparkles, title: 'Modern & reliable', body: 'Sockets, lighting and switches where you actually need them.' },
  { icon: Check, title: 'Tested & certified', body: 'Every circuit tested, with certificates for your records.' },
]

type Verdict = { title: string; body: string; cta: string; service: string; tone: 'good' | 'check' | 'act' | 'urgent' }

function verdictFor(score: number, urgent: boolean): Verdict {
  if (urgent)
    return {
      tone: 'urgent',
      title: "Don't wait on this one",
      body: 'Scorch marks, buzzing or warm sockets need checking straight away. Stop using the affected outlets and get in touch.',
      cta: 'Get it checked',
      service: 'Fault finding',
    }
  if (score === 0)
    return {
      tone: 'good',
      title: 'Looking good',
      body: 'No warning signs. An EICR every 10 years (5 for rentals) keeps it that way.',
      cta: 'Book an EICR',
      service: 'EICR / testing',
    }
  if (score <= 2)
    return {
      tone: 'check',
      title: 'Worth a check',
      body: 'A couple of things worth looking at. An EICR will tell you exactly where you stand.',
      cta: 'Book an EICR',
      service: 'EICR / testing',
    }
  return {
    tone: 'act',
    title: 'Time for a proper look',
    body: 'Several signs of an ageing installation. It could be time for a new fuse board or a rewire.',
    cta: 'Get a rewire quote',
    service: 'Full rewire',
  }
}

const toneColour = { good: '#2FC26B', check: '#FFB547', act: '#FF7A45', urgent: '#FF4D66' }

export function RewireCheck() {
  const { startQuote } = useQuote()
  const [ticked, setTicked] = useState<string[]>([])
  const score = rewireSigns.filter((s) => ticked.includes(s.id)).reduce((sum, s) => sum + s.weight, 0)
  const urgent = rewireSigns.some((s) => s.urgent && ticked.includes(s.id))
  const verdict = verdictFor(score, urgent)

  const toggle = (id: string) => setTicked((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))

  return (
    <section id="rewire" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.950', overflow: 'hidden' }))}>
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          bgImage: 'radial-gradient(50% 40% at 85% 20%, rgba(47, 123, 255, 0.12), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(227, 23, 58, 0.1), transparent 70%)',
        })}
      />
      <div className={cx(container, css({ position: 'relative', display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: { base: '12', lg: '20' } }))}>
        <div>
          <Reveal>
            <Eyebrow index="03">Is it time?</Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="Does your home need" />{' '}
            <RevealWords text="rewiring?" delay={0.2} className={css({ color: 'spark.400' })} />
          </h2>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.muted', mt: '6', maxW: '34rem' })}>
              Old wiring rarely announces itself. Take the 60-second check, and if anything rings a bell, we will give it a
              proper look.
            </p>
          </Reveal>

          <Reveal delay={0.15} className={css({ position: 'relative', mt: '10', rounded: 'card', overflow: 'hidden', aspectRatio: { base: '4 / 3', md: '16 / 10' } })}>
            <Img photo={photos.homeDusk} sizes="(min-width: 1024px) 45vw, 100vw" className={coverImage} />
            <div aria-hidden className={css({ position: 'absolute', inset: '0', bgImage: 'linear-gradient(180deg, transparent 50%, rgba(4,8,20,0.85))' })} />
            <div
              className={css({
                position: 'absolute',
                left: '5',
                bottom: '5',
                display: 'flex',
                alignItems: 'center',
                gap: '3',
                pl: '2',
                pr: '4',
                py: '2',
                rounded: 'full',
                bg: 'rgba(4,8,20,0.6)',
                border: '1px solid',
                borderColor: 'line.strong',
                backdropFilter: 'blur(10px)',
              })}
            >
              <span className={css({ display: 'grid', placeItems: 'center', w: '8', h: '8', rounded: 'full', bg: 'crimson.500' })}>
                <Home size={16} aria-hidden />
              </span>
              <span className={css({ fontWeight: '600', fontSize: 'sm' })}>A safer, brighter home starts here</span>
            </div>
          </Reveal>

          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: '6', mt: '10' })}>
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: easeOut }}
                className={css({ display: 'flex', gap: '4' })}
              >
                  <span
                    className={css({
                      flexShrink: '0',
                      display: 'grid',
                      placeItems: 'center',
                      w: '11',
                      h: '11',
                      rounded: 'xl',
                      bg: 'rgba(227, 23, 58, 0.12)',
                      color: 'crimson.400',
                      border: '1px solid rgba(227, 23, 58, 0.3)',
                    })}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                  <span>
                    <span className={css({ display: 'block', fontWeight: '650' })}>{title}</span>
                    <span className={css({ display: 'block', color: 'fg.subtle', fontSize: 'sm', mt: '1' })}>{body}</span>
                  </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className={css({ lg: { position: 'sticky', top: '24', alignSelf: 'start' } })}>
          <div
            className={css({
              rounded: 'card',
              p: { base: '6', md: '8' },
              bg: 'linear-gradient(180deg, rgba(20, 38, 79, 0.75), rgba(10, 20, 48, 0.85))',
              border: '1px solid',
              borderColor: 'line.default',
              boxShadow: '0 40px 100px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            })}
          >
            <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4' })}>
              <div>
                <p className={css({ textStyle: 'eyebrow', color: 'spark.300', display: 'flex', alignItems: 'center', gap: '2' })}>
                  <Gauge size={14} aria-hidden /> 60-second safety check
                </p>
                <p className={css({ color: 'fg.subtle', fontSize: 'sm', mt: '1.5' })}>Tick anything that sounds familiar.</p>
              </div>
              {ticked.length > 0 && (
                <button
                  type="button"
                  onClick={() => setTicked([])}
                  className={css({ fontSize: 'xs', color: 'fg.subtle', textDecoration: 'underline', textUnderlineOffset: '3px', _hover: { color: 'white' } })}
                >
                  Reset
                </button>
              )}
            </div>

            <Dial score={score} urgent={urgent} colour={toneColour[verdict.tone]} />

            <ul className={css({ display: 'grid', gap: '2' })} aria-label="Warning signs">
              {rewireSigns.map((sign) => {
                const on = ticked.includes(sign.id)
                return (
                  <li key={sign.id}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(sign.id)}
                      className={cx(
                        css({
                          w: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3.5',
                          textAlign: 'left',
                          px: '4',
                          py: '3',
                          rounded: 'xl',
                          border: '1px solid',
                          fontSize: 'sm',
                          transition: 'background 0.25s, border-color 0.25s',
                          cursor: 'pointer',
                        }),
                        on
                          ? css({ bg: 'rgba(255, 181, 71, 0.1)', borderColor: 'rgba(255, 181, 71, 0.45)' })
                          : css({ bg: 'rgba(255,255,255,0.02)', borderColor: 'line.subtle', _hover: { bg: 'rgba(255,255,255,0.05)', borderColor: 'line.default' } }),
                      )}
                    >
                      <span
                        className={cx(
                          css({ flexShrink: '0', display: 'grid', placeItems: 'center', w: '5', h: '5', rounded: 'md', border: '1.5px solid', transition: 'all 0.2s' }),
                          on ? css({ bg: 'spark.400', borderColor: 'spark.400', color: 'navy.950' }) : css({ borderColor: 'ink.400', color: 'transparent' }),
                        )}
                      >
                        <Check size={14} strokeWidth={3} aria-hidden />
                      </span>
                      <span className={on ? css({ color: 'white' }) : css({ color: 'ink.100' })}>{sign.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div aria-live="polite" className={css({ mt: '6', p: '5', rounded: 'xl', bg: 'rgba(4, 8, 20, 0.55)', border: '1px solid', borderColor: 'line.subtle' })}>
              <AnimatePresence mode="wait">
                <motion.div key={verdict.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  <p className={css({ fontFamily: 'display', fontWeight: '750', fontSize: 'xl', letterSpacing: '-0.02em' })} style={{ color: toneColour[verdict.tone] }}>
                    {verdict.title}
                  </p>
                  <p className={css({ color: 'ink.100', fontSize: 'sm', mt: '1.5' })}>{verdict.body}</p>
                </motion.div>
              </AnimatePresence>
              <Button size="md" arrow className={css({ mt: '5', w: { base: '100%', sm: 'auto' } })} onClick={() => startQuote({ sector: 'domestic', service: verdict.service })}>
                {verdict.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const MAX_SCORE = 8

function Dial({ score, urgent, colour }: { score: number; urgent: boolean; colour: string }) {
  const target = urgent ? 1 : Math.min(score / MAX_SCORE, 1)
  const spring = useSpring(0, { stiffness: 90, damping: 14 })
  const rotate = useTransform(spring, [0, 1], [-90, 90])

  useEffect(() => {
    spring.set(target)
  }, [spring, target])

  const ticks = Array.from({ length: 21 }, (_, i) => i)

  return (
    <div className={css({ position: 'relative', w: '100%', maxW: '300px', mx: 'auto', my: '6' })}>
      <svg viewBox="0 0 240 136" className={css({ w: '100%', display: 'block' })} aria-hidden>
        <defs>
          <linearGradient id="dial-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#2FC26B" />
            <stop offset="0.5" stopColor="#FFB547" />
            <stop offset="1" stopColor="#FF4D66" />
          </linearGradient>
        </defs>
        <path d="M24 120 A96 96 0 0 1 216 120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path d="M24 120 A96 96 0 0 1 216 120" fill="none" stroke="url(#dial-arc)" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
        {ticks.map((i) => {
          const a = Math.PI - (i / 20) * Math.PI
          const r1 = i % 5 === 0 ? 74 : 79
          return (
            <line
              key={i}
              x1={120 + Math.cos(a) * r1}
              y1={120 - Math.sin(a) * r1}
              x2={120 + Math.cos(a) * 84}
              y2={120 - Math.sin(a) * 84}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={i % 5 === 0 ? 1.6 : 1}
            />
          )
        })}
        <text x="22" y="134" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="JetBrains Mono Variable, monospace">OK</text>
        <text x="200" y="134" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="JetBrains Mono Variable, monospace">ACT</text>
      </svg>
      <motion.div
        style={{ rotate, x: '-50%' }}
        className={css({ position: 'absolute', left: '50%', bottom: '11.8%', w: '4px', h: '42%', transformOrigin: '50% 100%' })}
      >
        <span className={css({ display: 'block', w: '100%', h: '100%', rounded: 'full', bg: 'white', boxShadow: '0 0 12px rgba(255,255,255,0.6)' })} />
      </motion.div>
      <span
        className={css({ position: 'absolute', left: '50%', bottom: '11.8%', w: '5', h: '5', rounded: 'full', translate: '-50% 50%', border: '3px solid', borderColor: 'navy.800' })}
        style={{ background: colour, boxShadow: `0 0 18px ${colour}` }}
      />
    </div>
  )
}
