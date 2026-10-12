import { MapPin, Phone } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { ButtonLink, container, coverImage, Highlight, Img, Kicker, sectionY } from '../components/ui'
import { areas, business } from '../data/site'

export function Areas() {
  return (
    <section id="areas" className={cx(sectionY, css({ bg: 'paper.100' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Kicker>Where we work</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Across Essex <Highlight>&amp; London</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'ink.700', mt: '5' })}>
            We work right across Essex and into London, for homeowners, landlords, businesses and the rail industry. Not sure if
            we cover you? Just ask.
          </p>
          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' }, gap: '3', columnGap: '6', mt: '8' })}>
            {areas.map((area) => (
              <li key={area} className={css({ display: 'flex', alignItems: 'center', gap: '2', fontWeight: '600', color: 'navy.900' })}>
                <MapPin size={17} className={css({ color: 'crimson.600', flexShrink: '0' })} aria-hidden />
                {area}
              </li>
            ))}
          </ul>
          <ButtonLink href={business.phoneHref} variant="navy" size="lg" className={css({ mt: '8' })}>
            <Phone size={18} aria-hidden /> Call {business.phone}
          </ButtonLink>
        </div>
        <figure className={css({ m: '0' })}>
          <div className={css({ aspectRatio: '3 / 2', rounded: '8px', overflow: 'hidden', bg: 'navy.900' })}>
            <Img photo={photos.areas} sizes="(min-width: 1024px) 50vw, 100vw" className={coverImage} />
          </div>
          <figcaption className={css({ fontSize: '0.8rem', color: 'muted', mt: '2' })}>{photos.areas.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
