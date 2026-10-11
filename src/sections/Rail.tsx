import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, Highlight, Img, Kicker, TickList } from '../components/ui'
import { useContact } from '../lib/contact'

export function Rail() {
  const { openContact } = useContact()

  return (
    <section id="rail" className={css({ position: 'relative', bg: 'navy.900', color: 'white', overflow: 'hidden' })}>
      <div className={css({ position: 'relative', h: { base: '200px', md: '300px', lg: '360px' } })}>
        <Img photo={photos.railBanner} sizes="100vw" className={coverImage} />
        <span
          className={css({ position: 'absolute', right: '3', bottom: '3', fontSize: '0.75rem', bg: 'rgba(6, 20, 48, 0.6)', px: '2', py: '1', rounded: '4px' })}
        >
          {photos.railBanner.caption}
        </span>
      </div>
      <div className={css({ h: '1.5', bg: 'crimson.600' })} />
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
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
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
        <TickList
          onNavy
          items={['Installation & testing', 'Planned maintenance', 'Reactive call outs', 'Safety-first working', 'Full certification & paperwork']}
        />
      </div>
    </section>
  )
}
