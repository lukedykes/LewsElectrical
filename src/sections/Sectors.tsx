import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, Home, TrainFront } from 'lucide-react'
import { useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, easeOut, Eyebrow, Img, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { sectors } from '../data/site'
import { useQuote } from '../lib/quote'

const icons = { domestic: Home, commercial: Building2, rail: TrainFront }

export function Sectors() {
  const [active, setActive] = useState(0)
  const { startQuote } = useQuote()

  return (
    <section id="sectors" className={cx(sectionPadding, css({ position: 'relative', bg: 'navy.950' }))}>
      <div className={container}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' },
            gap: { base: '6', lg: '16' },
            alignItems: 'end',
            mb: { base: '10', md: '16' },
          })}
        >
          <div>
            <Reveal>
              <Eyebrow index="01">Who we power</Eyebrow>
            </Reveal>
            <h2 className={css({ textStyle: 'title', mt: '5' })}>
              <RevealWords text="Three sectors." />
              <br />
              <RevealWords text="One standard." delay={0.15} className={css({ color: 'ink.300' })} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className={css({ textStyle: 'lead', color: 'fg.muted', maxW: '34rem' })}>
              From family homes to busy salons to the rail network, every job gets the same care. Done safely, tested properly
              and left tidy.
            </p>
          </Reveal>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDir: { base: 'column', lg: 'row' },
            gap: { base: '4', lg: '3' },
            h: { lg: '640px' },
          })}
        >
          {sectors.map((sector, i) => {
            const Icon = icons[sector.id]
            const isActive = active === i
            return (
              <motion.article
                key={sector.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: easeOut }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-active={isActive}
                className={css({
                  position: 'relative',
                  overflow: 'hidden',
                  rounded: 'card',
                  minH: { base: '460px', lg: '0' },
                  flex: { lg: '1 1 0' },
                  transition: 'flex 0.8s {easings.out}',
                  isolation: 'isolate',
                  bg: 'navy.900',
                  '&[data-active=true]': { flex: { lg: '2.3 1 0' } },
                  '&:hover img, &[data-active=true] img': { transform: 'scale(1.04)' },
                })}
              >
                <Img
                  photo={photos[sector.image]}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cx(coverImage, css({ zIndex: '-2', transition: 'transform 1.4s {easings.out}' }))}
                />
                <div
                  aria-hidden
                  className={css({
                    position: 'absolute',
                    inset: '0',
                    zIndex: '-1',
                    bgImage: {
                      base: 'linear-gradient(180deg, rgba(4,8,20,0.5) 0%, rgba(4,8,20,0.15) 22%, rgba(4,8,20,0.82) 48%, rgba(4,8,20,0.97) 70%)',
                      lg: 'linear-gradient(180deg, rgba(4,8,20,0.55) 0%, rgba(4,8,20,0.05) 30%, rgba(4,8,20,0.6) 56%, rgba(4,8,20,0.97) 100%)',
                    },
                  })}
                />

                <div className={css({ position: 'absolute', top: '6', left: '6', right: '6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                  <span className={css({ fontFamily: 'mono', fontSize: 'xs', letterSpacing: '0.14em', color: 'ink.100' })}>0{i + 1} / 03</span>
                  <span
                    className={css({
                      display: 'grid',
                      placeItems: 'center',
                      w: '11',
                      h: '11',
                      rounded: 'full',
                      bg: 'rgba(4,8,20,0.5)',
                      border: '1px solid',
                      borderColor: 'line.strong',
                      backdropFilter: 'blur(8px)',
                    })}
                  >
                    <Icon size={19} aria-hidden />
                  </span>
                </div>

                <div className={css({ position: 'absolute', insetX: '0', bottom: '0', p: { base: '6', md: '8' } })}>
                  <p className={css({ textStyle: 'eyebrow', color: 'spark.300' })}>{sector.label}</p>
                  <h3 className={css({ textStyle: 'subtitle', mt: '2', maxW: '18ch' })}>{sector.title}</h3>
                  <div
                    className={css({
                      display: 'grid',
                      gridTemplateRows: { base: '1fr', lg: '0fr' },
                      opacity: { base: '1', lg: '0' },
                      transition: 'grid-template-rows 0.7s {easings.out}, opacity 0.5s',
                      '[data-active=true] &': { gridTemplateRows: '1fr', opacity: '1', transitionDelay: '0s, 0.25s' },
                    })}
                  >
                    <div className={css({ overflow: 'hidden', minH: '0' })}>
                      <p className={css({ color: 'ink.100', mt: '3', maxW: '40ch', fontSize: { base: 'sm', md: 'md' } })}>{sector.body}</p>
                      <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', mt: '5' })}>
                        {sector.points.map((point) => (
                          <li
                            key={point}
                            className={css({
                              fontSize: 'xs',
                              fontWeight: '500',
                              px: '3',
                              py: '1.5',
                              rounded: 'full',
                              bg: 'rgba(255,255,255,0.08)',
                              border: '1px solid',
                              borderColor: 'line.default',
                              backdropFilter: 'blur(6px)',
                            })}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="light"
                        size="sm"
                        className={css({ mt: '6' })}
                        onClick={() => startQuote({ sector: sector.id })}
                      >
                        Quote for {sector.label.toLowerCase()} work
                        <ArrowUpRight size={16} aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
