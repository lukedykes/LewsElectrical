import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { container, coverImage, easeOut, Img } from '../components/ui'

const stats = [
  { value: 100, suffix: '%', label: 'of our work tested and certified' },
  { value: 3, suffix: '', label: 'sectors: domestic, commercial and rail' },
  { text: '£0', label: 'for quotes and friendly advice' },
  { text: 'BS 7671', label: 'every job to the current wiring regulations' },
]

export function Standard() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} aria-label="Our standard" className={css({ position: 'relative', overflow: 'hidden', isolation: 'isolate', py: { base: '24', md: '36' } })}>
      <motion.div style={{ y: imageY }} className={css({ position: 'absolute', inset: '-14% 0', zIndex: '-2' })}>
        <Img photo={photos.pylons} alt="" sizes="100vw" className={coverImage} />
      </motion.div>
      <div
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          bgImage: 'linear-gradient(180deg, {colors.navy.900} 0%, rgba(7,14,34,0.72) 30%, rgba(7,14,34,0.72) 70%, {colors.navy.950} 100%)',
        })}
      />

      <div className={container}>
        <motion.p
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          className={css({
            fontFamily: 'display',
            fontWeight: '800',
            fontStretch: { base: '100%', md: '112%' },
            fontSize: 'clamp(1.9rem, 8.4vw, 8.6rem)',
            lineHeight: '0.92',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
          })}
        >
          {['Safe.', 'Reliable.', 'Professional.'].map((word, i) => (
            <span key={word} className={css({ display: 'block', overflow: 'hidden' })}>
              <motion.span
                variants={{ hidden: { y: '100%' }, shown: { y: '0%' } }}
                transition={{ duration: 1, delay: i * 0.12, ease: easeOut }}
                className={cx(
                  css({ display: 'block' }),
                  i === 1 && css({ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.75)', pl: { md: '12%' } }),
                  i === 2 && css({ color: 'crimson.400', pl: { md: '4%' } }),
                )}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <dl className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr) minmax(0, 1fr)', lg: 'repeat(4, 1fr)' }, gap: { base: '3', md: '4' }, mt: { base: '14', md: '20' } })}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: easeOut }}
              className={css({
                display: 'flex',
                flexDir: 'column-reverse',
                justifyContent: 'flex-end',
                gap: '2',
                p: { base: '5', md: '7' },
                rounded: '2xl',
                bg: 'rgba(4, 8, 20, 0.5)',
                border: '1px solid',
                borderColor: 'line.default',
                backdropFilter: 'blur(14px)',
              })}
            >
              <dt className={css({ color: 'ink.200', fontSize: 'sm', lineHeight: '1.45' })}>{stat.label}</dt>
              <dd
                className={css({
                  fontFamily: 'display',
                  fontWeight: '800',
                  fontSize: { base: '2.2rem', md: '3.4rem' },
                  letterSpacing: '-0.04em',
                  lineHeight: '1',
                  bgImage: 'linear-gradient(180deg, #fff 30%, {colors.spark.200})',
                  bgClip: 'text',
                  color: 'transparent',
                })}
              >
                {'value' in stat && stat.value !== undefined ? <CountUp to={stat.value} suffix={stat.suffix} /> : stat.text}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: easeOut, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
