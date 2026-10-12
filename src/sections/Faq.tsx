import { Mail, Phone, Plus } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { container, Highlight, Kicker, sectionY } from '../components/ui'
import { business, faqs } from '../data/site'

export function Faq() {
  return (
    <section id="faq" className={cx(sectionY, css({ bg: 'white' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' }, gap: { base: '10', lg: '16' } }))}>
        <div>
          <Kicker>FAQs</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Common <Highlight>questions</Highlight>
          </h2>
          <p className={css({ color: 'ink.700', mt: '5' })}>Can’t see your question here? Get in touch and we’ll be happy to help.</p>
          <div className={css({ display: 'grid', gap: '2', mt: '6', fontWeight: '600' })}>
            <a href={business.phoneHref} className={css({ display: 'flex', alignItems: 'center', gap: '2', color: 'navy.900', _hover: { color: 'crimson.600' } })}>
              <Phone size={18} className={css({ color: 'crimson.600' })} aria-hidden /> {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className={css({ display: 'flex', alignItems: 'center', gap: '2', color: 'navy.900', overflowWrap: 'anywhere', _hover: { color: 'crimson.600' } })}>
              <Mail size={18} className={css({ color: 'crimson.600' })} aria-hidden /> {business.email}
            </a>
          </div>
        </div>

        <div className={css({ borderTop: '1px solid {colors.paper.300}' })}>
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className={css({
                borderBottom: '1px solid {colors.paper.300}',
                '&[open] .faq-icon': { transform: 'rotate(45deg)', bg: 'crimson.600', color: 'white' },
              })}
            >
              <summary
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4',
                  py: '5',
                  cursor: 'pointer',
                  listStyle: 'none',
                  fontWeight: '700',
                  fontSize: '1.08rem',
                  color: 'navy.900',
                  '&::-webkit-details-marker': { display: 'none' },
                  _hover: { color: 'crimson.600' },
                })}
              >
                {faq.q}
                <span
                  aria-hidden
                  className={cx(
                    'faq-icon',
                    css({ flexShrink: '0', display: 'grid', placeItems: 'center', w: '8', h: '8', rounded: 'full', bg: 'paper.100', color: 'navy.900', transition: 'transform 0.2s, background 0.2s' }),
                  )}
                >
                  <Plus size={18} />
                </span>
              </summary>
              <p className={css({ color: 'ink.700', pb: '5', pr: { md: '12' } })}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
