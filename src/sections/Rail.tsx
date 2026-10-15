import { css, cx } from '../../styled-system/css'
import { Bullets, Button, container, Highlight, Kicker } from '../components/ui'
import { useContact } from '../lib/contact'

export function Rail() {
  const { openContact } = useContact()

  return (
    <section id="rail" className={css({ position: 'relative', bg: 'navy.950', color: 'white', overflow: 'hidden' })}>
      <div
        className={cx(
          container,
          css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
            gap: { base: '8', lg: '16' },
            py: { base: '14', md: '20' },
            alignItems: 'center',
          }),
        )}
      >
        <div>
          <Kicker onNavy>Rail industry</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '4' })}>
            Rail <Highlight>infrastructure</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'navy.100', mt: '5' })}>
            Alongside homes and businesses, we deliver electrical work for the rail industry. Every job gets the same safety-first
            approach, careful planning and full paperwork.
          </p>
          <Button size="lg" variant="white" className={css({ mt: '8' })} onClick={() => openContact('Rail')}>
            Talk to us about rail work
          </Button>
        </div>
        <Bullets
          onNavy
          items={['Installation & testing', 'Planned maintenance', 'Reactive call outs', 'Safety-first working', 'Full certification & paperwork']}
        />
      </div>
    </section>
  )
}
