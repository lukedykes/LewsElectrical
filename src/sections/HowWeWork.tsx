import { BadgeCheck, ClipboardCheck, PoundSterling, Sparkles, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { container, Highlight, IconCircle, Kicker, sectionY } from '../components/ui'
import { business, reasons, steps } from '../data/site'

const reasonIcons: LucideIcon[] = [BadgeCheck, ClipboardCheck, Sparkles, PoundSterling]

export function HowWeWork() {
  return (
    <section id="how-we-work" className={cx(sectionY, css({ bg: 'white' }))}>
      <div className={container}>
        <Kicker>How it works</Kicker>
        <h2 className={css({ textStyle: 'h2', mt: '3' })}>
          Simple, from <Highlight>start to finish</Highlight>
        </h2>

        <ol className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: { base: '8', lg: '6' }, mt: '12' })}>
          {steps.map((step, i) => (
            <li key={step.title} className={css({ borderTop: '3px solid {colors.navy.900}', pt: '5' })}>
              <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '800', fontStyle: 'italic', fontSize: '3rem', lineHeight: '1', color: 'crimson.600' })}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={css({ textStyle: 'h3', color: 'navy.900', mt: '3' })}>{step.title}</h3>
              <p className={css({ color: 'muted', mt: '2' })}>{step.body}</p>
            </li>
          ))}
        </ol>

        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.8fr) minmax(0, 2fr)' },
            gap: { base: '8', lg: '12' },
            mt: { base: '16', md: '20' },
            p: { base: '6', md: '10' },
            rounded: '8px',
            bg: 'navy.900',
            color: 'white',
          })}
        >
          <div>
            <h2 className={css({ textStyle: 'h2', fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)' })}>
              Why choose <span className={css({ color: 'crimson.500' })}>Lews?</span>
            </h2>
            <p className={css({ color: 'navy.200', mt: '4' })}>
              {business.tagline}. Safe, reliable and professional electrical work, done properly and left tidy.
            </p>
          </div>
          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: '6' })}>
            {reasons.map((reason, i) => (
              <li key={reason.title} className={css({ display: 'flex', gap: '4' })}>
                <IconCircle icon={reasonIcons[i]} size="sm" />
                <div>
                  <h3 className={css({ textStyle: 'h3', fontSize: '1.2rem' })}>{reason.title}</h3>
                  <p className={css({ color: 'navy.200', mt: '1', fontSize: '0.95rem' })}>{reason.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
