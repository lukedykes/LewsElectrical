import { Briefcase, Dumbbell, Lightbulb, Scissors, ShoppingBag, TrendingUp, Users, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { photos } from '../assets/images'
import { Button, container, coverImage, Highlight, IconCircle, Img, Kicker, sectionY, TickList } from '../components/ui'
import { commercial } from '../data/site'
import { useContact } from '../lib/contact'

const benefitIcons: LucideIcon[] = [Lightbulb, Users, TrendingUp]
const venueIcons: LucideIcon[] = [ShoppingBag, Scissors, UtensilsCrossed, Briefcase, Dumbbell]

export function Commercial() {
  const { openContact } = useContact()

  return (
    <section id="commercial" className={cx(sectionY, css({ bg: 'white' }))}>
      <div className={cx(container, css({ display: 'grid', gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' }, gap: { base: '10', lg: '16' }, alignItems: 'center' }))}>
        <div>
          <Kicker>Shops, salons &amp; workplaces</Kicker>
          <h2 className={css({ textStyle: 'h2', mt: '3' })}>
            Got a shop or salon
            <br />
            that needs <Highlight>modernising?</Highlight>
          </h2>
          <p className={css({ color: 'ink.700', mt: '5', textStyle: 'lead' })}>
            We provide professional electrical solutions to help you create a modern, stylish and functional space for your
            business, planned around your opening hours.
          </p>

          <ul className={css({ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '4', mt: '8' })}>
            {commercial.benefits.map((benefit, i) => (
              <li key={benefit} className={css({ display: 'flex', flexDir: 'column', alignItems: 'center', textAlign: 'center', gap: '2' })}>
                <IconCircle icon={benefitIcons[i]} size="sm" />
                <span className={css({ fontFamily: 'heading', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.92rem', color: 'navy.900', lineHeight: '1.15' })}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <TickList items={commercial.checklist} columns={2} className={css({ mt: '8' })} />

          <Button size="lg" className={css({ mt: '8' })} onClick={() => openContact('Shop, salon or office work')}>
            Talk to us about your premises
          </Button>
        </div>

        <figure className={css({ m: '0' })}>
          <div className={css({ aspectRatio: '4 / 3', rounded: '8px', overflow: 'hidden', bg: 'navy.900' })}>
            <Img photo={photos.venue} sizes="(min-width: 1024px) 45vw, 100vw" className={coverImage} />
          </div>
          <ul className={css({ display: 'grid', gridTemplateColumns: { base: 'repeat(3, minmax(0, 1fr))', sm: 'repeat(5, minmax(0, 1fr))' }, gap: '2', mt: '4' })}>
            {commercial.venues.map((venue, i) => {
              const Icon = venueIcons[i]
              return (
                <li
                  key={venue}
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignItems: 'center',
                    gap: '1.5',
                    textAlign: 'center',
                    py: '3',
                    px: '1',
                    rounded: '6px',
                    bg: 'paper.100',
                    fontFamily: 'heading',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    fontSize: '0.82rem',
                    lineHeight: '1.1',
                    color: 'navy.900',
                  })}
                >
                  <Icon size={22} className={css({ color: 'crimson.600' })} aria-hidden />
                  {venue}
                </li>
              )
            })}
          </ul>
        </figure>
      </div>
    </section>
  )
}
