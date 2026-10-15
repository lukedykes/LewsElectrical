import { AlertTriangle, Check, House, ShieldCheck, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { photos, work } from '../assets/images'
import { Bullets, Button, container, coverImage, Highlight, IconTile, Img, Kicker, sectionY } from '../components/ui'
import { rewire } from '../data/site'
import { useContact } from '../lib/contact'

const benefitIcons: LucideIcon[] = [ShieldCheck, TrendingUp, Sparkles, Check]

const photoLabel = css({
  position: 'absolute',
  px: '2.5',
  py: '1',
  rounded: '4px',
  color: 'white',
  fontFamily: 'heading',
  fontWeight: '700',
  fontSize: { base: '0.78rem', md: '0.86rem' },
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  lineHeight: '1.3',
})

export function Rewires() {
  const { openContact } = useContact()

  return (
    <section id="rewires" className={cx(sectionY, css({ bg: 'paper.100' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        {/* Work in progress and a finished kitchen, side by side. */}
        <figure className={css({ m: '0' })}>
          <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: { base: '3', md: '4' } })}>
            <div className={css({ position: 'relative', aspectRatio: '3 / 4', rounded: '16px', overflow: 'hidden', bg: 'navy.900' })}>
              <Img photo={work.stripOutElectrician} sizes="(min-width: 1024px) 24vw, 48vw" className={coverImage} />
              <span className={cx(photoLabel, css({ left: '3', bottom: '3', bg: 'navy.950' }))}>In progress</span>
            </div>
            <div className={css({ position: 'relative', aspectRatio: '3 / 4', rounded: '16px', overflow: 'hidden', bg: 'navy.900' })}>
              <Img photo={work.kitchenCorner} sizes="(min-width: 1024px) 24vw, 48vw" className={coverImage} />
              <span className={cx(photoLabel, css({ left: '3', bottom: '3', bg: 'crimson.600' }))}>Finished</span>
            </div>
          </div>
          <figcaption className={css({ display: 'flex', alignItems: 'center', gap: '2', mt: '4', textStyle: 'tracked', fontSize: '0.88rem', color: 'navy.950' })}>
            <House size={18} className={css({ color: 'crimson.600', flexShrink: '0' })} aria-hidden /> A safer, brighter home starts here
          </figcaption>
        </figure>

        <div>
          <Kicker>Home rewires</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '4' })}>
            Do you need your
            <br />
            <Highlight>home rewired?</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'ink.500', mt: '5' })}>
            Older wiring wasn’t designed for the way we live now. A rewire makes your home safer, gives you sockets and lighting
            where you actually need them, and adds value when it’s time to sell.
          </p>

          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: '4', mt: '8' })}>
            {rewire.benefits.map((benefit, i) => (
              <li key={benefit} className={css({ display: 'flex', flexDir: 'column', alignItems: 'center', textAlign: 'center', gap: '2' })}>
                <IconTile icon={benefitIcons[i]} size="sm" />
                <span className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.92rem', lineHeight: '1.15', color: 'navy.900', textWrap: 'balance' })}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Bullets items={rewire.checklist} columns={2} className={css({ mt: '8' })} />

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
            rounded: '4px',
            bg: 'white',
            border: '1px solid {colors.paper.200}',
          })}
        >
          <div>
            <h3 className={css({ textStyle: 'h3', color: 'navy.900', display: 'flex', alignItems: 'center', gap: '2' })}>
              <AlertTriangle size={22} className={css({ color: 'crimson.600' })} aria-hidden /> Signs your wiring needs checking
            </h3>
            <Bullets items={rewire.signs} columns={2} className={css({ mt: '5' })} />
            <p className={css({ color: 'muted', fontSize: '0.92rem', mt: '5' })}>
              Burning smells, scorch marks or hot sockets need looking at straight away. Stop using them and give us a call.
            </p>
          </div>
          <figure className={css({ m: '0' })}>
            <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '3' })}>
              <div>
                <div className={css({ aspectRatio: '4 / 3', rounded: '10px', overflow: 'hidden', bg: 'paper.200' })}>
                  <Img photo={photos.oldBoard} sizes="(min-width: 768px) 20vw, 50vw" className={coverImage} />
                </div>
                <p className={css({ textStyle: 'tracked', fontSize: '0.8rem', color: 'navy.950', mt: '2.5', textWrap: 'balance' })}>An older fuse board</p>
              </div>
              <div>
                <div className={css({ aspectRatio: '4 / 3', rounded: '10px', overflow: 'hidden', bg: 'paper.200' })}>
                  <Img photo={work.consumerUnit} sizes="(min-width: 768px) 20vw, 50vw" className={coverImage} />
                </div>
                <p className={css({ textStyle: 'tracked', fontSize: '0.8rem', color: 'navy.950', mt: '2.5', textWrap: 'balance' })}>A modern consumer unit</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
