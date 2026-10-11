import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import { Check, ChevronsLeftRight, Dumbbell, Lightbulb, Scissors, ShoppingBag, Store, TrendingUp, Users, UtensilsCrossed, Briefcase } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, Eyebrow, Img, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { useQuote } from '../lib/quote'

const outcomes = [
  { icon: Lightbulb, label: 'Enhance your space' },
  { icon: Users, label: 'Improve customer experience' },
  { icon: TrendingUp, label: 'Support business growth' },
]

const checklist = [
  'Lighting design & installation',
  'Feature & ambient lighting',
  'Smart lighting solutions',
  'Power & data for workstations',
  'Distribution board upgrades',
  'Emergency lighting',
  'Testing & inspection (EICR)',
  'Minimal disruption to trading',
]

const venues = [
  { icon: ShoppingBag, label: 'Retail' },
  { icon: Scissors, label: 'Salons' },
  { icon: UtensilsCrossed, label: 'Hospitality' },
  { icon: Briefcase, label: 'Offices' },
  { icon: Dumbbell, label: 'Gyms & studios' },
]

export function Business() {
  const { startQuote } = useQuote()

  return (
    <section id="business" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.900', overflow: 'hidden' }))}>
      <div aria-hidden className={css({ position: 'absolute', inset: '0', bgImage: 'radial-gradient(45% 50% at 0% 0%, rgba(255, 181, 71, 0.08), transparent 70%)' })} />
      <div className={cx(container, css({ position: 'relative' }))}>
        <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }, gap: { base: '12', lg: '16', xl: '20' }, alignItems: 'center' })}>
          <div>
            <Reveal>
              <Eyebrow index="04">Shops, salons &amp; workplaces</Eyebrow>
            </Reveal>
            <h2 className={css({ textStyle: 'title', mt: '5' })}>
              <RevealWords text="Great spaces." />
              <br />
              <RevealWords text="Brighter business." delay={0.15} className={css({ color: 'spark.400' })} />
            </h2>
            <Reveal delay={0.1}>
              <p className={css({ textStyle: 'lead', color: 'fg.muted', mt: '6', maxW: '34rem' })}>
                Got a shop or salon that needs modernising? We design and install electrics that make a space look stylish,
                work hard and feel good to walk into.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '2.5', mt: '8' })}>
                {outcomes.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2.5',
                      pl: '2',
                      pr: '4',
                      py: '2',
                      rounded: 'full',
                      bg: 'rgba(255,255,255,0.05)',
                      border: '1px solid',
                      borderColor: 'line.default',
                      fontSize: 'sm',
                      fontWeight: '550',
                    })}
                  >
                    <span className={css({ display: 'grid', placeItems: 'center', w: '7', h: '7', rounded: 'full', bg: 'crimson.500' })}>
                      <Icon size={14} aria-hidden />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) minmax(0, 1fr)' }, columnGap: '6', rowGap: '3', mt: '10' })}>
                {checklist.map((item) => (
                  <li key={item} className={css({ display: 'flex', alignItems: 'flex-start', gap: '3', color: 'ink.100', fontSize: 'sm' })}>
                    <Check size={17} className={css({ color: 'crimson.400', flexShrink: '0', mt: '0.5' })} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25} className={css({ mt: '10' })}>
              <Button size="lg" arrow onClick={() => startQuote({ sector: 'commercial', service: 'Lighting' })}>
                Plan my upgrade
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <BeforeAfter />
            <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }, gap: '2', mt: '4' })}>
              {venues.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignItems: 'center',
                    gap: '2',
                    py: '4',
                    px: '2',
                    rounded: 'xl',
                    bg: 'rgba(255,255,255,0.03)',
                    border: '1px solid',
                    borderColor: 'line.subtle',
                    textAlign: 'center',
                    fontFamily: 'mono',
                    fontSize: '0.64rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'ink.200',
                  })}
                >
                  <Icon size={20} className={css({ color: 'spark.300' })} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const position = useMotionValue(50)
  const [value, setValue] = useState(50)
  const clip = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`)
  const left = useTransform(position, (p) => `${p}%`)
  useMotionValueEvent(position, 'change', (p) => setValue(Math.round(p)))

  // A little demo sweep the first time it scrolls into view, so it reads as interactive.
  useEffect(() => {
    if (!inView || touched) return
    const controls = animate(position, [50, 78, 24, 50], { duration: 2.6, ease: 'easeInOut', delay: 0.4 })
    return () => controls.stop()
  }, [inView, touched, position])

  const setFromPointer = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    position.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setTouched(true)
    position.stop()
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromPointer(e.clientX)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4
    if (e.key === 'ArrowLeft') position.set(Math.max(0, position.get() - step))
    else if (e.key === 'ArrowRight') position.set(Math.min(100, position.get() + step))
    else return
    e.preventDefault()
    setTouched(true)
  }

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Before and after lighting comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${value}% showing the original lighting`}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging && setFromPointer(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onKeyDown={onKeyDown}
      className={css({
        position: 'relative',
        aspectRatio: '4 / 3',
        rounded: 'card',
        overflow: 'hidden',
        cursor: 'ew-resize',
        touchAction: 'pan-y',
        userSelect: 'none',
        boxShadow: '0 50px 100px -40px rgba(0,0,0,0.9)',
        border: '1px solid',
        borderColor: 'line.default',
      })}
    >
      {/* After: the designed lighting scheme. */}
      <Img photo={photos.salon} sizes="(min-width: 1024px) 55vw, 100vw" className={cx(coverImage, css({ filter: 'saturate(1.08) contrast(1.04)' }))} />
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          mixBlendMode: 'soft-light',
          bgImage: 'radial-gradient(30% 40% at 30% 35%, rgba(255, 200, 120, 0.55), transparent 70%), radial-gradient(30% 40% at 62% 30%, rgba(255, 200, 120, 0.45), transparent 70%)',
        })}
      />

      {/* Before: the same room, flat and tired. */}
      <motion.div style={{ clipPath: clip }} className={css({ position: 'absolute', inset: '0' })}>
        <Img
          photo={photos.salon}
          alt=""
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={cx(coverImage, css({ filter: 'grayscale(0.75) brightness(0.48) contrast(0.82) sepia(0.2)' }))}
        />
        <div aria-hidden className={css({ position: 'absolute', inset: '0', bg: 'rgba(40, 50, 70, 0.28)', mixBlendMode: 'multiply' })} />
      </motion.div>

      <span className={cx(tag, css({ left: '4' }))}>Before</span>
      <span className={cx(tag, css({ right: '4', bg: 'crimson.500', borderColor: 'crimson.500' }))}>After</span>

      <motion.div aria-hidden style={{ left }} className={css({ position: 'absolute', top: '0', bottom: '0', w: '2px', ml: '-1px', bg: 'white', boxShadow: '0 0 18px rgba(255,255,255,0.7)' })}>
        <span
          className={css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            display: 'grid',
            placeItems: 'center',
            w: '14',
            h: '14',
            rounded: 'full',
            bg: 'white',
            color: 'navy.900',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45), inset 0 -3px 0 rgba(0,0,0,0.08)',
            _before: {
              content: '""',
              position: 'absolute',
              inset: '-6px',
              rounded: 'full',
              border: '1px solid rgba(255,255,255,0.45)',
            },
          })}
        >
          <ChevronsLeftRight size={22} />
        </span>
      </motion.div>

      <span
        aria-hidden
        className={css({
          position: 'absolute',
          bottom: '4',
          left: '50%',
          translate: '-50% 0',
          fontFamily: 'mono',
          fontSize: '0.64rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'white',
          bg: 'rgba(4,8,20,0.55)',
          backdropFilter: 'blur(8px)',
          px: '3',
          py: '1.5',
          rounded: 'full',
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          whiteSpace: 'nowrap',
        })}
      >
        <Store size={12} /> Drag to compare
      </span>
    </div>
  )
}

const tag = css({
  position: 'absolute',
  top: '4',
  zIndex: '1',
  fontFamily: 'mono',
  fontSize: '0.66rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  px: '3',
  py: '1.5',
  rounded: 'full',
  bg: 'rgba(4,8,20,0.6)',
  border: '1px solid',
  borderColor: 'line.strong',
  backdropFilter: 'blur(8px)',
})
