import { AlertTriangle, Check, House, ShieldCheck, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, Highlight, IconCircle, Img, Kicker, sectionY, TickList } from '../components/ui'
import { rewire } from '../data/site'
import { useContact } from '../lib/contact'

const benefitIcons: LucideIcon[] = [ShieldCheck, TrendingUp, Sparkles, Check]

export function Rewires() {
  const { openContact } = useContact()

  return (
    <section id="rewires" className={cx(sectionY, css({ bg: 'paper.100' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        <figure className={css({ position: 'relative', m: '0' })}>
          <div className={css({ aspectRatio: { base: '4 / 3', lg: '4 / 5' }, rounded: '8px', overflow: 'hidden', bg: 'navy.900' })}>
            <Img photo={photos.home} sizes="(min-width: 1024px) 45vw, 100vw" className={coverImage} />
          </div>
          <figcaption className={css({ fontSize: '0.8rem', color: 'muted', mt: '2' })}>{photos.home.caption}</figcaption>
          {/* The round badge from the flyer. */}
          <span
            aria-hidden
            className={css({
              position: 'absolute',
              right: { base: '3', md: '-5' },
              bottom: { base: '10', md: '12' },
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              w: { base: '28', md: '36' },
              h: { base: '28', md: '36' },
              p: '3',
              rounded: 'full',
              bg: 'crimson.600',
              color: 'white',
              border: '4px solid white',
              boxShadow: '0 8px 24px rgba(10, 30, 69, 0.25)',
            })}
          >
            <span>
              <House size={26} className={css({ mx: 'auto' })} />
              <span className={css({ display: 'block', fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', lineHeight: '1.05', fontSize: { base: '0.8rem', md: '0.95rem' }, mt: '1' })}>
                A safer, brighter home starts here
              </span>
            </span>
          </span>
        </figure>

        <div>
          <Kicker>Home rewires</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Do you need your
            <br />
            <Highlight>home rewired?</Highlight>
          </h2>
          <p className={css({ fontFamily: 'heading', fontWeight: '700', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'navy.900', mt: '4' })}>
            Safe <span className={css({ color: 'crimson.600' })}>•</span> Reliable <span className={css({ color: 'crimson.600' })}>•</span> Professional
          </p>
          <p className={css({ color: 'ink.700', mt: '4' })}>
            Older wiring wasn’t designed for the way we live now. A rewire makes your home safer, gives you sockets and lighting
            where you actually need them, and adds value when it’s time to sell.
          </p>

          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: '4', mt: '8' })}>
            {rewire.benefits.map((benefit, i) => (
              <li key={benefit} className={css({ display: 'flex', flexDir: 'column', alignItems: 'center', textAlign: 'center', gap: '2' })}>
                <IconCircle icon={benefitIcons[i]} size="sm" />
                <span className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.92rem', lineHeight: '1.15', color: 'navy.900' })}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <TickList items={rewire.checklist} columns={2} className={css({ mt: '8' })} />

          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', mt: '8' })}>
            <Button size="lg" onClick={() => openContact('Full rewire')}>
              Get a rewire quote
            </Button>
            <Button size="lg" variant="outline" onClick={() => openContact('EICR / testing')}>
              Book an electrical check (EICR)
            </Button>
          </div>
        </div>
      </div>

      <div className={container}>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'minmax(0, 1.4fr) minmax(0, 1fr)' },
            gap: { base: '6', md: '10' },
            alignItems: 'center',
            mt: { base: '12', md: '16' },
            p: { base: '6', md: '8' },
            rounded: '8px',
            bg: 'white',
            border: '1px solid {colors.paper.200}',
          })}
        >
          <div>
            <h3 className={css({ textStyle: 'h3', color: 'navy.900', display: 'flex', alignItems: 'center', gap: '2' })}>
              <AlertTriangle size={22} className={css({ color: 'crimson.600' })} aria-hidden /> Signs your wiring needs checking
            </h3>
            <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: '2.5', columnGap: '8', mt: '5' })}>
              {rewire.signs.map((sign) => (
                <li key={sign} className={css({ display: 'flex', gap: '3', color: 'ink.700', lineHeight: '1.4' })}>
                  <span aria-hidden className={css({ flexShrink: '0', w: '2', h: '2', mt: '2', rotate: '45deg', bg: 'crimson.600' })} />
                  {sign}
                </li>
              ))}
            </ul>
            <p className={css({ color: 'muted', fontSize: '0.92rem', mt: '5' })}>
              Burning smells, scorch marks or hot sockets need looking at straight away. Stop using them and give us a call.
            </p>
          </div>
          <figure className={css({ m: '0' })}>
            <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '3' })}>
              <div>
                <div className={css({ aspectRatio: '4 / 3', rounded: '6px', overflow: 'hidden', bg: 'paper.200' })}>
                  <Img photo={photos.oldBoard} sizes="(min-width: 768px) 20vw, 50vw" className={coverImage} />
                </div>
                <p className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.9rem', color: 'navy.900', mt: '2' })}>An older fuse board</p>
              </div>
              <div>
                <div className={css({ aspectRatio: '4 / 3', rounded: '6px', overflow: 'hidden', bg: 'paper.200' })}>
                  <Img photo={photos.newBoard} sizes="(min-width: 768px) 20vw, 50vw" className={coverImage} />
                </div>
                <p className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.9rem', color: 'navy.900', mt: '2' })}>A modern consumer unit</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
