import { ArrowRight, BadgeCheck, FileText, MapPin, Pause, Phone, Play, TrainFront, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { css, cx } from '../../styled-system/css'
import { photos, work, type Photo } from '../assets/images'
import { Button, ButtonLink, container, coverImage, Highlight, Img, Kicker } from '../components/ui'
import { business, services } from '../data/site'
import { useContact } from '../lib/contact'

export function Hero() {
  const { openContact } = useContact()

  return (
    <section
      id="top"
      aria-label="Introduction"
      className={css({ position: 'relative', bg: 'linear-gradient(180deg, #FFFFFF 0%, {colors.paper.100} 100%)', overflow: 'hidden', pt: { base: '6', md: '10', lg: '16' }, pb: { base: '12', md: '16', lg: '20' } })}
    >
      <div
        className={cx(
          container,
          css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
            gap: { base: '8', lg: '16' },
            alignItems: 'center',
          }),
        )}
      >
        {/* Phones: the photo comes first, like the reference site. Desktop: it sits on the right. */}
        <figure className={css({ position: 'relative', m: '0', order: { base: '0', lg: '1' } })}>
          <div
            className={css({
              position: 'relative',
              aspectRatio: { base: '4 / 3', sm: '16 / 10', lg: '4 / 5' },
              rounded: '16px',
              overflow: 'hidden',
              bg: 'navy.900',
              boxShadow: '0 30px 60px -20px rgba(10, 30, 69, 0.35)',
            })}
          >
            <Img photo={work.hero} priority sizes="(min-width: 1024px) 46vw, 100vw" className={coverImage} />
          </div>
          <figcaption
            className={css({
              position: 'absolute',
              left: { base: '3', lg: '-6' },
              bottom: { base: '3', lg: '10' },
              display: 'flex',
              alignItems: 'center',
              gap: '3',
              bg: 'white',
              color: 'navy.950',
              rounded: '12px',
              px: { base: '3', md: '4' },
              py: { base: '2', md: '3' },
              boxShadow: '0 14px 34px rgba(10, 30, 69, 0.22)',
            })}
          >
            <span aria-hidden className={css({ display: 'grid', placeItems: 'center', w: { base: '8', md: '10' }, h: { base: '8', md: '10' }, rounded: '10px', bg: 'crimson.100', color: 'crimson.600', flexShrink: '0' })}>
              <BadgeCheck size={20} />
            </span>
            <span>
              <span className={css({ display: 'block', textStyle: 'tracked', fontSize: { base: '0.78rem', md: '0.86rem' } })}>Our work</span>
              <span className={css({ display: 'block', fontSize: { base: '0.85rem', md: '0.95rem' }, fontWeight: '600', color: 'ink.700', lineHeight: '1.25' })}>{work.hero.caption}</span>
            </span>
          </figcaption>
        </figure>

        <div className={css({ textAlign: { base: 'center', lg: 'left' } })}>
          <p
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2',
              px: '4',
              py: '2',
              rounded: 'full',
              border: '1px solid {colors.paper.300}',
              bg: 'white',
              fontFamily: 'heading',
              fontWeight: '700',
              fontSize: { base: '0.82rem', md: '0.92rem' },
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'ink.500',
            })}
          >
            <MapPin size={16} className={css({ color: 'crimson.600' })} aria-hidden /> Essex · London · Rail
          </p>
          <h1 className={css({ textStyle: 'display', color: 'navy.950', mt: { base: '5', md: '6' } })}>
            Expert electrical <Highlight>solutions.</Highlight>
          </h1>
          <p
            className={css({
              fontFamily: 'heading',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: { base: '0.28em', md: '0.34em' },
              color: 'crimson.600',
              fontSize: { base: '0.95rem', md: '1.15rem' },
              mt: { base: '5', md: '6' },
              // Keeps it on one line on the narrowest phones.
              '@media (max-width: 374px)': { fontSize: '0.84rem', letterSpacing: '0.2em' },
            })}
          >
            Safe · Reliable · Professional
          </p>
          <p className={css({ textStyle: 'lead', color: 'ink.500', mt: '5', maxW: { lg: '34rem' }, mx: { base: 'auto', lg: '0' } })}>
            Electrical work for homes, businesses and the rail industry, from a single socket to a full rewire. Fully tested and
            certified, with free quotes and friendly advice.
          </p>
          <div className={css({ display: 'flex', flexWrap: 'wrap', justifyContent: { base: 'center', lg: 'flex-start' }, gap: '3', mt: '8', '& > *': { flex: { base: '1 1 100%', sm: '0 0 auto' } } })}>
            <Button size="lg" onClick={() => openContact()}>
              <FileText size={18} aria-hidden /> Get a free quote
            </Button>
            <ButtonLink href={business.phoneHref} variant="outline" size="lg">
              <Phone size={18} aria-hidden /> {business.phone}
            </ButtonLink>
          </div>
          <ul className={css({ display: 'flex', flexWrap: 'wrap', justifyContent: { base: 'center', lg: 'flex-start' }, gap: '3', columnGap: '6', mt: '8', fontWeight: '600', color: 'navy.900' })}>
            {business.accreditations.map((item) => (
              <li key={item} className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
                <BadgeCheck size={20} className={css({ color: 'crimson.600' })} aria-hidden /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Dark band with the services scrolling past, as on the reference site. Pausable, and still if reduced motion is on. */
export function Ticker() {
  const [paused, setPaused] = useState(false)
  const items = [...services.map((s) => s.title), 'Rail infrastructure']
  const run = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className={css({ display: 'flex', alignItems: 'center', flexShrink: '0' })}>
      {items.map((item) => (
        <li key={item} className={css({ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' })}>
          <span className={css({ textStyle: 'tracked', fontSize: { base: '0.95rem', md: '1.1rem' }, letterSpacing: '0.22em', px: { base: '5', md: '7' } })}>{item}</span>
          <span aria-hidden className={css({ w: '2', h: '2', bg: 'crimson.500', flexShrink: '0' })} />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="What we do" className={css({ display: 'flex', alignItems: 'stretch', bg: 'navy.950', color: 'white', borderBlock: '1px solid rgba(255, 255, 255, 0.08)' })}>
      <div className={css({ flex: '1', minW: '0', overflow: 'hidden', py: { base: '4', md: '5' } })}>
        <div
          data-paused={paused || undefined}
          className={css({
            display: 'flex',
            w: 'max-content',
            _motionSafe: { animation: 'marquee 45s linear infinite' },
            '&[data-paused]': { animationPlayState: 'paused' },
          })}
        >
          {run()}
          {run(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play the scrolling list' : 'Pause the scrolling list'}
        className={css({
          display: 'grid',
          placeItems: 'center',
          w: { base: '14', md: '16' },
          flexShrink: '0',
          borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'white',
          cursor: 'pointer',
          _hover: { bg: 'rgba(255, 255, 255, 0.06)' },
          '@media (prefers-reduced-motion: reduce)': { display: 'none' },
        })}
      >
        {paused ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
      </button>
    </section>
  )
}

// Rail has no job photo yet, so it gets an icon tile rather than a stock picture.
const sectors: { label: string; text: string; href: string; photo?: Photo; icon?: LucideIcon }[] = [
  { label: 'Domestic', text: 'Homes, landlords & families', href: '#rewires', photo: work.garageWallLights },
  { label: 'Commercial', text: 'Shops, salons & offices', href: '#commercial', photo: photos.commercial },
  { label: 'Rail', text: 'Rail infrastructure', href: '#rail', icon: TrainFront },
]

/** The three sectors from the flyer: domestic, commercial and rail. */
export function SectorStrip() {
  return (
    <section aria-labelledby="sectors-title" className={css({ bg: 'white', py: { base: '12', md: '16' } })}>
      <div className={container}>
        <Kicker className={css({ mb: '6' })}>
          <span id="sectors-title">Who we work for</span>
        </Kicker>
      </div>
      <ul className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: { base: '6', md: '6' } }))}>
        {sectors.map((sector) => (
          <li key={sector.label}>
            <a
              href={sector.href}
              className={css({
                display: 'block',
                '& img': { transition: 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)' },
                _hover: { '& img': { transform: 'scale(1.04)' }, '& [data-link]': { gap: '3' } },
              })}
            >
              <span className={css({ display: 'block', aspectRatio: { base: '16 / 9', md: '4 / 3' }, overflow: 'hidden', rounded: '16px', bg: 'navy.900', boxShadow: '0 18px 40px -18px rgba(10, 30, 69, 0.4)' })}>
                {sector.photo ? (
                  <Img photo={sector.photo} sizes="(min-width: 1280px) 363px, (min-width: 768px) 30vw, calc(100vw - 40px)" className={coverImage} />
                ) : (
                  sector.icon && (
                    <span
                      aria-hidden
                      className={css({
                        display: 'grid',
                        placeItems: 'center',
                        w: '100%',
                        h: '100%',
                        color: 'white',
                        bg: 'radial-gradient(circle at 70% 30%, rgba(200, 16, 46, 0.35), transparent 60%), linear-gradient(135deg, {colors.navy.900}, {colors.navy.950})',
                      })}
                    >
                      <sector.icon size={88} strokeWidth={1.1} />
                    </span>
                  )
                )}
              </span>
              <span className={css({ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3', mt: '4' })}>
                <span>
                  <span className={css({ display: 'block', textStyle: 'h3', fontSize: '1.9rem', color: 'navy.950' })}>{sector.label}</span>
                  <span className={css({ display: 'block', color: 'ink.500', mt: '1' })}>{sector.text}</span>
                </span>
                <span data-link className={css({ display: 'inline-flex', alignItems: 'center', gap: '2', textStyle: 'tracked', color: 'crimson.600', transition: 'gap 0.2s', pb: '1' })}>
                  View <ArrowRight size={18} aria-hidden />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
