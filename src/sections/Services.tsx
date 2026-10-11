import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos, type PhotoName } from '../assets/images'
import { Button, container, easeOut, Eyebrow, Img, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { services, type ServiceImage } from '../data/site'
import { useQuote } from '../lib/quote'

const imageFor: Record<ServiceImage, PhotoName> = {
  rewire: 'rewire',
  'distribution-board': 'distributionBoard',
  'consumer-unit': 'consumerUnit',
  boards: 'boards',
  pendants: 'pendants',
  cctv: 'cctv',
  electrician: 'electrician',
}

export function Services() {
  const { startQuote } = useQuote()
  const [hovered, setHovered] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  const track = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <section id="services" className={cx(sectionPadding, css({ position: 'relative', bg: 'paper.100', color: 'fg.onPaper' }))}>
      <div className={container}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
            gap: { base: '6', lg: '16' },
            alignItems: 'end',
            mb: { base: '10', md: '16' },
          })}
        >
          <div>
            <Reveal>
              <Eyebrow index="02" tone="light">
                What we do
              </Eyebrow>
            </Reveal>
            <h2 className={css({ textStyle: 'title', mt: '5' })}>
              <RevealWords text="Everything electrical." />
              <br />
              <RevealWords text="Done properly." delay={0.12} className={css({ color: 'crimson.500' })} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.onPaperMuted', maxW: '32rem' })}>
              One team for the whole job, from a single new socket to a full commercial fit-out. Pick a service to start your
              free quote.
            </p>
          </Reveal>
        </div>

        <div className={css({ position: 'relative' })} onMouseMove={track} onMouseLeave={() => setHovered(null)}>
          <ol className={css({ borderTop: '1px solid {colors.line.paper}' })}>
            {services.map((service, i) => (
              <motion.li
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: easeOut }}
                className={css({ borderBottom: '1px solid {colors.line.paper}' })}
              >
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => startQuote({ service: service.title })}
                  className={css({
                    position: 'relative',
                    w: '100%',
                    display: 'grid',
                    gridTemplateColumns: { base: '72px minmax(0, 1fr)', md: '64px minmax(0, 1.1fr) minmax(0, 1fr) 48px' },
                    gap: { base: '4', md: '8' },
                    alignItems: 'center',
                    textAlign: 'left',
                    py: { base: '5', md: '7' },
                    px: { base: '0', md: '4' },
                    cursor: 'pointer',
                    isolation: 'isolate',
                    transition: 'color 0.4s {easings.out}',
                    _before: {
                      content: '""',
                      position: 'absolute',
                      inset: '0',
                      zIndex: '-1',
                      bg: 'navy.900',
                      transform: 'scaleY(0)',
                      transformOrigin: 'bottom',
                      transition: 'transform 0.5s {easings.out}',
                    },
                    _canHover: {
                      _hover: { color: 'white', _before: { transform: 'scaleY(1)' }, '& .num': { color: 'spark.400' }, '& .body': { color: 'ink.200' }, '& .go': { bg: 'crimson.500', borderColor: 'crimson.500', color: 'white', transform: 'rotate(45deg)' } },
                    },
                    _focusVisible: { outlineOffset: '-2px' },
                  })}
                >
                  <span className={css({ display: { base: 'block', md: 'none' }, w: '72px', h: '72px', rounded: 'xl', overflow: 'hidden', bg: 'paper.200' })}>
                    <Img photo={photos[imageFor[service.image]]} sizes="72px" className={css({ w: '100%', h: '100%', objectFit: 'cover' })} />
                  </span>
                  <span
                    className={cx(
                      'num',
                      css({ display: { base: 'none', md: 'block' }, fontFamily: 'mono', fontSize: 'sm', color: 'crimson.500', transition: 'color 0.3s' }),
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className={css({ display: { base: 'block', md: 'none' }, fontFamily: 'mono', fontSize: 'xs', color: 'crimson.500', mb: '1' })}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={css({
                        display: 'block',
                        fontFamily: 'display',
                        fontWeight: '750',
                        fontSize: { base: '1.3rem', md: 'clamp(1.6rem, 2.6vw, 2.4rem)' },
                        letterSpacing: '-0.025em',
                        lineHeight: '1.05',
                      })}
                    >
                      {service.title}
                    </span>
                    <span className={cx('body', css({ display: { base: 'block', md: 'none' }, mt: '1.5', fontSize: 'sm', color: 'fg.onPaperMuted' }))}>
                      {service.body}
                    </span>
                  </span>
                  <span className={css({ display: { base: 'none', md: 'block' } })}>
                    <span className={cx('body', css({ display: 'block', color: 'fg.onPaperMuted', fontSize: 'md', lineHeight: '1.55', transition: 'color 0.3s' }))}>
                      {service.body}
                    </span>
                    <span className={css({ display: 'flex', flexWrap: 'wrap', gap: '1.5', mt: '3' })}>
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={css({
                            fontFamily: 'mono',
                            fontSize: '0.66rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            px: '2',
                            py: '1',
                            rounded: 'sm',
                            border: '1px solid',
                            borderColor: 'currentColor',
                            opacity: 0.55,
                          })}
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span
                    className={cx(
                      'go',
                      css({
                        display: { base: 'none', md: 'grid' },
                        placeItems: 'center',
                        w: '12',
                        h: '12',
                        rounded: 'full',
                        border: '1px solid',
                        borderColor: 'line.paper',
                        transition: 'all 0.4s {easings.out}',
                      }),
                    )}
                  >
                    <ArrowUpRight size={20} aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>

          {/* Image that follows the cursor over the list (pointer devices only). */}
          <motion.div
            aria-hidden
            style={{ x: springX, y: springY }}
            className={css({
              position: 'absolute',
              left: '0',
              top: '0',
              pointerEvents: 'none',
              zIndex: '2',
              display: 'none',
              _canHover: { display: { lg: 'block' } },
            })}
          >
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className={css({
                    position: 'relative',
                    w: '280px',
                    h: '340px',
                    ml: '-140px',
                    mt: '-170px',
                    rounded: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px -30px rgba(4, 8, 20, 0.7)',
                    bg: 'navy.900',
                  })}
                >
                  {services.map((service, i) => (
                    <Img
                      key={service.id}
                      photo={photos[imageFor[service.image]]}
                      sizes="280px"
                      alt=""
                      className={cx(
                        css({ position: 'absolute', inset: '0', w: '100%', h: '100%', objectFit: 'cover', transition: 'opacity 0.35s, transform 0.6s {easings.out}' }),
                        hovered === i ? css({ opacity: '1', transform: 'scale(1)' }) : css({ opacity: '0', transform: 'scale(1.12)' }),
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Reveal className={css({ mt: { base: '10', md: '14' }, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '6' })}>
          <p className={css({ color: 'fg.onPaperMuted', maxW: '36rem' })}>
            Not sure what you need? Describe the problem and we will point you in the right direction, free of charge.
          </p>
          <Button variant="dark" size="lg" arrow onClick={() => startQuote()}>
            Ask an electrician
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
