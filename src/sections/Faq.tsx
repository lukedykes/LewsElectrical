import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { container, easeOut, Eyebrow, Reveal, RevealWords, sectionPadding } from '../components/ui'
import { business, faqs } from '../data/site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className={cx(sectionPadding, css({ bg: 'paper.100', color: 'fg.onPaper' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' }, gap: { base: '12', lg: '20' } }))}>
        <div className={css({ lg: { position: 'sticky', top: '28', alignSelf: 'start' } })}>
          <Reveal>
            <Eyebrow index="08" tone="light">
              Good questions
            </Eyebrow>
          </Reveal>
          <h2 className={css({ textStyle: 'title', mt: '5' })}>
            <RevealWords text="Questions," /> <RevealWords text="answered." delay={0.12} className={css({ color: 'crimson.500' })} />
          </h2>
          <Reveal delay={0.1}>
            <div className={css({ mt: '10', p: '6', rounded: '2xl', bg: 'navy.900', color: 'white', maxW: '26rem' })}>
              <p className={css({ fontFamily: 'display', fontWeight: '700', fontSize: 'xl', letterSpacing: '-0.02em' })}>Still wondering?</p>
              <p className={css({ color: 'ink.200', fontSize: 'sm', mt: '1.5' })}>Talk to the electrician, not a call centre.</p>
              <div className={css({ display: 'grid', gap: '2', mt: '5' })}>
                <a href={business.phoneHref} className={contactLink}>
                  <Phone size={16} aria-hidden /> {business.phone}
                </a>
                <a href={`mailto:${business.email}`} className={contactLink}>
                  <Mail size={16} aria-hidden /> {business.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className={css({ borderTop: '1px solid {colors.line.paper}' })}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`
            return (
              <motion.li
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: easeOut }}
                className={css({ borderBottom: '1px solid {colors.line.paper}' })}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={css({
                      w: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6',
                      py: { base: '5', md: '6' },
                      textAlign: 'left',
                      fontFamily: 'display',
                      fontWeight: '700',
                      fontSize: { base: 'lg', md: 'xl' },
                      letterSpacing: '-0.015em',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      _hover: { color: 'crimson.600' },
                    })}
                  >
                    {faq.q}
                    <span
                      className={cx(
                        css({
                          flexShrink: '0',
                          display: 'grid',
                          placeItems: 'center',
                          w: '10',
                          h: '10',
                          rounded: 'full',
                          border: '1px solid',
                          transition: 'transform 0.4s {easings.out}, background 0.3s, color 0.3s, border-color 0.3s',
                        }),
                        isOpen
                          ? css({ transform: 'rotate(45deg)', bg: 'crimson.500', color: 'white', borderColor: 'crimson.500' })
                          : css({ borderColor: 'line.paper', color: 'fg.onPaper' }),
                      )}
                    >
                      <Plus size={18} aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeOut }}
                      className={css({ overflow: 'hidden' })}
                    >
                      <p className={css({ pb: '6', pr: { md: '16' }, color: 'fg.onPaperMuted', lineHeight: '1.7' })}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

const contactLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  px: '4',
  py: '3',
  rounded: 'xl',
  bg: 'rgba(255,255,255,0.06)',
  fontSize: 'sm',
  fontWeight: '550',
  transition: 'background 0.2s',
  _hover: { bg: 'rgba(255,255,255,0.12)' },
  wordBreak: 'break-all',
})
