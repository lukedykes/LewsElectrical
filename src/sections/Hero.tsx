import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { BadgeCheck, Phone } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, ButtonLink, container, coverImage, easeOut, Img } from '../components/ui'
import { business } from '../data/site'
import { useQuote } from '../lib/quote'

// Callouts pinned to features in the landscape hero photo (fractions of the image).
const CALLOUTS = [
  { label: 'Pendant & smart lighting', x: 0.585, y: 0.6, side: 'right' as const },
  { label: 'LED downlights', x: 0.705, y: 0.525, side: 'right' as const },
  { label: 'Garden & external lighting', x: 0.9, y: 0.8, side: 'left' as const },
]

const flickerOn = { opacity: [0, 0.85, 0.1, 1, 0.45, 1] }
const flickerTiming = { duration: 1.25, times: [0, 0.08, 0.15, 0.3, 0.4, 0.62], ease: 'linear' as const }

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { startQuote } = useQuote()
  const [lit, setLit] = useState(false)
  const [touched, setTouched] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // The lights come on by themselves shortly after load, unless the visitor gets there first.
  useEffect(() => {
    if (touched) return
    const timer = window.setTimeout(() => setLit(true), reduceMotion ? 0 : 1100)
    return () => window.clearTimeout(timer)
  }, [touched, reduceMotion])

  const toggle = () => {
    setTouched(true)
    setLit((v) => !v)
    navigator.vibrate?.(12)
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const lightTransition = reduceMotion ? { duration: 0 } : lit ? flickerTiming : { duration: 0.35 }

  return (
    <section
      id="top"
      ref={ref}
      data-lit={lit}
      aria-label="Introduction"
      className={css({
        position: 'relative',
        mt: '-72px',
        minH: '680px',
        // Fill the first screen below the 36px demo bar.
        h: 'calc(100svh - 36px)',
        maxH: { base: '900px', lg: '1100px' },
        overflow: 'hidden',
        isolation: 'isolate',
        bg: 'navy.950',
      })}
    >
      {/* Photo: a night-graded copy underneath, the lit original on top. */}
      <motion.div style={{ y: mediaY }} className={css({ position: 'absolute', inset: '0', zIndex: '-2' })}>
        <div className={cx(coverBox, css({ display: { base: 'none', lg: 'block' }, aspectRatio: '3 / 2', w: 'max(100%, calc(max(100svh, 680px) * 1.5))' }))}>
          <Img photo={photos.heroOff} alt="" priority sizes="100vw" className={coverImage} />
          <motion.div initial={{ opacity: 0 }} animate={lit ? flickerOn : { opacity: 0 }} transition={lightTransition} className={css({ position: 'absolute', inset: '0' })}>
            <Img photo={photos.hero} priority sizes="100vw" className={coverImage} />
          </motion.div>
          {CALLOUTS.map((c, i) => (
            <Callout key={c.label} {...c} lit={lit} delay={reduceMotion ? 0 : 1.1 + i * 0.18} />
          ))}
        </div>
        <div className={cx(coverBox, css({ display: { base: 'block', lg: 'none' }, aspectRatio: '2 / 3', w: 'max(100%, calc(max(100svh, 680px) * 0.6667))' }))}>
          <Img photo={photos.heroPortraitOff} alt="" priority sizes="100vw" className={coverImage} />
          <motion.div initial={{ opacity: 0 }} animate={lit ? flickerOn : { opacity: 0 }} transition={lightTransition} className={css({ position: 'absolute', inset: '0' })}>
            <Img photo={photos.heroPortrait} priority sizes="100vw" className={coverImage} />
          </motion.div>
        </div>
      </motion.div>

      {/* Legibility scrims and the warm bloom that appears with the lights. */}
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          pointerEvents: 'none',
          bgImage: {
            base: 'linear-gradient(0deg, {colors.navy.950} 4%, rgba(4,8,20,0.82) 42%, rgba(4,8,20,0.2) 72%, rgba(4,8,20,0.55) 100%)',
            // Stops are anchored to the centred text column so wide screens stay legible.
            lg: 'linear-gradient(90deg, rgba(4,8,20,0.94) 0%, rgba(4,8,20,0.8) calc(50% - 160px), rgba(4,8,20,0.32) calc(50% + 160px), rgba(4,8,20,0) calc(50% + 420px)), linear-gradient(0deg, {colors.navy.950} 0%, rgba(4,8,20,0) 26%), linear-gradient(180deg, rgba(4,8,20,0.7) 0%, rgba(4,8,20,0) 22%)',
          },
        })}
      />
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          pointerEvents: 'none',
          opacity: '0',
          transition: 'opacity 1.4s {easings.out} 0.5s',
          bgImage: 'radial-gradient(60% 55% at 72% 62%, rgba(255, 181, 71, 0.16), transparent 70%)',
          mixBlendMode: 'screen',
          _lit: { opacity: '1' },
        })}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cx(
          container,
          css({
            position: 'relative',
            h: '100%',
            display: 'flex',
            flexDir: 'column',
            justifyContent: { base: 'flex-end', lg: 'center' },
            pt: { base: '28', lg: '24' },
            pb: { base: '10', md: '14', lg: '16' },
          }),
        )}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className={css({
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: '2',
            mb: { base: '5', md: '7' },
            pl: '2',
            pr: '3.5',
            py: '1.5',
            rounded: 'full',
            border: '1px solid',
            borderColor: 'line.default',
            bg: 'rgba(4, 8, 20, 0.45)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'mono',
            fontSize: { base: '0.66rem', md: '0.72rem' },
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'ink.100',
          })}
        >
          <BadgeCheck size={16} className={css({ color: 'spark.400' })} aria-hidden />
          NICEIC Approved Contractor
          <span className={css({ display: { base: 'none', sm: 'inline' } })}>· {business.area}</span>
        </motion.p>

        <h1 className={css({ textStyle: 'display', maxW: '13ch' })}>
          <HeadlineLine delay={0.3}>Powering</HeadlineLine>
          <HeadlineLine delay={0.4}>people, places</HeadlineLine>
          <HeadlineLine delay={0.5}>
            &amp;{' '}
            <span
              className={css({
                bgImage: 'linear-gradient(100deg, {colors.crimson.400} 10%, {colors.spark.400} 95%)',
                bgClip: 'text',
                color: 'transparent',
                filter: 'saturate(0.15) brightness(0.55)',
                transition: 'filter 1s {easings.out} 0.35s',
                _lit: { filter: 'saturate(1) brightness(1) drop-shadow(0 0 26px rgba(255, 92, 70, 0.35))' },
              })}
            >
              possibilities.
            </span>
          </HeadlineLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: easeOut }}
          className={css({ textStyle: 'lead', color: 'ink.100', maxW: '34rem', mt: { base: '5', md: '7' }, textShadow: '0 1px 18px rgba(4, 8, 20, 0.9)' })}
        >
          Expert electrical work for homes, businesses and the rail industry. Safe, reliable and high quality, fully tested,
          certified and left tidy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: easeOut }}
          className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3', mt: { base: '7', md: '9' } })}
        >
          <Button size="lg" arrow onClick={() => startQuote()}>
            Get a free quote
          </Button>
          <ButtonLink href={business.phoneHref} variant="ghost" size="lg">
            <Phone size={17} aria-hidden />
            {business.phone}
          </ButtonLink>
          <LightSwitch lit={lit} onToggle={toggle} hint={!touched && !reduceMotion} />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: { base: '2', md: '6' },
            columnGap: '5',
            mt: { base: '7', md: '12' },
            fontFamily: 'mono',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'ink.200',
          })}
        >
          {['City & Guilds qualified', 'Free quotes & advice', 'Tested & certified'].map((item) => (
            <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
              <span aria-hidden className={css({ w: '1.5', h: '1.5', rotate: '45deg', bg: 'crimson.400' })} />
              {item}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <ScrollCue />
    </section>
  )
}

const coverBox = css({ position: 'absolute', left: '50%', top: '50%', translate: '-50% -50%' })

function HeadlineLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className={css({ display: 'block', overflow: 'hidden', pb: '0.06em', mb: '-0.06em' })}>
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease: easeOut }}
        className={css({
          display: 'block',
          color: 'rgba(255, 255, 255, 0.32)',
          transition: 'color 0.9s {easings.out} 0.3s, text-shadow 0.9s {easings.out} 0.3s',
          _lit: { color: 'white', textShadow: '0 0 40px rgba(255, 220, 170, 0.18)' },
        })}
      >
        {children}
      </motion.span>
    </span>
  )
}

function Callout({ label, x, y, side, lit, delay }: (typeof CALLOUTS)[number] & { lit: boolean; delay: number }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: lit ? delay : 0, ease: easeOut }}
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      className={css({ position: 'absolute', display: { base: 'none', lg: 'block' }, pointerEvents: 'none' })}
    >
      <span className={css({ position: 'absolute', left: '-5px', top: '-5px', w: '2.5', h: '2.5', rounded: 'full', bg: 'spark.300', boxShadow: '0 0 16px {colors.spark.400}' })}>
        <span className={css({ position: 'absolute', inset: '0', rounded: 'full', border: '1px solid', borderColor: 'spark.300', _motionSafe: { animation: 'pulseRing 2s {easings.out} infinite' } })} />
      </span>
      <span
        className={cx(
          css({
            position: 'absolute',
            bottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            whiteSpace: 'nowrap',
            px: '3',
            py: '1.5',
            rounded: 'md',
            bg: 'rgba(4, 8, 20, 0.66)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'rgba(255, 208, 138, 0.35)',
            fontFamily: 'mono',
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'spark.200',
          }),
          side === 'left' ? css({ right: '6px' }) : css({ left: '6px' }),
        )}
      >
        {label}
      </span>
    </motion.div>
  )
}

function LightSwitch({ lit, onToggle, hint }: { lit: boolean; onToggle: () => void; hint: boolean }) {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '3',
        ml: { base: '0', sm: '1' },
        p: '1',
        pr: '4',
        rounded: '18px',
        bg: 'rgba(4, 8, 20, 0.55)',
        border: '1px solid',
        borderColor: 'line.subtle',
        backdropFilter: 'blur(12px)',
      })}
    >
      <button
        type="button"
        role="switch"
        aria-checked={lit}
        aria-label="Hero lights"
        onClick={onToggle}
        className={css({
          position: 'relative',
          w: '12',
          h: '12',
          rounded: '14px',
          bg: 'linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03))',
          border: '1px solid',
          borderColor: 'line.strong',
          boxShadow: '0 10px 30px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          transition: 'border-color 0.3s',
          _hover: { borderColor: 'rgba(255,255,255,0.5)' },
        })}
      >
        <span
          className={css({
            position: 'relative',
            w: '6',
            h: '9',
            rounded: '7px',
            bg: 'linear-gradient(180deg, #F4F1EA, #CFCAC0)',
            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.18)',
            transform: 'perspective(120px) rotateX(-16deg)',
            transition: 'transform 0.28s {easings.snap}, background 0.3s',
            _lit: { transform: 'perspective(120px) rotateX(16deg)', bg: 'linear-gradient(0deg, #F4F1EA, #CFCAC0)' },
          })}
        >
          <span
            className={css({
              position: 'absolute',
              left: '50%',
              top: '1.5',
              w: '1.5',
              h: '1.5',
              ml: '-3px',
              rounded: 'full',
              bg: 'crimson.700',
              transition: 'background 0.3s, box-shadow 0.3s',
              _lit: { bg: 'spark.400', boxShadow: '0 0 10px {colors.spark.400}' },
            })}
          />
        </span>
      </button>
      <span className={css({ display: 'flex', flexDir: 'column', lineHeight: '1.2' })}>
        <span className={css({ fontFamily: 'mono', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'fg.subtle' })}>
          Lights
        </span>
        <span className={css({ fontWeight: '650', fontSize: 'sm' })}>{lit ? 'On' : 'Off'}</span>
      </span>
      {hint && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className={css({ display: { base: 'none', md: 'inline' }, fontFamily: 'mono', fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'spark.300', pl: '1' })}
        >
          ← go on, flick it
        </motion.span>
      )}
    </div>
  )
}

function ScrollCue() {
  return (
    <div
      aria-hidden
      className={css({
        position: 'absolute',
        bottom: '6',
        right: { base: '5', md: '8', xl: '12' },
        display: { base: 'none', md: 'flex' },
        alignItems: 'center',
        gap: '3',
        fontFamily: 'mono',
        fontSize: '0.66rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'fg.subtle',
      })}
    >
      Scroll
      <span className={css({ position: 'relative', w: '1px', h: '12', bg: 'line.default', overflow: 'hidden' })}>
        <span
          className={css({
            position: 'absolute',
            left: '0',
            top: '0',
            w: '100%',
            h: '40%',
            bg: 'spark.400',
            _motionSafe: { animation: 'scrollCue 2.2s {easings.inOut} infinite' },
          })}
        />
      </span>
    </div>
  )
}
