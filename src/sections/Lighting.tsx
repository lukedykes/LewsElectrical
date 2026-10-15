import { ArrowRight } from 'lucide-react'
import { css, cx } from '../../styled-system/css'
import { work, type Photo } from '../assets/images'
import { Bullets, Button, container, coverImage, Highlight, Img, Kicker, sectionY, trackedLink } from '../components/ui'
import { lighting } from '../data/site'
import { useContact } from '../lib/contact'

/** Lighting is where the client's photos shine, so it gets its own showcase. */
export function Lighting() {
  const { openContact } = useContact()

  return (
    <section id="lighting" aria-labelledby="lighting-title" className={cx(sectionY, css({ position: 'relative', bg: 'navy.950', color: 'white', overflow: 'hidden' }))}>
      {/* A warm glow, like lamplight, behind the photos. */}
      <span
        aria-hidden
        className={css({
          position: 'absolute',
          inset: '0',
          bg: 'radial-gradient(42rem 32rem at 78% 45%, rgba(242, 194, 0, 0.11), transparent 70%), radial-gradient(36rem 26rem at 8% 90%, rgba(200, 16, 46, 0.14), transparent 70%)',
          pointerEvents: 'none',
        })}
      />
      <div
        className={cx(
          container,
          css({
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: { base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.92fr) minmax(0, 1.08fr)' },
            gap: { base: '10', lg: '16' },
            alignItems: 'center',
          }),
        )}
      >
        <div>
          <Kicker onNavy>Lighting</Kicker>
          <h2 id="lighting-title" className={css({ textStyle: 'h2', mt: '4' })}>
            Lighting that
            <br />
            <Highlight>sets the mood</Highlight>
          </h2>
          <p className={css({ textStyle: 'lead', color: 'navy.100', mt: '5' })}>
            From media walls and kitchen plinth strips to soffit downlights and garden steps, we plan and fit lighting that
            looks good and works the way you live. Indoors or out, every job is tested and certified.
          </p>
          <Bullets onNavy items={lighting} columns={2} className={css({ mt: '8' })} />
          <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3', columnGap: '6', mt: '8' })}>
            <Button size="lg" onClick={() => openContact('Lighting')}>
              Get a lighting quote
            </Button>
            <a href="#work" className={cx(trackedLink, css({ color: 'white', minH: '11', _hover: { color: 'crimson.300' } }))}>
              See our work <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>

        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: { base: 'repeat(2, minmax(0, 9.5rem))', sm: 'repeat(2, minmax(0, 14rem))', lg: 'repeat(2, minmax(0, 15.5rem))' },
            gap: { base: '2', md: '3' },
          })}
        >
          <Tile photo={work.mediaWallAngle} sizes="(min-width: 1024px) 28vw, 50vw" className={css({ gridRow: 'span 2' })} />
          <Tile photo={work.extensionUplights} sizes="(min-width: 1024px) 28vw, 50vw" />
          <Tile photo={work.deckingLights} sizes="(min-width: 1024px) 28vw, 50vw" position="50% 70%" />
        </div>
      </div>
    </section>
  )
}

function Tile({ photo, sizes, className, position }: { photo: Photo; sizes: string; className?: string; position?: string }) {
  return (
    <figure
      className={cx(
        css({
          position: 'relative',
          m: '0',
          rounded: { base: '10px', md: '16px' },
          overflow: 'hidden',
          bg: 'navy.800',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
        }),
        className,
      )}
    >
      <Img photo={position ? { ...photo, position } : photo} sizes={sizes} className={coverImage} />
      <figcaption
        className={css({
          position: 'absolute',
          insetX: '0',
          bottom: '0',
          px: { base: '2.5', md: '4' },
          pt: '8',
          pb: { base: '2', md: '3' },
          fontSize: { base: '0.78rem', md: '0.88rem' },
          fontWeight: '600',
          lineHeight: '1.3',
          color: 'white',
          bg: 'linear-gradient(to top, rgba(6, 20, 48, 0.85), transparent)',
        })}
      >
        {photo.caption}
      </figcaption>
    </figure>
  )
}
