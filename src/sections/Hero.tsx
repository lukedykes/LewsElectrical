import { ArrowRight, BadgeCheck, Phone } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { photos, type Photo } from '../assets/images'
import { Button, ButtonLink, container, coverImage, Highlight, Img, Kicker } from '../components/ui'
import { business } from '../data/site'
import { useContact } from '../lib/contact'

export function Hero() {
  const { openContact } = useContact()

  return (
    <section id="top" aria-label="Introduction" className={css({ bg: 'navy.900', color: 'white' })}>
      <div className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' }, minH: { lg: '620px' } })}>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            px: { base: '5', md: '8' },
            pl: { lg: 'max(2rem, calc((100vw - 1200px) / 2 + 2rem))' },
            py: { base: '12', md: '16', lg: '20' },
          })}
        >
          <div className={css({ maxW: '37rem' })}>
            <Kicker onNavy>Electricians across Essex &amp; London</Kicker>
            <h1 className={css({ textStyle: 'display', mt: '4' })}>
              Expert electrical <Highlight>solutions</Highlight>
            </h1>
            <p className={css({ textStyle: 'h3', color: 'navy.200', mt: '5' })}>For homes, businesses and the rail industry</p>
            <p className={css({ textStyle: 'lead', color: 'navy.100', mt: '5' })}>
              Safe, reliable and high quality electrical work, from a single socket to a full rewire. Fully tested and certified, with
              free quotes and friendly advice.
            </p>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', mt: '8' })}>
              <Button size="lg" onClick={() => openContact()}>
                Get a free quote
              </Button>
              <ButtonLink href={business.phoneHref} variant="outlineLight" size="lg">
                <Phone size={18} aria-hidden /> {business.phone}
              </ButtonLink>
            </div>
            <ul className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', columnGap: '6', mt: '8', fontWeight: '600' })}>
              {business.accreditations.map((item) => (
                <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
                  <BadgeCheck size={20} className={css({ color: 'crimson.500' })} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className={css({ position: 'relative', minH: { base: '260px', sm: '360px', lg: 'auto' }, m: '0' })}>
          {/* Thin red slash along the slanted edge, as on the flyers. */}
          <span aria-hidden className={css({ display: { base: 'none', lg: 'block' }, position: 'absolute', inset: '0', bg: 'crimson.600', clipPath: 'polygon(10.5% 0, 100% 0, 100% 100%, 0 100%)' })} />
          <div className={css({ position: 'absolute', inset: '0', clipPath: { lg: 'polygon(12.5% 0, 100% 0, 100% 100%, 2% 100%)' } })}>
            <Img photo={photos.hero} priority sizes="(min-width: 1024px) 50vw, 100vw" className={coverImage} />
          </div>
          <figcaption className={css({ position: 'absolute', right: '3', bottom: '3', fontSize: '0.75rem', color: 'white', bg: 'rgba(6, 20, 48, 0.6)', px: '2', py: '1', rounded: '4px' })}>
            {photos.hero.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const sectors: { label: string; text: string; href: string; photo: Photo }[] = [
  { label: 'Domestic', text: 'Homes & families', href: '#rewires', photo: photos.domestic },
  { label: 'Commercial', text: 'Shops, salons & offices', href: '#commercial', photo: photos.commercial },
  { label: 'Rail', text: 'Rail infrastructure', href: '#rail', photo: photos.rail },
]

/** The three photo panels from the flyer: domestic, commercial and rail. */
export function SectorStrip() {
  return (
    <section aria-label="Who we work for" className={css({ bg: 'white', pt: { base: '10', md: '12' } })}>
      <ul className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: { base: '3', md: '5' } }))}>
        {sectors.map((sector) => (
          <li key={sector.label}>
            <a
              href={sector.href}
              className={css({
                position: 'relative',
                display: 'block',
                aspectRatio: { base: '16 / 9', md: '4 / 3' },
                overflow: 'hidden',
                rounded: '8px',
                bg: 'navy.900',
                '& img': { transition: 'transform 0.4s' },
                _hover: { '& img': { transform: 'scale(1.03)' } },
              })}
            >
              <Img photo={sector.photo} sizes="(min-width: 768px) 33vw, 100vw" className={coverImage} />
              <span
                className={css({
                  position: 'absolute',
                  insetX: '0',
                  bottom: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '3',
                  px: '4',
                  py: '3',
                  bg: 'navy.900',
                  color: 'white',
                  borderTop: '4px solid {colors.crimson.600}',
                })}
              >
                <span>
                  <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '800', fontStyle: 'italic', fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: '1' })}>
                    {sector.label}
                  </span>
                  <span className={css({ display: 'block', fontSize: '0.92rem', color: 'navy.200', mt: '1' })}>{sector.text}</span>
                </span>
                <ArrowRight size={22} aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
